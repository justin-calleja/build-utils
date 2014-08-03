
function BuildUtils(toMinSuffixMap) {
    this.toMinSuffixMap = toMinSuffixMap || {
        "js": "min.js",
        "css": "min.css"
    };
}

/**
 * Expects an array containing the names of dependency files.
 * Changes each element in the array such that suffixes are
 * mapped according to the given hash map or the default map
 * BuildUtils.toMinSuffixMap.
 *
 * @param deps {Array} the array containing non-min versions
 * of dependency file names.
 * @param suffixMap {Object} an object with file suffixes as
 * keys and min-file suffixes as values.
 */
BuildUtils.prototype.toMin = function (deps, suffixMap) {
    suffixMap = suffixMap || this.toMinSuffixMap;
    var minDeps = [];
    deps.forEach(function(dep) {
        var splitDep = dep.split('/');
        var filename = splitDep.pop();
        var splitFilename = filename.split('.');
        var ext = splitFilename.pop();
        var suffix = suffixMap[ext];
        if(suffix !== undefined) {
            splitFilename.push(suffix);
        } else {
            splitFilename.push(ext);
        }
        var minFilename = splitFilename.join('.');
        splitDep.push(minFilename);
        var minDep = splitDep.join('/');
        minDeps.push(minDep);
    });
    return minDeps;
};

module.exports = BuildUtils;

