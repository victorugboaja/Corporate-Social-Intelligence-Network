const scoreNames=['Donor-Centric Storytelling','Multi-Channel Integrated Campaigns','Monthly Recurring Giving Programs','Personalized Donor Communications','Transparent Impact Reporting','Strategic Major Donor Cultivation','Data-Driven Decision Making'];

const core=[
 {id:'ottawa',name:'Ottawa Access Collective',initials:'OA',city:'Ottawa',province:'ON',region:'Ontario',sector:'Employment',focus:'Employment',request:20000,established:2019,program:'Mentoring',evidence:'Reported outcomes',summary:'Employment mentoring for residents facing barriers to professional networks.',scores:[82,74,61,86,68,77,72],sources:[
  {id:'O1-S1',title:'Initial program report',text:'Our pilot enrolled 40 participants. Thirty completed the mentoring program. Twelve participants told us they had started paid work within three months of completion. We have not obtained employer confirmation. The program spent CAD 18,000: CAD 12,000 on delivery staff, CAD 4,000 on participant travel and access support, and CAD 2,000 on administration. We request CAD 20,000 to run the next cohort.'},
  {id:'O1-S2',title:'Follow-up update',text:'Nine participants reconfirmed employment and four additional participants self-reported job starts. No employer evidence was collected.'}
 ],findings:[
  {id:'participation',title:'Deliveries Completed',value:'30 of 40',headline:'30 of 40 participants completed mentorship program',text:'Participation figures are reported by the organization. Attendance records have not been independently checked.',source:'O1-S1',status:'Pending'},
  {id:'waitlist',title:'Households Waitlisted',value:'18',headline:'18 applicants remain on the next-cohort waitlist',text:'Waitlist totals are organization-reported and may include inactive applications.',source:'O1-S1',status:'Pending'},
  {id:'outcomes',title:'Resolved Cases',value:'12',headline:'12 participants reported starting paid work',text:'Employment starts are self-reported. Employer confirmation has not been collected.',source:'O1-S1',status:'Pending'},
  {id:'spending',title:'Project Spending',value:'$18K',headline:'CAD 18,000 in reported program spending',text:'The stated categories reconcile to the total. Expense authenticity has not been independently checked.',source:'O1-S1',status:'Pending'},
  {id:'milestones',title:'Program Milestones',value:'4 / 5',headline:'Four of five pilot milestones were reported complete',text:'Completion is based on the organization’s milestone update.',source:'O1-S1',status:'Pending'},
  {id:'reports',title:'Impact Reports',value:'2',headline:'Two program reports are available',text:'The reports add follow-up context but do not establish causation.',source:'O1-S2',status:'Update available'}
 ],questions:['How will employment starts be independently confirmed?','What is the plan for the 18 waitlisted applicants?'],concerns:['Outcome evidence remains self-reported.','The next-cohort budget is incomplete.'],improvements:['Add employer or participant-document verification.','Publish a cost-per-completion measure.'],alignment:['Professional inclusion aligns with employment-access funding.','Travel support removes a documented participation barrier.']},
 {id:'vancouver',name:'Vancouver Skills Circle',initials:'VS',city:'Vancouver',province:'BC',region:'British Columbia',sector:'Employment',focus:'Employment',request:15000,established:2020,program:'Mentoring',evidence:'Activity only',summary:'Peer mentoring and professional introductions for people with international experience.',scores:[78,69,58,80,57,73,66]},
 {id:'garden',name:'Atlantic Community Garden',initials:'AG',city:'Halifax',province:'NS',region:'Nova Scotia',sector:'Food access',focus:'Food access',request:10000,established:2017,program:'Workshops',evidence:'Activity only',summary:'Neighbourhood gardening, food-sharing workshops and accessible growing spaces.',scores:[72,64,76,70,62,68,63]},
 {id:'calgary',name:'Prairie Pathways Society',initials:'PP',city:'Calgary',province:'AB',region:'Alberta',sector:'Employment',focus:'Employment',request:80000,established:2016,program:'Training',evidence:'Reported outcomes',summary:'Skills training and employer introductions for young adults.',scores:[76,71,54,74,65,79,70]}
];

