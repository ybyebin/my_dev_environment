echo "现存 node 版本 ==========================================="
echo node version: $(node --version)
echo npm version: $(npm --version)

yarn install --ignore-engines

newEnv='prod'
if [ -n "${environment}" ];then
  newEnv="${environment}"
fi
echo '当前环境变量----------------------'
echo newEnv: $newEnv

NODE_ENV=$newEnv npm run build

