import Layout from '../../components/MyLayout';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';

export const Movie = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading</div>
    }
    return(
        <Layout pageTitle="Movie">
            <h1>{props.movie_title}</h1>
            <p>{props.movie_description}</p>
            <footer className="mt-5">
                <p className="small font-italic">This page was generated with the help of The Movie DB.</p>
                <img width="200px" src="../../tmdb.svg"/>
            </footer>
        </Layout>
    );
}

const getSlug = (string) => {
    const value = string.toLowerCase();
    const pattern = /(\W)+/g;
    return(value.replace(pattern, '-'));
}

export const getStaticProps = async (context) => {
    const { slug } = context.params;
    const res = await fetch('https://api.themoviedb.org/3/movie/' + slug + '?api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=1');
    const movie = await res.json();
   
    return {
        props: {
            movie_title: movie.title, 
            movie_description: movie.overview
        }
    }
};

export const getStaticPaths = async() => {
    // How many posts should we preload?
    const maxPosts = 2;

    // Using node-fetch let's pre-render the first 5 pages/paths
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=1')
    const moviesRaw = await res.json();
    const movies = moviesRaw.results.slice(0,maxPosts);

    const moviePaths = movies.map(movie => ({
        params: {
            slug: movie.id.toString()
        }
    }));

    return {
        paths: moviePaths,
        fallback: true
    }
}

export default Movie;