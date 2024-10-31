let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
   
    if (dirPath == undefined) {
        treeHelper( process.cwd(), "");
        return;
    }
    else {
        let doseExist = fs.existsSync(dirPath);
        if (doseExist) {
            treeHelper(dirPath, "");
        }
    
         else {
        console.log("kindly enter the path")

    }
 }

}
function treeHelper(dirPath,indent){
    //is file of folder
     let isfile= fs.lstatSync(dirPath).isFile();
     if(isfile==true){
        let fileName =path.basename(dirPath);
        console.log(indent,"|--"+fileName);
     }
     else{
        let dirName= path.basename(dirPath)
        console.log(indent+"|__"+dirName);
        let children=fs.readdirSync(dirPath);
        for(let i=0;i<children.length;i++){
            let childPath=path.join(dirPath,children[i]);
            treeHelper(childPath,indent+"\t");
        }
     }
}
module.exports={
    treeKey:treeFn
}
