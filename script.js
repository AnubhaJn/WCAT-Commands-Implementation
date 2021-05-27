#!/usr/bin/env node


const fs = require("fs");

//fs.writeFileSync("abc.txt","i am cute too ");

//let data = fs.readFileSync("abc.txt","utf-8");
//console.log(data);

//console.log(fs.existsSync("abc.txt"));

//console.log(process.argv);

let arguments = process.argv.slice(2);
//console.log(arguments);

//-------read data from a file-----
//function wcat(arguments){
    //let data = fs.readFileSync(arguments[0],"utf-8");
    //console.log(data);
//}

//------ read data from two files and combine it-------
function wcat(arguments){

    //------filters the argruments with "-" and makes an array -----
    let options = arguments.filter(function(data,index){
        return data.startsWith("-");
    });

    //------filters the argruments without "-" and makes an array -----
    let files = arguments.filter(function(data,index){
        return !data.startsWith("-");
    });

    //------if file length is zero then throw message-----
    if(files.length == 0){
        console.log("Please specify a file name.");
        return ;
    }

    //------it checks if given file exists or not------
    for (let i = 0; i < files.length ; i++){
       if(!fs.existsSync(files[i])){
           console.log(files[i] + " does not exists");
           return ;
       } 
    }

    //
    let numbering = 1;
    for(let  i = 0 ; i < files.length ; i++){
    let data = fs.readFileSync( files[i],"utf-8"); // it reads the files array one by one and data from each file is stored 
     if(options.includes("-s") && !options.includes("-w")){  // "includes" method returns true or false if options array includes "-s"
        let lines = data.split("\r\n");   // it splits the data on the basis what is written in () and converts into array, here it is \r\n 
        for(let j = 0; j < lines.length ; j++){
            if(lines[j] != ""){
                if(options.includes("-n") || options.includes("-b") ){
                    console.log(numbering + ". " +lines[j]);
                    numbering += 1;
                }else {
                    console.log(lines[j]);
                }
            }
        }
     } else if ((options.includes("-n") && !options.includes("-b")) || (options.includes("-n") && options.includes("-b") && options.indexOf("-n") < options.indexOf("-b"))){
        let lines = data.split("\r\n"); 
        for(let j = 0; j < lines.length ; j++){
            console.log(numbering + ". " + lines[j]);
            numbering += 1;
        }
    }else if(options.includes("-b")) {
        let lines = data.split("\r\n"); 
        for(let j = 0; j < lines.length ; j++){
            if(lines[j] != ""){
                console.log(numbering + ". " + lines[j]);
                numbering += 1;
            } else {
                console.log(lines[j]);
            }   
        }
    }else if(options.includes("-w") && !options.includes("-s")){
        if(files.length != 2 || arguments.indexOf("-w") != 1){
            console.log("unable to run this command");
            return ;
        }
        let data = fs.readFileSync(files[0],"utf-8");
        fs.writeFileSync(files[1], data)

    } else if (options.includes("-a")){
        if(files.length != 2 ){
            console.log("unable to run this command");
            return ;
        }
        let data1 = fs.readFileSync(files[0],"utf-8");
        let data2 = fs.readFileSync(files[1],"utf-8");
        fs.writeFileSync(files[1], data2 + data1);
        return ;

    }else if(options.includes("-w") && options.includes("-s")){
        if(files.length != 2 ){
            console.log("unable to run this command");
            return ;
        }
        let data = fs.readFileSync(files[0],"utf-8");
        let lines = data.split("\r\n"); 
         //console.log(lines);
        for(let j = 0; j < lines.length ; j++){
            if(lines[j] != ""){
                var actualdata = lines[j];
                let data2 = fs.readFileSync(files[1],"utf-8");
                fs.writeFileSync(files[1], data2  + actualdata +"\n");
            }
        }
        return;
    }else {
        console.log(data);
    }
  }
}


wcat(arguments);