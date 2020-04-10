import fs from 'fs';
import matter from 'gray-matter';
import {join} from 'path';


const postsDirectory = join(process.cwd(), "posts");

export const getBlogSlugs = async () => {

    const util = require('util');
    const readFile = util.promisify(fs.readFile);
    const readDir = util.promisify(fs.readdir);
    const files = (await readDir("posts")).filter(filename => filename.split(".").pop() == "md");

    const sorted_files = files.sort((filename1, filename2) => {
        
        const file1Contents = fs.readFileSync(join(postsDirectory, filename1));
        const file2Contents = fs.readFileSync(join(postsDirectory, filename2));
        const file1Data = matter(file1Contents).data;
        const file2Data = matter(file2Contents).data;
                
        const date1 = file1Data.date;
        const date2 = file2Data.date;
       
        return date2 - date1;
       
       
    })
    
    .map(filename => getSlugFromFileName(filename));
    return  sorted_files;
}

export const getSlugFromFileName= (filename) => {
    return filename.split(".").slice(0, -1).join(".");
}

export const getFriendlyDate = (date_str) => {
    const date = new Date(date_str);
    const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}