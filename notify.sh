#!/bin/sh
if [ "$TRAVIS_TEST_RESULT" != "0" ]
then
  echo "build not success, bye"
  exit 1
fi

ORG_NAME=$(echo "$TRAVIS_REPO_SLUG" | cut -d '/' -f 1)
REPO_NAME=$(echo "$TRAVIS_REPO_SLUG" | cut -d '/' -f 2)

git remote add github https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git > /dev/null 2>&1
git push github HEAD:master --follow-tags

GREN_GITHUB_TOKEN=$GITHUB_TOKEN yarn release

url=https://api.github.com/repos/$TRAVIS_REPO_SLUG/releases/latest
resp_tmp_file=resp.tmp

curl -H "Authorization: token $GITHUB_TOKEN" $url > $resp_tmp_file

html_url=$(sed -n 5p $resp_tmp_file | sed 's/\"html_url\"://g' | awk -F '"' '{print $2}')
body=$(grep body < $resp_tmp_file | sed 's/\"body\"://g;s/\"//g')
version=$(echo $html_url | awk -F '/' '{print $NF}')

msg='{"msgtype": "markdown", "markdown": {"title": "'$REPO_NAME'更新", "text": "@所有人\n# ['$REPO_NAME'('$version')]('$html_url')\n'$body'"}}'

curl -X POST https://oapi.dingtalk.com/robot/send\?access_token\=$DINGTALK_ROBOT_TOKEN -H 'Content-Type: application/json' -d "$msg"

rm $resp_tmp_file
