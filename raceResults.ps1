$raceInputCsv = Import-Csv .\races.csv
$bonusInput = Import-csv .\bonus.csv
$checkBonus =  $bonusInput.Answer

$raceResultsRow = $raceInputCsv[0]

$raceInputArray = @()
for($x=0;$x -le (($raceInputCsv.Name).Count); $x++){
    $raceInputArray += $raceInputCsv[($x +1)]
}

$data = @()

for($init=0;$init -lt (($raceInputArray.Name).Count); $init++){
    $data += @(
        [pscustomobject]@{Name=$raceInputArray[$init].Name;$tracks.Race1="";$tracks.Race2="";$tracks.Race3="";$tracks.Race4="";$tracks.Race5="";
                        $tracks.Race6="";$tracks.Race7="";$tracks.Race8="";$tracks.Race9="";$tracks.Race10="";$tracks.Race11="";
                        $tracks.Race12="";$tracks.Race13="";$tracks.Race14="";$tracks.Race15="";$tracks.Race16="";$tracks.Race17="";
                        $tracks.Race18="";$tracks.Race19="";$tracks.Race20="";$tracks.Race21="";$tracks.Race22="";$tracks.Race23="";
                        $tracks.Race24="";PSQP="";Points="";Total="";}
    )
}

for($r=1; $r -le $tracks.Count; $r++){
    $raceNo = "Race" + $r.ToString()
    $first = "-1"
    $second = "-2"
    $third = "-3"

    $resultArray = @()
    $resultArray += $raceResultsRow.($raceNo + $first), $raceResultsRow.($raceNo + $second), $raceResultsRow.($raceNo + $third)

    if($resultArray -contains ""){
        Write-Host "`nPlayer Selection for" $tracks.$raceNo
        $playerRaceSelection = @()
        for($p=0; $p -lt ($data.Name).Count; $p++){
            $playerRaceSelection += @(
                [pscustomobject]@{Name=$data[$p].Name;
                                    First=$raceInputArray[$p].($raceNo + $first);
                                    Second=$raceInputArray[$p].($raceNo + $second);
                                    Third=$raceInputArray[$p].($raceNo + $third);}
                )
        }

        $playerRaceSelection | Format-Table
        break
    }

    for($p=0; $p -lt ($data.Name).Count; $p++){
        $playerArray = @()
        $playerArray += $raceInputArray[$p].($raceNo + $first), $raceInputArray[$p].($raceNo + $second), $raceInputArray[$p].($raceNo + $third)

        $playerRaceScore = 0

        for($q = 0;$q -lt $resultArray.Count; $q++){
            if($resultArray[$q] -eq $playerArray[$q]){
                $playerRaceScore += 10
            }elseif ($playerArray -contains $resultArray[$q]) {
                $playerRaceScore += 5
            }
        }
        [int]$data[($p)].Points += $playerRaceScore

        if($data.Name -contains $data[$p].Name){
             $data[($p)].($tracks.$raceNo) = $playerRaceScore
         }
    }
}

Write-Host "`nLeaderboard:"

$data | Sort-Object -Property Points -Descending | Format-Table * 

if(($checkBonus -contains "") -or ($raceResultsRow.'Race24-1' -contains "") ){
    $calcBonus = $false
} else {
    $calcBonus = $true
}

if($calcBonus){  
    for($b=0;$b -lt (($data.Name).Count);$b++){

        $playerBonus = 0.00
        for($q=0;$q -lt (($bonusInput.Question).Count);$q++){
            $pn = $data[$b].Name

            if($bonusInput[$q].$pn -eq $bonusInput[$q].Answer){
                $playerBonus += 0.05
            }
        }
        $data[$b].PSQP = $playerBonus
        $data[$b].Total = $data[$b].Points + ($data[$b].PSQP * $data[$b].Points)
    }
}

if($calcBonus){
    Write-Host "`nLeaderboard with bonus points:"
    $data | Sort-Object -Property Total -Descending | Format-Table * 
    }