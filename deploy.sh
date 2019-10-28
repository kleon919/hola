#!/bin/bash

NAME="hola_api"

tmp_dir="./tmp/hola"
rm -rf $tmp_dir

# Git Clone, credentials
git config --global credential.helper 'cache --timeout=3600'
git clone --branch develop https://github.com/kleon919/hola.git $tmp_dir

# Remove container if exists
CONT=$(docker ps -a -q  --filter "name=$NAME")

if [ "$CONT" != "" ]
then
    echo "Container Exist"
    docker rm -f $CONT
else
   echo "Container does not exist"
fi

cp ./config.json $tmp_dir/config/
cd $tmp_dir

sudo docker build -t $NAME .
sudo docker run --name $NAME -p 8000:8000 -d $NAME

docker rmi $(docker images -f "dangling=true" -q)
# IMAGE=$(docker images $NAME --format "{{.ID}}")
