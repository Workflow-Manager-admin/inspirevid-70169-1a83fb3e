#!/bin/bash
cd /home/kavia/workspace/code-generation/inspirevid-70169-1a83fb3e/quote_ui_frontend_workspace/quote_ui_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

