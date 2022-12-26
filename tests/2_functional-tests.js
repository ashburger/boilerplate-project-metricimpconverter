const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert valid inputs', function(){
        let inputs = ['10L', '3/2kG', '4.5lbs', '3.2/5.6mi'];
        let results = [
            '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}',
            '{"initNum":1.5,"initUnit":"kg","returnNum":3.30694,"returnUnit":"lbs","string":"1.5 kilograms converts to 3.30694 pounds"}',
            '{"initNum":4.5,"initUnit":"lbs","returnNum":2.04116,"returnUnit":"kg","string":"4.5 pounds converts to 2.04116 kilograms"}',
            '{"initNum":0.5714285714285715,"initUnit":"mi","returnNum":0.91962,"returnUnit":"km","string":"0.5714285714285715 miles converts to 0.91962 kilometers"}'
        ];
        for(let i=0;i<inputs.length;i++){
            chai
        .request(server)
        .get('/api/convert?input='+ inputs[i])
        .end(function(err, res){
            assert.equal(res.text, results[i]);
        });
        }
    });

    test('Convert invalid units', function(){
        let inputs = ['10g', '3/2kkG', '4.5lbslbs', '3.2/5.6kggal'];
        for(let i=0;i<inputs.length;i++){
            chai
        .request(server)
        .get('/api/convert?input='+ inputs[i])
        .end(function(err, res){
            assert.equal(res.text, "invalid unit");
        });
        }
    });

    test('Convert invalid numbers', function(){
        let inputs = ['10/L', '3/2/7kG', '4//5lbs', '3.2k5.6mi'];
        for(let i=0;i<inputs.length;i++){
            chai
        .request(server)
        .get('/api/convert?input='+ inputs[i])
        .end(function(err, res){
            assert.equal(res.text, "invalid number");
        });
        }
    });

    test('Convert invalid number and unit', function(){
        let inputs = ['10/m', '3/2/7kkG', '4//5lbslbs', '3.2k5.6kmmi'];
        for(let i=0;i<inputs.length;i++){
            chai
        .request(server)
        .get('/api/convert?input='+ inputs[i])
        .end(function(err, res){
            assert.equal(res.text, "invalid number and unit");
        });
        }
    });

    test('Convert with no number', function(){
        let inputs = ['L', 'kG', 'lbs', 'mi'];
        let results = [
            '{"initNum":1,"initUnit":"L","returnNum":0.26417,"returnUnit":"gal","string":"1 liters converts to 0.26417 gallons"}',
            '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}',
            '{"initNum":1,"initUnit":"lbs","returnNum":0.45359,"returnUnit":"kg","string":"1 pounds converts to 0.45359 kilograms"}',
            '{"initNum":1,"initUnit":"mi","returnNum":1.60934,"returnUnit":"km","string":"1 miles converts to 1.60934 kilometers"}'
        ];
        for(let i=0;i<inputs.length;i++){
            chai
        .request(server)
        .get('/api/convert?input='+ inputs[i])
        .end(function(err, res){
            assert.equal(res.text, results[i]);
        });
        }
    });
});
