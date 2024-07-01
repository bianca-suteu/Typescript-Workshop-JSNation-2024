export function zip(a, b) {
    const result = [];
    let i;
    for (i = 0; i < Math.min(a.length, b.length); i += 1) {
        result.push(a[i]);
        result.push(b[i]);
    }
    for (const remaining of [a, b]) {
        for (; i < remaining.length; i += 1) {
            result.push(remaining[i]);
        }
    }
    return result;
}
