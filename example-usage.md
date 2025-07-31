# 提示词优化 MCP 服务器 - 使用示例

## 🎯 在 Cursor 中快速开始

在你的 `claude_desktop_config.json` 中配置 MCP 服务器后，你可以直接在 Cursor 对话中使用它：

### 基本使用
```
请使用 optimize_prompt 工具来改进这个提示词: "写一些关于 AI 的内容"
```

### 高级使用
```
使用 optimize_prompt 工具，参数如下:
- originalPrompt: "创建一个函数"
- context: "使用 React 和 TypeScript 构建 Web 应用程序"
- targetAudience: "高级开发者"
- optimizationGoals: ["clarity", "specificity", "examples"]
- style: "technical"
```

## 📋 示例对话

### 示例 1: 基本提示词优化
**用户输入:**
```
优化这个提示词: "解释机器学习"
```

**预期响应:**
工具将返回一个优化版本，包含：
- 增强的清晰度和具体性
- 添加的结构和要求
- 改进的可执行性
- 分析和评分

### 示例 2: 技术文档
**用户输入:**
```
请为技术文档优化这个提示词:
- originalPrompt: "记录 API"
- targetAudience: "开发者"
- optimizationGoals: ["structure", "specificity", "examples", "format"]
- style: "technical"
```

### 示例 3: 创意写作
**用户输入:**
```
优化这个创意提示词:
- originalPrompt: "写一个故事"
- context: "面向年轻人的奇幻冒险"
- targetAudience: "创意作家"
- optimizationGoals: ["clarity", "examples", "structure"]
- style: "creative"
```

## 🔧 Configuration Verification

To verify your MCP server is working correctly in Cursor:

1. **Check Configuration**: Ensure your `claude_desktop_config.json` includes the prompt-optimizer server
2. **Restart Cursor**: After adding the configuration, restart Cursor completely
3. **Test Connection**: Try a simple optimization request
4. **Check Logs**: Look for any error messages in Cursor's developer console

## 🚀 Advanced Features

### Multiple Optimization Goals
```
Optimize with multiple goals:
- originalPrompt: "Help me with coding"
- optimizationGoals: ["clarity", "specificity", "actionable", "examples", "format"]
```

### Context-Aware Optimization
```
Optimize with context:
- originalPrompt: "Review this code"
- context: "Code review for a production React application with performance concerns"
- targetAudience: "senior frontend developers"
```

### Style Adaptation
```
Adapt for different styles:
- originalPrompt: "Explain the concept"
- style: "formal" | "casual" | "technical" | "creative"
```

## 📊 Understanding the Response

The optimization tool returns:

```json
{
  "optimizedPrompt": "The enhanced version of your prompt",
  "improvements": ["List of specific improvements made"],
  "reasoning": "Detailed analysis of the optimization process",
  "originalLength": 25,
  "optimizedLength": 150,
  "score": 8.5
}
```

- **optimizedPrompt**: The improved version ready to use
- **improvements**: Specific changes that were applied
- **reasoning**: Explanation of why changes were made
- **lengths**: Character count comparison
- **score**: Quality improvement score (1-10)

## 🎯 Best Practices

1. **Be Specific**: Provide context and target audience when possible
2. **Choose Relevant Goals**: Select optimization goals that match your needs
3. **Iterate**: Use the optimized prompt and refine further if needed
4. **Test Results**: Try the optimized prompt and see if it produces better results

## 🔍 Troubleshooting

### Common Issues:
1. **Server Not Found**: Check your `claude_desktop_config.json` configuration
2. **Tool Not Available**: Restart Cursor after configuration changes
3. **Unexpected Results**: Verify your input parameters match the expected format

### Debug Steps:
1. Verify the server is running: `npx @modelcontextprotocol/server-prompt-optimizer`
2. Check the configuration file location and syntax
3. Look for error messages in Cursor's console
