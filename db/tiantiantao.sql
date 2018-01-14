/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : tiantiantao

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 01/13/2018 23:14:18 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `Category`
-- ----------------------------
DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category` (
  `idCategory` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '类别名称',
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `Category`
-- ----------------------------
BEGIN;
INSERT INTO `Category` VALUES ('1', 'book'), ('3', 'bag'), ('8', 'bag'), ('9', 'bag'), ('14', 'bag'), ('15', 'bag'), ('16', 'bag');
COMMIT;

-- ----------------------------
--  Table structure for `Goods`
-- ----------------------------
DROP TABLE IF EXISTS `Goods`;
CREATE TABLE `Goods` (
  `idGoods` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT '无' COMMENT '商品名称',
  `description` varchar(200) DEFAULT '无' COMMENT '商品描述',
  `price` float DEFAULT '0' COMMENT '商品价格',
  `bigImgSrc` varchar(200) DEFAULT '' COMMENT '大图src',
  `date` varchar(50) DEFAULT NULL,
  `Category_idCategory` int(10) unsigned DEFAULT NULL COMMENT '对应的商品类别id',
  `ShoppingCart_idShoppingCart` int(10) unsigned DEFAULT NULL COMMENT '所在的购物车id',
  PRIMARY KEY (`idGoods`),
  KEY `fk_Goods_Category1_idx` (`Category_idCategory`),
  KEY `fk_Goods_ShoppingCart1_idx` (`ShoppingCart_idShoppingCart`),
  CONSTRAINT `fk_Goods_Category1` FOREIGN KEY (`Category_idCategory`) REFERENCES `Category` (`idCategory`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Goods_ShoppingCart1` FOREIGN KEY (`ShoppingCart_idShoppingCart`) REFERENCES `ShoppingCart` (`idShoppingCart`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `Goods`
-- ----------------------------
BEGIN;
INSERT INTO `Goods` VALUES ('26', '28', '22', '33', '', '2017-10-10 09:20:11', '1', null), ('27', '28', '22', '33', '', '2017-10-10 09:20:11', '1', null), ('28', '2000000', '22', '33', '', '2017-10-10 09:20:11', '1', null), ('29', '2000000', '22', '33', '', '2017-10-10 09:20:11', '1', null), ('30', '2000000', '22', '33', '', '2017-10-10 09:20:11', '1', null);
COMMIT;

-- ----------------------------
--  Table structure for `OrderForm`
-- ----------------------------
DROP TABLE IF EXISTS `OrderForm`;
CREATE TABLE `OrderForm` (
  `idOrderForm` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `num` varchar(45) DEFAULT NULL COMMENT '订单号码',
  `User_idUser` int(10) unsigned DEFAULT NULL COMMENT '所属的用户id',
  `recipients` varchar(20) DEFAULT NULL COMMENT '收件人姓名',
  `address` varchar(100) DEFAULT NULL COMMENT '收件人地址',
  `phone` int(11) DEFAULT NULL COMMENT '收件人联系号码',
  `postcodes` varchar(20) DEFAULT NULL COMMENT '邮编',
  `fare` double DEFAULT NULL COMMENT '运费',
  PRIMARY KEY (`idOrderForm`),
  KEY `fk_OrderForm_User1_idx` (`User_idUser`),
  CONSTRAINT `fk_OrderForm_User1` FOREIGN KEY (`User_idUser`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `ShoppingCart`
-- ----------------------------
DROP TABLE IF EXISTS `ShoppingCart`;
CREATE TABLE `ShoppingCart` (
  `idShoppingCart` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OrderForm_idOrderForm` int(10) unsigned NOT NULL COMMENT '所在的订单id',
  PRIMARY KEY (`idShoppingCart`),
  KEY `fk_ShoppingCart_OrderForm1_idx` (`OrderForm_idOrderForm`),
  CONSTRAINT `fk_ShoppingCart_OrderForm1` FOREIGN KEY (`OrderForm_idOrderForm`) REFERENCES `OrderForm` (`idOrderForm`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `SmImgSrc`
-- ----------------------------
DROP TABLE IF EXISTS `SmImgSrc`;
CREATE TABLE `SmImgSrc` (
  `idSmImgSrc` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `src` varchar(200) DEFAULT '' COMMENT 'src',
  `base64` varchar(200) DEFAULT '' COMMENT '缩略图',
  `Goods_idGoods` int(10) unsigned DEFAULT NULL COMMENT '对应的商品id',
  PRIMARY KEY (`idSmImgSrc`),
  KEY `fk_SmImgSrc_Goods_idx` (`Goods_idGoods`),
  CONSTRAINT `fk_SmImgSrc_Goods` FOREIGN KEY (`Goods_idGoods`) REFERENCES `Goods` (`idGoods`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `User`
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `idUser` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户表',
  `account` varchar(11) DEFAULT NULL COMMENT '账号 - 默认手机号码',
  `password` varchar(20) DEFAULT NULL COMMENT '密码',
  `name` varchar(45) DEFAULT NULL COMMENT '名称',
  `sex` int(1) DEFAULT NULL COMMENT '性别： 0 - 男 ； 1 - 女',
  `isVip` tinyint(4) DEFAULT '0' COMMENT '0 - 非会员; 1 - 会员\n1 - 会员',
  `ShoppingCart_idShoppingCart` int(10) unsigned DEFAULT NULL COMMENT '所拥有的购物车id',
  PRIMARY KEY (`idUser`),
  KEY `fk_User_ShoppingCart1_idx` (`ShoppingCart_idShoppingCart`),
  CONSTRAINT `fk_User_ShoppingCart1` FOREIGN KEY (`ShoppingCart_idShoppingCart`) REFERENCES `ShoppingCart` (`idShoppingCart`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `User`
-- ----------------------------
BEGIN;
INSERT INTO `User` VALUES ('1', 'admin', 'admin', '管理员', '0', '1', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
