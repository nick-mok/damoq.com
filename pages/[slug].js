import Layout from '../components/MyLayout';
import Link from 'next/link';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { getBlogSlugs } from '../utils/Blog';
import fs from 'fs';
const util = require('util');
const readFile = util.promisify(fs.readFile);

const Post = ({frontmatter, content}) => {
    return (
    <Layout pageTitle={frontmatter.title}>
        <Link href="/blog">
            <a>&larr; Back to blog</a>
        </Link>
        <h1 className="text-center ">{frontmatter.title}</h1>
        <p className="font-italic small">
            {frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{__html: content}}>
        </div>
    </Layout>
    );
}

//
export const getStaticPaths = async () => {

    const valid_slugs = await getBlogSlugs();
    const paths = valid_slugs.map(path => ({
        params: {
            slug: path
        }
    }))

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps = async (context) => {
    const {slug} = context.params;
    const markdownWithMetadata = await readFile(path.join('posts', slug + '.md'));
    const content =  markdownWithMetadata.toString();

    const parsedMarkdown = await matter(content);
    const articleHtml = await marked(parsedMarkdown.content);

    return {
        props: {
            frontmatter: parsedMarkdown.data,
            content: articleHtml, 
        }
    };
};

export default Post;