
function getInsta(theSentiment){

	if (theSentiment === "negative"){
		var sadArray = ["roses","babies","flowers","puppies","olaf","kittens","teddybear"];
		var theTag = sadArray[Math.floor(Math.random()*(6))];
		var instaRequest = "https://api.instagram.com/v1/tags/" + theTag + "/media/recent?client_id=fa91ead3b7d049b3b407ac261af0a78d&count=1";

		$.ajax({
			url: instaRequest,
			type: "GET",
			dataType: "jsonp",
			error: function(data){
				console.log("This ain't good");
				console.log(data);
			},
			success: function(data){
				console.log(theTag);
				console.log("success!");
				console.log(data);

				var instaPic = data.data[0].images.standard_resolution.url;
				console.log(instaPic);
				var instaImageString = "<img src='" + instaPic + "''>";
				$(".theImage").html(instaImageString);
			}
		});
	}
}

function getSentiment(searchTerm){

	var tempStr = '<div class="reply">Currently thinking over what you just said...</div>';
	$('.theReply').html(tempStr);

	var searchTermSend = encodeURIComponent(searchTerm);
	var rawRequester="https://www.tweetsentimentapi.com/api/?key=ba29ad03bf2d3d6c002935a0a238c928b6f8cc55&text=";
	var sentiURL = rawRequester+searchTermSend;

	$.ajax({
		url: sentiURL,
		type: 'GET',
		error: function(data){
			console.log("There is a problem bruv!");
			console.log(data);
		},
		success: function(data){
			console.log("This is good");
			console.log(data);
			console.log(data.responseText);
			var resp = data.responseText;
			var stringResp = resp.slice(19,-14);
			
			console.log(stringResp);
			
			var dataObj = JSON.parse(stringResp);
			console.log(dataObj);
			
			var genSentiment = dataObj.sentiment;
			console.log(genSentiment);
			var probability = dataObj.score;
			console.log(probability);
			var goodTimeArray = ["It's good that you are feeling good and all, but I don't really care. Enter something sad/bad/generally suckish!", "Anything bad happened? How do you feel about that?","Remember that time something crappy happened? How did it make you feel?"];
			var goodTime = goodTimeArray[Math.floor(Math.random()*(3))];
			var badTime = "That's not so good. I hope this cheers you up!";
			var neutralTimeArray =['K dude...','Enter something proper.','Bruh, chill and enter something decent.'];
			var neutralTime = neutralTimeArray[Math.floor(Math.random()*(3))];

			$('.theReply').html('');

			if (Math.abs(probability) > 0 && genSentiment=='positive'){
				replyStr = '<div class="reply">'+goodTime+'</div>';
				$('.theReply').html(replyStr);
			} else if (Math.abs(probability) > 0 && genSentiment=='negative') {
				replyStr = '<div class="reply">'+badTime+'</div>';
				$('.theReply').html(replyStr);
			} else {
				replyStr = '<div class="reply">'+neutralTime+'</div>';
				$('.theReply').html(replyStr);
			}

			getInsta(dataObj.sentiment);
		}
	});
}

$(document).ready( function(){

	$('input').keypress( function(e){
		if (e.which == 13) {
			console.log("You pressed enter");
			var userFeel = $('input').val();
			$('.theReply').html('');
			$(".theImage").html('');
			getSentiment(userFeel);

			console.log(userFeel);
		}

	});
});
