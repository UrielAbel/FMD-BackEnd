const mongoose = require('mongoose');
const { Schema } = mongoose;

const PodcastsSchema = new Schema({
    title: {
        type:String,
        required: [true, 'El campo title es requerido y no ha sido proporcionado'],
    },
    description: {
        type:String,
        required: [true, 'El campo description es requerido y no ha sido proporcionado'],
    },
    category: {
        type:String,
        required: [true, 'El campo category es requerido y no ha sido proporcionado'],
    },
    subCategory: {
        type:[String],
        required: [true, 'El campo subCategory es requerido y no ha sido proporcionado'],
    },
    uri: {
        type:String,
        required: [true, 'El campo uri es requerido y no ha sido proporcionado'],
    },
    imageUrl: {
        type:String,
        required: [true, 'El campo imageUrl es requerido y no ha sido proporcionado'],
    },
    relatedContent: {
        type: [{
          imageUrl: String,
          uri: String
        }],
        required: [true, 'El campo relatedContent es requerido y no ha sido proporcionado'],
    },
    episodes: {
    type: [{
        title:String,
        description:String,
        audioUrl:String,
        imageUrl:String,
        duration:Number
    }],
    required: [true, 'El campo episodes es requerido y no ha sido proporcionado'],
    },
    author: {
        type: {
            name:String,
            description:String
        },        
        required: [true, 'El campo author es requerido y no ha sido proporcionado'],
    },
    views: {
        type:Number,
        required: [true, 'El campo views es requerido y no ha sido proporcionado'],
    }
    ,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
{ 
    timestamps: true
});

const Podcasts = mongoose.model('Podcasts', PodcastsSchema, 'Podcasts')

module.exports = Podcasts;
