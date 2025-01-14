const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true]        
    },
    password: {
        type: String,
        required: [true]
    },
    refreshToken: { type: String },
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {         
        const auth = await bcrypt.compare(password, user.password);   
        if(auth) {
            return user;
        }     
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;