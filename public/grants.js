export const GRANT_KEY='csin-grants-v1';
const LEGACY_GRANT_KEY='bcf-grants-v1';
export function readGrants(){try{return JSON.parse(localStorage.getItem(GRANT_KEY)||localStorage.getItem(LEGACY_GRANT_KEY))||{};}catch{return {};}}
export function writeGrant(org,grant){const gs=readGrants();gs[org]=grant;localStorage.setItem(GRANT_KEY,JSON.stringify(gs));}
export function canAuthorize(findings,record){return findings.length>0&&findings.every(f=>['approved','corrected'].includes(record.reviews[f.id]?.status));}
export function verifyTransfer(tx,expected){
 if(!tx||!tx.meta||tx.meta.err!==null)return false;
 const instructions=tx.transaction?.message?.instructions||[];
 return instructions.some(i=>i.program==='system'&&i.parsed?.type==='transfer'&&i.parsed.info.source===expected.sender&&i.parsed.info.destination===expected.recipient&&i.parsed.info.lamports===expected.lamports);
}
