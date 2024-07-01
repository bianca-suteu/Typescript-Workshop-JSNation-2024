export function unique(...allItems) {
    const found = new Set();
    for (const items of allItems) {
        for (const item of items) {
            found.add(item);
        }
    }
    return Array.from(found);
}
