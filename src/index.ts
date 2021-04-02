import fs from 'fs';
import http from 'http';
import url from 'url';
import { config } from 'dotenv';
import { join } from 'path';
import { IncomingMessage, ServerResponse } from 'http';

config({path:join(__dirname,'../.env')});

const httpServer = http.createServer((req: IncomingMessage,res: ServerResponse) => {
    
    const query = url.parse(req.url!,true).query;

    switch(query.file){
        case undefined:
            const headerCase = {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,OPTIONS',
            'Access-Control-Max-Age': 2592000,
            'Content-disposition':'attachment; filename=weex.xlsx',
            'Content-type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };
        if(req.method === 'OPTIONS'){
            res.writeHead(204,headerCase);
            res.end();
            return;
        };
            res.writeHead(200,headerCase);
            res.end('NOME_COMPLETO,EMAIL,PASSWORD,DATA_NASCIMENTO,EMPRESA,CARGO,ENDERECO,NUMERO,COMPLEMENTO,CEP,BAIRRO,CIDADE,ESTADO,SEXO');
            break;
        default:
            case undefined:
            const headerDef = {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,OPTIONS',
            'Access-Control-Max-Age': 2592000,
            'Content-disposition':'attachment; filename=weex.xlsx',
            'Content-type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };
        if(req.method === 'OPTIONS'){
            res.writeHead(204,headerDef);
            res.end();
            return;
        };
            const fileData = fs.readFileSync(join(__dirname,`../files/${query.file}`));
                if(fileData){
                    res.writeHead(200,headerDef);
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
    !err ? console.log(`Server Listening on ${process.env.HTTP_PORT}`) : console.error(err);
};

httpServer.listen(process.env.HTTP_PORT,serverCallback);
