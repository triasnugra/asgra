import fs from 'node:fs';
const F='jurnal/data/journal.json',DAY=864e5,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const HOSTS=['https://data-api.binance.vision','https://api.binance.com','https://api1.binance.com','https://api2.binance.com'];
let hi=0;
async function bj(p){let e;for(let t=0;t<HOSTS.length;t++){const h=HOSTS[(hi+t)%HOSTS.length];
 try{const r=await fetch(h+'/api/v3/'+p,{signal:AbortSignal.timeout(15000)});if(!r.ok)throw new Error(h+' HTTP '+r.status);hi=(hi+t)%HOSTS.length;return await r.json()}catch(x){e=x}}throw e}
const kl=async s=>(await bj(`klines?symbol=${s}&interval=1d&limit=250`)).map(a=>({h:+a[2],l:+a[3],c:+a[4],v:+a[5]}));
const NOT=/^(USDC|FDUSD|TUSD|USDP|DAI|BUSD|EUR|AEUR|USD1|XUSD|PAXG|USDE|PYUSD)$/;
const FOMC=['2026-01-28','2026-03-18','2026-04-29','2026-06-17','2026-07-29','2026-09-16','2026-10-28','2026-12-09'];
const HOL=['12-24','12-25','12-26','12-31','01-01'];
const ema=(a,n)=>{const k=2/(n+1);let e=a[0];return a.map(v=>e=v*k+e*(1-k))};
const rsi=(c,n=14)=>{let g=0,l=0;return c.map((v,i)=>{if(!i)return null;const d=v-c[i-1],u=Math.max(d,0),w=Math.max(-d,0);if(i<=n){g+=u/n;l+=w/n}else{g=(g*(n-1)+u)/n;l=(l*(n-1)+w)/n}return i<n?null:100-100/(1+g/(l||1e-9))})};
const obv=k=>{let o=0;return k.map((x,i)=>{if(i)o+=x.c>k[i-1].c?x.v:x.c<k[i-1].c?-x.v:0;return o})};
function div(p,d){const n=p.length,ix=(a,b,f)=>{let j=a;for(let i=a;i<b;i++)if(f(p[i],p[j]))j=i;return j};
 const l1=ix(n-15,n,(v,m)=>v<m),l0=ix(n-30,n-15,(v,m)=>v<m),h1=ix(n-15,n,(v,m)=>v>m),h0=ix(n-30,n-15,(v,m)=>v>m);
 if(p[l1]<p[l0]&&d[l1]>d[l0])return 1;if(p[h1]>p[h0]&&d[h1]<d[h0])return -1;return 0}
function feat(k,qv){
 const x=k.slice(0,-1),c=x.map(q=>q.c),n=x.length,px=k.at(-1).c;
 const e20=ema(c,20)[n-1],e50=ema(c,50)[n-1],tr=px>e50&&e20>e50?1:px<e50&&e20<e50?-1:0;
 const R=rsi(c),dO=div(c,obv(x)),dR=div(c,R);
 const pr=x.slice(n-65,n-5),H=Math.max(...pr.map(q=>q.h)),L=Math.min(...pr.map(q=>q.l)),rec=x.slice(n-5);
 const pos=(px-L)/(H-L),mid=pos>.3&&pos<.7;
 const devUp=px>L&&rec.some(q=>q.l<L&&q.c>L),devDn=px<H&&rec.some(q=>q.h>H&&q.c<H);
 const boUp=x.slice(n-10).some(q=>q.c>H)&&px>H&&px<H*1.03,boDn=x.slice(n-10).some(q=>q.c<L)&&px<L&&px>L*.97;
 const w=x.slice(n-60),hi=Math.max(...w.map(q=>q.h)),lo=Math.min(...w.map(q=>q.l));
 const f75=tr>=0?hi-.75*(hi-lo):lo+.75*(hi-lo),nf=Math.abs(px-f75)/px<.03;
 const lw=[],sw=[];
 if(devUp)lw.push('deviasi bawah lalu recovery');if(boUp)lw.push('breakout ber-close, retest');if(tr==1&&nf)lw.push('Fib 0.75 tren naik');
 if(devDn)sw.push('deviasi atas gagal bertahan');if(boDn)sw.push('breakdown ber-close, retest');if(tr==-1&&nf)sw.push('Fib 0.75 tren turun');
 let side=0,why=[];
 if(lw.length&&(!sw.length||lw.length>sw.length)){side=1;why=lw}else if(sw.length){side=-1;why=sw}
 if(side==-1&&tr==1&&!devDn)side=0;if(side==1&&tr==-1&&!devUp&&!boUp)side=0;
 if(side&&mid&&!(side==1?devUp:devDn))side=0;
 const r={px,tr,e20,e50,rsi:R[n-1],obvDiv:dO,rsiDiv:dR,H,L,pos,devUp,devDn,boUp,boDn,f75,qv,side};
 if(side){if(dO==side)why.push('OBV divergence');if(dR==side)why.push('RSI divergence');if(tr==side)why.push('searah tren');
  const sl=side==1?Math.min(...rec.map(q=>q.l))*.995:Math.max(...rec.map(q=>q.h))*1.005,risk=Math.abs(px-sl);
  Object.assign(r,{why,sl,slp:risk/px*100,tp:px+side*2*risk})}
 return r}
