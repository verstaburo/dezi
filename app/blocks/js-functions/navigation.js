/* eslint-disable no-restricted-syntax */

const { $ } = window;

export default function navigation() {
  window.pageSections = {};

  function updateSectionParam(el) {
    const name = el.getAttribute('data-section');
    const { top } = $(el).position();
    const height = $(el).outerHeight(true);
    const bottom = top + height;
    window.pageSections[name] = {
      top,
      bottom,
    };
  }

  function setSectionsSizes() {
    const targets = document.querySelectorAll('[data-section]');
    const tarLen = targets.length;

    if (tarLen) {
      for (let i = 0; i < tarLen; i += 1) {
        updateSectionParam(targets[i]);
      }
    }
  }

  function setObserversForSections() {
    const targets = document.querySelectorAll('[data-section]');
    const tarLen = targets.length;

    if (tarLen) {
      for (let i = 0; i < tarLen; i += 1) {
        const sectionsSizesWatch = new ResizeObserver(() => {
          setSectionsSizes();
        });

        sectionsSizesWatch.observe(targets[i]);
      }
    }
  }

  function findActiveSection(scrollTop) {
    const sections = window.pageSections;
    const names = Object.keys(sections);
    const nmL = names.length;
    let result;
    for (let i = 0; i < nmL; i += 1) {
      const section = sections[names[i]];
      const tS = section.top;
      const bS = section.bottom;
      if (tS <= scrollTop && bS > scrollTop) {
        result = names[i];
      }
    }

    return result;
  }

  setSectionsSizes();
  setObserversForSections();

  window.globalFunctions.sectionsInit = () => {
    setSectionsSizes();
    setObserversForSections();
  };

  function setNavTitlesSizes(callback) {
    const titles = $('.nav-titles');
    const items = $(titles).find('.nav-titles__item');
    $(items).each((i, el) => {
      const position = $(el).position().left;
      $(el).attr('data-width', $(el).outerHeight());
      if (position) {
        $(el).css({
          transform: `translate3d(${position}px, 0, 0)`,
        });
      }
      callback();
    });
  }

  function setNavTitlesWidth(activeName) {
    const titles = $('.nav-titles');
    const item = activeName ? $(titles).find(`[data-section-target=${activeName}]`) : $(titles).find('is-active');
    const itemSize = $(item).attr('data-width');
    const list = $(titles).find('.nav-titles__list');
    $(list).css({
      height: `${itemSize}px`,
    });
  }

  setNavTitlesSizes(setNavTitlesWidth);

  $(window).on('resize', () => {
    setSectionsSizes();
    setNavTitlesSizes(setNavTitlesWidth);
  });

  $(window).on('scroll', () => {
    const sT = $(window).scrollTop() + ($(window).height() / 2);
    const activeSectionName = findActiveSection(sT);
    const sections = $('[data-section-target]');
    const activeSection = $(`[data-section-target=${activeSectionName}]`);
    $(sections).not(activeSection).removeClass('is-active is-animate');
    $(activeSection).addClass('is-active');
    setNavTitlesWidth(activeSectionName);
    setTimeout(() => {
      $(activeSection).addClass('is-animate');
    }, 50);
  });
}
/* eslint-enable no-restricted-syntax */
