const handleGetId = (req, res, db) => {
  //================================================================
  // Check ID sent
  //================================================================
  var { id } = req.params;
  id = parseInt(id);

  if (!id) {
    return res.status(400).json(`Valid ID not sent as Parameter`);
  }

  //================================================================
  // Get Database record
  //================================================================
  db.select("*")
    .from("students")
    .where({ id: id })

    // Return record
    .then((student) => {
      if (student.length) {
        return res.status(200).json(student[0]);
      }

      // Not Found
      res.status(400).json(`Student ID ...${id}... Not Found`);
    })

    //  Error
    .catch((err) => res.status(400).json(`Error retrieving student ID`));
};

module.exports = {
  handleGetId,
};
