
var assign = require('lodash/object/assign');
var map = require('lodash/collection/map');
var difference = require('lodash/array/difference');
var pluck = require('lodash/collection/pluck');
var contains = require('lodash/collection/contains');

function prompt(options) {
	return function() {
		this.data = this.data || { };
		var done = this.async()
		var data = this.data;
		var express = this.express;

		var thru = map(options, function(values) {
			return assign({
				default: data[values.name]
			}, values);
		});

		var need = difference(pluck(options, 'name'), Object.keys(data));

		if (express) {
			thru = thru.filter(function(entry) {
				return contains(need, entry.name);
			});

			if (thru.length === 0) {
				done();
				return;
			}
		}

		this.prompt(thru, function (answers) {
			assign(data, answers);
			done();
		});
	}
}

module.exports = prompt;
