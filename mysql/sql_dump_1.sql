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
  `id` INT NOT NULL DEFAULT '0',
  `name` VARCHAR(100) NOT NULL DEFAULT '',
  `max_teilnehmer` INT NOT NULL DEFAULT '30',
  `beschreibung` VARCHAR(100) NOT NULL DEFAULT '',
  `betreuer` VARCHAR(100) NOT NULL DEFAULT '',
  `externer_partner` VARCHAR(100) NULL DEFAULT '',
  `woechentlich` TINYINT(1) NULL DEFAULT NULL,
  `anzahl_block_vor` INT NULL DEFAULT NULL,
  `anzahl_block_in` INT NULL DEFAULT NULL,
  `praeferierte_block` VARCHAR(128) NULL DEFAULT '',
  `bes_raum` TINYINT(1) NULL DEFAULT '0',
  `raum` VARCHAR(128) NULL DEFAULT '',
  `sprache` VARCHAR(128) NULL DEFAULT '',
  `dozent` INT NULL DEFAULT NULL,
  `aktueller_zustand` VARCHAR(128) NULL DEFAULT NULL,
  `halbjahr` INT NULL DEFAULT NULL,
  `art` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_projekte_personen1_idx` (`dozent` ASC) VISIBLE,
  INDEX `fk_projekte_semester1_idx` (`halbjahr` ASC) VISIBLE,
  INDEX `fk_projekte_projektarten1_idx` (`art` ASC) VISIBLE,
  CONSTRAINT `fk_projekte_personen1`
    FOREIGN KEY (`dozent`)
    REFERENCES `electivApp`.`personen` (`id`),
  CONSTRAINT `fk_projekte_projektarten1`
    FOREIGN KEY (`art`)
    REFERENCES `electivApp`.`projektarten` (`id`),
  CONSTRAINT `fk_projekte_semester1`
    FOREIGN KEY (`halbjahr`)
    REFERENCES `electivApp`.`semester` (`id`))
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
-- Table `electivApp`.`teilnahmen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`teilnahmen` (
  `id` INT(11) NOT NULL DEFAULT '0',
  `lehrangebot` INT(11) NOT NULL,
  `teilnehmer` INT(11) NOT NULL,
  `anrechnung` INT DEFAULT NULL,
  `resultat` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teilnahmen_projekte_idx` (`lehrangebot` ASC) VISIBLE,
  INDEX `fk_teilnahmen_studenten1_idx` (`teilnehmer` ASC) VISIBLE,
  INDEX `fk_teilnahmen_module1_idx` (`anrechnung` ASC) VISIBLE,
  INDEX `fk_teilnahmen_bewertungen1_idx` (`resultat` ASC) VISIBLE,
  CONSTRAINT `fk_teilnahmen_projekte`
    FOREIGN KEY (`lehrangebot`)
    REFERENCES `electivApp`.`projekte` (`id`),
  CONSTRAINT `fk_teilnahmen_studenten1`
    FOREIGN KEY (`teilnehmer`)
    REFERENCES `electivApp`.`studenten` (`id`),
  CONSTRAINT `fk_teilnahmen_module1`
    FOREIGN KEY (`anrechnung`)
    REFERENCES `electivApp`.`module` (`id`),
  CONSTRAINT `fk_teilnahmen_bewertungen1`
    FOREIGN KEY (`resultat`)
    REFERENCES `electivApp`.`bewertungen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `electivApp`.`semester`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`semester` (
  `id` INT NOT NULL,
  `name` VARCHAR(7) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;#

-- -----------------------------------------------------
-- Table `electivapp`.`projektarten`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`projektarten` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `ects` INT NULL,
  `sws` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `electivApp`.`bewertungen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`bewertungen` (
  `id` INT NOT NULL,
  `note` DECIMAL(2,1) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `electivApp`.`module`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`module` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `edv_nr` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `electivApp`.`projekte_hat_module`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`projekte_hat_module` (
  `projekt_id` INT(11) NOT NULL,
  `modul_id` INT NOT NULL,
  PRIMARY KEY (`projekt_id`, `modul_id`),
  INDEX `fk_projekte_has_module_module1_idx` (`modul_id` ASC) VISIBLE,
  INDEX `fk_projekte_has_module_projekte1_idx` (`projekt_id` ASC) VISIBLE,
  CONSTRAINT `fk_projekte_hat_module_projekte1`
    FOREIGN KEY (`projekt_id`)
    REFERENCES `electivApp`.`projekte` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_projekte_hat_module_module1`
    FOREIGN KEY (`modul_id`)
    REFERENCES `electivApp`.`module` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


LOCK TABLES `projekte` WRITE;
/*!40000 ALTER TABLE `projekte` DISABLE KEYS */;
INSERT INTO `projekte` VALUES (1232,'Sofware for Monkeys', 30, 'Die Ziele von Software-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Peter Thies','hft',1,0,0,'bla',0,'S003','deutsch', 1,NULL, 2,NULL), 
(3,'Marketing for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 2,NULL, 3,NULL),
(4,'Programmieren for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, NULL, 2,NULL),
(5,'BWL for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, NULL, 3,NULL),
(6,'Rechnungswesen for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, NULL, 2,NULL),
(7,'UX for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, NULL, 3,NULL),
(8,'Datenbanken for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, NULL, 2,NULL),
(9,'Web Technologie for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, NULL, 3,NULL),
(10,'Datenschutz for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, NULL, 2,NULL);               
/*!40000 ALTER TABLE `projekte` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `teilnahmen` WRITE;
/*!40000 ALTER TABLE `teilnahmen` DISABLE KEYS */;
INSERT INTO `electivApp`.`teilnahmen` (`id`, `lehrangebot`, `teilnehmer`,`anrechnung`, `resultat`) VALUES ('1', '1232', '1', '1', '1');
INSERT INTO `electivapp`.`teilnahmen` (`id`, `lehrangebot`, `teilnehmer`, `anrechnung`, `resultat`) VALUES ('2', '1232', '1', '1', '1');
INSERT INTO `electivapp`.`teilnahmen` (`id`, `lehrangebot`, `teilnehmer`, `anrechnung`, `resultat`) VALUES ('3', '1232', '1', '1', '2');

/*!40000 ALTER TABLE `teilnahmen` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `personen` WRITE;
/*!40000 ALTER TABLE `personen` DISABLE KEYS */;
INSERT INTO `electivApp`.`personen` (`id`, `name`, `email`, `rolle`) VALUES ('1', 'Prof. Dr. Thies', 'thies@hdm.de', '1');
INSERT INTO `electivApp`.`personen` (`id`, `name`, `email`, `rolle`) VALUES ('2', 'Prof. Dr. Kunz', 'kunz@mail.de', '1');
/*!40000 ALTER TABLE `personen` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `bewertungen` WRITE;
/*!40000 ALTER TABLE `bewertungen` DISABLE KEYS */;
INSERT INTO `electivApp`.`bewertungen` (`id`, `note`) VALUES ('1', '1.3');
INSERT INTO `electivApp`.`bewertungen` (`id`, `note`) VALUES ('2', '3.0');
/*!40000 ALTER TABLE `bewertungen` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `electivApp`.`module` (`id`, `name`, `edv_nr`) VALUES ('1', 'SW Projekt', '338079');
INSERT INTO `electivapp`.`module` (`id`, `name`, `edv_nr`) VALUES ('2', 'Interdisziplinäres Projekt', '387662');
INSERT INTO `electivapp`.`module` (`id`, `name`, `edv_nr`) VALUES ('3', 'HansWurst Modult', '481907');
INSERT INTO `electivapp`.`module` (`id`, `name`, `edv_nr`) VALUES ('4', 'Affen Modul', '331341');
INSERT INTO `electivapp`.`module` (`id`, `name`, `edv_nr`) VALUES ('5', 'Marketing', '333312');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `projekte_hat_module` WRITE;
/*!40000 ALTER TABLE `projekte_hat_module` DISABLE KEYS */;
INSERT INTO `electivApp`.`projekte_hat_module` (`projekt_id`, `modul_id`) VALUES ('1232', '1');
/*!40000 ALTER TABLE `projekte_hat_module` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('1', 'SS19');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('2', 'WS19/20');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('3', 'SS20');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('4', 'WS20/21');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('5', 'SS21');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('6', 'WS21/22');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('7', 'SS22');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('8', 'WS22/23');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('9', 'SS23');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('10', 'WS23/24');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('11', 'SS24');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('12', 'WS24/25');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('13', 'SS25');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('14', 'WS25/26');
INSERT INTO `electivapp`.`semester` (`id`, `name`) VALUES ('15', 'SS26');
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
