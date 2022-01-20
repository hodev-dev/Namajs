

export const updateAttribute = (el, props) => {
    const updatePops = props();
    Object.keys(updatePops).forEach((attribute) => {
        if (el[attribute] !== updatePops[attribute]) {
            el[attribute] = updatePops[attribute];
        }
    });
}

export const replaceChild = (el, index, child) => {
    const _state = index.get('state');
    const updateChild = child({ index, _state });
    el.replaceChildren(...updateChild);
}

export const push = (el, index, child) => {
    const _state = index.get('state');
    const updateChild = child({ index, _state });
    el.append(updateChild[updateChild.length - 1]);
}

export const unshift = (el, index, child) => {
    const updateChild = child({ index });
    el.prepend(updateChild[0]);
}

export const shift = (el) => {
    el.childNodes[0].remove();
}

export const pop = (el) => {
    el.childNodes[el.children.length - 1].remove();
}
