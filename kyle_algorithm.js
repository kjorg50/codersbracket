function (game, team1, team2) {

  //game.round 
  // Round of current game. Value ranges from 0 to 5 where 5 is the first round and 0 is the championship.

  var round = game.round;


  // round of 64
  if (round == 5) {
    var twelveSeedAdvances = Math.random();
    var sevenSeedAdvances = Math.random();
    var twoSeedAdvances = Math.random();

    // #1 seeds all advance in the first round
    if(team1.seed == 1){
      team1.winsGame();
    } else if (team2.seed == 1) {
      team2.winsGame();
    }

    // give #2 seeds a 95% chance of advancing
    else if(team1.seed == 2){
      if (twoSeedAdvances <= 0.95) { 
        team1.winsGame(); 
      } else { 
        team2.winsGame(); 
      }
    } else if (team2.seed == 2) {
      if (twoSeedAdvances <= 0.95) { 
        team2.winsGame(); 
      } else { 
        team1.winsGame(); 
      }
    }

    // Kyle's #12 seed rule

    //  Via ESPN: Only 3 times in the past 29 years have No. 5 seeds won all 4 meetings with No. 12 seeds
    //  There is a good chance that at least one of the #12 seeds will advance. In my bracket I would
    //  ultimately like to have one #12 seed advance, so I give them a 25% chance of advancing. 
    else if(team1.seed == 12){
      if (twelveSeedAdvances <= 0.25) { 
        team1.winsGame(); 
      } else { 
        team2.winsGame(); 
      }
    } else if (team2.seed == 12) {
      if (twelveSeedAdvances <= 0.25) { 
        team2.winsGame(); 
      } else { 
        team1.winsGame(); 
      }
    }

    // Via ESPN:
    // No. 7 seeds have won 60% of meetings with No. 10 seeds, and have won 8 of 12 matchups dating back to 2011.
    //  So, I'll give 7 seeds a 60% chance of advancing
    else if(team1.seed == 7){
      if (sevenSeedAdvances <= 0.60) { 
        team1.winsGame(); 
      } else { 
        team2.winsGame(); 
      }
    } else if (team2.seed == 7) {
      if (sevenSeedAdvances <= 0.60) { 
        team2.winsGame(); 
      } else { 
        team1.winsGame(); 
      }
    }

    // Via ESPN
    //   No. 9 seeds have won 52% of meetings with No. 8 seeds, but have lost 8 of 12 meetings dating back to 2011.

    //  8/9 matchups are always tough to call, so I'm simply going to say it is 50/50 in these matchups
    else if(team1.seed == 8 || team2.seed == 8){
      if(Math.random <= 0.5){
        team1.winsGame();
      } else {
        team2.winsGame();
      }
    }

    // all other cases use assist/turnover ration to predict winner
    else if ((team1.assists_per_game/team1.turnovers_per_game) > (team2.assists_per_game/team2.turnovers_per_game)) {
      team1.winsGame();
    } else {
      team2.winsGame();
    }
      
  } // end first round

  if (round == 4) {

    var rand1 = Math.random();
    var rand2 = Math.random();
    var log_t1_seed = Math.pow(Math.log(team1.seed+1), (game.round+2)/2);
    var log_t2_seed = Math.pow(Math.log(team2.seed+1), (game.round+2)/2);
    
    //  If there are any 5/4 or 12/13 matchups in the 2nd round, these are basically 50/50 matchups
    if( Math.abs(team1.seed - team2.seed) == 1){
      if(Math.random <= 0.5){
        team1.winsGame();
      } else {
        team2.winsGame();
      }
    }

    // In all other cases, use the example "seed, with round bias" algorithm, which
    // seems to predict fairly well
    else if (rand1*log_t1_seed < rand2*log_t2_seed) {
      team1.winsGame();
    } else {
      team2.winsGame();
    }

  } // end 2nd round

  // sweet sixteen and onward
  if (round < 4) {

    var chanceOfUpset = Math.random();

    // I'll give a 50% chance of upset in the later rounds, where upset is determined by
    // official rank of a team, not seeding
    if(chanceOfUpset <= 0.50){
      if(team1.official_rank < team2.official_rank){
        team1.winsGame();
      } else {
        team2.winsGame();
      }
    } else { // otherwise, use the example "seed, with round bias" algorithm, which
             // seems to predict fairly well
      var rand1 = Math.random();
      var rand2 = Math.random();
      var log_t1_seed = Math.pow(Math.log(team1.seed+1), (game.round+2)/2);
      var log_t2_seed = Math.pow(Math.log(team2.seed+1), (game.round+2)/2);

      if (rand1*log_t1_seed < rand2*log_t2_seed) {
        team1.winsGame();
      } else {
        team2.winsGame();
      }

    }

  } // end later rounds
       
}