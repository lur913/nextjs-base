// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"test.mdx": () => import("../content/docs/test.mdx?collection=docs"), "ui/page-info.mdx": () => import("../content/docs/ui/page-info.mdx?collection=docs"), "ui/ui-index.mdx": () => import("../content/docs/ui/ui-index.mdx?collection=docs"), }),
};
export default browserCollections;