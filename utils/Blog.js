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