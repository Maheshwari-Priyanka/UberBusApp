import React, { Component } from 'react';

class BusBooking extends Component {
    constructor (props) {
        super(props)
        this.state = {
            source: "",
            destination: "",
            date: ""
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.submitData = this.submitData.bind(this);
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

    handleDateChange(e) {
        this.setState({
          date: e.target.value
        });
    }

    submitData(e) {
        alert(this.state.source + " " + this.state.destination + " " + this.state.date);
        e.preventDefault()
    }

    render() {
        return (
            <div className='container maint-cnt'>  
                <div className='form-container'>
                    <div className="form-input">
                        <h2 style={{textAlign: "center"}}>Book your Ticket!</h2>
                        <form onSubmit={(e) => { this.submitData(e) }}>
                            <div class="form-group">
                                <label>Source</label>
                                <input className="form-control" type="text" name="source" value={this.state.source} required onChange={(e) => {this.handleSourceChange(e)}} />
                                
                            </div>
                            <div class="form-group">
                                <label>Destination</label>
                                <input className="form-control" type="text" name="destination" value={this.state.destination} required onChange={(e) => {this.handleDestinationChange(e)}} />
                            </div>
                            <div class="form-group">
                                <label>Date of Journey</label>
                                <input className="form-control" type="date" name="date" value={this.state.date} required onChange={(e) => {this.handleDateChange(e)}} />
                            </div>
                            <div class="myform-button">
                                <button type="submit" className="myform-btn">Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default BusBooking;