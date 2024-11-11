const {body, validationResult} = require('express-validator')


    const validar = [
        body('nombre')
        .exists().withMessage('El campo nombre es obligatorio y no fue proporcionado')
        .isString().withMessage('El campo nombre debe ser una cadena de texto (String)')
        .notEmpty().withMessage('El campo de nombre no puede ser una cadena de texto vacia')
        ,
        body('edad')
        .exists().withMessage('El campo edad es obligatorio y no fue proporcionado')
        .isNumeric().withMessage('La edad debe ser del tipo numero (Number)')
        ,
        body('email')
        .exists().withMessage('El campo email es obligatorio y no fue proporcionado')
        .isString().withMessage('El campo email debe ser una cadena de texto (String)')
        .isEmail().withMessage('El email debe ser de tipo email')
        ,
        (req, res, next) => {
            const errores = validationResult(req)

            if (!errores.isEmpty()) {
                const errorMessages = errores.array().map(error => error.msg);
                return res.status(400).json({ errores: errorMessages })
            }
            // Si no hay errores ejecuta la siguiente ruta del middleware
            next();
        }
    ]
    

module.exports = { validar }
