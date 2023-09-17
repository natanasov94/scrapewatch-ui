#!/bin/bash

docker build \
    --tag natanasov1994/scrapewatch-ui:$1 \
    --target prod-build \
    --file Dockerfile \
    .