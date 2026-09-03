import { writeFileSync, readdirSync } from "node:fs";
const B = "https://marketing-genius.wngkgus.workers.dev",
  P = "010-2719-5334",
  K = "26hoon";
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
const RN =
    "대전 세종 전주 대구 안성 평택 부산 광주 군산 이천 증평".split(
      " ",
    ),
  RS =
    "daejeon sejong jeonju daegu anseong pyeongtaek busan gwangju gunsan icheon jeungpyeong".split(
      " ",
    ),
  R = RN.map((name, i) => ({ name, slug: RS[i] }));
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
function H(t, d, p = "", active = "") {
  let nav = [
    ["서비스", "services.html"],
    ["지역별 마케팅", "regions.html"],
    ["업종별 마케팅", "industries.html"],
    ["포트폴리오", "portfolio.html"],
    ["소개", "about.html"],
  ];
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${E(t)}</title><meta name="description" content="${E(d)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${B}/${p}"><meta property="og:title" content="${E(t)}"><meta property="og:description" content="${E(d)}"><meta property="og:image" content="${B}/assets/service-homepage.png"><link rel="stylesheet" href="site.css"><link rel="icon" href="favicon.svg"><script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: "마케팅천재", url: `${B}/${p}`, telephone: "+82-10-2719-5334", areaServed: "대한민국" })}</script></head><body><div class="cursor-glow"></div><a class="skip" href="#main">본문 바로가기</a><header class="site-head"><div class="wrap head-row"><a class="brand" href="index.html"><span class="brand-mark"><svg viewBox="0 0 24 24"><path d="M2 18V6l4 6 4-6v12M22 8.5C20.8 6.8 19.3 6 17.5 6a6 6 0 1 0 4.5 10v-4h-4.5"/></svg></span><span>마케팅<i>천재</i></span></a><button class="menu" aria-label="메뉴 열기">☰</button><nav class="nav">${nav.map(([n, u]) => `<a href="${u}"${active === u ? ' aria-current="page"' : ""}>${n}</a>`).join("")}</nav><a class="head-call" href="tel:${P}">상담 ${P}</a></div></header><main id="main">`;
}
function F() {
  return `<section class="cta"><div class="wrap"><div class="cta-box"><span class="kicker">FREE CONSULTING</span><h2>내 브랜드에 맞는 마케팅,<br>편하게 이야기해 보세요.</h2><p>8년 경력의 1인 프리랜서가 상담부터 운영까지 직접 진행합니다.</p><div class="cta-actions"><a class="btn primary" href="tel:${P}">전화 상담 ${P}</a></div></div></div></section></main><a class="kakao-float copy" data-copy="${K}" href="#" aria-label="카카오톡 아이디 ${K} 복사"><span><svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.2 4.7 6.6L5.5 22l5-3c.5.1 1 .1 1.5.1 5.5 0 10-3.5 10-8.3S17.5 3 12 3Z"/></svg></span><b>카카오톡 상담</b><strong>${K}</strong></a><footer class="site-foot"><div class="wrap foot-grid"><div><a class="brand" href="index.html"><span class="brand-mark"><svg viewBox="0 0 24 24"><path d="M2 18V6l4 6 4-6v12M22 8.5C20.8 6.8 19.3 6 17.5 6a6 6 0 1 0 4.5 10v-4h-4.5"/></svg></span><span>마케팅<i>천재</i></span></a><p>검색에서 발견되고 상담으로 이어지는 흐름을 만듭니다.</p></div><div><h3>서비스</h3>${S.map((s) => `<a href="${s.slug}.html">${s.name}</a>`).join("")}<a href="blog-writing.html">블로그 원고 작성</a></div><div><h3>상담</h3><a href="tel:${P}">${P}</a><p>카카오톡 ${K}</p></div></div></footer><script src="site.js" defer></script></body></html>`;
}
const icons=['<svg viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4V5Z"/><path d="M8 9h8M8 12h5"/></svg>','<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>','<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M17.5 6.5h.01"/></svg>','<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 9h18M7 6.5h.01"/></svg>','<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M8 11l2 2 4-4"/></svg>'];
const cards = (a) =>
  `<div class="grid">${a.map((x, i) => `<article class="card reveal">${x.ai ? `<div class="service-photo"><img src="${x.ai}" alt="${x.name} 서비스 이미지"></div>` : ""}<span class="card-icon">${icons[i % icons.length]}</span><span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${x.name}</h3><p>${x.desc}</p><a class="more" href="${x.href}">자세히 보기 →</a></article>`).join("")}</div>`;
