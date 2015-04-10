process.env.NODE_ENV = 'production';

var React12 = require('../react-0.12/react');
var React12Min = require('../react-0.12/dist/react.min');
var React13 = require('../react-0.13/react');
var React13Min = require('../react-0.13/dist/react.min');
var Benchtable = require('benchtable');
var suite = new Benchtable();

suite
.addFunction('createElement', function(react) {
    var element = react.createElement('h1', null, 'Hello, world!');
    react.renderToString(element);
})
.addFunction('createClass', function(react) {
    var HelloWorld = react.createClass({
        displayName: 'CommentBox',
        render: function() {
            return (react.createElement('div', { className: "hello" }, "Hello, world!"));
        }
    });

    var element = react.createElement(HelloWorld, null);
    react.renderToString(element);
})
.addInput('React 12', [React12])
.addInput('React 12 Min', [React12Min])
.addInput('React 13', [React13])
.addInput('React 13 Min', [React13Min])
.on('complete', function() {
    console.log('The Fastest test suite is ' + '\u001b[32m' + this.filter('fastest').pluck('name') + '\u001b[0m\n');
    console.log(this.table.toString());

    /*function compare(a, b) {
        if (a > b) {
            return ( a / b * 100).toFixed() + '% faster';
        }

        if (a === b) {
            return 'the same';
        }

        return (b / a * 100).toFixed() + '% slower';
    }

    console.log('React12Min is ' + compare(this[1].hz, this[0].hz) + ' vs React12\n');
    console.log('React13Min is ' + compare(this[3].hz, this[2].hz) + ' vs React12');
    console.log('React13Min is ' + compare(this[3].hz, this[1].hz) + ' vs React12Min');*/
})
.run({ 'async': true });