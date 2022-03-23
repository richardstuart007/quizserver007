const handleDelete = (req, res, db) => {
  //================================================================
  // Check Data sent
  //================================================================
  const { email } = req.body;
  if (!email) {
    return res.status(400).json(`Email not sent in the Body`);
  }

  //================================================================
  // Delete record
  //================================================================
  db.transaction((trx) => {
    trx
      .del()
      .from("students")
      .where({ email: email })
      .returning("*")

      //   .then((student) => {
      //     if (!student[0]) {
      //       console.log("nothing to delete");
      //       trx.rollback;
      //       res.status(400).json("nothing to delete");
      //       throw "error";
      //     }
      //   })

      //   .then(console.log("ready to commit"))

      .then(trx.commit)
      .then(res.status(200).json(`Student Email ${email} DELETED`))
      .catch(trx.rollback);
  }).catch((err) => {
    trx.rollback;
    res.status(400).json(err.message);
  });
};

module.exports = {
  handleDelete,
};
