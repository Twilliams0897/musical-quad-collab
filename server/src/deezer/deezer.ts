

fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem", {
    "method": "GET",
	"headers": {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		"x-rapidapi-key": process.env.superSecretKey,   
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});