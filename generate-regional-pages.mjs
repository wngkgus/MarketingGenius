import { readFileSync, writeFileSync } from 'node:fs';

const baseUrl = 'https://marketing-genius.wngkgus.workers.dev';
const cities = [
  ['대전','daejeon','연구기관·병원·학원·전문 서비스가 밀집한 대전에서는 전문성과 신뢰를 설명하는 정보형 콘텐츠가 중요합니다.','유성구·서구·중구·동구·대덕구','병원·학원·전문 서비스'],
  ['세종','sejong','신도시 생활권과 공공기관 종사자의 정보 탐색이 활발한 세종에서는 정확하고 정돈된 콘텐츠가 중요합니다.','나성동·도담동·보람동·조치원','생활 서비스·교육·전문업'],
  ['용인','yongin','수지·기흥·처인 생활권이 나뉜 용인에서는 실제 영업 지역과 고객층을 구분한 콘텐츠가 중요합니다.','수지구·기흥구·처인구','병원·교육·생활 서비스'],
  ['금산','geumsan','지역 특산품과 생활 서비스 수요가 공존하는 금산에서는 상품 신뢰와 사업자의 전문성을 함께 보여줘야 합니다.','금산읍·추부면·진산면','특산품·지역 상점·생활 서비스'],
  ['청주','cheongju','상당·서원·흥덕·청원구의 상권이 넓은 청주에서는 고객이 검색하는 생활권을 구체적으로 나누는 것이 효과적입니다.','상당구·서원구·흥덕구·청원구','병원·학원·외식·전문업'],
  ['충주','chungju','지역 기반 업체 선택에서 접근성과 신뢰가 중요한 충주에서는 실제 운영 정보를 분명하게 제공해야 합니다.','연수동·호암동·칠금동·충주기업도시','생활 서비스·교육·기업'],
  ['전주','jeonju','관광·외식·교육·생활 서비스 수요가 섞인 전주에서는 업종별 고객 의도를 구분한 콘텐츠 전략이 필요합니다.','완산구·덕진구·혁신도시·한옥마을','외식·관광·교육·생활 서비스'],
  ['군산','gunsan','관광 상권과 생활 상권의 검색 목적이 다른 군산에서는 계절성과 실제 이용 상황을 반영해야 합니다.','수송동·나운동·조촌동·산업단지','관광·외식·지역 기업'],
  ['부산','busan','지역이 넓고 경쟁이 강한 부산에서는 실제 영업 가능한 구·생활권과 서비스 범위를 분명히 해야 합니다.','해운대구·부산진구·수영구·남구','병원·관광·외식·전문업'],
  ['대구','daegu','지역 단골과 검색 비교 고객이 함께 존재하는 대구에서는 구체적인 선택 이유와 차별점이 중요합니다.','수성구·달서구·중구·북구','병원·교육·외식·생활 서비스'],
  ['수원','suwon','장안·권선·팔달·영통구의 경쟁 환경이 다른 수원에서는 세부 지역과 업종을 함께 분석해야 합니다.','장안구·권선구·팔달구·영통구','병원·교육·전문 서비스'],
  ['안성','anseong','도심·산업단지·대학가·농촌 생활권이 공존하는 안성에서는 고객군별 메시지를 구분해야 합니다.','공도읍·안성동·대덕면·산업단지','지역 상점·기업·교육·생활 서비스']
].map(([name,slug,summary,districts,industries])=>({name,slug,summary,districts,industries}));

const template=readFileSync('index.html','utf8');
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[c]);

function replaceOnce(html,from,to,label){
  if(!html.includes(from)) throw new Error(`Template marker not found: ${label}`);
  return html.replace(from,to);
}

