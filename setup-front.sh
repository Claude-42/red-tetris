#!/usr/bin/env bash

cd client
npm run build

echo "list client dist directory"
ls -R dist

cd ..
cp client/dist/index.html server/public
cp client/dist/bundle.js server/public
