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

## 练习内容
1. 先测试服务器组件获取数据的两种方式
- 使用 fetch api
使用 api 接口：
```
https://jsonplaceholder.typicode.com/users
```
练习结果路径：
```
src\app\server-fetch\page.tsx
```

- 使用 ORM 和 数据库
准备事项：
 - 集成 drizzle 和 neon 数据库
开始操作