import React, { Component } from 'react';
import { getbookings } from './BookingFunctions'

class ViewBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            msg: ""
        }
    }

    componentDidMount() {
        const booking = {}

        getbookings(booking).then(res => {
            if (res.status === 200) {
                if (res.data["message"] === "No bookings found") {
                    this.setState({
                        msg: res.data["message"]
                    });
                } else {
                    this.setState({
                        bookings: res.data
                    })
                }
            }
        })
    }

    render() {
        if (this.state.msg !== null || this.state.bookings.length < 1) {
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
                        {Object.keys(this.state.bookings).map((booking, index) => (
                            <tr>
                                <td>{this.state.bookings[index]["source"]}</td>
                                <td>{this.state.bookings[index]["destination"]}</td>
                                <td>{this.state.bookings[index]["bus"]}</td>
                                <td>{this.state.bookings[index]["time"]}</td>
                            </tr>
                            // <div className="btn" style={{ textAlign: "left", width: "30%" }}>
                            //     <h4>{this.state.buses[index]["busname"]}</h4>
                            //     <p>Departure Time: {this.state.buses[index]["time"]}</p>
                            //     <input type="button" value="Select" onClick={e => { this.selected(e, index)}} />
                            // </div>
                        ))}
                    </table>
                </div>
            )
        }

        return (
            <div style={{ marginTop: "10%", textAlign: "center" }}>
                <h2>
                    {this.state.msg}
                </h2>
                {/* <table>
                    <tr>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Bus Name</th>
                        <th>Time</th>
                        <th></th>
                    </tr>

                </table> */}
            </div>
        )
    }
}

export default ViewBookings