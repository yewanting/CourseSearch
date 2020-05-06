var axios = require('axios')

//传给后台数据

 function axiosloginuserinfo(data,callback){   
    axios.post("http://localhost:8081/api/getuserinfo",data)
    .then(function(response){
        // console.log(response)
        callback(response.data)
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })
    

}
module.exports = axiosloginuserinfo
