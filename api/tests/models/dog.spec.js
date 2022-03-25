const { Dog,Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  beforeEach(async function() {
   await Dog.sync({ force:true})
  });
  describe('Validators',function() {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('Should not be created without all required fields completed',function (done)  {
        Dog.create({
          name:'estani'
        })
          .then(() => done('not created'))
          .catch(() => done());
      });
      it('Should not be created without all required fields completed', function(done) {
        Dog.create({
          height: 'MEX',
        })
        .then(() => done('Should not have been created, dude!'))
        .catch(() => done());
      });
    });
  })
  describe('Temperament model', function () {
    beforeEach(async function() {
      await Temperament.sync({ force: true });
    });
        it('Should not be created without all required fields completed', function(done) {
         
        Temperament.create({
          id: '11',
        })
        .then(() => done('Should not have been created, dude!'))
        .catch(() => done());

      });
      it('Name should be a string', function(){
        expect(typeof Temperament.name).equal("string")
      })
    });
})

