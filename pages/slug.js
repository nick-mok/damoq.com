import Layout from '../components/MyLayout';
import {useState} from 'react';

export const Slug = (props) => {

    const [slug, setSlug] = useState("");

    const handleChange = (event) => {
        
        
        setSlug(event.target.value);

    }

    return (
        <Layout pageTitle="Slugpro">
            <h1>Slug</h1>
            <div>
                <input type="text" className="slug-field" onChange={handleChange} placeholder="Text you would like to turn into a slug"/>
            </div>
            <div className="mt-2">
                <input type="text" className="slug-field" value={slug} disabled/>
            </div>
        </Layout>
    );
}

export default Slug;