module.exports = function () {

  'use strict';

  var app = {
    dependencies: {},
    services: {}
  };

  app.config = require('../config/config');

  var smtpConfig = {
      host: app.config.smtpHost,
      port: app.config.smtpPort,
      secure: true,
      auth: {
          user: app.config.smtpUser,
          pass: app.config.smtpPassword
      }
  };

  app.dependencies.mailer = require('nodemailer').createTransport(smtpConfig);
  
  app.dependencies.bitbucketjs = require('bitbucketjs');
  app.dependencies.Q = require('q');

  app.services.bitbucketServices = require('../services/bitbucketServices')(app.config, app.dependencies.bitbucketjs, app.dependencies.Q);
  app.services.emailSender = require('../services/emailSender')(app.config, app.dependencies.mailer, app.services.bitbucketServices, app.dependencies.Q);

  return app.services.emailSender;
};