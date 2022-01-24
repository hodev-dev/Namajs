import event from "./Event.js";
import { updateAttribute, replaceChild, unshift, push, shift, pop } from "./dom.js";

const index = new Map();

export const Widget = (args) => {
    const { type, props, events, child, propsWatch, watch, state } = args;

    const el = document.createElement(type);

    if (props().className) {
        el.className = props().className;
    }
    if (props().id) {
        el.id = props().id;
    }
    if (events) {
        Object.keys(events()).forEach((key) => {
            el.addEventListener(key, (event) => {
                events()[key](event);
            });
        })
    }

    if (args.onCreate) {
        args.onCreate();
    }

    if (args.test) {
        args.test();
    }

    if (propsWatch !== undefined) {
        event.subscribe(propsWatch(), (data) => {
            updateAttribute(el, props)
        });
    }

    if (watch !== undefined) {
        event.subscribe(watch(), (data) => {
            if (data && data.change) {

                // rebuild entire child
                if (data.change.type === 'set') {
                    replaceChild(el, index, child);
                }

                // push element at the end of the child
                if (data.change.type === 'push') {
                    push(el, index, child);
                }

                // push element at the start of the child
                if (data.change.type === 'unshift') {
                    unshift(el, index, child);
                }

                // remove element at the start of the child
                if (data.change.type === 'shift') {
                    shift(el);
                }

                // remove element at the end of the child
                if (data.change.type === 'pop') {
                    pop(el);
                }
            }
        });
    }

    if (args.test !== undefined) {
        args.test();
    }

    if (props().textContent) {
        el.textContent = props().textContent;
    }

    if (state !== undefined) {
        index.set('state', state);
    }

    const [_state, _setState] = index.get('state');

    el.append(...child({ index, _state, _setState }));
    return el;
};

export const mount = (el, id, controllers) => {
    const root = document.querySelector("#" + id);
    const app = el();
    const newroot = document.createElement('div');
    newroot.id = id;
    newroot.append(app);
    root.replaceWith(newroot);
};


