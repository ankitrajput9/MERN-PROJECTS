const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bio: {
        type: String
    },
    profile_pic: {
        type: String
    },
    followers: {
        type: String
    },
    following: {
        type: String
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    },
    isPrivate: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

userSchema.pre("save", async (next) => {
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        console.log("error in bcrypt hashing",error)
    }
})

userSchema.methods.generateJWT = async function(){
    return  jwt.sign({id:this._id},process.env.SECRET_KEY,{expiresIn:"24h"})
}

userSchema.methods.comparePass= async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password)
}
const userModel = mongoose.model("users", userSchema)

module.exports = userModel