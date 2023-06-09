let pages = {};
pages['hii'] = 'yo'
let hii = 'yo'
console.log(pages[hii]);

// async function crawlPage(currentURL, pages){
//   let ans = pages;

//   if(ans[currentURL] != undefined){
//     ans[currentURL]= ans.currentURL+1;
//     console.log('00');
//     return ans;
//   } else {
//     console.log('11');
//     ans[currentURL] = 1;
//     crawlPage(currentURL,ans)
//   }
//   return ans;
// }
// let currentURL = 'https://wagslane.dev';
// pages.currentURL =1;
// console.log(pages);
// console.log(pages.currentURL == undefined);
// crawlPage('https://wagslane.dev',pages)