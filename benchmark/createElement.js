process.env.NODE_ENV = 'production';

var React12 = require('../react-0.12/react');
var React12Min = require('../react-0.12/dist/react.min');
var React13 = require('../react-0.13/react');
var React13Min = require('../react-0.13/dist/react.min');
var React14 = require('../react-0.14/dist/react');
var React14Min = require('../react-0.14/dist/react.min');
var Benchtable = require('benchtable');
var suite = new Benchtable("react", { "isTransposed": true });

function makeComponent(react) {
    var component = react.createClass({
        displayName: 'HelloWorld',
        render: function() {
            return (react.createElement('div', { className: "hello" }, "Hello, world!"));
        }
    });

    return component;
}

var helloWorldComponents = {
    '12': makeComponent(React12),
    '12min': makeComponent(React12Min),
    '13': makeComponent(React13),
    '13min': makeComponent(React13Min),
    '14': makeComponent(React14),
    '14min': makeComponent(React14Min)
};

suite
.addFunction('DOM', function(react) {
    var element = react.createElement('h1', null, 'Hello, world!');
    react.renderToString(element);
})
.addFunction('Component', function(react, version) {
    var component = helloWorldComponents[version];
    var element = react.createElement(component, null);
    react.renderToString(element);
})
.addInput('React 12', [React12, '12'])
.addInput('React 12 Min', [React12Min, '12min'])
.addInput('React 13', [React13, '13'])
.addInput('React 13 Min', [React13Min, '13min'])
.addInput('React 14', [React14, '14'])
.addInput('React 14 Min', [React14Min, '14'])
.on('complete', function() {
    console.log('The Fastest test suite is ' + '\u001b[32m' + this.filter('fastest').pluck('name') + '\u001b[0m\n');
    console.log(this.table.toString());
})
.run({ 'async': true });
