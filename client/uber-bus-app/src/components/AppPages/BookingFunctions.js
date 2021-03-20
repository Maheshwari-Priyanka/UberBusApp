import axios from 'axios';
const url = "http://localhost:5000/busapp/";

export const getbuses = booking => {
    return axios
    .post(url+"getbuses", {
        source: booking.source,
        destination: booking.destination,
        date: booking.date
    }).then(res => {
        console.log(res);
        return res;
    }).catch(res => {
        console.log(res);
        return res;
    })
}

export const addbooking = booking => {
    return axios
    .post(url+"addbooking", {
        source: booking.source,
        destination: booking.destination,
        date: booking.date,
        bus: booking.busname,
        time: booking.time,
        userID: localStorage.getItem('userID')
    }).then(res => {
        console.log(res);
        return res;
    }).catch(res => {
        console.log(res);
    })
}

export const getbookings = booking => {
    return axios
    .post(url+"getbookings", {
        userID: localStorage.getItem('userID')
    }).then(res => {
        console.log(res);
        return res;
    }).catch(res => {
        console.log(res);
    })
}