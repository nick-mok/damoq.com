import Link from 'next/link';
import Layout from '../components/MyLayout';
import fetch from 'node-fetch'; // Use this to, at build time generate our blog post listing
import fs from 'fs';

const HomeContent = (props) => (
  <>
    <h1 className="h3 primary-text">Hello there, I'm Nick!</h1>
    <p>Nothing in this space yet, maybe check out my blog!</p>
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
