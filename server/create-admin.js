import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

const db = new sqlite3.Database('./malibu_crew.db');

const adminEmail = 'admin@malibu.com';
const adminPassword = 'admin123'; // Change this!
const adminUsername = 'admin';

const hashedPassword = bcrypt.hashSync(adminPassword, 10);

db.run(
  'INSERT OR REPLACE INTO users (username, email, password, is_admin) VALUES (?, ?, ?, ?)',
  [adminUsername, adminEmail, hashedPassword, 1],
  (err) => {
    if (err) {
      console.error('Error creating admin:', err);
    } else {
      console.log('Admin user created!');
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
      console.log('⚠️  IMPORTANT: Change the password after first login!');
    }
    db.close();
  }
);
