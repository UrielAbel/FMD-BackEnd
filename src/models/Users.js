const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose

const UsersSchema = new Schema({
    userName: {
        type:String,
    },
    password: {
        type:String,
    },
    email: {
        type:String,
    },
    emailConfirmed: {
        type : Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    savedPodcasts: [{
        type: Schema.Types.ObjectId,
        ref: 'Podcasts'
    }],
    savedArticles: [{
        type: Schema.Types.ObjectId,
        ref: 'Articulos'
    }]
},
{
    timestamps:true
})

UsersSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})


UsersSchema.methods.isValidPassword = async function (password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

const Users = mongoose.model ('Users', UsersSchema, 'users')


module.exports = Users;
