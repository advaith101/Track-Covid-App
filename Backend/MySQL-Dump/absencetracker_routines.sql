-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: absencetracker
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Dumping routines for database 'absencetracker'
--
/*!50003 DROP PROCEDURE IF EXISTS `FilterAbsence` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE   PROCEDURE `FilterAbsence`(In CompanyIDIn int,In EmailIn varchar(8000), in LocationIDIn int,
In DepartmentIDIn int,In ReasonIDin int,In IsAbsentIn tinyint,In IsAdminIn tinyint )
BEGIN               
             
select distinct ab.AbsenceID, us.name, ab.reasonID, rs.name reasonName,us.locationID, lo.Name locationName,us.departmentID, de.Name departmentName,
CONCAT(date_format(ab.startdate,'%m-%d-%Y'), ' - ',COALESCE(date_format(ab.enddate,'%m-%d-%Y'),'')) AS dateOfAbsence, ab.isCurrent
from users us inner join absences ab on us.email = ab.email
inner join reasons rs on ab.reasonid = rs.reasonid
left join locations lo on us.locationid = lo.locationid
left join departments de on us.departmentid = de.departmentid
where 
ab.CompanyID = CompanyIDIn
and (ab.email =EmailIn or EmailIn is null or IsAdminIn =1)
and (us.locationid = LocationIDIn or LocationIDIn is null or IsAdminIn =1)
and (us.departmentid = DepartmentIDIn or DepartmentIDIn is null or IsAdminIn =1 )
and (ab.reasonid = ReasonIDin or ReasonIDin is null or IsAdminIn =1)
and (ab.iscurrent = IsAbsentIn or IsAbsentIn is null or IsAdminIn =1)
and us.isactive=1 and ab.isactive=1;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertJWtToken` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE   PROCEDURE `InsertJWtToken`(In TokenIn varchar(1000), in RefreshTokenIn varchar(1000),In UserIDIn int, TokenDataIn json )
BEGIN               
             
if (select count(*) from jwttokens where UserID=UserIDIn and IsActive=1) >0 then  
update jwttokens set Token = TokenIn, RefreshToken =  RefreshTokenIn, ModifiedAt= current_timestamp  where UserID=UserIDIn and IsActive=1   ; 
 else
 insert into jwttokens (Token, RefreshToken,UserID,TokenData) values
 (TokenIn, RefreshTokenIn,UserIDIn,TokenDataIn);
  end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertorUpdateAbsence` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE   PROCEDURE `InsertorUpdateAbsence`(In AbsenceIDIn int,In CompanyIDIn int, In EmailIn varchar(8000), in StartDateIn date,In EndDateIn Date,in ReasonIDin int,in IsCurrentIn tinyint,
in IsProcessedIn tinyint,in CreatedByIn int,in NameIn text )
BEGIN      
      
    if (select count(AbsenceID) from absences where AbsenceID = AbsenceIDIn and IsActive =1) > 0 Then
 update absences set StartDate=StartDateIn,EndDate=EndDateIn,ReasonID=ReasonIDIn,
 IsCurrent=IsCurrentIn,IsProcessed=IsProcessedIn,CreatedBy =CreatedByIn
 where AbsenceID = AbsenceIDIn;
 else
  if not exists(select 1 from users where email=EmailIn and CompanyID =CompanyIDIn ) then   
 insert into users (CompanyID,Name, Email,Password,CreatedBy) values
 (CompanyIDIn,NameIn,EmailIn,'2jq4OJX7u8o=',CreatedByIn);
   end if;
   INSERT INTO absences (CompanyID, Email, StartDate, EndDate,ReasonID,IsCurrent, IsProcessed, CreatedBy) VALUES
 (CompanyIDIn,EmailIn,StartDateIn,EndDateIn,ReasonIDin,IsCurrentIn,IsProcessedIn,CreatedByIn);
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ValidateLogin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `ValidateLogin`(In UserEmailIn varchar(8000), in PasswordIn text, in CompanyIDin int )
BEGIN                
       Set @UserID=0; Set @UserName=''; Set @IsAdmin=0;   Set @CompanyID=0;
if (select count(*) from users where email = UserEmailIn and Password = PasswordIn and CompanyID=CompanyIDin and IsActive=1) >0 then            
             
select  UserID , Name, IsAdmin,CompanyID into @UserID,@UserName,@IsAdmin,@CompanyID from  users where email = UserEmailIn and Password = PasswordIn and CompanyID=CompanyIDin  Limit 1;    

  end if;
  select @UserID as 'UserID',@UserName as 'UserName',@IsAdmin as 'IsAdmin',@CompanyID as 'CompanyID';       
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-28  5:41:45
