//==================================================================================
// Get a row from a table : table, keyName, keyValue are passed in Body
//==================================================================================
function handleGetKey(req, res, db) {
  //
  // Check table/keyName/keyValue sent
  //
  const { table, keyName, keyValue } = req.body;
  if (!table || !keyName || !keyValue) {
    return res
      .status(400)
      .json(`Table/KeyName/KeyValue not sent as Body Parameters`);
  }
  //
  // Get Database record (ASYNC)
  //
  const response = f_handleGetKeyAwait(req, res, db, table, keyName, keyValue);
}

//==================================================================================
// Main function - Await
//==================================================================================
async function f_handleGetKeyAwait(req, res, db, table, keyName, keyValue) {
  try {
    //
    // Get DB Record
    //
    const response = await f_handleGetKeySql(db, table, keyName, keyValue);
    //
    // Return Results
    //
    if (response) {
      res.status(200).json(response);
    }
    //
    // Errors
    //
    else {
      res
        .status(400)
        .send(
          `Record not found in TABLE(${table}) with KEY(${keyName}) and VALUE(${keyValue})`
        );
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Catch Error");
  }
}

//==================================================================================
// Database Function
//==================================================================================
function f_handleGetKeySql(db, table, keyName, keyValue) {
  //
  // Promise
  //
  return new Promise((resolve, reject) => {
    //
    // SQL Database
    //
    db.select("*")
      .from(table)
      .where(keyName, "=", keyValue)
      //
      // Return Record found
      //
      .then((row) => {
        if (row.length) {
          resolve(row[0]);
        }
        //
        // Errors
        //
        else {
          resolve(false);
        }
      })
      .catch((err) => {
        console.log(err);
        resolve(false);
      });
  });
}

//==================================================================================
// Exports
//==================================================================================
module.exports = {
  handleGetKey,
};
