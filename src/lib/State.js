import event from "./Event.js";
import ObjectObserver from "./observer.js";

const State = (_init) => {
    let { proxy, changes } = ObjectObserver(_init);

    const setState = (cb) => {
        cb(proxy);
        changes.forEach((change, index) => {
            if (change.process === undefined) {
                change.process = true;
                event.publish(change.path, { change, ...proxy });
            }
        });
    }

    const get = () => {
        return proxy;
    }

    const watch = (path, cb) => {
        event.subscribe(path, cb);
    }

    return [
        proxy,
        setState,
        changes,
        watch
    ]
}

export default State;