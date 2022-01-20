import { set, update } from "lodash";
import event from "./Event.js";
import { updateAttribute, replaceChild, unshift, push, shift, pop } from "./dom.js";

const index = new Map();

export const div = (args) => {
    const { props, child, propsWatch, childWatch } = args;

    const el = document.createElement("div");

    if (props().className) {
        el.className = props().className;
    }
    if (props().id) {
        el.id = props().id;
    }
    if (args.click) {
        el.addEventListener("click", (event) => {
            args.click(event, { props, div, el });
        });
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

    if (childWatch !== undefined) {
        event.subscribe(childWatch(), (data) => {
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
    requestAnimationFrame((data) => {
        index.set(el.id, el);
    });

    if (args.test !== undefined) {
        args.test();
    }

    if (props().textContent) {
        el.textContent = props().textContent;
    }



    el.append(...child({ index }));
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


