import { NextRequest } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

// ① 本地支持的语种
const locales = ['en', 'zh-CN', 'fr'] as const;
// type Locale = typeof locales[number];

export async function GET(request: NextRequest) {
  // ② 把请求头变成 negotiator 对象
  const headersObj = Object.fromEntries(request.headers.entries());
  const negotiator = new Negotiator({ headers: headersObj });

  // ③ 拿到浏览器按权重排好序的语言列表
  const preferredLanguages = negotiator.languages() || []; // 例: ['zh-HK', 'zh', 'en-US', 'en']
  console.log(111, preferredLanguages);

  // ④ 让 intl-localematcher 挑一个最优质的
  const locale = match(preferredLanguages, locales, 'en'); // 兜底 en
  // match 可以设置有个 兜底的语言，这个是比较好的。一半可以将默认语言搞成这个。

  // ⑤ 后续想干嘛就干嘛：重定向、返回资源、写 cookie……
  return Response.json({ locale });
}