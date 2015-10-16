#!/bin/bash

ssh root@florianec 'cd /var/www/florian.ec; git pull origin master; gulp build --prod'
