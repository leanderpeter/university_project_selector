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
-- Table `electivApp`.`projekte_ausstehend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`projekte_ausstehend` (
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
  `anzahlTeilnehmer` VARCHAR(128) DEFAULT NULL,
  `teilnehmerListe` VARCHAR(128) DEFAULT NULL,
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
  `dozent` INT DEFAULT NULL,
  `aktueller_zustand` VARCHAR DEFAULT NULL,
  `halbjahr` INT DEFAULT NULL,
  `art` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_projekte_personen1_idx` (`dozent` ASC) VISIBLE,
  INDEX `fk_projekte_zustaende1_idx` (`aktueller_zustand` ASC) VISIBLE,
  INDEX `fk_projekte_semester1_idx` (`halbjahr` ASC) VISIBLE,
  INDEX `fk_projekte_projektarten1_idx` (`art` ASC) VISIBLE,
  CONSTRAINT `fk_projekte_personen1`
    FOREIGN KEY (`dozent`)
    REFERENCES `electivApp`.`personen` (`id`),  
CONSTRAINT `fk_projekte_zustaende1`
    FOREIGN KEY (`aktueller_zustand`)
    REFERENCES `electivApp`.`zustaende` (`id`),
  CONSTRAINT `fk_projekte_semester1`
    FOREIGN KEY (`halbjahr`)
    REFERENCES `electivApp`.`semester` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_projekte_projektarten1`
    FOREIGN KEY (`art`)
    REFERENCES `electivApp`.`projektarten` (`id`)
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
-- Table `electivApp`.`Zustand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`zustaende` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `electivApp`.`semester`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivApp`.`semester` (
  `id` INT NOT NULL,
  `name` VARCHAR(6) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;#

-- -----------------------------------------------------
-- Table `electivApp`.`projektarten`
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
INSERT INTO `projekte` VALUES (1232,'Sofware for Monkeys', 30, 'Die Ziele von Software-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Peter Thies','hft',1,0,0,'bla',0,'S003','deutsch', 1,1, NULL,NULL), (3,'Marketing for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 2,1, NULL,NULL),(4,'Programmieren for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, 2, NULL,NULL),(5,'BWL for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, 2, NULL,NULL),(6,'Rechnungswesen for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, 2, NULL,NULL),(7,'UX for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, 4, NULL,NULL),(8,'Datenbanken for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, 8, NULL,NULL),(9,'Web Technologie for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, 16, NULL,NULL),(10,'Datenschutz for Monkeys', 30, 'Die Ziele von Marketing-Engineering sind die Reduktion der Problemkomplexität.','Prof. Dr. Hansa Wurst','hft',1,0,0,'bla',0,'S003','deutsch', 1, 32, NULL,NULL);               
/*!40000 ALTER TABLE `projekte` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `teilnahmen` WRITE;
/*!40000 ALTER TABLE `teilnahmen` DISABLE KEYS */;
INSERT INTO `electivApp`.`teilnahmen` (`id`, `lehrangebot`, `teilnehmer`,`anrechnung`, `resultat`) VALUES ('1', '1232', '1', NULL, 1);
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
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `projekte_hat_module` WRITE;
/*!40000 ALTER TABLE `projekte_hat_module` DISABLE KEYS */;
INSERT INTO `electivApp`.`projekte_hat_module` (`projekt_id`, `modul_id`) VALUES ('1232', '1');
/*!40000 ALTER TABLE `projekte_hat_module` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `zustaende` WRITE;
/*!40000 ALTER TABLE `zustaende` DISABLE KEYS */;
INSERT INTO `electivApp`.`zustaende` (`id`, `name`) VALUES (1, 'neu'),(2, 'genehmigt'),(4, 'abgelehnt'),(8, 'ausgebucht'),(16, 'in durchführung'),(32, 'bewertet');
/*!40000 ALTER TABLE `zustaende` ENABLE KEYS */;
UNLOCK TABLES;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
