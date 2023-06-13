const express = require("express");
const app = express();
const mysql = require("mysql");

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kelompok6",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Serve static files
app.use(express.static("public"));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

// Handle POST request to /api/book
app.post("/api/book", (req, res) => {
  const {
    id,
    nama_cust,
    tgl_booking,
    jam_booking,
    jml_tamu,
    no_telp,
    bukti_tf,
  } = req.body;

  // Insert data ke tabel MySQL
  const query = `INSERT INTO bookings (id, nama_cust, tgl_booking, jam_booking, jml_tamu, no_telp, bukti_tf) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [id, nama_cust, tgl_booking, jam_booking, jml_tamu, no_telp, bukti_tf],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting data into MySQL: ", error);
        res.sendStatus(500);
      } else {
        // Mengirim respons sukses
        res.send('<script>alert("Berhasil Melakukan Booking!");</script>');
      }
    }
  );
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
