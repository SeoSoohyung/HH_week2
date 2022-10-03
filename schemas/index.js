const mongoose = require("mongoose"); 

const connect = () => {
    mongoose
    .connect("mongodb://admin:1234@3.34.127.89:27017/admin",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        })
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports= connect; 