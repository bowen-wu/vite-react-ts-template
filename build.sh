#!/bin/bash
source ~/.bashrc

node_version=$1

nvm install $node_version
nvm use $node_version

npm config set registry  https://registry.npm.taobao.org
npm install yarn -g

yarn config set registry https://registry.npm.taobao.org
yarn

yarn build

cd dist
zip -r ./dist.zip ./*
