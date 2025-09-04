const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://2312123:Aj1210@cluster0.ych8ipc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);

