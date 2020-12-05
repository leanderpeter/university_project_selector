CREATE DATABASE  IF NOT EXISTS `electivApp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `electivApp`;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Table `electivApp`.`personen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`personen` (
  `id` INT(11) NOT NULL DEFAULT '0',
  `name` VARCHAR(128) NOT NULL DEFAULT '',
  `email` VARCHAR(128) NULL DEFAULT '',
  `google_user_id` VARCHAR(128) NULL DEFAULT '',
  `rolle` INT(5) NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `electivApp`.`projekte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`projekte` (
  `id` INT(11) NOT NULL DEFAULT '0',
  `name` VARCHAR(100) NOT NULL DEFAULT '',
  `max_teilnehmer` INT(11) NOT NULL DEFAULT '30',
  `beschreibung` VARCHAR(100) NOT NULL DEFAULT '',
  `betreuer` VARCHAR(100) NOT NULL DEFAULT '',
  `externer_partner` VARCHAR(100) NULL DEFAULT '',
  `woechentlich` TINYINT(1) NULL DEFAULT NULL,
  `anzahl_block_vor` INT(11) NULL DEFAULT NULL,
  `anzahl_block_in` INT(11) NULL DEFAULT NULL,
  `praeferierte_block` VARCHAR(128) NULL DEFAULT '',
  `bes_raum` TINYINT(1) NULL DEFAULT '0',
  `raum` VARCHAR(128) NULL DEFAULT '',
  `sprache` VARCHAR(128) NULL DEFAULT '',
  `dozent` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_projekte_personen1_idx` (`dozent` ASC) VISIBLE,
  CONSTRAINT `fk_projekte_personen1`
    FOREIGN KEY (`dozent`)
    REFERENCES `electivApp`.`personen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `electivApp`.`studenten`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`studenten` (
  `id` INT(11) NOT NULL DEFAULT '0',
  `name` VARCHAR(128) NOT NULL DEFAULT '',
  `email` VARCHAR(128) NULL DEFAULT '',
  `google_user_id` VARCHAR(128) NULL DEFAULT '',
  `rolle` INT(5) NULL DEFAULT '0',
  `mat_nr` INT(10) NULL DEFAULT NULL,
  `kuerzel` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `electivapp`.`teilnahmen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`teilnahmen` (
  `id` INT(11) NOT NULL DEFAULT '0',
  `lehrangebot` INT(11) NOT NULL,
  `teilnehmer` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teilnahmen_projekte_idx` (`lehrangebot` ASC) VISIBLE,
  INDEX `fk_teilnahmen_studenten1_idx` (`teilnehmer` ASC) VISIBLE,
  CONSTRAINT `fk_teilnahmen_projekte`
    FOREIGN KEY (`lehrangebot`)
    REFERENCES `electivApp`.`projekte` (`id`),
  CONSTRAINT `fk_teilnahmen_studenten1`
    FOREIGN KEY (`teilnehmer`)
    REFERENCES `electivApp`.`studenten` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


LOCK TABLES `projekte` WRITE;
/*!40000 ALTER TABLE `projekte` DISABLE KEYS */;
INSERT INTO `projekte` VALUES (1232,'Sofware for Monkeys', 30, 'Die Ziele von Software-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Peter Thies','hft',1,0,0,'bla',0,'S003','deutsch', 1), (3,'Marketing for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 2),(4,'Programmieren for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1),(5,'BWL for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1),(6,'Rechnungswesen for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1),(7,'UX for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1),(8,'Datenbanken for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1),(9,'Web Technologie for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1),(10,'Datenschutz for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1);               
/*!40000 ALTER TABLE `projekte` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `teilnahmen` WRITE;
/*!40000 ALTER TABLE `teilnahmen` DISABLE KEYS */;
INSERT INTO `electivapp`.`teilnahmen` (`id`, `lehrangebot`, `teilnehmer`) VALUES ('1', '1232', '1');
/*!40000 ALTER TABLE `teilnahmen` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `personen` WRITE;
/*!40000 ALTER TABLE `personen` DISABLE KEYS */;
INSERT INTO `electivapp`.`personen` (`id`, `name`, `email`, `rolle`) VALUES ('1', 'Prof. Dr. Thies', 'thies@hdm.de', '1');
INSERT INTO `electivapp`.`personen` (`id`, `name`, `email`, `rolle`) VALUES ('2', 'Prof. Dr. Kunz', 'kunz@mail.de', '1');
/*!40000 ALTER TABLE `personen` ENABLE KEYS */;
UNLOCK TABLES;




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
