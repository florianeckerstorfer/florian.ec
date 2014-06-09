echo "Configuring Nginx..."
cp nginx.conf /usr/local/nginx/nginx.conf
cp florian.ec.conf /etc/nginx/conf.d/florian.ec.conf
cp florianeckerstorfer.com.conf /etc/nginx/conf.d/florianeckerstorfer.com.conf

if [[ -f /usr/local/nginx/sbin/nginx ]]; then
    echo "Starting Nginx..."
    service nginx restart
fi
