import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
await mkdir('public/landing',{recursive:true});
execFileSync('../node_modules/.bin/tailwindcss',['-c','tailwind.config.ts','-i','src/input.css','-o','../public/landing/utilities.css','--minify'],{cwd:'landing',stdio:'inherit'});
await build({entryPoints:['landing/src/main.tsx'],bundle:true,minify:true,format:'esm',outfile:'public/landing/app.js',jsx:'automatic',tsconfig:'landing/tsconfig.json',loader:{'.woff2':'file','.woff':'file'},assetNames:'fonts/[name]-[hash]'});
const css=await Promise.all(['public/landing/utilities.css','landing/src/style-pack.css','landing/src/base.css','public/landing/app.css','landing/src/csin.css'].map(p=>readFile(p,'utf8')));
await writeFile('public/landing/landing.css',css.join('\n'));
await writeFile('public/landing.html','<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="CSIN: discover Canadian nonprofits, assess evidence and make human-led funding decisions. Fictional hackathon demonstration."><title>CSIN · Corporate Social Intelligence Network</title><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/landing/landing.css"></head><body><div id="root"></div><noscript>CSIN connects evidence with human funding decisions. <a href="/scout">Open Scout</a>. JavaScript is needed for interactive scouting.</noscript><script type="module" src="/landing/app.js"></script></body></html>');
