function getActualResults(callback) {
	var matches = $.getJSON('https://world-cup-json.herokuapp.com/matches'
							, function(data) {
								callback(JSON.parse(data));
							});
	// var matchesObj = JSON.parse(matches);
}

function thing(function(name) {
	console.log(name)
}

	// var selections = $.getJSON('./selections.json');


	var res = alasql('SELECT * FROM ? selections \
						JOIN ? matches ON selections.matches.home_team = matches.home_team \
						and ? matches.matches.away_team = selections.away_team' \
						,[matches, selections]
					);

	// var res = alasql('SELECT * FROM ? matchesObj' 
						// ,[matchesObj]
					// );
					
					
		// document.getElementById("res").textContent = JSON.stringify(res);
		
		https://stackoverflow.com/questions/42298265/alasql-nested-arrays
 // }	
function getWorldCupScores() {
	$.getJSON('https://world-cup-json.herokuapp.com/matches',
	function (json) {
		var tr;
		for (var i = 0; i < json.length; i++) {
			tr = $('<tr/>');
			tr.append("<td>" + json[i].datetime + "</td>");
			tr.append("<td>" + json[i].status + "</td>");
			tr.append("<td>" + json[i].home_team.country + "</td>");
			tr.append("<td>" + json[i].home_team.goals + " - " + json[i].away_team.goals +"</td>");
			tr.append("<td>" + json[i].away_team.country + "</td>");
			tr.append("<td>" + json[i].winner + "</td>");
			$('#table').append(tr);
		}
	});
 }
 
 //function mergeDataSets