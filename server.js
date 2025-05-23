import http from "http";
import app from "./app.js";
import sequelize from "./config/sequelize.js";
const server = http.createServer(app);
import { initSocket } from './config/socket.js';


// Define the port
const PORT = process.env.PORT || 3000;



// configure the server
server.listen(PORT, async () =>{
    try{
        // Sync database
        await sequelize.sync();
        console.log(`The server is running on port:${PORT}`);	  
        // Initialize socket.io
        initSocket(server);
    }
    catch(error){
        console.log(error);
    }
})