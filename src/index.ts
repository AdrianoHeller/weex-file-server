import fs from 'fs';
import http, { IncomingMessage, Server, ServerResponse } from 'http';
import url from 'url';
import { config } from 'dotenv';
import { join } from 'path';

config({path:join(__dirname,'../.env')});

const httpServer: Server = http.createServer((req:IncomingMessage,res:ServerResponse) => {
    
    const query = url.parse(req.url!,true).query;

    switch(query.file){
        case undefined:
            res.setHeader('Content-disposition','attachment; filename=weex.xlsx');
            res.setHeader('Content-type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.end('Weex Input Model File.');
            break;
        default:
            const fileData = fs.readFileSync(join(__dirname,`../files/${query.file}`));
                if(fileData){
                    res.setHeader('Content-disposition','attachment; filename=weex.xlsx');
                    res.end(fileData);
                    break;    
                }else{
                    res.writeHead(400,{'Content-Type':'text/html'});
                    res.end('Não há arquivo disponível');
                    break;    
                }
    
    };

});

interface ICallbackProps{
    (err?:Error,res?:any):void,
};

const serverCallback:ICallbackProps = (err,res) => {
    !err ? console.log(`Server Listening on ${process.env.PORT}`) : console.error(err);
};

httpServer.listen(process.env.PORT,serverCallback);
