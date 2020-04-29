var commonMethods = {

  getLocations: async function (postData) {
    var sql = `Select LocationID, Name from locations where CompanyID = ${postData.companyID} and IsActive=1 `;
    const result = await dbConnection.query(sql);

    return result[0];
  },
  getDepartments: async function (postData) {
    var sql = `Select DepartmentID, Name from departments where CompanyID = ${postData.companyID} and IsActive=1 `;
    const result = await dbConnection.query(sql);

    return result[0];
  },
  getReasons: async function (postData) {
    var sql = `Select ReasonID, Name from reasons where CompanyID = ${postData.companyID} and IsActive=1 `;
    const result = await dbConnection.query(sql);

    return result[0];
  },
  getCompanies: async function () {
    var sql = `Select CompanyID, CompanyName from companies where IsActive=1 `;
    const result = await dbConnection.query(sql);

    return result[0];
  },
};

module.exports = commonMethods;