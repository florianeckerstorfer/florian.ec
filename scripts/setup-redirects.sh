#!/bin/bash

aws s3api put-object --bucket florian-ec-prod --key "blog/index.html" --website-redirect-location "https://florian.ec"
aws s3api put-object --bucket florian-ec-prod --key "articles/index.html" --website-redirect-location "https://florian.ec"
aws s3api put-object --bucket florian-ec-prod --key "blog/2013-10-20-kinda-like-the-opposite-of-regexp/index.html" --website-redirect-location "https://florian.ec/blog/kinda-like-the-opposite-of-regexp"
