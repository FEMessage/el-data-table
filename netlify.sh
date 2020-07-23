#!/bin/sh
echo "is netlify: $NETLIFY"
echo "in branch: $BRANCH"
echo "head: $HEAD"

if [ "$NETLIFY" != "true" ]
then
  echo "this script only runs in netlify, bye"
  exit 1
fi

if [ "$BRANCH" != "dev" ] && [ "$HEAD" != "dev" ]
then
  yarn doc
else
  echo "this script only runs in targeting dev's PR deploy preview, bye"
fi
