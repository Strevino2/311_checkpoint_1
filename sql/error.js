const handleSQLError = (res, err) => {
    console.log('SQL Error: ', err)
    return res.status(500).send('Uh oh! An unexpected error occurred');
  }
  
  module.exports = { handleSQLError }