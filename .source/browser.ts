// @ts-nocheck
import { fromConfig } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = fromConfig<typeof Config>();
const browserCollections = {
  docs: create.doc("docs", {"test.mdx": () => import("../content/docs/test.mdx?collection=docs"), }),
};
export default browserCollections;