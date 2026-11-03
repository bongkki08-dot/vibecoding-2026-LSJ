import { useEffect, useRef, useState } from 'react';
import { SiteHeader, WelfareSection, TasksSection, RequirementSection, ExpositionSection, ApplySection } from './sections.jsx';

function ScrollSmoothingToggle() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event) => setDisabled(event.matches);
    setDisabled(preference.matches);
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = disabled ? 'auto' : 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, [disabled]);

  return (
    <input className="scroll-smoothing-toggle" id="scroll-smoothing-toggle" type="checkbox" aria-label="부드러운 스크롤 끄기" title="체크하면 부드러운 스크롤을 끕니다" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
  );
}

function MainVisualSection() {
  return (
    <section className="main-visual" id="main-visual" aria-label="한미그룹 2026년 하반기 공개채용">
      <div className="mv-container">
        <div className="mv-visual" aria-hidden="true">
          <img className="micro updown" src="./images/mv_micro_png.png" alt="" />
          <img className="char1 updown" src="./images/mv_char1_png.png" alt="" />
          <img className="char2 updown" src="./images/mv_char2_png.png" alt="" />
          <img className="char3 updown" src="./images/mv_char3_png.png" alt="" />
          <img className="char4 updown" src="./images/mv_char4_png.png" alt="" />
          <span className="star star1"></span>
          <span className="star star2"></span>
          <span className="star star3"></span>
          <span className="star star3 big"></span>
          <span className="star star4"></span>
        </div>
        <div className="mv-copy">
          <div className="mv-text">
            <h1 className="mv-title">
              <span className="mv-season">
{"2026년 하반기"}
              </span>
              <span className="mv-title-wrap">
                <span className="mv-brand">
{"한미그룹"}
                </span>
                <span className="mv-kind">
{"공개채용"}
                </span>
              </span>
            </h1>
            <p className="mv-period">
{"모집기간 : 2026.9.28(월) ~ 2026.10.18(일) 23:59까지"}
            </p>
          </div>
          <div>
            <a className="btn btn-main" href="#tasks">
{"모집직무 바로가기!"}
            </a>
          </div>
        </div>
        <a className="scroll-down" href="#tasks" aria-label="아래로 스크롤">
          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M10 15l10 10 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}

function MiraeSection() {
  return (
    <section className="mirae" id="mirae" aria-labelledby="mirae-title">
      <div className="mr-container">
        <h2 className="mr-title" id="mirae-title">
          <span className="mr-point">
{"새로운 미래"}
          </span>
{"를 향해 나아갑니다"}
        </h2>
        <img className="mr-cloud1" src="./images/mirae_cloud1.png" alt="구름 장식" />
        <img className="mr-cloud2" src="./images/mirae_cloud2.png" alt="구름 장식" />
        <img className="mr-cloud3" src="./images/mirae_cloud3.png" alt="구름 장식" />
        <img className="mr-cloud4" src="./images/mirae_cloud4.png" alt="구름 장식" />
        <div className="mr-walking hanmi-walker">
          <iframe className="mr-walker-frame" src="./hanmi-eye-tracking/embed.html" title="마우스를 바라보며 걷는 캐릭터" loading="lazy" />
        </div>
        <img className="mr-star1" src="./images/mirae_star1.png" alt="별 장식" />
        <img className="mr-star2" src="./images/mirae_star2.png" alt="별 장식" />
      </div>
    </section>
  );
}

function HistorySection() {
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState('');

  useEffect(() => {
    if (!expanded || !contentRef.current) return undefined;
    const updateHeight = () => setMaxHeight(`${contentRef.current.scrollHeight}px`);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [expanded]);

  function toggleHistory() {
    if (!expanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
      setExpanded(true);
      return;
    }
    setExpanded(false);
    setMaxHeight('');
    const sectionTop = document.getElementById('history').getBoundingClientRect().top + window.scrollY;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: sectionTop - 50, behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  return (
    <section className="history" id="history" aria-labelledby="history-title">
      <div className="hs-deco" aria-hidden="true">
        <span className="hs-spark s1"></span>
        <span className="hs-spark s2"></span>
        <span className="hs-spark s3"></span>
        <img className="hs-beaker" src="./images/his_beaker.png" alt="" onError={(event) => { event.currentTarget.hidden = true; }} />
      </div>
      <div ref={contentRef} className={`hs-container ${expanded ? 'is-expanded' : 'is-collapsed'}`} id="history-container" style={maxHeight ? { maxHeight } : undefined}>
        <h2 className="hs-title" id="history-title">
{"한미의 도전은 작은 가능성에서 시작되었습니다."}
        </h2>
        <div className="hs-num">
{"53"}
          <span className="th">
{"th"}
          </span>
        </div>
        <div className="hs-content-wrap">
          <div className="hs-timeline-line" aria-hidden="true"></div>
          <div className="hs-block">
            <div className="hs-col">
              <span className="hs-desc-head">
{"한계를 하나씩 넘을 때마다,"}
              </span>
              <div className="hs-list">
                <div className="hs-row">
                  <span>
{"창립 제정업무 개시 및 설립"}
                  </span>
{' '}
                  <span className="yr">
{"1973"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"일동바비신 공장 신축"}
                  </span>
{' '}
                  <span className="yr">
{"1984"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"세프트리악손 정맥주사제 기술 수출"}
                  </span>
{' '}
                  <span className="yr">
{"1989"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"펜디크로페낙 세계최초 겔화식물 기술 수출"}
                  </span>
{' '}
                  <span className="yr">
{"1997"}
                  </span>
                </div>
              </div>
            </div>
            <div className="hs-col">
              <div className="hs-year-title">
{"1973~2001"}
              </div>
              <div className="hs-img-box">
                <img src="./images/his1.png" alt="1973~2001 주요 제품 및 텐텐, 쎄쎄 영양제 패키지 시안" />
              </div>
            </div>
          </div>
          <div className="hs-block">
            <div className="hs-col">
              <div className="hs-year-title">
{"2002~2010"}
              </div>
              <div className="hs-img-box">
                <img src="./images/his3.png" alt="2002~2010 연구 인체 그래픽 및 에소메졸 제품" />
              </div>
            </div>
            <div className="hs-col is-right">
              <div className="hs-list">
                <div className="hs-row">
                  <span>
{"복합 고혈압치료제 아모잘탄허가·약가협상 타결"}
                  </span>
{' '}
                  <span className="yr">
{"2004"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"세프토라콜·다중스텝 제형연구 기술적용·발명 성립"}
                  </span>
{' '}
                  <span className="yr">
{"2006"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"바이오 항암신약바이오시밀러 스위스 FDA 승인"}
                  </span>
{' '}
                  <span className="yr">
{"2008"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"사노피와 항암기타·임상시험 기술수출·설립"}
                  </span>
{' '}
                  <span className="yr">
{"2009"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="hs-block">
            <div className="hs-col">
              <div className="hs-year-title">
{"2011~2015"}
              </div>
              <span className="hs-desc-head">
{"새로운 가능성이 현실이 되었어요."}
              </span>
              <div className="hs-list">
                <div className="hs-row">
                  <span>
{"KBSD와 혁신신약 공동연구 및 계약 체결"}
                  </span>
{' '}
                  <span className="yr">
{"2011"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"LAPS-GCSF 등 스마트임상시험 공동개발 계약 체결"}
                  </span>
{' '}
                  <span className="yr">
{"2012"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"국내 제약사 최초로 FDA 혁신신약 연구 허가 획득"}
                  </span>
{' '}
                  <span className="yr">
{"2013"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"이스라엘 테바와 유럽 호흡기 수출 계약"}
                  </span>
{' '}
                  <span className="yr">
{"2014"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"최초 국산 항암신약 벨로테칸 제품수출"}
                  </span>
{' '}
                  <span className="yr">
{"2015"}
                  </span>
                </div>
              </div>
            </div>
            <div className="hs-col">
              <div className="hs-year-title is-hidden">
{"숨김"}
              </div>
              <div className="hs-img-box">
                <img src="./images/his4.png" alt="2011~2015 ASCO 학회 발표 및 로수젯 제품군" />
              </div>
            </div>
          </div>
          <div className="hs-block">
            <div className="hs-col">
              <div className="hs-year-title">
{"2016~2020"}
              </div>
              <div className="hs-img-box">
                <img src="./images/his4.png" alt="2016~2020 ASCO 발표 자료 이미지" />
              </div>
            </div>
            <div className="hs-col is-right">
              <div className="hs-list">
                <div className="hs-row">
                  <span>
{"유럽 ASCO서 지텍터/Teoder 바이오머 기술수출"}
                  </span>
{' '}
                  <span className="yr">
{"2016"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"테오블롤 국내 시판허가 도출 및 수의진단기기 등록"}
                  </span>
{' '}
                  <span className="yr">
{"2017"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"Change in Analog, 오토글리코시드 ASCO 개시"}
                  </span>
{' '}
                  <span className="yr">
{"2018"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"대구 신장암/유방암 치료 4건 시판승인"}
                  </span>
{' '}
                  <span className="yr">
{"2019"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="hs-block">
            <div className="hs-col">
              <div className="hs-year-title">
{"2021~2026"}
              </div>
              <span className="hs-desc-head">
{"하지만 아직, 가야 할 길이 더 남아 있습니다."}
              </span>
              <div className="hs-list">
                <div className="hs-row">
                  <span>
{"글로벌, 차세대 지방간염치료제 임상 1상 성공"}
                  </span>
{' '}
                  <span className="yr">
{"2021"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"혈알츠~인체 투여 FDA 허가 파이프라인 확대 및 AACR 연구"}
                  </span>
{' '}
                  <span className="yr">
{"2022"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"1형 당뇨포트폴리오 제품화 계약 체결"}
                  </span>
{' '}
                  <span className="yr">
{"2023"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"간손상 원인 비알코올성 지방간염 치료제 HMM103P 임상"}
                  </span>
{' '}
                  <span className="yr">
{"2024"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"중국인 대상 혁신신약 기술 수출 및 수출품 등록"}
                  </span>
{' '}
                  <span className="yr">
{"2025"}
                  </span>
                </div>
                <div className="hs-row">
                  <span>
{"미국임상종양학회(ASCO)서 엔포 전임상서비스 진행"}
                  </span>
{' '}
                  <span className="yr">
{"2026"}
                  </span>
                </div>
              </div>
            </div>
            <div className="hs-col">
              <div className="hs-year-title is-hidden">
{"숨김"}
              </div>
              <div className="hs-img-box">
                <img src="./images/his5.png" alt="2021~2026 롤론티스 및 주요 바이오 신약" />
              </div>
            </div>
          </div>
          <div className="hs-footer-visual">
            <div className="hs-big-100">
{"100"}
              <sub>
{"th"}
              </sub>
            </div>
            <p className="hs-outro">
{"수많은 도전이 오늘의 한미를 만들었습니다."}
              <br />
{"이제 또 다른 가능성을 향해 당신과 함께 나아갑니다."}
            </p>
          </div>
        </div>
      </div>
      <div className="hs-btn-wrap">
        <button type="button" className="btn btn-main hs-toggle-btn" aria-expanded={expanded} aria-controls="history-container" onClick={toggleHistory}>
          <span>
            {expanded ? '접기' : '펼치기'}
          </span>
          <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M7 6l7 7 7-7M7 14l7 7 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}

function StaffSection() {
  return (
    <section className="staff" id="staff" aria-labelledby="staff-title">
      <div className="st-container">
        <header className="st-head">
          <div className="st-title-wrap">
            <img className="st-badge" src="./images/ss_con3_logo.png.png" alt="Hanmi" />
            <h2 className="st-title" id="staff-title">
{"한미에서는 어떤 일을 할까요?"}
            </h2>
          </div>
          <p className="st-desc">
{"일의 보람부터 성장의 순간까지, 먼저 경험한 현직자들이 솔직하게 들려드립니다."}
          </p>
        </header>
        <img className="st-mascot" src="./images/ss_con3_char.png.png" alt="" />
        <ul className="st-list">
          <li className="st-item">
            <article className="st-card">
              <figure className="st-thumb">
                <img src="./images/ss_con3_int1.jpg.png" alt="실험실에서 주먹을 쥐어 보이는 품질관리 이건호 사원" loading="lazy" />
              </figure>
              <p className="st-quote">
{"정밀한 시험과 분석으로 의약품의 품질을 확인해"}
                <br className="st-br" />
{" 안전하고 신뢰할 수 있는 의약품을 만들어갑니다."}
              </p>
              <div className="st-info">
                <p className="st-meta">
                  <span className="st-dept">
{"한미약품 품질관리"}
                  </span>
                  <span className="st-name">
{"이건호 사원"}
                  </span>
                </p>
                <a className="st-arrow" href="#staff-interview-01" aria-label="이건호 사원 인터뷰 보기">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </a>
              </div>
            </article>
          </li>
          <li className="st-item">
            <article className="st-card">
              <figure className="st-thumb">
                <img src="./images/ss_con3_int2.jpg.png" alt="소파에 앉아 있는 전임상연구 박진하 연구원" loading="lazy" />
              </figure>
              <p className="st-quote">
{"신약 후보물질의 가능성을 과학적으로 검증해"}
                <br className="st-br" />
{" 새로운 치료제가 환자에게 향하는 첫걸음을 만듭니다."}
              </p>
              <div className="st-info">
                <p className="st-meta">
                  <span className="st-dept">
{"한미약품 전임상연구"}
                  </span>
                  <span className="st-name">
{"박진하 연구원"}
                  </span>
                </p>
                <a className="st-arrow" href="#staff-interview-02" aria-label="박진하 연구원 인터뷰 보기">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </a>
              </div>
            </article>
          </li>
        </ul>
        <div className="st-cta">
          <a className="btn btn-main" href="#staff-all">
{"모든 현직자 알아가기!"}
          </a>
        </div>
      </div>
      <img className="st-bottle" src="./images/ss_Container.png" alt="" aria-hidden="true" />
    </section>
  );
}

function InnovationSection() {
  return (
    <section className="innovation" id="innovation" aria-labelledby="inno-title">
      <div className="inno-container">
        <header className="inno-heading">
          <h2 className="inno-title" id="inno-title">
{"당신의 가능성,"}
            <br />
{"한미그룹에서 더 크게 성장합니다"}
          </h2>
          <p className="inno-subtitle">
{"연구와 혁신으로 성장하며 글로벌 제약/바이오 기업을 향해 나아갑니다."}
          </p>
        </header>
        <div className="inno-panel">
          <img className="inno-atom" src="./images/inno_obj_mol.png.png" alt="" aria-hidden="true" />
          <img className="inno-molecule" src="./images/inno_Container.png" alt="" aria-hidden="true" />
          <div className="inno-bubbles" aria-label="한미그룹 주요 소식">
            <a className="inno-bubble inno-bubble--orange" href="#news-01">
{"\n            한미약품, 상반기 누적 매출 8,602억원…2분기 영업이익 117% 증가\n            "}
              <svg viewBox="0 0 30 16" aria-hidden="true">
                <path d="M30 0H10C10 7 6 12 0 16L30 0Z" fill="#ff5d32"></path>
              </svg>
            </a>
            <a className="inno-bubble inno-bubble--white" href="#news-02">
{"\n            “사업형 지주사 경쟁력 입증”…한미사이언스, 2분기 영업이익 71%↑"}
              <br />
{"2분기 매출 3,679억원…상반기 누적 매출 7,216억원 돌파\n            "}
              <svg viewBox="0 0 30 16" aria-hidden="true">
                <path d="M0 0H20C20 7 24 12 30 16L0 0Z" fill="#fff"></path>
              </svg>
            </a>
            <a className="inno-bubble inno-bubble--orange" href="#news-03">
{"\n            한미약품, 로수젯 제네릭에 비만신약 기술수출…최대 3조 2,000억 규모\n            "}
              <svg viewBox="0 0 30 16" aria-hidden="true">
                <path d="M30 0H10C10 7 6 12 0 16L30 0Z" fill="#ff5d32"></path>
              </svg>
            </a>
            <a className="inno-bubble inno-bubble--white" href="#news-04">
{"\n            “UCN2 이어 또…” 한미약품, 두 번째 근육 증가 비만신약 공개\n            "}
              <svg viewBox="0 0 30 16" aria-hidden="true">
                <path d="M0 0H20C20 7 24 12 30 16L0 0Z" fill="#fff"></path>
              </svg>
            </a>
            <a className="inno-bubble inno-bubble--orange" href="#news-05">
{"\n            명품 반열 오른 한미 ‘로수젯’…압도적 데이터 경쟁력으로 시장 석권"}
              <br />
{"2년 연속 국내사 개발 전문의약품 시장 ‘1위’…올해 상반기 누적 처방액도 선두\n            "}
              <svg viewBox="0 0 30 16" aria-hidden="true">
                <path d="M30 0H10C10 7 6 12 0 16L30 0Z" fill="#ff5d32"></path>
              </svg>
            </a>
            <a className="inno-bubble inno-bubble--white" href="#news-06">
{"\n            “비만 넘어 항암으로 혁신 확장”…한미, AACR서 차세대 신약 대거 공개\n            "}
              <svg viewBox="0 0 30 16" aria-hidden="true">
                <path d="M0 0H20C20 7 24 12 30 16L0 0Z" fill="#fff"></path>
              </svg>
            </a>
            <a className="inno-bubble inno-bubble--orange" href="#news-07">
{"\n            한미 완전두유·케어미, 영양에 ‘맛’까지 인정…국제 우수 미각상 수상\n            "}
              <svg viewBox="0 0 30 16" aria-hidden="true">
                <path d="M30 0H10C10 7 6 12 0 16L30 0Z" fill="#ff5d32"></path>
              </svg>
            </a>
          </div>
          <p className="inno-hint">
{"말풍선을 클릭해서 기사를 확인해 보세요."}
          </p>
        </div>
      </div>
    </section>
  );
}

function Cont8Section() {
  return (
    <section className="cont8" id="cont8" aria-label="한미그룹 더 알아보기">
      <div className="cont8-container">
        <a className="cont8-card" href="#welfare">
          <span className="cont8-image">
            <img className="cont8-photo" src="./images/con8_img1.jpg.png" alt="" aria-hidden="true" loading="lazy" />
            <img className="cont8-mark cont8-mark--first-arrow" src="./images/con8_Image.png" alt="" aria-hidden="true" />
            <img className="cont8-mark cont8-mark--first-star" src="./images/con8_Image-2.png" alt="" aria-hidden="true" />
          </span>
          <span className="cont8-card-title">
{"한미그룹의 "}
            <span className="cont8-mark-target">
{"문화와 복지"}
              <img className="cont8-mark cont8-mark--underline" src="./images/con8_Image-1.png" alt="" aria-hidden="true" />
            </span>
{"가 궁금하다면?"}
          </span>
        </a>
        <a className="cont8-card" href="#tasks">
          <span className="cont8-image">
            <img className="cont8-photo" src="./images/con8_img2.jpg.png" alt="" aria-hidden="true" loading="lazy" />
            <img className="cont8-mark cont8-mark--second-arrow" src="./images/con8_Image-4.png" alt="" aria-hidden="true" />
          </span>
          <span className="cont8-card-title">
{"한미그룹의 "}
            <span className="cont8-mark-target">
{"직무가"}
              <img className="cont8-mark cont8-mark--circle" src="./images/con8_Image-3.png" alt="" aria-hidden="true" />
            </span>
{" 궁금하다면?"}
          </span>
        </a>
        <a className="cont8-card" href="https://hanmi.recruiter.co.kr/career/apply" target="_blank" rel="noopener noreferrer">
          <span className="cont8-image">
            <img className="cont8-photo" src="./images/con8_img3.jpg.png" alt="" aria-hidden="true" loading="lazy" />
          </span>
          <span className="cont8-card-title">
{"한미그룹의 "}
            <span className="cont8-mark-target">
{"채용소식"}
              <img className="cont8-mark cont8-mark--underline" src="./images/con8_Image-5.png" alt="" aria-hidden="true" />
            </span>
{"을 빠르게 받고 싶다면?"}
          </span>
        </a>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a href="#main-visual" aria-label="한미그룹 홈">
          <img className="footer-logo" src="./images/logo_svg.svg" alt="한미그룹 Hanmi" />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    const selectors = [
      '#mirae .mr-title, #mirae .mr-container > img',
      '#history .hs-title, #history .hs-num, #history .hs-block, #history .hs-btn-wrap',
      '#staff .st-head, #staff .st-item, #staff .st-cta',
      '#innovation .inno-heading, #innovation .inno-bubble, #innovation .inno-hint',
      '#welfare .welfare-heading, #welfare .welfare-group-title, #welfare .welfare-card',
      '#tasks .tasks-heading, #tasks .tasks-tabs, #tasks .tasks-group-toggle, #tasks .tasks-role-card',
      '#requirement .requirement-heading, #requirement .requirement-tabs, #requirement .requirement-eligibility, #requirement .requirement-process-group, #requirement .requirement-process-notes',
      '#exposition .exposition-intro, #exposition .exposition-tabs, #exposition .exposition-regions, #exposition .exposition-event-name, #exposition .exposition-event-detail',
    ].join(', ');
    const fit = () => {
      root.style.setProperty('--scale', Math.min(1, Math.max(0.3, window.innerWidth / 1440)).toFixed(4));
      root.style.setProperty('--vs', Math.max(0.3, Math.min(0.7, (window.innerWidth - 44) / 648.6)).toFixed(4));
    };
    const onScroll = () => {
      if (!header) return;
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      if (currentScrollY <= 80 || document.body.classList.contains('menu-open')) {
        header.classList.remove('is-hidden', 'is-scrolled');
      } else if (delta > 6) {
        header.classList.add('is-hidden');
      } else if (delta < -6) {
        header.classList.remove('is-hidden');
        header.classList.add('is-scrolled');
      }
      lastScrollY = currentScrollY;
    };

    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('scroll', onScroll, { passive: true });

    let observer;
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle('is-revealed', entry.isIntersecting));
      }, { rootMargin: '-30% 0px -30% 0px', threshold: 0 });
      document.querySelectorAll(selectors).forEach((item) => {
        item.classList.add('reveal-item');
        observer.observe(item);
      });
      root.classList.add('reveal-ready');
    }

    return () => {
      window.removeEventListener('resize', fit);
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
      root.classList.remove('reveal-ready');
      root.style.removeProperty('--scale');
      root.style.removeProperty('--vs');
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <ScrollSmoothingToggle />
      <main>
      <MainVisualSection />
      <MiraeSection />
      <HistorySection />
      <StaffSection />
      <InnovationSection />
      <WelfareSection />
      <TasksSection />
      <RequirementSection />
      <ExpositionSection />
      <Cont8Section />
      <ApplySection />
      </main>
      <SiteFooter />
    </>
  );
}
