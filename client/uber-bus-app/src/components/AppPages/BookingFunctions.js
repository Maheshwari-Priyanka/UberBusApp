import axios from 'axios';
const url = "http://localhost:5000/busapp/";

export const getbuses = booking => {
    return axios
    .get(url+"getbuses", {
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

export const getbookings = booking => {
    return axios
    .get(url+"getbookings", {
        userID: booking.id
    }).then(res => {
        console.log(res);
        return res;
    }).catch(res => {
        console.log(res)
    })
}