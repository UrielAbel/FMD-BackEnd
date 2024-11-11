const {body, validationResult} = require('express-validator')


const createArticleValidator = [
    body('title')
    .exists().withMessage('El campo title es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo title debe ser un String')
    .notEmpty().withMessage('El campo title no puede estar vacio y/o ser cadena de texto vacia')    
    ,
    body('description')
    .exists().withMessage('El campo description es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo description debe ser un String')
    .notEmpty().withMessage('El campo description no puede estar vacio y/o ser cadena de texto vacia')    

    ,
    body('imageUrl')
    .exists().withMessage('El campo imageUrl es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo imageUrl debe ser un String')
    .notEmpty().withMessage('El campo imageUrl no puede estar vacio y/o ser cadena de texto vacia')    

    ,
    body('category')
    .exists().withMessage('El campo category es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo category debe ser un String')
    .notEmpty().withMessage('El campo category no puede estar vacio y/o ser cadena de texto vacia')   

    ,
    body('author')
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
    body('CDNurl')
    .exists().withMessage('El campo CDNurl es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo CDNurl debe ser un String')
    .notEmpty().withMessage('El campo CDNurl no puede estar vacio y/o ser cadena de texto vacia')    

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


module.exports = { createArticleValidator }
