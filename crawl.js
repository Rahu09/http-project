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
    
    if(ele.length >= baseURL.length && ele.substring(0,baseURL.length) == baseURL) ans[i] = ele
    else if(ele.length >= baseURL.length && ele.charAt(0) == '/') ans[i] = baseURL+ele
    else ans[i];
    
  }
  return ans
}
  
async function crawlPage(baseURL, currentURL, pages){
  let ans = pages;
  if(currentURL == undefined || currentURL.substring(0,baseURL.length) != baseURL) {
    return ans;
  }
  currentURL = normalizeURL(currentURL)

  if( ans[currentURL] != undefined){
    ans[currentURL] = ans[currentURL]+1;
    return ans;
  } else {
    ans[currentURL] = 1;
    try {
      let response = await fetch(currentURL)
      const status = response.ok;
      const content = response.headers.get('Content-Type');
      
      if(!status) throw new Error(`${response.status}  error`)
      else if(content.substring(0,9) != 'text/html') throw new Error(`content type is not text/html error it is${content}`)
      else{
        let text = await response.text();
        //getting all the url in the current page
        let urlArr =getURLsFromHTML(text,baseURL);
        for (let i = 0; i < urlArr.length; i++) {
          const ele = urlArr[i];
          console.log(ele);
          ans = await crawlPage(baseURL,ele,ans);
        }
      }  
    } catch (error) {
      console.log(error);
    }
  }
  return ans;
}

let pages = {}
function main(){
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question(`paste the base url of site here `, async function (num) {
      let arr = num.split(" ")
      if (arr.length > 1)
        console.log('cli arg is more than one')
      else if (arr.length < 1)
        console.log('cli arg is less than one')
      else {
        console.log(`starting web crawling with ${num}`)
        pages = await crawlPage(num, num, pages)
      }
      console.log(pages);
      readline.close()
    });
}

main()

module.exports = {
    normalizeURL,
    getURLsFromHTML
}

// IDEAS FOR EXTENDING THE PROJECT
// Make the script run on a timer and deploy it to a server. Have it email you every so often with a report.
// Add more robust error checking so that you can crawl larger sites without issues.
// Count external links, as well as internal links, and add them to the report
// Save the report as a CSV spreadsheet rather than printing it to the console
// Use a graphics library to create an image that shows the links between the pages as a graph visualization
// Make requests concurrently to speed up the crawling process
// Add a README.md file explaining to users how to clone your git repo and get started

// https://wagslane.dev