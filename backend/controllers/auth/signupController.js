const User = require('../../models/userModel');
const bcrypt = require('bcrypt');

const handleSignup = async (req,res) => {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            errors: {
                fullName: fullName ? "" : "Please enter your full name",
                email: email ? "" : "Please enter your email",
                password: password ? "" : "Please enter a password"
            }
        });
    }      
    
    if (password.length < 3) {
        return res.status(400).json({
            success: false,
            errors: {
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
                email: "Email is already registered"                
            }
        });
    }  

    try {
        // Encrypt the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ fullName, email, password: hashedPassword, role });     
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {                  
        res.status(500).json({ success: false, errors: error});
    }
    
}

module.exports = { handleSignup };