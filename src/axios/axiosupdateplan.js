var axios = require('axios')

//传给后台数据

 function axiosgetplan(data,callback){   
    axios.post("http://localhost:8081/api/updateuserplan",data)
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
module.exports = axiosgetplan


