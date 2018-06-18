function getActualResults() {
	var POINTS_FOR_MATCH_WIN = 1;
	var POINTS_FOR_GROUP_WIN = 4;
	var POINTS_FOR_GROUP_SEC = 2;
	
	var matchesObj;
	var selectionsObj;
	var resultArr = [];
	$.getJSON('https://world-cup-json.herokuapp.com/matches'
		, function(data) {
			//console.log(data);
		})
		.done(function(data) {
			matchesObj = data;
			console.log(matchesObj);
			
			var selections = $.getJSON('https://api.myjson.com/bins/19x5i6'
				, function(data) {
				//console.log(data);
				})
				.done(function(data) {
					selectionsObj = data;
					console.log(selectionsObj);
					

					var selectionsResult = [];
					for (var s in selectionsObj) {
						//console.log({name: selectionsObj[s].playerName, score:0});
						// if (s > 1)
							// break;
						resultArr.push({name: selectionsObj[s].playerName, score:0})
						//console.log(resultArr);
						
						for (var m in selectionsObj[s].matches) {
							// console.log(selectionsObj[s].matches[m]);
							for (var am in matchesObj) {
								if (matchesObj[am].status != 'completed')
									continue;
								
								//console.log(matchesObj[am].away_team.country);
								//console.log(selectionsObj[s].matches[m].awayTeam);//.matches[m].away_team);
								//console.log('Matches Home Team' +matchesObj[am].home_team );
								//console.log('Selections Home TEam' + selectionsObj[s].matches.home_team);
								//console.log('Matches WInner' +matchesObj[am].winner );
								//console.log('Selections Winner' + selectionsObj[s].matches.winner);
								
								
								
								
								if (matchesObj[am].away_team.country ==  selectionsObj[s].matches[m].awayTeam
									&& matchesObj[am].home_team.country ==  selectionsObj[s].matches[m].homeTeam
									&& matchesObj[am].winner ==  selectionsObj[s].matches[m].winner)
									resultArr[s].score += POINTS_FOR_MATCH_WIN;
									
							}
						}
					}
						
						
					//console.log(selectionsResult);
					console.log(resultArr);
					
					var tr;
					for (var i = 0; i < resultArr.length; i++) {
						tr = $('<tr/>');
						tr.append("<td>" + resultArr[i].name + "</td>");
						tr.append("<td>" + resultArr[i].score + "</td>"); 
						$('#resulttable').append(tr); 
					} 					
				}
			);
			
			
			
		});
	// var matchesObj = JSON.parse(matches);
	
	//console.log(matchesObj);
}
	

// function getActualResults() {
	// return $.ajax({
		// url: "https://world-cup-json.herokuapp.com/matches",
		// dataType: "json",
		// data: 
	
	
	
	
	// var matchesObj;
	// $.when($.getJSON('https://world-cup-json.herokuapp.com/matches'
							// , function(data) {
								// console.log(data);
							// })
							// .done(function(data) {
								// matchesObj = data;
								// console.log(matchesObj);
							// })
							// ;
	// // var matchesObj = JSON.parse(matches);
	// ) {
		// console.log(matchesObj);
	// }
// }

// function calculateResults (selections, matches) {
	// var POINTS_FOR_MATCH_WIN = 1;
	// var POINTS_FOR_GROUP_WIN = 4;
	// var POINTS_FOR_GROUP_SEC = 2;
	
	// for 
// }
	

	// var selections = $.getJSON('https://api.myjson.com/bins/19x5i6');


	/*var res = alasql('SELECT * FROM ? selections \
						JOIN ? matches ON selections.matches.home_team = matches.home_team \
						and ? matches.matches.away_team = selections.away_team' \
						,[matches, selections]
					);*/

	// var res = alasql('SELECT * FROM ? matchesObj' 
						// ,[matchesObj]
					// );
					
					
		// document.getElementById("res").textContent = JSON.stringify(res);
		
		//https://stackoverflow.com/questions/42298265/alasql-nested-arrays
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