const additions=[
 ['toronto','Toronto Neighbourhood Works','TN','Toronto','ON','Ontario','Employment',45000,2015,'Training','Reported outcomes'],
 ['hamilton','Hamilton Housing Bridge','HB','Hamilton','ON','Ontario','Housing',65000,2018,'Housing support','Activity only'],
 ['montreal','Montréal Community Table','MC','Montréal','QC','Quebec','Food access',30000,2014,'Food delivery','Reported outcomes'],
 ['quebec','Québec Youth Futures','QY','Québec City','QC','Quebec','Youth',40000,2021,'Mentoring','Activity only'],
 ['winnipeg','Winnipeg Family Link','WF','Winnipeg','MB','Manitoba','Family support',25000,2013,'Case support','Reported outcomes'],
 ['regina','Regina Skills Exchange','RS','Regina','SK','Saskatchewan','Employment',35000,2019,'Training','Reported outcomes'],
 ['saskatoon','Saskatoon Food Commons','SF','Saskatoon','SK','Saskatchewan','Food access',22000,2018,'Food delivery','Activity only'],
 ['edmonton','Edmonton Welcome Hub','EW','Edmonton','AB','Alberta','Settlement',50000,2012,'Case support','Reported outcomes'],
 ['victoria','Victoria Access Network','VA','Victoria','BC','British Columbia','Accessibility',28000,2017,'Case support','Activity only'],
 ['kelowna','Okanagan Youth Connect','OY','Kelowna','BC','British Columbia','Youth',32000,2020,'Mentoring','Activity only'],
 ['fredericton','Fredericton Care Collective','FC','Fredericton','NB','New Brunswick','Family support',18000,2016,'Case support','Reported outcomes'],
 ['charlottetown','Island Housing Collaborative','IH','Charlottetown','PE','Prince Edward Island','Housing',24000,2022,'Housing support','Activity only'],
 ['stjohns','St. John’s Community Reach','SC','St. John’s','NL','Newfoundland and Labrador','Food access',27000,2011,'Food delivery','Reported outcomes'],
 ['whitehorse','Yukon Community Access','YC','Whitehorse','YT','Yukon','Accessibility',42000,2018,'Case support','Activity only'],
 ['yellowknife','Northern Family Circle','NF','Yellowknife','NT','Northwest Territories','Family support',55000,2015,'Case support','Reported outcomes'],
 ['iqaluit','Nunavut Youth Network','NY','Iqaluit','NU','Nunavut','Youth',60000,2020,'Mentoring','Activity only']
];

function standardFindings(o){const units=18+(o.name.length%23),wait=5+(o.city.length%14),urgent=4+(o.id.length%9);return [
 {id:'deliveries',title:'Deliveries Completed',value:String(units),headline:`${units} program deliveries were reported complete`,text:'Delivery totals are supplied by the organization and have not been independently checked.',source:`${o.initials}-S1`,status:'Pending'},
 {id:'waitlist',title:'Households Waitlisted',value:String(wait),headline:`${wait} households or applicants remain waitlisted`,text:'The current waitlist is organization-reported.',source:`${o.initials}-S1`,status:'Pending'},
 {id:'urgent',title:'Resolved Cases',value:String(urgent),headline:`${urgent} cases were reported resolved`,text:'Case resolution criteria have not been independently assessed.',source:`${o.initials}-S1`,status:'Pending'},
 {id:'spending',title:'Project Spending',value:`$${Math.round(o.request*.72/1000)}K`,headline:`CAD ${(o.request*.72).toLocaleString('en-CA')} in reported project spending`,text:'The spending total is synthetic and supplied for this demonstration.',source:`${o.initials}-S1`,status:'Pending'},
 {id:'milestones',title:'Program Milestones',value:'3 / 4',headline:'Three of four program milestones were reported complete',text:'Milestone completion is based on the organization’s update.',source:`${o.initials}-S1`,status:'Pending'},
 {id:'reports',title:'Impact Reports',value:'1',headline:'One impact report is available',text:'The report is self-reported and has not been independently verified.',source:`${o.initials}-S1`,status:'Pending'}
];}

