const {param, validationResult} = require('express-validator')


const getArticleValidator = [
    param('uri')
    .exists().withMessage('Es requerido un uri para identificar el podcast a editar. No se ha proporcionado')
    .isString().withMessage('El campo uri debe ser un String')
    /*.isAlphanumeric().withMessage('El campo uri debe ser alfanumérico')*/ // ESTA LINEA ESTA COMENTADA POR QUE AVECES nanoid GENERA URIs CON CARACTERES QUE NO SON ALFANUMERICOS.
    .notEmpty().withMessage('El campo uri no puede ser cadena de texto vacia')
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


module.exports = { getArticleValidator }
