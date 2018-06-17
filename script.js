function thing() {
	var matches = $.getJSON('https://world-cup-json.herokuapp.com/matches');
	var matchesObj = JSON.parse(matches);

	var selections = $.getJSON('./selections.json');
	var selectionsObj = JSON.parse(selections);

	var res = alasql(
		'SELECT * \
		FROM ? selectionsObj \
		JOIN ? matchesObj ON selections.matches.home_team = matchesObj.home_team\
		and ? matchesObj.matches.away_team = selectionsObj.away_team',[matchesObj, selectionsObj]);

		document.getElementById("res").textContent = JSON.stringify(res);
 }	
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
 
 function mergeDataSets