function build(city){
  const name=esc(city.name);
  const title=`${name} 바이럴마케팅 | 블로그·카페·SNS 마케팅천재`;
  const description=`${city.summary} ${name} 바이럴마케팅을 블로그·카페·SNS·홈페이지 검색 구조까지 연결하고 상담부터 실행까지 직접 진행합니다.`;
  const url=`${baseUrl}/${city.slug}-viral-marketing.html`;
  let html=template;
  html=replaceOnce(html,'<title>온라인마케팅 바이럴마케팅 프리랜서 | 마케팅천재</title>',`<title>${title}</title>`,'title');
  html=replaceOnce(html,'<meta name="description" content="8년차 온라인마케팅 프리랜서 마케팅천재가 블로그, 카페, SNS, 홈페이지 제작과 검색 구조 최적화를 사업 목표에 맞춰 직접 진행합니다. 지역별 온라인마케팅 전략도 한곳에서 확인하세요.">',`<meta name="description" content="${esc(description)}">`,'description');
  html=replaceOnce(html,'<meta name="keywords" content="온라인마케팅,바이럴마케팅,블로그마케팅,SNS마케팅,카페마케팅,홈페이지제작,검색최적화,마케팅프리랜서,마케팅천재">',`<meta name="keywords" content="${name}바이럴마케팅,${name}블로그마케팅,${name}카페마케팅,${name}SNS마케팅,바이럴마케팅,마케팅천재">`,'keywords');
  html=replaceOnce(html,'<meta name="application-name" content="온라인마케팅 바이럴마케팅 프리랜서 | 마케팅천재">',`<meta name="application-name" content="${title}">`,'application name');
  html=replaceOnce(html,'<link rel="canonical" href="https://marketing-genius.wngkgus.workers.dev/">',`<link rel="canonical" href="${url}">`,'canonical');
  html=replaceOnce(html,'<meta property="og:title" content="온라인마케팅 바이럴마케팅 프리랜서 | 마케팅천재">',`<meta property="og:title" content="${title}">`,'og title');
  html=replaceOnce(html,'<meta property="og:description" content="블로그·카페·SNS·홈페이지·검색 구조를 한 흐름으로 설계하는 8년차 온라인마케팅 프리랜서 마케팅천재입니다.">',`<meta property="og:description" content="${esc(description)}">`,'og description');
  html=replaceOnce(html,'<meta property="og:url" content="https://marketing-genius.wngkgus.workers.dev/">',`<meta property="og:url" content="${url}">`,'og url');
  html=replaceOnce(html,'<body class="home-premium">',`<body class="home-premium" data-region="${name}">`,'body');
  html=html.replace(/\s*<section class="entry-intro"[\s\S]*?<\/section>\s*/, '\n');
  html=replaceOnce(html,'<h1><em>온라인마케팅,</em><br>채널만 늘리기보다<br>유입 구조부터 설계합니다.</h1>',`<h1><em>${name} 바이럴마케팅,</em><br>채널만 늘리기보다<br>유입 구조부터 설계합니다.</h1>`,'hero h1');
  html=replaceOnce(html,'<span class="eyebrow">DAEJEON ADVERTISING AGENCY</span>',`<span class="eyebrow">${city.slug.toUpperCase()} VIRAL MARKETING</span>`,'hero eyebrow');
  html=replaceOnce(html,'<p>키워드마다 맞는 작업, 8년차 마케터가 효과적으로 진행해드립니다.</p>',`<p>${esc(city.summary)} 지역 검색부터 상담 전환까지 8년차 마케터가 직접 설계합니다.</p>`,'hero summary');
  html=html.replaceAll('대전온라인마케팅',`${name}바이럴마케팅`);
  html=html.replaceAll('대전마케팅',`${name}마케팅`);
  html=html.replaceAll('대전바이럴마케팅',`${name}바이럴마케팅`);
  html=html.replaceAll('대전블로그마케팅',`${name}블로그마케팅`);
  html=html.replaceAll('대전병원마케팅',`${name}병원마케팅`);
  html=html.replaceAll('대전소상공인마케팅',`${name}소상공인마케팅`);
  html=html.replaceAll('대전 지역 노하우',`${name} 지역 노하우`);
  html=html.replaceAll('대전 지역 특화',`${name} 지역 특화`);
  html=html.replaceAll('대전 지역이 아니어도',`${name} 지역이 아니어도`);
  html=html.replace('대전·세종을 중심으로 운영하며, 그 외 지역은 별도 상담을 통해 진행 가능 여부를 안내해 드립니다.','전국 비대면 상담이 가능하며, 실제 작업 가능 범위와 필요한 채널은 현재 상태를 확인한 뒤 안내합니다.');
  html=html.replace('대전 · 세종 중심 운영','전국 비대면 상담');
  const regionalCss=`<style id="regional-search-page">
body[data-region] .hero{min-height:760px;padding-top:150px}
.region-context{padding:100px 0;background:#f3f7fc}.region-context__head{max-width:760px;margin-bottom:38px}.region-context__head h2{margin:14px 0 18px;font-size:clamp(34px,4vw,54px);line-height:1.13;letter-spacing:-.055em}.region-context__head p{color:#5b6b85;font-size:17px;line-height:1.85}.region-context__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.region-context__card{padding:30px;border:1px solid #dce6f5;border-radius:20px;background:#fff;box-shadow:0 14px 34px -24px rgba(10,27,51,.28)}.region-context__card b{display:block;margin-bottom:34px;color:#2c6fd1;font:700 12px/1 'JetBrains Mono',monospace;letter-spacing:.1em}.region-context__card h3{margin:0 0 13px;font-size:22px;letter-spacing:-.04em}.region-context__card p{margin:0;color:#5b6b85;font-size:14px;line-height:1.75}@media(max-width:760px){body[data-region] .hero{min-height:auto;padding-top:115px}.region-context{padding:72px 0}.region-context__grid{grid-template-columns:1fr}.region-context__card{padding:25px}.region-context__head p{font-size:15px}}
</style>`;
  html=html.replace('</head>',`${regionalCss}\n</head>`);
  const regionSection=`<section class="region-context" aria-labelledby="region-context-title"><div class="container"><div class="region-context__head reveal"><span class="eyebrow">${city.slug.toUpperCase()} SEARCH STRATEGY</span><h2 id="region-context-title">${name} 고객이 검색할 때<br>선택할 이유를 보여줍니다.</h2><p>${esc(city.summary)}</p></div><div class="region-context__grid"><article class="region-context__card reveal"><b>01 / AREA</b><h3>${name} 주요 생활권</h3><p>${esc(city.districts)} 등 실제 서비스 가능 지역과 고객 반경을 기준으로 검색 주제를 구분합니다.</p></article><article class="region-context__card reveal"><b>02 / BUSINESS</b><h3>적합한 업종</h3><p>${esc(city.industries)}처럼 고객이 비교 검색하는 업종을 중심으로 정보 콘텐츠를 설계합니다.</p></article><article class="region-context__card reveal"><b>03 / CONTENT</b><h3>검색에서 상담까지</h3><p>블로그·카페·SNS의 역할을 나누고 홈페이지에서 서비스 과정과 문의 방법을 명확하게 안내합니다.</p></article></div></div></section>`;
  html=html.replace('  <!-- ================= SERVICES ================= -->',`${regionSection}\n\n  <!-- ================= SERVICES ================= -->`);
  const pageSchema=`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Service',name:`${city.name} 바이럴마케팅`,serviceType:'바이럴마케팅',areaServed:{'@type':'AdministrativeArea',name:city.name},provider:{'@type':'Person',name:'마케팅천재',telephone:'+82-10-2719-5334'},url,description},null,2)}</script>`;
  html=html.replace('</head>',`${pageSchema}\n</head>`);
  html=html.replace('</body>',`<script>if('scrollRestoration' in history)history.scrollRestoration='manual';const resetRegionScroll=()=>scrollTo({top:0,left:0,behavior:'instant'});resetRegionScroll();addEventListener('pageshow',resetRegionScroll);addEventListener('load',()=>setTimeout(resetRegionScroll,0));</script>\n</body>`);
  return html;
}

for(const city of cities) writeFileSync(`${city.slug}-viral-marketing.html`,build(city),'utf8');
console.log(`${cities.length} main-template regional pages generated.`);
