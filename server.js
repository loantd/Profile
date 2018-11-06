const express = require('express');
const mongoose = require('mongoose');
const app= express();

const posts = require('./routers/api/posts');
const profile = require('./routers/api/profile');
const users = require('./routers/api/users');
//DB config
const db = require('./config/keys').mongoURL;

// Connect to MongoDB
mongoose
.connect(db)
.then(()=>console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/',(req,res)=>{
     res.send('Hello');
})

//using router
// app.use('/api/posts',posts)
// app.use('/api/profile',profile)
app.use('/api/users',users)

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server running on port ${port}`));