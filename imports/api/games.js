import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {card} from './card';

export const Games = new Meteor.Collection('games');
let gameCards={};
// const gameCode = Math.floor(Math.random()*100000);
gameCards['89482']=[1,2,3];
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
    check(player, String);
    const result=(Games.findOne({gameCode:gameCode}));
    Games.update(result._id, { $push: { player: player } });
  },
  'games.startGame'(gameCode) {
    check(gameCode, String);
    const result=(Games.findOne({gameCode:gameCode}));
    const cards=[];
    for (let i = 0; i < result.player.length; i++) {
        cards.push(i);
    }
    cards.gameCode=cards;

  },
  'games.shuffleCards'(gameCode) {
    check(gameCode, String);
    const result=(Games.findOne({gameCode:gameCode}));
    const currentCards=gameCards[gameCode];
    const shuffledCards=currentCards.splice(Math.floor(Math.random()*currentCards.length),1)[0] ;
    if (shuffledCards>1 && shuffledCards%2===0) {
      card.cardNumber=2;
    }
    if (shuffledCards>1 && shuffledCards%2!==0) {
      card.cardNumber=3;
    }
  }
});
