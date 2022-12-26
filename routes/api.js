'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    input = input.trim()
    let reversedInput = input.split("").reverse().join("");
    let numEndIndex;
    try{
      numEndIndex = reversedInput.match(/[^a-zA-Z]/).index;
    }catch{
      numEndIndex = false
    }
    
    let initNum;
    let initUnit;
    if(!numEndIndex){
      initNum = 1;
      initUnit = convertHandler.getUnit(input);
    }else{
      initNum = convertHandler.getNum(input.substr(0,input.length - numEndIndex));
      initUnit = convertHandler.getUnit(input.substr(input.length - numEndIndex));
    }
    
    
    if(!initNum && !initUnit){
      res.status(200).send("invalid number and unit") ;
      return;
    }else if(!initNum){
      res.status(200).send("invalid number");
      return;
    }else if(!initUnit){
      res.status(200).send("invalid unit");
      return;
    }
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let convertString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.status(200).json({
      "initNum" : initNum,
      "initUnit" : initUnit,
      "returnNum" : returnNum,
      "returnUnit" : returnUnit,
      "string" : convertString
    });
  })
};
