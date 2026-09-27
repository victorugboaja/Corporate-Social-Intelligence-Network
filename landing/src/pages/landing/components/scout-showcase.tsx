import {useEffect,useState} from 'react';
type MapData={provinces:{code:string;path:string}[];nodes:Record<string,[number,number]>};
const names:Record<string,string>={ottawa:'Ottawa',vancouver:'Vancouver',garden:'Halifax',calgary:'Calgary'};
const featured=['vancouver','calgary','ottawa','garden'];
export function ScoutShowcase(){
 const [map,setMap]=useState<MapData|null>(null);
 useEffect(()=>{let active=true;fetch('/canada-map.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{if(active)setMap(data)}).catch(()=>{});return()=>{active=false}},[]);
 return <div className="network-showcase">
  <div className="network-caption"><span>CANADA SCOUT NETWORK</span><span>20 SAMPLE ORGANIZATIONS</span></div>
  {map?<svg viewBox="0 0 1000 710" role="img" aria-label="Canada Scout network preview with sample organizations in Vancouver, Calgary, Ottawa and Halifax">
   <defs><radialGradient id="lens-light"><stop stopColor="#93ca35" stopOpacity=".28"/><stop offset="1" stopColor="#93ca35" stopOpacity="0"/></radialGradient></defs>
   {map.provinces.map(p=><path key={p.code} d={p.path} className="mini-province"/>)}
   <path className="network-lines" d={`M${map.nodes.vancouver.join(',')} L${map.nodes.calgary.join(',')} L${map.nodes.ottawa.join(',')} L${map.nodes.garden.join(',')}`}/>
   {Object.entries(map.nodes).map(([id,[x,y]],i)=><g key={id} transform={`translate(${x},${y})`}><circle className="mini-pulse" r="17" style={{animationDelay:`${i*.18}s`}}/><circle r="6" fill="#93ca35"/>{featured.includes(id)&&<text x={id==='garden'?-20:20} y={id==='vancouver'?-20:20} textAnchor={id==='garden'?'end':'start'}>{names[id]}</text>}</g>)}
   <g className="preview-lens"><circle r="63" fill="url(#lens-light)"/><circle r="43" fill="none" stroke="#c6e89a" strokeWidth="3"/><path d="M31 31L60 60" stroke="#c6e89a" strokeWidth="9" strokeLinecap="round"/><circle r="32" fill="none" stroke="#c6e89a" strokeOpacity=".35"/></g>
  </svg>:<div className="map-fallback">Explore the Canada Scout network →</div>}
  <div className="network-caption network-bottom"><span>SET CRITERIA → SCOUT → REVIEW</span><span>SELECTED MATCHES ONLY</span></div>
 </div>
}
