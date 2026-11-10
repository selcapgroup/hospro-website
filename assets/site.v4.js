
(function(){
const CODE='3132';
const gate=document.getElementById('gate');
const unlocked=()=>{try{return sessionStorage.getItem('hospro_entity')==='1'}catch(e){return false}};
if(gate){
  if(unlocked()){gate.style.display='none';const nx=new URLSearchParams(location.search).get('next');if(nx&&/^pages\/[a-z0-9-]+\.html$/.test(nx))location.replace(nx);}
  const inp=document.getElementById('code');const err=document.getElementById('gate-err');
  document.getElementById('gate-form').addEventListener('submit',e=>{e.preventDefault();if(inp.value.trim()===CODE){try{sessionStorage.setItem('hospro_entity','1')}catch(x){}gate.style.display='none';const nx=new URLSearchParams(location.search).get('next');if(nx&&/^pages\/[a-z0-9-]+\.html$/.test(nx))location.replace(nx);}else{err.textContent='That code is not recognised.';inp.value='';inp.focus();}});
  inp.focus();
}else if(!unlocked()){
  location.replace('../index.html?next=pages/'+location.pathname.split('/').pop());
}
// AI chips popover
const pop=document.createElement('div');pop.id='aipop';document.body.appendChild(pop);
document.querySelectorAll('.aichip[data-ai]').forEach(c=>c.addEventListener('click',e=>{e.stopPropagation();pop.innerHTML='<b>HosPRO·AI with Immediate Impact</b><br>'+c.dataset.ai;const r=c.getBoundingClientRect();pop.style.display='block';pop.style.top=(r.bottom+8)+'px';pop.style.left=Math.min(window.innerWidth-400,Math.max(8,r.left))+'px';}));
document.addEventListener('click',()=>pop.style.display='none');window.addEventListener('scroll',()=>pop.style.display='none');
// enlarge diagrams
document.querySelectorAll('.svgwrap').forEach(w=>{if(!w.querySelector('svg'))return;const b=document.createElement('button');b.className='enl';b.textContent='⤢ Enlarge';b.onclick=()=>{const lb=document.getElementById('lightbox');lb.innerHTML='<div class="lbsvg">'+w.querySelector('svg').outerHTML+'</div>';lb.style.display='flex';};w.appendChild(b);});
// lightbox
const lb=document.getElementById('lightbox');
document.querySelectorAll('img[data-light]').forEach(im=>im.addEventListener('click',()=>{lb.innerHTML='<img src="'+im.src+'" alt="">';lb.style.display='flex'}));
lb.addEventListener('click',()=>lb.style.display='none');

// ROI calculator
const R=id=>document.getElementById(id);
if(R('i-rooms')){
 const levers=[['Housekeeping productivity',(r,a,o,s)=>38*(s/14)*0.6+38*(r/120)*0.4,'#2E6B5E'],['Maintenance response & spend',(r,a,o,s)=>32*(r/120),'#EA7A1E'],['Revenue management (HosREV)',(r,a,o,s)=>r*a*(o/100)*365*0.0165/1000,'#0f766e'],['Management & admin time',(r,a,o,s)=>26*(0.5+0.5*r/120),'#1F3864'],['Guest recovery & refunds',(r,a,o,s)=>18*(r/120)*(a/120),'#2f6d8f'],['Labour cost control (clock-in)',(r,a,o,s)=>22*(s/14),'#2B726A'],['Direct marketing from guest data',(r,a,o,s)=>20*(r/120)*(o/72),'#9C4F63']];
 function calc(){const r=+R('i-rooms').value,a=+R('i-adr').value,o=+R('i-occ').value,s=+R('i-staff').value;R('r-rooms').textContent=r;R('r-adr').textContent=a;R('r-occ').textContent=o;R('r-staff').textContent=s;const vals=levers.map(l=>[l[0],l[1](r,a,o,s),l[2]]);const tot=vals.reduce((x,y)=>x+y[1],0);R('o-total').textContent='£'+Math.round(tot)+'k';R('o-rev').textContent='£'+Math.round(vals[2][1])+'k';R('o-ops').textContent='£'+Math.round(vals[0][1]+vals[1][1])+'k';const sub=Math.max(2.4,r*0.03);R('o-pay').textContent=(tot*1000/12>sub*1000?'< 1 month':'~'+Math.ceil(sub*12/tot)+' months');const mx=Math.max(...vals.map(v=>v[1]));R('roi-bars').innerHTML=vals.map(v=>'<div class="bar"><span>'+v[0]+'</span><i style="width:'+(v[1]/mx*100)+'%;background:'+v[2]+'"></i><b>£'+Math.round(v[1])+'k</b></div>').join('');}
 ['i-rooms','i-adr','i-occ','i-staff'].forEach(i=>R(i).addEventListener('input',calc));calc();
}

// fault walk-through
const fw=document.getElementById('faultwalk');
if(fw){const svg=fw.closest('.sec').querySelector('.svgwrap svg');const steps=[...svg.querySelectorAll('text')].filter(t=>/^\d+ · /.test(t.textContent)).sort((a,b)=>parseInt(a.textContent)-parseInt(b.textContent)).map(t=>({t,r:t.previousElementSibling,d:t.nextElementSibling}));let i=-1,timer=null;const lab=R('f-label');
 function render(){steps.forEach((s,k)=>{[s.r,s.t,s.d].forEach(e=>{if(!e)return;e.classList.toggle('dim',i>=0&&k>i);});s.r.classList.toggle('hl',k===i)});lab.textContent=i<0?'Press Next to start':steps[i].t.textContent+' — '+(steps[i].d?steps[i].d.textContent:'');}
 R('f-next').onclick=()=>{i=Math.min(steps.length-1,i+1);render()};R('f-prev').onclick=()=>{i=Math.max(-1,i-1);render()};
 R('f-play').onclick=()=>{if(timer){clearInterval(timer);timer=null;R('f-play').textContent='▶ Play';return}i=-1;render();R('f-play').textContent='⏸ Pause';timer=setInterval(()=>{if(i>=steps.length-1){clearInterval(timer);timer=null;R('f-play').textContent='▶ Play';return}i++;render()},1400)};
 render();}

// roadmap explorer
const rt=document.getElementById('roadtool');
if(rt){const M={1:['Auth and role claims, tenant-scoped rules, audit log','Maintenance cost & KPI dashboard live','Live comp-set and pick-up feeds in HosREV','Pipeline hygiene; smart allocation and morning brief in daily use','Build-and-measure begins at Brandon Hall and The Barn'],2:['Partner platform under the live HosFIX and HosHOUSE modules','AI fault triage from photo + text; voice logging','HosREV recommendations on live data','AI enquiry agent drafting replies and instant quotes','Gate 1: partner build live, KPIs baselined'],3:['Guestline live API, rate-shopper and push notifications','Predictive maintenance; contractor advisor','Forecasting and plain-English explanations; rooms-out-of-order link','Guest concierge by message; campaigns to opted-in guests','Compliance guardian and inspector pack'],4:['Three pilot independents live alongside the two reference hotels','Predictive maintenance measured','Gate 2: revenue and sales AI measured against baseline','Concierge running at pilot hotels','Case studies drafted'],5:['Multi-tenant onboarding in a day','Parts & stock intelligence','Guard-railed autopilot and channel push','Voice concierge','Labour vs occupancy rota suggestions'],6:['Launch: pricing, channel, ten hotels signed','Every module costed per job','Autopilot inside guard-rails at reference hotels','Gate 3: product launch','Governance and estate benchmarks live']};
 const bt=R('road-btns');for(let m=1;m<=6;m++){const b=document.createElement('button');b.className='btn'+(m===1?' on':'');b.textContent='Month '+m;b.onclick=()=>{[...bt.children].forEach(x=>x.classList.remove('on'));b.classList.add('on');R('road-out').innerHTML='<h4>By the end of month '+m+'</h4><ul>'+M[m].map(x=>'<li>'+x+'</li>').join('')+'</ul>'};bt.appendChild(b);}bt.children[0].click();}

// AI use-case filter
const af=R('ai-filter');
if(af){const tbl=af.nextElementSibling.nextElementSibling;const rows=[...tbl.querySelectorAll('tr')].slice(1);const mods=[...new Set(rows.map(r=>r.children[2].textContent.trim()))];const all=document.createElement('button');all.className='btn on';all.textContent='All';af.appendChild(all);const bs=[all];mods.forEach(m=>{const b=document.createElement('button');b.className='btn';b.textContent=m;af.appendChild(b);bs.push(b)});bs.forEach(b=>b.onclick=()=>{bs.forEach(x=>x.classList.remove('on'));b.classList.add('on');rows.forEach(r=>r.classList.toggle('hide',b!==all&&r.children[2].textContent.trim()!==b.textContent))});}

// matrix filter
const mf=R('mx-filter');
if(mf){const rows=[...document.querySelectorAll('table.mx tr')].filter(r=>r.querySelector('td'));mf.querySelectorAll('button').forEach(b=>b.onclick=()=>{mf.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');rows.forEach(r=>{const t=r.querySelector('.tag');r.classList.toggle('hide',b.dataset.f!=='all'&&(!t||t.textContent.trim()!==b.dataset.f))})});}

// AI simulator
const SIM=[
 {t:'Housekeeper photographs a leaking bath panel in Room 61',today:'<p>A job is created with the housekeeper\'s note. Priority defaults to "by reporter". It goes to the default fixers. The manager may re-prioritise if she sees it.</p>',ai:'<p><b>Type:</b> Plumbing · bath seal leak<br><b>Priority:</b> High — room 61 is sold tonight (PMS)<br><b>Assign:</b> Pete (free 10:30, nearest, fixed this room on 14 Oct)<br><b>Parts:</b> silicone, panel clip · ~£12<br><b>Why:</b> photo matches 31 previous bath-seal jobs; same room reported 14 Oct</p>',rec:'hosfix_jobs/J-4821 → priority high, assignees [pete], suggestedParts, aiConfidence 0.86, decidedBy <you>, decidedAt now'},
 {t:'Saturday has a concert at the arena and 78% of rooms sold',today:'<p>Rates stay where they were set last week unless the GM remembers to check the comp-set and the events calendar.</p>',ai:'<p><b>Superior:</b> £149 → £163 (confidence 84%)<br><b>Classic:</b> £119 → £129 (79%)<br><b>Suite:</b> hold — 2 suites out of order (HosFIX), re-check Friday<br><b>Why:</b> comp-set +11%, arena event, pick-up 9 rooms ahead of last year, 60-pax conference holding 8 Classics</p>',rec:'rates/2026-11-15 → recommendation stored; status approved|adjusted|skipped; approvedBy <you>; push to PMS queued (phase 2: automatic inside guard-rails)'},
 {t:'A 60-delegate conference enquiry arrives by email at 14:02',today:'<p>It sits in the inbox until the events executive is free. A reply and quote are typed by hand, often the next day.</p>',ai:'<p><b>Draft reply ready at 14:04</b> — Warwick Room available 24 Nov, 60 theatre-style, DDR £49, 22 bedrooms held at £119<br><b>Attachments:</b> proposal PDF, floor plan<br><b>Next:</b> site visit slots offered Tue/Thu<br><b>Why:</b> space and rooms checked live; pricing from the quote builder; wording in the hotel\'s voice</p>',rec:'enquiries/E-1187 → stage proposal_sent, quote £6,420, draftedBy ai, sentBy <you>, followUpAt +3 days'},
 {t:'It is 06:45 and the GM opens the app',today:'<p>She opens five screens, walks the floor, and pieces the day together from memory and WhatsApp.</p>',ai:'<p><b>Morning brief drafted:</b> 84 rooms to service, 7 housekeepers — split ready · 9 open faults, 2 urgent (151 heating, sold tonight) · Fridge 3 out of range twice — contractor recommended · fire test due, marshal on shift · 3 enquiries overdue, £8.4k conference follow-up drafted</p>',rec:'hospro_app/briefs/2026-11-10 → status sent|edited; every line links to the record behind it; readBy owner 07:12'},
 {t:'A guest messages "the shower is cold" at 22:40',today:'<p>Reception takes the call if the guest rings; if they message, nobody sees it until morning. The guest moves rooms or complains at checkout.</p>',ai:'<p><b>Guest told:</b> "Sorry — we\'ve logged it and someone is on the way." (22:40)<br><b>Job raised:</b> urgent, Room 112, assigned to the on-duty fixer, night porter notified<br><b>If no fixer on duty:</b> offer room move, flag to manager<br><b>Money, access, safety:</b> always a person</p>',rec:'hosrec_requests/R-903 + hosfix_jobs/J-4822 → urgent, source Guest, guestNotifiedAt, completedAt; service-recovery gesture decided by manager'}
];
const sb=document.getElementById('ai-sim-btns');
if(sb){let si=0;function rs(){[...sb.children].forEach((b,k)=>b.classList.toggle('on',k===si));document.getElementById('sim-today').innerHTML=SIM[si].today;document.getElementById('sim-ai').innerHTML=SIM[si].ai;document.getElementById('sim-rec').innerHTML='<p class="note">Approve, change or skip to see what is written.</p>';}
 SIM.forEach((x,k)=>{const b=document.createElement('button');b.className='btn';b.textContent=(k+1)+' · '+x.t;b.onclick=()=>{si=k;rs()};sb.appendChild(b)});
 const rec=(d)=>{document.getElementById('sim-rec').innerHTML='<p><b>'+d+'</b></p><p class="mono">'+SIM[si].rec+'</p><p class="note">The proposal, the decision, who made it and when are all stored as events — the same records that train the next version of the model.</p>'};
 document.getElementById('sim-approve').onclick=()=>rec('Approved by you ✓');document.getElementById('sim-change').onclick=()=>rec('Changed by you — your version is what gets stored, and your change becomes a training label');document.getElementById('sim-skip').onclick=()=>rec('Skipped — nothing changes in the hotel; the skip is recorded so the model learns when not to ask');rs();}
// AI stack
const STACK=[
 {c:'#B3261E',n:'Layer 4 · Guest-facing',d:'In-stay requests by message or voice, routed to the right department and tracked to completion; upsell and post-stay follow-up.',needs:'Layers 0–3, messaging channels (WhatsApp Business, SMS, web), hotel policies.',never:'Never takes money, grants access or handles a safety issue without a person.'},
 {c:'#EA7A1E',n:'Layer 3 · Agents with approval',d:'Triage faults, propose allocations, chase overdue enquiries, assemble the inspector pack, move rates inside guard-rails.',needs:'Ada Engine agent tooling, scoped permissions, audit trail, approval steps.',never:'Never acts outside its guard-rails; every action has a named approver.'},
 {c:'#0f766e',n:'Layer 2 · Assistant',d:'Ask anything about the hotel in plain language; draft the daily report; explain a rate; voice capture for fixers and housekeepers.',needs:'Language model over the derived KPIs and events; speech-to-text.',never:'Never invents a number — every answer cites the records it used.'},
 {c:'#2E6B5E',n:'Layer 1 · Insight & forecast',d:'Demand forecast per night, room-time baselines, fault prediction by asset, labour vs occupancy, anomaly flags.',needs:'Per-property models trained on the event history plus PMS and comp-set feeds.',never:'Never mixes one hotel\'s data into another\'s model.'},
 {c:'#1F3864',n:'Layer 0 · Operating data (built)',d:'Rooms, jobs, photos, timers, costs, checks, incidents, figures, enquiries, rota, guests, rates, P&L — timestamped, attributed, evidenced.',needs:'Nothing new: this exists today in two hotels.',never:'Never captured as a separate task; always a by-product of the work.'}
];
const stb=document.getElementById('stack-btns');
if(stb){STACK.forEach((l,k)=>{const b=document.createElement('button');b.style.background=l.c;b.style.marginLeft=(k*18)+'px';b.textContent=l.n;b.onclick=()=>{[...stb.children].forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('stack-out').innerHTML='<h4>'+l.n+'</h4><p>'+l.d+'</p><p><b>Needs:</b> '+l.needs+'</p><p><b>Rule:</b> '+l.never+'</p>'};stb.appendChild(b)});stb.children[4].click();}
// Discussion form
const CONTACT_EMAIL='ajay@hospro.co.uk';
const D=document.getElementById('discuss');
if(D){document.getElementById('d-to').textContent=CONTACT_EMAIL;
 const TOPICS=['Phase 1 scope: fault triage, allocation, morning brief, auth','Ada Engine fit with the current Firebase data model','Multi-tenant platform and data isolation','HosREV: forecasting, guard-rails, rate-shopper and PMS feeds','Enquiry agent and venue-sales workflow','Guest concierge by message / voice','Model development loop, shadow mode and gates','Security, GDPR and data residency','Commercial model: per-property pricing, revenue share','IP in the intelligence layer','Governance, steering and the three gates','Pilot hotels and the 90-day measurement','Timeline and resourcing','Something else (see comments)'];
 const tg=document.getElementById('d-topics');TOPICS.forEach((t,i)=>{const l=document.createElement('label');l.innerHTML='<input type="checkbox" value="'+t+'"> '+t;tg.appendChild(l)});
 let react='';document.querySelectorAll('#d-react .btn').forEach(b=>b.onclick=()=>{document.querySelectorAll('#d-react .btn').forEach(x=>x.classList.remove('on'));b.classList.add('on');react=b.dataset.v;save()});
 const F=['d-name','d-org','d-email','d-text','d-when'];
 function save(){localStorage.setItem('hospro_discuss',JSON.stringify({f:Object.fromEntries(F.map(i=>[i,document.getElementById(i).value])),t:[...tg.querySelectorAll('input:checked')].map(c=>c.value),r:react}))}
 try{const sv=JSON.parse(localStorage.getItem('hospro_discuss')||'null');if(sv){F.forEach(i=>document.getElementById(i).value=sv.f[i]||'');tg.querySelectorAll('input').forEach(c=>c.checked=sv.t.includes(c.value));react=sv.r||'';document.querySelectorAll('#d-react .btn').forEach(b=>b.classList.toggle('on',b.dataset.v===react));}}catch(e){}
 F.forEach(i=>document.getElementById(i).addEventListener('input',save));tg.addEventListener('change',save);
 function body(){const v=i=>document.getElementById(i).value;return 'From: '+v('d-name')+' ('+v('d-org')+') '+v('d-email')+'\n\nReaction: '+(react||'-')+'\n\nTopics for the agenda:\n'+[...tg.querySelectorAll('input:checked')].map(c=>'- '+c.value).join('\n')+'\n\nComments / questions:\n'+v('d-text')+'\n\nSuggested slots: '+v('d-when')+'\n\n(sent from hospro.co.uk/entity)';}
 document.getElementById('d-send').onclick=()=>{location.href='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('HosPRO JV — discussion points from '+(document.getElementById('d-name').value||'reader'))+'&body='+encodeURIComponent(body());document.getElementById('d-status').textContent='Your email app should open with everything filled in.';};
 document.getElementById('d-copy').onclick=()=>{navigator.clipboard.writeText(body()).then(()=>document.getElementById('d-status').textContent='Copied — paste it into any email or message.')};
 document.getElementById('d-clear').onclick=()=>{F.forEach(i=>document.getElementById(i).value='');tg.querySelectorAll('input').forEach(c=>c.checked=false);react='';document.querySelectorAll('#d-react .btn').forEach(b=>b.classList.remove('on'));localStorage.removeItem('hospro_discuss');document.getElementById('d-status').textContent='Cleared.'};}
})();
