const { error } = require('console')
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
  
async function crawlPage (BASE_URL){
  try {
    let response = await fetch(BASE_URL)
    const status = response.ok;
    const content = response.headers.get('Content-Type');
    
    if(!status) throw new Error(`${response.status}  error`)
    if(content != 'text/html') throw new Error(`content type is not text/html error`)
  } catch (error) {
    console.log(error);
  }
}

let main = (bl)=>{
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question(`What's your name?`, (num) => {
    let arr = num.split(" ")
    if(arr.length>1) console.log('cli arg is more than one');
    else if(arr.length<1) console.log('cli arg is less than one');
    else{
      console.log('starting web crawling');
      crawlPage(BASE_URL)
    } 
    readline.close();
  });
}

main()

  // async function crawlPage (BASE_URL){
  //   let response = await fetch(BASE_URL)
  //   const status = response.ok;
  //   const content = response.headers.get('Content-Type');
    
  //   if(!status) throw new Error(`${response.status}  error`)
  //   if(content != 'text/html') throw new Error(`content type is not text/html error`)
  // }
  
  // try {
  //   crawlPage(BASE_URL);
  // } catch (error) {
  //   console.log(error);
  // }

  

  // function generateKey() {
  //   const characters = 'ABCDEF0123456789'
  //   let result = ''
  //   for (let i = 0; i < 16; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length))
  //   }
  //   return result
  // }

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