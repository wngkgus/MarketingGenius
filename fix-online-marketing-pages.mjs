import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const additions = [
  {
    name:'용인', slug:'yongin', upper:'YONGIN',
    description:'수지·기흥·처인 생활권의 고객 성격과 업종 경쟁이 다른 용인에서는 실제 영업 지역과 고객의 비교 기준을 나눠야 합니다. 검색 콘텐츠와 홈페이지 상담 동선을 연결해 선택 이유가 분명한 구조를 만듭니다.',
    hero:'생활권별 고객 검색을 나눠 설계합니다.',
    strategy:'용인은 수지의 주거·교육 수요, 기흥의 상업·업무 수요, 처인의 넓은 생활권처럼 고객이 찾는 방식이 다릅니다. 서비스 가능 지역과 업종을 먼저 나누고 검색어와 콘텐츠의 우선순위를 정합니다.',
    intent:'용인 고객이 위치와 접근성을 확인하는지, 전문성과 사례를 비교하는지에 따라 필요한 정보가 달라집니다. 생활권별 검색 의도와 서비스 설명을 연결해 실제 상담으로 이어질 수 있는 흐름을 구성합니다.'
  },
  {
    name:'안성', slug:'anseong', upper:'ANSEONG',
    description:'도심·공도·산업단지·대학가의 고객 수요가 다른 안성에서는 업종과 서비스 반경을 명확하게 설명해야 합니다. 지역 검색 콘텐츠와 홈페이지 정보를 연결해 문의 가능한 고객에게 정확히 도달하도록 설계합니다.',
    hero:'고객군별 검색 의도를 나눠 설계합니다.',
    strategy:'안성은 도심 생활권, 공도 주거권, 산업단지와 대학가의 검색 목적이 서로 다릅니다. 하나의 지역명만 반복하기보다 실제 고객군과 제공 가능한 서비스 범위를 기준으로 검색 주제를 세분화합니다.',
    intent:'안성 고객이 방문 가능 여부, 제공 범위, 비용과 전문성을 확인하는 흐름을 반영합니다. 지역 정보와 서비스 설명, FAQ를 연결해 검색 이후 필요한 정보를 한 페이지에서 확인하도록 구성합니다.'
  }
];

const source = readFileSync('suwon-online-marketing.html','utf8');
const sourceDescription='상권 규모가 크고 경쟁 업체가 많은 수원에서는 단순히 검색 결과에 보이는 것만으로 부족합니다. 권역과 업종, 고객의 비교 기준을 나눠 페이지와 콘텐츠를 설계해 브랜드 선택 이유를 분명하게 만듭니다.';
const sourceStrategy='수원은 광교·인계·영통 등 상권별 고객 성격이 다르고 인접 도시와 검색 범위도 겹칩니다. 지역 전체를 하나의 문장으로 설명하기보다 서비스 범위와 고객층을 기준으로 검색어 묶음을 세분화합니다.';
const sourceIntent='경쟁이 강한 검색어만 고집하기보다 상담 가능성이 높은 구체적인 검색 의도를 함께 확보합니다. 서비스 랜딩, 사례형 콘텐츠, FAQ를 연결해 고객이 비교 과정에서 필요한 정보를 순서대로 확인하도록 구성합니다.';

function removeVisibleRegionDirectory(html){
  html=html.replaceAll('<a href="#regions">다른 지역</a>','');
  html=html.replace(/<section class="section" id="regions">[\s\S]*?<\/section>(?=<section class="cta">)/,'');
  return html;
}

for(const city of additions){
  let html=source
    .replaceAll(sourceDescription,city.description)
    .replaceAll(sourceStrategy,city.strategy)
    .replaceAll(sourceIntent,city.intent)
    .replaceAll('SUWON',city.upper)
    .replaceAll('suwon',city.slug)
    .replaceAll('수원',city.name)
    .replace('상권별 경쟁을 나눠 전략을 설계합니다.',city.hero);
  html=removeVisibleRegionDirectory(html);
  writeFileSync(`${city.slug}-online-marketing.html`,html,'utf8');
}

for(const file of readdirSync('.').filter(name=>name.endsWith('-online-marketing.html'))){
  const html=removeVisibleRegionDirectory(readFileSync(file,'utf8'));
  writeFileSync(file,html,'utf8');
}

console.log('Online marketing pages cleaned; Yongin and Anseong added.');
