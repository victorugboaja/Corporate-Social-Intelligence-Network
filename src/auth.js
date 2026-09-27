import {createAuth0Client} from '@auth0/auth0-spa-js';

const AUTH0_DOMAIN='dev-1dvokbbi641ss3ib.us.auth0.com';
const AUTH0_CLIENT_ID='L4Kn8rPTqetm8w7fhkip6oDCtYfRvDRU';
const CALLBACK_PATH='/auth-callback.html';

const safeReturnTo=value=>{
  if(typeof value!=='string'||!value.startsWith('/')||value.startsWith('//'))return '/scout';
  try{const url=new URL(value,location.origin);return url.origin===location.origin?`${url.pathname}${url.search}${url.hash}`:'/scout';}catch{return '/scout';}
};

const clientPromise=createAuth0Client({
  domain:AUTH0_DOMAIN,
  clientId:AUTH0_CLIENT_ID,
  authorizationParams:{redirect_uri:`${location.origin}${CALLBACK_PATH}`,scope:'openid profile email'},
  cacheLocation:'localstorage',
  useRefreshTokens:false
});

function authStatus(message){const node=document.querySelector('#auth-status');if(node)node.textContent=message;}

function mountSessionControl(client,user){
  const nav=document.querySelector('.topbar nav');
  if(!nav||nav.querySelector('.auth-session'))return;
  const button=document.createElement('button');
  button.type='button';button.className='auth-session';
  button.textContent=`${user?.name||user?.email||'Account'} · Sign out`;
  button.addEventListener('click',()=>{
    sessionStorage.removeItem('csin-access');
    client.logout({logoutParams:{returnTo:location.origin}});
  });
  nav.append(button);
}

export async function requireAuth(){
  const client=await clientPromise;
  if(!await client.isAuthenticated()){
    const returnTo=safeReturnTo(`${location.pathname}${location.search}${location.hash}`);
    await client.loginWithRedirect({appState:{returnTo}});
    await new Promise(()=>{});
  }
  const user=await client.getUser();
  mountSessionControl(client,user);
  return user||{};
}

async function beginLogin(){
  try{
    const client=await clientPromise;
    const returnTo=safeReturnTo(new URLSearchParams(location.search).get('returnTo'));
    if(await client.isAuthenticated()){location.replace(returnTo);return;}
    authStatus('Opening secure sign in…');
    await client.loginWithRedirect({appState:{returnTo}});
  }catch(error){authStatus(`Unable to start sign in: ${error.message}`);}
}

async function completeCallback(){
  try{
    const client=await clientPromise;
    const result=await client.handleRedirectCallback();
    authStatus('Signed in. Opening CSIN…');
    location.replace(safeReturnTo(result?.appState?.returnTo));
  }catch(error){authStatus(`Sign in could not be completed: ${error.message}`);}
}

if(location.pathname===CALLBACK_PATH)completeCallback();
else if(location.pathname==='/login.html')beginLogin();
