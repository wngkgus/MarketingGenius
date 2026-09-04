import { writeFileSync, readdirSync } from "node:fs";
const B = "https://marketing-genius.wngkgus.workers.dev",
  P = "010-2719-5334",
  K = "26hoon";
const U = (p = "") => p === "index.html" ? "/" : "/" + String(p).replace(/\.html(?=($|[#?]))/, "");
const S = [
  [
    "blog",
    "블로그",
    "검색하는 고객에게 전문적인 글과 사진으로 신뢰를 쌓습니다.",
  ],
  ["cafe", "카페", "지역 커뮤니티에 자연스럽고 유용한 정보를 전합니다."],
  ["sns", "SNS", "짧은 영상과 이미지로 브랜드의 실제 모습을 보여드립니다."],
  [
    "website",
    "홈페이지 제작",
    "밝고 빠른 화면에 서비스와 상담 흐름을 담습니다.",
  ],
  [
    "seo",
    "검색 최적화",
    "지역과 업종을 찾는 고객이 답을 쉽게 발견하도록 구성합니다.",
  ],
].map(([slug, name, desc]) => ({
  slug:
    slug === "website"
      ? "website-production"
      : slug === "seo"
        ? "seo-marketing"
        : slug + "-marketing",
  name,
  desc,
  ai: `assets/ai-service-${slug}.png`,
}));
const R = [
  { name: "대전", slug: "daejeon", areas: "유성구·서구·중구·동구·대덕구", audience: "병원, 학원, 음식점, 전문 서비스", market: "연구단지와 대학가, 신도심과 원도심이 함께 있어 생활권별 검색어와 고객의 비교 기준이 다릅니다.", plan: "네이버 검색 콘텐츠와 지역 랜딩 페이지를 먼저 정리하고 상담 전환 데이터를 보며 광고를 보완합니다." },
  { name: "세종", slug: "sejong", areas: "나성동·도담동·어진동·조치원", audience: "생활 서비스, 교육, 병원, 부동산", market: "신도심 생활권과 조치원권의 고객 동선이 달라 서비스 지역과 방문 조건을 구체적으로 보여주는 것이 중요합니다.", plan: "지역별 서비스 범위와 실제 사례를 홈페이지에 명확히 표시하고 블로그·지도 검색 흐름을 연결합니다." },
  { name: "대구", slug: "daegu", areas: "수성구·달서구·중구·북구·동구", audience: "의료, 교육, 외식, 시공", market: "구별 상권 규모와 소비 성향 차이가 커서 넓은 지역 키워드와 세부 생활권 키워드를 함께 설계해야 합니다.", plan: "경쟁 검색 결과를 기준으로 핵심 서비스 페이지를 정비한 뒤 신뢰 콘텐츠와 재방문 채널을 함께 운영합니다." },
  { name: "논산", slug: "nonsan", areas: "취암동·내동·강경읍·연산면", audience: "지역 매장, 농업 연계 사업, 시공, 교육", market: "도심 생활권과 읍·면 고객이 함께 검색하므로 제공 지역과 출장 범위, 상담 방법을 쉽게 확인할 수 있어야 합니다.", plan: "구체적인 서비스 지역과 작업 사례를 중심으로 검색 페이지를 만들고 지역 커뮤니티 콘텐츠를 보완합니다." },
  { name: "광주", slug: "gwangju", areas: "광산구·서구·북구·남구·동구", audience: "병원, 음식점, 교육, 프랜차이즈", market: "광역 상권과 동네 생활권 검색이 동시에 활발해 업종 키워드와 구·동 단위 콘텐츠를 단계적으로 넓히는 방식이 적합합니다.", plan: "대표 업종 페이지와 지역별 콘텐츠의 역할을 나누고 SNS·블로그·홈페이지의 메시지를 통일합니다." },
  { name: "공주", slug: "gongju", areas: "신관동·웅진동·금학동·유구읍", audience: "관광, 음식점, 교육, 지역 서비스", market: "지역 주민 수요와 관광 방문 수요가 함께 있어 계절성, 위치, 예약·문의 정보를 분명하게 전달해야 합니다.", plan: "검색자가 방문 전에 확인하는 위치·운영 정보와 차별점을 콘텐츠로 만들고 모바일 문의 동선을 단순화합니다." },
  { name: "군산", slug: "gunsan", areas: "수송동·나운동·조촌동·오식도동", audience: "관광, 음식점, 산업 서비스, 시공", market: "생활 상권과 관광권, 산업단지 수요가 구분되므로 고객 유형별로 다른 검색 문구와 사례가 필요합니다.", plan: "고객 유형별 랜딩 페이지와 실제 사례를 준비하고 지도·블로그 검색에서 홈페이지 상담으로 연결합니다." },
  { name: "전주", slug: "jeonju", areas: "완산구·덕진구·효자동·송천동·혁신도시", audience: "외식, 관광, 병원, 교육", market: "관광 목적 검색과 지역 주민의 생활 검색이 겹치므로 목적에 맞는 사진, 후기, 이용 정보를 구분해 제공해야 합니다.", plan: "브랜드 검색 기반을 정리한 뒤 지역·업종 콘텐츠를 축적하고 성과가 확인된 키워드에 광고를 집중합니다." },
  { name: "금산", slug: "geumsan", areas: "금산읍·추부면·진산면·복수면", audience: "지역 상점, 건강식품, 농업 연계 사업, 시공", market: "읍·면 단위의 방문·출장 수요가 중요해 판매 품목과 서비스 가능 지역, 연락 방법을 빠르게 보여줘야 합니다.", plan: "상품·서비스의 신뢰 근거와 지역 범위를 먼저 정리하고 검색 콘텐츠와 온라인 판매 동선을 연결합니다." },
  { name: "용인", slug: "yongin", areas: "수지구·기흥구·처인구·죽전·동백", audience: "교육, 병원, 부동산, 생활 서비스", market: "구별 주거 형태와 생활권 차이가 커서 용인 전체 키워드만으로는 정확한 고객 의도를 잡기 어렵습니다.", plan: "구·동 단위 검색 페이지와 업종 전문 콘텐츠를 함께 만들고 전환이 좋은 생활권부터 범위를 넓힙니다." },
  { name: "천안", slug: "cheonan", areas: "서북구·동남구·불당동·성정동·청수동", audience: "병원, 학원, 음식점, 기업 서비스", market: "신도심과 기존 상권, 산업 수요가 함께 있어 고객군별 검색 의도와 상담 기준을 나눠야 합니다.", plan: "핵심 생활권별 검색 콘텐츠와 서비스 사례를 정리하고 블로그 유입을 홈페이지 문의로 연결합니다." },
  { name: "청주", slug: "cheongju", areas: "흥덕구·상당구·서원구·청원구·오창", audience: "병원, 학원, 음식점, 기업 서비스", market: "도심 생활권과 오창 산업권의 고객 특성이 달라 구·동 단위 검색 의도와 업종별 경쟁 환경을 함께 살펴야 합니다.", plan: "핵심 생활권과 업종별 검색 콘텐츠를 구성하고 블로그·지도 검색에서 홈페이지 상담으로 이어지는 동선을 정리합니다." },
];
const LOCAL_LANDING_SLUGS = new Set(["daejeon", "sejong", "daegu", "nonsan", "gwangju", "gongju", "gunsan", "jeonju", "geumsan", "yongin", "cheonan", "cheongju"]);
const I = [
  ["hospital", "병원"],
  ["lawyer", "변호사"],
  ["construction", "시공"],
  ["interior", "인테리어"],
  ["academy", "학원"],
  ["restaurant", "음식점"],
  ["real-estate", "부동산"],
  ["ecommerce", "온라인 쇼핑몰"],
  ["franchise", "프랜차이즈"],
].map(([slug, name]) => ({ slug, name }));
const HOSPITAL = {
  daejeon: {
    area: "둔산·유성·대덕 등 생활권마다 의료기관 경쟁과 환자 이동 경로가 다른 대전",
    audience: "직장인과 가족 단위 환자가 진료과, 야간·주말 진료, 주차와 대중교통 접근성을 빠르게 비교합니다.",
    plan: "진료과별 검색 의도를 나누고 의료진·장비·진료 절차·내원 동선을 한눈에 확인하도록 구성해 둔산권과 유성권의 경쟁 검색에서 차이를 만듭니다.",
  },
  sejong: {
    area: "새롬·도담·나성 등 신도시 생활권을 중심으로 젊은 가족의 의료 수요가 큰 세종",
    audience: "보호자는 가까운 거리뿐 아니라 소아 진료, 예약 방식, 주차, 진료 시간과 가족이 안심할 정보를 함께 살핍니다.",
    plan: "생활권별 검색어와 가족 중심의 질문을 콘텐츠로 만들고 예약 전 필요한 준비 사항과 내원 과정을 명확하게 안내합니다.",
  },
  jeonju: {
    area: "완산구와 덕진구를 중심으로 지역 소개와 재방문 신뢰가 중요한 전주",
    audience: "환자는 의료진의 설명 방식, 실제 진료 범위, 위치와 주차처럼 꾸준히 다닐 수 있는 조건을 확인합니다.",
    plan: "과장된 표현보다 진료 철학과 상담 과정, 지역 환자가 자주 묻는 질문을 축적해 검색 노출과 신뢰 형성을 함께 설계합니다.",
  },
  daegu: {
    area: "수성구·중구·달서구 등 의료 상권별 경쟁 강도가 높은 대구",
    audience: "환자는 같은 진료과 안에서도 세부 진료 분야와 의료진 경험, 검사·치료 과정, 접근성을 꼼꼼히 비교합니다.",
    plan: "진료 분야별 페이지와 전문 정보 콘텐츠를 세분화하고 병원의 강점이 검색 제목부터 상담 화면까지 일관되게 전달되도록 만듭니다.",
  },
  gwangju: {
    area: "상무·첨단·수완 등 생활권별 의료 수요와 경쟁 환경이 다른 광주",
    audience: "환자는 가까운 위치와 함께 의료진 소개, 진료 과정, 예약 가능 시간과 후기에서 확인할 수 있는 신뢰 정보를 찾습니다.",
    plan: "생활권별 핵심 진료 검색어를 정리하고 의료진과 진료 절차를 이해하기 쉬운 콘텐츠로 축적해 지역 검색의 접점을 넓힙니다.",
  },
  gunsan: {
    area: "도심과 산업단지, 읍·면 배후 지역의 환자가 함께 이동하는 군산",
    audience: "환자는 전화로 확인하기 쉬운 진료 시간, 주차, 위치, 검사 가능 항목과 재방문 편의성을 중요하게 생각합니다.",
    plan: "복잡한 광고 화면보다 큰 글씨의 핵심 안내와 전화 연결을 우선하고 지역에서 반복되는 건강 질문을 꾸준한 검색 콘텐츠로 만듭니다.",
  },
};
const G = [
  {
    key: "blog",
    name: "블로그",
    desc: "콘텐츠 기획 · 검색 노출 · 브랜딩",
    files: [
      "blog-branding.png",
      "blog-home-1.jpg",
      "blog-home-2.png",
      "blog-search-1.png",
      "blog-search-2.png",
      "blog-search-3.png",
    ],
  },
  {
    key: "sns",
    name: "인스타그램 & 스레드",
    desc: "피드 · 릴스 · 스레드 · 계정 운영",
    files: [
      "instagram-1.jpg",
      "thread-insight-1.jpg",
    ],
  },
  {
    key: "cafe",
    name: "카페",
    desc: "커뮤니티 분석 · 정보 콘텐츠 · 바이럴",
    files: [
      "cafe-1.png",
      "cafe-2.png",
      "cafe-3.png",
      "cafe-4.png",
    ],
  },
  {
    key: "seo",
    name: "코드 최적화",
    desc: "검색 구조 · 사이트맵 · 검색광고",
    files: [
      "code-1.png",
      "code-2.png",
      "code-3.png",
      "code-4.png",
      "powerlink-1.png",
      "powerlink-2.png",
    ],
  },
  {
    key: "website",
    name: "홈페이지 제작",
    desc: "기획 · 디자인 · 반응형 제작",
    files: [
      "homepage-1.png",
      "homepage-2.png",
      "homepage-3.png",
      "homepage-4.png",
      "homepage-5.png",
      "homepage-extra.png",
    ],
  },
];
const E = (s) =>
  String(s).replace(
    /[&<>\"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;" })[c],
  );
function H(t, d, p = "", active = "", area = "대한민국") {
  let nav = [
    ["서비스", "services.html"],
    ["업종별 마케팅", "industries.html"],
    ["포트폴리오", "portfolio.html"],
    ["소개", "about.html"],
  ];
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${E(t)}</title><meta name="description" content="${E(d)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${B}${U(p)}"><meta property="og:title" content="${E(t)}"><meta property="og:description" content="${E(d)}"><meta property="og:type" content="website"><meta property="og:url" content="${B}/${p}"><meta property="og:locale" content="ko_KR"><meta property="og:image" content="${B}/assets/service-homepage.png"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="site.css"><link rel="icon" href="favicon.svg"><script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: "마케팅천재", url: `${B}${U(p)}`, telephone: "+82-10-2719-5334", areaServed: area })}</script></head><body><div class="cursor-glow"></div><a class="skip" href="#main">본문 바로가기</a><header class="site-head"><div class="wrap head-row"><a class="brand" href="${U("index.html")}"><span class="brand-mark"><svg viewBox="0 0 24 24"><path d="M2 18V6l4 6 4-6v12M22 8.5C20.8 6.8 19.3 6 17.5 6a6 6 0 1 0 4.5 10v-4h-4.5"/></svg></span><span>마케팅<i>천재</i></span></a><button class="menu" aria-label="메뉴 열기">☰</button><nav class="nav">${nav.map(([n, u]) => `<a href="${U(u)}"${active === u ? ' aria-current="page"' : ""}>${n}</a>`).join("")}</nav><a class="head-call" href="tel:${P}">상담 ${P}</a></div></header><main id="main">`;
}
function F() {
  return `<section class="cta"><div class="wrap"><div class="cta-box"><span class="kicker">FREE CONSULTING</span><h2>내 브랜드에 맞는 마케팅,<br>편하게 이야기해 보세요.</h2><p>8년 경력의 1인 프리랜서가 상담부터 운영까지 직접 진행합니다.</p><div class="cta-actions"><a class="btn primary" href="tel:${P}">전화 상담 ${P}</a></div></div></div></section></main><a class="kakao-float copy" data-copy="${K}" href="#" aria-label="카카오톡 아이디 ${K} 복사"><span><svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.2 4.7 6.6L5.5 22l5-3c.5.1 1 .1 1.5.1 5.5 0 10-3.5 10-8.3S17.5 3 12 3Z"/></svg></span><b>카카오톡 상담</b><strong>${K}</strong></a><footer class="site-foot"><div class="wrap foot-grid"><div><a class="brand" href="${U("index.html")}"><span class="brand-mark"><svg viewBox="0 0 24 24"><path d="M2 18V6l4 6 4-6v12M22 8.5C20.8 6.8 19.3 6 17.5 6a6 6 0 1 0 4.5 10v-4h-4.5"/></svg></span><span>마케팅<i>천재</i></span></a><p>검색에서 발견되고 상담으로 이어지는 흐름을 만듭니다.</p></div><div><h3>서비스</h3>${S.map((s) => `<a href="${U(s.slug + ".html")}">${s.name}</a>`).join("")}<a href="${U("blog-writing.html")}">블로그 원고 작성</a></div><div><h3>상담</h3><a href="tel:${P}">${P}</a><p>카카오톡 ${K}</p></div></div></footer><script src="site.js" defer></script></body></html>`;
}
const icons=['<svg viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4V5Z"/><path d="M8 9h8M8 12h5"/></svg>','<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>','<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M17.5 6.5h.01"/></svg>','<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 9h18M7 6.5h.01"/></svg>','<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M8 11l2 2 4-4"/></svg>'];
const cards = (a) =>
  `<div class="grid">${a.map((x, i) => `<article class="card reveal">${x.ai ? `<div class="service-photo"><img loading="lazy" decoding="async" src="${x.ai}" alt="${x.name} 서비스 이미지"></div>` : ""}<span class="card-icon">${icons[i % icons.length]}</span><span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${x.name}</h3><p>${x.desc}</p><a class="more" href="${x.href}">자세히 보기 →</a></article>`).join("")}</div>`;