const serviceCards = () => [
  ...S.map((x) => ({ ...x, href: x.slug + ".html" })),
  {name:"블로그 원고 작성",desc:"상위노출 목적과 검색 로직에 맞는 업종별 원고를 직접 작성합니다.",href:"blog-writing.html",ai:"assets/ai-service-blog.png"},
];
function home() {
  let d =
    "마케팅천재는 블로그·카페·SNS·홈페이지 제작과 검색 최적화를 직접 진행하는 8년 경력 1인 마케팅 전문가입니다.";
  return (
    H("온라인 마케팅 1인 프리랜서 마케팅천재 | 전국 상담", d) +
    `<section class="hero home-visual"><div class="video-pair"><video autoplay muted loop playsinline preload="auto" src="assets/hero-video-1.mp4"></video></div><div class="video-shade"></div><div class="wrap visual-copy"><span>MARKETING GENIUS</span><p class="hero-hook">거품없는 마케팅, 지금 바로 시작해보세요.</p><h1>검색에서 상담까지,<br>직접 만드는 마케팅</h1><p>불필요한 중간 비용 없이 직접 실행하는 8년 경력 1인 프리랜서</p></div></section>` +
    `<section class="work-section"><div class="wrap"><div class="center-head"><h2>직접 진행하는 서비스</h2><p>상담한 사람이 기획하고, 만들고, 운영합니다.</p></div>${cards(S.map((x) => ({ ...x, href: x.slug + ".html" })))}</div></section>` +
    `<section class="growth-section"><div class="wrap growth-layout"><div class="growth-copy reveal"><span>SEARCH GROWTH</span><h2>감이 아니라<br>흐름을 보고 움직입니다.</h2><p>검색 노출과 콘텐츠 반응을 살피고, 다음 작업에 반영합니다.</p><a href="seo-marketing.html">검색 최적화 살펴보기 →</a></div><div class="growth-board reveal"><div class="metric"><span>검색 유입</span><strong class="count-up" data-count="328">0</strong><i>%</i></div><svg viewBox="0 0 640 280" role="img" aria-label="검색 유입 성장 그래프"><defs><linearGradient id="line" x1="0" x2="1"><stop stop-color="#55d9ef"/><stop offset="1" stop-color="#5669ff"/></linearGradient></defs><path class="grid-line" d="M30 230H610M30 170H610M30 110H610M30 50H610"/><path class="growth-area" d="M35 235C100 225 118 202 170 210S245 166 300 178 380 105 430 126 515 58 606 45V245H35Z"/><path class="growth-line" d="M35 235C100 225 118 202 170 210S245 166 300 178 380 105 430 126 515 58 606 45"/><circle cx="606" cy="45" r="8"/></svg><div class="bar-row">${[38,52,47,69,63,82,96].map((n,i)=>`<i style="--h:${n}%;--d:${i*.08}s"></i>`).join("")}</div></div></div></section>` +
    `<section class="direct-section"><div class="wrap direct-card"><div class="direct-photo reveal"><img src="assets/ai-direct-marketer-work.png" alt="모든 마케팅 작업을 직접 진행하는 1인 프리랜서"><span>DIRECT WORK · NO MIDDLE STEP</span></div><div class="direct-copy reveal"><span class="direct-label">거품 없는 직접 실행</span><h2>마케팅이 비싼 이유는<br>불필요한 중간 과정 때문입니다.</h2><p>실행사라고 하더라도 블로거와 인플루언서 등을 통해 작업을 맡기면 유통비가 발생합니다. 저는 상담부터 기획, 콘텐츠 제작과 최종 확인까지 모든 작업을 직접 진행하기에 거품 없는 온라인 마케팅 작업이 가능합니다.</p><div class="direct-flow"><div><b>01</b><strong>직접 상담</strong></div><i>→</i><div><b>02</b><strong>직접 기획</strong></div><i>→</i><div><b>03</b><strong>직접 실행</strong></div></div><blockquote>저비용으로 고효율의 작업을 추구합니다.<br><strong>마케팅이 필요하시다면 믿고 맡겨주세요.</strong></blockquote></div></div></section>` +
    `<section class="creation-section"><div class="wrap"><div class="center-head"><h2>작업 결과물</h2><p>대표 이미지를 누르면 분야별 실제 결과물을 확인할 수 있습니다.</p></div><div class="creation-grid creation-covers">${[{key:'blog',name:'블로그',cover:'cover-blog-v2.png',desc:'검색 노출 · 콘텐츠 기획'},{key:'cafe',name:'카페',cover:'cover-cafe-v2.png',desc:'커뮤니티 · 정보 콘텐츠'},{key:'sns',name:'인스타그램 & 스레드',cover:'cover-sns-v2.png',desc:'피드 · 릴스 · 스레드'},{key:'seo',name:'코드 최적화',cover:'cover-seo-v2.png',desc:'검색 구조 · 데이터 분석'}].map((g,i)=>`<a class="creation-item creation-cover reveal" href="portfolio.html#work-${g.key}"><img src="assets/${g.cover}" alt="${g.name} 결과물 보기"><div><small>0${i+1}</small><b>${g.name}</b><span>${g.desc}</span></div></a>`).join("")}</div></div></section>` +
    `<section class="partner-section"><div class="center-head"><h2>협업·광고 진행 브랜드</h2><p>다양한 분야의 브랜드와 함께했습니다.</p></div><div class="logo-marquee"><div class="logo-track">${[0,1].map(()=>`<div class="logo-set">${Array.from({length:15},(_,i)=>`<div><img src="assets/partner-${String(i+1).padStart(2,'0')}.${i>12?'jpg':'png'}" alt="협업 브랜드 로고 ${i+1}"></div>`).join("")}</div>`).join("")}</div></div></section>` +
    F()
  );
}
function hub(type) {
  let reg = type === "regions",
    a = reg
      ? R.map((x) => ({
          name: x.name + " 온라인 마케팅",
          desc: x.name + " 고객의 검색 흐름과 업종 특성을 반영합니다.",
          href: x.slug + "-online-marketing.html",
        }))
      : I.map((x) => ({
          name: x.name + " 마케팅",
          desc: x.name + " 고객의 선택 기준에 맞춰 신뢰할 정보를 구성합니다.",
          href: x.slug + "-marketing.html",
        })),
    t = reg ? "전국 지역별 온라인 마케팅" : "업종별 온라인 마케팅";
  return (
    H(
      t + " | 마케팅천재",
      t + " 안내 페이지입니다.",
      type + ".html",
      type + ".html",
    ) +
    `<section class="hero"><div class="wrap"><span class="kicker">${reg ? "LOCAL" : "INDUSTRY"} MARKETING</span><h1>${t}</h1><p class="lead">지역과 업종 이름만 반복하지 않고 고객이 실제로 궁금한 답을 담습니다.</p></div></section><section class="soft"><div class="wrap">${cards(a)}</div></section>` +
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
          `<figure class="reveal"><img loading="lazy" src="assets/${a}" alt="${s.name} 작업 사례 ${i + 1}"></figure>`,
      )
      .join("")}</div></div></section>` +
    F()
  );
}
function detail(r, i = null) {
  let pre = i ? `${r ? r.name + " " : ""}${i.name}` : r.name,
    path = i
      ? r
        ? `${r.slug}-${i.slug}-marketing.html`
        : `${i.slug}-marketing.html`
      : `${r.slug}-online-marketing.html`,
    d = `${pre} 고객의 검색 흐름과 선택 기준에 맞춰 블로그, SNS, 홈페이지와 검색 최적화를 직접 운영합니다.`;
  return (
    H(
      `${pre} 마케팅 1인 프리랜서 | 마케팅천재`,
      d,
      path,
      i ? "industries.html" : "regions.html",
    ) +
    `<section class="hero"><div class="wrap"><span class="kicker">ONLINE MARKETING</span><h1><em>${pre} 마케팅</em>,<br>지역명만 넣지 않고<br>선택할 이유를 만듭니다.</h1><p class="lead">${d}</p><a class="btn primary" href="tel:${P}">마케팅 상담</a></div></section><section><div class="wrap article"><article class="article-main"><h2>고객이 먼저 확인하는 정보</h2><p>업체를 고를 때는 광고 문구만 보지 않습니다. 실제 진행 사례와 비용 기준, 문의 뒤 진행 과정을 함께 확인합니다. 어려운 표현과 과장을 줄이고 고객이 판단할 수 있는 내용을 충분히 제공합니다.</p><h2>검색부터 상담까지 연결합니다</h2><p>검색에서 처음 만나는 글과 SNS, 마지막으로 확인하는 홈페이지가 같은 메시지를 전하도록 정리합니다. 빠른 유입이 필요하면 광고를 더하고 꾸준한 콘텐츠로 장기 검색 기반을 함께 쌓습니다.</p>${!i ? `<h2>${r.name} 업종별 마케팅</h2><div class="links">${I.map((x) => `<a class="chip" href="${r.slug}-${x.slug}-marketing.html">${r.name} ${x.name}</a>`).join("")}</div>` : ""}</article><aside class="aside"><strong>연결 서비스</strong>${S.map((s) => `<a href="${s.slug}.html">${s.name}</a>`).join("")}</aside></div></section>` +
    F()
  );
}
function writingPage() {
  const title = "블로그 원고 작성 | 상위노출 목적 원고 전문 마케팅천재";
  const desc = "수많은 업종과 브랜드의 원고를 작성한 경험을 바탕으로 검색 상위노출 목적과 로직에 맞는 블로그 글을 작성합니다.";
  return H(title, desc, "blog-writing.html", "blog-writing.html") +
    `<section class="writing-hero"><div class="wrap writing-grid"><div><span class="kicker">BLOG WRITING</span><h1>읽히는 글을 넘어,<br><em>검색되는 원고</em>를 씁니다.</h1><p>수많은 업종과 브랜드의 원고를 작성해 왔으며, 누구보다 상위노출 목적과 검색 로직에 맞는 글을 작성하는 것이 가능합니다.</p><a class="btn primary" href="tel:${P}">원고 작성 상담</a></div><img src="assets/ai-service-blog.png" alt="블로그 원고 작성 작업 공간"></div></section><section class="writing-points"><div class="wrap"><div class="center-head"><h2>원고마다 목적이 달라야 합니다.</h2><p>업종과 키워드, 독자가 궁금해하는 내용을 먼저 분석합니다.</p></div>${cards([{name:"검색 의도 분석",desc:"키워드를 검색한 사람이 원하는 답부터 정리합니다.",href:"blog-marketing.html"},{name:"업종 맞춤 구성",desc:"병원, 법률, 시공, 매장 등 업종에 맞는 흐름으로 작성합니다.",href:"industries.html"},{name:"자연스러운 최적화",desc:"억지 반복 없이 주제와 핵심 표현이 자연스럽게 읽히도록 만듭니다.",href:"seo-marketing.html"}])}</div></section><section class="writing-process"><div class="wrap growth-layout"><div><span class="kicker">WRITING PROCESS</span><h2>자료 확인부터<br>최종 검수까지 직접</h2></div><ol><li><b>01</b><span>업종·서비스·키워드 확인</span></li><li><b>02</b><span>검색 결과와 경쟁 글 분석</span></li><li><b>03</b><span>도입·본문·문의 흐름 작성</span></li><li><b>04</b><span>표현과 검색 구조 최종 검수</span></li></ol></div></section>` + F();
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
      `<section class="hero portfolio-hero"><div class="wrap"><span class="kicker">OUR CREATIONS</span><h1>처음부터 남다르게,<br><em>결과물로 증명합니다.</em></h1><p class="lead">마케팅천재가 직접 진행한 작업을 분야별로 나누어 확인하세요.</p></div></section><nav class="portfolio-nav wrap">${a.map(g=>`<a href="#work-${g.key}">${g.name}</a>`).join("")}</nav>${a.map((g,n)=>`<section class="portfolio-group ${n%2?'soft':''}" id="work-${g.key}"><div class="wrap"><div class="section-head reveal"><div><span class="kicker">0${n+1} · ${g.key.toUpperCase()}</span><h2>${g.name}</h2></div><p>${g.desc}</p></div><div class="photo-grid work-gallery">${g.files.map((x,i)=>`<figure class="reveal"><img loading="lazy" src="assets/${x}" alt="${g.name} 작업 사례 ${i+1}"></figure>`).join("")}</div></div></section>`).join("")}` +
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
  ["regions.html", hub("regions")],
  ["industries.html", hub("industries")],
  ["portfolio.html", simple("portfolio")],
  ["about.html", simple("about")],
  ["blog-writing.html", writingPage()],
]);
S.forEach((s) => pages.set(s.slug + ".html", service(s)));
R.forEach((r) => {
  pages.set(r.slug + "-online-marketing.html", detail(r));
  I.forEach((i) =>
    pages.set(`${r.slug}-${i.slug}-marketing.html`, detail(r, i)),
  );
});
I.forEach((i) => pages.set(i.slug + "-marketing.html", detail(null, i)));
pages.forEach((v, k) =>
  writeFileSync(
    k,
    v.replaceAll("업체", "브랜드").replaceAll("직접 만든 작업", "작업 결과물").replaceAll("처음부터 남다르게", "시작부터 남다르게").replace("</head>", '<link rel="stylesheet" href="premium.css"></head>').replace("</body>", '<script src="motion-enhance.js" defer></script></body>'),
  ),
);
let day = new Date().toISOString().slice(0, 10);
writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...pages.keys()].map((p) => `<url><loc>${B}/${p === "index.html" ? "" : p}</loc><lastmod>${day}</lastmod></url>`).join("")}</urlset>`,
);
writeFileSync(
  "robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${B}/sitemap.xml\n`,
);
writeFileSync(
  "_redirects",
  "/blog.html /blog-marketing.html 301\n/cafe.html /cafe-marketing.html 301\n/instagram.html /sns-marketing.html 301\n/homepage.html /website-production.html 301\n/code-seo.html /seo-marketing.html 301\n",
);
console.log(
  pages.size + " pages; " + readdirSync("assets").length + " assets preserved",
);
