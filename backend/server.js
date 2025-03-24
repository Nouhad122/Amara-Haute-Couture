const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const server = express();
server.use(express.json());
server.use(cors());


server.use('/admin', adminRoutes);
server.use(shopRoutes);

mongoose.connect('mongodb+srv://nouhadalhallab122:U30eYfNYXwRZJQGz@amara-cluster.wqmrg.mongodb.net/shop?retryWrites=true&w=majority&appName=Amara-Cluster')
.then(() =>{
    server.listen(3000);
})
.catch((err) =>{
    console.log(err);
})



