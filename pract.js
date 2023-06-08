const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let sum = (num1)=>'kjkbkknjnnkjnk'+num1
  
  readline.question(`What's your name?`, (num1) => {
    console.log(sum(num1));
    readline.close();
  });