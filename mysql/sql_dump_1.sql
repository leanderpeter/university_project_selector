CREATE DATABASE  IF NOT EXISTS `electivapp` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `electivapp`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: electivapp
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `bewertungen`
--

DROP TABLE IF EXISTS `bewertungen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bewertungen` (
  `id` int NOT NULL,
  `note` decimal(2,1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bewertungen`
--

LOCK TABLES `bewertungen` WRITE;
/*!40000 ALTER TABLE `bewertungen` DISABLE KEYS */;
INSERT INTO `bewertungen` VALUES (1,1.0),(2,1.7),(3,2.0),(4,3.0),(5,4.0),(6,5.0);
/*!40000 ALTER TABLE `bewertungen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `edv_nr` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'SW Projekt',338079),(2,'Interdisziplinäres Projekt',387662),(3,'HansWurst Modult',481907),(4,'Affen Modul',331341),(5,'Marketing',333312);
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personen`
--

DROP TABLE IF EXISTS `personen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personen` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(128) DEFAULT '',
  `google_user_id` varchar(128) DEFAULT '',
  `rolle` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personen`
--

LOCK TABLES `personen` WRITE;
/*!40000 ALTER TABLE `personen` DISABLE KEYS */;
INSERT INTO `personen` VALUES (1,'Prof. Dr. Thies','thies@hdm.de','','Dozent'),(2,'Prof. Dr. Kunz','kunz@mail.de','','Dozent'),(3,'lhljln','giengerpascal30@gmail.com','yL06YecixZbWL63by89xQweXzc33','Dozent');
/*!40000 ALTER TABLE `personen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projektarten`
--

DROP TABLE IF EXISTS `projektarten`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projektarten` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `ects` int DEFAULT NULL,
  `sws` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projektarten`
--

LOCK TABLES `projektarten` WRITE;
/*!40000 ALTER TABLE `projektarten` DISABLE KEYS */;
INSERT INTO `projektarten` VALUES (1,'Fachspezifisches Projek',5,3),(2,'Interdisziplinäres Projekt',10,5),(3,'Transdisziplinäres Projekt',20,10);
/*!40000 ALTER TABLE `projektarten` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projekte`
--

DROP TABLE IF EXISTS `projekte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projekte` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(100) NOT NULL DEFAULT '',
  `max_teilnehmer` int NOT NULL DEFAULT '30',
  `beschreibung` varchar(100) NOT NULL DEFAULT '',
  `betreuer` varchar(100) NOT NULL DEFAULT '',
  `externer_partner` varchar(100) DEFAULT '',
  `woechentlich` tinyint(1) DEFAULT NULL,
  `anzahl_block_vor` int DEFAULT NULL,
  `anzahl_block_in` int DEFAULT NULL,
  `praeferierte_block` varchar(128) DEFAULT '',
  `bes_raum` tinyint(1) DEFAULT '0',
  `raum` varchar(128) DEFAULT '',
  `sprache` varchar(128) DEFAULT '',
  `dozent` int DEFAULT NULL,
  `aktueller_zustand` varchar(128) DEFAULT NULL,
  `halbjahr` int DEFAULT NULL,
  `art` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_projekte_personen1_idx` (`dozent`),
  KEY `fk_projekte_semester1_idx` (`halbjahr`),
  KEY `fk_projekte_projektarten1_idx` (`art`),
  CONSTRAINT `fk_projekte_personen1` FOREIGN KEY (`dozent`) REFERENCES `personen` (`id`),
  CONSTRAINT `fk_projekte_projektarten1` FOREIGN KEY (`art`) REFERENCES `projektarten` (`id`),
  CONSTRAINT `fk_projekte_semester1` FOREIGN KEY (`halbjahr`) REFERENCES `semester` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekte`
--

LOCK TABLES `projekte` WRITE;
/*!40000 ALTER TABLE `projekte` DISABLE KEYS */;
INSERT INTO `projekte` VALUES (3,'Marketing for Monkeys',30,'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch',2,'Genehmigt',3,2),(4,'Programmieren for Monkeys',30,'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch',1,'Genehmigt',2,3),(5,'BWL for Monkeys',30,'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch',1,'Genehmigt',3,1),(6,'Rechnungswesen for Monkeys',30,'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch',1,'Genehmigt',2,2),(7,'UX for Monkeys',30,'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch',1,'Genehmigt',3,3),(8,'Datenbanken for Monkeys',30,'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch',1,'Genehmigt',2,1),(9,'Web Technologie for Monkeys',30,'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch',1,'Genehmigt',3,2),(10,'Datenschutz for Monkeys',30,'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch',1,'Neu',2,3),(1232,'Sofware for Monkeys',30,'Die Ziele von Software-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Peter Thies','hft',1,0,0,'bla',0,'S003','deutsch',3,'in Bewertung',2,1);
/*!40000 ALTER TABLE `projekte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projekte_hat_module`
--

DROP TABLE IF EXISTS `projekte_hat_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projekte_hat_module` (
  `projekt_id` int NOT NULL,
  `modul_id` int NOT NULL,
  PRIMARY KEY (`projekt_id`,`modul_id`),
  KEY `fk_projekte_has_module_module1_idx` (`modul_id`),
  KEY `fk_projekte_has_module_projekte1_idx` (`projekt_id`),
  CONSTRAINT `fk_projekte_hat_module_module1` FOREIGN KEY (`modul_id`) REFERENCES `module` (`id`),
  CONSTRAINT `fk_projekte_hat_module_projekte1` FOREIGN KEY (`projekt_id`) REFERENCES `projekte` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekte_hat_module`
--

LOCK TABLES `projekte_hat_module` WRITE;
/*!40000 ALTER TABLE `projekte_hat_module` DISABLE KEYS */;
INSERT INTO `projekte_hat_module` VALUES (1232,1);
/*!40000 ALTER TABLE `projekte_hat_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester` (
  `id` int NOT NULL,
  `name` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `semester` VALUES (1,'SS19'),(2,'WS19/20'),(3,'SS20'),(4,'WS20/21'),(5,'SS21'),(6,'WS21/22'),(7,'SS22'),(8,'WS22/23'),(9,'SS23'),(10,'WS23/24'),(11,'SS24'),(12,'WS24/25'),(13,'SS25'),(14,'WS25/26'),(15,'SS26');
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studenten`
--

DROP TABLE IF EXISTS `studenten`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studenten` (
  `id` int NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(128) DEFAULT '',
  `google_user_id` varchar(128) DEFAULT '',
  `rolle` varchar(128) NOT NULL,
  `mat_nr` int DEFAULT NULL,
  `kuerzel` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studenten`
--

LOCK TABLES `studenten` WRITE;
/*!40000 ALTER TABLE `studenten` DISABLE KEYS */;
INSERT INTO `studenten` VALUES (1,'Hans Peter','','','Student',38371,NULL),(2,'Peter Zwegat','','','Student',38672,NULL),(3,'Thomas Müller','','','Student',35215,NULL),(4,'Raphael Schmidt','','','Student',31313,NULL),(5,'Hannah Heinrich','','','Student',38761,NULL),(6,'Sara Sonnenberg','','','Student',37777,NULL),(7,'Maria Kuhn','','','Student',38765,NULL),(8,'Lena Rüdiger','','','Student',38616,NULL),(9,'Natascha Ivanov','','','Student',33333,NULL),(10,'Magdalena Seeberger','','','Student',38471,NULL);
/*!40000 ALTER TABLE `studenten` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teilnahmen`
--

DROP TABLE IF EXISTS `teilnahmen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teilnahmen` (
  `id` int NOT NULL DEFAULT '0',
  `lehrangebot` int NOT NULL,
  `teilnehmer` int NOT NULL,
  `anrechnung` int DEFAULT NULL,
  `resultat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_teilnahmen_projekte_idx` (`lehrangebot`),
  KEY `fk_teilnahmen_studenten1_idx` (`teilnehmer`),
  KEY `fk_teilnahmen_module1_idx` (`anrechnung`),
  KEY `fk_teilnahmen_bewertungen1_idx` (`resultat`),
  CONSTRAINT `fk_teilnahmen_bewertungen1` FOREIGN KEY (`resultat`) REFERENCES `bewertungen` (`id`),
  CONSTRAINT `fk_teilnahmen_module1` FOREIGN KEY (`anrechnung`) REFERENCES `module` (`id`),
  CONSTRAINT `fk_teilnahmen_projekte` FOREIGN KEY (`lehrangebot`) REFERENCES `projekte` (`id`),
  CONSTRAINT `fk_teilnahmen_studenten1` FOREIGN KEY (`teilnehmer`) REFERENCES `studenten` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teilnahmen`
--

LOCK TABLES `teilnahmen` WRITE;
/*!40000 ALTER TABLE `teilnahmen` DISABLE KEYS */;
INSERT INTO `teilnahmen` VALUES (1,1232,1,1,1),(2,1232,1,1,1),(3,1232,1,1,2);
/*!40000 ALTER TABLE `teilnahmen` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-30 18:23:02
