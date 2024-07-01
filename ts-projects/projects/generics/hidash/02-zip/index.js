// Write your zip function here! ✨
// You'll need to export it so the tests can run it.
export function zip(arr1, arr2) {
    const result = [];
    arr1.forEach((el, index) => {
        result.push(el);
        if (arr2[index]) {
            result.push(arr2[index]);
        }
    });
    for (let i = arr1.length; i < arr2.length; i++) {
        result.push(arr2[i]);
    }
    return result;
}
const a = zip([1, 2], ['a', 'b', 'c']);
console.log(a);
