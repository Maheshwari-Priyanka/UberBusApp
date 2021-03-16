import React, { useState } from 'react'
import './main.css'
export default function SignUp({ history }) {

    let [userData, setUserData] = useState({})

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
        history.push('/signin')
    }

    return (
        <div className='container maint-cnt'>
            {/* <div className="header-nav">
                <span className="mytext1"> Uber Bus App </span>
            </div>
            
            <div className="">
            </div> */}

            <div className='container form-container signup'>
                <div className="form-input">
                    <h2 style={{textAlign: "center"}}>Sign Up</h2>
                    <form onSubmit={(e) => { submitData(e) }}>
                        <div class="form-group">
                            <label>First Name</label>
                            <input className="form-control" type="text" name="firstname" required onChange={e => handleChangeEvent(e, 'firstname')} />
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input className="form-control" type="text" name="lastname" required onChange={e => handleChangeEvent(e, 'lastname')} />
                        </div>
                        <div class="form-group">
                            <label>Email-Id</label>
                            <input className="form-control" type="email" name="email" required onChange={e => handleChangeEvent(e, 'email')} />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password" required onChange={e => handleChangeEvent(e, 'password')} />
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