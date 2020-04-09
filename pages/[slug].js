import Layout from '../components/MyLayout';
import Link from 'next/link';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { getBlogSlugs, getFriendlyDate } from '../utils/Blog';
import fs from 'fs';
<<<<<<< HEAD
const var_dump = require('var_dump');

const util = require('util');
const readFile = util.promisify(fs.readFile);
=======

const var_dump = require('var_dump')

>>>>>>> redo-post-load

const Post = ({frontmatter, content}) => {
    console.log(typeof frontmatter.date);
    return (
    <Layout pageTitle={frontmatter.title}>
        <Link href="/blog">
            <a>&larr; Back to blog</a>
        </Link>
        <h1 className="text-center ">{frontmatter.title}</h1>
        <p className="font-italic small">
            {getFriendlyDate(frontmatter.date)}
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
    
    // Let's make sure all of the frontmatter keys are strings
    const frontmatter = {};
    Object.keys(data).forEach(e => frontmatter[e] = data[e].toString());
   
    return {
        props: {
            frontmatter: frontmatter,
            content: marked(content), 
        }
    };
};

export default Post;