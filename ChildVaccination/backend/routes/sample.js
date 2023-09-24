const express = require('express');
const router = express.Router();

router.get('/samples',async (req,res)=>{
    res.send("hello I am from sample")
})
router.get('/tej',(req,res)=>{
    res.send("hello i am from tej route")
})

module.exports=router