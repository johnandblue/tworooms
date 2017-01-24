import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Games = new Meteor.Collection('games');
let stopWatch=false;
// const gameCode = Math.floor(Math.random()*100000);
if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}

function shuffle (playersArray) {
  var i = 0
  var j = 0
  var temp = null
  for (i = playersArray.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = playersArray[i]
    playersArray[i] = playersArray[j]
    playersArray[j] = temp
  }
}

Meteor.methods({
  'games.insert'(player) {
    const gameCode = String(Math.floor(Math.random()*100000));
    check(player, String);
    Games.insert({
      gameCode,
      player:[{name:player}],
      createdAt: new Date(),
      gameStatus: 'waitingForPlayers',
      round:1,
      running: false,
      timeLeft: 180000,
    });

    return gameCode;
  },
  'games.addPlayer'(gameCode, player) {
    check(player, String);
    const result=(Games.findOne({gameCode:gameCode}));
    Games.update(result._id, { $push: { player: { name: player } } });
  },
  'games.shuffle'(gameCode) {
    check(gameCode, String);
    const game=(Games.findOne({gameCode:gameCode}));
    let players = game.player;
    // Distribute players in two rooms
    shuffle(players);
    const currentPlayers = players;
    const index = Math.floor(currentPlayers.length / 2)
    const room1 = currentPlayers.slice(0, index)
    players = players.map(player => {
      player.room = room1.includes(player) ? 1:2;
      return player
    })

    // Create deck
    const deck = []
    deck.push(0,1)
    let assignedPlayers = 2
    // Assign gambler if it's the case
    if (players.length%2 === 1){
      deck.push(4);
      assignedPlayers += 1;
    }
    // Assign special cards if needed

    // Padding
    for (let i = players.length - assignedPlayers; i > 0; i-=2) {
      deck.push(2,3);
    }

    // Distribute cards
    players = players.map(player => {
      player.card = deck.splice(Math.floor(Math.random()*deck.length),1)[0];
      return player
    })

    // Update game
    Games.update(game._id, { $set: { player: players, gameStatus:'preGame' } }) ;
  },

  'games.startGame'(gameCode) {
    check(gameCode, String);
    const game=(Games.findOne({gameCode:gameCode}));
    Games.update(game._id, { $set: { gameStatus:'game' } });
  },

  'games.toggleTimer'(gameCode) {
    check(gameCode, String);
    const game=(Games.findOne({gameCode:gameCode}));

    const running = !game.running;
    const timerData = {
      running
    }
    if (running) {
      // pressing play
      timerData.playTime = Date.now()
    } else {
      // pressing pause
      timerData.timeLeft = game.timeLeft - (Date.now() - game.playTime)
    }
    Games.update(game._id, { $set: timerData});
  },

  'games.nextRound'(gameCode) {
    check(gameCode, String);
    const game=(Games.findOne({gameCode:gameCode}));

    Games.update(game._id, { $set:{ timeLeft:180000 -game.round*60000, round:game.round+1}});

  }
});
