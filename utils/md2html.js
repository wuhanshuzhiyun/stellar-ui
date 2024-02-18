import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

const md = new MarkdownIt();

/**
 * @param {string} mdstr md的内容字符串
 * @return {HTMLAnchorElement}
 */
export default function (mdstr) {
    return md.render(mdstr);
}
