function (game, team1, team2) {

  // if Florida, win. Else, go by Seed, biased in later rounds
  var winner_team = "Florida";
  
  var rand1 = Math.random();
  var rand2 = Math.random();
  var log_t1_seed = Math.pow(Math.log(team1.seed+1), (game.round+2)/2);
  var log_t2_seed = Math.pow(Math.log(team2.seed+1), (game.round+2)/2);
  
  
  if (team1.name == winner_team) {
    team1.winsGame();
  } else if (team2.name == winner_team) {
    team2.winsGame();
  } else if (rand1*log_t1_seed < rand2*log_t2_seed) {
    team1.winsGame();
  } else {
    team2.winsGame();
  }
            
}