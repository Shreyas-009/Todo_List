const mongoose = require('mongoose');
const URL = process.env.MongoUrl;


mongoose.connect(URL).then(() => {
    console.log("connected successfully");
}).catch((error) => {
    console.error(`Error connecting ${error}`);
}); 