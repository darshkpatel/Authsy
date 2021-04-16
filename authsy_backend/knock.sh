#!/bin/bash

if [ -d "${HOME}/go/src/github.com/giuliocomi/knockandgo" ] 
then
    cd ~/go/src/github.com/giuliocomi/knockandgo
elif [ -d "${HOME}/go/src/knockandgo" ]
then
    cd ~/go/src/knockandgo
else
    echo "Error: Directory does not exists."
fi
go run main.go -m c -a $1 -s $2 -i $3 -t 3000 -k $4
