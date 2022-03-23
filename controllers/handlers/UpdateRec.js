const handleUpdate = (req, res, db) => {
  //================================================================
  // Check Data sent
  //================================================================
  const { name, email, age, dob } = req.body;
  if (!name || !email || !age || !dob) {
    return res.status(400).json(`Data not sent in the Body`);
  }

  //================================================================
  // Update record
  //================================================================
  db.transaction((trx) => {
    trx
      .update({
        name: name,
        age: age,
        dob: dob,
      })
      .from("students")
      .where({ email: email })
      .returning("id")

      .then((id) => {
        res.status(200).json(`Student Email ${email} with ID ${id} Updated`);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    res.status(400).json(err.message);
  });
};

module.exports = {
  handleUpdate,
};
