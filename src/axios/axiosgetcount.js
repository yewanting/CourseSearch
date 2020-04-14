var axios = require('axios')

//传给后台数据

 function axiosgetcount(data,callback){   
    axios.post("http://localhost:8081/api/getcount",data)
    .then(function(response){
        // return response.data;
        var goodscount = response.data;
        callback(goodscount);
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })


}
module.exports = axiosgetcount


