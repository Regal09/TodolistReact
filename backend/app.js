const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//ROUTES

const todos = require('./routes/todoRoutes');


//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended:true
}));
app.use(cors());

//ROUTE MIDDLEWARE

app.use('/api', todos);

//PORT

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server running in ${port}`);
})
