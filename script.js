var selectionJSON = 'https://api.myjson.com/bins/17za2m';
//var selectionJSON = './selections.json';
//var resultsJson = 'https://world-cup-json.herokuapp.com/matches';
var resultsJson = './results.json';

function getActualResults() {
	var POINTS_FOR_MATCH_WIN = 1;
	var POINTS_FOR_GROUP_WIN = 4;
	var POINTS_FOR_GROUP_SEC = 2;
	
	var matchesObj;
	var selectionsObj;
	var resultArr = [];
	$.getJSON(resultsJson
		, function(data) {
			//console.log(data);
		})
		.done(function(data) {
			matchesObj = data;
			//console.log(matchesObj);
			
			var selections = $.getJSON(selectionJSON
				, function(data) {
				//console.log(data);
				})
				.done(function(data) {
					selectionsObj = data;
					//console.log(selectionsObj);
					

					var selectionsResult = [];
					for (var s in selectionsObj) {
						//console.log({name: selectionsObj[s].playerName, score:0});
						// if (s > 1)
							// break;
						var tmp = {name: selectionsObj[s].playerName, score:0};
						resultArr.push(tmp)
						//console.log(resultArr);
						
						for (var m in selectionsObj[s].matches) {
							// var foundMatch = false;
							// console.log(selectionsObj[s].matches[m]);

							for (var am in matchesObj) {
								// if (foundMatch)
									// continue;
								if (matchesObj[am].status != 'completed')
									continue;
								
								//console.log(matchesObj[am].away_team.country);
								//console.log(selectionsObj[s].matches[m].awayTeam);//.matches[m].away_team);
								//console.log('Matches Home Team' +matchesObj[am].home_team );
								//console.log('Selections Home TEam' + selectionsObj[s].matches.home_team);
								//console.log('Matches WInner' +matchesObj[am].winner );
								//console.log('Selections Winner' + selectionsObj[s].matches.winner);
								
								var awayTeam = matchesObj[am].away_team.country;
								var homeTeam = matchesObj[am].home_team.country;
								var away = selectionsObj[s].matches[m].awayTeam;
								var home = selectionsObj[s].matches[m].homeTeam;
								var winner = matchesObj[am].winner ==  selectionsObj[s].matches[m].winner;
								
								if (matchesObj[am].away_team.country ==  selectionsObj[s].matches[m].awayTeam
									&& matchesObj[am].home_team.country ==  selectionsObj[s].matches[m].homeTeam
									&& matchesObj[am].winner ==  selectionsObj[s].matches[m].winner)
									resultArr[s].score += POINTS_FOR_MATCH_WIN;
									// foundMatch = true;
									
							}
						}
					}
						
						
					//console.log(selectionsResult);
					//console.log(resultArr);
					
					var tr;
					for (var i = 0; i < resultArr.length; i++) {
						tr = $('<tr/>');
						tr.append("<td>" + resultArr[i].name + "</td>");
						tr.append("<td>" + resultArr[i].score + "</td>"); 
						$('#resulttable').append(tr); 
					} 		

					defaultSortTable();
				}
			);
			
			
			
		});
	// var matchesObj = JSON.parse(matches);
	
	//console.log(matchesObj);
}
	

// function getActualResults() {
	// return $.ajax({
		// url: "./results.json",
		// dataType: "json",
		// data: 
	
	
	
	
	// var matchesObj;
	// $.when($.getJSON('./results.json'
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
	$.getJSON('./results.json',
	function (json) {
		var tr;
		for (var i = 0; i < json.length; i++) {
			tr = $('<tr/>');
			tr.append("<td>" + new Date(json[i].datetime).toLocaleString('en-GB') + "</td>");
			tr.append("<td>" + json[i].status + "</td>");
			tr.append("<td>" + json[i].home_team.country + "</td>");
			tr.append("<td id='score'>" + json[i].home_team.goals + " - " + json[i].away_team.goals +"</td>");
			tr.append("<td>" + json[i].away_team.country + "</td>");
			tr.append("<td>" + json[i].winner + "</td>");
			$('#table').append(tr);
		}
		
		//sortTable("table", 0, 0);
	});
 }
 
 //function mergeDataSets
 function sortTable(n, tableName, isNum) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableName);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (isNum) {
			if (Number(x.innerHTML) > Number(y.innerHTML)) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			}
		}
		else {
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			}
		}
      } else if (dir == "desc") {
		if (isNum) {
			if (Number(x.innerHTML) < Number(y.innerHTML)) {
			  // If so, mark as a switch and break the loop:
			  shouldSwitch = true;
			  break;
			}
		} else {
			if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			  // If so, mark as a switch and break the loop:
			  shouldSwitch = true;
			  break;
			}
		}
      }
    }
    if (shouldSwitch) {
		/* If a switch has been marked, make the switch
		and mark that a switch has been done: */
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
		// Each time a switch is done, increase this count by 1:
		switchcount ++; 
    } else {
		/* If no switching has been done AND the direction is "asc",
		set the direction to "desc" and run the while loop again. */
		if (switchcount == 0 && dir == "asc") {
			dir = "desc";
			switching = true;
		}
		}
	}
}


function defaultSortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("resulttable");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      // Check if the two rows should switch place:
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function predicateBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}

