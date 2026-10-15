(()=>{
 const q=id=>document.getElementById(id);
 const initial=()=>({step:1,lossLinked:false,requestVerified:false,mismatchRecorded:false,sent:false,replyReceived:false,limitsReviewed:false,prepared:false,messageEdited:false});
 let state=initial();
 const events=[];
 const ready=()=>state.lossLinked&&state.requestVerified&&state.replyReceived&&state.limitsReviewed;
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const draft=()=>state.requestVerified
  ? 'Hello,\n\nFor Cedar Works LLC / MC-1042, the reviewed client request and application show general liability at $1,000,000 per occurrence. Certificate v1, page 1, states $500,000 for the same coverage and basis.\n\nPlease confirm the intended coverage against the authorized request and provide the appropriate corrected document or clarification. References: application p2, certificate p1, client-request email.\n\nBinding remains on hold until the required documents and limits are reviewed. Thank you.'
  : 'Hello,\n\nFor Cedar Works LLC / MC-1042, application v1, page 2, shows general liability at $1,000,000 per occurrence, while certificate v1, page 1, states $500,000.\n\nPlease confirm the client\'s authorized requirement and provide the appropriate corrected document or clarification. Neither document is being treated as automatically correct.\n\nBinding remains on hold pending review. Thank you.';
 function event(title,detail){events.push({title,detail});}
 function gates(){
  const checks=[
   [state.lossLinked,'Required source groups linked',state.lossLinked?'Application, certificate and loss runs are linked.':'Loss runs still need a confirmed source match.'],
   [state.requestVerified,'Authorized request checked',state.requestVerified?'Reviewer checked the source and $1,000,000 request.':'A reviewer must establish the authorized baseline.'],
   [state.replyReceived&&state.limitsReviewed,'Current limits reviewed and resolved',state.limitsReviewed?'Reviewer checked certificate v2 against the request.':state.replyReceived?'New certificate v2 is awaiting human review.':'Coverage-limit discrepancy remains unresolved.']
  ];
  document.querySelectorAll('[data-gate]').forEach(el=>{
   el.innerHTML='<h2>Bind-review readiness</h2><p class="small muted">Missing required evidence or unresolved limits blocks advancement.</p><ul class="gate-list">'+checks.map(([done,title,detail])=>'<li><span class="dot '+(done?'done':'')+'"></span><div><strong>'+title+'</strong><br><span class="muted">'+detail+'</span></div></li>').join('')+'</ul><button class="button primary prepare-btn" '+(ready()?'':'disabled')+'>Prepare authorized bind review</button><p class="small muted" style="margin:10px 0 0">This prepares a review package. It does not activate a policy.</p>';
   el.querySelector('.prepare-btn').addEventListener('click',()=>{if(!ready())return;state.prepared=true;state.step=3;event('Review package prepared','Sources and reviewed versions are included. Policy not bound.');render();q('handoff-result').scrollIntoView({behavior:'smooth',block:'center'});});
  });
 }
 function render(){
  for(let i=1;i<=3;i++)q('screen-'+i).hidden=state.step!==i;
  document.querySelectorAll('.step-btn').forEach(b=>{if(Number(b.dataset.step)===state.step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  q('global-status').textContent=state.prepared?'Package prepared · Policy not bound':ready()?'Ready for authorized bind review':'Not ready for bind review';
  q('global-status').className='badge '+(ready()?'good':'error');
  q('doc-count').textContent=(state.lossLinked?'3':'2')+' of 3 document groups linked';
  q('loss-meta').textContent=state.lossLinked?'Fax scan · Submission match confirmed by reviewer':'Required source not linked';
  q('loss-status').textContent=state.lossLinked?'Linked by reviewer':'Missing';q('loss-status').className='badge '+(state.lossLinked?'good':'warn');
  q('link-loss').disabled=state.lossLinked;q('link-loss').textContent=state.lossLinked?'Source linked':'Confirm match and link source';
  q('link-feedback').textContent=state.lossLinked?'Source identity checked and linked. Coverage review is still separate.':'';
  q('coi-meta').textContent=state.replyReceived?'Broker reply · Certificate v2 · '+(state.limitsReviewed?'Reviewed against client request':'Review reopened'):'Broker email · Certificate v1, page 1 · Possible mismatch';
  q('certificate-version').textContent=(state.replyReceived?'v2':'v1')+' · Page 1';
  q('certificate-limit').textContent=state.replyReceived?'$1,000,000':'$500,000';
  q('certificate-meta').textContent='Original excerpt · '+(state.replyReceived?'New broker reply':'Broker email')+' · Illustrative document';
  q('certificate-note').textContent=state.replyReceived?'A new version is evidence to review, not automatic resolution.':'The difference needs review, not an automatic correction.';
  q('comparison-status').textContent=state.limitsReviewed?'Limits reviewed':state.replyReceived?'New version · Review required':state.mismatchRecorded?'Discrepancy recorded':'Possible limit mismatch';
  q('comparison-status').className='badge '+(state.limitsReviewed?'good':state.replyReceived?'warn':'error');
  q('difference-banner').className='info-strip '+(state.limitsReviewed?'':state.replyReceived?'warn':'error');
  q('difference-title').textContent=state.limitsReviewed?'Reviewer confirmed the current limits against the authorized request.':state.replyReceived?'New certificate v2 received. Review is reopened.':'AI found different limits. Neither document is automatically correct.';
  q('difference-copy').textContent=state.limitsReviewed?'The required document checks and authorized binding review remain separate.':'Check the same coverage type and basis, then confirm the client\'s authorized requirement.';
  q('request-source').textContent=(state.replyReceived?'Client request confirmed in broker reply':'Client request forwarded by broker')+' · Email, paragraph 2 · Sample data';
  q('verify-request').textContent=state.requestVerified?'Request source and limit checked':'Confirm request source and limit';q('verify-request').disabled=state.requestVerified;
  q('request-feedback').textContent=state.requestVerified?'Reviewer confirmed the authorized request from the source.':'';
  q('record-mismatch').hidden=state.replyReceived;q('confirm-match').hidden=!state.replyReceived;
  q('confirm-match').disabled=!state.requestVerified||state.limitsReviewed;
  q('comparison-feedback').textContent=state.limitsReviewed?'Current version reviewed. Continue using step 3: Resolve & hand off.':state.replyReceived&&!state.requestVerified?'Check the new reply and confirm the authorized request before accepting the match.':'';
  q('resolution-status').textContent=state.prepared?'Package prepared':state.limitsReviewed?'Resolved after review':state.replyReceived?'New evidence · Review needed':state.sent?'Awaiting broker response':state.mismatchRecorded?'Draft ready for review':'Discrepancy not yet recorded';
  q('resolution-status').className='badge '+(state.limitsReviewed?'good':'warn');
  q('request-panel').hidden=state.replyReceived;q('waiting-panel').hidden=!state.sent||state.replyReceived;q('reply-panel').hidden=!state.replyReceived||state.limitsReviewed;
  if(!state.messageEdited&&!state.sent)q('broker-message').value=draft();
  q('broker-message').disabled=state.sent;
  q('send-request').disabled=!state.mismatchRecorded||state.sent;
  q('send-feedback').textContent=state.sent?'Approved by reviewer and marked sent in this demo. No real email was sent.':!state.mismatchRecorded?'First inspect the comparison and record the discrepancy.':'';
  q('handoff-result').hidden=!state.prepared;
  q('issue-history').innerHTML=(events.length?events:[{title:'Open review',detail:'Documents and candidate differences need checking.'}]).map(e=>'<div class="event"><strong>'+escape(e.title)+'</strong><p>'+escape(e.detail)+'</p></div>').join('');
  gates();
 }
 document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{state.step=Number(b.dataset.step);render();}));
 q('link-loss').addEventListener('click',()=>{state.lossLinked=true;event('Loss runs source linked','Reviewer confirmed MC-1042 and the named insured in the fax preview.');render();});
 q('verify-request').addEventListener('click',()=>{state.requestVerified=true;event('Authorized request checked','Reviewer confirmed the request source and limit basis.');render();});
 q('record-mismatch').addEventListener('click',()=>{state.mismatchRecorded=true;state.step=3;event('Discrepancy recorded','Application and certificate differ for the same coverage and limit basis.');render();});
 q('broker-message').addEventListener('input',()=>{state.messageEdited=true;});
 q('send-request').addEventListener('click',()=>{if(!state.mismatchRecorded||state.sent)return;if(!q('broker-message').value.trim()){q('send-feedback').textContent='Write a specific request before sending.';q('broker-message').focus();return;}state.sent=true;event('Request approved and marked sent','Human reviewed the outgoing draft. Demo only; no email delivery.');render();});
 q('load-reply').addEventListener('click',()=>{state.replyReceived=true;state.requestVerified=false;state.limitsReviewed=false;state.prepared=false;event('Broker reply and certificate v2 received','New evidence requires review. The issue is not automatically closed.');render();});
 q('confirm-match').addEventListener('click',()=>{if(!state.replyReceived||!state.requestVerified)return;state.limitsReviewed=true;event('Current limits reviewed','Reviewer compared certificate v2 with the authorized client request.');render();});
 q('reset-demo').addEventListener('click',()=>{state=initial();events.length=0;render();});
 render();
})();
