module.exports = function (config, bitbucketjs, Q) {
	
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
				
				var promises = [];

				var prsInfo = {
					Name: repoName,
					PRs: []
				};

				if (pullrequests.values.length > 0) {

					pullrequests.values.forEach(function(pr) {
						promises.push(getPullRequestReviewers(pr));
					});			

					return Q.all(promises).then(function(openedPrs) {	
						prsInfo.PRs = openedPrs;
						return prsInfo;
					});

				}

			});		
		}
	};

	function getPullRequestReviewers(pr) {

		return bitbucketClient.request.get(pr.links.self.href).then(function(prDetails) {

				var reviewers = [];

				prDetails.participants.forEach(function(participant) {
					if (!participant.approved && participant.role == "REVIEWER") {
						reviewers.push(participant.user.display_name);
					}
				});

				return { Info: { Id: pr.id, Title: pr.title, Link: pr.links.html.href }, Reviewers: reviewers };
		});

	}
};