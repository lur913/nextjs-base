# Nextjs Base
这是一个基于 Next.js v15 的基础项目模板创建的练习项目。

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

## integrate shadcn/ui
这个分支主要练习 shadcn/ui 的使用。
首先是集成 shadcn:
```
pnpm dlx shadcn@latest init
```
安装 button 组件测试一下：
```
pnpm dlx shadcn@latest add button
```
优化：每次安装执行上面的命令太长了，在 package.json 中添加一个 script 字段：
```json
{
  "scripts": {
    ...
    "sc": "pnpm dlx shadcn@latest add"
  }
}
```
然后执行：
```
yarn sc -- button

# 等效于
pnpm dlx shadcn@latest add button
```

## 说明
- `drawer` 要实现 https://vaul.emilkowal.ski/ 这种效果，在父容器中添加 `data-vaul-drawer-wrapper` 属性
并在 drawer 元素上添加 `shouldScaleBackground` 属性, 就可以实现了