export const ConvertDotNested = (object, key) => {
    let keys = key.split('.')
    for (let i = 0; i < keys.length; i++) {
        if (typeof data !== undefined) {
            object = object[keys[i]];
        }
    }
    return object
}

export const CreateData = (data, column) => {
    let results = [];
    data.forEach((v, i) => {
        let row = [];
        column.forEach((vH, iH) => {
            let tmp = ''
            if (vH['value'] !== null && vH['value'] !== undefined) {
                tmp = ConvertDotNested(v, vH['value'])
            } else {
                if (vH['render'] !== undefined && typeof vH['render'] === 'function') {
                    tmp = vH['render'](v)
                }
            }
            row.push(tmp)
        })
        let result = {
            original: v,
            row: row
        }
        results.push(result)
    });
    return results
}

export const SortData = (data, key, sort) => {
    let d = [...data]
    let sorted = [];

    if (sort === 'DESC') {
        sorted = d.sort((a, b) => (a['row'][key] < b['row'][key]) ? 1 : ((b['row'][key] > a['row'][key]) ? -1 : 0))
    } else {
        sorted = d.sort((a, b) => (a['row'][key] > b['row'][key]) ? 1 : ((b['row'][key] > a['row'][key]) ? -1 : 0))
    }
    return sorted
}