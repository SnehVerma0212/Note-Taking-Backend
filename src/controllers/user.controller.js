const User = require("./../models/User.model");
const { generateToken }= require("./../utils/jwt.utils");
const hashPassword = require("./../utils/hash.utils");

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

module.exports = register;