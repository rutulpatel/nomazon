CREATE SCHEMA `nomazon` ;


CREATE TABLE `nomazon`.`products` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(250) NOT NULL,
  `department_name` VARCHAR(150) NOT NULL,
  `price` FLOAT NOT NULL,
  `stock_quantity` INT(11) UNSIGNED NOT NULL ,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `item_id_UNIQUE` (`item_id` ASC));


INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('1', 'Tennis Racket', 'Sports', '20', '25');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('2', 'Granola Bars', 'Food', '2.5', '500');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('3', 'Water bottle case', 'Food', '4', '20');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('4', 'Coffee ', 'Food', '11', '110');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('5', 'Advil', 'Pharmacy', '8', '800');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('6', 'Sunscreen', 'Pharmacy', '15', '90');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('7', 'TV', 'Electronics', '550', '14');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('8', 'iPhone', 'Electronics', '1000', '50');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('9', 'Pens', 'Office', '1', '6000');
INSERT INTO `nomazon`.`products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('10', 'Table', 'Outdoor', '50', '48');