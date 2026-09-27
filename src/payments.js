import {Connection,PublicKey,SystemProgram,Transaction} from '@solana/web3.js';
import bs58 from 'bs58';
import {organizations,initialState,findingsFor} from '../public/data.js';
import {readGrants,writeGrant,canAuthorize,verifyTransfer} from '../public/grants.js';
const $=s=>document.querySelector(s);
const org=organizations.find(o=>o.id===new URLSearchParams(location.search).get('org'))||organizations[0];
const connection=new Connection(location.origin+'/api/devnet',{commitment:'confirmed',disableRetryOnRateLimit:true});
const EXPECTED_GENESIS='EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG';
const DEMO_WALLET='8NUk7s1ELyzVGN6mCkfx8vMNi8tmaRWum7L88mkwYhdC';
let provider,publicKey,busy=false;
function record(){try{return (JSON.parse(localStorage.getItem('csin-demo-canada-v1')||localStorage.getItem('bcf-demo-canada-v2'))||initialState()).records[org.id];}catch{return initialState().records[org.id];}}
function eligible(){const r=record();return canAuthorize(findingsFor(org,r),r);}
function message(t){$('#payment-message').textContent=t;}
function render(){const g=readGrants()[org.id];$('#organization').textContent=org.name;$('#request').textContent=`CAD ${org.request.toLocaleString()} fictional request — no CAD disbursement`;
 $('#review-link').href=`/evidence?org=${org.id}`;$('#review-status').textContent=eligible()?'All current findings have a human review. Explicit payment authorization is still required.':'Review every current finding before authorizing. Pending or flagged findings block the test transfer.';
 $('#pay').disabled=busy||!publicKey||!eligible()||!$('#authorization').checked||Boolean(g?.signature);
 $('#recheck').hidden=!g?.signature;$('#receipt').hidden=!g;
 if(g){$('#receipt-status').textContent=g.status;$('#receipt-recipient').textContent=g.recipient||'—';$('#receipt-signature').textContent=g.signature||'Not submitted';$('#receipt-time').textContent=g.confirmedAt||g.authorizedAt||'—';$('#receipt-amount').textContent=`${(g.lamports||0)/1e9} devnet SOL (no monetary value)`;$('#explorer').hidden=!g.signature;if(g.signature)$('#explorer').href=`https://explorer.solana.com/tx/${encodeURIComponent(g.signature)}?cluster=devnet`;}
}
async function network(){if(await connection.getGenesisHash()!==EXPECTED_GENESIS)throw Error('Network check failed. Only Solana devnet is permitted.');}
async function reconcile(){const g=readGrants()[org.id];if(!g?.signature)return;await network();const tx=await connection.getParsedTransaction(g.signature,{maxSupportedTransactionVersion:0,commitment:'confirmed'});if(tx?.meta?.err){g.status='Failed on devnet';}else if(verifyTransfer(tx,g)){g.status='Confirmed devnet test transfer';g.confirmedAt=tx.blockTime?new Date(tx.blockTime*1000).toISOString():new Date().toISOString();}else if(tx){g.status='Receipt mismatch — review required';}else{g.status='Submitted — confirmation pending';}writeGrant(org.id,g);render();message(g.status);}
$('#wallet-address').textContent=DEMO_WALLET;
$('#check-balance').onclick=async()=>{message('Checking public devnet balance…');try{await network();const b=await connection.getBalance(new PublicKey(DEMO_WALLET));message(`Playground wallet balance: ${b/1e9} devnet SOL. ${b===0?'Test funds are still needed. Do not buy real SOL.':''}`);}catch(e){message(`Devnet unavailable: ${e.message}`);}};
$('#connect').onclick=async()=>{try{provider=window.phantom?.solana||window.solflare||window.solana;if(!provider?.connect||!provider?.signTransaction)throw Error('Open CSIN in a browser with a Solana wallet extension. Playground itself does not inject a wallet into this app. Never paste its private key here.');await provider.connect();publicKey=provider.publicKey;if(!publicKey)throw Error('Wallet did not return an address.');await network();$('#connected-wallet').textContent=publicKey.toBase58();const balance=await connection.getBalance(publicKey);message(`Connected. Devnet balance: ${balance/1e9} SOL. Only test funds will be used.`);render();}catch(e){publicKey=null;message(e.message);render();}};
$('#authorization').onchange=render;
$('#pay').onclick=async()=>{
 if(busy||!publicKey||!eligible()||!$('#authorization').checked||readGrants()[org.id]?.signature)return;
 busy=true;render();let signed=false;
 try{
  await network();const recipient=new PublicKey($('#recipient').value.trim());if(!PublicKey.isOnCurve(recipient.toBytes()))throw Error('Use a standard devnet wallet recipient.');if(recipient.equals(publicKey))throw Error('Use a different recipient wallet for the demo.');
  const lamports=1000000;const block=await connection.getLatestBlockhash('confirmed');const tx=new Transaction({feePayer:publicKey,recentBlockhash:block.blockhash}).add(SystemProgram.transfer({fromPubkey:publicKey,toPubkey:recipient,lamports}));
  const fee=(await connection.getFeeForMessage(tx.compileMessage())).value;if(fee===null)throw Error('Could not estimate the devnet fee. Try again.');if(await connection.getBalance(publicKey)<lamports+fee)throw Error('Insufficient devnet funds. No transaction sent. Do not buy real SOL.');
  if(!eligible())throw Error('Evidence changed. Review it again first.');
  message('Review the wallet request: 0.001 devnet SOL plus network fee. Approve only if the recipient matches.');
  const approved=await provider.signTransaction(tx);
  if(!approved.compileMessage().serialize().equals(tx.compileMessage().serialize()))throw Error('Signed transaction did not match the authorized request.');
  const signature=bs58.encode(approved.signature);signed=true;
  const g={orgId:org.id,status:'Signed — submission pending',sender:publicKey.toBase58(),recipient:recipient.toBase58(),lamports,signature,authorizedAt:new Date().toISOString(),reportVersion:record().version,lastValidBlockHeight:block.lastValidBlockHeight};writeGrant(org.id,g);
  const returned=await connection.sendRawTransaction(approved.serialize(),{skipPreflight:false,maxRetries:2});if(returned!==signature)throw Error('Unexpected submission signature. Recheck before any retry.');g.status='Submitted — confirmation pending';writeGrant(org.id,g);render();message('Submitted to devnet. Checking confirmation…');
  for(let i=0;i<8;i++){await new Promise(r=>setTimeout(r,1500));await reconcile();if(readGrants()[org.id].status!=='Submitted — confirmation pending')break;}
 }catch(e){message(`${signed?'Submission or confirmation uncertain. Use Check receipt; do not resend. ':''}${e.message||'Wallet request was rejected.'}`);}finally{busy=false;render();}
};
$('#recheck').onclick=async()=>{try{await reconcile();}catch(e){message(`Could not check receipt: ${e.message}`);}};
window.addEventListener('storage',render);render();
