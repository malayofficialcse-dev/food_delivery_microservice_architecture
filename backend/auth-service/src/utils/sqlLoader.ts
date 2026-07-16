// import fs from "fs";
// import path from "path";

// export const loadSQL = (relativePath: string): string => {

//     const absolutePath = path.join(__dirname, "../sql", relativePath);

//     return fs.readFileSync(absolutePath, "utf8");

// };

import fs from "fs";
import path from "path";

export const loadSQL = (file: string): string => {

    const filePath = path.join(
        __dirname,
        "../sql",
        file
    );

    return fs.readFileSync(filePath, "utf8");
};