import { Audio, Permissions, FileSystem } from 'expo';
import * as Base64 from 'base-64';
import { fft, util } from 'fft-js';
import { registerField, change } from 'redux-form';
import { PRODUCT_REVIEW_COMPOSER_FORM } from '../../constants';
import { Platform } from 'react-native';

// Get Permissions to use the microphone
async function getPermissions() {
  const permissions = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
  if (permissions.status === 'granted') {
    return true;
  }
  const ask = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  return ask.status === 'granted';
}

// Prepare recording
async function startRecord(rec) {
  try {
    await rec.prepareToRecordAsync({
      android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      },
      ios: {
        extension: '.wav',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
      },
    });
    await rec.startAsync();
  } catch (error) {
    console.log(error);
  }
}

// End the recording, get the uri of the audio
async function endRecord(rec: Audio.Recording) {
  try {
    const uri = await rec.getURI();
    await rec.stopAndUnloadAsync();
    return uri;
  } catch (error) {
    console.log(error);
  }
}

// Convert to a WAV file for android
async function convertToWAV(file) {
  let bin = Base64.decode(file.replace(/[ \r\n]+$/, ''));
  let bytes = new Uint8Array(bin.length);
  bytes.map((e, index) => (bytes[index] = bin.charCodeAt(index)));
}

// hex string to integer
function hexToNum(sample: string) {
  let num = 0;
  for (let i = 0; i < sample.length; i++) {
    num *= 16;
    if (isNaN(parseInt(sample.charAt(i)))) {
      num += sample.charCodeAt(i) - 'a'.charCodeAt(0);
    } else {
      num += parseInt(sample.charAt(i));
    }
  }
  return num;
}

// Convert base 64 to the series of amplitudes recorded by the microphone
function base64toAmplitudes(str: string) {
  let hex = [],
    bin = Base64.decode(str.replace(/[ \r\n]+$/, ''));
  for (let i = 0; i < Math.min(10000, bin.length); ++i) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = '0' + tmp;
    hex[hex.length] = tmp;
  }
  let samples = [];
  hex.map(
    (e, index, array) => index % 2 === 0 && samples.push(e + array[index + 1]),
  );

  let amplitudes = samples.map(hexToNum);
  return amplitudes;
}

// Use a Fast Fourier Transform to get frequency and magnitude
function frequencyAndMagnitude(amplitudes: number[]) {
  const new_length = Math.pow(
    2,
    Math.floor(Math.log(amplitudes.length) / Math.log(2)),
  );

  let phasors = fft(amplitudes.slice(0, new_length));
  let frequencies = util.fftFreq(phasors, 44100);
  let magnitudes = util.fftMag(phasors);
  const magSum = magnitudes.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );
  const dBFS =
    20 *
    Math.log10(
      amplitudes
        .slice(0, new_length)
        .reduce((accumulator, currentValue) =>
          Math.sqrt(accumulator * accumulator + currentValue * currentValue),
        ) / Math.sqrt(new_length),
    );
  const mean =
    magnitudes.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    ) / magnitudes.length;
  const stdev =
    magnitudes.reduce((accumulator, currentValue) =>
      Math.sqrt(
        accumulator * accumulator +
          (currentValue - mean) * (currentValue - mean),
      ),
    ) / magnitudes.length;
  const threshold = mean + 2 * stdev;
  const fundamentalFrequencyIndex = magnitudes.findIndex(
    (e, index) =>
      e > threshold &&
      frequencies[index] > Math.max(20, (5 * 44100) / new_length),
  );
  const fundamentalFrequency = frequencies[fundamentalFrequencyIndex];
  return {
    dBFS,
    maxFrequency: fundamentalFrequency,
  };
}

function removeZeroes(array) {
  const index = array
    .reverse()
    .findIndex(
      (e, index) =>
        index + 1 < array.length && e === 0 && array[index + 1] === 0,
    );
  array.splice(index, array.length - index);
  array.reverse();
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAudioData() {
  let rec = new Audio.Recording();
  await startRecord(rec);
  await sleep(1000);
  let uri = await endRecord(rec);

  // Extract data
  let file;
  if (Platform.OS === 'ios') {
    file = await FileSystem.readAsStringAsync(uri + ';base64', {
      encoding: FileSystem.EncodingTypes.Base64,
    });
  } else {
    file = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingTypes.Base64,
    });
    //   FileSystem.downloadAsync(uri, FileSystem.documentDirectory + 'audio_sample.3gp')
    //   .then(newUri => {FileSystem.readAsStringAsync(uri + ';base64', {
    //   encoding: FileSystem.EncodingTypes.Base64,
    // }).then(str => file = str);
    //   FileSystem.deleteAsync(uri).catch(() => {});
    //   uri = newUri;
    // })
  }

  //File conversion for Android
  if (uri.substring(uri.length - 4, uri.length) !== '.wav') {
    try {
      await convertToWAV(file);
    } catch (e) {
      console.log(e);
      return;
    }
  }
  const amplitudes = base64toAmplitudes(file);
  removeZeroes(amplitudes);
  const data = frequencyAndMagnitude(amplitudes.map(e => e / 65536));

  await FileSystem.deleteAsync(uri);
  return data;
}

async function getDataLoop(obj, frequencyTimeSeries, volumeTimeSeries) {
  const permission = await getPermissions();

  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: true,
  });

  if (!permission) {
    return [];
  }
  let data_points = [];
  let pastTime = new Date().getTime();
  while (obj.reviewInProgress) {
    const time = new Date().getTime();
    if (time - pastTime < 5000) {
      continue;
    }
    try {
      const data = await getAudioData();
      data_points.push({
        time,
        data,
      });
      pastTime = time;
      volumeTimeSeries.push(data.dBFS);
      frequencyTimeSeries.push(data.maxFrequency);
    } catch {
      break;
    }
  }
  return data_points;
}

export default getDataLoop;
