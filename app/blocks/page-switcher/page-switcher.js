const $ = window.$;

export default function pageSwitcher() {
  window.globalOptions.pages = {};

  const pages = window.globalOptions.pages;

  function pageLoad(uri, pagename, callback) {
    const url = uri;
    const page = pagename;
    pages[page] = {
      status: 'loading',
    };
    $.ajax({
      crossDomain: false,
      dataType: 'html',
      type: 'GET',
      url,
      async: true,
      success(res) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(res, 'text/html');
        pages[page] = {
          status: 'success',
          content: doc,
          images: doc.images,
        };
        callback(page);
      },
      error() {
        pages[page].status = 'error';
        pageLoad(url, page);
      },
    });
  }

  function pageInsert(pagename) {
    const targetBlock = document.querySelector('[data-boot-area]');
    const page = pages[pagename].content;
    const content = document.importNode(page.querySelector('[data-boot-area]'), true).children;
    window.globalFunctions.removeChildes(targetBlock);
    window.globalFunctions.appendAll(targetBlock, content);
    window.globalFunctions.sectionsInit();
    window.globalFunctions.scrollAnimation();
  }

  function isPageLoad(pagename) {
    const pg = pagename;
    const page = pages[pg];
    if (page.status === 'success') {
      pageInsert(pg);
    } else {
      setTimeout(() => {
        isPageLoad(pagename);
      }, 50);
    }
  }

  $(document).on('click', '.js-pageswitch', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const url = $(self).attr('href');
    const num = Object.keys(pages).length;
    const others = $('.js-pageswitch').not(self);
    $(others).removeClass('is-active');
    $(self).addClass('is-active');
    let pageName;
    if ($(self).attr('data-page') !== undefined) {
      pageName = $(self).attr('data-page');
      isPageLoad(pageName);
    } else {
      pageName = `page${num}`;
      $(self).attr('data-page', pageName);
      pageLoad(url, pageName, isPageLoad);
    }
  });
}
