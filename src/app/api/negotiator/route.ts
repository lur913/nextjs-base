import Negotiator from 'negotiator';


export async function GET(req: Request) {
  const headers = Object.fromEntries(req.headers.entries())
  console.log(`headers: `, headers);
  const negotiator = new Negotiator({ headers });

  // 有效的语言
  const availableLang = ['en', 'zh-CN']
  // 返回最优的语言
  const lang = negotiator.language(availableLang)
  console.log(1111, lang);
  const body = lang === 'en' ? 'Hello World' : '你好，世界'

  return new Response(body)
}