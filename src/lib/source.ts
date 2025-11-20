/**
 * 文档系统核心配置
 * 负责将MDX内容集合转换为fumadocs可用的文档源
 */
import { docs } from 'fumadocs-mdx:collections/server';
import { loader } from 'fumadocs-core/source';

/**
 * fumadocs文档源加载器
 *
 * 功能说明：
 * - 将content/docs/目录中的MDX文件转换为可导航的文档网站
 * - 设置文档的基础访问路径为/docs
 * - 为文档页面提供数据源，支持自动生成导航和内容索引
 *
 * 使用场景：
 * - 在文档页面组件中导入使用：import { source } from '@/lib/source'
 * - 获取文档列表：source.getPageTree()
 * - 获取单个文档：source.getPage(path)
 *
 */
export const source = loader({
  baseUrl: '/docs',              // 文档的基础URL路径，所有文档页面都会以此为前缀
  source: docs.toFumadocsSource(), // 将MDX集合转换为fumadocs文档源，自动处理content/docs/中的文件
});