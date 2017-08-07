import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { specialSets } from '../lib/specialSets';

export const Games = new Meteor.Collection('games');
let stopWatch=false;
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}

function shuffle (playersArray) {
  playersArray = playersArray.sort(() => 0.5 - Math.random());
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

  'games.createDeck'(numPlayers) {
    // Create deck
    const deck = [0,1];

    // Assign gambler if it's the case
    if (numPlayers%2 === 1){
      deck.push(4);
    }

    // generate random number between 0 and the number of special card sets
    let specialFill = Math.round(Math.random()*specialSets.length);
    // number must be less than or equal to half the number of unassigned players
    specialFill = Math.min(specialFill, numPlayers - deck.length);

    if (specialFill > 0) {
      const specials = specialSets.sort(() => 0.5 - Math.random()).slice(0,specialFill);
       specials.forEach(el => deck.push(el[0],el[1]));
    }
    while (deck.length < numPlayers) deck.push(2,3);
    return deck;
  },

  'games.shuffle'(gameCode) {
    check(gameCode, String);
    const game=(Games.findOne({gameCode:gameCode}));
    let players = game.player;
    // Distribute players in two rooms
    shuffle(players);
    const currentPlayers = players;
    const index = Math.floor(currentPlayers.length / 2);
    const room1 = currentPlayers.slice(0, index);
    players = players.map(player => {
      player.room = room1.includes(player) ? 1:2;
      return player;
    });

    const deck = Meteor.call('games.createDeck', players.length);

    // Distribute cards
    players = players.map(player => {
      player.card = deck.splice(Math.floor(Math.random()*deck.length),1)[0];
      return player
    });

    // Update game
    Games.update(game._id, { $set: { player: players, gameStatus:'preGame' } });
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
    };
    if (running) {
      // pressing play
      timerData.playTime = Date.now();
    } else {
      // pressing pause
      timerData.timeLeft = game.timeLeft - (Date.now() - game.playTime);
    }
    Games.update(game._id, { $set: timerData});
  },

  'games.nextRound'(gameCode) {
    check(gameCode, String);
    const game=(Games.findOne({gameCode:gameCode}));

    Games.update(game._id, { $set:{ timeLeft:180000 -game.round*60000, round:game.round+1}});

  }
});
