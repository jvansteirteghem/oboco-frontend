#!/bin/bash

# replace

sed -i 's,listen .*;,listen 9080;,' /etc/nginx/conf.d/default.conf
sed -i 's,#{BASE_URL}#,'"${BASE_URL}"',g' /usr/share/nginx/html/main*.js

# start

nginx -g 'daemon off;'