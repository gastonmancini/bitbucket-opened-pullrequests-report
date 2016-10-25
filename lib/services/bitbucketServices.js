module.exports = function (config, bitbucketjs) {
	
	'use strict';
	
	var bitbucketClient = bitbucketjs({ 
		username: config.bitbucketUser, 
		password: config.bitbucketPassword 
	});

	return {

		/**
		 * Retrieves the team repositories
		 */
		getRepositories: function (teamName) {
			return bitbucketClient.repo.fetch(teamName).then(function(repositories) {
				return repositories.values;
			});
		},

		/**
		 * Retreives the openend pullrequests for the given repository
		 */
		getOpenedPullRequests: function (repoName, repoUrl) { 
			return bitbucketClient.request.get(repoUrl).then(function(pullrequests) {
				return { Name: repoName, PRs: pullrequests.values };
			});
		}
	};
};