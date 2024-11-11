const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

function ConectarDB() {
	const dbURL = process.env.dbURL;

	const mongooseOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	mongoose.connect(
		"mongodb+srv://marcioeze:frwv71kIBaYGMxaO@cluster1.0zi9mjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
		mongooseOptions,
	);

	mongoose.connection.on("connected", () => {
		console.error("Conexion a la base de datos exitosa!!");
	});
	mongoose.connection.on("error", (err) => {
		console.log(`Ha ocurrido un error:${err}`);
	});
	mongoose.connection.on("disconnected", () => {
		console.log("La conexion a la base de datos se ha cerrado");
	});
}

module.exports = { ConectarDB };
