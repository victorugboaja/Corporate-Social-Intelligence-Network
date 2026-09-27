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

function mountSignInLink(){
  const nav=document.querySelector('.topbar nav');
  if(!nav||nav.querySelector('.auth-session')||nav.querySelector('.auth-signin'))return;
  const link=document.createElement('a');
  link.className='auth-signin';
  link.href=`/login.html?returnTo=${encodeURIComponent(`${location.pathname}${location.search}${location.hash}`)}`;
  link.textContent='Sign in';
  nav.append(link);
}

/**
 * Prefer an Auth0 session when one already exists. Do not force a Universal
 * Login redirect from application pages — a missing Allowed Callback URL for
 * the deployed origin (Callback URL mismatch) would strand the user on Auth0
 * instead of rendering Scout / Prospect List / Analyst.
 */
export async function requireAuth(){
  try{
    const client=await clientPromise;
    if(await client.isAuthenticated()){
      const user=await client.getUser();
      mountSessionControl(client,user);
      return user||{};
    }
  }catch(error){
    console.warn('Auth0 session check failed', error);
  }
  mountSignInLink();
  return {};
}

async function beginLogin(){
  const returnTo=safeReturnTo(new URLSearchParams(location.search).get('returnTo'));
  const signIn=document.querySelector('#auth-signin');
  const guest=document.querySelector('#auth-guest');
  if(guest)guest.href=returnTo;

  try{
    const client=await clientPromise;
    if(await client.isAuthenticated()){location.replace(returnTo);return;}
    authStatus('Choose Auth0 sign in, or continue to the demo without an account.');
    if(signIn){
      signIn.hidden=false;
      signIn.addEventListener('click',async()=>{
        try{
          authStatus('Opening secure sign in…');
          signIn.disabled=true;
          await client.loginWithRedirect({appState:{returnTo}});
        }catch(error){
          signIn.disabled=false;
          authStatus(`Unable to start sign in: ${error.message}. You can still continue to the demo.`);
        }
      });
    }
  }catch(error){
    authStatus(`Auth0 is unavailable (${error.message}). Continue to the demo without signing in.`);
    if(signIn)signIn.hidden=true;
  }
}

async function completeCallback(){
  try{
    const client=await clientPromise;
    const result=await client.handleRedirectCallback();
    authStatus('Signed in. Opening CSIN…');
    location.replace(safeReturnTo(result?.appState?.returnTo));
  }catch(error){
    authStatus(`Sign in could not be completed: ${error.message}. Return home and continue to the demo, or ask an admin to allow ${location.origin}${CALLBACK_PATH} in Auth0.`);
  }
}

if(location.pathname===CALLBACK_PATH)completeCallback();
else if(location.pathname==='/login.html')beginLogin();
