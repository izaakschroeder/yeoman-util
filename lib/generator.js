
var generators = require('yeoman-generator');
var path = require('path');
var assign = require('lodash/object/assign');
var camelCase = require('lodash/string/camelCase');

module.exports = generators.Base.extend({

	// Proxy `--option-foo` to `optionFoo` like any sane args parser would.
	option: function(name) {
		generators.Base.prototype.option.apply(this, arguments);
		var normalized = camelCase(name);
		if (name === normalized) { return; }
		Object.defineProperty(this.options, normalized, {
			get: function() {
				return this[name];
			},
			set: function(value) {
				this[name] = value;
			}
		});
	},

	templateContext: function() {
		return assign({ }, this.data, this.options);
	},

	filePath: function() {
		return this.templatePath(path.join('..', 'files'));
	},

	// Fix composeWith to allow local modules since the normal composeWith
	// resolver is smart as a bag of rocks.
	composeWith: function (name, options) {
		if (!name) { return; }
		var parts = name.split(':');
		var search = ['generators', '.'];
		var result = null;
		var err = null;
		var base = parts[0].split('/');
		var check = [ ];

		if (parts.length === 1) {
			parts.push('app');
		}

		check.push(path.join(
			path.dirname(module.parent.parent.filename),
			name
		));

		base[base.length - 1] = 'generator-' + base[base.length - 1];

		for (var i = 0; i < search.length; ++i) {
			check.push(base.concat(search[i], parts[1]).join('/'));
		}

		for (var i = 0; i < check.length; ++i) {
			try {
				result = require.resolve(check[i]);
				break;
			} catch(e) {
				err = e;
			}
		}

		if (!result) {
			throw err;
		}

		generators.Base.prototype.composeWith.call(this, name, options, {
			local: result
		});
	}
});
