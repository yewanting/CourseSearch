var axios = require('axios')

//传给后台数据

 function axiosgetappsearchgoods(data,callback){   
    axios.post("http://localhost:8081/api/get_app_searchgoods",data)
    .then(function(response){
        var homegoods = response.data;
        callback(homegoods);
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })


}
module.exports = axiosgetappsearchgoods

