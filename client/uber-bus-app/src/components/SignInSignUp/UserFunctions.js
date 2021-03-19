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
        res = {"message": "Success"};
        return res;
        // return res.data;
    }).catch(res => {
        console.log(res);
        res = {"message": "Server Error"};
        return res;
        // return res.data;
    })
}

export const signin = user => {
    return axios
    .get(url + "signin", {
        email: user.email,
        password: user.password
    }).then(res => {
        console.log(res);
        return res;
    }).catch(res => {
        console.log(res);
        return res;
    })
}