const db = require('./db.cjs');

db.all("SELECT * FROM users", [], (err, rows) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("=== REGISTERED FARMERS ===");
    console.table(rows);
  }
  db.close();
});
