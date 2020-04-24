import Link from 'next/link';
import Layout from '../components/MyLayout';
import fetch from 'node-fetch'; // Use this to, at build time generate our blog post listing
import fs from 'fs';

const HomeContent = (props) => (
  <>
    <h1 className="h3 primary-text">Home of Nick</h1>
    <p>This is a little space for me to quickly add Blog or Portfolio posts about any tech I am working on!</p>
    <p>This website is a statically generated site, created using React, <a href="https://www.nextjs.org" target="_blank">NextJS</a> and <a href="https://www.netlify.com/" target="_blank">Netlify</a> for continuous deployment.</p>
    <p>The code for this site is publicly available via <a href="https://github.com/nick-mok/damoq.com" target="_blank">GitHub</a></p>  
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
