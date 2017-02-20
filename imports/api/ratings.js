import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Ratings = new Meteor.Collection('ratings');
let stopWatch=false;
// const gameCode = Math.floor(Math.random()*100000);
if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('ratings', function ratingsPublication() {
    return Ratings.find();
  });
}

Meteor.methods({
  'ratings.insert'(service, rating) {
    check(service, String);
    check(rating, Number);
    const target=(Ratings.findOne({service}));
    if (target) {
      const av= (target.average*target.votes+rating)/(target.votes+1)
      Ratings.update(target._id,
        {$set:
          {
            average: av,
            votes: target.votes + 1,
          }
        });
        return av;
      } else {
        Ratings.insert({
          service,
          average: rating,
          votes: 1,
        });
        return rating;
      }
    },

});
