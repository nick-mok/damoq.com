---
title: Notes on NextJS
date: 2020-04-13T20:41:22.905Z
---
Recently I've been learning a bit of NextJS as I've been super interested in JAMStack development and wanting to generally upskill in React and stuff. 

Of course, with any new framework, not everything that is relevant to you or your project is going to be there. But I've found a few questions which probably could have been addressed/avoided. 

This is an example: 

> [https://github.com/zeit/next.js/issues/9520 ](https://github.com/zeit/next.js/issues/9520)

One user has reported an issue where they are not able to access a created api route after the Next app is deployed to Netlify (Static Site hosting with serverless functions), but  it was working for the user locally as it was a local server.

One of the developers of Next did quickly respond to the issue that API routes can't be used in an environment that relies on the output of `next export`. 

This is the kind of stuff that I run into and can definitely halt my workflow, the can or can't I's aren't 100% confirmed when picking up a framework. But I guess you can't learn without testing... And that's what I'm going to be doing today. 

I've created this blog in NextJS and I'm wanting to test `getStaticPaths` with `fallback`  set to `true` and the behaviour when a path (which is not already built) is accessed. 

As per the below article and documentation

> https://nextjs.org/docs/basic-features/data-fetching 
>
> **Under the section \`fallback: true\`**

The way I see it, it's used in order to keep your build time fast. You might have a shop with thousands of products, and it wouldn't make sense to statically build all of them, just a handful and to serve the others  dynamically at runtime. With fallback: true, this allows you to 'apparently' generate any additional pages... an excerpt of how they explained it:

> ... you may statically generate a small subset of pages and use fallback: true for the rest. When someone requests a page that’s not generated yet, the user will see the page with a loading indicator. Shortly after, getStaticProps finishes and the page will be rendered with the requested data. From now on, everyone who requests the same page will get the statically pre-rendered page.

This sounds neat. I want to test this feature as I haven't yet, and while I'm there: whether or not it's going to build these additional pages on a static server. Perhaps the answer is:

> No, it's a server side thing

They do state:

> In the background, Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.

And if it needs to run NextJS in the background... might not be possible in a static environment, but I can't be sure. There isn't much information around when or how this gets called. 

Let's see how I go!

\--- **UPDATE: 1PM** ---

I managed to test this one, and can confirm that fallback: true doesn't apply when your server can only statically generate pages. 

I created a movies single and l[isting page](https://www.damoq.com/movies) where I use TMDB to pull movies and use their id's as slugs. 

I only returned two paths to be built in getStaticPaths:

```
export const getStaticPaths = async() => {
```

```
    // How many posts should we preload?
```

```
    const maxPosts = 2;
```

```
    // Using node-fetch let's pre-render the first 5 pages/paths
```

```
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=1')
```

```
    const moviesRaw = await res.json();
```

```
    const movies = moviesRaw.results.slice(0,maxPosts);
```

```
    const moviePaths = movies.map(movie => ({
```

```
        params: {
```

```
            slug: movie.id.toString()
```

```
        }
```

```
    }));
```

```
    return {
```

```
        paths: moviePaths,
```

```
        fallback: true
```

```
    }
```

```
}
```

And as you can see, fallback true is set. 

In my getStaticProps I receive this slug and load the individual movie content. When I was setting this up, and before I had setup any fetch requests, I put a console.log() in here. And while running the development server, noticed it got called twice. This is expected and also outlined in the document. 

Early on this told me that any additional pages requiring loading wouldn't occur on a static site host like Netlify (which is what I am using). 

After building and deploying if you click on the third item at /movies it will generate a 404. As per the build log below. It shows under /movies/\[slug] that only the first two have been generated.

![Build log](/uploads/build-log.png)

I'm guessing this does get run on the server side? I am yet to test this, I tried running npm start however I'm currently facing a little error at the moment.

It works fine in my development server, but that will call getStaticProps on every single request, so it would be a far better test when NextJS is running in production. 

I'll try this in a few hours.
