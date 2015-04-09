var Benchmark = require('benchmark').Benchmark;
var React = require('react');
var ReactMin = require('react/dist/react.min');
var suite = new Benchmark.Suite;

suite
.add('Create Element with React', function() {
    var element = React.createElement('h1', null, 'Hello, world!');
    React.renderToString(element);
})
.add('Create Element with React Min', function() {
    var element = ReactMin.createElement('h1', null, 'Hello, world!');
    ReactMin.renderToString(element);
})
.on('complete', function() {
    console.log('The Fastest test suite is ' + this.filter('fastest').pluck('name'));

    function compare(a, b) {
        if (a > b) {
            return ( a / b * 100).toFixed() + '% faster';
        }

        if (a === b) {
            return 'the same';
        }

        return (b / a * 100).toFixed() + '% slower';
    }

    console.log('React: ' + Math.round(this[0].hz) + ' ops/sec after ' + this[0].count + ' runs');
    console.log('ReactMin: ' + Math.round(this[1].hz) + ' ops/sec after ' + this[1].count + ' runs');
    console.log('ReactMin is ' + compare(this[1].hz, this[0].hz) + ' vs React');
})
.run({ 'async': true });