var axios = require('axios')

//传给后台数据

 function axiospostsearch(data,callback){   
    axios.post("http://localhost:8081/api/postdata",data)
    .then(function(response){
        // return response.data;
        var goodsdata = response.data;
        // console.log(response)
        callback(goodsdata);
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })
    

}
module.exports = axiospostsearch
