import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Games = new Mongo.Collection('games');

Meteor.methods({
  'games.insert'(text) {
    check(text, String);

    Games.insert({
      text,
      createdAt: new Date(),
      // owner: this.userId,
      // username: Meteor.users.findOne(this.userId).username,
    });
  },
});
