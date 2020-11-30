CREATE DATABASE  IF NOT EXISTS `electivApp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `electivApp`;


SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Table `electivapp`.`personen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivapp`.`personen` (
  `id` INT NOT NULL DEFAULT '0',
  `name` VARCHAR(128) NOT NULL DEFAULT '',
  `google_user_id` VARCHAR(128) NOT NULL DEFAULT '',
  `rolle` INT NOT NULL DEFAULT '0',
  `mat_nr` INT NULL DEFAULT NULL,
  `kuerzel` VARCHAR(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `electivapp`.`projekte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivapp`.`projekte` (
  `id` INT NOT NULL DEFAULT '0',
  `name` VARCHAR(100) NOT NULL DEFAULT '',
  `max_teilnehmer` INT NOT NULL DEFAULT '30',
  `beschreibung` VARCHAR(100) NOT NULL DEFAULT '',
  `betreuer` VARCHAR(100) NOT NULL DEFAULT '',
  `externer_partner` VARCHAR(100) NOT NULL DEFAULT '',
  `woechentlich` TINYINT(1) NULL DEFAULT NULL,
  `anzahl_block_vor` INT NULL DEFAULT NULL,
  `anzahl_block_in` INT NULL DEFAULT NULL,
  `praeferierte_block` VARCHAR(128) NOT NULL DEFAULT '',
  `bes_raum` TINYINT(1) NULL DEFAULT '0',
  `raum` VARCHAR(128) NOT NULL DEFAULT '',
  `sprache` VARCHAR(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `electivapp`.`teilnahmen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electivapp`.`teilnahmen` (
  `id` INT NOT NULL DEFAULT '0',
  `lehrangebot` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teilnahmen_projekte_idx` (`lehrangebot` ASC) VISIBLE,
  CONSTRAINT `fk_teilnahmen_projekte`
    FOREIGN KEY (`lehrangebot`)
    REFERENCES `electivapp`.`projekte` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
