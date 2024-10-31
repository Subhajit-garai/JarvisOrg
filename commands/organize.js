let fs = require("fs");
const { type } = require("os");
let path = require("path");
const utility = require("./utility");

function organizeFn(dirPath) {
    // console.log("organize");
    //1. input --> directory path given
    
    let destPath;

    if (dirPath == undefined) {
        dirPath= process.cwd();
        destPath= process.cwd();
        destPath = path.join(destPath, "organized_file")
        console.log("----------------------------------"+destPath)
        if (fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath);
            console.log("directory  created");
        }

        // return;
    }
    else {
        let doseExist = fs.existsSync(dirPath);
        if (doseExist) {
            //2. create--> organized_files-->directry
            destPath = path.join(dirPath, "organized_file")
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
                console.log("directory  created");
            }
        }
        else {
            console.log("kindly enter path");
            return;
        }
    }
    
    //3. identify categories of all the files present in that input irectory -->
    organizeHelper(dirPath, destPath);

    //4. copy/cut --> files to organized directory inside of any of catogory foloder
}
function organizeHelper(src, dest) {
    
    //3. identify categories of all the files present in that input irectory -->
    // get files
   
    let childNames = fs.readdirSync(src);
    console.log("say hello-----------------------------------------------");
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isfile = fs.lstatSync(childAddress).isFile();
        if (isfile) {
               console.log(childNames[i]); //successs this point
            let catogory = getCategory(childNames[i]);
            console.log(childNames[i], "beling to -->", catogory);
            //4. copy/cut --> files to organized directory inside of any of catogory foloder

            sendFiles(childAddress, dest, catogory);
        }
    }

}

function sendFiles(srcfilePath, dest, category) {
    let catagortPath = path.join(dest, category);
    if (fs.existsSync(catagortPath) == false) {
        fs.mkdirSync(catagortPath);
    }
    let fileName = path.basename(srcfilePath);
    let destFilePath = path.join(catagortPath, fileName);
    fs.copyFileSync(srcfilePath, destFilePath);
    fs.unlinkSync(srcfilePath);
    console.log(fileName, "copid to", category);
}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (  let type in utility.types ) {
        let ctypeArry = utility.types[type];
        for (let i = 0; i < ctypeArry.length; i++) {
            if (ext == ctypeArry[i]) {
                return type;
            }
        }
    }
    return "others";
}

module.exports={
    organizekey:organizeFn
}

