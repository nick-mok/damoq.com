import Layout from "../components/MyLayout";
import fetch from "node-fetch";
import Link from "next/link";

export const Movies = ({movies}) => {
    return(
        <Layout pageTitle="Movie listing">
            <h1>Movie List.</h1>
            <p>A list of movies, the first 2 are pre-rendered. Let's see what happens when you click one that isn't!</p>
            {movies && 
                <ul>
                    { movies.map((movie) => 
                        <li key={movie.movie_id}>
                            <Link href={`/movies/${movie.movie_id}`}>
                                <a>{movie.movie_title}</a>
                            </Link>
                        </li>
                    )}
                </ul>
            }
         
        </Layout>
    )
}

export const getStaticProps = async (context) => {

    const maxMovies = 10; 

    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`)
    const moviesRaw = await res.json();
    
    const movies = moviesRaw.results.slice(0, maxMovies).map(movie => ({
        movie_id: movie.id,
        movie_title: movie.title
    }));
    return {
        props: {
            movies: movies
        }
    }
}

export default Movies;