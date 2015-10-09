
var assign = require('lodash/object/assign');
var map = require('lodash/collection/map');

function prompt(options) {
	return function() {
		this.data = this.data || { };
		var done = this.async(), data = this.data;
		var thru = map(options, function(values) {
			return assign({
				default: data[values.name]
			}, values);
		});

		this.prompt(thru, function (answers) {
			assign(data, answers);
			done();
		});
	}
}

module.exports = prompt;
