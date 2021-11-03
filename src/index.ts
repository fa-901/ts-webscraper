import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter URL: ', (url: string) => {
    console.log(`URL is ${url}`);
    rl.close();
});