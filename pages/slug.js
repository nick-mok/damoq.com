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
            <div>
                <input type="text" className="slug-field" onChange={handleChange} placeholder="Text you would like to turn into a slug"/>
            </div>
            <div className="mt-2">
                <input type="text" className="slug-field" value={slug} disabled/>
            </div>
            <small>^ Triple click to select all</small>
        </Layout>
    );
}

export default Slug;