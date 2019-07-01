window.globalOptions = {
  animationDuration: 300,
  sizes: {
    xxl: 1920,
    xl: 1367,
    lg: 1025,
    md: 768,
    sm: 480,
    xs: 320,
  },
};

window.globalFunctions = {
  // функция удаляет всех потомков
  removeChildes(elem) {
    const parent = elem;
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  },
  // функция вставляет все элементы
  appendAll(parent, childes) {
    const target = parent;
    const fragment = document.createDocumentFragment();
    const nodes = Array.from(childes);
    const nodesLength = nodes.length;
    for (let i = 0; i < nodesLength; i += 1) {
      const child = nodes[i];
      fragment.appendChild(child);
    }
    target.appendChild(fragment);
  },
};
