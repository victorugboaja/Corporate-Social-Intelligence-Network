import {organizations} from './data.js';
import {requireAuth} from './auth.bundle.js';
await requireAuth();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let ids=[];try{ids=JSON.parse(localStorage.getItem('csin-prospects-v2'))||[];}catch{}
const prospects=ids.map(id=>organizations.find(o=>o.id===id)).filter(Boolean);
let identity;try{identity=JSON.parse(sessionStorage.getItem('csin-access'));}catch{}document.querySelector('#identity').textContent=identity?`${identity.name} · ${identity.company}`:'Scout access';
document.querySelector('#portfolio').innerHTML=prospects.length?`<table class="prospect-table"><thead><tr><th>Province</th><th>Organization</th><th>Sector</th><th>City</th><th>Campaign Target</th></tr></thead><tbody>${prospects.map(o=>`<tr data-href="/evidence?org=${o.id}" tabindex="0"><td>${esc(o.province)}</td><td><span class="table-org"><span class="mini-logo">${esc(o.initials)}</span><strong>${esc(o.name)}</strong></span></td><td>${esc(o.sector)}</td><td>${esc(o.city)}</td><td class="campaign">CAD ${o.request.toLocaleString('en-CA')}</td></tr>`).join('')}</tbody></table>`:`<section class="prospect-empty"><h2>No organizations added</h2><a class="profile-cta" href="/scout">Open Scout</a></section>`;
document.querySelectorAll('[data-href]').forEach(row=>{const open=()=>location.href=row.dataset.href;row.addEventListener('click',open);row.addEventListener('keydown',e=>{if(e.key==='Enter')open();});});
