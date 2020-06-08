var absenceMethods = {
   
    insertAbsence: async function (postData) {     
      let sql ="CALL InsertorUpdateAbsence(" + (postData.absenceID != null && postData.absenceID != undefined ? postData.absenceID : 0 ) ;
      sql +=  "," + postData.companyID  ;
      sql +=  ",'" + postData.email +  "','" + new Date(postData.startDate).toJSON().slice(0, 10)  ;
      sql += "'," +((postData.endDate != null && postData.endDate != undefined && postData.endDate != "") ? "'"+new Date(postData.endDate).toJSON().slice(0, 10) +"'": null) +  "," + postData.reasonID  ;
      sql += "," +postData.isCurrent+","+postData.isProcessed+","+ postData.createdBy+",'"+ postData.name + "');";     
      
    const result = await dbConnection.execute(sql);
    return result;
    },
    getAbsence: async function (postData) {     
      let sql ="CALL FilterAbsence("+postData.companyID+ "," + (postData.email != null ? "'"+postData.email+"'" : null ) ;
      sql += "," + (postData.locationID != null && postData.locationID != undefined ? postData.locationID: null) ;
      sql += "," + (postData.departmentID != null && postData.departmentID != undefined ? postData.departmentID : null)  ;
      sql += "," + (postData.reasonID != null && postData.reasonID != undefined ? postData.reasonID : null ); 
      sql += "," + (postData.isAbsent != null && postData.isAbsent != undefined ? postData.isAbsent : null)+","+postData.isAdmin + ");";
      console.log(sql);
       const [rows] = await dbConnection.execute(sql);     
      return rows[0];
    },
    getAllAbsence: async function (postData) {
      var sql = `Select email,startDate, endDate, name,isCurrent,isProcessed from absences ab,reasons rs
      where ab.ReasonID = rs.ReasonID and ab.IsActive=1 and ab.CompanyID =${postData.companyID} `;
      const result = await dbConnection.query(sql);
  
      return result[0];
    },
    deleteAbsence: async function (postData) {
      var sql = `delete from absences where AbsenceID='${postData.absenceID}' and CompanyID =${postData.companyID} and IsActive=1 `;
      const result = await dbConnection.query(sql);
  
      return result[0];
    },
};

module.exports = absenceMethods;