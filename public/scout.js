import {organizations,scoutMatches} from './data.js';
import {requireAuth} from './auth.bundle.js';
const authUser=await requireAuth();
const $=s=>document.querySelector(s),ns='http://www.w3.org/2000/svg';
const provinces=[...new Set(organizations.map(o=>o.region))];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const regionKey=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const svg=(tag,attrs,text)=>{const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text)e.textContent=text;return e;};

let identity;try{identity=JSON.parse(sessionStorage.getItem('csin-access'));}catch{}
const dialog=$('#access-dialog');
const nameInput=$('#access-form input[name="name"]');
if(nameInput&&!nameInput.value)nameInput.value=authUser.name||authUser.nickname||'';
function showIdentity(){if(!identity){dialog.showModal();return;}$('#identity').textContent=`${identity.name} · ${identity.company}`;}
$('#access-form').addEventListener('submit',e=>{e.preventDefault();const form=new FormData(e.currentTarget);identity={name:String(form.get('name')).trim(),company:String(form.get('company')).trim()};if(!identity.name||!identity.company)return;sessionStorage.setItem('csin-access',JSON.stringify(identity));dialog.close();showIdentity();});
$('#identity').addEventListener('click',()=>{dialog.showModal();});
showIdentity();

for(const region of provinces){$('#province-list').insertAdjacentHTML('beforeend',`<button class="province-choice" data-region="${esc(region)}">${esc(region)}</button>`);$('#region').insertAdjacentHTML('beforeend',`<option>${esc(region)}</option>`);}

let map;
try{
 const response=await fetch('/canada-map.json');if(!response.ok)throw Error();map=await response.json();
 for(const p of map.provinces){$('#provinces').append(svg('path',{d:p.path,class:'province','data-region':regionKey(p.name)}));if(!['PE','NB'].includes(p.code))$('#province-labels').append(svg('text',{x:p.label[0],y:p.label[1],class:'province-label'},p.code));}
 for(const o of organizations){const [x,y]=map.nodes[o.id];const g=svg('g',{class:'node filtered-out',transform:`translate(${x},${y})`,tabindex:'0',role:'link','aria-label':`${o.name}, ${o.city}`,'data-org':o.id});g.append(svg('circle',{r:14,class:'halo'}),svg('circle',{r:5,class:'core'}));g.addEventListener('click',()=>location.href=`/evidence?org=${o.id}`);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();g.dispatchEvent(new Event('click'));}});$('#nodes').append(g);}
}catch{$('#map-error').textContent='Map unavailable';}

function chooseProvince(region){const key=regionKey(region);document.querySelectorAll('.province-choice').forEach(b=>b.classList.toggle('active',regionKey(b.dataset.region)===key));$('#region').value=region;document.querySelectorAll('.province').forEach(p=>p.classList.toggle('region-active',region!=='All'&&regionKey(p.dataset.region)===key));}
document.querySelectorAll('.province-choice').forEach(b=>b.addEventListener('click',()=>chooseProvince(b.dataset.region)));
$('#region').addEventListener('change',e=>chooseProvince(e.target.value));

function renderResults(items){$('#results').innerHTML=items.map(o=>`<a class="prospect-row" href="/evidence?org=${o.id}"><span class="mini-logo">${esc(o.initials)}</span><span><strong>${esc(o.name)}</strong><small>${esc(o.city)}, ${esc(o.province)}</small></span><span>${esc(o.sector)}</span><b>CAD ${o.request.toLocaleString('en-CA')}</b><span class="arrow">→</span></a>`).join('');}

$('#criteria-form').addEventListener('submit',e=>{e.preventDefault();const q=Object.fromEntries(new FormData(e.currentTarget));q.min=Number(q.min);q.max=Number(q.max);if(q.max<q.min){$('#form-error').textContent='Check funding range';return;}$('#form-error').textContent='';const found=organizations.filter(o=>scoutMatches(o,q));localStorage.setItem('csin-scout-results',JSON.stringify(found.map(o=>o.id)));document.querySelectorAll('.node').forEach(n=>n.classList.toggle('filtered-out',!found.some(o=>o.id===n.dataset.org)));$('#network-state').textContent=`${found.length} matches`;$('#match-count').textContent=`${found.length} prospects`;$('#query-summary').textContent=[q.region,q.focus,q.program,q.evidence].filter(v=>v!=='All').join(' · ')||'All criteria';renderResults(found);$('#matches').hidden=false;});

$('#refresh').addEventListener('click',()=>{document.querySelectorAll('.node').forEach(n=>n.classList.add('filtered-out'));$('#criteria-form').reset();chooseProvince('All');$('#network-state').textContent='Ready';$('#matches').hidden=true;$('#form-error').textContent='';});
