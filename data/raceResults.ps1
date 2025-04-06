$raceInputCsv = Import-Csv .\races.csv
$bonusInput = Import-csv .\bonus.csv
$bonusAnswers = Import-csv .\bonusAnswers.csv

$checkBonus =  $bonusAnswers.Answer

$raceResultsRow = $raceInputCsv[0]

$raceInputArray = @()
for($x=0;$x -le (($raceInputCsv.Name).Count); $x++){
    $raceInputArray += $raceInputCsv[($x+1)]
}

$tracks = @{
    'Race1' = 'AUS'
    'Race2' = 'CHN'
    'Race3' = 'JAP'
    'Race4' = 'BAH'
    'Race5' = 'SAU'
    'Race6' = 'MIA'
    'Race7' = 'EmR'
    'Race8' = 'MON'
    'Race9' = 'SPN'
    'Race10' = "CAN"
    'Race11' = 'AUT'
    'Race12' = 'GBR'
    'Race13' = 'BEL'
    'Race14' = 'HUN'
    'Race15' = 'NLD'
    'Race16' = 'MZA'
    'Race17' = 'AZE'
    'Race18' = 'SGP'
    'Race19' = 'TEX'
    'Race20' = 'MEX'
    'Race21' = 'BRA'
    'Race22' = 'LAS'
    'Race23' = 'QAT'
    'Race24' = 'ABU'
}

$data = @()

for($init=0;$init -lt (($raceInputArray.Name).Count); $init++){
    $data += @(
        [pscustomobject]@{Name=$raceInputArray[$init].Name;$tracks.Race1="";$tracks.Race2="";$tracks.Race3="";$tracks.Race4="";$tracks.Race5="";
                        $tracks.Race6="";$tracks.Race7="";$tracks.Race8="";$tracks.Race9="";$tracks.Race10="";$tracks.Race11="";
                        $tracks.Race12="";$tracks.Race13="";$tracks.Race14="";$tracks.Race15="";$tracks.Race16="";$tracks.Race17="";
                        $tracks.Race18="";$tracks.Race19="";$tracks.Race20="";$tracks.Race21="";$tracks.Race22="";$tracks.Race23="";
                        $tracks.Race24="";CDP="";PSQP="";Points="";Total="";}
    )
}

for($r=1; $r -le $tracks.Count; $r++){
    $raceNo = "Race" + $r.ToString()
    $first = "-1"
    $second = "-2"
    $third = "-3"
    $dnfStr = "-DNF"
    $raceBonusQuestion = "-BQ"
    $preQualySelection = "-PQ"

    $resultArray = @()
    $resultArray += $raceResultsRow.($raceNo + $first), $raceResultsRow.($raceNo + $second), $raceResultsRow.($raceNo + $third)

    if($resultArray -contains ""){
        $playerRaceSelection = @()
        for($p=0; $p -lt ($data.Name).Count; $p++){
            $playerRaceSelection += @(
                [pscustomobject]@{Name=$data[$p].Name;
                                    PreQualy=$raceInputArray[$p].($raceNo + $preQualySelection);
                                    First=$raceInputArray[$p].($raceNo + $first);
                                    Second=$raceInputArray[$p].($raceNo + $second);
                                    Third=$raceInputArray[$p].($raceNo + $third);
                                    DNF=$raceInputArray[$p].($raceNo + $dnfStr);
                                    BonusQ=$raceInputArray[$p].($raceNo + $raceBonusQuestion)}
                )
        }
        #$stewards = @()
        #$stewards = Get-Random -Count 2 $data.Name
            
        Write-Host "`nPlayer Selection for" $tracks.$raceNo
        $playerRaceSelection | Format-Table
        #Write-Host "The race stewards are" $stewards[0] "and" $stewards[1]
        break
    }

    for($p=0; $p -lt ($data.Name).Count; $p++){
        $playerArray = @()
        $playerArray += $raceInputArray[$p].($raceNo + $first), $raceInputArray[$p].($raceNo + $second), $raceInputArray[$p].($raceNo + $third)

        $playerRaceScore = 0
        $playerCorrectAnswer = 0
        for($q = 0;$q -le 2; $q++){
            if($resultArray[$q] -eq $playerArray[$q]){
                $playerCorrectAnswer += 1
                if(($raceInputArray[$p].($raceNo + $preQualySelection)) -match "Yes"){
                    $playerRaceScore += 15
                }
                else {
                    $playerRaceScore += 10
                }                
            }elseif ($playerArray -contains $resultArray[$q]) {
                if(($raceInputArray[$p].($raceNo + $preQualySelection)) -eq "Yes"){
                    $playerRaceScore += 7.5
                }
                else {
                    $playerRaceScore += 5
                } 
            }
        }
        if(($raceResultsRow.($raceNo + $dnfStr)) -match ($raceInputArray[$p].($raceNo + $dnfStr))){
            $playerRaceScore += 5
        }

        if(($raceResultsRow.($raceNo + $raceBonusQuestion)) -ne "NA") {
            if(($raceResultsRow.($raceNo + $raceBonusQuestion)) -match ($raceInputArray[$p].($raceNo + $raceBonusQuestion))){
                            $playerRaceScore += 5
            
             }
        }

        [double]$data[($p)].Points += $playerRaceScore
        [int]$data[($p)].CDP += $playerCorrectAnswer

        $data[($p)].($tracks.$raceNo) = $playerRaceScore
    }
}

Write-Host "`nLeaderboard:"

$data | Sort-Object -Property Points, CDP -Descending | Format-Table *
$data | Sort-Object -Property Points, CDP -Descending | Export-Csv .\Leaderboard.csv -NoTypeInformation -Force 

if(($checkBonus -contains "") -or ($raceResultsRow.'Race24-1' -eq "") ){
    $calcBonus = $false
} else {
    $calcBonus = $true
}

if($calcBonus){  
    for($b=0;$b -lt (($data.Name).Count);$b++){

        $playerBonus = 0.00
        for($q=0;$q -lt (($bonusInput.Question).Count);$q++){
            $pn = $data[$b].Name

            if($bonusInput[$q].$pn -eq $bonusAnswers[$q].Answer){
                $playerBonus += 0.05
            }
        }
        $data[$b].PSQP = $playerBonus
        $data[$b].Total = $data[$b].Points + ($data[$b].PSQP * $data[$b].Points)
    }

    Write-Host "`nLeaderboard with bonus points:"
    $data | Sort-Object -Property Total, CDP -Descending | Format-Table * 
    $data | Sort-Object -Property Total, CDP -Descending | Export-Csv .\LeaderboardWithBonus.csv -NoTypeInformation -Force
}