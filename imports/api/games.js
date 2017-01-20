import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Games = new Meteor.Collection('games');

// GameSchema = new SimpleSchema({
//   "code": {
//     type: String,
//     label: "gameCode"
//   },
//   "code.players": {
//     type: Array,
//     label: "players"
//   }
// });
//
// Games.attachSchema(GameSchema);

Meteor.methods({
  'games.insert'(gameCode,player) {
    check(gameCode, String);
    check(player, String);

    Games.insert({
      gameCode,
      players:[player],
      createdAt: new Date(),


    });
  },
  'games.addPlayer'(gameCode,player) {
    check(gameCode, String);
    check(player, String);

    Games.insert({
      gameCode,
      players:[player],
      createdAt: new Date(),
    });
  }
});