export const organizations=[...core,...additions.map((a,i)=>{const [id,name,initials,city,province,region,sector,request,established,program,evidence]=a;const o={id,name,initials,city,province,region,sector,focus:sector,request,established,program,evidence,country:'Canada',summary:`A sample ${sector.toLowerCase()} program serving residents in ${city}.`,scores:scoreNames.map((_,j)=>55+((i*9+j*7)%37))};o.findings=standardFindings(o);o.sources=[{id:`${initials}-S1`,title:'Program report',text:`Synthetic program information for ${name}. All figures are sample.`}];return o;})].map(o=>{o.country='Canada';o.province??='ON';o.region??='Ontario';o.sector??=o.focus;o.program??='Mentoring';o.evidence??='Activity only';o.findings??=standardFindings(o);o.sources??=[{id:`${o.initials}-S1`,title:'Program report',text:`Synthetic program information for ${o.name}.`}];o.questions??=['How are reported outcomes verified?','What delivery capacity is funded by the request?'];o.concerns??=['Available evidence is organization-reported.'];o.improvements??=['Define a consistent follow-up method.','Publish a detailed use-of-funds schedule.'];o.alignment??=[`${o.sector} aligns with the selected funding area.`];o.fit='Available for review';return o;});

export const scoreLabels=scoreNames;
export const updatedOutcome={id:'outcomes',title:'Resolved Cases',value:'13',headline:'9 reconfirmations and 4 additional self-reported starts',text:'Three original participants did not respond. No independent verification or causal evidence.',source:'O1-S2',status:'Update available'};
export function initialState(){return {selected:'ottawa',tab:'report',country:'All',focus:'All',records:Object.fromEntries(organizations.map(o=>[o.id,{version:1,reviews:{},history:[],updates:{}}]))};}
export function findingsFor(org,record){return org.findings.map(f=>{
 const builtIn=org.id==='ottawa'&&record.version>=2&&f.id==='outcomes'&&!record.updates?.[f.id]?updatedOutcome:f;
 return record.updates?.[f.id]?{...builtIn,...record.updates[f.id]}:builtIn;
});}
function historyList(record){if(Array.isArray(record.history))return record.history;if(record.history)return [record.history];return [];}
export function applyEvidenceUpdate(record,id,update){
 if(!id||!update?.value?.trim()||!update?.headline?.trim()||!update?.text?.trim()||!update?.source?.trim())throw new Error('Complete the changed finding and source details.');
 const currentVersion=Number(record.version)||1;
 record.history=[...historyList(record),structuredClone({version:currentVersion,reviews:record.reviews||{},updates:record.updates||{}})];
 record.version=currentVersion+1;
 record.updates={...(record.updates||{}),[id]:{value:update.value.trim(),headline:update.headline.trim(),text:update.text.trim(),source:update.source.trim(),sourceText:(update.sourceText||'').trim(),status:'New evidence — review required',receivedAt:new Date().toISOString()}};
 record.reviews??={};delete record.reviews[id];return true;
}
export function applyUpdate(record){if(record.version!==1)return false;return applyEvidenceUpdate(record,'outcomes',updatedOutcome);}
export function reviewFinding(record,id,status,note){if(!['approved','flagged','corrected'].includes(status))throw new Error('Invalid review');if(status!=='approved'&&!note.trim())throw new Error('Add a note explaining your review.');record.reviews[id]={status,note:note.trim(),at:new Date().toISOString()};}

export const scoutMetadata=Object.fromEntries(organizations.map(o=>[o.id,{province:o.province,region:o.region,program:o.program,evidence:o.evidence,milestones:[{label:o.findings[4].headline,state:o.findings[4].status,source:o.findings[4].source}]}]));
export function scoutMatches(org,q){const m=scoutMetadata[org.id];return (!q.region||q.region==='All'||q.region===m.region)&&(!q.focus||q.focus==='All'||q.focus===org.focus)&&org.request>=q.min&&org.request<=q.max&&(!q.program||q.program==='All'||q.program===m.program)&&(!q.evidence||q.evidence==='All'||q.evidence===m.evidence);}
