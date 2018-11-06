const express = require('express');
const router = express.Router();

router.get('/tets',(req,res)=>{
    res.send('<h1>Hello work</h1>')
})

module.exports = router;