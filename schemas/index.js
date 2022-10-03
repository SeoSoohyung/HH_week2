const mongoose = require("mongoose"); 

const connect = () => {
    mongoose
    .connect("mongodb://admin:1234@localhost:27017/prac01")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports= connect; 