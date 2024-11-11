const {body, validationResult} = require('express-validator')


const FormValidator = [
    body('userEmail')
    .exists().withMessage('El campo userEmail es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo userEmail debe ser del tipo String')
    .isEmail().withMessage('El campo userEmail debe ser tipo email')
    .notEmpty().withMessage('El campo userEmail no puede ser cadena de texto vacia'),

    body('userName')
    .exists().withMessage('El campo userName es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo userName debe ser del tipo String')
    .notEmpty().withMessage('El campo userName no puede ser cadena de texto vacia'),
    
    body('userMessage')
    .exists().withMessage('El campo userMessage es requerido y no ha sido proporcionado')
    .isString().withMessage('El campo userMessage debe ser del tipo String')
    .notEmpty().withMessage('El campo userMessage no puede ser cadena de texto vacia')

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
    

module.exports = { FormValidator }
