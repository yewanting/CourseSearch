var axios = require('axios')

//传给后台数据

 function axiosdeleteplan(data,callback){   
    axios.post("http://localhost:8081/api/deleteuserplan",data)
    .then(function(response){
        // return response.data;
        // console.log(response.data)
        callback(response.data);
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })


}
module.exports = axiosdeleteplan


