---
permalink: blog/github-actions-awscli-errors/
title: Fixing errors with AWS CLI in Github Actions
date: 2021-02-19
category: Development
tags: [awscli, github actions]
description: Through an update of Ubuntu in Github Actions my deployment script was breaking with errors in awscli. Here I describe a fix for these errors.
---

When I was trying to update this website yesterday I noticed that [my deployment script](https://florian.ec/blog/static-website-github-actions-s3-deploy/) that builds this Eleventy site and deploys it to AWS S3 was not working and throwing errors when running in Github Actions. Locally the script was running fine, but when it is executed in a Github Action `awscli` was throwing the following error:

```
<botocore.awsrequest.AWSRequest object at 0x7f44ac9b2eb8>
<botocore.awsrequest.AWSRequest object at 0x7f336fca6828>
```

After a bit of searching I found [a comment in a Github issue](https://github.com/aws/aws-cli/issues/5234#issuecomment-705831465) that described the solution. This is a problem with `awscli` trying to detect the region and failing when run in certain virtualised environments and to fix it I needed to specify the region manually. For me this bug was caused when Github updated the Ubuntu that is running my actions to `ubuntu-20.04`. After updating my deploy script to specify the region everything works correctly again:

```shell
aws s3 sync dist/ s3://$BUCKET_NAME --profile florian.ec --region eu-west-1
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*' --profile florian.ec --region eu-west-1
```

I tried to simplify the setup I have for this website as much as possible and it is kinda annoying when things still randomly break. On the positive side I got another blog article out of it.
