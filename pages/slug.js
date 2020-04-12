import Layout from '../components/MyLayout';
import {useState} from 'react';

export const Slug = (props) => {

    const [slug, setSlug] = useState("");

    const handleChange = (event) => {
        const value = event.target.value.toLowerCase();
        const pattern = /(\W)+/g;
        setSlug(value.replace(pattern, "-"));
    }

    return (
        <Layout pageTitle="Slugpro">
            <h1>Slug me</h1>
            <p>Just start typing...</p>
            <div>
                <input type="text" className="slug-field" onChange={handleChange} placeholder="My Checklist: A guide to not losing your marbles"/>
            </div>
            <div className="mt-2">
                <input type="text" className="slug-field" value={slug} disabled placeholder="my-checklist-a-guide-to-not-losing-your-marbles"/>
            </div>
            <small>^ Triple click to select all</small>
            <div className="mt-5">
                <small>Nick (April, 2020): <br/> There's plenty of these online, I know. This is just me experimenting with React's useState and also some regex: two things I'm brushing up on! </small>
            </div>
        </Layout>
    );
}

export default Slug;