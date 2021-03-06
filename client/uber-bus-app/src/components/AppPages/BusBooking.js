import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './BusSelection.css'
import { getbuses, addbooking } from './BookingFunctions';

function validate(source, destination) {
    let reg = /^[a-zA-Z0-9_.-\s]*$/;
    const errors = [];
    errors.push("");
    errors.push("");

    if (!reg.test(source)) {
        errors[0] = "Enter valid source";
    }

    if (!reg.test(destination)) {
        errors[1] = "Enter valid destination";
    }

    return errors;
}

class BusBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            source: "",
            sourceError: "",
            destination: "",
            destError: "",
            date: "",
            busError: "Select source, destination and date of journey",
            buses: []
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.selected = this.selected.bind(this);
    }

    handleSourceChange(e) {
        this.setState({
            source: e.target.value
        });
    }

    handleDestinationChange(e) {
        this.setState({
            destination: e.target.value
        });
    }

    handleDateChange(value) {
        this.setState({
            date: value
        });
    }

    submitData(e) {
        // alert(this.state.source + " " + this.state.destination + " " + this.state.date);
        const source = this.state.source;
        const destination = this.state.destination;
        
        if (source === destination) {
            this.setState({
                sourceError: "Source and Destination cannot be same",
                destError: ""
            });
            e.preventDefault();
        } else {
            const errors = validate(source, destination);

            if (errors[0].length > 0 || errors[1].length > 0) {
                this.setState({
                    sourceError: errors[0],
                    destError: errors[1]
                });
                e.preventDefault();
            } else {
                e.preventDefault();
                const booking = {
                    source: this.state.source,
                    destination: this.state.destination,
                    date: this.state.date
                }

                getbuses(booking).then(res => {
                    if (res.status === 200) {
                        if (res.data["message"] === "No Buses found") {
                            this.setState({
                                sourceError: "",
                                destError: "",
                                busError: res.data["message"],
                                buses: []
                            });
                        } else {
                            let size = Object.keys(res.data).length
                            console.log(size);
                            if (size < 1) {
                                this.setState({
                                    buses: [],
                                    busError: 'No buses found'
                                });
                            } else {
                                this.setState({
                                    buses: res.data,
                                    busError: ''
                                });
                            }
                            //console.log(this.state.buses[0]["busname"]);
                        }
                    }
                });
            }
        }
    }

    selected(e, index) {
        e.preventDefault()
        console.log(this.state.buses[index]);
        // alert("Confirm?");
        if (window.confirm("Confirm booking?")) {
            const booking = {
                source: this.state.source,
                destination: this.state.destination,
                date: this.state.date,
                busname: this.state.buses[index]["busname"],
                time: this.state.buses[index]["time"]
            }
    
            addbooking(booking).then(res => {
                if (res.status === 200) {
                    if (res.data["message"].includes("successfully")) {
                        this.props.history.push('/viewbookings');
                    } else {
                        alert(res.data["message"]);
                    }
                }
            });
        }
    }

    render() {
        if (this.state.busError.length < 1) {
            return (
                <div className='container maint-cnt' style={{ marginTop: "10%" }}>
                <h2 style={{ textAlign: "center", marginTop: "2%", fontSize: "35px", fontWeight: "bold" }}>Book your Ticket!</h2>
                <div className="row justify-content-around">
                    <div className='col-5 form-container '>
                        <div className="form-input">
                            <h2 style={{ textAlign: "center" }}>Step 1</h2>
                            <form onSubmit={(e) => { this.submitData(e) }}>
                                <div class="form-group">
                                    <label>Source</label>
                                    <input className="form-control" type="text" name="source" value={this.state.source} required onChange={(e) => { this.handleSourceChange(e) }} />
                                    <p style={{color: "red", fontSize: "10px"}}> {this.state.sourceError} </p>
                                </div>
                                <div class="form-group">
                                    <label>Destination</label>
                                    <input className="form-control" type="text" name="destination" value={this.state.destination} required onChange={(e) => { this.handleDestinationChange(e) }} />
                                    <p style={{color: "red", fontSize: "10px"}}> {this.state.destError} </p>
                                </div>
                                <div class="form-group">
                                    <label>Date of Journey  </label>
                                    {/* <input className="form-control" type="date" name="date" value={this.state.date} required onChange={(e) => {this.handleDateChange(e)}} /> */}
                                    <DatePicker required className="custom-select" name="date" value={this.state.date} onChange={this.handleDateChange} selected={this.state.date} minDate={moment().toDate()} />
                                </div>
                                <div class="myform-button">
                                    <button type="submit" className="myform-btn">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* <div className='col-2'></div> */}
                    <div className='col-6 form-container' style={{height: "370px", overflowY: "scroll"}}>
                        <h2 style={{ textAlign: "center" }}>Step 2</h2>
                        {Object.keys(this.state.buses).map((bus, index) => (
                            <div className="btn" style={{ textAlign: "left", width: "45%" }}>
                                <h4>{this.state.buses[index]["busname"]}</h4>
                                <p>Departure Time: {this.state.buses[index]["time"]}</p>
                                <input type="button" value="Select" onClick={e => { this.selected(e, index)}} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            )
        }
        return (
            <div className='container maint-cnt' style={{ marginTop: "10%" }}>
                <h2 style={{ textAlign: "center", marginTop: "2%", fontSize: "35px", fontWeight: "bold" }}>Book your Ticket!</h2>
                <div className="row justify-content-around">
                    <div className='col-5 form-container '>
                        <div className="form-input">
                            <h2 style={{ textAlign: "center" }}>Step 1</h2>
                            <form onSubmit={(e) => { this.submitData(e) }}>
                                <div class="form-group">
                                    <label>Source</label>
                                    <input className="form-control" type="text" name="source" value={this.state.source} required onChange={(e) => { this.handleSourceChange(e) }} />
                                    <p style={{color: "red", fontSize: "10px"}}> {this.state.sourceError} </p>
                                </div>
                                <div class="form-group">
                                    <label>Destination</label>
                                    <input className="form-control" type="text" name="destination" value={this.state.destination} required onChange={(e) => { this.handleDestinationChange(e) }} />
                                    <p style={{color: "red", fontSize: "10px"}}> {this.state.destError} </p>
                                </div>
                                <div class="form-group">
                                    <label>Date of Journey  </label>
                                    {/* <input className="form-control" type="date" name="date" value={this.state.date} required onChange={(e) => {this.handleDateChange(e)}} /> */}
                                    <DatePicker required className="custom-select" name="date" value={this.state.date} onChange={this.handleDateChange} selected={this.state.date} minDate={moment().toDate()} />
                                </div>
                                <div class="myform-button">
                                    <button type="submit" className="myform-btn">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* <div className='col-2'></div> */}
                    <div className='col-6 form-container' style={{height: "370px", overflowY: "scroll"}}>
                        <h2 style={{ textAlign: "center" }}>Step 2</h2>
                        <br />
                        <h5 style={{ textAlign: "center", color: "red"}}>
                            {this.state.busError}
                        </h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default BusBooking;
