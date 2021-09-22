const express=require("express")
const cors=require('cors')
const mongoose=require('mongoose')
const { data } = require("autoprefixer")

mongoose.connect("mongodb://localhost:27017/izuClub")
        .then(()=>{
            console.log("connect to mongodb")
        })
const user=mongoose.model("user",{name:String,surname:String,email:String,password:String})
corsOption={
    origin:"http://localhost:3000"
}
app=express()
app.use(cors(corsOption))

app.post("/sign-up/:name/:surname/:email/:pass",async (req,res)=>{
    console.log(req.params)
    const emailV=await user.find({email:`${req.params.email}`})
    console.log(emailV[0])
    if(emailV[0]===undefined){
        console.log("l'utilisateur n'est pas dans le systeme")
        const newUser=new user({name:req.params.name,surname:req.params.surname,password:req.params.pass,email:req.params.email})
        user.collection.insertOne(newUser)
            .then(console.log("save"))
    }else{
        res.json({"value":"l'utilisateur est deja dans le systeme"})
    }
    res.json({"value":"l'utilisteur a ete enregistrz avec succes"})
})

app.listen(5000,()=>{
    console.log("port: 5000")
})