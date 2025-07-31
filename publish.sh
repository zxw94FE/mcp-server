#!/bin/bash

# 发布脚本 - MCP Prompt Optimizer

echo "🚀 开始发布 MCP Prompt Optimizer..."

# 检查是否已登录 npm
echo "📝 检查 npm 登录状态..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ 请先登录 npm: npm login"
    exit 1
fi

echo "✅ npm 登录状态正常"

# 清理并构建
echo "🧹 清理旧的构建文件..."
rm -rf dist/

echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功"

# 检查包名是否已存在
PACKAGE_NAME=$(node -p "require('./package.json').name")
echo "📦 检查包名: $PACKAGE_NAME"

if npm view "$PACKAGE_NAME" > /dev/null 2>&1; then
    echo "⚠️  包名 $PACKAGE_NAME 已存在，将发布新版本"
else
    echo "✅ 包名可用"
fi

# 发布
echo "🚀 发布到 npm..."
npm publish --access public

if [ $? -eq 0 ]; then
    echo "🎉 发布成功！"
    echo "📦 包名: $PACKAGE_NAME"
    echo "🔗 安装命令: npm install $PACKAGE_NAME"
    echo "🔗 npx 命令: npx $PACKAGE_NAME"
else
    echo "❌ 发布失败"
    exit 1
fi
