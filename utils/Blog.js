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

export const getFriendlyDate = (date) => {
    const my_date = new Date(date);
    const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return MONTHS[my_date.getMonth()] + " " + my_date.getDate() + ", " + my_date.getFullYear();
}