Promise.myAll = function (proms) {
    let res, rej;
    const p = new Promise((resolve, reject) => {
        res = resolve
        rej = reject
    })

    let count = 0;//promise个数
    const result = [] //结果数组
    let fulFilledCount = 0  //fulfilled状态个数
    for (let prom of proms) {
        const i = count
        count++
        Promise.resolve(prom).then(data => {
            result[i] = data
            fulFilledCount++
            if (fulFilledCount === count) {
                res(result)
            }
        }, rej)
    }
    //参数为空数组
    if (count === 0) {
        res(result)
    }
    return p
}

Promise.myAll([1, 2, 3]).then(data => console.log(data))

var a = {
    n: 1,
    valueOf: function () {
        return this.n++
    }
}

console.log(a == 1 && a == 2 && a == 3)
