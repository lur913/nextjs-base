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

## Practice Content
使用 Negotiator 库来处理请求头。
跟进请求头的语言，返回相应的语言响应内容；
很有意思的用法，示例文件：
```
src\app\api\negotiator\route.ts
```

**结合使用 negotiator 和 @formatjs/intl-localematcher 的好处：** 
- negotiator —— 负责 “从 HTTP 头里把浏览器想要的语言数组按权重排好序”
- @formatjs/intl-localematcher —— 负责 “把浏览器想要的语言数组 和 我本地支持的语种数组 做一次最优质匹配”
- 两件事拆开做，代码会更短、更准，还能直接返回 BCP 47 语言标签（en-US、zh-CN…），方便扔进 next-i18n-router、next-intl 等生态库。

以上是不借助成熟的 i18n 库的手动配置；
下面使用比较主流的 i18n 库 `next-intl` 来实现自动配置,
首先安装依赖：
```
pnpm add next-intl
```




