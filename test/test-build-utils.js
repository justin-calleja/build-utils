var BuildUtils = require('../build-utils'),
    butils = new BuildUtils();

exports['testToMinEmptyDeps'] = function(test) {
    var input = [];
    var output = butils.toMin(input);
    assertLengthAndSameLengthAndDifferentObjs(0, input, output, test);
    test.done();
};

exports['testToMin1JsDep'] = function(test) {
    var input = [ 'jquery/jquery.js' ];
    var output = butils.toMin(input);
    test.ok(output.indexOf('jquery/jquery.min.js') != -1, "Expecting to find 'jquery/jquery.min.js' in ['" + output + "']");
    assertLengthAndSameLengthAndDifferentObjs(1, input, output, test);
    test.done();
};

exports['testToMin2JsDep'] = function(test) {
    var input = [ 'jquery/jquery.js', 'handlebars/handlebars.js' ];
    var output = butils.toMin(input);
    test.ok(output.indexOf('jquery/jquery.min.js') != -1, "Expecting to find 'jquery/jquery.min.js' in ['" + output + "']");
    test.ok(output.indexOf('handlebars/handlebars.min.js') != -1, "Expecting to find 'handlebars/handlebars.min.js' in ['" + output + "']");
    assertLengthAndSameLengthAndDifferentObjs(2, input, output, test);
    test.done();
};

exports['testToMin1Css2JsDep'] = function(test) {
    var input = [ 'jquery/jquery.js', 'bootstrap/dist/css/bootstrap.css', 'handlebars/handlebars.js' ];
    var output = butils.toMin(input);
    test.ok(output.indexOf('jquery/jquery.min.js') != -1, "Expecting to find 'jquery/jquery.min.js' in ['" + output + "']");
    test.ok(output.indexOf('handlebars/handlebars.min.js') != -1, "Expecting to find 'handlebars/handlebars.min.js' in ['" + output + "']");
    test.ok(output.indexOf('bootstrap/dist/css/bootstrap.min.css') != -1, "Expecting to find 'bootstrap/dist/css/bootstrap.min.css' in ['" + output + "']");
    assertLengthAndSameLengthAndDifferentObjs(3, input, output, test);
    test.done();
};

exports['testToMinEmptyDepsEmptySuffixMap'] = function(test) {
    var input = [];
    var output = butils.toMin(input, {});
    assertLengthAndSameLengthAndDifferentObjs(0, input, output, test);
    test.done();
};

exports['testToMin1JsDepEmptySuffixMap'] = function(test) {
    var input = [ 'jquery/jquery.js' ];
    var output = butils.toMin(input, {});
    test.ok(output.indexOf('jquery/jquery.min.js') == -1, "Not Expecting to find 'jquery/jquery.min.js' in ['" + output + "']");
    test.ok(output.indexOf('jquery/jquery.js') != -1, "Expecting to find 'jquery/jquery.js' in ['" + output + "']");
    assertLengthAndSameLengthAndDifferentObjs(1, input, output, test);
    test.done();
};

exports['testToMin1JsDepNonEmptyJsSuffixMap'] = function(test) {
    var input = [ 'jquery/jquery.js' ];
    var output = butils.toMin(input, {
        "js": "minified.js"
    });
    test.ok(output.indexOf('jquery/jquery.minified.js') != -1, "Expecting to find 'jquery/jquery.minified.js' in ['" + output + "']");
    assertLengthAndSameLengthAndDifferentObjs(1, input, output, test);
    test.done();
};

/**
 * Using test, this method asserts the length of output using len and
 * that the given input and output {Array} objects have the same length and
 * that they are different objects in memory.
 *
 * @param len {Number}
 * @param input {Array}
 * @param output {Array}
 * @param test {Object}
 */
function assertLengthAndSameLengthAndDifferentObjs(len, input, output, test) {
    test.equal(len, output.length, 'the output {Array} should a length of ' + len);
    test.equal(input.length, output.length, 'the output {Array} should have the same length as the input array');
    test.notEqual(input, output, 'the input and output {Array} are different objects in memory');
}
