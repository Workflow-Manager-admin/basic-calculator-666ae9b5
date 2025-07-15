#!/bin/bash
cd /home/kavia/workspace/code-generation/basic-calculator-666ae9b5/calculator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

