const User = require("./../models/User.model");
const { generateToken }= require("./../utils/jwt.utils");
const { hashPassword , comparePassword }= require("./../utils/hash.utils");

const register = async (req,res) => {
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                msg: "Please fill all the required fields"
            })
        }
        
        const userExist = await User.findOne({email});
        
        if(userExist){
            return res.status(400).json({
                msg:"User already exists."
            })
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save();

        const token = generateToken({id : newUser._id});

        res.status(200).json({
            msg:"User registered successfully",
            token: token,
            user:[{
                name: newUser.name,
                email: newUser.email,
                userId: newUser._id
            }]
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg:"Internal server error."
        })
    }
}

const login = async (req,res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                msg: "Please enter the credentials."
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(403).json({
                msg: "User doesn't exist."
            })
        }

        const passwordValidity = await comparePassword(password , user.password );

        if(!passwordValidity){
            return res.status(403).json({
                msg: "Incorrect Passowrd."
            })
        }

        const token = await generateToken({id: user._id});

        res.status(200).json({
            token: token,
            msg: "Logged In."
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg:"Internal server error."
        })
    }
}

module.exports = {
    register,
    login
};