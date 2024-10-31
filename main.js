#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj= require("./commands/organize");
let utilityObj= require("./commands/utility");
// console.log(inputArr);

//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help 
let commmand = inputArr[0];

switch (commmand) {
    case "tree": treeObj.treeKey(inputArr[1]);
        break;
    case "org": organizeObj.organizekey(inputArr[1]);
        break;
    case "help":helpObj.helpKey();
        break;
    default: console.log("please input  courrectly");

}
