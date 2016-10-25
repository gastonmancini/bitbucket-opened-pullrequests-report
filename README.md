# Bitbucket Opened Pull Requests Report

[![Dependency Status](https://img.shields.io/david/gastonmancini/bitbucket-opened-pullrequests-report.svg?style=flat-square)](https://david-dm.org/gastonmancini/bitbucket-opened-pullrequests-report)

The application is a simple Node.js app that is used to send a daily report (reminders) of the openened BitBucket Pull Requests to your team

## Overview

- Communicates with [Bibucket API v2](https://developer.atlassian.com/bitbucket/api/2/reference/) using the [BitbucketJs client](https://bitbucket.org/atlassian/bitbucketjs)

### Install Dependencies

You can get the tools we depend upon via `npm`, the node package manager

Simply do:

```
npm install
```

You should find that you have a new folder in your project:

* `node_modules` - contains the npm packages for the tools we need

### Config

You will need to setup the SMTP and BitBucket credentials in the settings.json file included in the app

### Run the Application

```
npm start
```

### Issues

Please report any issue [here](https://github.com/gastonmancini/bitbucket-opened-pullrequests-report/issues)
