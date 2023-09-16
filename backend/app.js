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
app.use(cors(
    {
        origin:["http://localhost:3000", "https://dashing-clafoutis-629b65.netlify.app", "https://todolist-react-6rcn.vercel.app"],
        methods:["POST","GET","PUT"],
        credentials:true
    }
));

//ROUTE MIDDLEWARE

app.use('/api', todos);

//PORT

const port = 8000;

app.listen(port, ()=>{
    console.log(`Server running in ${port}`);
})
