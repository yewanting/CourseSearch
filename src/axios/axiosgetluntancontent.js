var axios = require('axios')

//传给后台数据

 function axiosgetluntancontent(data,callback){   
    axios.post("http://localhost:8081/api/getluntancontent",data)
    .then(function(response){
        console.log(response.data)
        callback(response.data);
    })
    .catch(function(err){
        console.log(err);
        // callback(err);
    })


}
module.exports = axiosgetluntancontent


