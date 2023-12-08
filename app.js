const express = require('express');
const path = require('path');

const mainRoutes = require('./routers/main');
const sequelize = require('./util/database');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());

sequelize.sync();
app.use(mainRoutes);

app.listen(3000,()=>{
    console.log("Server is live on port 3000");
})