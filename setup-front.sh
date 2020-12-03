#!/usr/bin/env bash

cd client

npm run build


cd ..

ls client # for testing purpose
ls -R client/dist # for testing purpose

cp client/dist/index.html server/public
cp client/dist/bundle.js server/public
