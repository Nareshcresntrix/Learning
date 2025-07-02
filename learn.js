



const books = {
    title: [{
        name: "king",
        age: 22
    }],
    author: ["Paulo Coelho"],
    year: [1988]
};

const val=Object.values(books).flat()
console.log(val);

// console.log(val);
// const val = Object.values(books).flat()
// console.log(val)
// for (const key in books) {
// const val=books[key].forEach((e)=>e.flat())
// console.log(val);
// 
// }

// const arr=[]
// for(const key in books){
//     const val=books[key].map((e)=>arr.push(e))
//     // console.log(val);
//
// }
// console.log(arr);

// for(const key of books){
//     const val=books[key]
//    console.log(val);
//
//
// }
// const books = {
//     title: "The Alchemist",
//     author: "Paulo Coelho",
//     year: 1988
// };
//  const arr=Object.entries(books).forEach(([key,value])=>{
//     console.log(`${key}:${value}`)
//  })

// const arr = []
// for (const key in books) {
//     const val = `${key}:${books[key]}`
//     arr.push(val)
//     // val.map((e) => arr.push(e))
//     // val.forEach((e)=>arr.push(e))
// }
// console.log(arr);

//  console.log(arr)
// const arr = Object.entries(books).map(([key, value]) => { return `${key}:${value}` })
// const arrs = Object.entries(books).map((key, value) => { return `${key}:${value}` })
// // console.log(arr[0])
// // console.log(arr.push(`leo:das`))
// // console.log(arr)
// books.age = 23
// // console.log(books)
// // console.log(arrs)
//
//
//
// for (let book in books) {
//     // console.log(`${book}:${books[book]}`)
//     // console.log(books[book])
//     // const name=[]
//     const val = books[book]
//     // name.push(val)
//     console.log(val)
// }
// const obj = {
//     fiction: ["The Alchemist", "1984", "Brave New World"],
//     nonfiction: ["Sapiens", "Educated"],
//     fantasy: ["Harry Potter", "The Hobbit"]
// }
// const array = []
// for (let key in obj) {
//     const val = obj[key]
//     // console.log(val)
//
//     const arr = val.map((book) => {
//         console.log(book)
//
//     })
//
// }

