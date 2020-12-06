#!/usr/bin/env bash

cd client

echo "before building front"

npm run build

echo "list client dist directory"
ls -R dist

cp dist/index.html ../server/public/index.html
cp dist/bundle.js ../server/public/bundle.js
