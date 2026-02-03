# 每日微训练 - 社交能力提升网站

一个帮助用户提升社交能力的AI产品，通过每日5分钟碎片化练习，包含场景模拟、表达打磨和话题积累，逐步养成良好的表达习惯。

## 功能特点

### 📅 每日训练
- **场景模拟**: 提供社交场景描述，用户输入应对方案
- **表达打磨**: 优化生硬表达，提升表达质量
- **话题积累**: 学习热门话题，扩展话题库

### 📊 进步报告
- 自动生成每日进步报告
- 统计优化的表达数量和掌握的话题数量
- 展示历史训练数据和趋势

### 📝 错题本
- 记录常犯的冷场问题
- 按类型分类展示
- 针对性推送训练内容

## 技术栈

- **前端框架**: React + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **状态管理**: React Context API
- **本地存储**: localStorage
- **部署**: GitHub Pages

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

## 项目结构

```
Web02/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── DailyTraining/
│   │   │   ├── index.tsx
│   │   │   ├── ScenarioSimulation.tsx
│   │   │   ├── ExpressionPolish.tsx
│   │   │   └── TopicAccumulation.tsx
│   │   ├── ProgressReport/
│   │   │   └── index.tsx
│   │   ├── WrongQuestionBook/
│   │   │   └── index.tsx
│   │   └── common/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── contexts/
│   │   └── TrainingContext.tsx
│   ├── styles/
│   │   └── index.css
└── README.md
```

## 使用说明

1. **开始训练**: 点击「开始训练」标签，按照步骤完成每日的3个训练任务
2. **查看报告**: 训练完成后，点击「进步报告」标签查看你的训练成果和统计数据
3. **管理错题**: 点击「错题本」标签查看和管理你的错题记录

## 数据持久化

- 所有训练数据和错题记录都存储在浏览器的 localStorage 中
- 刷新页面后数据不会丢失
- 清除浏览器数据会导致训练记录丢失

## 部署说明

1. 确保你已经将项目上传到 GitHub 仓库
2. 运行 `npm run deploy` 命令自动构建并部署到 GitHub Pages
3. 部署完成后，你可以通过 `https://your-username.github.io/your-repo-name` 访问网站

## 开发计划

- [x] 基础功能实现
- [x] 响应式设计
- [x] 本地数据持久化
- [ ] AI 评估功能
- [ ] 更多训练场景和话题
- [ ] 用户账户系统

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 许可证

MIT License
