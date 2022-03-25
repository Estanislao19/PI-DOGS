/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog,Temperament, conn } = require('../../src/db.js');

const agent = session(app);

describe('dogs', function() {
  it('GET respons with status 200',function (){
    return agent
    .get('/dogs')
    .expect(function(res){
    expect(res.status).equal(200)
  })
})
  it('elements received are Object type',function (){
    return agent
    .get('/dogs')
    .expect(function(res){
    expect(typeof res.body[0]).equal('object')
  })
});
})
it('GET respons with status 200 with a name URL with mixed camel case',function(){
  return agent
  .get('/dogs?name=AKiTa')
  .expect(function(res){
   expect(res.status).equal(200)
  })
})
it('GET receives a body lenght larger if there is query coincidences',  function() {
  return agent 
    .get('/dogs?name=toy') 
    .expect(function(res) {
      expect(res.body.length).equal(5); 
    });
})
describe('/dogs:id',function() {
  it('GET responses with status 200 if a dog is found',function(){
    return agent
    .get('/dogs/6')
    .expect(function(res) {
      expect(res.status).equal(200)
    })
  })
  it('GET gets dog data by the :id as a parameter',  function() {
    return agent 
      .get('/dogs/6')
      .expect(function(res) {
        expect(res.body.name).equal('akita'); 
    })
  })
  describe('/temperament', function() {
    it('GET sends status 200 when finding temperaments', function() {
      return agent 
        .get('/temperament') 
        .expect(function(res){
          expect(res.status).equal(200)}); 
        })
    })
  });
