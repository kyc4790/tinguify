import React from 'react';
import GroupChat from './GroupChat';
import GroupInfo from './GroupInfo';

class Home extends React.Component {
    state = {
        viewMembers: true,
    }

    render() {
        return this.state.viewMembers ? (<GroupInfo/>): (<GroupChat/>);
    }
}

export default Home;