export const ConverDotNested = (object ,key) => {
    let keys = key.split('.')
    for (let i = 0; i < keys.length; i++) {
        if (typeof data !== undefined) {
            object = object[keys[i]];
        }            
    }
    return object
}