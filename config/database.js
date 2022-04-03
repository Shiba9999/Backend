const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;


exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex:true,
      // useFindAndModify:false
    })
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch((err) => {
      console.log("error connecting to mongoDB", err);
      process.exit(1);
    });
};
