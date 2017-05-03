module.exports = function (config, mailer, bitbucketServices, Q) {
	
	'use strict';
	
	return {

		/**
		 * Send email with openen pull requests
		 */
		sendOpenedPullRequestsEmail: function () {

			return bitbucketServices.getRepositories(config.bitbucketTeamName).then(function(repositories) {

				var promises = [];

				repositories.forEach(function(repo) {
					promises.push(bitbucketServices.getOpenedPullRequests(repo.name, repo.links.pullrequests.href));
				});

				Q.all(promises).then(sendEmail);
			});	
		}		
	};

	function sendEmail(openPRs) {
    
    	var today = new Date().toISOString().substring(0, 10);

		var data = {
			from: config.fromEmailAddress,
			to: config.toEmailAddress,
			subject: today + ' - Open PRs',
			html: generateEmailBody(openPRs)
		}

	 	if (data.body != "") {

	 		mailer.sendMail(data, function (error, body) {
		       	if (error) { 
		       		console.log('An error ocurred sending the opened pull requests report email. Error: ' + error); 
		       	} 
	    	});

	 	}
	}

	function generateEmailBody(openedPrsPerProject) {

		var body = "";

		openedPrsPerProject.forEach(function(op) {

			if (!!op && !!op.PRs && op.PRs.length > 0) {

				body += "<b>" + op.Name + ":</b><br><br>";

				op.PRs.forEach(function(prs) {
					body += "<a href=" + prs.Info.Link + ">" + prs.Info.Id + ": " + prs.Info.Title + "</a><br>Pending approvals: ";
					if (!!prs.Reviewers && prs.Reviewers.length > 0) {
						body += prs.Reviewers.join(", ");
					} else {
						body += "NONE";
					}
					body += "<br><br>";
				});

				body += "<br>";
			}				
		});

		return body;
	}
};