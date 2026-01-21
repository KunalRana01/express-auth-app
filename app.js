const express = require("express")
const app = express()
const userModel = require("./models/user")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("./models/user")
const postModel = require("./models/post")

//setting up middlewares and view engines..

app.set("view engine" , "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.get("/" , (req,res)=>{
    res.render("index")
})

app.get("/login" , (req,res)=>{
    res.render("login")
})

app.post("/create" , async (req,res)=>{

    let {username , name , email , password , age } = req.body

    //Check for for user existence in DB through email...

    let userFound = await userModel.findOne({email})

    if(userFound) return res.status(500).send("user already registered....")
    
    //Since the user doesnt exist , hash the user pass using bcrypt....

    bcrypt.hash(password, 10, async function(err, hash) {
        let userCreated = await userModel.create({
        name,
        username,
        email,
        password : hash,
        age
        })
        
        console.log(hash);
        
    });

    //Generate token using jwt
    let token = jwt.sign({email:email , userid : user._id} , "secretkeyiknowthisisstupid")
    res.cookie("token" , token)
    res.send("User Created....")

})


app.post("/login" , async (req,res)=>{
    let {email,password} = req.body

    let userFound = await userModel.findOne({email})

    if(!userFound) return res.status(500).send("Something went wrong...")
    
    //If user exists then check for the correct password using bcrypt...

    bcrypt.compare(password, userFound.password, function(err, result) {
        
        if(result){
            let token = jwt.sign({email:email , userId : user._id} , "secretkeyiknowthisisstupid")
            res.cookie("token" , token)
            return res.status(200).send("Login Successfull...")
        } 
        else res.redirect("/login")

    });
})


app.get("/logout" , (req,res)=>{
    res.cookie("token", "")
    res.redirect("/login")
})


app.get("/profile" , isLoggedIn ,(req,res)=>{
    console.log(req.user);
    
    res.render("login")
})

function isLoggedIn(req,res,next){
    if(req.cookies.token==="") res.send("You must be logged in....")
    else{
        let data = jwt.verify(req.cookies.token , "secretkeyiknowthisisstupid" )
        req.user = data
    }
    next()
}

app.listen(3000)