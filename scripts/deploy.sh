#!/bin/bash

aws s3 sync dist/ s3://florian-ec-prod --profile FlorianEcProd
aws cloudfront create-invalidation --distribution-id $FLORIAN_EC_PROD_DISTRIBUTION_ID --paths '/*' --profile FlorianEcProd
