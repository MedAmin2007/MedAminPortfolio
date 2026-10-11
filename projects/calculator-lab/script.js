"use strict";
(function(){
const HOST=document.getElementById('app1'),ROOT=HOST.attachShadow({mode:'open'});
ROOT.appendChild(document.getElementById('tpl1').content.cloneNode(true));
const RT=ROOT.querySelector('.root'),LINK=ROOT.querySelector('link');let started=false;
const start=()=>{if(started)return;started=true;

const $=s=>ROOT.querySelector(s),$$=s=>[...ROOT.querySelectorAll(s)];
const A=[1,0,1,0],B=[1,0,0,1];
let c=0;const cols=[3,2,1,0].map(i=>{const a=A[i],b=B[i],p=a^b,g=a&b,h=p&c,s=p^c,o=g|h,r={i,a,b,cin:c,p,g,h,s,o};c=o;return r});
const bitsOut=[cols[3].o,...cols.slice().reverse().map(x=>x.s)];
const total=cols.length+2;
const NAV=[['Binary inputs',0],['Bit-by-bit addition',1],['Inside the full adder',1],['Final result',total-1]];
let step=0,timer=null;
const mk=a=>a.map((v,i)=>`<span class="bit" data-i="${i}">${v}</span>`).join('');
$('#bA').innerHTML=mk(A);$('#bB').innerHTML=mk(B);
$('#nav').innerHTML=NAV.map((n,k)=>`<button class="step" data-k="${k}"><b>${k+1}</b>${n[0]}</button>`).join('');
$('#adders').innerHTML=cols.map(x=>`<div class="ad"><h3>Bit ${x.i} <span class="mut">(${2**x.i})</span></h3>A=${x.a} B=${x.b}<br>Cin=${x.cin}<br>S=<b style="color:var(--acc)">${x.s}</b> Co=<b style="color:var(--acc2)">${x.o}</b></div>`).join('');
$('#res').innerHTML='<span class="mut">MSB</span>'+bitsOut.map(()=>'<span class="ob">·</span>').join('')+'<span class="mut">LSB</span>';
const W={wA1:'a',wA2:'a',wB1:'b',wB2:'b',wP1:'p',wP2:'p',wC1:'cin',wC2:'cin',wG:'g',wH:'h',wS:'s',wO:'o'};
const DELAY={wA1:0,wA2:0,wB1:0,wB2:0,wC1:0,wC2:0,wP1:.25,wP2:.25,wG:.25,wH:.5,wS:.6,wO:.75};
function circuit(x){
 Object.entries(W).forEach(([id,k])=>{const e=$('#'+id);e.classList.remove('hi');if(x&&x[k]){void e.getBoundingClientRect();e.style.setProperty('--d',DELAY[id]+'s');e.classList.add('hi')}});
 [['lA','a'],['lB','b'],['lC','cin'],['lS','s'],['lO','o']].forEach(([id,k])=>$('#'+id).classList.toggle('hi',!!(x&&x[k])));
 $('#vS').textContent=x?x.s:0;$('#vO').textContent=x?x.o:0;
 $('#cstat').textContent=x?`A=${x.a}, B=${x.b}, Cin=${x.cin} → P=${x.p}, A·B=${x.g}, P·Cin=${x.h} → Sum=${x.s}, Cout=${x.o}`:'Step to a bit position to animate the signals.'}
function render(){
 const col=step>=1&&step<=cols.length?step-1:-1,x=col>=0?cols[col]:null,stage=step===0?0:step===total-1?3:1;
 $$('.step').forEach((b,k)=>{const on=k===(step===0?0:step===total-1?3:1);b.classList.toggle('active',on);on?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current')});
 $$('.card').forEach((e,k)=>e.classList.toggle('on',stage===1?(k===1||k===2):k===stage));
 $('#prog').style.width=(step/(total-1)*100)+'%';
 $$('.ad').forEach((e,k)=>e.classList.toggle('cur',k===col));
 $$('.bit').forEach(e=>e.classList.toggle('hot',!!x&&+e.dataset.i===3-col));
 const slots=$$('.ob');
 slots.forEach((e,k)=>{const rev=k===0?step>=cols.length:step>=(cols.length-k)+1;e.classList.toggle('show',rev);e.textContent=rev?bitsOut[k]:'·'});
 $('#status').textContent=step===0?'10 = 1010₂ and 9 = 1001₂. Addition starts at the rightmost bit.':x?`Bit ${x.i}: ${x.a} + ${x.b} + carry ${x.cin} = ${x.a+x.b+x.cin} → Sum ${x.s}, Carry out ${x.o}.`:'Final result: 10011₂ = 16 + 2 + 1 = 19.';
 circuit(x);
 $('#play').textContent=timer?'❚❚ Pause':'▶ Play';
}
function go(n){step=Math.max(0,Math.min(total-1,n));render()}
function stop(){clearInterval(timer);timer=null}
function play(){if(timer){stop();render();return}if(step>=total-1)step=-1;const t=()=>{if(step>=total-1){stop();render();return}go(step+1);if(step>=total-1){stop();render()}};t();timer=setInterval(t,+$('#speed').value);render()}
$('#play').onclick=play;
$('#next').onclick=()=>{stop();go(step+1)};$('#prev').onclick=()=>{stop();go(step-1)};
$('#reset').onclick=()=>{stop();go(0)};
$('#nav').onclick=e=>{const b=e.target.closest('.step');if(!b)return;stop();go(NAV[b.dataset.k][1]);$('#c'+(b.dataset.k==2?2:b.dataset.k)).scrollIntoView({block:'nearest'})};
$('#speed').onchange=()=>{if(timer){stop();play()}};
addEventListener('keydown',e=>{if(HOST.parentElement.hidden)return;if(e.composedPath()[0].matches('input,button'))return;if(e.key==='ArrowRight'){stop();go(step+1)}else if(e.key==='ArrowLeft'){stop();go(step-1)}else if(e.key===' '){e.preventDefault();play()}});
let th='dark';try{th=localStorage.getItem('th')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(_){}
const setTh=t=>{th=t;RT.dataset.theme=t;try{localStorage.setItem('th',t)}catch(_){}};setTh(th);
$('#theme').onclick=()=>setTh(th==='dark'?'light':'dark');
go(0);

};
LINK.addEventListener('load',start);LINK.addEventListener('error',start);setTimeout(start,1500);
})();
(function(){
const HOST=document.getElementById('app2'),ROOT=HOST.attachShadow({mode:'open'});
ROOT.appendChild(document.getElementById('tpl2').content.cloneNode(true));
const RT=ROOT.querySelector('.root'),LINK=ROOT.querySelector('link');let started=false;
const start=()=>{if(started)return;started=true;

const $=s=>ROOT.querySelector(s),KEYS=[['7','8','9','÷'],['4','5','6','×'],['1','2','3','−'],['C','0','=','+']],b8=v=>v.toString(2).padStart(8,'0'),PH=['Keypad','CPU','ALU','BCD','Display'];
const SEG={0:'abcdef',1:'bc',2:'abdeg',3:'abcdg',4:'bcfg',5:'acdfg',6:'acdefg',7:'abc',8:'abcdefg',9:'abcdfg'},R={a:[8,2,24,6],b:[32,10,6,24],c:[32,38,6,24],d:[8,64,24,6],e:[2,38,6,24],f:[2,10,6,24],g:[8,33,24,6]};
const sv=ch=>`<svg viewBox="0 0 40 72">${Object.keys(R).map(k=>`<rect x="${R[k][0]}" y="${R[k][1]}" width="${R[k][2]}" height="${R[k][3]}" rx="2" class="${ch!==''&&SEG[ch].includes(k)?'o':''}"/>`).join('')}</svg>`;
const pos=k=>{for(let r=0;r<4;r++){const c=KEYS[r].indexOf(k);if(c>=0)return[r,c]}};
let S=[],i=0,timer=null;
function build(a,b){S=[];const sum=a+b;let st={buf:0,opA:null,opB:null,R1:null,R2:null,R3:null,pc:0,ir:'—',cu:'IDLE',key:null,alu:-1,seg:'0',dd:null,cf:0,zf:0,cy:[]};
 const P=(ph,txt,o={})=>{st={...st,...o,ph};S.push({...st,txt})};
 const keys=[...String(a),'+',...String(b),'='];
 keys.forEach(k=>{const[r,c]=pos(k),code=((r<<2)|c).toString(2).padStart(4,'0');let o={key:k,scan:`Row ${r} driven HIGH → column ${c} reads HIGH → encoder outputs code ${code}`};let t;
  if(k==='+'){o.opA=st.buf;o.buf=0;t=`Key +: value ${st.buf} is latched into operand A, the ADD operation is stored, and the buffer is cleared.`}
  else if(k==='='){o.opB=st.buf;o.buf=0;t=`Key =: value ${st.buf} is latched as operand B and the control unit starts the microprogram.`}
  else{const d=+k,x=st.buf,n=x*10+d;o.buf=n;o.seg=String(n);t=`Digit ${d}: buffer = ${x}×10 + ${d}. Multiply by 10 with shifts: (${x}<<3)+(${x}<<1) = ${x*10}, then add → ${n}.`}
  P(0,`Key "${k}" pressed: the row and column lines close a circuit and the encoder outputs code ${code}. ${t}`,o)});
 const asm=[`LOAD R1, ${a}`,`LOAD R2, ${b}`,'ADD R3, R1, R2','OUT R3'],ex=[`R1 ← ${a} (${b8(a)})`,`R2 ← ${b} (${b8(b)})`,'ALU computes R1 + R2 (see the next steps)','Output ← R3 to the BCD converter'],dc=['opcode=LOAD: control signal enables the R1 input','opcode=LOAD: control signal enables the R2 input','opcode=ADD: select the add operation in the ALU (SEL=00)','opcode=OUT: enable the output bus'];
 asm.forEach((ins,n)=>{P(1,`FETCH: address PC=${n} goes to program memory, instruction "${ins}" is loaded into IR, then PC ← PC+1.`,{cu:'FETCH',ir:ins,pc:n+1,key:null});
  P(1,`DECODE: ${dc[n]}.`,{cu:'DECODE'});
  if(n===0)P(1,`EXECUTE: ${ex[n]}.`,{cu:'EXECUTE',R1:a});else if(n===1)P(1,`EXECUTE: ${ex[n]}.`,{cu:'EXECUTE',R2:b});
  else if(n===2){P(1,`EXECUTE: ${ex[n]}.`,{cu:'EXECUTE'});let cy=[];for(let j=0;j<8;j++){const x=a>>j&1,y=b>>j&1,c=j?cy[j-1]:0,p=x^y,g=x&y,s=p^c,co=g|(p&c);cy[j]=co;
    P(2,`Bit ${j}: ${x} + ${y} + Cin ${c} = ${x+y+c} → Sum ${s}, Cout ${co}.`,{alu:j,cy:[...cy],gt:`P = ${x}⊕${y} = ${p} | G = ${x}·${y} = ${g} | S = ${p}⊕${c} = ${s} | Cout = ${g} + ${p}·${c} = ${co}`,R3:j===7?sum:st.R3,cf:j===7?co:0,zf:j===7&&sum===0?1:0})}
   S[S.length-1].txt+=` Addition done: R3 = ${b8(sum)} = ${sum}, flag Z=${sum===0?1:0}, flag C=${st.cf}.`}
  else P(1,`EXECUTE: ${ex[n]}.`,{cu:'EXECUTE',alu:-1})});
 let bcd=0,bin=sum;P(3,`Load binary ${b8(sum)} into the shift register; the BCD digits start at zero.`,{dd:{bcd,bin,n:0}});
 for(let n=1;n<=8;n++){let adj='';for(let q=0;q<3;q++){if(((bcd>>(4*q))&15)>=5){bcd+=3<<(4*q);adj+=` +3 to the ${['units','tens','hundreds'][q]} digit,`}}
  bcd=(bcd<<1)|(bin>>7&1);bin=(bin<<1)&255;P(3,`Shift ${n}/8:${adj||' no correction needed (every digit < 5),'} then shift the whole register left by one bit.`,{dd:{bcd,bin,n}})}
 P(4,`The 7-segment decoder turns each BCD digit into 7 signals (a–g). Display shows: ${sum}.`,{seg:String(sum),cu:'HALT',key:null});
 const sl=$('#sl');sl.max=S.length-1;i=0;render()}
function render(){const s=S[i];$('#sl').value=i;
 $('#ph').innerHTML=PH.map((n,k)=>`<span class="${k===s.ph?'on':''}">${k+1}. ${n}</span>`).join('');
 ROOT.querySelectorAll('.c').forEach((e,k)=>e.classList.toggle('on',k===s.ph));
 $('#kp').innerHTML=KEYS.flat().map(k=>`<div class="k ${k===s.key?'hot':''}">${k}</div>`).join('');
 const sc=[...S.slice(0,i+1)].reverse().find(x=>x.scan);$('#scan').textContent=s.ph===0&&s.scan?s.scan:'(Keys are scanned thousands of times per second, waiting for a press)';
 const bt=(v,l)=>v==null?'—':`<span class="bt ${l?'ch':''}">${b8(v)}</span> = ${v}`;
 $('#cpu').innerHTML=`<b>CU</b><span class="cu">${s.cu}</span><span></span><b>PC</b><span>${s.pc}</span><span></span><b>IR</b><span>${s.ir}</span><span></span><b>OP-A</b><span>${bt(s.opA)}</span><span></span><b>OP-B</b><span>${bt(s.opB)}</span><span></span><b>R1</b><span>${bt(s.R1,s.ph===1&&s.cu==='EXECUTE'&&s.ir.startsWith('LOAD R1'))}</span><span></span><b>R2</b><span>${bt(s.R2,s.ph===1&&s.cu==='EXECUTE'&&s.ir.startsWith('LOAD R2'))}</span><span></span><b>R3</b><span>${bt(s.R3,s.ph===2)}</span><span></span><b>FLAGS</b><span>Z=${s.zf} C=${s.cf}</span><span></span>`;
 let t='<table><tr><th></th>';for(let j=7;j>=0;j--)t+=`<th class="${j===s.alu?'h':''}">${j}</th>`;t+='</tr>';
 const row=(n,f)=>{t+=`<tr><th>${n}</th>`;for(let j=7;j>=0;j--)t+=`<td class="${j===s.alu?'h':''}">${f(j)}</td>`;t+='</tr>'},A=s.R1,B=s.R2,on=j=>s.alu>=j;
 row('R1',j=>A==null?'·':A>>j&1);row('R2',j=>B==null?'·':B>>j&1);row('Cin',j=>on(j)?(j?s.cy[j-1]:0):'·');row('Sum',j=>on(j)?(s.R3!=null&&s.alu===7?s.R3>>j&1:(()=>{const x=A>>j&1,y=B>>j&1,c=j?s.cy[j-1]:0;return x^y^c})()):'·');row('Cout',j=>on(j)?s.cy[j]:'·');
 $('#alu').innerHTML=t+'</table>';$('#gates').textContent=s.ph===2&&s.gt?s.gt:'Each full adder = 2 XOR gates + 2 AND gates + 1 OR gate.';
 const d=s.dd;$('#dd').innerHTML=d?`<b>Hundreds</b><span class="bt">${(d.bcd>>8&15).toString(2).padStart(4,'0')}</span><span>${d.bcd>>8&15}</span><b>Tens</b><span class="bt">${(d.bcd>>4&15).toString(2).padStart(4,'0')}</span><span>${d.bcd>>4&15}</span><b>Units</b><span class="bt">${(d.bcd&15).toString(2).padStart(4,'0')}</span><span>${d.bcd&15}</span><b>Binary</b><span class="bt">${b8(d.bin)}</span><span>${d.n}/8</span>`:'<span class="mut">Waiting for the ALU result…</span>';
 const str=s.seg.padStart(3,' ');$('#seg').innerHTML=[...str].map(c=>sv(c===' '?'':c)).join('');
 $('#sgt').textContent=s.ph===4?[...s.seg].map(c=>`${c} ← ${[...'abcdefg'].map(k=>SEG[c].includes(k)?k:'').join('')}`).join(' | '):'';
 $('#tx').textContent=`(${i+1}/${S.length}) ${s.txt}`;$('#pl').textContent=timer?'❚❚ Pause':'▶ Play'}
const stop=()=>{clearInterval(timer);timer=null},go=n=>{i=Math.max(0,Math.min(S.length-1,n));render()};
$('#go').onclick=()=>{stop();const a=Math.max(0,Math.min(99,+$('#ia').value|0)),b=Math.max(0,Math.min(99,+$('#ib').value|0));$('#ia').value=a;$('#ib').value=b;build(a,b)};
$('#nx').onclick=()=>{stop();go(i+1)};$('#pv').onclick=()=>{stop();go(i-1)};$('#sl').oninput=e=>{stop();go(+e.target.value)};
$('#pl').onclick=()=>{if(timer){stop();render();return}if(i>=S.length-1)i=0;timer=setInterval(()=>{if(i>=S.length-1){stop();render();return}go(i+1)},1500);render()};
let th='dark';const setT=t=>{th=t;RT.dataset.theme=t};$('#th').onclick=()=>setT(th==='dark'?'light':'dark');
build(10,9);

};
LINK.addEventListener('load',start);LINK.addEventListener('error',start);setTimeout(start,1500);
})();
(function(){
const HOST=document.getElementById('app3'),ROOT=HOST.attachShadow({mode:'open'});
ROOT.appendChild(document.getElementById('tpl3').content.cloneNode(true));
const RT=ROOT.querySelector('.root'),LINK=ROOT.querySelector('link');let started=false;
const start=()=>{if(started)return;started=true;

const $=s=>ROOT.querySelector(s),NS='http://www.w3.org/2000/svg';
const C=[['pwr',20,20,120,56,'POWER','3V cell'],['clock',170,100,110,44,'CLOCK','crystal'],['kpd',20,190,150,170,'',''],['enc',200,250,90,60,'ENCODER','4-bit code'],
['cu',350,70,130,80,'CONTROL UNIT','decoder + FSM'],['pc',350,180,130,40,'PC','program counter'],['rom',350,250,130,70,'ROM','program memory'],['ir',350,350,130,40,'IR','instruction reg'],['buf',350,420,130,40,'INPUT BUF','key buffer'],
['r1',520,70,100,36,'R1',''],['r2',520,130,100,36,'R2',''],['alu',560,230,170,110,'ALU','8 × full adder'],['r3',520,420,100,36,'R3',''],['flags',660,420,100,36,'FLAGS',''],
['bcd',820,150,150,56,'BIN→BCD','double dabble'],['dec',820,250,150,56,'7-SEG DECODER','a b c d e f g'],['disp',820,340,150,100,'','']];
const W=[['pw1','M140 48H330','pw'],['pw2','M50 76V190','pw'],['pw3','M140 30H985V410H970','pw'],['clk','M280 122H350','ct'],
['kp','M170 270H185V280H200','dt'],['enc','M290 280H310V440H350','dt'],
['pcrom','M415 220V250','ad'],['romir','M415 320V350','dt'],['ircu','M350 370H338V110H350','ct'],['ctl','M415 70V55H715V230','ct'],
['bufbus','M480 440H500','dt'],['bus','M500 60V470','dt'],['busr1','M500 88H520','dt'],['busr2','M500 148H520','dt'],
['r1alu','M620 88H650V230','dt'],['r2alu','M620 148H685V230','dt'],['carry','M575 322H715','ct'],['aluR3','M645 340V380H570V420','dt'],['aluF','M710 340V420','ct'],
['out','M570 456V490H800V180H820','dt'],['bd','M895 206V250','dt'],['dd','M895 306V340','dt']];
const S=[
{t:'Power on: the 3V cell feeds the CPU, keypad and display through VCC lines, and the crystal CLOCK starts the pulses that synchronize every operation.',w:['pw1','pw2','pw3','clk'],c:['pwr','clock']},
{t:'Key 1 pressed: the switch closes a circuit between its row and column, current reaches the encoder, and the binary code is stored in INPUT BUF.',k:'1',w:['kp','enc'],c:['kpd','enc','buf'],d:'1'},
{t:'Key 0 pressed: the buffer becomes 1×10+0 = 10 (computed with shifts and an add).',k:'0',w:['kp','enc'],c:['kpd','enc','buf'],d:'10'},
{t:'Key + pressed: the value 10 is latched as the first operand and the ADD operation is recorded.',k:'+',w:['kp','enc'],c:['kpd','enc','buf'],d:'10'},
{t:'Key 9 pressed: the second operand enters the buffer.',k:'9',w:['kp','enc'],c:['kpd','enc','buf'],d:'9'},
{t:'Key = pressed: a signal tells the control unit to start running the program stored in ROM.',k:'=',w:['kp','enc'],c:['kpd','enc','cu'],d:'9'},
{t:'FETCH: the PC puts its address on the address bus, ROM outputs the instruction onto the data bus into IR, then PC increments by 1.',w:['pcrom','romir','clk'],c:['pc','rom','ir']},
{t:'DECODE: the control unit\'s instruction decoder reads the opcode and drives control lines that enable the needed paths.',w:['ircu','ctl'],c:['ir','cu']},
{t:'LOAD: the values 00001010 and 00001001 travel from the buffer over the data bus into R1 and R2.',w:['bufbus','bus','busr1','busr2'],c:['buf','r1','r2'],r1:'00001010',r2:'00001001'},
{t:'EXECUTE (ADD): R1 and R2 enter the ALU, the carry signal ripples through the eight full adders, the result 00010011 is written to R3 and the flags update.',w:['r1alu','r2alu','carry','aluR3','aluF','ctl'],c:['r1','r2','alu','r3','flags'],r3:'00010011'},
{t:'OUT: R3 goes to the BIN→BCD converter, then to the 7-segment decoder, which generates the segment signals.',w:['out','bd','dd'],c:['r3','bcd','dec']},
{t:'DISPLAY: segment signals a–g reach the display, the right segments light up and the result 19 appears.',w:['dd','pw3'],c:['dec','disp'],d:'19'}];
const SEG={0:'abcdef',1:'bc',2:'abdeg',3:'abcdg',4:'bcfg',5:'acdfg',6:'acdefg',7:'abc',8:'abcdefg',9:'abcdfg'},R={a:[8,2,24,6],b:[32,10,6,24],c:[32,38,6,24],d:[8,64,24,6],e:[2,38,6,24],f:[2,10,6,24],g:[8,33,24,6]};
const dig=(x,y,ch)=>`<g transform="translate(${x},${y}) scale(.9)">${Object.keys(R).map(k=>`<rect x="${R[k][0]}" y="${R[k][1]}" width="${R[k][2]}" height="${R[k][3]}" rx="2" class="${ch&&SEG[ch].includes(k)?'o':'f'}"/>`).join('')}</g>`;
const KEYS=['7','8','9','÷','4','5','6','×','1','2','3','−','C','0','=','+'];
let h='<rect x="330" y="40" width="450" height="500" rx="14" class="cpu"/><text x="345" y="30" class="s" style="font-size:11px">MICROPROCESSOR (CPU)</text>';
let tx='';C.forEach(c=>{h+=`<rect id="${c[0]}" x="${c[1]}" y="${c[2]}" width="${c[3]}" height="${c[4]}" rx="7" class="cp"/>`;if(c[5])tx+=`<text x="${c[1]+8}" y="${c[2]+17}" class="t">${c[5]}</text><text x="${c[1]+8}" y="${c[2]+31}" class="s">${c[6]}</text>`});
W.forEach(w=>h+=`<path id="${w[0]}" d="${w[1]}" class="wr ${w[2]}"/>`);h+=tx;
KEYS.forEach((k,n)=>{const x=34+(n%4)*34,y=214+Math.floor(n/4)*34;h+=`<rect id="k${n}" x="${x}" y="${y}" width="30" height="30" rx="5" class="kc"/><text x="${x+15}" y="${y+20}" class="kt">${k}</text>`});
h+='<text x="28" y="206" class="t">KEYPAD 4×4</text>';
[['r1',520,70],['r2',520,130],['r3',520,420]].forEach(r=>h+=`<text id="v${r[0]}" x="${r[1]+8}" y="${r[2]+30}" class="v">--------</text>`);
for(let n=0;n<8;n++)h+=`<rect x="${572+n*19}" y="270" width="15" height="24" rx="3" fill="#1b2635" stroke="#34404f"/><text x="${579.5+n*19}" y="286" class="s" text-anchor="middle">FA</text>`;
h+='<text x="572" y="312" class="s">ripple carry →</text><text x="352" y="238" class="s">ADDR BUS</text><text x="505" y="480" class="s">DATA BUS</text><text x="720" y="48" class="s">CONTROL LINES</text><text x="560" y="14" class="s">VCC</text>';
h+='<text x="830" y="358" class="t">DISPLAY</text><g id="ds"></g><g id="el"></g>';
$('#svg').innerHTML=h;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let i=0,timer=null,regs={};
const sl=$('#sl');sl.max=S.length-1;
function render(){const s=S[i];regs={};S.slice(0,i+1).forEach(x=>['r1','r2','r3'].forEach(r=>{if(x[r] !== undefined && x[r] !== null)regs[r]=x[r]}));
 ROOT.querySelectorAll('.wr,.cp,.kc').forEach(e=>e.classList.remove('on','h'));
 s.w.forEach(id=>$('#'+id).classList.add('on'));s.c.forEach(id=>$('#'+id).classList.add('on'));
 if(s.k){$('#k'+KEYS.indexOf(s.k)).classList.add('h')}
 ['r1','r2','r3'].forEach(r=>$('#v'+r).textContent=regs[r]||'--------');
 const d=(s.d!==undefined?s.d:[...S.slice(0,i+1)].reverse().find(x=>x.d!==undefined)?.d)||'';
 $('#ds').innerHTML=`<rect x="835" y="368" width="120" height="62" rx="6" fill="#050807" stroke="#26303d"/>`+[0,1].map(n=>dig(850+n*50,372,d.padStart(2,' ')[n]===' '?'':d.padStart(2,' ')[n])).join('');
 const el=$('#el');el.innerHTML='';
 if(!reduce)s.w.forEach(id=>{const w=$('#'+id),col=getComputedStyle(w).color;for(let k=0;k<3;k++){const c=document.createElementNS(NS,'circle');c.setAttribute('r',3.2);c.setAttribute('class','e');c.style.color=col;c.innerHTML=`<animateMotion dur="1.5s" begin="${-k*.5}s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion>`;el.appendChild(c)}});
 sl.value=i;$('#tx').textContent=`(${i+1}/${S.length}) ${s.t}`;$('#pl').textContent=timer?'❚❚ Pause':'▶ Play'}
const stop=()=>{clearInterval(timer);timer=null},go=n=>{i=Math.max(0,Math.min(S.length-1,n));render()};
$('#nx').onclick=()=>{stop();go(i+1)};$('#pv').onclick=()=>{stop();go(i-1)};sl.oninput=e=>{stop();go(+e.target.value)};
$('#pl').onclick=()=>{if(timer){stop();render();return}if(i>=S.length-1)i=0;timer=setInterval(()=>{if(i>=S.length-1){stop();render();return}go(i+1)},3200);render()};
addEventListener('keydown',e=>{if(HOST.parentElement.hidden)return;if(e.composedPath()[0].matches('input,button'))return;if(e.key==='ArrowRight'){stop();go(i+1)}if(e.key==='ArrowLeft'){stop();go(i-1)}});
render();

};
LINK.addEventListener('load',start);LINK.addEventListener('error',start);setTimeout(start,1500);
})();
const tabs=[...document.querySelectorAll('[role=tab]')],panels=[...document.querySelectorAll('[role=tabpanel]')];
function show(k){tabs.forEach(t=>t.setAttribute('aria-selected',String(t.getAttribute('aria-controls')===k)));panels.forEach(p=>p.hidden=p.id!==k);try{history.replaceState(null,'','#'+k)}catch(_){}}
tabs.forEach(t=>t.onclick=()=>show(t.getAttribute('aria-controls')));
addEventListener('keydown',e=>{if(!e.target.matches('[role=tab]'))return;const n=tabs.indexOf(e.target),d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(d){const t=tabs[(n+d+tabs.length)%tabs.length];t.focus();t.click()}});
if(['t1','t2','t3'].includes(location.hash.slice(1)))show(location.hash.slice(1));