function alerts(){const d=new Date(),iso=d.toISOString().slice(0,10),md=iso.slice(5),dw=d.getUTCDay(),tm=new Date(+d+DAY),A=[];
 if(FOMC.includes(iso)||FOMC.includes(tm.toISOString().slice(0,10)))A.push('FOMC hari ini/besok');
 if(tm.getUTCMonth()!=d.getUTCMonth())A.push('penutupan bulanan');if(dw==0)A.push('penutupan weekly');
 if(HOL.includes(md))A.push('libur, volume tipis');if(dw==1)A.push('Monday range (rawan berantakan)');return A.join('; ')}

const ELIZ=`Terapkan metode CryptoEliz:
- Ikuti tren; tren naik cari long, jangan short tanpa deviasi. BTC adalah gerbang: long altcoin saat BTC turun dihindari.
- Hanya trading di range high/low, hindari mid-range.
- Entry limit di retest setelah breakout ber-close, atau setelah deviasi (harga tembus level lalu kembali).
- Fib 0.75 zona koreksi; OBV dan RSI divergence sebagai konfirmasi.
- SL ketat (scalping 3-5%, swing 10-15%); tolak setup yang butuh SL lebih lebar.
- Saat ragu atau ada alert, NO_TRADE.`;
const prompt=(b,al,mode)=>`Kamu analis crypto. Hari ini ${new Date().toISOString().slice(0,10)} UTC. Alert aktif: ${al||'tidak ada'}.
Data harian (sudah dihitung; jangan mengarang angka lain):
${JSON.stringify(b)}
Beri rencana trading horizon 7 hari per aset. entry = harga limit. Jika tidak ada setup jelas, ada alert aktif, atau data kurang, jawab NO_TRADE. Jarak SL maks 15% dari entry.
Jawab HANYA JSON: {"hasil":[{"aset":"BTC","arah":"LONG|SHORT|NO_TRADE","entry":0,"sl":0,"tp":0,"keyakinan":0,"alasan":"maks 20 kata"}]}`+(mode=='eliz'?'\n\n'+ELIZ:'');

async function post(url,body,headers){const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body),signal:AbortSignal.timeout(90000)});
 if(!r.ok)throw new Error('HTTP '+r.status+' '+(await r.text()).slice(0,150));return r.json()}
