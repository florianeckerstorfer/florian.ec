---
permalink: blog/static-website-github-actions-s3-deploy/
title: Deploying a Static Website to S3 with Github Actions
date: 2020-10-26
category: Development
tags: [s3, github actions, static website, deployment]
description: I'm going to explain how to deploy a static website to Amazon S3 with Github Actions.
---
Yesterday, after I have finished writing [Firefox cannot render Source Code Pro in colour](https://florian.ec/blog/firefox-source-code-pro-colour/) and I was about to run my deployment script, I thought I should finally automate this. Push the `main` branch to Github should be enough to deploy the newest build to S3. I’m using Github Actions, since I didn’t want to add another service to my process.

First, I was looking around for re-usable Github Actions, but giving third-party code access to your server is always a bit iffy and since I already have a [deployment script](https://github.com/florianeckerstorfer/florian.ec/blob/main/scripts/deploy.sh) this should not be hard. On my local machine I use [AWS CLI named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) and it should be enough to create such a profile in my Github Action and run my local script.

My deployed script is extreme simple, it syncs the `dist/` directory with my bucket and then invalidates my CloudFront distribution:

```bash
#!/bin/bash

aws s3 sync dist/ s3://BUCKET_NAME --profile florian.ec
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths '/*' --profile florian.ec

```

In my workflow I need to install NPM dependencies first, then build the Eleventy site and run my deployment script:

```yaml
# .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - run: mkdir -p ~/.aws
      - run: echo "[florian.ec]" > ~/.aws/credentials
      - run: echo "aws_access_key_id=${{ secrets.AWS_ACCESS_KEY_ID }}" >> ~/.aws/credentials
      - run: echo "aws_secret_access_key=${{ secrets.AWS_SECRET_ACCESS_KEY }}" >> ~/.aws/credentials
      - run: npm install
      - run: npm run build
      - run: npm run deploy

```

The only thing left to do is to go the repository settings under _Secrets_ and define `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` there.

Before I go, one more word on AWS access keys. Don’t use the credentials for your root account here. Go into IAM and create a new user with a new policy and give it access only to the resources you need for your deployment process. In most of the _Deploying to S3_ tutorials I have found this step is skipped and most people explain deploying to S3 by using their root credentials. Since this is important I am going to repeat it: don’t deploy using your root credentials. Go into IAM, create a new user, create a new policy, and give the user only access to the resources and actions it needs to deploy your site. Mine looks like this (replace `ACCOUNT_ID`, `BUCKET_NAME` and `DISTRIBUTION_ID` with your own):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "FlorianEcProd0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject",
                "cloudfront:ListInvalidations",
                "cloudfront:GetInvalidation",
                "cloudfront:CreateInvalidation"
            ],
            "Resource": [
                "arn:aws:s3:::BUCKET_NAME/*",
                "arn:aws:s3:::BUCKET_NAME",
                "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
            ]
        }
    ]
}
```

I use this user in my deployment script and I also have set up a server in [Transmit](https://www.panic.com/transmit/) so that I can manually inspect my bucket.

In conclusion, you don’t need to use user generated Github Actions to deploy your static site to S3. Instead, you can directly invoke the AWS CLI in your workflow. Don’t forget to create a new IAM user and give it only access to the resources your deployment process needs.
