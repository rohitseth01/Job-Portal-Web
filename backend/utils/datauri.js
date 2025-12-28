import DataUriParser from "datauri/parser.js"
import path from "path"

const getDataUri = (file) => {
    const parser = new DataUriParser();
    // Ensure the extension is properly stringified and includes the dot
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;