const serviceCards = () => [
  ...S.map((x) => ({ ...x, href: x.slug + ".html" })),
  {name:"블로그 원고 작성",desc:"상위노출 목적과 검색 로직에 맞는 업종별 원고를 직접 작성합니다.",href:"blog-writing.html",ai:"assets/ai-service-blog.png"},
];
function home() {
  let d =
    "블로그, 카페, SNS, 홈페이지 제작과 검색 최적화를 상담부터 실행까지 직접 진행하는 8년 경력 1인 프리랜서입니다.";
  return (
    H("온라인 마케팅 1인 프리랜서 마케팅천재 | 전국 상담", d) +
    `<section class="hero home-visual"><div class="video-pair"><video autoplay muted loop playsinline preload="metadata" src="assets/hero-video-1.mp4" aria-label="마케팅 작업 소개 영상"></video></div><div class="video-shade"></div><div class="wrap visual-copy"><span>MARKETING GENIUS</span><p class="hero-hook">거품없는 마케팅, 지금 바로 시작해보세요.</p><h1>검색에서 상담까지,<br>직접 만드는 마케팅</h1><p>불필요한 중간 비용 없이 직접 실행하는 8년 경력 1인 프리랜서</p></div></section>` +
    `<section class="work-section"><div class="wrap"><div class="center-head"><h2>직접 진행하는 서비스</h2><p>상담한 사람이 기획하고, 만들고, 운영합니다.</p></div>${cards(S.map((x) => ({ ...x, href: x.slug + ".html" })))}</div></section>` +
    `<section class="growth-section"><div class="wrap growth-layout"><div class="growth-copy reveal"><span>SEARCH GROWTH</span><h2>감이 아니라<br>흐름을 보고 움직입니다.</h2><p>검색 노출과 콘텐츠 반응을 살피고, 다음 작업에 반영합니다.</p><a href="${U("seo-marketing.html")}">검색 최적화 살펴보기 →</a></div><div class="growth-board reveal"><div class="metric"><span>검색 유입</span><strong class="count-up" data-count="328">0</strong><i>%</i></div><svg viewBox="0 0 640 280" role="img" aria-label="검색 유입 성장 그래프"><defs><linearGradient id="line" x1="0" x2="1"><stop stop-color="#55d9ef"/><stop offset="1" stop-color="#5669ff"/></linearGradient></defs><path class="grid-line" d="M30 230H610M30 170H610M30 110H610M30 50H610"/><path class="growth-area" d="M35 235C100 225 118 202 170 210S245 166 300 178 380 105 430 126 515 58 606 45V245H35Z"/><path class="growth-line" d="M35 235C100 225 118 202 170 210S245 166 300 178 380 105 430 126 515 58 606 45"/><circle cx="606" cy="45" r="8"/></svg><div class="bar-row">${[38,52,47,69,63,82,96].map((n,i)=>`<i style="--h:${n}%;--d:${i*.08}s"></i>`).join("")}</div></div></div></section>` +
    `<section class="direct-section"><div class="wrap direct-card"><div class="direct-photo reveal"><img loading="lazy" decoding="async" src="assets/ai-direct-marketer-work.png" alt="모든 마케팅 작업을 직접 진행하는 1인 프리랜서"><span>DIRECT WORK · NO MIDDLE STEP</span></div><div class="direct-copy reveal"><span class="direct-label">거품 없는 직접 실행</span><h2>마케팅이 비싼 이유는<br>불필요한 중간 과정 때문입니다.</h2><p>실행사라고 하더라도 블로거와 인플루언서 등을 통해 작업을 맡기면 유통비가 발생합니다. 저는 상담부터 기획, 콘텐츠 제작과 최종 확인까지 모든 작업을 직접 진행하기에 거품 없는 온라인 마케팅 작업이 가능합니다.</p><div class="direct-flow"><div><b>01</b><strong>직접 상담</strong></div><i>→</i><div><b>02</b><strong>직접 기획</strong></div><i>→</i><div><b>03</b><strong>직접 실행</strong></div></div><blockquote>저비용으로 고효율의 작업을 추구합니다.<br><strong>마케팅이 필요하시다면 믿고 맡겨주세요.</strong></blockquote></div></div></section>` +
    `<section class="creation-section"><div class="wrap"><div class="center-head"><h2>작업 결과물</h2><p>대표 이미지를 누르면 분야별 실제 결과물을 확인할 수 있습니다.</p></div><div class="creation-grid creation-covers">${[{key:'blog',name:'블로그',cover:'cover-blog-v2.png',desc:'검색 노출 · 콘텐츠 기획'},{key:'cafe',name:'카페',cover:'cover-cafe-v2.png',desc:'커뮤니티 · 정보 콘텐츠'},{key:'sns',name:'인스타그램 & 스레드',cover:'cover-sns-v2.png',desc:'피드 · 릴스 · 스레드'},{key:'seo',name:'코드 최적화',cover:'cover-seo-v2.png',desc:'검색 구조 · 데이터 분석'}].map((g,i)=>`<a class="creation-item creation-cover reveal" href="${U("portfolio.html")}#work-${g.key}"><img loading="lazy" decoding="async" src="assets/${g.cover}" alt="${g.name} 결과물 보기"><div><small>0${i+1}</small><b>${g.name}</b><span>${g.desc}</span></div></a>`).join("")}</div></div></section>` +
    `<section class="partner-section"><div class="center-head"><h2>협업·광고 진행 브랜드</h2><p>다양한 분야의 브랜드와 함께했습니다.</p></div><div class="logo-marquee"><div class="logo-track">${[0,1].map(()=>`<div class="logo-set">${Array.from({length:15},(_,i)=>`<div><img loading="lazy" decoding="async" src="assets/partner-${String(i+1).padStart(2,'0')}.${i>12?'jpg':'png'}" alt="협업 브랜드 로고 ${i+1}"></div>`).join("")}</div>`).join("")}</div></div></section>` +
    F()
  );
}
function hub(type) {
  let a = I.map((x) => ({
          name: x.name + " 마케팅",
          desc: x.name + " 고객의 선택 기준에 맞춰 신뢰할 정보를 구성합니다.",
          href: x.slug + "-marketing.html",
        })),
    t = "업종별 온라인 마케팅";
  return (
    H(
      t + " | 마케팅천재",
      t + " 안내 페이지입니다.",
      type + ".html",
      type + ".html",
    ) +
    `<section class="hero"><div class="wrap"><span class="kicker">INDUSTRY MARKETING</span><h1>${t}</h1><p class="lead">업종 이름만 반복하지 않고 고객이 실제로 궁금한 답을 담습니다.</p></div></section><section class="soft"><div class="wrap">${cards(a)}</div></section>` +
    F()
  );
}
function service(s) {
  let group = G.find((g) => s.slug.startsWith(g.key)) || G.find((g) => g.key === (s.slug.startsWith("website") ? "website" : "seo"));
  let imgs = group.files;
  return (
    H(
      `${s.name} 마케팅 1인 프리랜서 | 마케팅천재`,
      s.desc,
      s.slug + ".html",
      "services.html",
    ) +
    `<section class="hero service-hero"><div class="wrap"><span class="kicker">MARKETING SERVICE</span><h1><em>${s.name}</em>,<br>보여주기보다 문의까지 생각합니다.</h1><p class="lead">${s.desc} 처음부터 끝까지 1인 프리랜서가 직접 진행합니다.</p></div></section><section><div class="wrap">${cards(["현황 진단", "방향 설계", "제작과 운영"].map((name, i) => ({ name, desc: ["현재 채널과 경쟁 환경을 확인합니다.", "상담으로 이어지는 순서를 정리합니다.", "직접 만들고 결과를 보완합니다."][i], href: "about.html" })))}</div></section><section class="service-work soft"><div class="wrap"><div class="center-head"><h2>${s.name} Portfolio</h2><p>${s.name} 분야에서 직접 진행한 작업만 모았습니다.</p></div><div class="photo-grid work-gallery service-gallery">${imgs
      .map(
        (a, i) =>
          `<figure class="reveal"><img loading="lazy" decoding="async" src="assets/${a}" alt="${s.name} 작업 사례 ${i + 1}"></figure>`,
      )
      .join("")}</div></div></section>` +
    F()
  );
}
function hospitalDetail(r = null) {
  const keyword = r ? `${r.name}병원마케팅` : "병원마케팅";
  const path = r ? `${r.slug}-hospital-marketing.html` : "hospital-marketing.html";
  const profile = r ? HOSPITAL[r.slug] : null;
  const desc = r
    ? `${keyword} 전문 1인 프리랜서. ${r.name} 환자의 검색과 내원 동선을 분석해 의료광고 기준을 지키는 블로그·홈페이지·검색 콘텐츠를 직접 운영합니다.`
    : "병원마케팅 전문 1인 프리랜서가 의료광고 기준을 고려해 진료 정보, 블로그, 홈페이지와 지역 검색 콘텐츠를 직접 운영합니다.";
  const regionLinks = `<section class="soft"><div class="wrap"><div class="center-head"><h2>지역별 병원마케팅 안내</h2><p>병원이 위치한 지역을 선택하면 상권과 환자 검색 흐름에 맞춘 전략을 확인할 수 있습니다.</p></div><div class="links">${R.filter((x) => HOSPITAL[x.slug]).map((x) => `<a class="chip" href="${U(`${x.slug}-hospital-marketing.html`)}">${x.name}병원마케팅</a>`).join("")}</div></div></section>`;
  const body = profile
    ? `<section><div class="wrap article"><article class="article-main"><h2>${r.name}에서 병원을 선택하는 기준부터 봅니다</h2><p>${profile.area}에서는 병원 이름을 알리는 것만으로 선택받기 어렵습니다. ${profile.audience}</p><h2>${keyword}, 진료과와 생활권을 함께 분석합니다</h2><p>${profile.plan}</p><h2>신뢰를 해치지 않는 병원 콘텐츠</h2><p>치료 효과를 단정하거나 불안을 자극하는 표현을 피하고, 의료진·진료 범위·검사 과정·운영 정보를 사실에 근거해 전달합니다. 상담부터 기획과 제작, 수정까지 한 명이 직접 맡아 병원의 말투와 정보를 일관되게 관리합니다.</p></article><aside class="aside"><strong>${r.name} 병원 마케팅 핵심</strong><a href="${U("seo-marketing.html")}">진료과별 검색 의도 분석</a><a href="${U("blog-marketing.html")}">지역·생활권 콘텐츠 구성</a><a href="${U("website-production.html")}">홈페이지 예약 동선 점검</a><a href="${U("about.html")}">의료광고 표현 검수</a></aside></div></section>`
    : `<section><div class="wrap article"><article class="article-main"><h2>병원은 진료 정보를 먼저 확인합니다</h2><p>환자는 광고 문구보다 어떤 진료를 받을 수 있는지, 의료진은 누구인지, 예약과 검사 과정은 어떻게 되는지 확인합니다. 진료과별 질문을 이해하기 쉬운 콘텐츠로 정리해 검색부터 상담까지 연결합니다.</p><h2>병원마다 다른 선택 이유를 설계합니다</h2><p>입지와 진료 분야, 주 환자층, 운영 시간과 내원 동선을 분석해 병원만의 정보 구조를 만듭니다. 지역명만 바꾼 글을 반복하지 않고 실제 환자가 궁금해하는 내용을 지역별로 다르게 구성합니다.</p><h2>의료광고 기준을 고려해 직접 운영합니다</h2><p>과장된 효과나 오해를 부르는 표현을 줄이고 확인 가능한 정보를 중심으로 블로그, 홈페이지와 검색 콘텐츠를 제작합니다. 상담한 담당자가 기획과 제작까지 직접 진행합니다.</p></article><aside class="aside"><strong>병원 마케팅 구성</strong><a href="${U("seo-marketing.html")}">진료과 검색 분석</a><a href="${U("blog-marketing.html")}">지역 환자 동선 분석</a><a href="${U("website-production.html")}">블로그·홈페이지 제작</a><a href="${U("about.html")}">검색 구조와 상담 연결</a></aside></div></section>`;
  return (
    H(
      `${keyword} 1인 프리랜서 | 마케팅천재`,
      desc,
      path,
      "industries.html",
    ) +
    `<section class="hero"><div class="wrap"><span class="kicker">HOSPITAL MARKETING</span><h1><em>${keyword}</em>,<br>${r ? `${r.name} 환자가 찾는 정보로<br>` : "환자가 신뢰할 정보로<br>"}선택할 이유를 만듭니다.</h1><p class="lead">${desc}</p><a class="btn primary" href="tel:${P}">${keyword} 상담</a></div></section>` +
    body +
    regionLinks +
    F()
  );
}
function detail(r, i = null) {
  if (!i) {
    const path = `${r.slug}-online-marketing.html`;
    const keyword = `${r.name}온라인마케팅`;
    const title = `${keyword} | 지역 검색 노출 전략`;
    const d = `${keyword} 전략. ${r.areas} 생활권의 검색 흐름에 맞춰 블로그·홈페이지·SNS를 직접 운영합니다.`;
    return (
      H(title, d, path, "", r.name) +
      `<section class="hero home-visual"><div class="video-pair"><video autoplay muted loop playsinline preload="metadata" src="assets/hero-video-1.mp4" aria-label="마케팅 작업 소개 영상"></video></div><div class="video-shade"></div><div class="wrap visual-copy"><span>MARKETING GENIUS · ${r.name.toUpperCase()}</span><p class="hero-hook">거품없는 ${r.name} 마케팅, 지금 바로 시작해보세요.</p><h1>${keyword},<br>검색에서 상담까지</h1><p>${r.name} 검색 흐름에 맞춰 직접 실행하는 8년 경력 1인 프리랜서</p></div></section>` +
      `<section id="local-plan" class="soft"><div class="wrap article"><article class="article-main"><span class="kicker">LOCAL SEARCH INTENT</span><h2>${r.name} 고객의 검색 범위를 먼저 나눕니다</h2><p>${r.market}</p><h2>${r.name} 주요 생활권</h2><p>${r.areas} 등 실제 고객이 서비스를 찾는 생활권과 방문·출장 범위를 기준으로 키워드를 정리합니다. 주소만 넣은 페이지가 아니라 제공 가능한 서비스, 선택 기준과 문의 방법을 함께 보여줍니다.</p><div class="links">${r.areas.split("·").map((x) => `<span class="chip">${x} 온라인마케팅</span>`).join("")}</div><h2>문의까지 이어지는 실행 순서</h2><p>${r.plan}</p><ol class="local-steps"><li><b>01</b><div><strong>검색 결과 진단</strong><p>${r.name} 온라인마케팅과 세부 업종 키워드의 경쟁 페이지, 콘텐츠 유형과 문의 동선을 확인합니다.</p></div></li><li><b>02</b><div><strong>지역 맞춤 콘텐츠</strong><p>${r.audience}처럼 지역에서 경쟁이 필요한 업종을 중심으로 고객 질문에 답하는 콘텐츠를 제작합니다.</p></div></li><li><b>03</b><div><strong>전환과 개선</strong><p>전화·카카오톡으로 이어지는 흐름을 점검하고 검색 반응에 따라 제목, 본문과 내부 링크를 보완합니다.</p></div></li></ol></article><aside class="aside"><strong>${r.name} 추천 채널</strong><a href="blog-marketing.html">네이버 블로그 콘텐츠</a><a href="seo-marketing.html">검색 최적화</a><a href="website-production.html">지역 랜딩 페이지</a><a href="sns-marketing.html">SNS 운영</a><a href="tel:${P}">전화 상담 ${P}</a></aside></div></section>` +
      `<section><div class="wrap"><div class="section-head"><div><span class="kicker">BUSINESS FIT</span><h2>${r.name}에서 이런 브랜드에 적합합니다</h2></div><p>${r.audience} 등 지역 고객의 비교와 문의가 중요한 업종을 우선합니다.</p></div>${cards([{name:"지역 방문형",desc:"매장 위치, 운영 정보와 방문 이유를 검색에서 분명하게 보여줍니다.",href:"restaurant-marketing.html"},{name:"상담 전환형",desc:"전문성과 사례를 충분히 전달해 전화와 카카오톡 상담으로 연결합니다.",href:"hospital-marketing.html"},{name:"출장·시공형",desc:"서비스 가능 지역과 실제 작업 과정을 구체적으로 안내합니다.",href:"construction-marketing.html"}])}</div></section>` +
      `<section class="soft"><div class="wrap"><div class="section-head"><div><span class="kicker">FAQ</span><h2>${r.name} 온라인마케팅 질문</h2></div></div><div class="faq"><details><summary>${r.name} 지역명만 많이 넣으면 상위노출되나요?</summary><p>아닙니다. 지역명 반복보다 검색자가 원하는 서비스 정보, 실제 사례, 운영 주체와 문의 방법을 충실하게 제공해야 합니다.</p></details><details><summary>어떤 채널부터 시작해야 하나요?</summary><p>현재 검색 결과와 보유 콘텐츠를 확인한 뒤 홈페이지, 블로그, SNS 가운데 상담에 가장 가까운 채널부터 정합니다.</p></details><details><summary>성과는 언제 확인할 수 있나요?</summary><p>광고는 빠르게 반응을 볼 수 있지만 자연 검색은 수집과 평가에 시간이 필요합니다. 노출, 유입과 실제 문의를 함께 확인하며 개선합니다.</p></details></div></div></section>` +
      F()
    );
  }
  let pre = `${r ? r.name + " " : ""}${i.name}`,
    path = r
      ? `${r.slug}-${i.slug}-marketing.html`
      : `${i.slug}-marketing.html`,
    d = `${pre} 고객의 검색 흐름과 선택 기준에 맞춰 블로그, SNS, 홈페이지와 검색 최적화를 직접 운영합니다.`;
  return (
    H(
      `${pre} 마케팅 1인 프리랜서 | 마케팅천재`,
      d,
      path,
      "industries.html",
      r ? r.name : "대한민국",
    ) +
    `<section class="hero"><div class="wrap"><span class="kicker">ONLINE MARKETING</span><h1><em>${pre} 마케팅</em>,<br>지역명만 넣지 않고<br>선택할 이유를 만듭니다.</h1><p class="lead">${d}</p><a class="btn primary" href="tel:${P}">마케팅 상담</a></div></section><section><div class="wrap article"><article class="article-main"><h2>고객이 먼저 확인하는 정보</h2><p>브랜드를 고를 때는 광고 문구만 보지 않습니다. 실제 진행 사례와 비용 기준, 문의 뒤 진행 과정을 함께 확인합니다. 어려운 표현과 과장을 줄이고 고객이 판단할 수 있는 내용을 충분히 제공합니다.</p><h2>검색부터 상담까지 연결합니다</h2><p>검색에서 처음 만나는 글과 SNS, 마지막으로 확인하는 홈페이지가 같은 메시지를 전하도록 정리합니다. 빠른 유입이 필요하면 광고를 더하고 꾸준한 콘텐츠로 장기 검색 기반을 함께 쌓습니다.</p></article><aside class="aside"><strong>연결 서비스</strong>${S.map((s) => `<a href="${s.slug}.html">${s.name}</a>`).join("")}</aside></div></section>` +
    F()
  );
}
function writingPage() {
  const title = "블로그 원고 작성 | 상위노출 목적 원고 전문 마케팅천재";
  const desc = "수많은 업종과 브랜드의 원고를 작성한 경험을 바탕으로 검색 상위노출 목적과 로직에 맞는 블로그 글을 작성합니다.";
  return H(title, desc, "blog-writing.html", "blog-writing.html") +
    `<section class="writing-hero"><div class="wrap writing-grid"><div><span class="kicker">BLOG WRITING</span><h1>읽히는 글을 넘어,<br><em>검색되는 원고</em>를 씁니다.</h1><p>수많은 업종과 브랜드의 원고를 작성해 왔으며, 누구보다 상위노출 목적과 검색 로직에 맞는 글을 작성하는 것이 가능합니다.</p><a class="btn primary" href="tel:${P}">원고 작성 상담</a></div><img fetchpriority="high" decoding="async" src="assets/ai-service-blog.png" alt="블로그 원고 작성 작업 공간"></div></section><section class="writing-points"><div class="wrap"><div class="center-head"><h2>원고마다 목적이 달라야 합니다.</h2><p>업종과 키워드, 독자가 궁금해하는 내용을 먼저 분석합니다.</p></div>${cards([{name:"검색 의도 분석",desc:"키워드를 검색한 사람이 원하는 답부터 정리합니다.",href:"blog-marketing.html"},{name:"업종 맞춤 구성",desc:"병원, 법률, 시공, 매장 등 업종에 맞는 흐름으로 작성합니다.",href:"industries.html"},{name:"자연스러운 최적화",desc:"억지 반복 없이 주제와 핵심 표현이 자연스럽게 읽히도록 만듭니다.",href:"seo-marketing.html"}])}</div></section><section class="writing-process"><div class="wrap growth-layout"><div><span class="kicker">WRITING PROCESS</span><h2>자료 확인부터<br>최종 검수까지 직접</h2></div><ol><li><b>01</b><span>업종·서비스·키워드 확인</span></li><li><b>02</b><span>검색 결과와 경쟁 글 분석</span></li><li><b>03</b><span>도입·본문·문의 흐름 작성</span></li><li><b>04</b><span>표현과 검색 구조 최종 검수</span></li></ol></div></section>` + F();
}
function simple(type) {
  if (type === "portfolio") {
    let a = G;
    return (
      H(
        "온라인 마케팅 포트폴리오 | 마케팅천재",
        "기존 사이트의 모든 작업 사진을 확인하세요.",
        "portfolio.html",
        "portfolio.html",
      ) +
      `<section class="hero portfolio-hero"><div class="wrap"><span class="kicker">OUR CREATIONS</span><h1>처음부터 남다르게,<br><em>결과물로 증명합니다.</em></h1><p class="lead">마케팅천재가 직접 진행한 작업을 분야별로 나누어 확인하세요.</p></div></section><nav class="portfolio-nav wrap">${a.map(g=>`<a href="#work-${g.key}">${g.name}</a>`).join("")}</nav>${a.map((g,n)=>`<section class="portfolio-group ${n%2?'soft':''}" id="work-${g.key}"><div class="wrap"><div class="section-head reveal"><div><span class="kicker">0${n+1} · ${g.key.toUpperCase()}</span><h2>${g.name}</h2></div><p>${g.desc}</p></div><div class="photo-grid work-gallery">${g.files.map((x,i)=>`<figure class="reveal"><img loading="lazy" decoding="async" src="assets/${x}" alt="${g.name} 작업 사례 ${i+1}"></figure>`).join("")}</div></div></section>`).join("")}` +
      F()
    );
  }
  let about = type === "about";
  return (
    H(
      about ? "마케팅천재 소개" : "온라인 마케팅 서비스 | 마케팅천재",
      about
        ? "8년 경력 담당자가 직접 진행합니다."
        : "통합 온라인 마케팅 서비스입니다.",
      type + ".html",
      type + ".html",
    ) +
    `<section class="hero"><div class="wrap"><h1>${about ? "말만 하는 사람이 아닌,<br><em>직접 만드는 마케터</em>" : "필요한 채널만 골라<br><em>하나의 흐름으로</em>"}</h1><p class="lead">상담부터 실행과 개선까지 한 담당자가 직접 책임집니다.</p></div></section><section class="soft"><div class="wrap">${cards(about ? S.map((x) => ({ ...x, href: x.slug + ".html" })) : serviceCards())}</div></section>` +
    F()
  );
}
let pages = new Map([
  ["index.html", home()],
  ["services.html", simple("services")],
  ["industries.html", hub("industries")],
  ["portfolio.html", simple("portfolio")],
  ["about.html", simple("about")],
  ["blog-writing.html", writingPage()],
]);
S.forEach((s) => pages.set(s.slug + ".html", service(s)));
R.forEach((r) => {
  if (LOCAL_LANDING_SLUGS.has(r.slug)) pages.set(r.slug + "-online-marketing.html", detail(r));
  I.filter((i) => (i.slug === "hospital" && HOSPITAL[r.slug]) || r.slug === "daejeon").forEach((i) =>
    pages.set(`${r.slug}-${i.slug}-marketing.html`, detail(r, i)),
  );
});
I.forEach((i) => pages.set(i.slug + "-marketing.html", i.slug === "hospital" ? hospitalDetail() : detail(null, i)));
pages.forEach((v, k) =>
  writeFileSync(
    k,
    v.replaceAll("업체", "브랜드").replaceAll("직접 만든 작업", "작업 결과물").replaceAll("처음부터 남다르게", "시작부터 남다르게").replace(/href="([^"#]+)\.html(#[^"]*)?"/g, 'href="/$1$2"').replace("</head>", '<link rel="stylesheet" href="premium.css"></head>').replace("</body>", '<script src="motion-enhance.js" defer></script></body>'),
  ),
);
let day = new Date().toISOString().slice(0, 10);
writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...pages.keys()].map((p) => `<url><loc>${B}${U(p)}</loc><lastmod>${day}</lastmod></url>`).join("")}</urlset>`,
);
writeFileSync(
  "robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${B}/sitemap.xml\n`,
);
writeFileSync(
  "_redirects",
  "/blog.html /blog-marketing.html 301\n/cafe.html /cafe-marketing.html 301\n/instagram.html /sns-marketing.html 301\n/homepage.html /website-production.html 301\n/code-seo.html /seo-marketing.html 301\n" +
    [
      ...R.filter((r) => !LOCAL_LANDING_SLUGS.has(r.slug)).map(
        (r) => `/${r.slug}-online-marketing /regions 301`,
      ),
      ...R.filter((r) => r.slug !== "daejeon").flatMap((r) =>
        I.filter((i) => i.slug !== "hospital").map(
          (i) => `/${r.slug}-${i.slug}-marketing /${i.slug}-marketing 301`,
        ),
      ),
    ].join("\n") + "\n",
);
console.log(
  pages.size + " pages; " + readdirSync("assets").length + " assets preserved",
);
