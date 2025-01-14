const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

const handleSignup = async (req,res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            errors: {
                email: "Please enter an email",
                password: ""
            }
        });
    }     

    if (!password) {
        return res.status(400).json({
            success: false,
            errors: {
                email: "",
                password: "Please enter a password"
            }
        });
    }     
    
    if (password.length < 3) {
        return res.status(400).json({
            success: false,
            errors: {
                email: "",
                password: "Password must be at least 3 characters long."
            }
        });
    }  

    // Check for duplicate email in the db
    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
        return res.status(409).json({ // Coflict
            success: false,
            errors: {
                email: "Email is already registered",
                password: ""
            }
        });
    }  

    try {
        // Encrypt the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email, password: hashedPassword });     
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {                  
        res.status(500).json({ success: false, errors: error});
    }
    
}

module.exports = { handleSignup };