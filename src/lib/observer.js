import { v4 as uuidv4 } from 'uuid';

const ObjectObserver = (obj) => {
    const wm = new Map();
    let changes = [];
    var validator = (_path) => {
        return {
            get(target, key, test) {
                if (typeof target[key] === 'object' && target[key] !== null) {
                    if (!wm.has([..._path, key])) {
                        const pr = new Proxy(target[key], validator([..._path, key]));
                        wm.set([..._path, key], pr);
                        return pr;
                    } else {
                        return wm.get(key);
                    }
                } else {
                    if (key === 'push') {
                        var F = function (...args) {
                            if (wm.has(_path)) {
                                target = vm.get(_path);
                            }
                            changes.push({ path: [..._path].join('.'), value: args, prev: undefined, type: 'push' })
                            target.push.apply(target, args);
                            return target;
                        }
                        const pr = new Proxy(F, {
                            apply: function (target, thisArg, argumentsList) {
                                return target.apply(thisArg, argumentsList);
                            }
                        });
                        return pr;
                    }

                    if (key === 'unshift') {
                        var F = function (...args) {
                            if (wm.has(_path)) {
                                target = vm.get(_path);
                            }
                            changes.push({ path: [..._path].join('.'), value: args, prev: undefined, type: 'unshift' })
                            target.unshift.apply(target, args);
                            return target;
                        }
                        const pr = new Proxy(F, {
                            apply: function (target, thisArg, argumentsList) {
                                return target.apply(thisArg, argumentsList);
                            }
                        });
                        return pr;
                    }

                    if (key === 'shift') {
                        var F = function (...args) {
                            if (wm.has(_path)) {
                                target = vm.get(_path);
                            }
                            changes.push({ path: [..._path].join('.'), value: args, prev: undefined, type: 'shift' })
                            target.shift.apply(target, args);
                            return target;
                        }
                        const pr = new Proxy(F, {
                            apply: function (target, thisArg, argumentsList) {
                                return target.apply(thisArg, argumentsList);
                            }
                        });
                        return pr;
                    }

                    if (key === 'pop') {
                        var F = function (...args) {
                            if (wm.has(_path)) {
                                target = vm.get(_path);
                            }
                            changes.push({ path: [..._path].join('.'), value: args, prev: undefined, type: 'pop' })
                            target.pop.apply(target, args);
                            return target;
                        }
                        const pr = new Proxy(F, {
                            apply: function (target, thisArg, argumentsList) {
                                return target.apply(thisArg, argumentsList);
                            }
                        });
                        return pr;
                    }

                    return target[key];
                }
            },
            set(target, key, value, past) {
                if (typeof target[key] === 'object' && target[key] !== null) {
                    let pr;
                    if (wm.has([..._path, key])) {
                        pr = wm.get([..._path, key]);
                    } else {
                        pr = new Proxy(target[key], validator([..._path, key]));
                    }
                    changes.push({ path: [..._path, key].join('.'), value, prev: target[key], type: 'set' })
                    target[key] = value;
                    return pr;
                } else {
                    changes.push({ path: [..._path, key].join('.'), value, prev: target[key], type: 'set' })
                    target[key] = value;
                    return target;
                }
            },
        }
    }
    const release = () => {
        changes = [];
    }
    let proxy;
    if (!wm.has('proxy')) {
        proxy = new Proxy(obj, validator([]));
        wm.set('proxy', proxy);
    }
    return { proxy, changes, release };
}

export default ObjectObserver;