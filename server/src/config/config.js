let dotenv;

try{
    dotenv = require("dotenv")
}
catch(err){
    console.log("Dotenv configuration has been failed.")
}

const initConfiguration =  () => {
    dotenv.config();
};

module.exports = initConfiguration;