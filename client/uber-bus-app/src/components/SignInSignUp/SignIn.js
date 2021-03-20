import React, { Component } from 'react'
import './main.css'
import { signin } from './UserFunctions';

function validate(email, password) {
    let errors = []
    errors.push("");
    errors.push("");

    if (email.length < 5) {
        errors[0] = "Email should be at least 5 charcters long";
    } else if (email.split("").filter(x => x === "@").length !== 1) {
        errors[0] = "Email should contain '@'";
    }else if (email.indexOf(".") === -1) {
        errors[0] = "Email should contain at least one dot";
    }
    
    if (password.length < 8) {
        errors[1] = "Password should be at least 8 characters long";
    }

    return errors;
}

// export default function SignIn({ history }) {
class SignIn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: ''
        }

        this.goToSignUp = this.goToSignUp.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.submitData = this.submitData.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('userID') !== null) {
            this.props.history.push('/booking')
        }
    }

    goToSignUp = e => {
        e.preventDefault()
        this.props.history.push('/signup')
    }

    handleEmail = e => {
        let value = e.target.value
        this.setState({
            email: value
        })
    }

    handlePassword = e => {
        let value = e.target.value
        this.setState({
            password: value
        })
    }

    submitData = e => {
        const email = this.state.email
        const password = this.state.password

        const errors = validate(email, password);

        if (errors[0].length > 0 || errors[1].length > 0) {
            this.setState({
                emailError: errors[0],
                passwordError: errors[1]
            });
            e.preventDefault();
        } else {
            e.preventDefault();
            const user = {
                email: this.state.email,
                password: this.state.password
            }

            signin(user).then(res => {
                if (res.status === 200) {
                    let msg = res.data["message"];
                    if (msg.includes("not found") || msg.includes("Incorrect email ID")) {
                        this.setState({
                            emailError: msg,
                            passwordError: ''
                        });
                    } else if (msg.includes("Incorrect password")) {
                        this.setState({
                            emailError: '',
                            passwordError: msg
                        });
                    } else {
                        localStorage.setItem('userID', res.data["userID"])
                        localStorage.setItem('firstname', res.data["firstname"])
                        console.log(localStorage.getItem('userID'));
                        this.props.history.push('/booking');
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
                <div className='container form-container'>
                    <div className="form-input">
                        <h2 style={{textAlign: "center"}}>Sign In</h2>
                        <form onSubmit={(e) => { this.submitData(e) }}>
                            <div class="form-group">
                                <label>Email-Id</label>
                                <input className="form-control" value={this.state.email} type="text" name="email" required onChange={e => this.handleEmail(e)} />
                                <p style={{color: "red", fontSize: "10px"}}> {this.state.emailError} </p>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input className="form-control" value={this.state.password} type="password" name="password" required onChange={e => this.handlePassword(e)} />
                                <p style={{color: "red", fontSize: "10px"}}> {this.state.passwordError} </p>
                            </div>
                            <div class="myform-button">
                                <button type="submit" className="myform-btn">Sign In</button>
                            </div>
                            <div>
                                <small className="form-text text-muted signup-text">Not Registered?
                                
                                <span className="signUPtext"><a href="/#" style={{color: "#000000", fontWeight: "bold"}} onClick={(e) => this.goToSignUp(e)}> Sign Up</a></span>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn