const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();
app.set("view engine","ejs");
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'))

const userRoutes = require('./routes/userRoute');
const viewRoutes = require('./routes/viewRoute');

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/api/v1/users', userRoutes);
app.use('/', userRoutes);
app.use('/', viewRoutes);

app.all('*', (req,res, next) => {
    res.render('errorView',{
        errorMessage: `Cant find this ${ req.originalUrl } on this server!`
    })
})



module.exports = app;