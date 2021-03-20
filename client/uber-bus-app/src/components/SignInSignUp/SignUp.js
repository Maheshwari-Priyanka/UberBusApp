import React, { Component } from 'react'
import './main.css'
import { signup } from './UserFunctions'

function validate(firstname, lastname, email, password) {
    let errors = []
    let regName = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/;
    errors.push("");
    errors.push("");
    errors.push("");
    errors.push("");

    if (!regName.test(firstname)) {
        errors[0] = "Enter valid firstname";
    }
    if (!regName.test(lastname)) {
        errors[1] = "Enter valid lastname";
    }
    if (email.length < 5) {
        errors[2] = "Email should be at least 5 charcters long";
    } else if (email.split("").filter(x => x === "@").length !== 1) {
        errors[2] = "Email should contain '@'";
    }else if (email.indexOf(".") === -1) {
        errors[2] = "Email should contain at least one dot";
    }
    
    if (password.length < 8) {
        errors[3] = "Password should be at least 8 characters long";
    }

    return errors;
}

class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            firstError: '',
            lastname: '',
            lastError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: ''
        }

        this.submitData = this.submitData.bind(this);
        this.handlefname = this.handlefname.bind(this);
        this.handlelname = this.handlelname.bind(this);
        this.handleemail = this.handleemail.bind(this);
        this.handlepassword = this.handlepassword.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('userID') !== null) {
            this.props.history.push('/booking')
        }
    }

    handlefname = e => {
        let value = e.target.value
        this.setState({
            firstname: value
        })
    }

    handlelname = e => {
        let value = e.target.value
        this.setState({
            lastname: value
        })
    }

    handleemail = e => {
        let value = e.target.value
        this.setState({
            email: value
        })
    }

    handlepassword = e => {
        let value = e.target.value
        this.setState({
            password: value
        })
    }

    submitData = e => {
        // e.preventDefault()
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const password = this.state.password;

        const errors = validate(firstname, lastname, email, password);
        if (errors[0].length > 0 || errors[1].length > 0 || errors[2].length > 0 || errors[3].length > 0) {
            this.setState({
                firstError: errors[0],
                lastError: errors[1],
                emailError: errors[2],
                passwordError: errors[3]
            });
            e.preventDefault();
        } else {
            e.preventDefault();
            const user = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            }

            signup(user).then(res => {
                console.log(res);
                if (res.status === 200) {
                    if (res.data["message"].includes("success")) {
                        alert("Signed up successfully!");
                        this.props.history.push('/signin');
                    } else {
                        this.setState({
                            firstError: '',
                            lastError: '',
                            emailError: res.data["message"],
                            passwordError: ''
                        });
                    }
                } else {
                    alert("Server Error!");
                }
            });
        }
    }

    render() {
        return (
            <div className='container maint-cnt' style={{marginTop: "10%"}}>    
                <div className='container form-container signup'>
                    <div className="form-input">
                        <h2 style={{textAlign: "center"}}>Sign Up</h2>
                        <form onSubmit={(e) => { this.submitData(e) }}>
                            <div class="form-group">
                                <label>First Name<b style={{color: "red"}}>*</b></label>
                                <input className="form-control" type="text" name="firstname" required onChange={e => this.handlefname(e)} />
                                <p style={{color: "red", fontSize: "10px"}}> {this.state.firstError} </p>
                            </div>
                            <div class="form-group">
                                <label>Last Name<b style={{color: "red"}}>*</b></label>
                                <input className="form-control" type="text" name="lastname" required onChange={e => this.handlelname(e)} />
                                <p style={{color: "red", fontSize: "10px"}}> {this.state.lastError} </p>
                            </div>
                            <div class="form-group">
                                <label>Email Id<b style={{color: "red"}}>*</b></label>
                                <input className="form-control" type="text" name="email" required onChange={e => this.handleemail(e)} />
                                <p style={{color: "red", fontSize: "10px"}}> {this.state.emailError} </p>
                            </div>
                            <div class="form-group">
                                <label>Password<b style={{color: "red"}}>*</b></label>
                                <input className="form-control" type="password" name="password" required onChange={e => this.handlepassword(e)} />
                                <p style={{color: "red", fontSize: "10px"}}> {this.state.passwordError} </p>
                            </div>
                            <div class="myform-button">
                                <button type="submit" className="myform-btn">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp