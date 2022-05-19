const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/node-api").then(() => {
    console.log("MONGODB connected");
    (err) => {
        if (!err) console.log("Mongodb connected");
        else console.log("Connection error :" + err);
    }
});