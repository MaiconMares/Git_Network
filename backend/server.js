const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(routes);

mongoose.connect('mongodb+srv://maiconmares:qnpjeposf4580@cluster0-fcxlf.mongodb.net/test?retryWrites=true&w=majority',
{   
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(3000);