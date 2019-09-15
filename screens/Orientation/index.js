import React from 'react';

import Interests from './Interests';
import Settings from './Settings';

class Orientation extends React.Component {

    constructor(props) {
        super(props);
    }

    state={
        profileFilledOut: false
    }

    fillOut = () => {
        console.log(this.props)
        this.setState({profileFilledOut: true});
        this.props.navigation.navigate('Profile')
    }

    render() {
        return !this.state.profileFilledOut ? <Interests onComplete={this.fillOut}/> : <Settings onComplete={this.props.onComplete}/> 
    }

}

export default Orientation;