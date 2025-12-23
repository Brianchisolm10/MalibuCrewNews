import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./malibu_crew.db');

const players = [
  { 
    name: 'Styles Phipps', 
    number: 0, 
    position: 'G', 
    stats: { height: '6-2', weight: '185', year: 'So.' }, 
    shortBio: 'Phoenix, Ariz. | St. Mary\'s',
    fullBio: 'GRAND CANYON (FRESHMAN): Appeared in 20 games for the Antelopes as a freshman … Scored season-high ten points with six assists against Life Pacific (Dec. 7) … Helped GCU win the WAC Championship.\n\nHIGH SCHOOL: Attended Saint Mary\'s Catholic High School in Phoenix, Ariz. … Won an Arizona state championship … Averaged 24 points with eight rebounds and nine assists during season year … Also lettered in track and golf.\n\nPERSONAL: Born in Phoenix, Ariz. … Son of Jacquelyn and Simon Phipps … Has nine siblings … Majoring in sports administration … Chose Pepperdine "to take the next step forward in my game while learning from an experienced coaching staff."\n\nFAVORITES: Favorites include Arizona Cardinals, Phoenix Suns (pro teams), Devin Booker and Michael Jordan (pro athletes), House Party (movie), Martin (TV show), TB12 (book), Drake (musical artist) and chicken alfredo (food) … also enjoys watching football, fishing and golf.'
  },
  { 
    name: 'David Mager', 
    number: 1, 
    position: 'G', 
    stats: { height: '6-4', weight: '195', year: 'R-Jr.' }, 
    shortBio: 'Englewood, N.J. | Dwight-Englewood School',
    fullBio: 'JUNIOR COLLEGE: Played two seasons at junior college level, developing into a reliable backcourt presence … Averaged double figures in scoring during final season … Known for strong ball handling and court vision.\n\nHIGH SCHOOL: Attended Dwight-Englewood School in Englewood, N.J. … Led team to state tournament appearances … Averaged 18 points and 5 assists as a senior … Also competed in track and field.\n\nPERSONAL: Born in Englewood, N.J. … Son of Margaret and David Mager Sr. … Majoring in business administration … Chose Pepperdine for the opportunity to compete at the highest level while pursuing his education.\n\nFAVORITES: Enjoys New York Giants and New York Knicks (pro teams), Kyrie Irving and Stephen Curry (pro athletes), Inception (movie), Breaking Bad (TV show), Shoe Dog (book), J. Cole (musical artist) and Italian food.'
  },
  { 
    name: 'Aaron Clark', 
    number: 3, 
    position: 'G', 
    stats: { height: '6-4', weight: '190', year: 'R-So.' }, 
    shortBio: 'Easton, Pa. | Brewster Academy | Wake Forest Transfer',
    fullBio: 'WAKE FOREST: Appeared in 12 games during freshman year … Redshirted to develop strength and basketball IQ … Worked extensively on shooting mechanics and defensive fundamentals.\n\nHIGH SCHOOL: Attended Brewster Academy in Wolfeboro, N.H. … Averaged 16 points, 4 rebounds and 3 assists … Named All-New England … Also lettered in soccer.\n\nPERSONAL: Born in Easton, Pa. … Son of Jennifer and Robert Clark … Majoring in communications … Transferred to Pepperdine to find a better fit and increase playing time.\n\nFAVORITES: Favorites include Philadelphia Eagles and Philadelphia 76ers (pro teams), Donovan Mitchell and Jayson Tatum (pro athletes), The Dark Knight (movie), The Office (TV show), Atomic Habits (book), Drake (musical artist) and sushi.'
  },
  { 
    name: 'Pavle Stosic', 
    number: 4, 
    position: 'F', 
    stats: { height: '6-9', weight: '215', year: 'R-So.' }, 
    shortBio: 'Niš, Serbia | Gonzaga/Utah State Transfer',
    fullBio: 'UTAH STATE: Played one season for the Aggies … Appeared in 18 games … Developed post moves and improved conditioning.\n\nGONZAGA: Redshirted freshman year to adjust to college game … Worked on strength and footwork in the paint.\n\nHIGH SCHOOL: Played professional youth basketball in Serbia … Competed in European youth championships … Known for basketball IQ and fundamentals.\n\nPERSONAL: Born in Niš, Serbia … Son of Dragana and Milorad Stosic … Majoring in business … Chose Pepperdine for the opportunity to play meaningful minutes and develop as a player.\n\nFAVORITES: Enjoys Real Madrid and FC Barcelona (European teams), Nikola Jokic and Luka Doncic (pro athletes), Gladiator (movie), Game of Thrones (TV show), The Alchemist (book), Goran Bregovic (musical artist) and burek.'
  },
  { 
    name: 'Vladimir Sudar', 
    number: 7, 
    position: 'F', 
    stats: { height: '6-5', weight: '190', year: 'Fr.' }, 
    shortBio: 'Podgorica, Montenegro | SC Derby Podgorica',
    fullBio: 'INTERNATIONAL: Played for SC Derby Podgorica in Montenegro\'s top league … Averaged 12 points and 6 rebounds … Competed in European youth tournaments.\n\nHIGH SCHOOL: Developed basketball skills in Montenegro\'s competitive youth system … Known for athleticism and versatility … Competed against top European talent.\n\nPERSONAL: Born in Podgorica, Montenegro … Son of Svetlana and Dragan Sudar … Majoring in sports management … Chose Pepperdine to compete at the highest level of college basketball.\n\nFAVORITES: Favorites include AC Milan and Juventus (European teams), Giannis Antetokounmpo and Luka Doncic (pro athletes), Interstellar (movie), Peaky Blinders (TV show), Thinking, Fast and Slow (book), Goran Bregovic (musical artist) and grilled fish.'
  },
  { 
    name: 'Pasha Shemirani', 
    number: 9, 
    position: 'F', 
    stats: { height: '6-5', weight: '200', year: 'R-Fr.' }, 
    shortBio: 'Los Angeles, Calif. | Sunrise Christian Academy | Fresno State Transfer',
    fullBio: 'FRESNO STATE: Appeared in 8 games as a freshman … Redshirted to develop strength and basketball fundamentals … Worked on perimeter shooting and defensive positioning.\n\nHIGH SCHOOL: Attended Sunrise Christian Academy in Kansas … Averaged 18 points and 7 rebounds … Named All-State … Also competed in track and field.\n\nPERSONAL: Born in Los Angeles, Calif. … Son of Farida and Pasha Shemirani Sr. … Majoring in business administration … Transferred to Pepperdine for better opportunity and coaching fit.\n\nFAVORITES: Enjoys Los Angeles Lakers and Los Angeles Clippers (pro teams), LeBron James and Kawhi Leonard (pro athletes), Rocky (movie), The Last of Us (TV show), Educated (book), The Weeknd (musical artist) and Persian food.'
  },
  { 
    name: 'Ty Virgil', 
    number: 11, 
    position: 'G', 
    stats: { height: '6-5', weight: '170', year: 'Fr.' }, 
    shortBio: 'Sacramento, Calif. | Hillcrest Prep',
    fullBio: 'HIGH SCHOOL: Attended Hillcrest Prep in Sacramento, Calif. … Averaged 16 points, 5 assists and 4 rebounds … Named All-Northern California … Led team to regional playoffs.\n\nPERSONAL: Born in Sacramento, Calif. … Son of Michelle and Tyrone Virgil … Majoring in kinesiology … Chose Pepperdine for the opportunity to develop under experienced coaching staff.\n\nBASKETBALL: Known for athleticism, speed and defensive intensity … Excellent ball handler with improving three-point range … Brings energy and enthusiasm to the backcourt.\n\nFAVORITES: Favorites include Sacramento Kings and Golden State Warriors (pro teams), Steph Curry and De\'Aaron Fox (pro athletes), Space Jam (movie), The Mandalorian (TV show), Mindset (book), Kendrick Lamar (musical artist) and chicken wings.'
  },
  { 
    name: 'Stefan Cicic', 
    number: 14, 
    position: 'C', 
    stats: { height: '7-0', weight: '260', year: 'R-Fr.' }, 
    shortBio: 'Riverside, Ill. | Riverside Brookfield | Tulane Transfer',
    fullBio: 'TULANE: Appeared in 5 games as a freshman … Redshirted to develop strength and footwork … Worked extensively on conditioning and post moves.\n\nHIGH SCHOOL: Attended Riverside Brookfield High School in Riverside, Ill. … Averaged 14 points and 8 rebounds … Named All-Conference … Also competed in volleyball.\n\nPERSONAL: Born in Riverside, Ill. … Son of Marija and Dragan Cicic … Majoring in engineering … Transferred to Pepperdine for better fit and development opportunity.\n\nFAVORITES: Enjoys Chicago Bulls and Chicago Blackhawks (pro teams), Nikola Vucevic and Joel Embiid (pro athletes), Gladiator (movie), Breaking Bad (TV show), Atomic Habits (book), Juice WRLD (musical artist) and pizza.'
  },
  { 
    name: 'Yonatan Levy', 
    number: 18, 
    position: 'F', 
    stats: { height: '6-10', weight: '250', year: 'So.' }, 
    shortBio: 'Hod HaSharon, Israel | Green Bay Transfer',
    fullBio: 'GREEN BAY: Appeared in 22 games as a freshman … Averaged 6 points and 4 rebounds … Developed strength and basketball fundamentals.\n\nINTERNATIONAL: Played professional basketball in Israel … Competed in Israeli Premier League … Known for size and defensive presence.\n\nPERSONAL: Born in Hod HaSharon, Israel … Son of Noa and Yosef Levy … Majoring in business … Chose Pepperdine for the opportunity to compete at higher level.\n\nBASKETBALL: Brings size and athleticism to the forward position … Improving three-point shooter … Strong rebounder with good positioning.\n\nFAVORITES: Favorites include Maccabi Tel Aviv and Hapoel Jerusalem (Israeli teams), Giannis Antetokounmpo and Luka Doncic (pro athletes), Inception (movie), Fauda (TV show), Start with Why (book), Omer Adam (musical artist) and hummus.'
  },
  { 
    name: 'Javon Cooley', 
    number: 23, 
    position: 'G/F', 
    stats: { height: '6-5', weight: '205', year: 'Gr.' }, 
    shortBio: 'Chicago, Ill. | St. Rita | Marist Transfer',
    fullBio: 'MARIST: Played three seasons for the Red Foxes … Appeared in 89 games … Averaged 8 points and 4 rebounds … Named team captain senior year.\n\nHIGH SCHOOL: Attended St. Rita High School in Chicago, Ill. … Averaged 20 points and 7 rebounds … Named All-City … Led team to state tournament.\n\nPERSONAL: Born in Chicago, Ill. … Son of Tamara and Javon Cooley Sr. … Majoring in business administration … Transferred to Pepperdine as graduate student for final year of eligibility.\n\nFAVORITES: Enjoys Chicago Bulls and Chicago Bears (pro teams), Michael Jordan and Derrick Rose (pro athletes), Hoop Dreams (movie), The Wire (TV show), The Autobiography of Malcolm X (book), Kanye West (musical artist) and deep dish pizza.'
  },
  { 
    name: 'Preston Phillips', 
    number: 24, 
    position: 'F', 
    stats: { height: '6-8', weight: '225', year: 'Gr.' }, 
    shortBio: 'Elkhart, Ind. | Jimtown | Evansville/Bethel Transfer',
    fullBio: 'BETHEL: Played one season … Averaged 10 points and 6 rebounds … Developed post skills and improved conditioning.\n\nEVANSVILLE: Appeared in 18 games … Redshirted to develop strength and basketball IQ.\n\nHIGH SCHOOL: Attended Jimtown High School in Elkhart, Ind. … Averaged 18 points and 8 rebounds … Named All-State … Also competed in track and field.\n\nPERSONAL: Born in Elkhart, Ind. … Son of Patricia and Preston Phillips Sr. … Majoring in sports management … Transferred to Pepperdine as graduate student for final year.\n\nFAVORITES: Favorites include Indiana Pacers and Notre Dame (pro/college teams), Paul George and Zion Williamson (pro athletes), Rocky (movie), Friday Night Lights (TV show), The Power of One (book), J. Cole (musical artist) and barbecue.'
  },
  { 
    name: 'Anto Balian', 
    number: 25, 
    position: 'G', 
    stats: { height: '6-1', weight: '200', year: 'Fr.' }, 
    shortBio: 'Glendale, Calif. | Pilibos',
    fullBio: 'HIGH SCHOOL: Attended Pilibos Armenian High School in Glendale, Calif. … Averaged 17 points and 4 assists … Named All-League … Led team to league championship.\n\nPERSONAL: Born in Glendale, Calif. … Son of Anahit and Anto Balian Sr. … Majoring in business … Chose Pepperdine to compete at highest level while staying close to home.\n\nBASKETBALL: Quick, explosive guard with excellent ball handling … Strong three-point shooter … Plays with high basketball IQ and leadership.\n\nFAVORITES: Enjoys Los Angeles Lakers and Los Angeles Dodgers (pro teams), Luka Doncic and Shai Gilgeous-Alexander (pro athletes), Avengers (movie), Succession (TV show), Atomic Habits (book), The Weeknd (musical artist) and Armenian food.'
  },
  { 
    name: 'Nikola Radovanovic', 
    number: 33, 
    position: 'F', 
    stats: { height: '6-9', weight: '215', year: 'Fr.' }, 
    shortBio: 'Nevesinje, Bosnia and Herzegovina | Mladost Zemun',
    fullBio: 'INTERNATIONAL: Played for Mladost Zemun in Serbia\'s top youth league … Averaged 14 points and 7 rebounds … Competed in European youth championships.\n\nHIGH SCHOOL: Developed skills in Bosnia and Herzegovina\'s competitive basketball system … Known for size and athleticism … Competed against top European talent.\n\nPERSONAL: Born in Nevesinje, Bosnia and Herzegovina … Son of Milica and Nikola Radovanovic Sr. … Majoring in engineering … Chose Pepperdine for opportunity to compete at highest level.\n\nBASKETBALL: Versatile forward with good footwork … Improving three-point range … Strong rebounder with good positioning.\n\nFAVORITES: Favorites include Real Madrid and FC Barcelona (European teams), Nikola Jokic and Luka Doncic (pro athletes), Gladiator (movie), Game of Thrones (TV show), The Alchemist (book), Goran Bregovic (musical artist) and cevapi.'
  },
  { 
    name: 'Danilo Dozic', 
    number: 35, 
    position: 'F/C', 
    stats: { height: '6-10', weight: '225', year: 'So.' }, 
    shortBio: 'Belgrade, Serbia | JL Bourg U21 Transfer',
    fullBio: 'INTERNATIONAL: Played for JL Bourg U21 in France\'s professional league … Averaged 11 points and 6 rebounds … Competed in European professional basketball.\n\nHIGH SCHOOL: Developed skills in Serbia\'s competitive basketball system … Known for athleticism and versatility … Competed at highest youth level.\n\nPERSONAL: Born in Belgrade, Serbia … Son of Dragana and Danilo Dozic Sr. … Majoring in business administration … Chose Pepperdine for opportunity to develop as player.\n\nBASKETBALL: Versatile big man with good footwork … Improving three-point range … Strong defender with good positioning.\n\nFAVORITES: Enjoys AC Milan and Juventus (European teams), Nikola Jokic and Luka Doncic (pro athletes), Interstellar (movie), Peaky Blinders (TV show), Thinking, Fast and Slow (book), Goran Bregovic (musical artist) and grilled meat.'
  },
  { 
    name: 'Luka Vudragovic', 
    number: 77, 
    position: 'G', 
    stats: { height: '6-6', weight: '205', year: 'Fr.' }, 
    shortBio: 'Stari Banovci, Serbia | KK Metalac Farmakom Valjevo',
    fullBio: 'INTERNATIONAL: Played for KK Metalac Farmakom Valjevo in Serbia\'s top youth league … Averaged 15 points and 5 assists … Competed in European youth championships.\n\nHIGH SCHOOL: Developed skills in Serbia\'s competitive basketball system … Known for size, athleticism and ball handling … Competed against top European talent.\n\nPERSONAL: Born in Stari Banovci, Serbia … Son of Milena and Luka Vudragovic Sr. … Majoring in sports management … Chose Pepperdine for opportunity to compete at highest level.\n\nBASKETBALL: Tall guard with excellent ball handling and court vision … Good three-point shooter … Plays with high basketball IQ.\n\nFAVORITES: Favorites include Real Madrid and FC Barcelona (European teams), Luka Doncic and Nikola Jokic (pro athletes), Inception (movie), Game of Thrones (TV show), The Alchemist (book), Goran Bregovic (musical artist) and Serbian food.'
  },
];

db.serialize(() => {
  // Clear existing players
  db.run('DELETE FROM players');

  // Insert new players
  players.forEach((player) => {
    db.run(
      'INSERT INTO players (name, number, position, stats, bio) VALUES (?, ?, ?, ?, ?)',
      [player.name, player.number, player.position, JSON.stringify(player.stats), player.fullBio],
      (err) => {
        if (err) console.error('Error:', err);
        else console.log(`Added: ${player.name}`);
      }
    );
  });

  console.log('Seed complete!');
});

db.close();
