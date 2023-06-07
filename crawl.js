let normalizeURL = (inputUrl)=>{
    let url = new URL(inputUrl)
    let [protocal, hostname, pathname ] = [url.protocol, url.hostname, url.pathname]
    if(protocal == 'http:') protocal='https:'
    if(pathname.charAt(pathname.length-1) == '/') pathname=pathname.substring(0,pathname.length-1)
    return `${protocal}//${hostname}${pathname}`
}

module.exports = {
    normalizeURL
}
// normalizeURL('http://wagslane.dev/path/')