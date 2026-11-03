import { Fragment, useEffect, useRef, useState } from 'react';
import benefitData from '../data/benefits.json';
import taskGroups from '../data/task_data.json';
import jobRecords from '../data/pop_data.json';

const categories = [
  { key: 'rnd', label: 'R&D', dataKey: 'rnd' },
  { key: 'production', label: '생산/품질', dataKey: 'prod' },
  { key: 'sales', label: '영업', dataKey: 'sales' },
  { key: 'management', label: '경영관리', dataKey: 'mps' },
  { key: 'clinical', label: '임상', dataKey: 'cl' },
  { key: 'global', label: '글로벌', dataKey: 'global' },
  { key: 'healthcare', label: '헬스케어', dataKey: 'healthcare' },
];

const fairWeeks = [
  [
    { date: '8월 31일 (월)', events: ['KAIST'] },
    { date: '9월 1일 (화)', events: ['서울대학교', '서강대학교', '연세대학교'] },
    { date: '9월 2일 (수)', events: ['UNIST', '한양대학교'] },
    { date: '9월 3일 (목)', events: ['GIST'] },
    { date: '9월 4일 (금)', events: ['고려대학교', '성균관대학교(자연)'] },
  ],
  [
    { date: '9월 7일 (월)', events: ['KIST', '동국대학교'] },
    { date: '9월 8일 (화)', events: ['이화여자대학교', '중견기업박람회(대전)'] },
    { date: '9월 9일 (수)', events: ['POSTECH'] },
    { date: '', events: [] },
    { date: '10월 7일 (수)', events: ['서울고용센터'] },
  ],
];

const campusWeeks = [
  [
    { date: '9월 14일 (월)', events: [] },
    { date: '9월 15일 (화)', events: [] },
    { date: '9월 16일 (수)', events: [] },
    { date: '9월 17일 (목)', events: ['중앙대학교'] },
    { date: '9월 18일 (금)', events: [] },
  ],
  [
    { date: '9월 28일 (월)', events: [] },
    { date: '9월 29일 (화)', events: [] },
    { date: '9월 30일 (수)', events: [] },
    { date: '10월 1일 (목)', events: ['건국대학교'] },
    { date: '10월 2일 (금)', events: [] },
  ],
  [
    { date: '10월 12일 (월)', events: [] },
    { date: '10월 13일 (화)', events: [] },
    { date: '10월 14일 (수)', events: ['경희대학교'] },
  ],
];

const regions = [
  ['seoul', '서울'],
  ['gyeonggi', '경기'],
  ['gangwon', '강원'],
  ['gyeongsang', '경상'],
  ['chungcheong', '충청'],
  ['jeolla', '전라'],
];

const campusDetails = {
  중앙대학교: { location: '310관 2층 201호', time: '14:00~15:30' },
  건국대학교: { location: '장소 확인 중', time: '시간 확인 중' },
  경희대학교: { location: '장소 확인 중', time: '시간 확인 중' },
};

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.classList.add('menu-open');
    menuRef.current?.querySelector('.menu-close')?.focus({ preventScroll: true });

    function closeOnOutsideClick(event) {
      if (!menuRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    }

    function closeOnResize() {
      if (window.innerWidth > 390) setMenuOpen(false);
    }

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnResize);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnResize);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#main-visual" aria-label="한미그룹 홈">
          <img src="./images/logo_svg.svg" alt="한미그룹 Hanmi" />
        </a>
        <nav ref={menuRef} className={`gnb${menuOpen ? ' is-open' : ''}`} id="gnb-menu" aria-label="주요 메뉴">
          <div className="gnb-head">
            <a className="gnb-brand" href="#main-visual" aria-label="한미그룹 홈" onClick={closeMenu}>
              <img src="./images/logo_svg.svg" alt="한미그룹 Hanmi" />
            </a>
            <button type="button" className="menu-close" aria-label="메뉴 닫기" onClick={() => { closeMenu(); toggleRef.current?.focus(); }}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
          <ul className="gnb-list">
            <li><a href="#tasks" onClick={closeMenu}>직무소개</a></li>
            <li><a href="#qualification" onClick={closeMenu}>지원자격 및 접수방법</a></li>
            <li><a href="#exposition" onClick={closeMenu}>채용설명회 일정</a></li>
          </ul>
          <div className="gnb-cta">
            <a className="btn btn-apply" href="#apply" onClick={closeMenu}><span>지원하기</span><svg viewBox="0 0 7 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </div>
          <img className="gnb-deco" src="./images/menu_char_png.png" alt="" />
        </nav>
        <a className="btn btn-apply header-apply" href="#apply"><span>지원하기</span></a>
        <button ref={toggleRef} type="button" className="menu-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="gnb-menu" onClick={() => setMenuOpen((open) => !open)}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 5h20M2 12h20M2 19h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>
    </header>
  );
}

