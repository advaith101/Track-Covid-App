var timestampMethods = {
    setOnlineStatusOnline : async function (postData) {
      var sql = `UPDATE covidtracker.users
            SET Status = 1 WHERE UserID = ${postData.userid} `;
      const result = await dbConnection.query(sql);
    }
};

module.exports = timestampMethods;