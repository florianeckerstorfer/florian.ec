#!/bin/bash

# Install Git, Ruby and Nginx
echo "Install Git, OpenSSL, Ruby and RubyGems..."
yum install git openssl openssl-devel ruby rubygems --assumeyes --quiet
echo "Git installed: "
git --version
# echo "Nginx installed: "
# nginx -v
echo "Ruby installed: "
ruby --version
echo "RubyGems installed: "
gem --version

# Install Nginx
if [[ ! -f /usr/local/nginx/sbin/nginx ]]; then
    wget http://nginx.org/download/nginx-1.7.0.tar.gz
    tar -xvpzf nginx-1.7.0.tar.gz
    cd nginx-1.7.0.tar.gz
    ./configure --with-http_spdy_module --with-http_ssl_module --with-http_realip_module --with-http_addition_module --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_random_index_module --with-http_secure_link_module --with-http_stub_status_module --with-mail --with-mail_ssl_module --with-file-aio --with-ipv6 --with-cc-opt='-O2 -g -pipe -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector --param=ssp-buffer-size=4 -m64 -mtune=generic'
    make
    make install
    cd ..
    rm -rf nginx-1.7.0.tar.gz nginx-1.7.0
fi

if [[ ! -f /etc/init.d/nginx ]]; then
    cp nginx_service /etc/init.d/nginx
    chkconfig nginx on
fi


echo "Configuring Nginx..."
cp nginx.conf /usr/local/nginx/nginx.conf
cp florian.ec.conf /etc/nginx/conf.d/florian.ec.conf

if [[ -f /usr/local/nginx/sbin/nginx ]]; then
    echo "Starting Nginx..."
    service nginx start
fi

# Install PHP 5.5
echo "Installing PHP..."
rpm -Uvh http://mirror.webtatic.com/yum/el6/latest.rpm
yum install php55w php55w-intl php55w-xml --assumeyes --quiet
echo "PHP installed: "
php --version
echo "Configuring PHP..."
cp php.ini /etc/php.ini

# Install Node.js
echo "Install Node.js..."
rpm --import https://fedoraproject.org/static/0608B895.txt
rpm -Uvh http://download-i2.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
yum install nodejs npm --enablerepo=epel --assumeyes --quiet
echo "Node.js installed: "
node --version
echo "NPM installed: "
npm --version

# Install Sass
echo "Installing Sass..."
gem install sass --no-rdoc --no-ri
echo "Sass installed: "
sass --version

# Install Bower & Grunt
if [[ ! -f /usr/bin/bower ]]; then
    echo "Install Bower..."
    npm install -g bower
    bower --version
else
    echo "Bower already installed. Nothing to do."
fi
if [[ ! -f /usr/bin/grunt ]]; then
    echo "Installing Grunt..."
    npm install -g grunt-cli
    grunt --version
else
    echo "Grunt already installed. Nothing to do."
fi
if [[ ! -f /usr/local/bin/composer ]]; then
    echo "Installing Composer..."
    curl -sS https://getcomposer.org/installer | php
    mv composer.phar /usr/local/bin/composer
    composer --version
else
    echo "Composer already installed. Nothing to do."
fi

if [[ -f /var/www/florian.ec ]]; then
    # Clone repository and install NPM and Bower dependencies
    echo "Installing florian.ec from Github..."
    mkdir -p /var/www/florian.ec
    cd /var/www/florian.ec

    git clone https://github.com/florianeckerstorfer/florian.ec ./

    echo "Installing dependencies..."
    composer install
    npm install
    bower install --allow-root
else
    # Pull updates from repository and update NPM and Bower dependencies
    echo "Pulling updates from Github..."
    cd /var/www/florian.ec
    git pull origin master

    echo "Updating dependencies..."
    composer update
    npm update
    bower update --allow-root
fi

echo "Building site..."
grunt build:prod
