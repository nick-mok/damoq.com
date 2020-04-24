import Link from 'next/link';
import Layout from '../components/MyLayout';
import fetch from 'node-fetch'; // Use this to, at build time generate our blog post listing
import fs from 'fs';

const HomeContent = (props) => (
  <>
    <h1 className="h3 primary-text">Home of Nick</h1>
    <p>This is a little space for me to quickly add Blog or Portfolio posts about any tech I am working on!</p>
    <p>This website is a statically generated site, created using React, <Link href="https://www.nextjs.org"><a>NextJS</a></Link> and <Link href="https://www.netlify.com/">Netlify</Link> for continuous deployment.</p>
    <p>The code for this site is publicly available via <Link href="https://github.com/nick-mok/damoq.com"><a>GitHub</a></Link></p>  
  </>
);

const Home = (props) => (
  <Layout pageTitle="Home">
    <HomeContent posts={props.posts}/>
  </Layout>
)

export async function getStaticProps(context) {
  const files = fs.readdirSync("posts");
  
  return  {
    props: {
      posts: files.map(filename => filename.replace(".md", ""))
    }, // Will be passed to the page components as props
  }
}

export default Home;
