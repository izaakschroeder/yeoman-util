# yeoman-util

Make yeoman less painful to work with.

```javascript
var util = require('yeoman-util');

var MyGenerator = {
	writing: {
		// Straightforward copying of files
		eslintrc: util.copy('.eslintrc', '.eslintrc.json5'),

		// Straightforward editing of package.json files
		package: util.manifest()
	}
};
```
