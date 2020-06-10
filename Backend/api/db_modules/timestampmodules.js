var timestampMethods = {
    setOnlineStatusOnline : async function (postData) {
      var sql = `UPDATE users
            SET Status =${postData.online}  WHERE UserID = ${postData.userid} `;
      const result = await dbConnection.query(sql);
    }
    
    getOnlineStatus : async function (postData) {
      var sql = `SELECT Name, Status FROM users WHERE UserID = ${postData.userid} `;
      const result = await dbConnection.query(sql);
    }
};

module.exports = timestampMethods;