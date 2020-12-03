#!/usr/bin/env bash

(./setup-front.sh)
(./setup-back.sh)

NODE_ENV=production cd server && npm start
