(function () {
    var root = document.documentElement;
    var header = document.querySelector('.site-header');
    var lastScrollY = window.scrollY;
    var scrollThreshold = 6;

    function fit() {
      var s = Math.min(1, Math.max(0.3, window.innerWidth / 1440));
      root.style.setProperty('--scale', s.toFixed(4));
      var vs = Math.min(0.7, (window.innerWidth - 44) / 648.6);
      root.style.setProperty('--vs', Math.max(vs, 0.3).toFixed(4));
    }
    fit();
    window.addEventListener('resize', fit);

    var revealSelectors = [
      '#mirae .mr-title, #mirae .mr-container > img',
      '#history .hs-title, #history .hs-num, #history .hs-block, #history .hs-btn-wrap',
      '#staff .st-head, #staff .st-item, #staff .st-cta',
      '#innovation .inno-heading, #innovation .inno-bubble, #innovation .inno-hint',
      '#welfare .welfare-heading, #welfare .welfare-group-title, #welfare .welfare-card',
      '#tasks .tasks-heading, #tasks .tasks-tabs, #tasks .tasks-group-toggle, #tasks .tasks-role-card',
      '#requirement .requirement-heading, #requirement .requirement-tabs, #requirement .requirement-eligibility, #requirement .requirement-process-group, #requirement .requirement-process-notes',
      '#exposition .exposition-intro, #exposition .exposition-tabs, #exposition .exposition-regions, #exposition .exposition-event-name, #exposition .exposition-event-detail'
    ].join(', ');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle('is-revealed', entry.isIntersecting);
        });
      }, { rootMargin: '-30% 0px -30% 0px', threshold: 0 });

      var observedRevealItems = new WeakSet();
      function observeRevealItems(container) {
        if (container.matches && container.matches(revealSelectors)) {
          if (!observedRevealItems.has(container)) {
            observedRevealItems.add(container);
            container.classList.add('reveal-item');
            revealObserver.observe(container);
          }
        }
        if (container.querySelectorAll) {
          container.querySelectorAll(revealSelectors).forEach(function (item) {
            if (!observedRevealItems.has(item)) {
              observedRevealItems.add(item);
              item.classList.add('reveal-item');
              revealObserver.observe(item);
            }
          });
        }
      }

      observeRevealItems(document.querySelector('main'));
      var revealMutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) observeRevealItems(node);
          });
        });
      });
      revealMutationObserver.observe(document.querySelector('main'), { childList: true, subtree: true });
      document.documentElement.classList.add('reveal-ready');
    }

    window.addEventListener('scroll', function () {
      if (!header) return;
      var currentScrollY = window.scrollY;
      var scrollDelta = currentScrollY - lastScrollY;

      if (currentScrollY <= 80 || document.body.classList.contains('menu-open')) {
        header.classList.remove('is-hidden');
        header.classList.remove('is-scrolled');
      } else if (scrollDelta > scrollThreshold) {
        header.classList.add('is-hidden');
      } else if (scrollDelta < -scrollThreshold) {
        header.classList.remove('is-hidden');
        header.classList.add('is-scrolled');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        var target = id.length > 1 ? document.querySelector(id) : null;
        if (target) {
          e.preventDefault();
          var smoothScrollDisabled = document.getElementById('scroll-smoothing-toggle').checked;
          target.scrollIntoView({ behavior: smoothScrollDisabled ? 'instant' : 'smooth' });
        }
      });
    });
  })();

  document.querySelectorAll('.hs-beaker').forEach(function (image) {
    image.addEventListener('error', function () { image.hidden = true; });
  });

  (function () {
    var countdown = document.getElementById('cont9-countdown');
    var ended = document.getElementById('cont9-countdown-ended');
    if (!countdown || !ended) return;

    var deadline = new Date('2026-10-18T23:59:59+09:00').getTime();
    var days = countdown.querySelector('[data-countdown-days]');
    var hours = countdown.querySelector('[data-countdown-hours]');
    var minutes = countdown.querySelector('[data-countdown-minutes]');
    var seconds = countdown.querySelector('[data-countdown-seconds]');

    function updateCountdown() {
      var remaining = deadline - Date.now();
      if (remaining <= 0) {
        countdown.hidden = true;
        ended.hidden = false;
        return false;
      }

      countdown.hidden = false;
      ended.hidden = true;
      days.textContent = String(Math.floor(remaining / 86400000));
      hours.textContent = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, '0');
      minutes.textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
      seconds.textContent = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
      return true;
    }

    if (updateCountdown()) window.setInterval(updateCountdown, 1000);
  })();

  (function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.requirement-tab'));
    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute('aria-controls'));
    });
    if (!tabs.length || panels.some(function (panel) { return !panel; })) return;

    function selectTab(selectedIndex, moveFocus) {
      tabs.forEach(function (tab, index) {
        var selected = index === selectedIndex;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[index].hidden = !selected;
      });
      if (moveFocus) tabs[selectedIndex].focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { selectTab(index, false); });
      tab.addEventListener('keydown', function (event) {
        var nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        selectTab(nextIndex, true);
      });
    });
  })();

  (function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.exposition-tab'));
    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute('aria-controls'));
    });
    var regionButtons = Array.prototype.slice.call(document.querySelectorAll('.exposition-region'));
    var fairCalendar = document.getElementById('exposition-fair-calendar');
    var campusCalendar = document.getElementById('exposition-campus-calendar');
    var closeActiveCampusDetail = null;
    if (!tabs.length || panels.some(function (panel) { return !panel; }) || !fairCalendar || !campusCalendar) return;

    function closeCampusDetail() {
      if (!closeActiveCampusDetail) return;
      var close = closeActiveCampusDetail;
      closeActiveCampusDetail = null;
      close();
    }

    var fairWeeks = [
      [
        { date: '8월 31일 (월)', events: ['KAIST'] },
        { date: '9월 1일 (화)', events: ['서울대학교', '서강대학교', '연세대학교'] },
        { date: '9월 2일 (수)', events: ['UNIST', '한양대학교'] },
        { date: '9월 3일 (목)', events: ['GIST'] },
        { date: '9월 4일 (금)', events: ['고려대학교', '성균관대학교(자연)'] }
      ],
      [
        { date: '9월 7일 (월)', events: ['KIST', '동국대학교'] },
        { date: '9월 8일 (화)', events: ['이화여자대학교', '중견기업박람회(대전)'] },
        { date: '9월 9일 (수)', events: ['POSTECH'] },
        { date: '', events: [] },
        { date: '10월 7일 (수)', events: ['서울고용센터'] }
      ]
    ];
    var campusWeeks = [
      [
        { date: '9월 14일 (월)', events: [] },
        { date: '9월 15일 (화)', events: [] },
        { date: '9월 16일 (수)', events: [] },
        { date: '9월 17일 (목)', events: ['중앙대학교'] },
        { date: '9월 18일 (금)', events: [] }
      ],
      [
        { date: '9월 28일 (월)', events: [] },
        { date: '9월 29일 (화)', events: [] },
        { date: '9월 30일 (수)', events: [] },
        { date: '10월 1일 (목)', events: ['건국대학교'] },
        { date: '10월 2일 (금)', events: [] }
      ],
      [
        { date: '10월 12일 (월)', events: [] },
        { date: '10월 13일 (화)', events: [] },
        { date: '10월 14일 (수)', events: ['경희대학교'] }
      ]
    ];
    var campusSchedules = {
      seoul: { weeks: campusWeeks },
      gyeonggi: { weeks: campusWeeks },
      gangwon: { weeks: campusWeeks },
      gyeongsang: { weeks: campusWeeks },
      chungcheong: { weeks: campusWeeks },
      jeolla: { weeks: campusWeeks }
    };
    var campusEventDetails = {
      중앙대학교: { location: '310관 2층 201호', time: '14:00~15:30' },
      건국대학교: { location: '장소 확인 중', time: '시간 확인 중' },
      경희대학교: { location: '장소 확인 중', time: '시간 확인 중' }
    };

    document.addEventListener('pointerdown', function (event) {
      var target = event.target;
      if (closeActiveCampusDetail && (!target.closest || !target.closest('.exposition-event-detail'))) {
        closeCampusDetail();
      }
    });

    function renderCalendar(container, weeks, interactiveEvents) {
      var calendar = document.createDocumentFragment();
      weeks.forEach(function (days, weekIndex) {
        var week = document.createElement('section');
        week.className = 'exposition-week';
        week.setAttribute('aria-label', (weekIndex + 1) + '주 일정');

        days.forEach(function (day, dayIndex) {
          var dayCell = document.createElement('div');
          var date = document.createElement('div');
          var eventCell = document.createElement('div');
          dayCell.className = 'exposition-day' + (dayIndex % 2 === 0 ? ' exposition-day--left' : '');
          date.className = 'exposition-date';
          date.style.gridColumn = String(dayIndex + 1);
          date.textContent = day.date;

          eventCell.className = 'exposition-event';
          eventCell.style.gridColumn = String(dayIndex + 1);
          day.events.forEach(function (eventName) {
            function renderEventName() {
              var event = document.createElement(interactiveEvents ? 'button' : 'span');
              event.className = 'exposition-event-name';
              event.textContent = eventName;
              if (interactiveEvents) {
                event.type = 'button';
                event.setAttribute('aria-expanded', 'false');
                event.addEventListener('click', renderEventDetails);
              }
              eventCell.replaceChildren(event);
            }

            function renderEventDetails() {
              var details = campusEventDetails[eventName];
              if (!details) throw new Error('캠퍼스 상세 일정이 없습니다: ' + eventName);
              var detailButton = document.createElement('button');
              detailButton.type = 'button';
              detailButton.className = 'exposition-event-detail';
              detailButton.setAttribute('aria-expanded', 'true');
              detailButton.setAttribute('aria-label', eventName + ' 장소 및 시간 상세 정보 닫기');
              closeActiveCampusDetail = function () {
                detailButton.classList.add('is-closing');
                detailButton.addEventListener('animationend', function (event) {
                  if (event.animationName === 'exposition-detail-out') renderEventName();
                });
              };
              detailButton.addEventListener('click', function () {
                closeCampusDetail();
              });
              detailButton.addEventListener('focusout', function (event) {
                if (!eventCell.contains(event.relatedTarget)) closeCampusDetail();
              });
              [
                { label: '⚑ 장소', value: details.location },
                { label: '◷ 시간', value: details.time }
              ].forEach(function (detail) {
                var row = document.createElement('span');
                var label = document.createElement('span');
                var value = document.createElement('span');
                row.className = 'exposition-event-detail-row';
                label.className = 'exposition-event-detail-label';
                label.textContent = detail.label;
                value.className = 'exposition-event-detail-value';
                value.textContent = detail.value;
                row.append(label, value);
                detailButton.appendChild(row);
              });
              eventCell.replaceChildren(detailButton);
            }

            if (interactiveEvents) renderEventName();
            else {
              var event = document.createElement('span');
              event.className = 'exposition-event-name';
              event.textContent = eventName;
              eventCell.appendChild(event);
            }
          });
          dayCell.append(date, eventCell);
          week.appendChild(dayCell);
        });

        calendar.appendChild(week);
      });
      container.replaceChildren(calendar);
    }

    function renderCampusRegion(region) {
      var schedule = campusSchedules[region];
      if (!schedule) throw new Error('캠퍼스 지역 데이터가 없습니다: ' + region);
      closeCampusDetail();
      regionButtons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.expositionRegion === region));
      });
      renderCalendar(campusCalendar, schedule.weeks, true);
    }

    function selectTab(selectedIndex, moveFocus) {
      tabs.forEach(function (tab, index) {
        var selected = index === selectedIndex;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[index].hidden = !selected;
      });
      if (moveFocus) tabs[selectedIndex].focus();
    }

    renderCalendar(fairCalendar, fairWeeks, false);
    renderCampusRegion('seoul');
    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { selectTab(index, false); });
      tab.addEventListener('keydown', function (event) {
        var nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        selectTab(nextIndex, true);
      });
    });
    regionButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        renderCampusRegion(button.dataset.expositionRegion);
      });
    });
  })();

  (function () {
    var container = document.getElementById('welfare-content');
    if (!container) return;

    function isBenefitData(data) {
      return data && Array.isArray(data.benefits) && data.benefits.length > 0 &&
        data.benefits.every(function (group) {
          return typeof group.group_title === 'string' && group.group_title.trim() !== '' &&
            typeof group.group_description === 'string' && group.group_description.trim() !== '' &&
            Array.isArray(group.items) && group.items.length > 0 &&
          group.items.every(function (item) {
              return typeof item.title === 'string' && item.title.trim() !== '' &&
                typeof item.description === 'string' && item.description.trim() !== '';
          });
        });
    }

    function createBenefitGroup(group, iconIndex) {
      var section = document.createElement('section');
      var heading = document.createElement('header');
      var title = document.createElement('h3');
      var description = document.createElement('p');
      var list = document.createElement('ul');

      section.className = 'welfare-category';
      heading.className = 'welfare-group-title welfare-category-title';
      title.textContent = group.group_title;
      description.textContent = group.group_description;
      heading.append(title, description);
      list.className = 'welfare-grid';

      group.items.forEach(function (item) {
        var listItem = document.createElement('li');
        var card = document.createElement('article');
        var copy = document.createElement('div');
        var itemTitle = document.createElement('h3');
        var itemDescription = document.createElement('p');

        listItem.appendChild(card);
        card.className = 'welfare-card';
        copy.className = 'welfare-copy';
        itemTitle.textContent = item.title;
        itemDescription.textContent = item.description;
        copy.append(itemTitle, itemDescription);
        card.appendChild(copy);

        if (iconIndex < 10) {
          var icon = document.createElement('img');
          icon.className = 'welfare-icon';
          icon.src = './images/wf_ico' + (iconIndex + 1) + '.png';
          icon.alt = '';
          icon.setAttribute('aria-hidden', 'true');
          icon.loading = 'lazy';
          card.appendChild(icon);
        }

        list.appendChild(listItem);
        iconIndex += 1;
      });

      section.append(heading, list);
      return { section: section, nextIconIndex: iconIndex };
    }

    fetch('./data/benefits.json')
      .then(function (response) {
        if (!response.ok) throw new Error('복지 데이터를 불러오지 못했습니다.');
        return response.json();
      })
      .then(function (data) {
        if (!isBenefitData(data)) throw new Error('복지 데이터 형식이 올바르지 않습니다.');

        var content = document.createDocumentFragment();
        var iconIndex = 0;
        data.benefits.forEach(function (group) {
          var renderedGroup = createBenefitGroup(group, iconIndex);
          content.appendChild(renderedGroup.section);
          iconIndex = renderedGroup.nextIconIndex;
        });
        container.replaceChildren(content);
      })
      .catch(function (error) {
        console.error(error);
        container.textContent = '복지 정보를 불러오지 못했습니다.';
      });
  })();

  (function () {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('gnb-menu');
    if (!toggle || !menu) return;
    var closeBtn = menu.querySelector('.menu-close');
    var mq = window.matchMedia('(max-width: 390px)');

    function isOpen() { return menu.classList.contains('is-open'); }

    function openMenu() {
      if (isOpen() || !mq.matches) return;
      menu.classList.add('is-open');
      document.querySelector('.site-header').classList.remove('is-hidden');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      closeBtn.focus({ preventScroll: true });
    }

    function closeMenu(returnFocus) {
      if (!isOpen()) return;
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (returnFocus !== false) toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener('click', function () { isOpen() ? closeMenu() : openMenu(); });
    closeBtn.addEventListener('click', function () { closeMenu(); });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(); });
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key === 'Tab') {
        var f = menu.querySelectorAll('a[href], button');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    function onChange() { if (!mq.matches) closeMenu(false); }
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  })();

  /* [추가] 콘텐츠 접기/펼치기 기능 개선 */
  (function () {
    var container = document.getElementById('history-container');
    var btn = document.querySelector('.hs-toggle-btn');
    if (!container || !btn) return;

    var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function checkHeight() {
      var wasCollapsed = container.classList.contains('is-collapsed');
      if (wasCollapsed) container.classList.remove('is-collapsed');
      var realHeight = container.scrollHeight;
      if (wasCollapsed) container.classList.add('is-collapsed');

      if (realHeight <= container.clientHeight && !container.classList.contains('is-expanded')) {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'inline-flex';
      }
    }

    checkHeight();

    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';

      if (!expanded) {
        container.classList.remove('is-collapsed');
        container.classList.add('is-expanded');
        container.style.maxHeight = container.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('span').textContent = '접기';
      } else {
        container.classList.add('is-collapsed');
        container.classList.remove('is-expanded');
        container.style.maxHeight = '';
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('span').textContent = '펼치기';

        var sectionTop = document.getElementById('history').getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: sectionTop - 50,
          behavior: isReducedMotion || document.getElementById('scroll-smoothing-toggle').checked ? 'instant' : 'smooth'
        });
      }
    });

    window.addEventListener('resize', function () {
      if (container.classList.contains('is-expanded')) {
        container.style.maxHeight = container.scrollHeight + 'px';
      } else {
        checkHeight();
      }
    });
  })();

    (function () {
      var categories = {
        rnd: { label: 'R&D', dataCategory: 'rnd' },
        production: { label: '생산/품질', dataCategory: 'prod' },
        sales: { label: '영업', dataCategory: 'sales' },
        management: { label: '경영관리', dataCategory: 'mps' },
        clinical: { label: '임상', dataCategory: 'cl' },
        global: { label: '글로벌', dataCategory: 'global' },
        healthcare: { label: '헬스케어', dataCategory: 'healthcare' }
      };
      var taskGroups = [];
      var jobRecords = [];

      var tabs = Array.from(document.querySelectorAll('.tasks-tab'));
      var panel = document.getElementById('tasks-panel');
      var dialog = document.querySelector('.tasks-modal');
      if (!tabs.length || !panel || !dialog) return;

      var closeButton = dialog.querySelector('.tasks-modal-close');
      var modalTitle = document.getElementById('tasks-modal-title');
      var modalCategory = document.getElementById('tasks-modal-category');
      var modalDepartment = document.getElementById('tasks-modal-department');
      var modalExperience = document.getElementById('tasks-modal-experience');
      var dutiesList = document.getElementById('tasks-modal-duties');
      var qualificationsList = document.getElementById('tasks-modal-qualifications');
      var preferredList = document.getElementById('tasks-modal-preferred');
      var preferredSection = preferredList.closest('.tasks-modal-section');
      var modalHero = dialog.querySelector('.tasks-modal-hero');
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function appendListItems(list, values) {
        list.replaceChildren();
        values.forEach(function (value) {
          var item = document.createElement('li');
          item.textContent = value;
          list.appendChild(item);
        });
      }

      function closeGroup(button) {
        button.setAttribute('aria-expanded', 'false');
        var rolesList = document.getElementById(button.getAttribute('aria-controls'));
        rolesList.inert = true;
        rolesList.classList.remove('is-open');
        rolesList.style.maxHeight = '0px';
        window.setTimeout(function () {
          if (button.getAttribute('aria-expanded') === 'false' && !rolesList.classList.contains('is-open')) {
            rolesList.hidden = true;
          }
        }, reduceMotion ? 0 : 400);
      }

      function showRole(role, categoryLabel) {
        modalTitle.textContent = role.title;
        modalCategory.textContent = role.department || categoryLabel;
        modalDepartment.textContent = role.location;
        modalExperience.textContent = role.category;
        modalHero.style.backgroundImage = 'url("' + role.image + '")';
        appendListItems(dutiesList, role.job_description || []);
        appendListItems(qualificationsList, role.qualifications || []);
        appendListItems(preferredList, role.preferred || []);
        preferredSection.hidden = !(role.preferred && role.preferred.length);
        dialog.showModal();
        document.body.classList.add('tasks-modal-open');
        closeButton.focus();
      }

      function renderCategory(categoryKey) {
        var category = categories[categoryKey];
        if (!category || !taskGroups.length) return;
        panel.replaceChildren();
        panel.setAttribute('aria-labelledby', 'tasks-tab-' + categoryKey);

        var taskCategory = taskGroups.find(function (item) {
          return item.category === category.dataCategory;
        });
        if (!taskCategory) return;

        taskCategory.details.forEach(function (detail, groupIndex) {
          var groupElement = document.createElement('section');
          var groupId = 'tasks-group-' + categoryKey + '-' + groupIndex;
          var button = document.createElement('button');
          var count = document.createElement('span');
          var rolesList = document.createElement('ul');

          groupElement.className = 'tasks-group';
          button.className = 'tasks-group-toggle';
          button.type = 'button';
          button.setAttribute('aria-expanded', 'false');
          button.setAttribute('aria-controls', groupId);
          button.appendChild(document.createTextNode(detail.location));
          count.className = 'tasks-count';
          count.textContent = detail.count;
          button.appendChild(count);

          rolesList.className = 'tasks-roles';
          rolesList.id = groupId;
          rolesList.hidden = true;
          rolesList.inert = true;
          detail.fields.forEach(function (titleText) {
            var role = jobRecords.find(function (record) {
              return record.title === titleText && record.department === category.label;
            }) || {
              title: titleText,
              department: category.label,
              location: detail.location,
              category: '',
              job_description: [],
              qualifications: [],
              preferred: []
            };
            var item = document.createElement('li');
            var roleButton = document.createElement('button');
            var title = document.createElement('span');
            var arrow = document.createElement('span');

            roleButton.className = 'tasks-role-card';
            roleButton.type = 'button';
            roleButton.setAttribute('aria-label', role.title + ' 상세 내용 보기');
            title.textContent = role.title;
            arrow.className = 'tasks-role-arrow';
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '→';
            roleButton.append(title, arrow);
            roleButton.addEventListener('click', function () {
              showRole(role, category.label);
            });
            item.appendChild(roleButton);
            rolesList.appendChild(item);
          });

          button.addEventListener('click', function () {
            var isExpanded = button.getAttribute('aria-expanded') === 'true';
            panel.querySelectorAll('.tasks-group-toggle').forEach(function (otherButton) {
              closeGroup(otherButton);
            });
            if (!isExpanded) {
              button.setAttribute('aria-expanded', 'true');
              rolesList.hidden = false;
              rolesList.inert = false;
              requestAnimationFrame(function () {
                rolesList.classList.add('is-open');
                rolesList.style.maxHeight = rolesList.scrollHeight + 'px';
              });
            }
          });

          groupElement.append(button, rolesList);
          panel.appendChild(groupElement);
        });
      }

      function selectTab(tab) {
        tabs.forEach(function (item) {
          var selected = item === tab;
          item.setAttribute('aria-selected', String(selected));
          item.tabIndex = selected ? 0 : -1;
        });
        renderCategory(tab.dataset.taskTab);
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () { selectTab(tab); });
        tab.addEventListener('keydown', function (event) {
          if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
          event.preventDefault();
          var offset = event.key === 'ArrowRight' ? 1 : -1;
          var nextTab = tabs[(index + offset + tabs.length) % tabs.length];
          selectTab(nextTab);
          nextTab.focus();
          nextTab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        });
      });

      closeButton.addEventListener('click', function () { dialog.close(); });
      dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener('close', function () {
        document.body.classList.remove('tasks-modal-open');
      });

      panel.textContent = '직무 정보를 불러오는 중입니다.';
      function fetchJson(path) {
        return fetch(path).then(function (response) {
          if (!response.ok) throw new Error('직무 데이터를 불러오지 못했습니다.');
          return response.json();
        });
      }

      Promise.all([
        fetchJson('./data/task_data.json'),
        fetchJson('./data/pop_data.json')
      ])
        .then(function (data) {
          if (!Array.isArray(data[0]) || !Array.isArray(data[1])) {
            throw new Error('직무 데이터 형식이 올바르지 않습니다.');
          }
          taskGroups = data[0];
          jobRecords = data[1];
          var selectedTab = tabs.find(function (tab) {
            return tab.getAttribute('aria-selected') === 'true';
          });
          renderCategory(selectedTab ? selectedTab.dataset.taskTab : 'rnd');
        })
        .catch(function () {
          panel.textContent = '직무 정보를 불러오지 못했습니다.';
        });
    })();

