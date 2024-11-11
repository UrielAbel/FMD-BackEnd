const mongoose = require('mongoose');
const { Schema } = mongoose;

const UploadImgSchema = Schema({
    nombre:{
        type:String,
        default:'No se ha encontrado el nombre'
    },
    imagen:{
        type:String,
        default:'No se ha encontrado la imagen'
    }
},
{
    timestamps:true
})


const UploadImg = mongoose.model ('UploadImg', UploadImgSchema, 'libreria')

module.exports = UploadImg;
