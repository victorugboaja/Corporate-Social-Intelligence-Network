import {organizations} from './data.js';
const params=new URLSearchParams(location.search);
const org=organizations.find(o=>o.id===(params.get('case')||params.get('org')))||organizations[0];
const version=org.id==='ottawa'&&params.get('version')==='2'?2:1;
document.querySelector('#case-brief').textContent=`${org.name} · Report version ${version}`;
const back=document.querySelector('#back-analysis');if(back)back.href=`/evidence?org=${org.id}&view=analysis`;
const button=document.querySelector('#load-analyst');
const status=document.querySelector('#widget-status');
const endButton=document.querySelector('#end-call');
const panel=document.querySelector('#analyst-panel');
const container=document.querySelector('#widget-container');
let loading,widget;
function loadScript(){
 if(customElements.get('elevenlabs-convai'))return Promise.resolve();
 if(loading)return loading;
 loading=new Promise((resolve,reject)=>{
  const script=document.createElement('script');
  script.src='https://unpkg.com/@elevenlabs/convai-widget-embed';
  script.async=true;
  const timer=setTimeout(()=>reject(new Error('Loading is taking too long. Check your connection, then reload this page.')),20000);
  script.onload=()=>{clearTimeout(timer);resolve();};
  script.onerror=()=>{clearTimeout(timer);script.remove();loading=null;reject(new Error('Unable to load ElevenLabs. Check your connection and try again.'));};
  document.head.append(script);
 });
 return loading;
}
function closeAnalyst(message='Call ended. Analyst closed.'){
 if(widget){widget.remove();widget=null;}
 container.replaceChildren();
 endButton.hidden=true;
 button.hidden=false;button.disabled=false;button.textContent='Talk to CSIN Analyst';
 status.textContent=message;
}
button.addEventListener('click',async()=>{
 button.disabled=true;status.textContent='Loading controls. No conversation has been started.';
 try{
  await loadScript();
  widget=document.createElement('elevenlabs-convai');
  widget.setAttribute('agent-id','agent_4101m3dtajc0f9zs3g79eafv5eke');
  const organizationContext=[org.summary,...org.findings.map(f=>`${f.title}: ${f.headline}. ${f.text} Source ${f.source}. Status ${f.status}.`)].join(' ');
  widget.setAttribute('dynamic-variables',JSON.stringify({organization_name:org.name,organization_city:org.city,organization_province:org.province,organization_sector:org.sector,campaign_target:`CAD ${org.request.toLocaleString('en-CA')}`,report_version:String(version),organization_context:organizationContext}));
  widget.setAttribute('action-text','CSIN Analyst');
  widget.setAttribute('start-call-text','Start Call');
  widget.setAttribute('end-call-text','End Call');
  widget.setAttribute('expand-text','Open analyst');
  container.replaceChildren(widget);
  status.textContent='Click Start Call at the bottom of the screen.';
  button.hidden=true;endButton.hidden=false;
 }catch(error){status.textContent=error.message;button.disabled=false;}
});
endButton.addEventListener('click',()=>closeAnalyst());
document.addEventListener('pointerdown',event=>{if(widget&&!panel.contains(event.target))closeAnalyst();},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&widget)closeAnalyst();});
window.addEventListener('pagehide',()=>{if(widget)widget.remove();});
