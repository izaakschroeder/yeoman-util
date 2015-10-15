
var generators = require('yeoman-generator');
var path = require('path');
var assign = require('lodash/object/assign');
var camelCase = require('lodash/string/camelCase');
var resolve = require('resolve');

module.exports = generators.Base.extend({

	constructor: function(args, options) {
		generators.Base.apply(this, arguments);
		this.data = options.data || { };
		this.express = options.express || false;
	},

	// Proxy `--option-foo` to `optionFoo` like any sane args parser would.
	option: function(name) {
		var self = this;
		generators.Base.prototype.option.apply(this, arguments);
		var normalized = camelCase(name);
		if (name === normalized) { return; }
		Object.defineProperty(this.options, normalized, {
			get: function() {
				return this[name];
			},
			set: function(value) {
				self.data[name] = value;
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
		var result = null;
		var err = null;
		var base = parts[0].split('/');
		var check = [ ];
		var root = path.dirname(module.parent.parent.filename);

		if (parts.length === 1) {
			parts.push('app');
		}

		base[base.length - 1] = 'generator-' + base[base.length - 1];

		check.push([name]);
		check.push(base.concat('generators', parts[1]));
		check.push(base.concat(parts[1]));

		for (var i = 0; i < check.length; ++i) {
			try {
				result = resolve.sync(check[i].join('/'), {
					basedir: root,
					moduleDirectory: [ 'node_modules' ],
				});
				break;
			}
			catch (error) {
				err = error;
			}
		}

		if (!result) {
			throw err;
		}

		generators.Base.prototype.composeWith.call(this, name, {
			options: options
		}, {
			local: result
		});
	}
});
