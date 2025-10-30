// generate-hash.js
const bcrypt = require('bcrypt');

const password = process.argv[2] || 'admin123';
const saltRounds = 12;

const hash = bcrypt.hashSync(password, saltRounds);

console.log('\n🔐 Bcrypt hash for password "' + password + '":\n');
console.log(hash);
console.log('\n✅ Copy this hash to use in your SQL INSERT statement.\n');