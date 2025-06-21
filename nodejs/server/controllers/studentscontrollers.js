const mysql = require("mysql");
const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});
exports.view = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("select * from users", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log("Error in Listinng Data" + err);
      }
    });
  });
};
// exports.save = (req, res) => {
//   con.getConnection((err, connection) => {
//     if (err) throw err;
//     const { name, age, city } = req.body;
//     connection.query(
//       "insert into users (NAME,AGE,CITY) VALUES(?,?,?)",
//       [name, age, city],
//       (err, rows) => {
//         connection.release();
//         if (!err) {
//           res.render("home");
//         } else {
//           console.log("Error in Listinng Data" + err);
//         }
//       }
//     );
//   });
// };
exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const { name, age, city } = req.body;

    connection.query(
      "INSERT INTO users (NAME, AGE, CITY) VALUES (?, ?, ?)",
      [name, age, city],
      (err, result) => {
        if (err) {
          connection.release();
          console.log("Insert Error:", err);
          return;
        }

        // Fetch updated list
        connection.query("SELECT * FROM users", (err, rows) => {
          connection.release();

          if (!err) {
            res.render("home", { rows });
          } else {
            console.log("Error fetching after insert: ", err);
          }
        });
      }
    );
  });
}; 
