var axios = require('axios')

//传给后台数据

 function axiosselectuserstar(data,callback){   
    axios.post("http://localhost:8081/api/getuserluntanname",data)
    .then(function(response){
        
        callback(response.data);
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })


}
module.exports = axiosselectuserstar


