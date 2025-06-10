import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    ImageUrl:{
        type:String,
    },
    cartItem:{
        type: Object,
        default: {}
    }
},{minimize: false, timestamps: true});

const User = mongoose.models.user || mongoose.model('user', userSchema);
export default User;