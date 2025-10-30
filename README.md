
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todos
- 集成 mdx 项目配置
- 修改 `next.config.js` 配置
- 添加 `src\mdx-components.tsx` 文件，自定义 mdx 组件

### 渲染 md/mdx 的几种方式
- 基于 md/mdx 文件作为页面路由（page.md/page.mdx）
- 将 md/mdx 文件作为组件，在其他地方导入使用