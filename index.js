$(document).ready(function() {
	//Fade in effect on page load
	$('form').hide().fadeIn(1500);
	//Click event
	$('#search-button').on('click', function() {
		dataCollection();
	});
	//Function that grabs the data from the API
	function dataCollection() {
		$('#search-results').empty();
		$.getJSON('https://en.wikipedia.org/w/api.php?',
			{
				action: 'opensearch',
				search: $('#search-box').val(),
				limit: 20,
				profile: 'fuzzy',
				namespace: 0,
				origin: '*'
			},
			function(data) {
				var searchLimit = data[1].length;
				for (var i = 0; i < searchLimit; i++) {
					var searchResults = '<div class="search-results-container">' +
											'<h1><a target="_blank" href="' + data[3][i] + '">' + data[1][i] + '</a></h1>' +
											'<p>' + data[2][i] + '</p>' +
											//'<a class="btn btn-default" target="_blank" href="' + data[3][i] + '">Wikipedia Article</a>' +
										'</div>';
					$('#search-results').append(searchResults);
				} //End for loop
			} //End sucess function
		).done(function() {
			//Make the animate method execute only once
			$('form').animate({
				top: '10px',
			}, 1000);
			$('#search-results').hide().fadeIn(3000);
		  }); //End of done
		; //End getJSON
	} //End dataCollection function
}); //End ready function