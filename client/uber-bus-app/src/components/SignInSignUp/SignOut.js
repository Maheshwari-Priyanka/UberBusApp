import React, { Component } from 'react';

class SignOut extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(localStorage.getItem('userID'))
        localStorage.removeItem('userID')
        console.log(localStorage.getItem('firstname'))
        this.props.history.push('/signin')
    }

    render() {
        return (
            <div>
                Signed Out
            </div>
        );
    }
}

export default SignOut