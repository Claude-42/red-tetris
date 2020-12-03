#!/usr/bin/env bash

(cd client && npm run test:unit -- --coverage --collectCoverageFrom 'src/**/*')

(cd server && npm test -- --coverage --collectCoverageFrom 'src/**/*')
