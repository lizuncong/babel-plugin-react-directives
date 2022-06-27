module.exports = function importDeclaration(path, state) {
    const opts = state.opts;
    if (Object.keys(opts).length === 0) return;

    state.opts.rules.forEach(opt => {
        if (path.node.source.value.includes(opt.match)) {
            path.node.source.value = path.node.source.value.replace(opt.match, opt.replacement);
        }
    });

}