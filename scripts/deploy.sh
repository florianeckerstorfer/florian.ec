#!/bin/bash

deploy="www@158.255.211.173"
sshopts="ssh -o StrictHostKeyChecking=no"
rsync --rsh="$sshopts" -rP dist/ $deploy:/var/www/florian.ec