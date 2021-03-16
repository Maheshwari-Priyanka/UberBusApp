import React, { useState } from 'react'
import './main.css'
export default function SignIn({ history }) {

    let [userData, setUserData] = useState({})

    const goToSignUp = e => {
        e.preventDefault()
        history.push('/signup')
    }
    const handleChangeEvent = (e, title) => {
        let value = e.target.value
        setUserData({ ...userData, [title]: value })

    }

    const submitData = e => {
        e.preventDefault()
        // // console.log(userData)
        // logFunc.logUserIn(userData)
        //     .then(response => response.data)
        //     .then(data => {
        //         let { token } = data
        //         sessionStorage.setItem('authToken', token)
        //         history.push('/routes')
        //     })
    }

    return (
        <div className='container maint-cnt'>
            {/* <div className="header-nav">
                <span className="mytext1"> Uber Bus App </span>
            </div>
            
            <div className="">
            </div> */}

            <div className='container form-container'>
                <div className="form-input">
                    <h2 style={{textAlign: "center"}}>Sign In</h2>
                    <form onSubmit={(e) => { submitData(e) }}>
                        <div class="form-group">
                            <label>Email-Id</label>
                            <input className="form-control" type="email" name="email" required onChange={e => handleChangeEvent(e, 'email')} />
                            
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password" required onChange={e => handleChangeEvent(e, 'password')} />
                        </div>
                        <div class="myform-button">
                            <button type="submit" className="myform-btn">Sign In</button>
                        </div>
                        <div>
                            <small className="form-text text-muted signup-text">Not Registered?
                            
                            <span className="signUPtext"><a href="/#" onClick={(e) => goToSignUp(e)}> Sign Up</a></span>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}