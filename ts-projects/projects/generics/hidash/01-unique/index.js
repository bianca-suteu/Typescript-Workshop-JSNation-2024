// Write your unique function here! ✨
// You'll need to export it so the tests can run it.
// export function unique<T>(...items :T[][]) {
// const result = [];
// items.forEach(b => {
//   b.forEach (c => {
//     if(result.findIndex(c) !== 0) {
//       result.push(c);
//     }
//   })
// })
//   return result;
// }
export function unique(...items) {
    const result = new Set;
    items.forEach(b => {
        b.forEach(c => {
            result.add(c);
        });
    });
    return Array.from(result);
}
