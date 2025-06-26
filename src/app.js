import express from "express";
import router from "./routes/character.routes.js";
import {start_DB} from "./config/database.js"


const PORT = process.env.PORT;
const app = express();
//Se usa el middleware built-il json() para que el server pueda tomar JSON
app.use(express.json());
//Se usan las rutas a partir del path /api
app.use("/api", router);

//Error handling middleware para responder accesos a rutas que no existen
app.use((req, res)=>{
    res.status(404).json({errorMessage: "Direction not found."});
});

start_DB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Servidor corriendo.");
    });
});