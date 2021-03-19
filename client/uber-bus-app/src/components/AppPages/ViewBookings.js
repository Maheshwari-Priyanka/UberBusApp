import React, { Component } from 'react';

class ViewBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div style={{ marginTop: "10%", textAlign: "center" }}>
                <table>
                    <tr>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Bus Name</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ViewBookings