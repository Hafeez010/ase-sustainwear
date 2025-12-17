This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First run npm install
Then, run the development server:
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 
This is a database dump incase you would like to ensure you have data to use the website to its full potential: 
CREATE DATABASE  IF NOT EXISTS `ase_sustainwear` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ase_sustainwear`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: ase_sustainwear
-- ------------------------------------------------------
-- Server version	9.2.0

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

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('5dfd409f-4e13-496c-8b54-90dff795b374','8e59b6e4dcd5647a52035525bf6b319ba54d806cef6c7fc1c395494c69f6f6a6','2025-11-19 12:33:17.184','20251119123317_user',NULL,NULL,'2025-11-19 12:33:17.134',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distribution`
--

DROP TABLE IF EXISTS `distribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distribution` (
  `DistributionID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `InventoryID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Recipient` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Quantity` int NOT NULL,
  `Date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`DistributionID`),
  KEY `distribution_InventoryID_fkey` (`InventoryID`),
  CONSTRAINT `Distribution_InventoryID_fkey` FOREIGN KEY (`InventoryID`) REFERENCES `inventory` (`InventoryID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distribution`
--

LOCK TABLES `distribution` WRITE;
/*!40000 ALTER TABLE `distribution` DISABLE KEYS */;
INSERT INTO `distribution` VALUES ('5feac617-6e16-4589-bb7c-64419513e1e5','4a2572b1-44f0-4220-a647-404436740b83','homeless guy',1,'2025-12-01 13:17:04.517'),('ecf19151-8f19-4861-b1a5-26d154b1a940','42d3e59d-e47d-4390-815e-c3a4220fcb68','homeless guy',1,'2025-11-29 17:27:27.334');
/*!40000 ALTER TABLE `distribution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `DonationID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Condition` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `SubmittedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UserID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Quantity` int NOT NULL DEFAULT '1',
  `Status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`DonationID`),
  KEY `donation_UserID_fkey` (`UserID`),
  CONSTRAINT `Donation_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES ('09271c5f-5544-417e-ae68-765ce94776fd','Hafeez',NULL,'Hoodies','New',NULL,'2025-11-29 16:46:26.686','c6028acd-cef6-4483-aa38-171383e9406b',1,'Approved'),('1640a2cc-070c-43b4-aaea-d15ac116acda','Hafeez',NULL,'Cardigans','New','Size: Large\nStill has tags','2025-11-29 14:11:45.839','c6028acd-cef6-4483-aa38-171383e9406b',1,'Declined'),('24757b86-0b72-4e6c-bc2d-18bfaec5328a','Hafeez',NULL,'Jeans','New',NULL,'2025-11-29 17:11:22.374','c6028acd-cef6-4483-aa38-171383e9406b',1,'Pending'),('2bcbc271-7586-4d7b-97dd-fb740efd4646','Hafeez',NULL,'T-Shirts','New','Size Large, Brand new','2025-11-24 18:56:37.092',NULL,1,'Declined'),('496d2669-0494-49b4-b626-b5c659bd5b6b','Hafeez',NULL,'Jumpers','Good','Size Large','2025-11-26 12:43:45.054','c6028acd-cef6-4483-aa38-171383e9406b',1,'Approved'),('87bccae8-bc3c-4345-87af-209710322189','m a','07342448693','Shorts','Used','Second hand with stains','2025-12-16 14:22:15.038','c6028acd-cef6-4483-aa38-171383e9406b',1,'Pending'),('b9b1c7c7-5e11-44bc-b993-58f21ed25dc3','Hafeez',NULL,'Sportswear','Good',NULL,'2025-11-29 17:23:51.144','c6028acd-cef6-4483-aa38-171383e9406b',1,'Approved'),('e2adafd5-b675-4d34-8e8d-436c51631f25','Hafeez',NULL,'Shorts','Used','large ','2025-11-29 17:28:30.676','c6028acd-cef6-4483-aa38-171383e9406b',1,'Approved');
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `InventoryID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Condition` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Quantity` int NOT NULL DEFAULT '1',
  `Status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Available',
  `SourceDonationID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`InventoryID`),
  KEY `inventory_SourceDonationID_fkey` (`SourceDonationID`),
  CONSTRAINT `Inventory_SourceDonationID_fkey` FOREIGN KEY (`SourceDonationID`) REFERENCES `donation` (`DonationID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES ('42d3e59d-e47d-4390-815e-c3a4220fcb68','Cardigans','New',0,'Out of Stock','1640a2cc-070c-43b4-aaea-d15ac116acda'),('4a2572b1-44f0-4220-a647-404436740b83','Cardigans','New',0,'Out of Stock','1640a2cc-070c-43b4-aaea-d15ac116acda'),('4a88e20b-ea32-4222-9fb1-16d9e0dec818','Cardigans','New',1,'Available','1640a2cc-070c-43b4-aaea-d15ac116acda'),('a50f8f91-5a25-45a0-a49a-1cebeaf7b806','Cardigans','New',1,'Available','1640a2cc-070c-43b4-aaea-d15ac116acda'),('e267ecc6-73fe-4376-a6b1-80f6a6707692','Hoodies','New',1,'Available','09271c5f-5544-417e-ae68-765ce94776fd'),('e4969588-5688-4b66-8b2c-107fa2a90f15','Shorts','Used',1,'Available','e2adafd5-b675-4d34-8e8d-436c51631f25'),('fbd6e8e6-ad58-4d09-96df-4ad93acffdca','Sportswear','Good',1,'Available','b9b1c7c7-5e11-44bc-b993-58f21ed25dc3'),('ff44216e-b3d3-4226-ad3c-d8398923e64e','Cardigans','New',1,'Available','1640a2cc-070c-43b4-aaea-d15ac116acda');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemlog`
--

DROP TABLE IF EXISTS `systemlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `systemlog` (
  `LogID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Timestamp` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`LogID`),
  KEY `SystemLog_UserID_fkey` (`UserID`),
  CONSTRAINT `SystemLog_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemlog`
--

LOCK TABLES `systemlog` WRITE;
/*!40000 ALTER TABLE `systemlog` DISABLE KEYS */;
INSERT INTO `systemlog` VALUES ('4da4365d-9811-44e3-a27a-ef5524f727e9','c6028acd-cef6-4483-aa38-171383e9406b','Submitted donation (Shorts) x1','Success','2025-12-16 14:22:15.004');
/*!40000 ALTER TABLE `systemlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `FirstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `LastName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfBirth` date NOT NULL,
  `Username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `unique_Username` (`Username`),
  KEY `index_Username` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('44953eee-8dab-415b-9060-b42cdaa44254','Hafeez','Ahmed','2005-09-15','affy','$2b$12$FGD/XcQ0LWV.rWDI7K16LumhahZly487TsW6YPOlnUKi/jXUnrgO.','charity_staff'),('7b9d833b-8412-41e0-b5fb-672d51d6e39a','hafeez','ahm','2005-09-15','haf','$2b$12$cL/U3owtH1oyRdFMJY6k5.OSbCWc5lxDOwVW6WSyxnnxSS2U069FO','admin'),('c6028acd-cef6-4483-aa38-171383e9406b','m','a','1995-07-20','m','$2b$12$syf/mPINYfN42/Tv3RuDQOlZGeL26xTluMRhRppOwiTnZrdUMGl4W','user'),('ece9108a-482e-4040-aa09-4d4773efd85b','esting','gnitse','2000-06-02','esting','$2b$12$YsM4x6oNoE6xORbGMIHiXO/prhVWhDmVv/7FT5xYGQAO3uyBqMXW6','admin'),('f74a8359-0c3c-4772-8fb2-4cbc28962a18','testingg','testingg','2006-08-17','testingg','$2b$12$0fHol49k46B3S2QfdtnTluq3O7TMD3SG/0z/PJJW6xvIZFjJDmztS','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 14:24:27
