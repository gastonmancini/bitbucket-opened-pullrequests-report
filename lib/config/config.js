var settingsJson = require('./settings.json');
var node_env = process.env.NODE_ENV || 'development';
var settings = settingsJson[node_env];
var smtpHost = process.env.SMTP_HOST || settings.smtp_host;
var smtpPort = process.env.SMTP_PORT || settings.smtp_port;
var smtpUser = process.env.SMTP_USER || settings.smtp_user;
var smtpPassword = process.env.SMTP_PASSWORD || settings.smtp_password;

module.exports = {
  env: node_env,
  smtpHost: smtpHost,
  smtpPort: smtpPort,
  smtpUser: smtpUser,
  smtpPassword: smtpPassword,
  fromEmailAddress: settings.from_email_address,
  toEmailAddress: settings.to_email_address,
  bitbucketUser: settings.bitbucket_user,
  bitbucketPassword: settings.bitbucket_password,
  bitbucketTeamName: settings.bitbucket_teamname
};