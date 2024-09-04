/**
 * Declaration of Server Initialization function 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

const init = (server) => {
    try{
        // Values
        const SERVER_PORT = process?.env?.SERVER_PRIMAL_PORT; // server port
        var serverProtocol = process?.env?.SERVER_PROTOCOL; // https or https
        var serverHost = process?.env?.SERVER_HOST; // localhost etc.
        var cbMessage = `Server is running on ${serverProtocol}://${serverHost}:${SERVER_PORT}`; // server.listen() method's callback message

        server.listen(SERVER_PORT, async ()=> {
            try{
                console.log(cbMessage)
            }
            catch(err){
                console.log(err)
            }
        });
    }
    catch(err){
        console.log(err)
    };
};

module.exports = init;