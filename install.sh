#!/usr/bin/env bash

(npm ci)

(cd client && npm ci)

(cd server && npm ci)
