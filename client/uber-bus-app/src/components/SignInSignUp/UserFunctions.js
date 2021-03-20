import axios from 'axios';
const url = "http://localhost:5000/busapp/";

export const signup = newUser => {
    return axios
    .post(url+"signup", {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password
    }).then(res => {
        console.log(res);
        return res;
    }).catch(res => {
        console.log(res);
        let errorMessage = {"message": "error"}
        return errorMessage;
    })
}

export const signin = user => {
    return axios
    .post(url + "signin", {
        email: user.email,
        password: user.password
    }).then(res => {
        console.log(res);
        return res;
    }).catch(res => {
        console.log(res);
        let errorMessage = {"message": "error"}
        return errorMessage;
    })
}