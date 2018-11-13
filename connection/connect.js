const MongoClient = require('mongodb').MongoClient;


function MongoStart(){

const url = 'mongodb://localhost:27017';

const dbName = 'deviceTokens';

async function dbConnection(){
try{
  MongoClient.connect(url, function (err, client) {
    console.log("Connected mongo");
            global.db=client.db(dbName);
});
}
catch(err){
  console.log(err);
}
}
dbConnection();
}
module.exports={
  MongoStart:MongoStart
};
