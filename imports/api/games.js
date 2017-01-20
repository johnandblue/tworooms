import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Games = new Meteor.Collection('games');

// const gameCode = Math.floor(Math.random()*100000);

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}

Meteor.methods({
  'games.insert'(gameCode, player) {
    check(gameCode, String);
    check(player, String);
    Games.insert({
      gameCode,
      player:[player],
      createdAt: new Date(),
    });
  },
  'games.addPlayer'(gameCode, player) {
    check(gameCode, String);
    check(player, String);
    const res=(Games.findOne({gameCode:gameCode}));

    Games.update(res._id, { $push: { player: player } });
  }
});
