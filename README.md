
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

- 尝试了动态导入 `src\app\blog\[slug]\page.tsx`;
> 只是尝试了文档中的示例，但是这个示例还有些缺陷，使用
> `generateStaticParams` 生成 Params 时，不是动态的，而是
> 写死的，不像 astro 框架那样，只需要配置即可。后面应该有类似的
> 解决方案；

- 在 `src\mdx-components.tsx` 文件中尝试了 mdx 的全局样式和组件；这个样式将影响应用中的所有 mdx 文件；

- 在 `src\app\import\page.tsx` 文件中尝试 mdx 文件的局部样式；

- 尝试共享局部 `src\app\mdx\layout.tsx` , 确实生效
- 尝试共享布局和 `@tailwindcss/typography` 插件一起使用；
