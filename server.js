(function () {

	'use strict';

	var reporter = require('./lib/core/bootstrap')();

	reporter.sendOpenedPullRequestsEmail().then(function() {
		console.log('Finished without errors.');
	}).catch(function(err) {
		console.error(err);
	});

})();
