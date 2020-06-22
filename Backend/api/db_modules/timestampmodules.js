var timestampMethods = {
    setOnlineStatusOnline : async function (postData) {
      var sql = `UPDATE users
            SET Status =${postData.online}  WHERE userID = ${postData.userId} `;
      const result = await dbConnection.query(sql);
      return result;
    },
    
    getOnlineStatus : async function (postData) {
      var sql = `CALL getEmployees(${postData.companyID})`;
      const result = await dbConnection.query(sql);
      return result[0];
    },

      addClockin : async function (postData) {
        var sql = "CALL InsertorUpdateClockIn(true, NOW(), null, "
        + postData.userId
        + ","
        + postData.companyID 
        + ") ";
        const result = await dbConnection.query(sql);
        return result;
    },

      addClockOut : async function (postData) {
        var sql = "CALL InsertorUpdateClockIn(false,"
        + ", null, NOW()"
        + postData.userId
        + ","
        + postData.companyID 
        + ") ";
        const result = await dbConnection.query(sql);
        return result;
    },

    getActivity : async function (postData) {
        var sql = `CALL getActivity(${postData.companyID}, ${postData.UserID})`
        const result = await dbConnection.query(sql);
        return result[0][0];

    }
};

module.exports = timestampMethods;