import Layout from '../components/MyLayout';
import Link from 'next/link';

export const Portfolio = (props) =>
   <Layout pageTitle="Portfolio">
       <h1 className="h3 primary-text">Portfolio</h1>
       <p className="lead">Showcasing anything I've worked on, big or small.</p>
       <ul>
            <li key="slug">
                <Link href="/slug">
                    <a>Slugify</a>
                </Link>
                <p className="small">While it is nothing complex, this little tool takes a string, and in real-time turns it into a usable slug path.</p>                
            </li>
       </ul>
   </Layout>


export const getStaticProps = () => {
    return {
        props: {}
    }
}

export default Portfolio;