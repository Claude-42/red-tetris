#!/usr/bin/env bash

(./setup-front.sh)

echo "list public directory"
ls -R server/public

(NODE_ENV=production cd server && npm start)
