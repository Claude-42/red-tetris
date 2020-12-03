#!/usr/bin/env bash

cd client

npm ci
npm run build

cd ..
cp client/dist/index.html server/public
cp client/dist/bundle.js server/public
