var axios = require('axios')

//传给后台数据

 function axiosinsertplan(data,callback){   
    axios.post("http://localhost:8081/api/insertuserplan",data)
    .then(function(response){
        // return response.data;
        
        callback(response.data);
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })


}
module.exports = axiosinsertplan


