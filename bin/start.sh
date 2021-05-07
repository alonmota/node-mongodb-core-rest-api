#!/usr/bin/env bash

ENV="$1"
: ${ENV:="hmg"}

echo "Iniciando isurvey-backend - ENV: "$ENV

docker-compose -f docker-compose.${ENV}.yml up --build -d