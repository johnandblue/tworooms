import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Games = new Meteor.Collection('games');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}

Meteor.methods({
  'games.insert'(gameCode,player) {
    check(gameCode, Number);
    check(player, String);
    console.log(player);
    Games.insert({
      gameCode,
      players:[player],
      createdAt: new Date(),
    });
  },
  'games.addPlayer'(gameCode,player) {
    check(gameCode, String);
    check(player, String);

    Games.update(gameCode, { $push: { players: player } });
  }
});
