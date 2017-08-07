import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check';

import { Games } from './games';
import { specialSets } from '../lib/specialSets';

const should = require('chai').should();
const expect = require('chai').expect;

if (Meteor.isServer) {
  describe('Games', () => {
    describe('methods', () => {

      it('can create a game', () => {
        const insertGame = Meteor.server.method_handlers['games.insert'];
        const result = insertGame('testPlayer');
        result.should.be.a('string');
        Number(result).should.be.above(0);
        Number(result).should.be.below(100000);
        (function () {insertGame(1234)}).should.throw(Match.Error);
      });

      it('can add Players to a game', () => {
        const insertGame = Meteor.server.method_handlers['games.insert'];
        const addPlayer = Meteor.server.method_handlers['games.addPlayer'];
        (function () { addPlayer(insertGame('mygame'), 'Player Name')}).should.not.throw;
        (function () { addPlayer('fake game', 'Player Name')}).should.throw();
      });

      it('should create a unique player id', () => {
        const insertGame = Meteor.server.method_handlers['games.insert'];
        const addPlayer = Meteor.server.method_handlers['games.insert'];
        const game = insertGame('mygame');
        const player1 = addPlayer(game, 'Player Name');
        player1.should.be.a('string');
        const player2 = addPlayer(game, 'Player Name');
        player2.should.not.eql(player1);
      });

      it('should generate valid games', () => {
        const insertGame = Meteor.server.method_handlers['games.shuffle'];
        for (let i = 0; i < 100; i++) {
          const numPlayers = Math.round(Math.random()*28)+4;
          const createDeck = Meteor.server.method_handlers['games.createDeck'];
          const deck = createDeck(numPlayers);
          deck.sort();
          deck[0].should.equal(0);
          deck[1].should.equal(1);
          deck.slice(2).should.not.include.members([0,1]);
          if (numPlayers % 2 === 1) {
            deck.should.include(4);
          }
          specialSets.forEach(el => {
            if (deck.includes(el[0])) { deck.should.include(el[1]) };
            if (deck.includes(el[1])) { deck.should.include(el[0]) };
          });
          deck.forEach(el => el.should.be.a('number')) ;
        }
      })
    });
  });
}
