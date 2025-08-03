const User = require("./../models/User.model");
const { hashPassword } = require("./../utils/hash.utils");

const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        return res.status(200).json(user);
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const updateProfile = async (req,res) => {
    try{
        const { name, email, password } = req.body;
        const user = await User.findById(req.user._id);

        if(name) user.name = name;
        if(email) user.email = email;
        if(password) user.password = await hashPassword(password);

        await user.save();

        res.status(200).json({
            msg: "Profile updated successfully",
            user: user
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const deleteProfile = async (req,res) => {
    try{
        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({
            msg: "Profile successfully deleted."
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg: "INternal server error."
        })
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
}