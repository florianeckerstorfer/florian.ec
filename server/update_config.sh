#!/bin/bash

scp -r ./server/* root@florianec:/root/florianec_install/
ssh root@florianec 'cd ./florianec_install; chmod +x ./server_update_config.sh;./server_update_config.sh'
