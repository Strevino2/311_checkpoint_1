const handleSQLError = (res, err) => {
    console.log('SQL Error: ', err)
    return res.status(500).send("Uh oh! We couldn't find any data");
  }
  
  module.exports = { handleSQLError }