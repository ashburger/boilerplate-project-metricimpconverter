const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Reading numbers', function(){
        test('Read a whole number input', function(){
            assert.equal(convertHandler.getNum('7'), 7);
            assert.equal(convertHandler.getNum('44'), 44);
            assert.equal(convertHandler.getNum('164'), 164);
        });

        test('Read a decimal number input', function(){
            assert.equal(convertHandler.getNum('7.6'), 7.6);
            assert.equal(convertHandler.getNum('4.400'), 4.4);
            assert.equal(convertHandler.getNum('16.4'), 16.4);
        });

        test('Read a fraction input', function(){
            assert.equal(convertHandler.getNum('7/6'), 7/6);
            assert.equal(convertHandler.getNum('48/9'), 48/9);
            assert.equal(convertHandler.getNum('16/4'), 16/4);
        });

        test('Read a fraction input with decimal', function(){
            assert.equal(convertHandler.getNum('7.5/6'), 7.5/6);
            assert.equal(convertHandler.getNum('48/9.7'), 48/9.7);
            assert.equal(convertHandler.getNum('16/4.5'), 16/4.5);
        });

        test('Return error with double fraction', function(){
            assert.equal(convertHandler.getNum('7/6/9'), false);
            assert.equal(convertHandler.getNum('48/9/9'), false);
            assert.equal(convertHandler.getNum('16//4'), false);
        });

        test('Default to 1 if no number is sent', function(){
            assert.equal(convertHandler.getNum(''), 1);
            assert.equal(convertHandler.getNum(null), 1);
            assert.equal(convertHandler.getNum(undefined), 1);
        });
    });

    suite('Reading units', function(){
        test('Read each valid input unit', function(){
            assert.equal(convertHandler.getUnit('gal'), 'gal');
            assert.equal(convertHandler.getUnit('l'), 'L');
            assert.equal(convertHandler.getUnit('MI'), 'mi');
            assert.equal(convertHandler.getUnit('kM'), 'km');
            assert.equal(convertHandler.getUnit('LbS'), 'lbs');
            assert.equal(convertHandler.getUnit('kg'), 'kg');
        });

        test('Return an error for invalid input unit', function(){
            assert.equal(convertHandler.getUnit('gl'), false);
            assert.equal(convertHandler.getUnit('kmm'), false);
            assert.equal(convertHandler.getUnit('m'), false);
        });

        test('Return the correct return unit for each valid input unit', function(){
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
            assert.equal(convertHandler.getReturnUnit('L'), 'gal');
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        });

        test('Return spelled-out string unit for each valid input unit', function(){
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
            assert.equal(convertHandler.spellOutUnit('L'), 'liters');
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        });
    });

    suite('Conversions', function(){
        test('gal to L', function(){
            assert.equal(convertHandler.convert(1,'gal'), 3.78541);
            assert.equal(convertHandler.convert(3.6,'gal'), 13.62748);
        });

        test('L to gal', function(){
            assert.equal(convertHandler.convert(1,'L'), 0.26417);
            assert.equal(convertHandler.convert(3.6,'L'), 0.95102);
        });

        test('mi to km', function(){
            assert.equal(convertHandler.convert(1,'mi'), 1.60934);
            assert.equal(convertHandler.convert(3.6,'mi'), 5.79362);
        });

        test('km to mi', function(){
            assert.equal(convertHandler.convert(1,'km'), 0.62137);
            assert.equal(convertHandler.convert(3.6,'km'), 2.23694);
        });

        test('lbs to kg', function(){
            assert.equal(convertHandler.convert(1,'lbs'), 0.45359);
            assert.equal(convertHandler.convert(3.6,'lbs'), 1.63293);
        });

        test('kg to lbs', function(){
            assert.equal(convertHandler.convert(1,'kg'), 2.20462);
            assert.equal(convertHandler.convert(3.6,'kg'), 7.93665);
        });
    });
});