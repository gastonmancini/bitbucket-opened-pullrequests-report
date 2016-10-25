(function () {

	'use strict';

	var reporter = require('./lib/core/bootstrap')();

	reporter.sendOpenedPullRequestsEmail();

})();
