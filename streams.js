const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {    
//______________________________________________________________________________________
    //solution 1 
//fs.readFile("./2-how-node-works/starter/test-file.txt", (err, data)=>{
//    if(err) console.log(err);
//    res.end(data);
//});
//
//});
//_____________________________________________________________________________________
//solution2
//const readable = fs.createReadStream('./2-how-node-works/starter/test-file.txt')
//readable.on('data',chunk => {
//    res.write(chunk);
//});
//
//readable.on('end', () => {
//    res.end();
//});
//
//readable.on("error", err => {
//    console.log(err);
//    res.statusCode = 500;
//    res.end("File not found");
//});
//____________________________________________________________________________________
//SOLUTION 3
const readable= fs.createReadStream("./2-how-node-works/starter/test-file.txt");
readable.pipe(res);

});



server.listen(8000, '127.0.0.1', () => {
    console.log("Server running at http://localhost:8000/");
});