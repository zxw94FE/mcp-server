#!/usr/bin/env node
/**
 * 提示词优化 MCP 服务器
 *
 * 这个服务器展示了模型上下文协议 (MCP) 的核心概念：
 * 1. 服务器 (Server): 处理请求的主要 MCP 服务器实例
 * 2. 工具 (Tools): 可被 AI 模型调用的函数 (optimize_prompt)
 * 3. 传输 (Transport): 通信层 (StdioServerTransport 用于命令行使用)
 * 4. 模式 (Schema): 使用 JSON Schema 定义工具的输入输出
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
/**
 * PromptOptimizer 类 - 提示词优化的核心业务逻辑
 * 这展示了 MCP 服务器中关注点分离的设计
 */
class PromptOptimizer {
    optimizationStrategies = {
        clarity: "使提示词更清晰和具体",
        specificity: "添加具体细节和约束条件",
        structure: "改善逻辑结构和流程",
        context: "提供更好的上下文和背景信息",
        actionable: "使指令更具可执行性和具体性",
        conciseness: "在保持清晰度的同时去除冗余",
        examples: "添加相关示例来说明期望",
        format: "明确指定所需的输出格式"
    };
    async optimizePrompt(request) {
        const { originalPrompt, context, targetAudience, optimizationGoals, style } = request;
        // 分析原始提示词
        const analysis = this.analyzePrompt(originalPrompt);
        // 应用优化策略
        let optimizedPrompt = originalPrompt;
        const improvements = [];
        // 应用选定的优化目标或默认目标
        const goals = optimizationGoals || ['clarity', 'specificity', 'structure'];
        for (const goal of goals) {
            const result = this.applyOptimization(optimizedPrompt, goal, context, targetAudience, style);
            optimizedPrompt = result.prompt;
            if (result.improvement) {
                improvements.push(result.improvement);
            }
        }
        // 计算改进评分
        const score = this.calculateScore(originalPrompt, optimizedPrompt, improvements);
        return {
            optimizedPrompt,
            improvements,
            reasoning: this.generateReasoning(originalPrompt, optimizedPrompt, improvements),
            originalLength: originalPrompt.length,
            optimizedLength: optimizedPrompt.length,
            score
        };
    }
    analyzePrompt(prompt) {
        return {
            length: prompt.length,
            hasContext: prompt.toLowerCase().includes('context') || prompt.toLowerCase().includes('background'),
            hasExamples: prompt.toLowerCase().includes('example') || prompt.toLowerCase().includes('for instance'),
            hasConstraints: prompt.toLowerCase().includes('must') || prompt.toLowerCase().includes('should') || prompt.toLowerCase().includes('requirement'),
            hasFormat: prompt.toLowerCase().includes('format') || prompt.toLowerCase().includes('structure'),
            clarity: this.assessClarity(prompt),
            specificity: this.assessSpecificity(prompt)
        };
    }
    assessClarity(prompt) {
        // 清晰度评估的简单启发式方法
        const vagueWords = ['thing', 'stuff', 'something', 'anything', 'maybe', 'perhaps', 'kind of', 'sort of'];
        const vagueCount = vagueWords.reduce((count, word) => count + (prompt.toLowerCase().split(word).length - 1), 0);
        return Math.max(0, 10 - vagueCount * 2);
    }
    assessSpecificity(prompt) {
        // 具体性评估的简单启发式方法
        const specificWords = ['exactly', 'precisely', 'specifically', 'must', 'should', 'required', 'include', 'exclude'];
        const specificCount = specificWords.reduce((count, word) => count + (prompt.toLowerCase().split(word).length - 1), 0);
        return Math.min(10, specificCount);
    }
    applyOptimization(prompt, goal, context, targetAudience, style) {
        let optimizedPrompt = prompt;
        let improvement;
        switch (goal) {
            case 'clarity':
                if (this.assessClarity(prompt) < 7) {
                    optimizedPrompt = this.improveClarity(prompt);
                    improvement = "通过移除模糊语言和添加具体指令来增强清晰度";
                }
                break;
            case 'specificity':
                if (this.assessSpecificity(prompt) < 5) {
                    optimizedPrompt = this.improveSpecificity(prompt, context);
                    improvement = "添加了具体的约束条件和要求";
                }
                break;
            case 'structure':
                optimizedPrompt = this.improveStructure(prompt);
                improvement = "重新组织内容，使其具有清晰的章节和逻辑流程";
                break;
            case 'context':
                if (context) {
                    optimizedPrompt = this.addContext(prompt, context);
                    improvement = "添加了相关的上下文和背景信息";
                }
                break;
            case 'actionable':
                optimizedPrompt = this.makeActionable(prompt);
                improvement = "使指令更加具体和可执行";
                break;
            case 'examples':
                optimizedPrompt = this.addExamples(prompt);
                improvement = "添加示例来澄清期望";
                break;
            case 'format':
                optimizedPrompt = this.specifyFormat(prompt);
                improvement = "指定了清晰的输出格式要求";
                break;
        }
        if (targetAudience) {
            optimizedPrompt = this.adaptForAudience(optimizedPrompt, targetAudience);
        }
        if (style) {
            optimizedPrompt = this.adaptStyle(optimizedPrompt, style);
        }
        return { prompt: optimizedPrompt, improvement };
    }
    improveClarity(prompt) {
        // 用更具体的语言替换模糊术语
        let improved = prompt
            .replace(/\bthing\b/gi, 'item')
            .replace(/\bstuff\b/gi, 'content')
            .replace(/\bsomething\b/gi, 'a specific item')
            .replace(/\bmaybe\b/gi, 'if applicable')
            .replace(/\bkind of\b/gi, 'similar to');
        // 添加清晰度标记
        if (!improved.includes('Please') && !improved.includes('I need')) {
            improved = 'Please ' + improved.charAt(0).toLowerCase() + improved.slice(1);
        }
        return improved;
    }
    improveSpecificity(prompt, context) {
        let improved = prompt;
        // 如果缺少具体要求则添加
        if (!improved.toLowerCase().includes('must') && !improved.toLowerCase().includes('should')) {
            improved += '\n\n要求:\n- 要具体和详细\n- 提供清晰的解释';
        }
        if (context) {
            improved = `上下文: ${context}\n\n${improved}`;
        }
        return improved;
    }
    improveStructure(prompt) {
        // 如果提示词很长且无结构，则添加章节
        if (prompt.length > 200 && !prompt.includes('\n\n')) {
            const sentences = prompt.split('. ');
            if (sentences.length > 3) {
                const intro = sentences.slice(0, 2).join('. ') + '.';
                const details = sentences.slice(2).join('. ');
                return `${intro}\n\n详细信息:\n${details}`;
            }
        }
        return prompt;
    }
    addContext(prompt, context) {
        return `上下文: ${context}\n\n任务: ${prompt}`;
    }
    makeActionable(prompt) {
        let improved = prompt;
        // 如果缺少动作动词则添加
        const actionVerbs = ['analyze', 'create', 'generate', 'explain', 'describe', 'list', 'compare'];
        const hasActionVerb = actionVerbs.some(verb => improved.toLowerCase().includes(verb));
        if (!hasActionVerb) {
            improved = 'Please analyze and ' + improved.charAt(0).toLowerCase() + improved.slice(1);
        }
        return improved;
    }
    addExamples(prompt) {
        if (!prompt.toLowerCase().includes('example')) {
            return prompt + '\n\n请提供具体示例来说明你的回答。';
        }
        return prompt;
    }
    specifyFormat(prompt) {
        if (!prompt.toLowerCase().includes('format') && !prompt.toLowerCase().includes('structure')) {
            return prompt + '\n\n格式: 请用标题和要点清晰地组织你的回答。';
        }
        return prompt;
    }
    adaptForAudience(prompt, audience) {
        if (prompt.includes(`目标受众: ${audience}`)) {
            return prompt; // 已经适配
        }
        const audienceNote = `\n\n目标受众: ${audience} - 请相应调整复杂度和术语。`;
        return prompt + audienceNote;
    }
    adaptStyle(prompt, style) {
        if (prompt.includes(`风格: ${style}`)) {
            return prompt; // 已经适配
        }
        const styleNote = `\n\n风格: ${style}`;
        return prompt + styleNote;
    }
    calculateScore(original, optimized, improvements) {
        // 基于改进情况的简单评分
        let score = 5; // 基础分数
        score += improvements.length * 1.5; // 每个改进增加分数
        // 长度优化奖励
        if (optimized.length > original.length && optimized.length < original.length * 1.5) {
            score += 1; // 良好的扩展
        }
        else if (optimized.length < original.length && optimized.length > original.length * 0.8) {
            score += 1; // 良好的压缩
        }
        return Math.min(10, Math.round(score * 10) / 10);
    }
    generateReasoning(original, optimized, improvements) {
        let reasoning = "优化分析:\n\n";
        reasoning += `原始提示词分析:\n`;
        reasoning += `- 长度: ${original.length} 个字符\n`;
        reasoning += `- 清晰度评分: ${this.assessClarity(original)}/10\n`;
        reasoning += `- 具体性评分: ${this.assessSpecificity(original)}/10\n\n`;
        reasoning += `应用的改进:\n`;
        improvements.forEach((improvement, index) => {
            reasoning += `${index + 1}. ${improvement}\n`;
        });
        reasoning += `\n结果: 增强了提示词的结构、清晰度和可执行性。`;
        return reasoning;
    }
}
/**
 * MCP 工具定义
 * 这定义了 optimize_prompt 工具的模式和元数据
 * 展示的关键 MCP 概念:
 * - 工具名称和描述，供 AI 模型理解
 * - 用于输入验证的 JSON Schema
 * - 必需参数与可选参数
 */
