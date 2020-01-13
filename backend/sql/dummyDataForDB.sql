use busticketsdb;
INSERT INTO location  VALUE (1,"Beograd","11000",0);
INSERT INTO location  VALUE (2,"Smederevo","11300",0);
INSERT INTO location  VALUE (3,"Kragujevac","34000",0);
INSERT INTO location  VALUE (4,"Krucevac","37000",0);

INSERT INTO bus_station VALUE (1,"BAS- BEOGRAD","Zeleznicka 4","+381264622 245","","24/7",1234,-413,0,1);
INSERT INTO bus_station VALUE (2,"AS- Smederevo","Omladinska 4","+381 11 2636 299","bas.rs","24/7",12354,-4313,0,2);
INSERT INTO bus_station VALUE (3,"AS - KRAGUJEVAC","Sumadijska 8","+381 34 354 659 +381 34 354 660","","24/7",12334,-413,0,3);

INSERT INTO carrier VALUE (1,"Lasta","1315151","Autoput Beograd - Nis 4","0800 334 334 +381 11 334 8555","office@lasta.rs","www.lasta.rs","/",0,1);
INSERT INTO carrier VALUE (2,"Strela","68489654","Belopoljska 6","+381 (0)62 277 244","","","/",0,1);
INSERT INTO carrier VALUE (3,"Jugoprevoz","5164554","Jug Bogdanova bb","+381 37 421 555","adjugoprevozks@gmail.com","www.jugoprevozks.co.rs","/",0,4);


INSERT INTO vehicle VALUE (1,"BG 123-ad","Milos Milicevic",0,1);
INSERT INTO vehicle VALUE (2,"BG 312-af","Nikola Nin",0,1);
INSERT INTO vehicle VALUE (3,"BG 785-kj","Lazar Lazic",0,1);

INSERT INTO seats VALUE (1,1,0,1);
INSERT INTO seats VALUE (2,2,0,1);
INSERT INTO seats VALUE (3,3,0,1);
INSERT INTO seats VALUE (4,4,0,1);
INSERT INTO seats VALUE (5,5,0,1);
INSERT INTO seats VALUE (6,6,0,1);
INSERT INTO seats VALUE (7,7,0,1);
INSERT INTO seats VALUE (8,8,0,1);
INSERT INTO seats VALUE (9,9,0,1);
INSERT INTO seats VALUE (10,10,0,1);

INSERT INTO traveling VALUE (1,"24.12.2019.",0,1);

INSERT INTO station VALUE (1,"20:00",0,1,1);
INSERT INTO station VALUE (2,"21:00",0,2,1);
INSERT INTO station VALUE (3,"22:00",0,3,1);

INSERT INTO ticket VALUE (1,1300,0,1,1);
INSERT INTO ticket VALUE (2,1150,0,2,1);
INSERT INTO ticket VALUE (3,1300,0,3,1);
INSERT INTO ticket VALUE (4,1300,0,4,1);

--Secret for all users are a
INSERT INTO user VALUE (1,'misko',"$2a$08$/RrpLvrBfjLTT18fi7EMI.cql4kjTHzhBGR8wBRxsJNr5b6Qi77C.","Milos","Misic",24,0,4,'ADMIN');
INSERT INTO user VALUE (2,'pera',"$2a$08$/RrpLvrBfjLTT18fi7EMI.cql4kjTHzhBGR8wBRxsJNr5b6Qi77C.","Pera","Peric",22,0,4,'EMPLOYER');
INSERT INTO user VALUE (3,'dane',"$2a$08$/RrpLvrBfjLTT18fi7EMI.cql4kjTHzhBGR8wBRxsJNr5b6Qi77C.","Dane","Koprivica",45,0,4,'USER');
INSERT INTO user VALUE (4,'dzoni',"$2a$08$/RrpLvrBfjLTT18fi7EMI.cql4kjTHzhBGR8wBRxsJNr5b6Qi77C.","Nikola","Petric",34,0,4,'ADMIN');
INSERT INTO user VALUE (5,'a',"$2a$08$/RrpLvrBfjLTT18fi7EMI.cql4kjTHzhBGR8wBRxsJNr5b6Qi77C.","a","a",24,0,4,'ADMIN');



INSERT INTO passenger VALUE (1,"",0,1,1);
INSERT INTO passenger VALUE (2,"",0,2,2);
INSERT INTO passenger VALUE (3,"",0,3,3);





