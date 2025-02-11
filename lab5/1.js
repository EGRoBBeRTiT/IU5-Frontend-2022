/**
 * Напишите функцию polyfill map reduce,
 * написать полифил на функцию map через reduce
 * что такое полифил нужно почитать в гугле
 * Примеры:
 * [1,2,3].myMap((x) => x*2) -> [2,4,6]
 * Нужно назвать myMap !!!!!
 */
if (!Array.prototype.myMap) {
    Array.prototype.myMap = function(callback) {
        const newArr = []
        if (this.length != 0) {
            this.reduce(function(previousValue, currentValue) {
                newArr.push(callback(currentValue))
                return currentValue
            }, 0)
        }
        return newArr
    };
}

//console.log([1, 2, 3].myMap((x) => x * 2))