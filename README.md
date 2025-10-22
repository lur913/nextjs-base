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

## Fetching Data
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
开始操作 - 安装依赖
```
pnpm add drizzle-orm @neondatabase/serverless

pnpm add -D drizzle-kit
```
OK! 练习结果：
```
src\app\server-orm\page.tsx
```

2. 测试在客户端组件中请求数据的两种方法
- 使用 react 的 `use` hook
测试方法：
从 server 组件获取数据；
然后将 promise 作为 prop 传递给 client 组件

使用数据接口实现：
```
src\app\api\data\route.ts
```
练习结果路径：
```
src\app\client-use\page.tsx
```
这个示例其实还测试 suspense 流式传输的知识点

- 使用社区库如 swr 或 react query 在客户端获取数据，这里演示 swr 的用法
这些库有自己的换成和流式传输机制
测试方法：
先安装 swr 这个库
```
pnpm add swr
```
测试结果：
```
src/app/client-swr/page.tsx
```
感悟：
第一次使用 swr 这种库，感觉还是很神奇，
感觉这个 fetcher 的包装还是很重要
尝试阅读一下文档，看看能不能熟练的掌握
还有就是书写接口的时候，还不能熟练的获取路由和查询参数
不会熟练的进行ts类型转化
> 大致浏览勒一遍 swr 的文档，使用简单，但是用好，还有点难度

## Updating Data
这里主要讲勒 - 服务器函数
server actions - 服务器函数在一个 action 或 mutation 上下文中的别称；

测试方法：
 - 先建一个服务器组件 login；
 - 在服务器组件内部定义 server actions；
 - 在该组件中的form调用 server actions；
 - 再将该 server actions 分离到单独的文件中；
 - 再将该 form 分离到一个客户端组件中；
 - 客户端组件中调用该 server action;
 - 再使用 useFormStatus 和 useActionState 进行状态管理；

测试结果：
```
src\app\login\page.tsx
src\app\login-client\page.tsx
src\app\login-state\page.tsx
src\app\login-status\page.tsx
```
感悟：
使用 useActionState 进行状态管理，在 server actions 中做校验，
如果前端不做校验仅依靠后端，那么可能会变相的增加后端的压力样；
