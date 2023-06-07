const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

let arr = ['https://wagslane.dev/path/',
    'https://wagsLane.Dev/path',
    'https://wagslane.dev/path',
    'http://wagslane.dev/path'
]
let ans = 'wagslane.dev/path'
let bool = true
for (let i = 0; i < arr.length; i++) {
    test(`checking if ${arr[i]} is equal to 'wagslane.dev/path'` , () => { 
        expect(normalizeURL(arr[i])).toBe('https://wagslane.dev/path')
    })
}