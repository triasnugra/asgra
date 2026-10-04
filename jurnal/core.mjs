// Inti aturan CryptoEliz. Dipakai bersama oleh halaman jurnal dan script GitHub Actions.
const HOSTS=['https://data-api.binance.vision','https://api.binance.com','https://api1.binance.com','https://api2.binance.com'];
let hi=0;
export async function bj(p){let e;for(let t=0;t<HOSTS.length;t++){const h=HOSTS[(hi+t)%HOSTS.length];
 try{const r=await fetch(h+'/api/v3/'+p,{signal:AbortSignal.timeout(15000)});if(!r.ok)throw new Error(h+' HTTP '+r.status);hi=(hi+t)%HOSTS.length;return await r.json()}catch(x){e=x}}throw e}
export const kl=async s=>(await bj(`klines?symbol=${s}&interval=1d&limit=1000`)).map(a=>({t:a[0],o:+a[1],h:+a[2],l:+a[3],c:+a[4],v:+a[5]}));
export const NOT=/^(USDC|FDUSD|TUSD|USDP|DAI|BUSD|EUR|AEUR|USD1|XUSD|PAXG|USDE|PYUSD|U|USDS|USDD|RLUSD|BFUSD|USDG)$/;
// Tanggal keputusan FOMC 2026 (hari ke-2). WAJIB diverifikasi di federalreserve.gov
const FOMC=['2026-01-28','2026-03-18','2026-04-29','2026-06-17','2026-07-29','2026-09-16','2026-10-28','2026-12-09'];
const HOL=['12-24','12-25','12-26','12-31','01-01'];
const ema=(a,n)=>{const k=2/(n+1);let e=a[0];return a.map(v=>e=v*k+e*(1-k))};
const rsi=(c,n=14)=>{let g=0,l=0;return c.map((v,i)=>{if(!i)return null;const d=v-c[i-1],u=Math.max(d,0),w=Math.max(-d,0);if(i<=n){g+=u/n;l+=w/n}else{g=(g*(n-1)+u)/n;l=(l*(n-1)+w)/n}return i<n?null:100-100/(1+g/(l||1e-9))})};
const obv=k=>{let o=0;return k.map((x,i)=>{if(i)o+=x.c>k[i-1].c?x.v:x.c<k[i-1].c?-x.v:0;return o})};
function div(p,d){const n=p.length,ix=(a,b,f)=>{let j=a;for(let i=a;i<b;i++)if(f(p[i],p[j]))j=i;return j};
 const l1=ix(n-15,n,(v,m)=>v<m),l0=ix(n-30,n-15,(v,m)=>v<m),h1=ix(n-15,n,(v,m)=>v>m),h0=ix(n-30,n-15,(v,m)=>v>m);
 if(p[l1]<p[l0]&&d[l1]>d[l0])return 1;if(p[h1]>p[h0]&&d[h1]<d[h0])return -1;return 0}
const sgn=(p,a,b)=>p>b&&a>b?1:p<b&&a<b?-1:0;

