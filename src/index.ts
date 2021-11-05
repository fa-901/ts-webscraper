import readline from 'readline';
import http from 'https';
import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('Enter URL: ', url => {
//     startScraper(url);
//     rl.close();
// });

async function startScraper(url: string) {
    console.log(url)
    const AxiosInstance = axios.create();
    const html = await AxiosInstance.get(url)
        .then(res => { return res.data });
    const $ = cheerio.load(html);
    const gallery = $('#demo-test-gallery > a');
    gallery.each((index, element) => {
        let url: string = $(element).attr('href');
        downloadPhoto(url, index);
    })
}

async function downloadPhoto(url: string, index: number) {
    const dir = 'downloads';
    const filepath = `${dir}/${index}.jpg`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    http.get(url, (res) => {
        res.pipe(fs.createWriteStream(filepath).on('close', () => { console.log(`${filepath} downloaded.`) }));
    });

}

/** test */
startScraper('https://photoswipe.com/');