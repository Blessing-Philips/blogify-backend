const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: "https://www.google.com/imgres?q=default%20profile%20picture&imgurl=https%3A%2F%2Fplay-lh.googleusercontent.com%2Fz-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw%3Dw526-h296-rw&imgrefurl=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.miniarkano.defaultpfp&docid=N7GWDXzptm9qOM&tbnid=xB5JcLlNDjk7GM&vet=12ahUKEwip2Jzhh46JAxV4W0EAHTqMAGMQM3oECEkQAA..i&w=297&h=296&hcb=2&ved=2ahUKEwip2Jzhh46JAxV4W0EAHTqMAGMQM3oECEkQAA"
        }
    }, { timeseries: true }
);

module.exports = mongoose.model('User', UserSchema);