module.exports = function (config, mailer, bitbucketServices, Q) {
	
	'use strict';
	
	return {

		/**
		 * Send email with openen pull requests
		 */
		sendOpenedPullRequestsEmail: function () {

			bitbucketServices.getRepositories(config.bitbucketTeamName).then(function(repositories) {

				var promises = [];

				repositories.forEach(function(repo) {

					promises.push(bitbucketServices.getOpenedPullRequests(repo.name, repo.links.pullrequests.href));

				});

				Q.all(promises).then(function(openedPrs) {
					
					sendEmail(openedPrs);

				});
			});	
		}		
	};

	function sendEmail(openedPrs) {
    
    	var today = new Date().toISOString().substring(0, 10);

		var data = {
			from: config.fromEmailAddress,
			to: config.toEmailAddress,
			subject: today + ' - Open PRs',
			html: generateEmailBody(openedPrs)
		}

	 	if (data.body != "") {

	 		mailer.messages().send(data, function (error, body) {
		       	if (error) { 
		       		console.log('An error ocurred sending the opened pull requests report email. Error: ' + error); 
		       	} 
	    	});

	 	}
	}

	function generateEmailBody(openedPrsPerProject) {

		var body = "";

		openedPrsPerProject.forEach(function(op) {

			if (op.PRs.length > 0) {
				body = body + "<bold>" + op.Name + ":</bold><br>";

				op.PRs.forEach(function(prs) {
					body = body + prs.title + "<br>";
				})

				body = body + "<br>";
			}
		});

		return body;
	}
};