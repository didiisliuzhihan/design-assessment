(()=>{
 const q=id=>document.getElementById(id);
 const initial=(matching=false)=>({step:1,matching,lossLinked:false,requestVerified:false,mismatchRecorded:false,sent:false,replyReceived:false,limitsReviewed:false,prepared:false,pendingConcern:false,concern:'',askBaseline:true,askCorrection:!matching,special:'',draftDirty:false,messageEdited:false});
 let state=initial(); const events=[];
 const valuesMatch=()=>state.matching||state.replyReceived;
 const version=()=>state.replyReceived?'v2':'v1';
 const ready=()=>state.lossLinked&&state.requestVerified&&state.limitsReviewed&&!state.pendingConcern&&valuesMatch();
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const hasRequest=()=>state.askBaseline||state.askCorrection||state.special.trim();
 const draft=()=>{
  const requests=[];
  if(state.askBaseline)requests.push('Please confirm the client\'s authorized general liability limit and coverage basis.');
  if(state.askCorrection)requests.push('Please check the application/certificate difference against the authorized request and supply the appropriate corrected document or explanation.');
  if(state.special.trim())requests.push(state.special.trim());
  return 'Hello,\n\nFor Cedar Works LLC / MC-1042, application v1, page 2, states general liability at $1,000,000 per occurrence. Certificate '+version()+', page 1, states '+(valuesMatch()?'$1,000,000':'$500,000')+' for the same coverage and basis.\n'+(state.requestVerified?'The reviewer checked the client-request email, paragraph 2: $1,000,000 per occurrence.':'The client-request email, paragraph 2, still needs authorization review; neither document is automatically correct.')+'\n\n'+requests.map((s,i)=>(i+1)+'. '+s).join('\n')+'\n\nReferences: application p2, certificate p1, client-request email. Binding remains on hold until all required evidence is reviewed and outstanding issues are resolved. Thank you.';
 };
 function event(title,detail){events.push({title,detail});}
 function gates(){
  const checks=[
   [state.lossLinked,'Required source groups linked',state.lossLinked?'Application, certificate and loss runs linked.':'Loss runs need a confirmed source match.'],
   [state.requestVerified,'Authorized request checked',state.requestVerified?'Reviewer checked the source and $1,000,000 request.':'Establish the current authorized requirement.'],
   [state.limitsReviewed&&valuesMatch(),'Current limits reviewed',state.limitsReviewed?'Certificate '+version()+' checked against the request.':valuesMatch()?'Matching candidate values still need human review.':'Coverage-limit discrepancy remains unresolved.'],
   [!state.pendingConcern,'Reviewer-raised concerns',state.pendingConcern?state.concern:'No open reviewer-raised concern.']
  ];
  document.querySelectorAll('[data-gate]').forEach(el=>{
   el.innerHTML='<h2>Bind-review readiness</h2><p class="small muted">Missing required evidence or unresolved limits blocks readiness.</p><ul class="gate-list">'+checks.map(([done,title,detail])=>'<li><span class="dot '+(done?'done':'')+'"></span><div><strong>'+escape(title)+'</strong><br><span class="muted">'+escape(detail)+'</span></div></li>').join('')+'</ul><button class="button primary prepare-btn" '+(ready()?'':'disabled')+'>Prepare authorized bind review</button><p class="small muted" style="margin:10px 0 0">Prepares a review package; does not activate a policy.</p>';
   el.querySelector('.prepare-btn').addEventListener('click',()=>{if(!ready())return;state.prepared=true;state.step=3;event('Review package prepared','Reviewed versions and decisions included. Policy not bound.');render();q('handoff-result').scrollIntoView({behavior:'smooth',block:'center'});});
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
  q('link-feedback').textContent=state.lossLinked?'Source match checked. Content review remains separate.':'';
  q('coi-meta').textContent=(state.replyReceived?'Broker reply':'Broker email')+' · Certificate '+version()+' · '+(state.limitsReviewed?'Reviewed against request':valuesMatch()?'Review needed':'Possible mismatch');
  q('certificate-version').textContent=version()+' · Page 1';
  q('certificate-limit').textContent=valuesMatch()?'$1,000,000':'$500,000';
  q('certificate-meta').textContent='Original excerpt · '+(state.replyReceived?'New broker reply':'Broker email')+' · Illustrative document';
  q('certificate-note').textContent=valuesMatch()?'Matching values do not establish that all requirements are satisfied.':'The difference needs review, not an automatic correction.';
  q('comparison-status').textContent=state.pendingConcern?'Reviewer concern open':state.limitsReviewed?'Limits reviewed':valuesMatch()?'Matching candidates · Review needed':'Possible limit mismatch';
  q('comparison-heading').textContent=valuesMatch()?'Matching values still need review.':'Different values. One decision to verify.';
  q('comparison-status').className='badge '+(state.limitsReviewed&&!state.pendingConcern?'good':'warn');
  q('difference-banner').className='info-strip '+(state.limitsReviewed?'':valuesMatch()?'warn':'error');
  q('difference-title').textContent=state.limitsReviewed?'Reviewer checked the current limits against the request.':state.replyReceived?'New certificate received. Review is reopened.':state.matching?'AI did not flag a limit difference. Human review is still needed.':'AI found different limits. Neither document is automatically correct.';
  q('difference-copy').textContent='Inspect originals, coverage basis and the current authorized request. Record any issue the AI did not identify.';
  q('request-source').textContent=(state.replyReceived?'Client request confirmed in broker reply':'Client request forwarded by broker')+' · Email, paragraph 2 · Sample data';
  q('verify-request').textContent=state.requestVerified?'Request source and limit checked':'Confirm request source and limit';q('verify-request').disabled=state.requestVerified;
  q('request-feedback').textContent=state.requestVerified?'Reviewer confirmed the current authorized requirement.':'';
  q('record-mismatch').hidden=valuesMatch();q('confirm-match').hidden=!valuesMatch();
  q('confirm-match').textContent=state.replyReceived?'Confirm revised limits match the request':'Confirm current limits match the request';
  q('confirm-match').disabled=!state.requestVerified||state.limitsReviewed;
  q('comparison-feedback').textContent=state.limitsReviewed?'Current limits reviewed. Check remaining readiness items.':valuesMatch()&&!state.requestVerified?'Confirm the authorized request before accepting the match.':'';
  q('manual-concern').disabled=state.pendingConcern;
  q('raise-concern').hidden=state.pendingConcern;
  q('concern-resolution').hidden=!state.pendingConcern;
  q('concern-summary').textContent='Open concern: '+state.concern;
  q('resolve-concern').disabled=!state.requestVerified||!state.limitsReviewed;
  q('resolution-status').textContent=state.prepared?'Package prepared':state.pendingConcern?'Reviewer concern open':ready()?'Ready for handoff':state.replyReceived?'New evidence · Review needed':state.sent?'Awaiting broker response':state.mismatchRecorded?'Request ready to draft':'No request recorded';
  q('resolution-status').className='badge '+(ready()?'good':'warn');
  q('request-panel').hidden=state.replyReceived||state.prepared||(state.matching&&!state.mismatchRecorded);
  q('waiting-panel').hidden=!state.sent||state.replyReceived||state.prepared;
  q('reply-panel').hidden=!state.replyReceived||state.prepared||(state.limitsReviewed&&!state.pendingConcern);
  q('baseline-item').hidden=state.requestVerified;
  q('baseline-context').hidden=!state.requestVerified;
  q('ask-baseline').checked=state.askBaseline;q('ask-baseline').disabled=state.sent;
  q('correction-item').hidden=state.matching&&!state.replyReceived;
  q('ask-correction').checked=state.askCorrection;q('ask-correction').disabled=state.sent;
  q('request-cert-version').textContent=version();
  q('special-request').value=state.special;q('special-request').disabled=state.sent;q('update-draft').disabled=state.sent;
  if(!state.messageEdited&&!state.sent&&!state.draftDirty)q('broker-message').value=draft();
  q('broker-message').disabled=state.sent;
  q('send-request').disabled=!state.mismatchRecorded||state.sent||state.draftDirty||!hasRequest();
  q('send-feedback').textContent=state.sent?'Human-approved and marked sent in this demo. No real email sent.':state.draftDirty?'Selected requests changed. Update the draft, then review it.':!state.mismatchRecorded?'Inspect the comparison and record an issue before sending.':!hasRequest()?'Choose or add a specific request.':'';
  q('handoff-result').hidden=!state.prepared;
  q('package-sources').textContent='Application v1 / p2 · Certificate '+version()+' / p1 · Reviewed client-request email · Loss runs fax linked to MC-1042.';
  q('issue-history').innerHTML=(events.length?events:[{title:'Open review',detail:'Sources and candidate values need checking.'}]).map(e=>'<div class="event"><strong>'+escape(e.title)+'</strong><p>'+escape(e.detail)+'</p></div>').join('');
  gates();
 }
 function reset(matching){state=initial(matching);events.length=0;q('manual-concern').value='';q('resolution-note').value='';q('concern-feedback').textContent='';render();}
 document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{state.step=Number(b.dataset.step);render();}));
 q('link-loss').addEventListener('click',()=>{state.lossLinked=true;event('Loss runs linked','Reviewer checked submission reference MC-1042 and the named insured.');render();});
 q('verify-request').addEventListener('click',()=>{state.requestVerified=true;state.askBaseline=false;event('Authorized request checked','Reviewer checked source, authorization and coverage basis.');render();});
 q('record-mismatch').addEventListener('click',()=>{state.mismatchRecorded=true;state.step=3;event('Discrepancy recorded','Application and certificate limits differ for the same coverage and basis.');render();});
 q('raise-concern').addEventListener('click',()=>{const reason=q('manual-concern').value.trim();if(!reason){q('concern-feedback').textContent='Describe the concern and source first.';return;}state.pendingConcern=true;state.concern=reason;state.prepared=false;state.requestVerified=false;state.limitsReviewed=false;state.askBaseline=true;state.mismatchRecorded=true;state.special=reason;state.draftDirty=true;state.step=3;event('Reviewer raised concern',reason);render();});
 q('resolve-concern').addEventListener('click',()=>{if(!state.requestVerified||!state.limitsReviewed)return;const note=q('resolution-note').value.trim();if(!note){q('concern-feedback').textContent='Record the resolving evidence and its source.';return;}event('Reviewer resolved concern',note);state.pendingConcern=false;state.concern='';q('manual-concern').value='';q('resolution-note').value='';q('concern-feedback').textContent='Resolution recorded with the reviewer\'s evidence note.';render();});
 ['ask-baseline','ask-correction'].forEach(id=>q(id).addEventListener('change',()=>{state[id==='ask-baseline'?'askBaseline':'askCorrection']=q(id).checked;state.draftDirty=true;render();}));
 q('special-request').addEventListener('input',()=>{state.special=q('special-request').value;state.draftDirty=true;q('send-request').disabled=true;q('send-feedback').textContent='Requests changed. Update the draft, then review it.';});
 q('update-draft').addEventListener('click',()=>{state.draftDirty=false;state.messageEdited=false;q('broker-message').value=draft();render();});
 q('broker-message').addEventListener('input',()=>{state.messageEdited=true;});
 q('send-request').addEventListener('click',()=>{if(!state.mismatchRecorded||state.sent||state.draftDirty||!hasRequest())return;if(!q('broker-message').value.trim()){q('send-feedback').textContent='Write a specific request before sending.';return;}state.sent=true;event('Request approved and marked sent','Human checked the editable request. Demo: no email delivery.');render();});
 q('load-reply').addEventListener('click',()=>{state.replyReceived=true;state.requestVerified=false;state.limitsReviewed=false;state.prepared=false;event('Broker reply and certificate v2 received','New version reopens review. Reviewer-raised concerns remain open.');render();});
 q('confirm-match').addEventListener('click',()=>{if(!valuesMatch()||!state.requestVerified)return;state.limitsReviewed=true;event('Current limits reviewed','Reviewer compared certificate '+version()+' with the authorized request.');render();});
 q('reset-demo').addEventListener('click',()=>reset(false));q('matching-demo').addEventListener('click',()=>reset(true));
 render();
})();
