const { ConectarDB } = require("./DataBase/ConectarDB.js");

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Funcion para conetarse a la base de datos
console.log("llego aca 1");
ConectarDB();
console.log("llego aca 2");

// Ruta Inicial (Home)

app.use("/", require("./routes/IndexRoute.js"));

// RUTA DEL FORMULARIO DE FeyWeb (TEMPORAL!!)

app.use("/", require("./routes/FeyWeb/FormularioEmail.js"));

app.use("/", require("./routes/SignupRoutes/SignupForm.js"));
app.use("/", require("./routes/SignupRoutes/Signup.js"));
app.use("/", require("./routes/SignupRoutes/confirmEmail.js"));
app.use("", require("./routes/SignupRoutes/reSendEmailConfirmation.js"));

app.use("/", require("./routes/LoginRoutes/loginform.js"));
app.use("/", require("./routes/LoginRoutes/login.js"));

// Rutas del usuario
app.use("/", require("./routes/UserRoutes/userProfile.js"));

app.use("/", require("./routes/LoginRoutes/verifyIsLoggedIn.js"));

// Rutas Para crear Podcasts O Articulos

app.use("/", require("./routes/PodcastsRutas/createPodcast.js"));
app.use("/", require("./routes/ArticulosRutas/createArticle.js"));

// Rutas para editar Un Podcast O Artiulo

app.use("/", require("./routes/PodcastsRutas/editPodcast.js"));
app.use("/", require("./routes/ArticulosRutas/editArticle.js"));

// Rutas para Obtener Todos los Podcasts o Articulos

app.use("/", require("./routes/PodcastsRutas/getPodcasts.js"));
app.use("/", require("./routes/ArticulosRutas/getArticles.js"));

// Rutas para Obtener Podcasts O Articulos Preparados para el Home

app.use("/", require("./routes/PodcastsRutas/getPodcastsHome.js"));
app.use("/", require("./routes/ArticulosRutas/getArticlesHome.js"));

// Rutas para Eliminar un Podcast O un Articulo

app.use("/", require("./routes/PodcastsRutas/deletePodcast.js"));
app.use("/", require("./routes/ArticulosRutas/deleteArticle.js"));

// Ruta para Obtener Contenido Por Palabra Clave Ingresada por el Usuario

app.use(
	"/",
	require("./routes/ContenidoRutas/ObtenerContenidoPalabraClave.js"),
);

// Ruta para Obtener Conenido Por Categoria ingresada por el Usuario

app.use("/", require("./routes/ContenidoRutas/obtenerContenidoCategoria.js"));

// Rutas para guardar un Podcast/Articulo

app.use("/", require("./routes/PodcastsRutas/savePodcast.js"));
app.use("/", require("./routes/ArticulosRutas/saveArticle.js"));

// Rutas para obtener los Podcasts/Articulos guardados por el usuario

app.use("/", require("./routes/PodcastsRutas/getSavedPodcasts.js"));
app.use("/", require("./routes/ArticulosRutas/getSavedArticles.js"));

// Rutas para remover un Podcast/Articulo guardado por el usuario

app.use("/", require("./routes/PodcastsRutas/removeSavedPodcast.js"));
app.use("/", require("./routes/ArticulosRutas/removeSavedArticles.js"));

// Demas rutas quizá temporales...

app.use("/", require("./routes/libreriaRoutes/SubirImagen.js"));

app.use("/", require("./routes/libreriaRoutes/ObtenerLibreria.js"));

// MIDDLEWARE PARA DETECTAR SI EXISTE LA RUTA

app.use((req, res, next) => {
	res
		.status(404)
		.json({
			error: `La Ruta: ${req.url} no ha sido encontrada. Metodo de la peticion: ${req.method}`,
		});
});

// MIDDLEWARE PARA MANEJAR ERRORES EN GENERAL

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ error: `${err.name}: ${err.message}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
