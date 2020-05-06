var axios = require('axios')

//传给后台数据

 function axiosgethomegoods(data,callback){   
    axios.post("http://localhost:8081/api/gethomegoods",data)
    .then(function(response){
        // console.log(response.data)
        var homegoods = response.data;
        callback(homegoods);
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })


}
module.exports = axiosgethomegoods