export function feat(k,qv){
 const x=k.slice(0,-1),c=x.map(q=>q.c),n=x.length,px=k.at(-1).c;
 if(n<120)throw new Error('data kurang dari 120 hari');
 const E20=ema(c,20)[n-1],E50=ema(c,50)[n-1],td=sgn(px,E20,E50);
 // tren weekly: agregasi dari candle harian (minggu mulai Senin UTC), EMA20/50
 const wm=new Map();for(const q of x)wm.set(Math.floor((q.t-4*864e5)/(7*864e5)),q.c);
 const wc=[...wm.values()].slice(0,-1),m=wc.length;let tw=0,flip=false;
 if(m>=55){const a=ema(wc,20),b=ema(wc,50);tw=sgn(px,a[m-1],b[m-1]);flip=sgn(wc[m-4],a[m-4],b[m-4])!==sgn(wc[m-1],a[m-1],b[m-1])}
 const tr=m>=55?tw:td; // tren makro: weekly bila data cukup
 const R=rsi(c),dO=div(c,obv(x)),dR=div(c,R);
 const pr=x.slice(n-65,n-5),H=Math.max(...pr.map(q=>q.h)),L=Math.min(...pr.map(q=>q.l)),rec=x.slice(n-5);
 const pos=(px-L)/(H-L),mid=pos>.3&&pos<.7,flat=(H-L)/L<.06;
 const devUp=px>L&&rec.some(q=>q.l<L&&q.c>L),devDn=px<H&&rec.some(q=>q.h>H&&q.c<H);
 const boUp=x.slice(n-10).some(q=>q.c>H)&&px>H&&px<H*1.03,boDn=x.slice(n-10).some(q=>q.c<L)&&px<L&&px>L*.97;
 const w=x.slice(n-60),hh=Math.max(...w.map(q=>q.h)),lo=Math.min(...w.map(q=>q.l));
 const f75=tr>=0?hh-.75*(hh-lo):lo+.75*(hh-lo),nf=Math.abs(px-f75)/px<.03;
 // pivot +-3 hari (90 hari terakhir) untuk Three Tap dan Wolf
 const hs=x.map(q=>q.h),ls=x.map(q=>q.l);
 const pv=(a,i,hi)=>{for(let j=i-3;j<=i+3;j++)if(j!==i&&(hi?a[j]>a[i]:a[j]<a[i]))return false;return true};
 const PH=[],PL=[];for(let i=n-90;i<n-3;i++){if(pv(hs,i,1))PH.push(i);if(pv(ls,i,0))PL.push(i)}
 const tl=(P,a_,desc)=>{if(P.length<2)return null;const a=P.at(-2),b=P.at(-1);if(b-a<5||(desc?a_[b]>=a_[a]:a_[b]<=a_[a]))return null;return{a,av:a_[a],sl:(a_[b]-a_[a])/(b-a)}};
 const TH=tl(PH,hs,1),TL=tl(PL,ls,0),ln=(T,i)=>T.av+T.sl*(i-T.a);
 const brk=(T,a_,up)=>!!T&&[0,1,2,3,4].some(j=>up?a_[n-1-j]>ln(T,n-1-j):a_[n-1-j]<ln(T,n-1-j));
 const wDn=brk(TH,hs,1)&&px<ln(TH,n)&&c[n-1]<ln(TH,n-1),wUp=brk(TL,ls,0)&&px>ln(TL,n)&&c[n-1]>ln(TL,n-1);
 const tL=PL.filter(i=>i>=n-65&&i<n-5&&ls[i]<=L*1.02).length,tH=PH.filter(i=>i>=n-65&&i<n-5&&hs[i]>=H*.98).length;
 const tags=[];
 if(devUp)tags.push(tL>=2?'Three Tap':'Deviasi bawah');if(devDn)tags.push(tH>=2?'Three Top':'Deviasi atas');
 if(boUp||boDn)tags.push('Breakout-retest');if(wDn)tags.push('Wolf bearish');if(wUp)tags.push('Wolf bullish');
 const lw=[],sw=[];
 if(devUp)lw.push(tL>=2?'Three Tap: 2 sentuhan lalu manipulasi di bawah':'deviasi bawah lalu recovery');if(boUp)lw.push('breakout ber-close, retest');if(wUp)lw.push('Wolf bullish: breakdown trendline gagal');if(tr==1&&nf)lw.push('Fib 0.75 tren naik');
 if(devDn)sw.push(tH>=2?'Three Top: 2 sentuhan lalu manipulasi di atas':'deviasi atas gagal bertahan');if(boDn)sw.push('breakdown ber-close, retest');if(wDn)sw.push('Wolf: breakout trendline gagal');if(tr==-1&&nf)sw.push('Fib 0.75 tren turun');
 let side=0,why=[];
 if(lw.length&&(!sw.length||lw.length>sw.length)){side=1;why=lw}else if(sw.length){side=-1;why=sw}
 if(side==-1&&tr==1&&!devDn&&!wDn)side=0;if(side==1&&tr==-1&&!devUp&&!boUp&&!wUp)side=0;
 if(side&&mid&&!(side==1?devUp:devDn))side=0;if(flat)side=0;
 const r={px,tr,td,tw,m,flip,e20:E20,e50:E50,rsi:R[n-1],obvDiv:dO,rsiDiv:dR,ret30:px/c[n-30]-1,tags,k:k.slice(-90),off:k.length-90,H,L,pos,mid,flat,devUp,devDn,boUp,boDn,f75,qv,side};
 if(side){
  if(dO==side)why.push('OBV divergence');if(dR==side)why.push('RSI divergence');if(tr==side)why.push('searah tren');
  const trig=side==1?(devUp?'dev':boUp?'bo':wUp?'wolf':'fib'):(devDn?'dev':boDn?'bo':wDn?'wolf':'fib');
  const lvl=side==1?(devUp?L:boUp?H:wUp?ln(TL,n):f75):(devDn?H:boDn?L:wDn?ln(TH,n):f75);
  const entry=side==1?Math.min(lvl,px):Math.max(lvl,px); // limit di level retest, bukan kejar harga
  let sl=trig=='fib'?entry*(1-side*.05):side==1?Math.min(...rec.map(q=>q.l))*.995:Math.max(...rec.map(q=>q.h))*1.005;
  sl=side==1?Math.min(sl,entry*.97):Math.max(sl,entry*1.03);
  const risk=Math.abs(entry-sl),slp=risk/entry*100;
  if(trig=='wolf'){const T=side==1?TL:TH;r.tl={a:T.a,av:T.av,sl:T.sl,e:n}}
  Object.assign(r,{why,trig,entry,sl,slp,tp:entry+side*2*risk,t2:side==1?H:L,dist:Math.abs(px-entry)/px*100,type:slp<=5?'scalping':slp<=15?'swing':'ditolak'})}
 return r}

export function alertList(){const d=new Date(),iso=d.toISOString().slice(0,10),md=iso.slice(5),dw=d.getUTCDay(),tm=new Date(+d+864e5),A=[];
 if(FOMC.includes(iso)||FOMC.includes(tm.toISOString().slice(0,10)))A.push(['r','FOMC hari ini atau besok. Hindari entry baru.','Verifikasi tanggal di federalreserve.gov']);
 if(tm.getUTCMonth()!=d.getUTCMonth())A.push(['r','Hari terakhir bulan. Penutupan bulanan 00:00 UTC.','']);
 if(dw==0)A.push(['y','Menjelang penutupan weekly (Senin 00:00 UTC).','']);
 if(HOL.includes(md))A.push(['r','Libur panjang, volume tipis. Banyak bot dan flash dump.','']);
 if(dw==1)A.push(['y','Senin: Monday range sering berantakan. Tunggu range terbentuk.','Interpretasi dari video']);
 return A}
