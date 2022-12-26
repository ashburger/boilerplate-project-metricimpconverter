function ConvertHandler() {
  
  this.getNum = function(input = '1') {
    try{
      if(!input || input == null || input == ''){
        input = '1';
      }
      let slashes = input.match(/\//g);
      if(!slashes){
        return Number(input);
      }
      else if(slashes.length == 1){
        let fractionNums = input.split('/');
        if(fractionNums[1] == 0){
          return false;
        }
        return Number(fractionNums[0]) / Number(fractionNums[1]);
      }
      else{
        return false;
      }
    }
    catch(err){
      return false;
    }
    
  };
  
  this.getUnit = function(input) {
    try{
      if(input == 'l' || input == 'L'){
        input = 'L';
      }else{
        input = input.toLowerCase();
      }
      let allowedUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      if(allowedUnits.includes(input)){
        return input
      }else{
        return false
      }
      
    }
    catch(err){
      return false
    }
    
  };
  
  this.getReturnUnit = function(initUnit) {
    try{
      let unitPairs = {
      'gal':'L',
      'L':'gal',
      'mi':'km',
      'km':'mi',
      'lbs':'kg',
      'kg':'lbs'
    }
    return unitPairs[initUnit];
    }
    catch(err){
      return false
    }
    
  };

  this.spellOutUnit = function(unit) {
    try{
      let unitNames = {
        'gal':'gallons',
        'L':'liters',
        'mi':'miles',
        'km':'kilometers',
        'lbs':'pounds',
        'kg':'kilograms'
      }
      return unitNames[unit];
    }catch(err){
      return false
    }
    
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    try{
      switch (initUnit) {
        case 'gal':
          conversion = initNum * galToL;
          break;
        case 'L':
          conversion = initNum / galToL;
          break;
        case 'lbs':
          conversion = initNum * lbsToKg;
          break;
        case 'kg':
          conversion = initNum / lbsToKg;
          break;
        case 'mi':
          conversion = initNum * miToKm;
          break;
        case 'km':
          conversion = initNum / miToKm;
          break;
        default:
          return false;
      }
      return Number((conversion).toFixed(5));
    }catch(err){
      return false;
    }
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum.toFixed(5) + ' '+ this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
