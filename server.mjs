import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(fileURLToPath(new URL('./public/',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2','.woff':'font/woff'};
const rateWindows=new Map();
const RPC_METHODS=new Set(['getGenesisHash','getBalance','getLatestBlockhash','getFeeForMessage','sendTransaction','getTransaction','getSignatureStatuses','getBlockHeight']);
const server=http.createServer(async(req,res)=>{
  if(req.url==='/api/devnet'){
    if(req.method!=='POST'){res.writeHead(405);return res.end();}
    if(req.headers.origin&&req.headers.origin!==`http://${req.headers.host}`&&req.headers.origin!==`https://${req.headers.host}`){res.writeHead(403);return res.end('Origin denied');}
    const ip=req.socket.remoteAddress;const now=Date.now();const rate=rateWindows.get(ip)||{at:now,count:0};if(now-rate.at>60000){rate.at=now;rate.count=0;}rate.count++;rateWindows.set(ip,rate);
    if(rateWindows.size>1000)for(const [key,value] of rateWindows)if(now-value.at>60000)rateWindows.delete(key);
    if(rate.count>80){res.writeHead(429);return res.end('Please wait before checking devnet again');}
    try{
      let body='';for await(const chunk of req){body+=chunk;if(body.length>12000){res.writeHead(413);return res.end('Request too large');}}
      const request=JSON.parse(body);if(Array.isArray(request)||request.jsonrpc!=='2.0'||!RPC_METHODS.has(request.method)){res.writeHead(400);return res.end('Unsupported devnet request');}
      const upstream=await fetch('https://api.devnet.solana.com',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(request),signal:AbortSignal.timeout(12000)});
      const result=await upstream.text();res.writeHead(upstream.status,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(result);
    }catch{res.writeHead(502,{'Content-Type':'application/json'});return res.end(JSON.stringify({jsonrpc:'2.0',id:null,error:{code:-32000,message:'Devnet unavailable. No confirmation obtained.'}}));}
  }
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end();}
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end('Bad request');}
  if(pathname==='/health'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(JSON.stringify({status:'ok'}));}
  const routes={'/':'/landing.html','/scout':'/scout.html','/evidence':'/index.html','/track':'/track.html'};
  const file=path.resolve(root,'.'+(routes[pathname]||pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
  try{
    const data=await readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(Number(process.env.PORT||4173),process.env.HOST||'127.0.0.1',()=>console.log(`CSIN preview: http://${process.env.HOST||'127.0.0.1'}:${process.env.PORT||4173}`));