const OPTIMIZE_PROMPT_TOOL = {
    name: "optimize_prompt",
    description: "优化和增强提示词以获得更好的 AI 交互效果。此工具分析提示词并应用各种优化策略来改善清晰度、具体性、结构和有效性。",
    inputSchema: {
        type: "object",
        properties: {
            originalPrompt: {
                type: "string",
                description: "要优化的原始提示词"
            },
            context: {
                type: "string",
                description: "优化过程中要考虑的额外上下文或背景信息"
            },
            targetAudience: {
                type: "string",
                description: "提示词的目标受众 (例如: '技术专家', '普通用户', '学生')"
            },
            optimizationGoals: {
                type: "array",
                items: {
                    type: "string",
                    enum: ["clarity", "specificity", "structure", "context", "actionable", "conciseness", "examples", "format"]
                },
                description: "要专注的具体优化目标。可用选项: clarity(清晰度), specificity(具体性), structure(结构), context(上下文), actionable(可执行性), conciseness(简洁性), examples(示例), format(格式)"
            },
            style: {
                type: "string",
                description: "优化后提示词的期望风格 (例如: 'formal(正式)', 'casual(随意)', 'technical(技术性)', 'creative(创意性)')"
            }
        },
        required: ["originalPrompt"]
    }
};
/**
 * MCP 服务器设置
 * 这展示了核心的 MCP 服务器架构:
 * 1. 带有元数据的服务器实例
 * 2. 能力声明
 * 3. 不同 MCP 操作的请求处理器
 */
