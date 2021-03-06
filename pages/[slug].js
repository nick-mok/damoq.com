import Layout from '../components/MyLayout';
import PostDate from '../components/PostDate'
import Link from 'next/link';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { getBlogSlugs } from '../utils/Blog';
import fs from 'fs';

const var_dump = require('var_dump')

const Post = ({frontmatter, content}) => {
    return (
    <Layout pageTitle={frontmatter.title}>
        <Link href="/blog">
            <a>&larr; Back to blog</a>
        </Link>
        <h1 className="text-center ">{frontmatter.title}</h1>
        <p className="font-italic small">
            <PostDate dateString={frontmatter.date}/>
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
    const file_contents = fs.readFileSync(path.join('posts', slug + '.md'), 'utf8');
    const { data, content } = matter(file_contents);
    
    const frontmatter = {};
    Object.keys(data).forEach(e => {
        if (data[e] instanceof Date) return frontmatter[e] = data[e].toISOString();
        return frontmatter[e] = data[e];
    });

   
    return {
        props: {
            frontmatter: frontmatter,
            content: marked(content), 
        }
    };
};

export default Post;