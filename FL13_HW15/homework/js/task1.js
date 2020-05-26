let assign = (target, ...sources) => {
    sources.forEach(source => {
        let keys = Object.keys(source);
        keys.forEach(key => {
            target[key] = source[key];
        })
    })
    return target;
}