(function () {
      var toggle = document.getElementById('scroll-smoothing-toggle');
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (!toggle) return;

      toggle.checked = reducedMotion.matches;
      var enabled = !toggle.checked;
      var targetY = window.scrollY;
      var animationFrame = 0;

      function cancelAnimation() {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        targetY = window.scrollY;
      }

      function animateScroll() {
        var currentY = window.scrollY;
        var distance = targetY - currentY;
        if (Math.abs(distance) < 1) {
          window.scrollTo(0, targetY);
          animationFrame = 0;
          return;
        }
        window.scrollTo(0, currentY + distance * 0.16);
        animationFrame = window.requestAnimationFrame(animateScroll);
      }

      function hasScrollableAncestor(target, deltaY) {
        while (target && target !== document.body && target !== document.documentElement) {
          if (target instanceof HTMLElement) {
            var overflowY = window.getComputedStyle(target).overflowY;
            var maxScroll = target.scrollHeight - target.clientHeight;
            if (maxScroll > 1 && /auto|scroll|overlay/.test(overflowY)) {
              if ((deltaY < 0 && target.scrollTop > 0) || (deltaY > 0 && target.scrollTop < maxScroll - 1)) return true;
            }
          }
          target = target.parentElement;
        }
        return false;
      }

      toggle.addEventListener('change', function () {
        enabled = !toggle.checked;
        if (!enabled) cancelAnimation();
      });

      window.addEventListener('wheel', function (event) {
        if (!enabled || event.ctrlKey || event.deltaY === 0 || !event.cancelable || hasScrollableAncestor(event.target, event.deltaY)) return;
        event.preventDefault();

        var deltaY = event.deltaY;
        if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) deltaY *= 16;
        else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) deltaY *= window.innerHeight;

        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (!animationFrame) targetY = window.scrollY;
        targetY = Math.max(0, Math.min(maxScroll, targetY + deltaY));
        if (!animationFrame) animationFrame = window.requestAnimationFrame(animateScroll);
      }, { passive: false });

      window.addEventListener('scroll', function () {
        if (!animationFrame) targetY = window.scrollY;
      }, { passive: true });
    })();
