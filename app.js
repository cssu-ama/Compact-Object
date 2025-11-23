function compactObject(obj) {
    // Arrays
    if (Array.isArray(obj)) {
        const out = [];
        for (const item of obj) {
            if ((item !== null && typeof item === 'object') || Array.isArray(item)) out.push(compactObject(item));
            else
                if (Boolean(item)) out.push(item);
        }
        return out;
    }

    // Plain object
    const outObj = {};
    for (const [key, val] of Object.entries(obj)) {
        if ((val !== null && typeof val === 'object') || Array.isArray(val)) outObj[key] = compactObject(val);
        else
            if (Boolean(val)) outObj[key] = val;
    }

  return outObj;
}
