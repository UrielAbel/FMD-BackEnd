const {body, validationResult} = require('express-validator')


const removeSavedPodcastValidator = [
    body('podcastUri')
    .exists().withMessage('El campo podcastUri es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo podcastUri debe ser del tipo String')
    .notEmpty().withMessage('El campo podcastUri no puede ser cadena de texto vacia')
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
    

module.exports = { removeSavedPodcastValidator }
