(()=>{
 const q=id=>document.getElementById(id);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const initial=(matching=false)=>({step:1,matching,linked:false,reply:false,delivery:'draft',prepared:false,review:{documents:'pending',authorization:'pending',limits:'pending'},notes:{documents:'',authorization:'',limits:''},viewed:{application:false,certificate:false,request:false,loss:false},custom:[],events:[],mailEdited:false,lastGenerated:'',mailStale:false,previousDraft:'',sentMessage:'',sentSubject:''});
 let s=initial();
 const version=()=>s.reply?'v2':'v1';
 const matches=()=>s.matching||s.reply;
 const sourceLabel=k=>({application:'Application v1 · p2',certificate:'Certificate '+version()+' · p1',request:'Request email · ¶2',loss:'Loss runs · Fax'})[k];
 function rows(){return[
  {id:'documents',title:'Required documents',finding:s.linked?'3 / 3 documents linked':'Loss runs not linked',detail:'Application · Certificate · Loss runs',sources:['application','certificate','loss'],status:s.review.documents,note:s.notes.documents},
  {id:'authorization',title:'Client authorization',finding:'$1,000,000 / occurrence',detail:'Extracted from client-request email',sources:['request'],status:s.review.authorization,note:s.notes.authorization},
  {id:'limits',title:'Coverage limits',finding:matches()?'$1,000,000 ↔ $1,000,000':'$1,000,000 ↔ $500,000',detail:matches()?'Matching candidate values':'Application / certificate differ',sources:['application','certificate','request'],status:s.review.limits,note:s.notes.limits},
  ...s.custom.map(c=>({...c,finding:c.action||'Reviewer-added item',detail:'Requires evidence review',sources:[c.source]}))
 ];}
 const allReviewed=()=>rows().every(r=>r.status==='verified');
 const ready=()=>s.linked&&matches()&&allReviewed();
 function event(title,detail=''){s.events.push({title,detail});}
 function gaps(){return rows().filter(r=>r.status==='correction'||r.status==='unclear').map(r=>{
  let action='';
  if(r.id==='documents')action=s.linked?'Clarify the required document set and provide the appropriate current document.':'Provide the loss runs and identify the submission and document period.';
  else if(r.id==='authorization')action=r.status==='unclear'?"Confirm the client's current authorized general liability limit and basis.":'Provide the current authorized client request or explain the authorization issue.';
  else if(r.id==='limits')action=r.status==='unclear'?'Clarify the coverage limit difference against the authorized client request.':'Review the application/certificate difference and supply the appropriate correction or explanation against the authorized request.';
  else action=r.action||('Please clarify: '+r.title+'.');
  return {...r,action,sourceText:r.sources.map(sourceLabel).join('; ')};
 });}
 function buildMail(){
  const items=gaps();
  const context=s.review.authorization==='verified'?'CONFIRMED CONTEXT\nClient request: $1,000,000 general liability per occurrence.\nSource: '+sourceLabel('request')+'.\n\n':'';
  return 'Hello,\n\nPlease help resolve the following items for Cedar Works LLC / MC-1042.\n\n'+context+'REQUESTED ITEMS\n'+items.map((g,i)=>(i+1)+'. '+g.title+'\n   Finding: '+g.finding+'\n   Request: '+g.action+(g.note?'\n   Reviewer note: '+g.note:'')+'\n   Sources: '+g.sourceText+'.').join('\n\n')+'\n\nPlease provide the relevant documents or clarification. We will review the response before clearing these items.\n\nThank you.';
 }
 function syncMail(){
  const next=buildMail();if(next===s.lastGenerated)return;
  if(s.mailEdited){s.mailStale=true;}else{q('mail-body').value=next;s.mailStale=false;}
  s.lastGenerated=next;
 }
 function renderRows(){
  q('review-rows').innerHTML=rows().map(r=>'<tr><td>'+esc(r.title)+'</td><td><span class="finding '+((r.id==='limits'&&!matches())||(r.id==='documents'&&!s.linked)?'attention':'')+'">'+esc(r.finding)+'</span><span class="finding-note">'+esc(r.detail)+'</span></td><td><div class="source-links">'+r.sources.map(k=>'<button class="text-action" data-source="'+k+'">'+esc(sourceLabel(k))+'</button>').join('')+'</div></td><td><select class="review-select '+r.status+'" data-review="'+r.id+'" aria-label="Review '+esc(r.title)+'">'+[['pending','Not reviewed'],['verified','✓ Verified'],['correction','× Needs correction'],['unclear','? Needs clarification']].map(([v,t])=>'<option value="'+v+'" '+(r.status===v?'selected':'')+'>'+t+'</option>').join('')+'</select>'+((r.status==='correction'||r.status==='unclear'||r.source)?'<textarea class="review-note" aria-label="Reviewer note for '+esc(r.title)+'" data-note="'+r.id+'" placeholder="'+(r.source?'Resolving evidence + source, before marking verified':'Optional detail for the request')+'">'+esc(r.note||'')+'</textarea>':'')+'</td></tr>').join('');
  q('review-rows').querySelectorAll('[data-review]').forEach(el=>el.addEventListener('change',()=>{
   const id=el.dataset.review,value=el.value,row=rows().find(r=>r.id===id);let error='';
   if(value==='verified'){
    if(id==='documents'&&!s.linked)error='Link the missing loss runs before verifying the document set.';
    else if(id==='limits'&&!matches())error='The limits still differ. Record a correction or clarification request.';
    else if(id==='limits'&&s.review.authorization!=='verified')error='Verify the authorized client request before confirming the limits.';
    else if(row.sources.some(k=>!s.viewed[k]))error='Open the linked sources before recording verification.';
    else if(row.source&&!row.note?.trim())error='Record the resolving evidence and source in the reviewer note.';
   }
   if(error){renderRows();q('review-feedback').textContent=error;return;}
   if(id in s.review)s.review[id]=value;else s.custom.find(c=>c.id===id).status=value;
   s.prepared=false;if(s.delivery==='reply')s.delivery='draft';
   q('review-feedback').textContent='';event(row.title+' · '+({pending:'Review reopened',verified:'Verified',correction:'Correction requested',unclear:'Clarification requested'})[value]);render();
  }));
  q('review-rows').querySelectorAll('[data-note]').forEach(el=>el.addEventListener('input',()=>{
   const id=el.dataset.note;if(id in s.notes)s.notes[id]=el.value;else s.custom.find(c=>c.id===id).note=el.value;
   syncMail();
  }));
 }
 function render(){
  [1,2,3].forEach(i=>q('step-'+i).hidden=s.step!==i);
  document.querySelectorAll('.rail [data-step]').forEach(b=>{if(Number(b.dataset.step)===s.step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  const items=gaps(),reviewed=rows().filter(r=>r.status==='verified').length,pending=rows().filter(r=>r.status==='pending').length;
  q('case-status').textContent=s.prepared?'Package prepared':ready()?'Ready for bind review':items.length?items.length+' item'+(items.length===1?'':'s')+' need follow-up':'Review in progress';q('case-status').className='badge '+(ready()?'good':'warn');
  q('source-count').textContent=(s.linked?'3':'2')+' / 3 required documents';q('loss-source-meta').textContent=s.linked?'Fax · Linked to MC-1042':'Source not linked';q('cert-source-meta').textContent=(s.reply?'Broker reply':'Broker email')+' · '+version()+' · p1';q('match-status').textContent=s.linked?'Linked':'Needs confirmation';q('match-status').className='badge '+(s.linked?'good':'warn');q('link-source').disabled=s.linked;q('link-source').textContent=s.linked?'Source linked':'Confirm match & link';
  q('review-count').textContent=reviewed+' / '+rows().length+' verified';q('checklist-summary').textContent=pending+' unreviewed · '+items.length+' follow-up';q('prepare-review').disabled=!ready();q('review-followup').textContent='Review follow-up'+(items.length?' ('+items.length+')':'')+' →';renderRows();syncMail();
  q('followup-heading').textContent=s.prepared?'Review package prepared.':ready()?'Ready for authorized review.':'Request the missing pieces.';
  q('delivery-status').textContent=s.prepared?'Prepared':s.delivery==='sent'?'Awaiting reply':s.reply&&pending?'Review reopened':'Draft';q('delivery-status').className='badge '+(ready()?'good':'warn');
  q('reply-notice').hidden=!s.reply||s.prepared||ready();
  q('ready-panel').hidden=!ready();q('prepare-final').hidden=s.prepared;q('prepared-message').textContent=s.prepared?'Package prepared · Policy not activated.':'';q('ready-sources').textContent='Application v1 · Certificate '+version()+' · Client-request email · Loss runs. All '+rows().length+' review items verified.';
  q('pending-panel').hidden=items.length>0||ready()||s.delivery==='sent';q('pending-copy').textContent=pending+' item'+(pending===1?' still needs':'s still need')+' your review.';
  q('compose-layout').hidden=!items.length||s.delivery==='sent'||s.prepared;
  q('gap-count').textContent=String(items.length);q('draft-origin').textContent='From '+items.length+' checklist item'+(items.length===1?'':'s');
  q('gap-items').innerHTML=items.map(g=>'<div class="gap-item"><strong>'+esc(g.title)+'</strong><span>'+(g.status==='unclear'?'? Clarification':'× Correction')+'</span><p>'+esc(g.action)+'</p><div class="source-links">'+g.sources.map(k=>'<button class="text-action" data-source="'+k+'">'+esc(sourceLabel(k))+'</button>').join('')+'</div></div>').join('');
  q('draft-change').hidden=!s.mailStale;q('previous-draft').hidden=!s.previousDraft;q('saved-draft').textContent=s.previousDraft;
  q('send-mail').disabled=!items.length||s.mailStale||!q('mail-body').value.trim()||!q('mail-subject').value.trim();
  q('sent-panel').hidden=s.delivery!=='sent';q('sent-summary').textContent=items.length+' requested item'+(items.length===1?'':'s')+' · Owner: underwriting assistant';q('sent-message').textContent=s.sentSubject+'\n\n'+s.sentMessage;
  q('activity-list').innerHTML=s.events.map(e=>'<div class="activity-row"><strong>'+esc(e.title)+'</strong>'+esc(e.detail)+'</div>').join('');
 }
 function showSource(key){
  s.viewed[key]=true;q('source-title').textContent=({application:'Application',certificate:'Certificate of insurance',request:'Client request',loss:'Loss runs'})[key];q('source-channel').textContent=sourceLabel(key);
  let fields=[];
  if(key==='application'||key==='certificate')fields=[['Named insured','Cedar Works LLC'],['Submission','MC-1042'],['Coverage','General liability'],['Basis','Per occurrence'],[key==='application'?'Requested limit':'Stated limit',key==='application'||matches()?'$1,000,000':'$500,000']];
  if(key==='loss')fields=[['Named insured','Cedar Works LLC'],['Submission','MC-1042'],['Period','2023–2026'],['Channel','Fax scan']];
  q('source-content').innerHTML=key==='request'?'<blockquote class="source-quote">Please arrange general liability at $1,000,000 per occurrence for Cedar Works LLC.</blockquote><p class="small muted">'+(s.reply?'Broker reply confirms this is the current client request.':'Forwarded client email. Confirm that this is the current authorized request.')+'</p>':'<dl>'+fields.map(([k,v])=>'<dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd>').join('')+'</dl>';
  q('source-dialog').showModal();
 }
 function prepare(){if(!ready())return;s.prepared=true;s.step=3;event('Bind-review package prepared','Reviewed source versions included. Policy not activated.');render();}
 function reset(matching){s=initial(matching);q('mail-body').value='';q('mail-subject').value='MC-1042 · Coverage review — information needed';q('review-feedback').textContent='';q('send-feedback').textContent='';q('custom-title').value='';q('custom-action').value='';render();}
 document.addEventListener('click',e=>{const source=e.target.closest('[data-source]');if(source)showSource(source.dataset.source);const step=e.target.closest('[data-step]');if(step){s.step=Number(step.dataset.step);render();}});
 q('close-source').addEventListener('click',()=>q('source-dialog').close());
 q('link-source').addEventListener('click',()=>{s.linked=true;s.viewed.loss=true;event('Loss runs linked','Fax matched to Cedar Works LLC / MC-1042.');render();});
 q('review-followup').addEventListener('click',()=>{s.step=3;render();});
 q('prepare-review').addEventListener('click',prepare);q('prepare-final').addEventListener('click',prepare);
 q('add-item').addEventListener('click',()=>{const title=q('custom-title').value.trim();if(!title){q('review-feedback').textContent='Name the requirement to add.';q('custom-title').focus();return;}s.custom.push({id:'custom-'+(s.custom.length+1),title,source:q('custom-source').value,action:q('custom-action').value.trim(),note:'',status:'unclear'});s.prepared=false;event('Reviewer added requirement',title);q('custom-title').value='';q('custom-action').value='';q('review-feedback').textContent='';render();});
 q('mail-body').addEventListener('input',()=>{s.mailEdited=true;q('send-mail').disabled=s.mailStale||!q('mail-body').value.trim()||!q('mail-subject').value.trim();});
 q('mail-subject').addEventListener('input',()=>{q('send-mail').disabled=s.mailStale||!q('mail-body').value.trim()||!q('mail-subject').value.trim();});
 q('refresh-mail').addEventListener('click',()=>{s.previousDraft=q('mail-body').value;s.mailEdited=false;s.mailStale=false;q('mail-body').value=buildMail();s.lastGenerated=buildMail();render();});
 q('send-mail').addEventListener('click',()=>{if(!gaps().length||s.mailStale||!q('mail-body').value.trim()||!q('mail-subject').value.trim())return;s.sentMessage=q('mail-body').value;s.sentSubject=q('mail-subject').value;s.delivery='sent';event('Request approved and marked sent',gaps().length+' checklist items. Demo only.');render();});
 q('load-reply').addEventListener('click',()=>{s.reply=true;s.delivery='reply';s.prepared=false;s.review.authorization='pending';s.review.limits='pending';s.viewed.request=false;s.viewed.certificate=false;s.mailEdited=false;s.mailStale=false;s.lastGenerated='';event('Broker reply received','Certificate v2 and current client request require review.');render();});
 q('matching-example').addEventListener('click',()=>reset(true));q('reset-example').addEventListener('click',()=>reset(false));render();
})();
