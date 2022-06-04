#!/bin/bash

BASE_URL=https://api.talky.jho.ovh

OPENAPI_URLS=("$BASE_URL/v3/api-docs/posts" "$BASE_URL/v3/api-docs/users" "$BASE_URL/v3/api-docs/social")

OUTPUT_DIRECTORY="$PWD/src/api/generated"

function codegen() {
  local url=$1
  yarn run openapi-generator-cli generate \
    -i $url \
    -g typescript-axios \
    -o $OUTPUT_DIRECTORY \
    --enable-post-process-file \
    --model-package models \
    --api-package api \
    --additional-properties=enumPropertyNaming=UPPERCASE,supportsES6=true,stringEnums=true,withSeparateModelsAndApi=true

  local filename="$(basename $url).ts"
  mv $OUTPUT_DIRECTORY/api.ts  $OUTPUT_DIRECTORY/$filename
}

for uri in ${OPENAPI_URLS[@]}; do
  codegen "$uri"
done

# Build models index
MODEL_INDEXFILE="$OUTPUT_DIRECTORY/models/index.ts"

rm -f $MODEL_INDEXFILE

for file in $OUTPUT_DIRECTORY/models/*.ts; do
  name=$(basename ${file%.*})
  echo "export * from './$name';" >> $MODEL_INDEXFILE
done
