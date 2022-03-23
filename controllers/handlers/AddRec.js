const handleAdd = (req, res, db) => {
  //================================================================
  // Check Data sent
  //================================================================
  const { name, email, age, dob } = req.body;
  if (!name || !email || !age || !dob) {
    return res.status(400).json(`Data not sent in the Body`);
  }

  //================================================================
  // Add record
  //================================================================
  const rec = {
    name: name,
    email: email,
    age: age,
    dob: dob,
  };

  db.transaction((trx) => {
    trx
      .insert(rec)
      .into("students")
      .returning("*")
      .onConflict("email")
      .ignore()

      .then((student) => {
        if (!student[0]) {
          res.status(400).send("Duplicate email not added");
        } else {
          res.status(200).json(student[0]);
        }
      })

      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    res.status(400).json(err.message);
  });
};

module.exports = {
  handleAdd,
};
