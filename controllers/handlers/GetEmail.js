const handleGetEmail = (req, res, db) => {
  //================================================================
  // Check Email sent
  //================================================================
  const { email } = req.body;
  if (!email) {
    return res.status(400).json(`Email not sent in Body`);
  }

  //================================================================
  // Get Database record
  //================================================================
  db.select("*")
    .from("students")
    .where({ email: email })

    // Return record
    .then((student) => {
      if (student.length) {
        return res.status(200).json(student[0]);
      }

      // Not Found
      res.status(400).json(`Student Email ${email} Not Found`);
    })

    //  Error
    .catch((err) => res.status(400).json("Error retrieving student Email"));
};

module.exports = {
  handleGetEmail,
};
