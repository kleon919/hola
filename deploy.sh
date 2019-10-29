#!/bin/bash

NAME="hola_api"
TMP_DIR="./tmp/hola"

rm -rf $TMP_DIR

# Git Clone, credentials
git config --global credential.helper 'cache --timeout=3600'
git clone --branch develop https://github.com/kleon919/hola.git $TMP_DIR

# Remove container if exists
CONT=$(docker ps -a -q  --filter "name=$NAME")

if [ "$CONT" != "" ]
then
    docker rm -f $CONT
fi

cp ./config.json $TMP_DIR/config/
cd $TMP_DIR

docker build -t $NAME .
docker run --name $NAME -p 8000:8000 -d $NAME

docker rmi $(docker images -f "dangling=true" -q)
# IMAGE=$(docker images $NAME --format "{{.ID}}")