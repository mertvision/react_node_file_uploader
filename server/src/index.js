/**
 * The main file for Node.js server
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Declaration of Module Names
let express;
let helmet;
let morgan;
let cors;

// Import Statement of Third Party Libraries
try{
   express = require("express");
   helmet = require("helmet");
   morgan = require("morgan")
    cors = require("cors");

}
catch(err){
   console.log("Import Statement of Third Party Libs in Main file has been failed.");
   console.log(err)
}

// Import Statement of Node Libraries
const path = require("path");

// Import Statement of Our Libraries
const initConfiguration = require("./config/config");
const init = require("./init/init");
const uploadFiles = require("./middlewares/upload");

// Server variable declaration and value assigment
const server = express();

// Start server configuration
initConfiguration();

// Server middlewares
server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use("/images",express.static(path.join(__dirname, "../", "public", "images")));
server.use("/videos",express.static(path.join(__dirname, "../", "public", "videos")))

// Server routes
server.get('/', async(req,res)=>{
   res.end("hello world");
});

// Upload file or files route
server.post('/upload', uploadFiles.fields([{name: 'image'}, {name: 'video'}]), async (req, res, next)=> {
   const {image} = req.files;
   const {video} = req.files;
   const title = req.body;
   console.log(image, video, title)
   return res.status(200).json({
      success: true,
      message: "Files has been uploaded."
   });
});

// Start server, invoke init() fonksiyon
init(server);
