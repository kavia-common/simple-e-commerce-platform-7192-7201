#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-e-commerce-platform-7192-7201/backend_api
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

