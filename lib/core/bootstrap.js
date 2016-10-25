module.exports = function () {

  'use strict';

  var app = {
    dependencies: {},
    services: {}
  };

  app.config = require('../config/config');

  app.dependencies.mailgunmailer = require('mailgun-js')({apiKey: app.config.smtpApiKey, domain: app.config.smtpDomain});
  app.dependencies.bitbucketjs = require('bitbucketjs');
  app.dependencies.Q = require('q');

  app.services.bitbucketServices = require('../services/bitbucketServices')(app.config, app.dependencies.bitbucketjs);
  app.services.emailSender = require('../services/emailSender')(app.config, app.dependencies.mailgunmailer, app.services.bitbucketServices, app.dependencies.Q);

  return app.services.emailSender;
};