const server = new Server({
    name: "prompt-optimizer-server",
    version: "0.1.0",
}, {
    capabilities: {
        tools: {}, // 表示此服务器提供工具
    },
});
// 创建提示词优化器实例
const promptOptimizer = new PromptOptimizer();
/**
 * 列出工具处理器
 * MCP 服务器必须实现此功能来告诉客户端有哪些工具可用
 */
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [OPTIMIZE_PROMPT_TOOL],
}));
/**
 * 调用工具处理器
 * 这处理来自 MCP 客户端的实际工具执行请求
 * 展示错误处理和响应格式化
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "optimize_prompt") {
        try {
            const args = request.params.arguments;
            if (!args || typeof args !== 'object' || !('originalPrompt' in args)) {
                throw new Error('缺少必需参数: originalPrompt');
            }
            const optimizationRequest = {
                originalPrompt: args.originalPrompt,
                context: args.context,
                targetAudience: args.targetAudience,
                optimizationGoals: args.optimizationGoals,
                style: args.style,
            };
            const result = await promptOptimizer.optimizePrompt(optimizationRequest);
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify(result, null, 2)
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: "text",
                        text: `优化提示词时出错: ${error instanceof Error ? error.message : String(error)}`
                    }],
                isError: true
            };
        }
    }
    return {
        content: [{
                type: "text",
                text: `未知工具: ${request.params.name}`
            }],
        isError: true
    };
});
/**
 * 服务器启动
 * 这展示了使用 stdio 进行 CLI 使用的 MCP 传输设置
 * 服务器通过 stdin/stdout 通信，使其与各种 MCP 客户端兼容，
 * 包括 Claude Desktop 和 Cursor
 */
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("提示词优化 MCP 服务器正在 stdio 上运行");
}
// 启动服务器
runServer().catch((error) => {
    console.error("运行服务器时发生致命错误:", error);
    process.exit(1);
});
