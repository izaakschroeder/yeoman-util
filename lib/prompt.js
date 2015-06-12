
var assign = require('lodash/object/assign');
var map = require('lodash/collection/map');

function prompt(options) {
	return function() {
		var done = this.async(), data = this.data;
		options = map(options, function(values) {
			return assign({
				default: data[values.name]
			}, values);
		});

		this.prompt(options, function (answers) {
			assign(this.data, answers);
			done();
		}.bind(this));
	}
}

module.exports = prompt;
