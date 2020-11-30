CREATE DATABASE  IF NOT EXISTS `electivApp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `electivApp`;

-- mysql dump 1 created on Ubuntu 18.04 on 22.11.2020

-- Host 127.0.0.1        Database: electivApp

-- ------------------------------------------------------------------

--
-- Table-Struktur für table 'Personen'
-- 

DROP TABLE IF EXISTS `personen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personen` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  `google_user_id` varchar(128) NOT NULL DEFAULT '',
  `rolle` int(1) NOT NULL DEFAULT '0',
  `mat_nr` int(10) DEFAULT NULL,
  `kuerzel` varchar(128) NOT NULL DEFAULT '',
  `veranstaltung` varchar(128) NOT NULL DEFAULT '',
  `partizipation` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table-Struktur für table `projekte`
--

DROP TABLE IF EXISTS `projekte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projekte` (
  `id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(100) NOT NULL DEFAULT '',
  `beschreibung` varchar(100) NOT NULL DEFAULT '',
  `betreuer` varchar(100) NOT NULL DEFAULT '',
  `externer_partner` varchar(100) NOT NULL DEFAULT '',
  `woechentlich` BOOLEAN DEFAULT NULL,
  `anzahl_block_vor` int(10) DEFAULT NULL, 
  `anzahl_block_in` int(10) DEFAULT NULL, 
  `praeferierte_block` varchar(128) NOT NULL DEFAULT '',
  `bes_raum` BOOLEAN DEFAULT 0,
  `raum` varchar(128) NOT NULL DEFAULT '',
  `sprache` varchar(128) NOT NULL DEFAULT '',
  `moduloption` int(20) DEFAULT NULL,
  `dozent` int(20) DEFAULT NULL,
  `teilnahmen` int(20) DEFAULT NULL,
  `halbjahr` varchar(10) NOT NULL DEFAULT '',
  `art` varchar(128) NOT NULL DEFAULT '',
  `aktueller_zustand` varchar(128) NOT NULL DEFAULT '',

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table-Struktur für table `teilnahmen`
--

DROP TABLE IF EXISTS `teilnahmen`;
CREATE TABLE `teilnahmen` (
  `id` int(11) NOT NULL DEFAULT '0',
  `lehrangebot` int(20) DEFAULT NULL,
  `anrechnung` int(20) DEFAULT NULL,
  `teilnehmer` int(20) DEFAULT NULL,
  `resultat` int(20) DEFAULT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projekte` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
--INSERT INTO `projekte` VALUES (1,'','Die Ziele von Software-Engineering sind die Reduktion der Problemkomplexität, um dies zu bewerkstelligen werden die Prinzipien (beispielsweise die Abstraktion und Modularisierung, Methoden (Softwareentwurfsmethoden) und Werkzeugen (Softwareentwicklungsumgebungen (SEU), CASE) bereitgestellt.','Prof. Dr. Peter Thies','13.02.2021', 50),(10000,' ','Internal');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;