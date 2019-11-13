USE ana2;

CREATE TABLE Usu(
    id_usu INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    pass VARCHAR(20) NOT NULL,
    UNIQUE(nombre)
);

CREATE TABLE Tweet(
    id_tweet INT PRIMARY KEY AUTO_INCREMENT,
    id_usu INT NOT NULL,
    texto VARCHAR(250) NOT NULL,
    FOREIGN KEY (id_usu) REFERENCES Usu(id_usu)
);

INSERT INTO Usu(nombre,pass) VALUES ("daniel","asd");
INSERT INTO Usu(nombre,pass) VALUES ("jorge","asd");
INSERT INTO Usu(nombre,pass) VALUES ("byron","asd");

INSERT INTO Tweet(id_usu,texto) VALUES (1, "Hola mundo!!!!");
INSERT INTO Tweet(id_usu,texto) VALUES (1, "Adios mundo cruel!!!");
INSERT INTO Tweet(id_usu,texto) VALUES (2, "Calmado chavo");