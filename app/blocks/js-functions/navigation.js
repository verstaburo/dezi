/* eslint-disable no-restricted-syntax */
import ResizeObserver from 'resize-observer-polyfill';

const $ = window.$;

export default function navigation() {
  window.pageSections = {};

  function updateSectionParam(el) {
    const name = el.getAttribute('data-section');
    const top = $(el).position().top;
    const height = $(el).outerHeight(true);
    const bottom = top + height;
    window.pageSections[name] = {
      top,
      bottom,
    };
  }

  function setObserversForSections() {
    const targets = document.querySelectorAll('[data-section]');
    const tarLen = targets.length;

    if (tarLen) {
      for (let i = 0; i < tarLen; i += 1) {
        const sectionsSizesWatch = new ResizeObserver((entries) => {
          for (const entry of entries) {
            updateSectionParam(entry.target);
          }
        });

        sectionsSizesWatch.observe(targets[i]);
      }
    }
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

  $(window).on('scroll', () => {
    const sT = $(window).scrollTop();
    const activeSectionName = findActiveSection(sT);
    const sections = $('[data-section-target]');
    const activeSection = $(`[data-section-target=${activeSectionName}]`);
    $(sections).not(activeSection).removeClass('is-active');
    $(activeSection).addClass('is-active');
  });
}
/* eslint-enable no-restricted-syntax */
