var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
  params: {q: 'eminem'},
  headers: {
    'x-rapidapi-key': '5f5d929404msh6563b4f5c3e3573p10439ejsn4007b422d60e',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});