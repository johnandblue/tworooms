import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check'

import { Games } from './games'

const should = require('chai').should()
const expect = require('chai').expect

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
        console.log('gamecode',game);
        console.log('player1',player1);
        console.log('player2',player2);
        player2.should.not.eql(player1);

      });
    });
  });
}
