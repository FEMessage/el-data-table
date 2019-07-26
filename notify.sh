#!/bin/sh
if [ "$TRAVIS_TEST_RESULT" != "0" ]
then
  echo "build not success, bye"
  exit 1
fi

url=https://api.github.com/repos/FEMessage/el-data-table/releases/latest
resp_tmp_file=resp.tmp

curl -H "Authorization: token $GITHUB_TOKEN" $url > $resp_tmp_file

html_url=$(sed -n 5p $resp_tmp_file | sed 's/\"html_url\"://g' | awk -F '"' '{print $2}')
body=$(grep body < $resp_tmp_file | sed 's/\"body\"://g;s/\"//g')

msg='{"msgtype": "markdown", "markdown": {"title": "el-data-table更新", "text": "@所有人\n# [el-data-table]('$html_url')\n'$body'"}}'

curl -X POST https://oapi.dingtalk.com/robot/send\?access_token\=$DINGTALK_ROBOT_TOKEN -H 'Content-Type: application/json' -d "$msg"

rm $resp_tmp_file
