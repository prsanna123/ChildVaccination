const express=require('express')
const app=express()
const connectToMongo=require('./db')
connectToMongo;
var cors = require('cors')
app.use(cors())
app.use(express.json())

app.use('/api',require('./routes/form'))
app.use('/sample',require('./routes/sample'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/child',require('./routes/auth'))
const port=5000
app.get('/pras',(req,res)=>{
    res.send("hello prasanna")
})
app.listen(port,()=>{
    console.log("app listening at port 5000")
})