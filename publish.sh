if [ ! -d lambda ]; then
  mkdir lambda
fi
if [ -f lambda/index.zip ]; then
  rm lambda/index.zip
fi

zip -X -r ./lambda/index.zip *
aws lambda update-function-code --function-name AlexaLottery --zip-file fileb://lambda/index.zip
