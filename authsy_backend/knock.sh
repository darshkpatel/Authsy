#!/bin/bash

cd ~/go/src/knockandgo
go run main.go -m c -a $1 -s $2 -i $3 -t 300 -k $4
