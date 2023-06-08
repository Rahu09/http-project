const { JSDOM } = require('jsdom')

let normalizeURL = (inputUrl)=>{
    let url = new URL(inputUrl)
    let [protocal, hostname, pathname ] = [url.protocol, url.hostname, url.pathname]
    if(protocal == 'http:') protocal='https:'
    if(pathname.charAt(pathname.length-1) == '/') pathname=pathname.substring(0,pathname.length-1)
    return `${protocal}//${hostname}${pathname}`
}
let getURLsFromHTML = (htmlBody, baseURL)=>{
    let ans = []
    const dom = new JSDOM(htmlBody);
    let arr = dom.window.document.querySelectorAll('a')
    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i].href;

        if(ele.length >= baseURL.length && ele.substring(0,baseURL.length) != baseURL) ans[i] = baseURL+ele
        else if(ele.length >= baseURL.length && ele.substring(0,baseURL.length) == baseURL) ans[i] = ele
        else ans[i] = baseURL+ele

    }
    return ans
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
let hii = 'how are you sonin'
let aa = hii.split(" ")
console.log(aa.length);
  
  readline.question(`What's your name?`, (num) => {
    let arr = num.split(" ")
    if(arr.length>1) console.log('cli arg is more than one');
    else if(arr.length<1) console.log('cli arg is less than one');
    else console.log('starting web crawling');
    readline.close();
  });

  let main = (bl)=>{
    let arr = bl.spl
    if(arr.length>1) console.log('cli arg is more than one');
    else if(arr.length<1) console.log('cli arg is less than one');
    else console.log('starting web crawling');
  }

  async function crawlPage (BASE_URL){
    let url = await fetch(BASE_URL,{
        
    })

  }

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
// normalizeURL('http://wagslane.dev/path/')
// getURLsFromHTML(`<html>
//                     <body>
//                         <a href="/path/first/hello.txt"><span>Go to Bootq.dev</span></a>
//                         <p>yooooo<p/>
//                         <a href=''><span>Go to Boots.dev</span></a>
//                         <p>yooooo<p/>
//                         <a href='/path/first'><span>Go to Bootz.dev</span></a>
//                         <p>yooooo<p/>
//                         <a href='/path'><span>Go to Bootz.dev</span></a>
//                     </body>
//                     </html>`,
//                     'https://wagslane.dev'
// )