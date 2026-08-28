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
}));
const RN =
    "서울 부산 대구 인천 광주 대전 울산 세종 수원 용인 고양 성남 화성 청주 천안 전주 평택 안산 안양 김포 파주 남양주 의정부 하남 원주 춘천 강릉 창원 김해 양산 진주 포항 구미 경주 군산 익산 목포 여수 순천 제주 안성 충주 금산".split(
      " ",
    ),
  RS =
    "seoul busan daegu incheon gwangju daejeon ulsan sejong suwon yongin goyang seongnam hwaseong cheongju cheonan jeonju pyeongtaek ansan anyang gimpo paju namyangju uijeongbu hanam wonju chuncheon gangneung changwon gimhae yangsan jinju pohang gumi gyeongju gunsan iksan mokpo yeosu suncheon jeju anseong chungju geumsan".split(
      " ",
    ),
  R = RN.map((name, i) => ({ name, slug: RS[i] }));
const I = [
  ["hospital", "병원"],
  ["lawyer", "변호사"],
  ["construction", "시공업체"],
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
      "thumb-blog-1.jpg",
      "thumb-blog-2.jpg",
      "thumb-blog-3.jpg",
      "thumb-blog-4.jpg",
    ],
  },
  {
    key: "sns",
    name: "인스타그램 & 스레드",
    desc: "피드 · 릴스 · 스레드 · 계정 운영",
    files: [
      "instagram-1.jpg",
      "threads-1.jpg",
      "thread-insight-1.jpg",
      "thumb-instagram-1.jpg",
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
      "thumb-cafe-1.jpg",
      "thumb-cafe-2.jpg",
      "thumb-cafe-3.jpg",
      "thumb-cafe-4.jpg",
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
      "thumb-code-1.jpg",
      "thumb-code-2.jpg",
      "thumb-code-3.jpg",
      "thumb-code-4.jpg",
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
      "thumb-homepage-1.jpg",
      "thumb-homepage-2.jpg",
      "thumb-homepage-3.jpg",
      "thumb-homepage-4.jpg",
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
  return `<section class="cta"><div class="wrap"><div class="cta-box"><span class="kicker">FREE CONSULTING</span><h2>우리 업체에 맞는 마케팅,<br>편하게 이야기해 보세요.</h2><p>8년 경력 담당자가 상담부터 운영까지 직접 진행합니다.</p><div class="cta-actions"><a class="btn primary" href="tel:${P}">전화 상담 ${P}</a><button class="btn copy" data-copy="${K}">카카오톡 ID 복사 ${K}</button></div></div></div></section></main><footer class="site-foot"><div class="wrap foot-grid"><div><a class="brand" href="index.html">마케팅<i>천재</i></a><p>검색에서 발견되고 상담으로 이어지는 흐름을 만듭니다.</p></div><div><h3>서비스</h3>${S.map((s) => `<a href="${s.slug}.html">${s.name}</a>`).join("")}</div><div><h3>상담</h3><a href="tel:${P}">${P}</a><p>카카오톡 ${K}</p></div></div></footer><script src="site.js" defer></script></body></html>`;
}
const cards = (a) =>
  `<div class="grid">${a.map((x, i) => `<article class="card reveal"><span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${x.name}</h3><p>${x.desc}</p><a class="more" href="${x.href}">자세히 보기 →</a></article>`).join("")}</div>`;
function home() {
  let d =
    "블로그, 카페, SNS, 홈페이지 제작과 검색 최적화를 상담부터 실행까지 직접 진행하는 온라인 마케팅 전문 실행사입니다.";
  return (
    H("온라인 마케팅 전문 실행사 마케팅천재 | 전국 상담", d) +
    `<section class="hero"><div class="wrap hero-grid"><div><span class="kicker">8 YEARS · ONE PERSON STUDIO</span><h1>검색에서 발견되고,<br><em>상담으로 이어지는</em><br>마케팅을 만듭니다.</h1><p class="lead">고객이 무엇을 찾고 어떤 정보를 확인한 뒤 연락하는지 한 흐름으로 설계합니다.</p><a class="btn primary" href="tel:${P}">무료 진단 받기</a></div><div class="hero-card"><img src="assets/homepage-1.png" alt="홈페이지 제작 사례"><div class="stamp">상담부터<br>실행까지<br>직접</div></div></div></section><section><div class="wrap"><div class="section-head"><div><span class="kicker">WHAT WE DO</span><h2>필요한 채널을<br>하나의 흐름으로</h2></div></div>${cards(S.map((x) => ({ ...x, href: x.slug + ".html" })))}</div></section><section class="soft"><div class="wrap"><div class="proof"><div><strong>8년</strong><span>실무 경력</span></div><div><strong>1:1</strong><span>직접 진행</span></div><div><strong>5가지</strong><span>통합 서비스</span></div><div><strong>전국</strong><span>비대면 상담</span></div></div></div></section>` +
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
      `${s.name} 마케팅 전문 실행사 | 마케팅천재`,
      s.desc,
      s.slug + ".html",
      "services.html",
    ) +
    `<section class="hero"><div class="wrap"><span class="kicker">MARKETING SERVICE</span><h1><em>${s.name}</em>,<br>보여주기보다 문의까지 생각합니다.</h1><p class="lead">${s.desc} 담당자가 바뀌지 않고 처음부터 끝까지 직접 진행합니다.</p></div></section><section><div class="wrap">${cards(["현황 진단", "방향 설계", "제작과 운영"].map((name, i) => ({ name, desc: ["현재 채널과 경쟁 환경을 확인합니다.", "상담으로 이어지는 순서를 정리합니다.", "직접 만들고 결과를 보완합니다."][i], href: "about.html" })))}</div></section><section class="soft"><div class="wrap"><div class="photo-grid">${imgs
      .slice(0, 12)
      .map(
        (a, i) =>
          `<figure><img loading="lazy" src="assets/${a}" alt="${s.name} 작업 사례 ${i + 1}"></figure>`,
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
      `${pre} 마케팅 전문 실행사 | 마케팅천재`,
      d,
      path,
      i ? "industries.html" : "regions.html",
    ) +
    `<section class="hero"><div class="wrap"><span class="kicker">ONLINE MARKETING</span><h1><em>${pre} 마케팅</em>,<br>지역명만 넣지 않고<br>선택할 이유를 만듭니다.</h1><p class="lead">${d}</p><a class="btn primary" href="tel:${P}">마케팅 상담</a></div></section><section><div class="wrap article"><article class="article-main"><h2>고객이 먼저 확인하는 정보</h2><p>업체를 고를 때는 광고 문구만 보지 않습니다. 실제 진행 사례와 비용 기준, 문의 뒤 진행 과정을 함께 확인합니다. 어려운 표현과 과장을 줄이고 고객이 판단할 수 있는 내용을 충분히 제공합니다.</p><h2>검색부터 상담까지 연결합니다</h2><p>검색에서 처음 만나는 글과 SNS, 마지막으로 확인하는 홈페이지가 같은 메시지를 전하도록 정리합니다. 빠른 유입이 필요하면 광고를 더하고 꾸준한 콘텐츠로 장기 검색 기반을 함께 쌓습니다.</p>${!i ? `<h2>${r.name} 업종별 마케팅</h2><div class="links">${I.map((x) => `<a class="chip" href="${r.slug}-${x.slug}-marketing.html">${r.name} ${x.name}</a>`).join("")}</div>` : ""}</article><aside class="aside"><strong>연결 서비스</strong>${S.map((s) => `<a href="${s.slug}.html">${s.name}</a>`).join("")}</aside></div></section>` +
    F()
  );
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
    `<section class="hero"><div class="wrap"><h1>${about ? "말만 하는 사람이 아닌,<br><em>직접 만드는 마케터</em>" : "필요한 채널만 골라<br><em>하나의 흐름으로</em>"}</h1><p class="lead">상담부터 실행과 개선까지 한 담당자가 직접 책임집니다.</p></div></section><section class="soft"><div class="wrap">${cards(S.map((x) => ({ ...x, href: x.slug + ".html" })))}</div></section>` +
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
]);
S.forEach((s) => pages.set(s.slug + ".html", service(s)));
R.forEach((r) => {
  pages.set(r.slug + "-online-marketing.html", detail(r));
  I.forEach((i) =>
    pages.set(`${r.slug}-${i.slug}-marketing.html`, detail(r, i)),
  );
});
I.forEach((i) => pages.set(i.slug + "-marketing.html", detail(null, i)));
pages.forEach((v, k) => writeFileSync(k, v));
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
