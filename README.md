# 提示词优化 MCP 服务器

一个模型上下文协议 (MCP) 服务器，为 AI 交互提供智能提示词优化功能。此服务器在提供实用的提示词增强功能的同时，展示了 MCP 的核心概念。

## 🎯 展示的核心 MCP 概念

此服务器展示了模型上下文协议的基本概念：

### 1. **服务器架构**
- **服务器实例**: 处理客户端请求的主要 MCP 服务器
- **传输层**: 使用 `StdioServerTransport` 实现命令行兼容性
- **能力**: 向 MCP 客户端声明提供工具的能力

### 2. **工具系统**
- **工具定义**: 基于 JSON Schema 的工具规范
- **输入验证**: 使用模式进行结构化参数验证
- **响应格式化**: 标准化的 MCP 响应格式

### 3. **通信协议**
- **请求处理器**: 实现 `ListToolsRequestSchema` 和 `CallToolRequestSchema`
- **错误处理**: 正确的 MCP 错误响应格式化
- **异步操作**: 非阻塞工具执行

## 🚀 功能特性

提示词优化器通过多种优化策略提供全面的提示词增强：

### 优化目标
- **清晰度 (Clarity)**: 移除模糊语言，提高具体性
- **具体性 (Specificity)**: 添加具体细节和约束条件
- **结构 (Structure)**: 用逻辑流程组织内容
- **上下文 (Context)**: 融入相关背景信息
- **可执行性 (Actionable)**: 使指令更具体和可执行
- **简洁性 (Conciseness)**: 在保持清晰度的同时去除冗余
- **示例 (Examples)**: 添加说明性示例
- **格式 (Format)**: 指定清晰的输出格式要求

### 分析能力
- 提示词长度分析
- 清晰度和具体性评分
- 上下文和约束检测
- 示例和格式识别

## 📦 安装

### 使用 npm
```bash
npm install @modelcontextprotocol/server-prompt-optimizer
```

### 使用 npx (推荐用于 Cursor)
```bash
npx @modelcontextprotocol/server-prompt-optimizer
```

## 🔧 配置

### 在 Cursor 中使用

要在 Cursor 中使用此 MCP 服务器，请将以下配置添加到你的 `claude_desktop_config.json` 文件中：

#### 方法 1: 使用 npx (推荐)
```json
{
  "mcpServers": {
    "prompt-optimizer": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-prompt-optimizer"
      ]
    }
  }
}
```

#### 方法 2: 使用本地安装
```json
{
  "mcpServers": {
    "prompt-optimizer": {
      "command": "node",
      "args": [
        "/path/to/node_modules/@modelcontextprotocol/server-prompt-optimizer/dist/index.js"
      ]
    }
  }
}
```

### 配置文件位置

`claude_desktop_config.json` 文件应位于：

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

## 🛠️ 使用方法

配置完成后，你可以在 Cursor 中通过调用 `optimize_prompt` 工具来使用提示词优化器：

### 基本使用
```
请优化这个提示词: "写一些关于 AI 的内容"
```

### 带参数的高级使用
```
使用 optimize_prompt 工具，参数如下:
- originalPrompt: "写一些关于 AI 的内容"
- context: "这是为技术博客文章准备的"
- targetAudience: "软件开发者"
- optimizationGoals: ["clarity", "specificity", "examples"]
- style: "technical"
```

### 示例工具调用
```json
{
  "originalPrompt": "写一些关于 AI 的内容",
  "context": "面向开发者的技术博客文章",
  "targetAudience": "软件开发者",
  "optimizationGoals": ["clarity", "specificity", "structure", "examples"],
  "style": "technical"
}
```

## 📊 响应格式

工具返回全面的优化结果：

```json
{
  "optimizedPrompt": "你的提示词的增强版本...",
  "improvements": [
    "通过移除模糊语言增强了清晰度",
    "添加了具体的约束条件和要求",
    "重新组织内容，使其具有清晰的章节"
  ],
  "reasoning": "所做更改的详细分析...",
  "originalLength": 25,
  "optimizedLength": 150,
  "score": 8.5
}
```

## 🎯 使用场景

### 对于开发者
- 优化 API 文档提示词
- 增强代码审查指令
- 改进技术规范请求

### 对于内容创作者
- 完善写作提示词以获得更好的输出
- 构建复杂的内容请求
- 为创意简报增加清晰度

### 对于研究人员
- 改进数据分析提示词
- 构建研究问题
- 增强方法论描述

## 🔍 工作原理

1. **分析阶段**: 服务器分析你的原始提示词的清晰度、具体性、结构和其他因素
2. **优化阶段**: 根据你的目标应用选定的优化策略
3. **增强阶段**: 为你的目标受众和期望风格调整提示词
4. **评分阶段**: 根据应用的增强功能计算改进分数
5. **推理阶段**: 提供所做更改的详细解释

## 🤝 贡献

此服务器是模型上下文协议服务器集合的一部分。欢迎贡献！

## 📄 许可证

MIT 许可证 - 详情请参阅 LICENSE 文件。

## 🔗 相关链接

- [模型上下文协议](https://modelcontextprotocol.io)
- [MCP SDK 文档](https://github.com/modelcontextprotocol/sdk)
- [其他 MCP 服务器](https://github.com/modelcontextprotocol/servers)
