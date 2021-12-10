
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const axios = require('axios');



// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


app.get('/', function(req, res) {
	res.render('pages/home',{
		my_title:"TV Show Search",
		response: '',
	});
});

app.post('/search', function(req, res) {
	var title = req.body.title; //TODO: Remove null and fetch the param (e.g, req.body.param_name); Check the NYTimes_home.ejs file or console.log("request parameters: ", req) to determine the parameter names
	
	if(title) {
	  axios({
		url: `https://api.tvmaze.com/singlesearch/shows?q=${title}`,
		  method: 'GET',
		  dataType:'json',
		})
		  .then((response)=> {
			console.log(response.data);
			console.log(response.data.image.medium);
			console.log(response.data.rating.average);
			// TODO: Return the reviews to the front-end (e.g., res.render(...);); Try printing 'items' to the console to see what the GET request to the Twitter API returned.
			// Did console.log(items) return anything useful? How about console.log(items.data.results)?
			// Stuck? Look at the '/' route abov
			res.render('pages/home.ejs',{
				my_title: "TV Information",
				response: response.data,
				title: response.data.name,
				image: response.data.image.medium,
				genre: response.data.genres,
				summary: response.data.summary,
				rating: response.data.rating.average.toString(),
			}
			
			);

		  })
		  .catch(error => {
			console.log(error);
			res.render('pages/home.ejs',{
			  my_title: "TV Information",
			  items: '',
			  error: true,
			  message: "Try searching title again"
			})
		  });
  
  
	}
	else {
	  // TODO: Render the home page and include an error message (e.g., res.render(...);); Why was there an error? When does this code get executed? Look at the if statement above
	  // Stuck? On the web page, try submitting a search query without a search term
	  res.render('pages/home',{
		my_title: "TV Show Reviews",
		response: '',
		items: '',
		error: true,
		message: 'Please try searching again'
	  })
	}
  });
  



app.listen(3000);
console.log('3000 is the magic port');
