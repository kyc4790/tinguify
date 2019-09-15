import React from 'react';
import GroupChat from './GroupChat';
import GroupInfo from './GroupInfo';

class Home extends React.Component {
    state = {
        viewMembers: true,
    }

    toggleViewMembers = () => {
        this.setState({
            viewMembers: !this.state.viewMembers,
        })
    }

    render() {
        return this.state.viewMembers ? (<GroupInfo onComplete={this.toggleViewMembers}/>): (<GroupChat onComplete={this.toggleViewMembers}/>);
    }
}

export default Home;