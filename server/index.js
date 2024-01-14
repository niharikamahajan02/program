const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json()); //req.body
// Get all programs
app.get("/programs", async (req, res) => {
    try {
      const allPrograms = await pool.query("SELECT * FROM programs");
      res.json(allPrograms.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Get a single program
  app.get("/programs/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const program = await pool.query("SELECT * FROM programs WHERE id = $1", [id]);
      if (program.rows.length === 0) {
        return res.status(404).json({ message: "Program not found" });
      }
      res.json(program.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Create a program
  app.post("/programs", async (req, res) => {
    const {
      name,
      price,
      domain,
      program_type,
      registrations,
      description,
      placement_assurance,
      image_url,
      university_name,
      faculty_profile,
      learning_hours,
      duration,
      certificate_diploma,
      eligibility_criteria,
    } = req.body;
  
    try {
      const newProgram = await pool.query(
        "INSERT INTO programs (name, price, domain, program_type, registrations, description, placement_assurance, image_url, university_name, faculty_profile, learning_hours, duration, certificate_diploma, eligibility_criteria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
        [
          name,
          price,
          domain,
          program_type,
          registrations,
          description,
          placement_assurance,
          image_url,
          university_name,
          faculty_profile,
          learning_hours,
          duration,
          certificate_diploma,
          eligibility_criteria,
        ]
      );
  console.log(req.body);
      res.status(201).json(newProgram.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Update a program
  app.put("/programs/:id", async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE programs SET " +
      Object.keys(updateFields).map((key, index) => `${key} = $${index + 1}`).join(', ') +
      ` WHERE id = $${Object.keys(updateFields).length + 1} RETURNING *`,
      [...Object.values(updateFields), id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

  
  // Delete a program
  app.delete("/programs/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProgram = await pool.query("DELETE FROM programs WHERE id = $1 RETURNING *", [id]);
  
      if (deletedProgram.rows.length === 0) {
        return res.status(404).json({ message: "Program not found" });
      }
  
      res.status(204).end();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });


app.listen(5000,()=>{
    console.log("app runnig")
});

