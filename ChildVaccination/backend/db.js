const mongoose=require("mongoose");
// mongoose.connect("mongodb://localhost:27017/mydb",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
const mongoURI="mongodb://0.0.0.0:27017/project"
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

connectDB()