function getNextResults(i) {
	var tmp = i;
	var matchesObj;
	var selectionsObj;
	var resultArr = [];
	$.getJSON('./results.json'
		, function(data) {
			//console.log(data);
		})
		.done(function(data) {
			matchesObj = data;
			//console.log(matchesObj);
			
			var selections = $.getJSON(selectionJSON
				, function(data) {
				//console.log(data);
				})
				.done(function(data) {
					//console.log(matchesObj);
					selectionsObj = data;
					matchesObj.sort(predicateBy("datetime"));
					//console.log(matchesObj);
					 for (var m = 0; m < matchesObj.length; m++) {
						if(matchesObj[m].status != 'completed') {
							for (var s in selectionsObj) {
								resultArr.push({name:selectionsObj[s].playerName, result: ""});
								var one = m;
								var two = tmp;
								var four = matchesObj;
								var three = matchesObj[m];
								
								for (var am in selectionsObj[s].matches) {
									if (matchesObj[m + 1].away_team.country ==  selectionsObj[s].matches[am].awayTeam
									&& matchesObj[m + 1].home_team.country ==  selectionsObj[s].matches[am].homeTeam) {
										resultArr[s].result = selectionsObj[s].matches[am].winner;
									}
								}
							}
							
							break;
						}
					 }
					/*
					var selectionsResult = [];
					for (var s in selectionsObj) {
						// console.log({name: selectionsObj[s].playerName, score:0});
						// if (s > 1)
							// break;
						var tmp = {name: selectionsObj[s].playerName, score:0};
						resultArr.push(tmp)
						// console.log(resultArr);
						
						for (var m in selectionsObj[s].matches) {
							// var foundMatch = false;
							// console.log(selectionsObj[s].matches[m]);

							for (var am in matchesObj) {
								// if (foundMatch)
									// continue;
								if (matchesObj[am].status != 'completed')
									continue;
								
								if (matchesObj[am].away_team.country ==  selectionsObj[s].matches[m].awayTeam
									&& matchesObj[am].home_team.country ==  selectionsObj[s].matches[m].homeTeam
									&& matchesObj[am].winner ==  selectionsObj[s].matches[m].winner)
									resultArr[s].score += POINTS_FOR_MATCH_WIN;
									// foundMatch = true;
									
							}
						}
					}*/
						
						
					//console.log(selectionsResult);
					//console.log(resultArr);
					
					var tr;
					for (var i = 0; i < resultArr.length; i++) {
						tr = $('<tr/>');
						tr.append("<td>" + resultArr[i].name + "</td>");
						tr.append("<td>" + resultArr[i].result + "</td>"); 
						$('#predictiontable').append(tr); 
					} 		

					defaultSortTable();
				}
			);
			
			
			
		});
	// var matchesObj = JSON.parse(matches);
	
	//console.log(matchesObj);
}

function getNextMatch() {
	var matchesObj;
	var selectionsObj;
	var resultArr = [];
	$.getJSON(resultsJson
		, function(data) {
			//console.log(data);
		})
		.done(function(data) {
			matchesObj = data;
			//console.log(matchesObj);
			
			var selections = $.getJSON(selectionJSON
				, function(data) {
				//console.log(data);
				})
				.done(function(data) {
					//console.log(matchesObj);
					selectionsObj = data;
					matchesObj.sort(predicateBy("datetime"));
					//console.log(matchesObj);
					 for (var m in matchesObj) {
						if(matchesObj[m].status != 'completed') {
							resultArr.push({
								status: matchesObj[m].status,
								time: matchesObj[m].datetime,
								homeTeam: matchesObj[m].home_team.country,
								score: ((typeof matchesObj[m].home_team.goals === 'undefined') ? 0 : matchesObj[m].home_team.goals)  + " - " + ((typeof matchesObj[m].away_team.goals === 'undefined') ? 0 :matchesObj[m].away_team.goals),
								awayTeam: matchesObj[m].away_team.country
							});
							break;
						}
					 }
					/*
					var selectionsResult = [];
					for (var s in selectionsObj) {
						// console.log({name: selectionsObj[s].playerName, score:0});
						// if (s > 1)
							// break;
						var tmp = {name: selectionsObj[s].playerName, score:0};
						resultArr.push(tmp)
						// console.log(resultArr);
						
						for (var m in selectionsObj[s].matches) {
							// var foundMatch = false;
							// console.log(selectionsObj[s].matches[m]);

							for (var am in matchesObj) {
								// if (foundMatch)
									// continue;
								if (matchesObj[am].status != 'completed')
									continue;
								
								if (matchesObj[am].away_team.country ==  selectionsObj[s].matches[m].awayTeam
									&& matchesObj[am].home_team.country ==  selectionsObj[s].matches[m].homeTeam
									&& matchesObj[am].winner ==  selectionsObj[s].matches[m].winner)
									resultArr[s].score += POINTS_FOR_MATCH_WIN;
									// foundMatch = true;
									
							}
						}
					}*/
						
						
					//console.log(selectionsResult);
					//console.log(resultArr);
					
					var tr;
					for (var i = 0; i < resultArr.length; i++) {
						tr = $('<tr/>');
						tr.append("<td>" + resultArr[i].homeTeam + "</td>");
						tr.append("<td id='score'>" + resultArr[i].score + "</td>"); 
						tr.append("<td id='away'>" + resultArr[i].awayTeam + "</td>"); 
						$('#nextMatchTable').append(tr); 
						$('#status').append(resultArr[i].status); 
						$('#time').append(new Date(resultArr[i].time).toLocaleString('en-GB')); 
					} 		

					defaultSortTable();
				}
			);
			
			
			
		});
	// var matchesObj = JSON.parse(matches);
	
	//console.log(matchesObj);
}


function letsgo() {
	getActualResults();
	getNextResults(1);
	getNextMatch();
}