export function WelfareSection() {
  let iconIndex = 0;
  return (
    <section className="welfare" id="welfare" aria-labelledby="welfare-title">
      <div className="welfare-container">
        <header className="welfare-heading">
          <h2 className="welfare-title" id="welfare-title">한미 생활을 더 즐겁게 만드는 방법</h2>
          <p className="welfare-subtitle">건강부터 성장, 휴식까지 알차게 준비한 복지를 소개할게요.</p>
          <img className="welfare-mascot" src="./images/con5_char.png" alt="" aria-hidden="true" loading="lazy" />
        </header>
        <div className="welfare-scroll" id="welfare-content" role="region" aria-label="한미그룹 복지 혜택 목록" tabIndex="0">
          {benefitData.benefits.map((group) => (
            <section className="welfare-category" key={group.group_title}>
              <header className="welfare-group-title welfare-category-title">
                <h3>{group.group_title}</h3>
                <p>{group.group_description}</p>
              </header>
              <ul className="welfare-grid">
                {group.items.map((item) => {
                  const currentIcon = iconIndex++;
                  return (
                    <li key={item.title}>
                      <article className="welfare-card">
                        <div className="welfare-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
                        {currentIcon < 10 && <img className="welfare-icon" src={`./images/wf_ico${currentIcon + 1}.png`} alt="" aria-hidden="true" loading="lazy" />}
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <img className="welfare-decoration" src="./images/ss_con3_char.png.png" alt="" aria-hidden="true" loading="lazy" />
    </section>
  );
}

function TaskModal({ role, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !role) return undefined;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('tasks-modal-open');
    dialog.querySelector('.tasks-modal-close')?.focus();
    return () => {
      if (dialog.open) dialog.close();
      document.body.classList.remove('tasks-modal-open');
    };
  }, [role]);

  const preferred = role?.preferred ?? [];
  const lists = [
    ['직무 내용', role?.job_description ?? []],
    ['자격요건', role?.qualifications ?? []],
    ['우대사항', preferred],
  ];

  return (
    <dialog ref={dialogRef} className="tasks-modal" aria-labelledby="tasks-modal-title" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="tasks-modal-hero" style={{ backgroundImage: role?.image ? `url("${role.image}")` : undefined }}>
        <button className="tasks-modal-close" type="button" aria-label="상세 창 닫기" onClick={() => dialogRef.current?.close()}>×</button>
      </div>
      <div className="tasks-modal-fixed">
        <div className="tasks-modal-meta">
          <h2 className="tasks-modal-title" id="tasks-modal-title">{role?.title}</h2>
          <span className="tasks-modal-category">{role?.department}</span>
          <span className="tasks-modal-department">{role?.location}</span>
        </div>
        <p className="tasks-modal-experience">{role?.category}</p>
      </div>
      <div className="tasks-modal-body">
        {lists.map(([title, items]) => items.length > 0 && (
          <section className="tasks-modal-section" key={title}>
            <h3>{title}</h3>
            <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        ))}
      </div>
    </dialog>
  );
}

export function TasksSection() {
  const [categoryKey, setCategoryKey] = useState('rnd');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const category = categories.find((item) => item.key === categoryKey);
  const data = taskGroups.find((item) => item.category === category?.dataKey);

  function selectCategory(nextCategory) {
    setCategoryKey(nextCategory);
    setExpandedGroup(null);
  }

  function handleTabKeyDown(event, index) {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % categories.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + categories.length) % categories.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = categories.length - 1;
    else return;
    event.preventDefault();
    const nextCategory = categories[nextIndex];
    selectCategory(nextCategory.key);
    document.getElementById(`tasks-tab-${nextCategory.key}`)?.focus();
  }

  return (
    <section className="tasks" id="tasks" aria-labelledby="tasks-title">
      <div className="tasks-hero" aria-hidden="true">
        <img className="tasks-bg-title" src="./images/tasks_bg_title.png" alt="" />
        <iframe className="tasks-character" src="./hanmi-reading-eye-tracking/embed.html" title="돋보기를 들고 걷는 캐릭터" loading="lazy" scrolling="no" />
      </div>
      <div className="tasks-container">
        <header className="tasks-heading">
          <h2 className="tasks-title" id="tasks-title">알약이를 따라<br />나에게 맞는 직무를 찾아봐요!</h2>
          <p className="tasks-subtitle">연구부터 생산, 영업, 경영관리까지 당신의 가능성이 빛날 자리를 안내해 드릴게요.</p>
        </header>
        <div className="tasks-tabs" role="tablist" aria-label="직무 분야">
          {categories.map((item, index) => (
            <button className="tasks-tab" id={`tasks-tab-${item.key}`} key={item.key} type="button" role="tab" aria-selected={categoryKey === item.key} aria-controls="tasks-panel" tabIndex={categoryKey === item.key ? 0 : -1} onClick={() => selectCategory(item.key)} onKeyDown={(event) => handleTabKeyDown(event, index)}>{item.label}</button>
          ))}
        </div>
        <div className="tasks-groups" id="tasks-panel" role="tabpanel" aria-labelledby={`tasks-tab-${categoryKey}`} tabIndex="0" aria-live="polite">
          {data?.details.map((detail, groupIndex) => {
            const groupId = `tasks-group-${categoryKey}-${groupIndex}`;
            const isExpanded = expandedGroup === groupId;
            return (
              <section className="tasks-group" key={`${detail.location}-${groupIndex}`}>
                <button className="tasks-group-toggle" type="button" aria-expanded={isExpanded} aria-controls={groupId} onClick={() => setExpandedGroup(isExpanded ? null : groupId)}>
                  {detail.location}<span className="tasks-count">{detail.count}</span>
                </button>
                <ul className={`tasks-roles${isExpanded ? ' is-open' : ''}`} id={groupId} hidden={!isExpanded} inert={!isExpanded}>
                  {detail.fields.map((title) => {
                    const role = jobRecords.find((record) => record.title === title && record.department === category.label) ?? {
                      title, department: category.label, location: detail.location, category: '', job_description: [], qualifications: [], preferred: [],
                    };
                    return <li key={title}><button className="tasks-role-card" type="button" aria-label={`${title} 상세 내용 보기`} onClick={() => setSelectedRole(role)}><span>{title}</span><span className="tasks-role-arrow" aria-hidden="true">→</span></button></li>;
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
      <TaskModal role={selectedRole} onClose={() => setSelectedRole(null)} />
    </section>
  );
}

export function RequirementSection() {
  const [activeTab, setActiveTab] = useState('eligibility');
  const tabs = [
    { id: 'eligibility', label: '지원자격' },
    { id: 'process', label: '전형절차 및 접수방법' },
  ];

  function handleTabKeyDown(event, index) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIndex].id);
    document.getElementById(`requirement-tab-${tabs[nextIndex].id}`)?.focus();
  }

  return (
    <section className="requirement" id="requirement" aria-labelledby="requirement-title">
      <div className="requirement-container">
        <header className="requirement-heading">
          <h2 className="requirement-title" id="requirement-title">한미그룹과 함께하는 문은<br />활짝 열려 있습니다</h2>
          <img className="requirement-bulb" src="./images/require_obj_bulb.png.png" alt="" aria-hidden="true" />
        </header>
        <div className="requirement-tabs" role="tablist" aria-label="지원 안내">
          {tabs.map((tab, index) => <button className="requirement-tab" id={`requirement-tab-${tab.id}`} key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`requirement-panel-${tab.id}`} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => setActiveTab(tab.id)} onKeyDown={(event) => handleTabKeyDown(event, index)}>{tab.label}</button>)}
        </div>
        <div className="requirement-panel" id="requirement-panel-eligibility" role="tabpanel" aria-labelledby="requirement-tab-eligibility" hidden={activeTab !== 'eligibility'}>
          <div className="requirement-eligibility">
            <article className="requirement-condition"><img src="./images/require_ico_calendar_3d.png.png" alt="" aria-hidden="true" /><h3>27년 1월 입사가 가능한 자</h3></article>
            <article className="requirement-condition"><img src="./images/require_ico_gradcap_3d.png.png" alt="" aria-hidden="true" /><h3>기졸업자 또는 27년 2월 졸업 예정자</h3></article>
          </div>
          <ul className="requirement-bullets"><li>남성의 경우 병역을 마쳤거나 면제인 분</li><li>해외여행 (또는 해외 출장)에 결격사유가 없는 분</li><li>취업보호대상자는 관련 법령에 의거하여 우대</li></ul>
          <p className="requirement-notice">모집 직무별로 지원자격이 상이하오니 반드시 채용 공고를 확인해 주시기 바랍니다.</p>
        </div>
        <div className="requirement-panel" id="requirement-panel-process" role="tabpanel" aria-labelledby="requirement-tab-process" hidden={activeTab !== 'process'}>
          <ProcessGroup title="영업직군" includeFieldExperience />
          <ProcessGroup title="영업 외 전직군" />
          <ul className="requirement-process-notes">
            <li>상기 일정은 상황에 따라 변경될 수 있으며 각 전형별 상세 일정은 대상자에 한해 개별 안내 예정입니다</li>
            <li>입사지원서에 허위 기재가 있거나 제출서류가 허위로 판명되는 경우, 또는 입사 이후 자격 미보유 및 상실하는 경우는 입사가 취소될 수 있습니다.</li>
            <li>지원서 제출 후에는 수정이 절대 불가하오니, 주의하시기 바랍니다.</li>
            <li>전형단계별 결과는 E-Mail 및 SMS를 통하여 안내하오니 E-Mail 주소 및 휴대전화 번호를 정확히 기재해주시기 바랍니다.</li>
            <li>입사 후 3개월간 수습기간이 적용되며, 수습 기간 중 성적이 불량하거나 직무 수행 능력이 부족하다고 판단되는 경우 입사가 취소될 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProcessGroup({ title, includeFieldExperience = false }) {
  const steps = [
    ['지원접수', '9.28~10.18', 'calendar'],
    ['서류전형', '10.19~10.20', '📑'],
    ['AI역량검사', '10.21~10.25', '🔎'],
    ['1차면접', '11월 중', '🪪'],
    ...(includeFieldExperience ? [['현장체험', '12월 초', '📍']] : []),
    ['2차면접', '12월 중', '💬'],
    [includeFieldExperience ? '교육전형' : '입사', includeFieldExperience ? '27.1.4~' : '27.1.4 (경력직 협의 가능)', '🏢'],
  ];
  return (
    <section className={`requirement-process-group${includeFieldExperience ? '' : ' requirement-process-group--other'}`}>
      <h3>{title}</h3>
      <ol className="requirement-steps">
        {steps.map(([name, date, icon], index) => (
          <Fragment key={name}>
            <li className="requirement-step">
              <span className="requirement-step-icon" aria-hidden="true">{icon === 'calendar' ? <img src="./images/require_ico_calendar_3d.png.png" alt="" /> : icon}</span>
              <h4>{name}</h4>
              <p>{date}</p>
            </li>
            {index < steps.length - 1 && <li className="requirement-step-arrow" aria-hidden="true">›</li>}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}

function Calendar({ weeks, interactive, activeEvent, onSelectEvent }) {
  return (
    <div className="exposition-calendar" aria-live="polite">
      {weeks.map((days, weekIndex) => (
        <section className="exposition-week" aria-label={`${weekIndex + 1}주 일정`} key={weekIndex}>
          {days.map((day, dayIndex) => (
            <div className={`exposition-day${dayIndex % 2 === 0 ? ' exposition-day--left' : ''}`} key={`${day.date}-${dayIndex}`}>
              <div className="exposition-date" style={{ gridColumn: dayIndex + 1 }}>{day.date}</div>
              <div className="exposition-event" style={{ gridColumn: dayIndex + 1 }}>
                {day.events.map((eventName) => {
                  const isSelected = activeEvent === eventName;
                  const details = campusDetails[eventName];
                  return interactive && isSelected && details ? (
                    <button className="exposition-event-detail" type="button" key={eventName} aria-expanded="true" aria-label={`${eventName} 장소 및 시간 상세 정보 닫기`} onClick={() => onSelectEvent(null)}>
                      <span className="exposition-event-detail-row"><span className="exposition-event-detail-label">장소</span><span className="exposition-event-detail-value">{details.location}</span></span>
                      <span className="exposition-event-detail-row"><span className="exposition-event-detail-label">시간</span><span className="exposition-event-detail-value">{details.time}</span></span>
                    </button>
                  ) : interactive ? (
                    <button className="exposition-event-name" type="button" key={eventName} aria-expanded="false" onClick={() => onSelectEvent(eventName)}>{eventName}</button>
                  ) : <span className="exposition-event-name" key={eventName}>{eventName}</span>;
                })}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

export function ExpositionSection() {
  const [activeTab, setActiveTab] = useState('fair');
  const [activeRegion, setActiveRegion] = useState('seoul');
  const [activeEvent, setActiveEvent] = useState(null);
  const tabs = [
    { id: 'fair', label: '박람회' },
    { id: 'campus', label: '캠퍼스' },
  ];

  function handleTabKeyDown(event, index) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIndex].id);
    document.getElementById(`exposition-tab-${tabs[nextIndex].id}`)?.focus();
  }

  return (
    <section className="exposition" id="exposition" aria-labelledby="exposition-title">
      <div className="exposition-container">
        <header className="exposition-intro">
          <img className="exposition-intro-character" src="./images/expo_char.png" alt="" aria-hidden="true" />
          <div className="exposition-intro-copy">
            <h2 className="exposition-title" id="exposition-title">Hanmi 박람회/캠퍼스로 출발!</h2>
            <p className="exposition-description">한미그룹이 여러분을 만나러 박람회와 캠퍼스로 찾아갑니다.<br />우리가 어디서 만날지 궁금하다면 아래 지역에서 찾아보세요!</p>
            <p className="exposition-hint">학교/행사명을 클릭하거나 터치하면 세부장소를 확인하실 수 있습니다.</p>
          </div>
        </header>
        <div className="exposition-tabs" role="tablist" aria-label="채용 행사 일정 종류">
          {tabs.map((tab, index) => <button className="exposition-tab" id={`exposition-tab-${tab.id}`} key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`exposition-panel-${tab.id}`} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => { setActiveTab(tab.id); setActiveEvent(null); }} onKeyDown={(event) => handleTabKeyDown(event, index)}>{tab.label}</button>)}
        </div>
        <div className="exposition-panel" id="exposition-panel-fair" role="tabpanel" aria-labelledby="exposition-tab-fair" hidden={activeTab !== 'fair'}>
          <Calendar weeks={fairWeeks} interactive={false} activeEvent={null} onSelectEvent={() => {}} />
        </div>
        <div className="exposition-panel" id="exposition-panel-campus" role="tabpanel" aria-labelledby="exposition-tab-campus" hidden={activeTab !== 'campus'}>
          <div className="exposition-regions" role="group" aria-label="캠퍼스 방문 지역">
            {regions.map(([key, label]) => <button className="exposition-region" key={key} type="button" aria-pressed={activeRegion === key} onClick={() => { setActiveRegion(key); setActiveEvent(null); }}>{label}</button>)}
          </div>
          <Calendar weeks={campusWeeks} interactive activeEvent={activeEvent} onSelectEvent={setActiveEvent} />
        </div>
      </div>
      <img className="exposition-decoration" src="./images/expo_char2.png" alt="" aria-hidden="true" />
    </section>
  );
}

export function ApplySection() {
  const deadline = new Date('2026-10-18T23:59:59+09:00').getTime();
  const [remaining, setRemaining] = useState(() => Math.max(0, deadline - Date.now()));

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, deadline - Date.now()));
    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, [deadline]);

  const days = Math.floor(remaining / 86400000);
  const hours = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
  const applyUrl = 'https://hanmi.recruiter.co.kr/career/apply';

  return (
    <section className="cont9" id="apply" aria-labelledby="cont9-heading">
      <h2 className="cont9-heading" id="cont9-heading">당신에게 딱 맞는 자리를 찾으러 출발!</h2>
      {remaining > 0 ? <p className="cont9-countdown" aria-live="polite"><span className="cont9-countdown-unit"><span className="cont9-countdown-value">{days}</span> 일</span><span className="cont9-countdown-unit"><span className="cont9-countdown-value">{hours}</span> 시간</span><span className="cont9-countdown-unit"><span className="cont9-countdown-value">{minutes}</span> 분</span><span className="cont9-countdown-unit"><span className="cont9-countdown-value">{seconds}</span> 초 남았어요</span></p> : <p className="cont9-countdown cont9-countdown-ended">지원 기간이 종료되었습니다.</p>}
      <div className="cont9-world"><img src="./images/con9_지원하기.png" alt="" aria-hidden="true" /><a className="cont9-apply" href={applyUrl} target="_blank" rel="noopener noreferrer">지원하기</a></div>
      <p className="cont9-note">아이콘을 클릭해서 지원해보세요!</p>
      <img className="cont9-cloud cont9-cloud--left" src="./images/con9_cloud_l.png.png" alt="" aria-hidden="true" />
      <img className="cont9-cloud cont9-cloud--right" src="./images/con9_cloud_r.png.png" alt="" aria-hidden="true" />
    </section>
  );
}
