#!/bin/bash

aws s3 sync dist/ s3://florian-ec-prod --profile florian.ec --region eu-west-1
aws cloudfront create-invalidation --distribution-id E31F182UN8ILBI --paths '/*' --profile florian.ec --region eu-west-1
