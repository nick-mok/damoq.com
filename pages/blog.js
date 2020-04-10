import Layout from '../components/MyLayout';
import Link from 'next/link';
import { getBlogSlugs } from '../utils/Blog';

const Blog = ({posts}) => (
    <Layout pageTitle="Blog">
        <BlogContent posts={posts}/>
    </Layout>
);

const BlogContent = ({posts}) => (
    <>
        <h1 className='h3 text-primary mb-4'>Blog</h1>
        { posts.length
        ? posts.map(post => <PostLink post={post}/>)
        : <p className="text-danger">There are no blogs</p>
    }
    </>
);

const PostLink =({post}) => (
    <li key={post} >
        <Link href={post}>
            <a>{post.charAt(0).toUpperCase() + post.slice(1)}</a>
        </Link>
    </li>
);

export async function getStaticProps(context) {
    const posts = await getBlogSlugs();
    
    return  {
      props: {
        posts: posts
      }, // Will be passed to the page components as props
    }
  }

export default Blog;