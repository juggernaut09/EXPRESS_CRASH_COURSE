const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members')



const app = express();

//init middleware
// app.use(logger);

//Handle bars middlewares
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//HomePage route
app.get('/',(req,res) => res.render('index', {
    title: 'Member App',
    members
}));

// set a static folder
app.use(express.static(path.join(__dirname,'/public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started at port ${PORT}`))
