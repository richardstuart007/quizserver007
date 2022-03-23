const handleGetAll = (req, res, db) => {
  db.select("*")
    .from("students")
    .then((student) => {
      if (student.length) {
        res.json(student);
      } else {
        res.status(400).json("Students not found");
      }
    })
    .catch((err) => res.status(400).json("Error retrieving students"));
};

module.exports = {
  handleGetAll,
};
