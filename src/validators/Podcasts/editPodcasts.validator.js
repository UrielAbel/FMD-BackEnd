const {body, validationResult} = require('express-validator')


const editPodcastsValidator = [
    body('editedPodcast.title')
    .exists().withMessage('El campo title es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo titulo debe ser del tipo String')
    .notEmpty().withMessage('El campo titulo no puede ser cadena de texto vacia')
    
    ,
    body('editedPodcast.description')
    .exists().withMessage('El campo description es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo description debe ser del tipo String')
    .notEmpty().withMessage('El campo description no puede ser cadena de texto vacia')

    ,
    body('editedPodcast.category')
    .exists().withMessage('El campo category es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo category debe ser del tipo String')
    .notEmpty().withMessage('El campo category no puede ser cadena de texto vacia')

    ,
    body('editedPodcast.subCategory')
    .exists().withMessage('El campo subCategory es requerido y no ha sido proporcionado')
    .isArray().withMessage('El campo subCategory debe ser del tipo Array')
    
    ,                                                                                       
    body('editedPodcast.imageUrl')
    .exists().withMessage('El campo imageUrl es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo imageUrl debe ser del tipo String')
    .notEmpty().withMessage('El campo imageUrl no puede ser cadena de texto vacia')

    ,
    body('editedPodcast.relatedContent')
    .exists().withMessage('El campo relatedContent es requerido y no ha sido proporcionado')
    .isArray().withMessage('El campo relatedContent debe ser del tipo Array')

    .custom((value, { req }) => {
        if (!value.some(objeto => objeto.uri)) {
            throw new Error('El campo uri de relatedContent es necesario y no ha sido proporcionado');
        }
        else if (!value.every(objeto => typeof objeto.uri === 'string')) {
            throw new Error('El campo uri de relatedContent debe ser un String')
        }
        else if (value.every(objeto => objeto.uri === "")) {
            throw new Error('El campo uri de relatedContent no puede ser cadena de texto vacia')
        }
        
        return true 
    })

    .custom((value, { req }) => {

        if (!value.some(objeto => objeto.imageUrl)) {
            throw new Error('El campo imageUrl de relatedContent es necesario y no ha sido proporcionado')
        }
        else if (!value.every(objeto => typeof objeto.imageUrl === 'string')) {
            throw new Error('El campo imageUrl de relatedContent debe ser un String')
        }
        else if (value.every(objeto => objeto.imageUrl === "")) {
            throw new Error('El campo imageUrl de relatedContent no puede ser cadena de texto vacia')
        }

        return true
    })
    
    ,
    body('editedPodcast.episodes')
    .exists().withMessage('El campo episodes es requerido y no ha sido proporcionado')
    .isArray().withMessage('El campo episodes debe ser del tipo Array')

    .custom((value, { req }) => {

        if (!value.some(objeto => objeto.title)) {
            throw new Error('El campo title del episodio es necesario y no ha sido proporcionado')
        }
        else if (!value.every(objeto => typeof objeto.title === 'string')) {
            throw new Error('El campo title de el episodio debe ser un String')
        }
        else if (value.every(objeto => objeto.title === "")) {
            throw new Error('El campo title de el episodio no puede ser cadena de texto vacia')
        }
        return true
   })
   
   .custom((value, { req }) => {
    
        if (!value.some(objeto => objeto.description)) {
            throw new Error('El campo description del episodio es necesario y no ha sido proporcionado')
        }
        else if (!value.every(objeto => typeof objeto.description === 'string')) {
            throw new Error('El campo description del episodio debe ser un String')
        }
        else if (value.every(objeto => objeto.description === "")) {
            throw new Error('El campo desciption de el episodio no puede ser cadena de texto vacia')
        }
        return true

    })

    .custom((value, { req }) => {
    
        if (!value.some(objeto => objeto.audioUrl)) {
            throw new Error('El campo audioUrl del episodio es necesario y no ha sido proporcionado')
        }
        else if (!value.every(objeto => typeof objeto.audioUrl === 'string')) {
            throw new Error('El campo audioUrl del episodio debe ser un String')
        }
        
        else if (value.every(objeto => objeto.audioUrl === "")) {
            throw new Error('El campo audioUrl de el episodio no puede ser cadena de texto vacia')
        }
        return true

    })

    .custom((value, { req }) => {
    
        if (!value.some(objeto => objeto.imageUrl)) {
            throw new Error('El campo imageUrl del episodio es necesario y no ha sido proporcionado')
        }
        else if (!value.every(objeto => typeof objeto.imageUrl === 'string')) {
            throw new Error('El campo imageUrl del episodio debe ser un String')
        }
        else if (value.every(objeto => objeto.imageUrl === "")) {
            throw new Error('El campo imageUrl de el episodio no puede ser cadena de texto vacia')
        }
        return true

    })

    .custom((value, { req }) => {
    
        if (!value.some(objeto => objeto.duration)) {
            throw new Error('El campo duration del episodio es necesario y no ha sido proporcionado')
        }
        else if (!value.every(objeto => typeof objeto.duration === 'number')) {
            throw new Error('El campo duration del episodio debe ser un Numero')
        }
        return true

    })
    ,
    
    body('editedPodcast.author')
    .exists().withMessage('El campo author es requerido y no ha sido proporcionado')
    .isObject().withMessage('El campo author  debe ser del tipo Objeto')

    .custom((value, { req }) => {
    
        if (!value.name) {
            throw new Error('El campo name del autor es necesario y no ha sido proporcionado')
        }
        else if (typeof value.name !== 'string') {
            throw new Error('El campo name del autor debe ser un String')
        }
        else if (value.name === "") {
            throw new Error('El campo name del autor no puede ser cadena de texto vacia')
        }
        return true

    })

    .custom((value, { req }) => {
    
        if (!value.description) {
            throw new Error('El campo description del autor es necesario y no ha sido proporcionado')
        }
        else if (typeof value.description !== 'string') {
            throw new Error('El campo description del autor debe ser un String')
        }
        else if (value.description === "") {
            throw new Error('El campo description del autor no puede ser cadena de texto vacia')
        }
        return true

    })
    ,
    (req, res, next) => {
        const errores = validationResult(req)

        if (!errores.isEmpty()) {
            const erroresInfo = {};

            errores.array().forEach(error => {
                const fieldName = error.path
                const errorMessage = error.msg

                if (!erroresInfo[fieldName]) {
                    erroresInfo[fieldName] = [];
                }

                erroresInfo[fieldName].push(errorMessage);

            })
        
            return res.status(400).json({ errores: erroresInfo })
        }
        // Si no hay errores ejecuta la siguiente ruta del middleware
        next();
    }
]


module.exports = { editPodcastsValidator }
