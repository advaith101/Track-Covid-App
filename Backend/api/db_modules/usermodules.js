var userMethods = {
  validateLogin: async function (postData) {
    const [rows] = await dbConnection.execute("CALL ValidateLogin('" + postData.email + "','" + postData.password + "',"+ postData.companyID+ ");");
    return rows;
  },
  insertUser: async function (postData) {
    var sql = "INSERT INTO users (CompanyID,Name, Email, LocationID, DepartmentID,Password,IsAdmin, CreatedBy) VALUES ?";
    var values = [
      [postData.companyID, postData.name, postData.email, postData.locationID,postData.departmentID, postData.password, postData.isAdmin, postData.createdBy]
    ];
    const result = await dbConnection.query(sql, [values]);
    return result;
  },
  insertJWTToken: async function (postData) {
    const [rows] = await dbConnection.execute("CALL InsertJWtToken('" + postData.token + "','" + postData.refreshToken + "','" + postData.userID + "','" + JSON.stringify(postData.tokenData) + "');");
    return rows;
  },
  getTokenDetails: async function (refreshToken) {
    var sql = `Select token,tokenData,userID from jwttokens where RefreshToken='${refreshToken}' and IsActive=1 `;
       
    const result = await dbConnection.query(sql);
    return result[0][0];
  },
  changePassword: async function (postData) {
    var sql = `Update users set password='${postData.newPassword}' where email='${postData.email}' and CompanyID=${postData.companyID} and IsActive=1 `;
       
    const result = await dbConnection.query(sql);
    return result;
  },
  getUser:async function (postData){
    var sql = `select UserID from users where email='${postData.email}' and CompanyID=${postData.companyID} and IsActive=1 `;
    const result = await dbConnection.query(sql);
    return result;
  },
};

module.exports = userMethods;