export function getFiniteValue(obj) {
    const fullInfo = {};
    getProp(obj);
    function getProp(o) {
        for(let prop in o) {
            if(typeof(o[prop]) === 'object') {
                getProp(o[prop]);
            } else {
                fullInfo[prop] = o[prop];
            }
        }
    }
    return fullInfo
}