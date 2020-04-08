import fs from 'fs';

export const getBlogSlugs = async () => {

    const util = require('util');
    const readFile = util.promisify(fs.readFile);
    const readDir = util.promisify(fs.readdir);
    const files = await readDir("posts");
    return files
    .filter(filename => filename.split(".").pop() == "md")
    .map(filename => filename.split(".").slice(0, -1).join("."));
}

export const getFriendlyDate = (date_str) => {
    const date = new Date(date_str);
    const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}


export const testFunction = () => {
    return true;
}