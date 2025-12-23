import sqlite3 from 'sqlite3';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const db = new sqlite3.Database('./malibu_crew.db');

const PEPPERDINE_ROSTER_URL = 'https://pepperdinewaves.com/sports/mens-basketball/roster';

async function scrapePlayerBios() {
  try {
    console.log('Fetching Pepperdine roster page...');
    const response = await fetch(PEPPERDINE_ROSTER_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Get all player links
    const playerLinks = [];
    $('a[href*="/sports/mens-basketball/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('/sports/mens-basketball/') && !href.includes('/roster')) {
        playerLinks.push(href);
      }
    });

    console.log(`Found ${playerLinks.length} potential player pages`);

    // Scrape each player's bio page
    for (const link of playerLinks.slice(0, 15)) {
      try {
        const playerUrl = link.startsWith('http') ? link : `https://pepperdinewaves.com${link}`;
        console.log(`Scraping: ${playerUrl}`);
        
        const playerResponse = await fetch(playerUrl);
        const playerHtml = await playerResponse.text();
        const $player = cheerio.load(playerHtml);

        // Extract player info
        const name = $player('h1').first().text().trim();
        const number = $player('.player-number').text().trim() || '';
        const position = $player('.player-position').text().trim() || '';
        
        // Extract bio sections
        let fullBio = '';
        $player('.player-bio, .bio-content, .player-content').each((i, el) => {
          fullBio += $(el).text().trim() + '\n';
        });

        if (name && fullBio) {
          console.log(`Found bio for ${name}`);
          // Update player in database
          db.run(
            'UPDATE players SET bio = ? WHERE name LIKE ?',
            [fullBio, `%${name}%`],
            (err) => {
              if (err) console.error(`Error updating ${name}:`, err);
              else console.log(`Updated: ${name}`);
            }
          );
        }
      } catch (err) {
        console.error(`Error scraping player page:`, err.message);
      }
    }

    console.log('Bio scraping complete!');
  } catch (error) {
    console.error('Error scraping bios:', error);
  } finally {
    setTimeout(() => db.close(), 2000);
  }
}

scrapePlayerBios();