const oai=(url,def,env,json)=>async(k,p)=>(await post(url,{model:process.env[env]||def,temperature:0,messages:[{role:'user',content:p}],...(json?{response_format:{type:'json_object'}}:{})},{Authorization:'Bearer '+k})).choices[0].message.content;
const AI={
 Gemini:{key:'GEMINI_API_KEY',run:async(k,p)=>(await post(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL||'gemini-2.5-flash'}:generateContent`,{contents:[{parts:[{text:p}]}],generationConfig:{temperature:0,responseMimeType:'application/json'}},{'x-goog-api-key':k})).candidates[0].content.parts[0].text},
 Groq:{key:'GROQ_API_KEY',run:oai('https://api.groq.com/openai/v1/chat/completions','llama-3.3-70b-versatile','GROQ_MODEL',true)},
 OpenRouter:{key:'OPENROUTER_API_KEY',run:oai('https://openrouter.ai/api/v1/chat/completions','meta-llama/llama-3.3-70b-instruct:free','OPENROUTER_MODEL',false)},
 Perplexity:{key:'PERPLEXITY_API_KEY',run:oai('https://api.perplexity.ai/chat/completions','sonar','PERPLEXITY_MODEL',false)}};

const rows=fs.existsSync(F)?JSON.parse(fs.readFileSync(F,'utf8')):[];
const ids=new Set(rows.map(r=>r.id)),today=new Date().toISOString().slice(0,10);
const q=v=>+Number(v).toPrecision(5);
function addRow(agen,aset,o,px,al){
 const id=`${today}|${agen}|${aset}`;if(ids.has(id))return;ids.add(id);
 const arah=String(o.arah||'').toUpperCase(),t=Date.now(),entry=+o.entry,sl=+o.sl,tp=+o.tp;
 const row={id,waktu:new Date(t).toISOString().slice(0,16).replace('T',' ')+' UTC',t,due:t+7*DAY,agen,aset,arah,entry:'',sl:'',tp:'',harga_awal:px,keyakinan:o.keyakinan??'',alasan:String(o.alasan||'').slice(0,160),alert:al,hasil:'menunggu',R:''};
 if(arah==='NO_TRADE'){row.hasil='NO_TRADE'}
 else if(arah!=='LONG'&&arah!=='SHORT'||![entry,sl,tp].every(Number.isFinite)){row.arah=arah||'?';row.hasil='tidak valid'}
 else{Object.assign(row,{entry:q(entry),sl:q(sl),tp:q(tp)});const s=arah==='LONG'?1:-1;
  if(!(s*(entry-sl)>0&&s*(tp-entry)>0)||Math.abs(entry-sl)/entry>.15)row.hasil='tidak valid'}
 rows.push(row)}
const fin=(r,h,x)=>{r.hasil=h;r.R=+x.toFixed(2)};
async function grade(r){
 const now=Date.now(),s=r.arah==='LONG'?1:-1,risk=Math.abs(r.entry-r.sl);
 const ks=(await bj(`klines?symbol=${r.aset}USDT&interval=1h&startTime=${r.t}&limit=1000`)).filter(a=>a[6]<now).map(a=>({h:+a[2],l:+a[3],c:+a[4],ct:a[6]}));
 let fill=false;
 for(const k of ks){if(k.ct>r.due)break;
  if(!fill){if(s==1?k.l<=r.entry:k.h>=r.entry)fill=true;continue}
  if(s==1?k.l<=r.sl:k.h>=r.sl)return fin(r,'SL',-1);
  if(s==1?k.h>=r.tp:k.l<=r.tp)return fin(r,'TP',s*(r.tp-r.entry)/risk)}
 if(now<r.due)return;
 const last=ks.filter(k=>k.ct<=r.due).at(-1);
 if(!fill||!last)return fin(r,'tidak terisi',0);
 fin(r,'kedaluwarsa',s*(last.c-r.entry)/risk)}

// 1) nilai prediksi lama
for(const r of rows.filter(r=>r.hasil==='menunggu')){try{await grade(r)}catch(e){console.log('nilai gagal',r.id,e.message)}}

// 2) prediksi baru (sekali sehari, setelah candle harian tutup)
const hr=new Date().getUTCHours();
if(process.env.FORCE||(hr>=1&&hr<=5)){
 const t=await bj('ticker/24hr');
 const top=t.filter(x=>x.symbol.endsWith('USDT')&&!NOT.test(x.symbol.slice(0,-4))).sort((a,b)=>b.quoteVolume-a.quoteVolume).slice(0,40);
 const F40=[];
 for(let i=0;i<top.length;i+=8)await Promise.all(top.slice(i,i+8).map(async x=>{try{F40.push({s:x.symbol.slice(0,-4),...feat(await kl(x.symbol),+x.quoteVolume)})}catch(e){}}));
 const btc=F40.find(f=>f.s==='BTC'),sig=F40.filter(f=>f.side&&f.slp<=15).sort((a,b)=>b.why.length-a.why.length);
 const al=alerts(),cand=[...(btc?[btc]:[]),...sig.filter(f=>f.s!=='BTC').slice(0,5)];
 for(const f of sig)addRow('Aturan Eliz',f.s,{arah:f.side==1?'LONG':'SHORT',entry:f.px,sl:f.sl,tp:f.tp,alasan:f.why.join(', ')},f.px,al);
 const bundle=cand.map(f=>({aset:f.s,harga:q(f.px),tren_harian:['turun','netral','naik'][f.tr+1],btc_tren:['turun','netral','naik'][(btc?.tr??0)+1],ema20:q(f.e20),ema50:q(f.e50),rsi14:Math.round(f.rsi),obv_divergence:f.obvDiv,rsi_divergence:f.rsiDiv,range60d_high:q(f.H),range60d_low:q(f.L),posisi_range_pct:Math.round(f.pos*100),fib075:q(f.f75),deviasi_bawah_5h:f.devUp,deviasi_atas_5h:f.devDn,volume24h_usd:Math.round(f.qv)}));
 const px=Object.fromEntries(cand.map(f=>[f.s,f.px]));
 if(bundle.length)for(const[n,a]of Object.entries(AI)){const key=process.env[a.key];if(!key)continue;
  for(const mode of['polos','eliz']){
   try{const txt=await a.run(key,prompt(bundle,al,mode));const j=JSON.parse(txt.slice(txt.indexOf('{'),txt.lastIndexOf('}')+1));
    for(const o of j.hasil||[]){const as=String(o.aset||'').toUpperCase();if(px[as])addRow(`${n} (${mode})`,as,o,px[as],al)}
    console.log(n,mode,'ok')}catch(e){console.log(n,mode,'gagal:',e.message)}
   await sleep(2500)}}
}
fs.mkdirSync('jurnal/data',{recursive:true});
fs.writeFileSync(F,JSON.stringify(rows,null,1));
console.log('baris:',rows.length);
