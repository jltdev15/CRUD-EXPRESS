const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = require('./app')
const port = process.env.PORT || 4000;
dotenv.config({path: './config.env'});
const db = process.env.DATABASE_LOCAL;

mongoose.connect(db,{
    useNewUrlParser: true,
   

}).then(() => console.log('Connections Success!'));

app.listen(port, () => {
    console.log("Server is running in port 4000");
})