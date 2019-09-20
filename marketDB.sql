DROP DATABASE IF EXISTS marketdb;
CREATE database marketdb;

USE marketdb;

CREATE TABLE inventory (
  id INT NOT NULL auto_increment,
  item VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  stock INT(11) default 5,
  price DECIMAL(11,3),
  PRIMARY KEY (id)
);

INSERT INTO inventory (item, department, stock, price)
VALUES ("Uruk-Hai Scimitar", "Weapons", 9, 249.99);

INSERT INTO inventory (item, department, stock, price)
VALUES ("Grond", "Weapons", 1, 999.99);

INSERT INTO inventory (item, department, stock, price)
VALUES ("Sauron's Armor", "Armor", 5, 499.99);

INSERT INTO inventory (item, department, stock, price)
VALUES ("Helm of Sauron", "Armor", 5, 499.99);

INSERT INTO inventory (item, department, stock, price)
VALUES ("The One Ring", "Rings of Old", 1, 1000.00);