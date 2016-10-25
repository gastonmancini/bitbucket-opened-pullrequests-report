var settingsJson = require('./settings.json');
var node_env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var settings = settingsJson[node_env];
var smtpDomain = process.env.SMTP_DOMAIN || settings.smtp_domain;
var smtpApiKey = process.env.SMTP_API_KEY || settings.smtp_api_key;

module.exports = {
  env: node_env,
  port: port,
  smtpApiKey: smtpApiKey,
  smtpDomain: smtpDomain,
  fromEmailAddress: settings.from_email_address,
  toEmailAddress: settings.to_email_address,
  bitbucketUser: settings.bitbucket_user,
  bitbucketPassword: settings.bitbucket_password,
  bitbucketTeamName: settings.bitbucket_teamname
};