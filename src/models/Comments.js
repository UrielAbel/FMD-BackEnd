const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentsSchema = new Schema({
    authorName: {
        type:String,
        required: [true, 'El campo authorName es requerido y no ha sido proporcionado']
    },
    comment: {
        type:String,
        required: [true, 'El campo comment es requerido y no ha sido proporcionado']
    }
},
{
    timestamps:true
})


const Comments = mongoose.model('Comments', CommentsSchema, 'Comments')

module.exports = Comments;
