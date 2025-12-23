import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./malibu_crew.db');

const players = [
  { name: 'Styles Phipps', number: 0, position: 'G', stats: { height: '6-2', weight: '185', year: 'So.' }, bio: 'Phoenix, Ariz. | St. Mary\'s' },
  { name: 'David Mager', number: 1, position: 'G', stats: { height: '6-4', weight: '195', year: 'R-Jr.' }, bio: 'Englewood, N.J. | Dwight-Englewood School' },
  { name: 'Aaron Clark', number: 3, position: 'G', stats: { height: '6-4', weight: '190', year: 'R-So.' }, bio: 'Easton, Pa. | Brewster Academy' },
  { name: 'Pavle Stosic', number: 4, position: 'F', stats: { height: '6-9', weight: '215', year: 'R-So.' }, bio: 'Niš, Serbia' },
  { name: 'Vladimir Sudar', number: 7, position: 'F', stats: { height: '6-5', weight: '190', year: 'Fr.' }, bio: 'Podgorica, Montenegro' },
  { name: 'Pasha Shemirani', number: 9, position: 'F', stats: { height: '6-5', weight: '200', year: 'R-Fr.' }, bio: 'Los Angeles, Calif. | Sunrise Christian Academy' },
  { name: 'Ty Virgil', number: 11, position: 'G', stats: { height: '6-5', weight: '170', year: 'Fr.' }, bio: 'Sacramento, Calif. | Hillcrest Prep' },
  { name: 'Stefan Cicic', number: 14, position: 'C', stats: { height: '7-0', weight: '260', year: 'R-Fr.' }, bio: 'Riverside, Ill. | Riverside Brookfield' },
  { name: 'Yonatan Levy', number: 18, position: 'F', stats: { height: '6-10', weight: '250', year: 'So.' }, bio: 'Hod HaSharon, Israel' },
  { name: 'Javon Cooley', number: 23, position: 'G/F', stats: { height: '6-5', weight: '205', year: 'Gr.' }, bio: 'Chicago, Ill. | St. Rita' },
  { name: 'Preston Phillips', number: 24, position: 'F', stats: { height: '6-8', weight: '225', year: 'Gr.' }, bio: 'Elkhart, Ind. | Jimtown' },
  { name: 'Anto Balian', number: 25, position: 'G', stats: { height: '6-1', weight: '200', year: 'Fr.' }, bio: 'Glendale, Calif. | Pilibos' },
  { name: 'Nikola Radovanovic', number: 33, position: 'F', stats: { height: '6-9', weight: '215', year: 'Fr.' }, bio: 'Nevesinje, Bosnia and Herzegovina' },
  { name: 'Danilo Dozic', number: 35, position: 'F/C', stats: { height: '6-10', weight: '225', year: 'So.' }, bio: 'Belgrade, Serbia' },
  { name: 'Luka Vudragovic', number: 77, position: 'G', stats: { height: '6-6', weight: '205', year: 'Fr.' }, bio: 'Stari Banovci, Serbia' },
];

db.serialize(() => {
  // Clear existing players
  db.run('DELETE FROM players');

  // Insert new players
  players.forEach((player) => {
    db.run(
      'INSERT INTO players (name, number, position, stats, bio) VALUES (?, ?, ?, ?, ?)',
      [player.name, player.number, player.position, JSON.stringify(player.stats), player.bio],
      (err) => {
        if (err) console.error('Error:', err);
        else console.log(`Added: ${player.name}`);
      }
    );
  });

  console.log('Seed complete!');
});

db.close();
