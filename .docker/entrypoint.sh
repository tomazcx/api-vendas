#!/bin/bash

yarn install
yarn typeorm -d src/shared/infra/typeorm/index.ts migration:run
yarn dev
