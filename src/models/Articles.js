const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticulosSchema = new Schema({
    title:{
        type:String,
        required: [true, 'El campo title es requerido y no ha sido proporcionado']
    },
    description:{
        type:String,
        required: [true, 'El campo description es requerido y no ha sido proporcionado']
    },
    imageUrl:{
        type:String,
        required: [true, 'El campo imageUrl es requerido y no ha sido proporcionado']
    },
    category:{
        type:[String],
        required: [true, 'El campo category es requerido y no ha sido proporcionado']
    },
    uri:{
        type:String,
        required: [true, 'El campo uri es requerido y no ha sido proporcionado']
    },
    CDNurl:{
        type:String,
        required: [true, 'El campo CDNurl es requerido y no ha sido proporcionado']
    },
    author: {
        type: {
            name:String,
            description:String
        },        
        required: [true, 'El campo author es requerido y no ha sido proporcionado'],
    },
    views:{
        type:Number,
        required: [true, 'El campo views es requerido y no ha sido proporcionado']
    }
},
{
    timestamps:true
})


const Articles = mongoose.model('Articulos', ArticulosSchema, 'articulos')

module.exports = Articles;
