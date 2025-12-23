import sqlite3 from 'sqlite3';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const db = new sqlite3.Database('./malibu_crew.db');

const PEPPERDINE_ROSTER_URL = 'https://pepperdinewaves.com/sports/mens-basketball/roster';

async function scrapeRoster() {
  try {
    // Create tables first
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS players (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          number INTEGER,
          position TEXT,
          stats TEXT,
          image_url TEXT,
          bio TEXT,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    });

    console.log('Fetching Pepperdine roster...');
    const response = await fetch(PEPPERDINE_ROSTER_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    const players = [];

    // Parse the roster table
    $('table tbody tr').each((index, element) => {
      const cells = $(element).find('td');
      if (cells.length > 0) {
        const number = $(cells[0]).text().trim();
        const name = $(cells[1]).text().trim();
        const position = $(cells[2]).text().trim();
        const height = $(cells[3]).text().trim();
        const weight = $(cells[4]).text().trim();
        const year = $(cells[5]).text().trim();
        const hometown = $(cells[7]).text().trim();
        const highSchool = $(cells[8]).text().trim();

        if (name) {
          players.push({
            number: parseInt(number) || null,
            name,
            position,
            height,
            weight,
            year,
            hometown,
            highSchool,
          });
        }
      }
    });

    console.log(`Found ${players.length} players`);

    // Insert into database
    db.serialize(() => {
      players.forEach((player) => {
        const stats = {
          height: player.height,
          weight: player.weight,
          year: player.year,
          hometown: player.hometown,
          highSchool: player.highSchool,
        };

        db.run(
          'INSERT OR REPLACE INTO players (name, number, position, stats, bio) VALUES (?, ?, ?, ?, ?)',
          [
            player.name,
            player.number,
            player.position,
            JSON.stringify(stats),
            `${player.hometown} | ${player.highSchool}`,
          ],
          (err) => {
            if (err) console.error('Error inserting player:', err);
            else console.log(`Added/Updated: ${player.name}`);
          }
        );
      });
    });

    console.log('Roster import complete!');
  } catch (error) {
    console.error('Error scraping roster:', error);
  } finally {
    db.close();
  }
}

scrapeRoster();
