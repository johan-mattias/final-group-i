CREATE DATABASE reviuuer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE reviuuer.user (
    id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
	date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE reviuuer.course (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255),
	pace_of_study int,
	period ENUM('Sommar', 'VT', 'HT'),
	distance bool,
	location ENUM('Uppsala', 'Gotland', 'Flexibel', 'Kina', 'Indien', 'Västerås', 'Sundsvall', 'Lysekil', 'Stockholm'),
	course_language ENUM('Engelska', 'Svenska', 'EvEngelska'),
    credits FLOAT(3,1),

	PRIMARY KEY (id)
);

CREATE TABLE reviuuer.review (
	id int NOT NULL AUTO_INCREMENT,
	user_id int,
	course_id int,
	teacher_name varchar(255),
	quality ENUM('1','2','3','4','5'),
	difficulty ENUM('1','2','3','4','5'),
	can_recommend bool,
	worth_credits ENUM('1','2','3','4','5'),
	books_req bool,
	percentage_mand ENUM('1','2','3','4','5'),
	exam bool,
	course_review MEDIUMTEXT,
	teacher_review MEDIUMTEXT,
	date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES reviuuer.user(id),
	FOREIGN KEY (course_id) REFERENCES reviuuer.course(id)
);

CREATE TABLE reviuuer.comment (
	id int NOT NULL AUTO_INCREMENT,
	user_id int,
	review_id int,
	comment_text MEDIUMTEXT,
	date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES reviuuer.user(id),
	FOREIGN KEY (review_id) REFERENCES reviuuer.review(id)
);

CREATE TABLE reviuuer.likeAndDislike (
	id int NOT NULL AUTO_INCREMENT,
	user_id int,
	review_id int,
	comment_id int,
  	like_type ENUM('like', 'dislike'),
	date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES reviuuer.user(id)
);

USE reviuuer;

-- Add indexes
CREATE INDEX review_id_index ON likeAndDislike (review_id) USING HASH;
CREATE INDEX comment_id_index ON likeAndDislike (comment_id) USING HASH;

-- Mock data
-- user
insert into user (id, username, email, password) values (1, 'admin', 'admin@reviuuer.se', '$2a$10$JRyL8idfsqGNFj9V5aS49elEW6e.tJ8/5GZz6/aU8tw8doJqDE39O');
insert into user (id, username, email, password) values (2, 'lgodden1', 'lgodden1@mockuser.com', 'yRZaCdPo');
insert into user (id, username, email, password) values (3, 'mnealand2', 'mnealand2@mockuser.com', 'F2ifBuNfvP');
insert into user (id, username, email, password) values (4, 'ebrandoni3', 'ebrandoni3@mockuser.com', 'GbPMZ8x');
insert into user (id, username, email, password) values (5, 'jminthorpe4', 'jminthorpe4@mockuser.com', '7cEeM40si0');
insert into user (id, username, email, password) values (6, 'vrozenzweig5', 'vrozenzweig5@mockuser.com', 'UyLdAN31WJ');
insert into user (id, username, email, password) values (7, 'cpedroli6', 'cpedroli6@mockuser.com', 'VQV8KyPq');
insert into user (id, username, email, password) values (8, 'mpenreth7', 'mpenreth7@mockuser.com', '3VaaVq2');
insert into user (id, username, email, password) values (9, 'jspadoni8', 'jspadoni8@mockuser.com', 'lkjqaepiW');
insert into user (id, username, email, password) values (10, 'ahuckel9', 'ahuckel9@mockuser.com', 'OJ6A0L885');
insert into user (id, username, email, password) values (11, 'bknolesa', 'bknolesa@mockuser.com', '51moL8vaYKph');
insert into user (id, username, email, password) values (12, 'cjosuweitb', 'cjosuweitb@mockuser.com', 'X6W2LJXT9f5d');
insert into user (id, username, email, password) values (13, 'astrangmanc', 'astrangmanc@mockuser.com', 'lMxISBsJS6');
insert into user (id, username, email, password) values (14, 'dkelselld', 'dkelselld@mockuser.com', 'qzcXZWLL');
insert into user (id, username, email, password) values (15, 'smirandoe', 'smirandoe@mockuser.com', 'nZRIjtQwtQM4');
insert into user (id, username, email, password) values (16, 'drapinf', 'drapinf@mockuser.com', 'dgIHSefUy');
insert into user (id, username, email, password) values (17, 'epurvessg', 'epurvessg@mockuser.com', 'CAN01XDOz');
insert into user (id, username, email, password) values (18, 'sdavidgeh', 'sdavidgeh@mockuser.com', '6IvmO5O3h');
insert into user (id, username, email, password) values (19, 'hklauseni', 'hklauseni@mockuser.com', 'VLHXdCF');
insert into user (id, username, email, password) values (20, 'dkohtlerj', 'dkohtlerj@mockuser.com', 'z3uZ6IC7Ef');
insert into user (id, username, email, password) values (21, 'jkynmank', 'jkynmank@mockuser.com', 'fYPVZF');
insert into user (id, username, email, password) values (22, 'moverill', 'moverill@mockuser.com', '3K8veGg');
insert into user (id, username, email, password) values (23, 'rblydem', 'rblydem@mockuser.com', 'neB77iOCob');
insert into user (id, username, email, password) values (24, 'sdyen', 'sdyen@mockuser.com', 'jUJNpl');
insert into user (id, username, email, password) values (25, 'awaterso', 'awaterso@mockuser.com', 'YPagu3h');
insert into user (id, username, email, password) values (26, 'pprincep', 'pprincep@mockuser.com', 'aNkfWGzC');
insert into user (id, username, email, password) values (27, 'kbedberryq', 'kbedberryq@mockuser.com', 'agaxjgM30jiK');
insert into user (id, username, email, password) values (28, 'lorpinr', 'lorpinr@mockuser.com', 'hCzF8o6Jo8');
insert into user (id, username, email, password) values (29, 'cboulders', 'cboulders@mockuser.com', 'UA84rdvqg');
insert into user (id, username, email, password) values (30, 'dmacekt', 'dmacekt@mockuser.com', 'q2rCEn');
insert into user (id, username, email, password) values (31, 'cmilbornu', 'cmilbornu@mockuser.com', 'v4dwOf');
insert into user (id, username, email, password) values (32, 'dkenwardv', 'dkenwardv@mockuser.com', 'OyZBNqnSskc');
insert into user (id, username, email, password) values (33, 'aharteganw', 'aharteganw@mockuser.com', 'jzNGGin5IuyR');
insert into user (id, username, email, password) values (34, 'gfutcherx', 'gfutcherx@mockuser.com', 'jGuCpvr');
insert into user (id, username, email, password) values (35, 'theliety', 'theliety@mockuser.com', 'S8r6sNCp');
insert into user (id, username, email, password) values (36, 'ksimondz', 'ksimondz@mockuser.com', '9zQtMN');
insert into user (id, username, email, password) values (37, 'khuncoot10', 'khuncoot10@mockuser.com', 'UPIjZDpOtH');
insert into user (id, username, email, password) values (38, 'rgovett11', 'rgovett11@mockuser.com', 'gItRRWJz1ivf');
insert into user (id, username, email, password) values (39, 'jsobczak12', 'jsobczak12@mockuser.com', 'PpJvaHkxUl');
insert into user (id, username, email, password) values (40, 'tfalla13', 'tfalla13@mockuser.com', '5IEsBQ');
insert into user (id, username, email, password) values (41, 'aplumley14', 'aplumley14@mockuser.com', 'MTXmIf8kyXn9');
insert into user (id, username, email, password) values (42, 'gstangel15', 'gstangel15@mockuser.com', 'q1HVeBPEV');
insert into user (id, username, email, password) values (43, 'fkores16', 'fkores16@mockuser.com', 'oniIzM351OEr');
insert into user (id, username, email, password) values (44, 'fsinncock17', 'fsinncock17@mockuser.com', 'HVzWa3K');
insert into user (id, username, email, password) values (45, 'kantao18', 'kantao18@mockuser.com', '8eIKRU');
insert into user (id, username, email, password) values (46, 'bseiler19', 'bseiler19@mockuser.com', '3ooPcfV5Q3v1');
insert into user (id, username, email, password) values (47, 'ecorsor1a', 'ecorsor1a@mockuser.com', 'hTOYXCdgGq');
insert into user (id, username, email, password) values (48, 'ewesgate1b', 'ewesgate1b@mockuser.com', 'Whb5RZy9h9M');
insert into user (id, username, email, password) values (49, 'ejuanico1c', 'ejuanico1c@mockuser.com', '4kMcVCR1K');
insert into user (id, username, email, password) values (50, 'pdyers1d', 'pdyers1d@mockuser.com', 'GFh7opjSWD');

-- course
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Handelsrättslig översiktskurs (HÖK) + Marknad och avtal', 30, 'VT', 100, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Kompletteringsutbildning för apotekare med utländsk examen', 70, 'VT', 100, 1, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Miljöförändringar i ett geologiskt tidsperspektiv', 5, 'HT', 33, 0, 'Uppsala', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Pedagogik med inriktning mot vuxna och arbetsliv A', 30, 'HT', 100, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distanc	e, location,course_language) values ('Vindkraft - kandidatuppsats i vindkraftprojektering', 15, 'HT', 100, 1, 'Flexibel', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Estniska C1', 30, 'HT', 50, 1, 'Flexibel', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Freds- och konfliktkunskap B', 30, 'VT', 100, 0, 'Uppsala', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Vindkraft - teknik', 7.5, 'HT', 50, 1, 'Flexibel', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Verklighetens natur: introduktion till metafysik', 7.5, 'VT', 100, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Språkvetenskap för lärare i franska', 7.5, 'Sommar', 50, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Praktisk franska', 7.5, 'VT', 25, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Molekylära verktyg för proteomanalys och diagnostik', 7.5, 'VT', 100, 0, 'Uppsala', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Kultur- och naturarv i praktiken', 7.5, 'HT', 100, 0, 'Gotland', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Gestaltning med 2D-datorgrafik för spel 3', 7.5, 'HT', 50, 0, 'Gotland', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Digitalisering - individ, organisation och samhälle', 7.5, 'HT', 50, 0, 'Gotland', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Antik grekisk och bysantinsk poesi', 7.5, 'VT', 50, 0, 'Uppsala', 'EvEngelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Aktuella forskningsområden inom lingvistik', 7.5, 'VT', 50, 0, 'Uppsala', 'EvEngelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Affärsredovisning med tillämpad företagsekonomisk analys', 7.5, 'VT', 100, 0, 'Gotland', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Affärssystem', 7.5, 'HT', 50, 0, 'Gotland', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Affärstyska', 7.5, 'VT', 25, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Historisk arkeologi', 7.5, 'HT', 100, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Historiska tider - teori och praktik', 7.5, 'VT', 50, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Historisk lingvistik', 7.5, 'HT', 50, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Historisk lingvistik (avancerad nivå)', 7.5, 'HT', 50, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Historisk musikvetenskap', 7.5, 'HT', 50, 0, 'Uppsala', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Hjärnan - funktioner, sjukdomar och mysterier I', 7.5, 'HT', 25, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Hjärnan - funktioner, sjukdomar och mysterier II', 7.5, 'VT', 25, 0, 'Uppsala', 'Svenska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('HumAnimal Encounters: Representations, Bodies, Identities', 7.5, 'VT', 50, 0, 'Uppsala', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Galaxernas fysik', 10, 'VT', 67, 0, 'Uppsala', 'EvEngelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Gener, hjärna och beteende', 15, 'HT', 100, 0, 'Uppsala', 'Engelska');
insert into course (name, credits, period, pace_of_study, distance, location,course_language) values ('Genomfunktion', 15, 'VT', 100, 0, 'Uppsala', 'Engelska');

-- review
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (1, 33, 18, 'Helenelizabeth Bartholin', 2, 5, 1, 3, 1, 5, 1, 'Cotinus Mill.', 'Smoketree');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (2, 24, 1, 'Kerri Neat', 5, 4, 0, 4, 1, 1, 0, 'Dicksonia squarrosa (G. Forst.) Sw.', 'Hard Treefern');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (3, 22, 30, 'Xever Alpine', 4, 2, 1, 2, 1, 1, 0, 'Chamaesyce dioica (Kunth) Millsp.', 'Royal Sandmat');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (4, 35, 6, 'Emili Mower', 1, 2, 1, 3, 1, 5, 0, 'Valerianella umbilicata (Sull.) Alph. Wood', 'Navel Cornsalad');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (5, 30, 27, 'Archer Streets', 3, 2, 0, 2, 1, 2, 1, 'Taraxacum lyratum (Ledeb.) DC.', 'Harp Dandelion');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (6, 30, 28, 'Alexandrina Lemmers', 2, 1, 0, 1, 0, 5, 1, 'Halimodendron Fisch. ex DC.', 'Halimodendron');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (7, 25, 28, 'Carey Quarton', 5, 5, 0, 2, 1, 3, 0, 'Suaeda calceoliformis (Hook.) Moq.', 'Pursh Seepweed');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (8, 19, 22, 'Karoly Conan', 3, 3, 1, 4, 0, 3, 0, 'Ipomoea pauciflora M. Martens & Galeotti', 'Tree Morning Glory');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (9, 11, 13, 'Killy Cicco', 2, 1, 0, 5, 0, 2, 0, 'Jacaranda Juss.', 'Jacaranda');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (10, 37, 3, 'Dulci Winsley', 2, 1, 1, 5, 0, 4, 0, 'Carex specicola J.T. Howell', 'Navajo Sedge');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (11, 23, 17, 'Carline Calver', 2, 4, 1, 3, 0, 5, 1, 'Leptogium contortum Sierk', 'Contorted Skin Lichen');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (12, 43, 3, 'Kristian Boij', 5, 1, 0, 1, 0, 3, 0, 'Calystegia macrostegia (Greene) Brummitt ssp. arida (Greene) Brummitt', 'Island False Bindweed');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (13, 21, 18, 'Rosemary Kilpin', 3, 3, 0, 3, 0, 5, 0, 'Helianthella californica A. Gray ssp. californica', 'California Helianthella');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (14, 16, 18, 'Kimbra Deval', 3, 3, 0, 5, 0, 3, 0, 'Gyroweisia Schimp.', 'Gyroweisia Moss');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (15, 28, 27, 'Dallon Dufore', 5, 4, 1, 3, 0, 5, 0, 'Paraserianthes I.C. Nielsen', 'Paraserianthes');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (16, 43, 21, 'Truman Reiach', 5, 5, 0, 2, 0, 5, 0, 'Oligotrichum hercynicum (Hedw.) Lam. & DC.', 'Oligotrichum Moss');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (17, 35, 27, 'Kath Renner', 3, 5, 0, 4, 1, 3, 1, 'Eriogonum heermannii Durand & Hilg. var. floccosum Munz', 'Clark Mountain Buckwheat');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (18, 13, 30, 'Des Ville', 4, 4, 0, 1, 0, 1, 0, 'Scutellaria elliptica Muhl. ex Spreng. var. elliptica', 'Hairy Skullcap');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (19, 37, 16, 'Brok Emmanuel', 3, 3, 0, 3, 1, 3, 0, 'Tradescantia subacaulis Bush', 'Stemless Spiderwort');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (20, 21, 20, 'Dulcea Glendzer', 1, 5, 0, 1, 0, 1, 1, 'Penstemon calycosus Small', 'Longsepal Beardtongue');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (21, 24, 26, 'Alyosha Nickoles', 5, 4, 1, 5, 0, 5, 0, 'Hedeoma diffusa Greene', 'Spreading False Pennyroyal');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (22, 24, 16, 'Brianna Basketter', 4, 2, 0, 1, 1, 5, 0, 'Astragalus miser Douglas ex Hook. var. crispatus (M.E. Jones) Cronquist', 'Timber Milkvetch');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (23, 5, 20, 'Robinet Bromell', 3, 4, 1, 5, 0, 2, 1, 'Helianthella californica A. Gray ssp. californica', 'California Helianthella');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (24, 29, 3, 'Nessy Crackel', 4, 3, 1, 2, 1, 3, 1, 'Draba aureola S. Watson', 'Mt. Lassen Draba');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (25, 47, 15, 'Deedee Walicki', 2, 4, 1, 5, 1, 1, 0, 'Bryoria friabilis Brodo & D. Hawksw.', 'Horsehair Lichen');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (26, 47, 22, 'Rafe Casterot', 4, 4, 0, 2, 0, 5, 0, 'Hordeum jubatum L. ssp. jubatum', 'Foxtail Barley');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (27, 14, 29, 'Christiana Forrestor', 2, 3, 1, 5, 0, 3, 1, 'Sabatia dodecandra (L.) Britton, Sterns & Poggenb.', 'Marsh Rose Gentian');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (28, 39, 3, 'Gayle Riehm', 4, 2, 1, 3, 1, 3, 1, 'Psorotichia segregata (Nyl.) Hasse', 'Psorotichia Lichen');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (29, 43, 16, 'Adam Newlands', 1, 3, 1, 4, 0, 1, 1, 'Pleurochaete Lindb.', 'Pleurochaete Moss');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (30, 27, 14, 'Cammy Terzi', 2, 4, 1, 4, 0, 5, 1, 'Rumex pulcher L.', 'Fiddle Dock');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (31, 30, 24, 'Kimberley Wilkenson', 4, 4, 1, 2, 0, 1, 1, 'Betula platyphylla Sukaczev', 'Asian White Birch');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (32, 8, 17, 'Alexandra Treagust', 2, 1, 0, 3, 0, 3, 1, 'Trypethelium virens Tuck. ex Michener', 'Trypelthelium Lichen');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (33, 42, 17, 'Jacquelyn Mogg', 5, 4, 1, 2, 1, 3, 1, 'Rubus lasiococcus A. Gray', 'Roughfruit Berry');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (34, 17, 23, 'Koralle Rouge', 1, 4, 1, 2, 1, 1, 1, 'Cryptantha micrantha (Torr.) I.M. Johnst. var. micrantha', 'Redroot Cryptantha');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (35, 14, 10, 'Della McPeck', 2, 3, 1, 2, 1, 1, 0, 'Agastache parvifolia Eastw.', 'Smallleaf Giant Hyssop');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (36, 21, 24, 'Grantley Gansbuhler', 1, 3, 1, 2, 1, 3, 1, 'Chaenactis xantiana A. Gray', 'Fleshcolor Pincushion');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (37, 33, 24, 'Randy Pfaffe', 1, 2, 1, 4, 0, 1, 1, 'Astragalus canadensis L. var. mortonii (Nutt.) S. Watson', 'Morton''s Canadian Milkvetch');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (38, 42, 7, 'Engracia Oxburgh', 1, 5, 0, 5, 0, 3, 0, 'Quercus ilex L.', 'Holly Oak');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (39, 38, 7, 'Rod Booler', 4, 4, 0, 5, 0, 2, 1, 'Celtis australis L.', 'European Hackberry');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (40, 45, 20, 'Renaldo Brewins', 2, 5, 1, 2, 0, 2, 0, 'Lilium washingtonianum Kellogg ssp. purpurascens (Stearn) M.W. Skinner', 'Cascade Lily');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (41, 20, 28, 'Cletis Fleeming', 5, 1, 1, 1, 1, 3, 1, 'Rhynchospora corniculata (Lam.) A. Gray', 'Shortbristle Horned Beaksedge');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (42, 42, 20, 'Niels Quin', 3, 4, 1, 2, 0, 2, 0, 'Ceanothus connivens Greene', 'Trailing Buckbrush');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (43, 38, 26, 'Artair Wallice', 2, 2, 1, 1, 0, 3, 0, 'Spartina alterniflora Loisel.', 'Smooth Cordgrass');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (44, 11, 7, 'Noami Hurdwell', 2, 4, 1, 5, 1, 1, 0, 'Platanthera lacera (Michx.) G. Don', 'Green Fringed Orchid');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (45, 45, 28, 'Lolita Mallen', 1, 1, 0, 1, 1, 4, 0, 'Polemonium foliosissimum A. Gray var. molle (Greene) Anway', 'Towering Jacob''s-ladder');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (46, 28, 4, 'Adrea Ibbotson', 4, 1, 0, 2, 0, 2, 1, 'Eucladium verticillatum (Brid.) Bruch & Schimp.', 'Eucladium Moss');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (47, 16, 13, 'Ephrem Bilbery', 4, 3, 1, 5, 1, 2, 1, 'Urochloa mutica (Forssk.) T.Q. Nguyen', 'Para Grass');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (48, 21, 12, 'Levey Lorimer', 2, 4, 0, 5, 0, 5, 1, 'Isopogon R. Br. ex Knight', 'Cone Flower');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (49, 27, 30, 'Twila Bulcroft', 5, 1, 1, 5, 0, 3, 1, 'Ceanothus ×vanrensselaeri J.B. Roof', 'Ceanothus');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (50, 3, 4, 'Fremont Machen', 4, 5, 1, 1, 0, 4, 1, 'Erigeron peregrinus (Banks ex Pursh) Greene ssp. peregrinus', 'Subalpine Fleabane');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (51, 17, 6, 'Helenelizabeth Bartholin', 4, 1, 1, 3, 0, 4, 1, 'Pterostegia Fisch. & C.A. Mey.', 'Pterostegia');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (52, 4, 28, 'Kerri Neat', 4, 1, 1, 1, 1, 4, 0, 'Opuntia martiniana (L.D. Benson) Parfitt', 'Seashore Cactus');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (53, 25, 20, 'Xever Alpine', 5, 3, 0, 5, 0, 3, 1, 'Luzula multiflora (Ehrh.) Lej.', 'Common Woodrush');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (54, 37, 24, 'Emili Mower', 4, 5, 0, 3, 1, 5, 1, 'Plagiopus oederianus (Sw.) H.A. Crum & L.E. Anderson', 'Oeder''s Plagiopus Moss');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (55, 32, 9, 'Archer Streets', 1, 1, 0, 1, 0, 3, 1, 'Lupinus albifrons Benth. var. flumineus C.P. Sm.', 'Silver Lupine');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (56, 26, 16, 'Alexandrina Lemmers', 1, 5, 0, 4, 0, 4, 0, 'Crataegus aemula Beadle', 'Rome Hawthorn');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (57, 22, 11, 'Carey Quarton', 5, 1, 1, 1, 1, 1, 1, 'Spiranthes vernalis Engelm. & A. Gray', 'Spring Lady''s Tresses');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (58, 7, 10, 'Karoly Conan', 2, 4, 0, 2, 0, 3, 1, 'Brassia caudata (L.) Lindl.', 'Cricket Orchid');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (59, 24, 21, 'Killy Cicco', 1, 2, 1, 2, 0, 1, 1, 'Nelsonia canescens (Lam.) Spreng.', 'Blue Pussyleaf');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (60, 10, 24, 'Dulci Winsley', 1, 3, 1, 2, 1, 5, 0, 'Schoenus apogon Roem. & Schult.', 'Smooth Bogrush');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (61, 50, 18, 'Carline Calver', 4, 2, 1, 5, 0, 1, 1, 'Acalypha mexicana Müll. Arg.', 'Mexican Copperleaf');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (62, 19, 16, 'Kristian Boij', 5, 3, 1, 5, 1, 3, 1, 'Pinus parviflora Siebold & Zucc.', 'Five-needle Pine');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (63, 8, 10, 'Rosemary Kilpin', 5, 3, 1, 3, 1, 4, 1, 'Gaillardia multiceps Greene var. microcephala B.L. Turner', 'Onion Blanketflower');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (64, 37, 1, 'Kimbra Deval', 3, 4, 1, 3, 1, 2, 0, 'Penstemon fremontii Torr. & A. Gray ex A. Gray var. fremontii', 'Fremont''s Beardtongue');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (65, 49, 23, 'Dallon Dufore', 1, 3, 0, 4, 0, 4, 1, 'Garcinia myrtifolia A.C. Sm.', 'Garcinia');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (66, 47, 23, 'Truman Reiach', 2, 4, 0, 5, 0, 3, 1, 'Silene ×hampeana Meusel & K. Werner', 'Catchfly');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (67, 2, 27, 'Kath Renner', 2, 1, 0, 3, 0, 5, 1, 'Grindelia nuda Alph. Wood var. aphanactis (Rydb.) G.L. Nesom', 'Curlytop Gumweed');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (68, 35, 9, 'Des Ville', 3, 2, 0, 5, 0, 5, 0, 'Rudbeckia heliopsidis Torr. & A. Gray', 'Sunfacing Coneflower');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (69, 34, 10, 'Brok Emmanuel', 1, 1, 0, 4, 0, 4, 1, 'Bambusa polymorpha Munro', 'Polymorph Bamboo');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (70, 18, 8, 'Dulcea Glendzer', 5, 4, 1, 1, 1, 5, 1, 'Phyla nodiflora (L.) Greene', 'Turkey Tangle Fogfruit');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (71, 21, 28, 'Alyosha Nickoles', 5, 5, 1, 4, 0, 2, 1, 'Cladonia borealis S. Stenroos', 'Boreal Cup Lichen');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (72, 18, 23, 'Brianna Basketter', 3, 5, 1, 2, 0, 2, 1, 'Lavatera thuringiaca L.', 'Tree Lavatera');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (73, 46, 18, 'Robinet Bromell', 1, 4, 0, 3, 0, 3, 0, 'Navarretia hamata Greene ssp. hamata', 'Hooked Pincushionplant');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (74, 6, 15, 'Nessy Crackel', 1, 4, 1, 3, 1, 4, 1, 'Psiguria pedata (L.) Howard', 'Caribbean Pygmymelon');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (75, 30, 6, 'Deedee Walicki', 3, 3, 0, 2, 1, 5, 1, 'Alocasia brisbanensis (F.M. Bailey) Domin', 'Cunjevoi');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (76, 20, 3, 'Rafe Casterot', 5, 2, 0, 4, 0, 2, 0, 'Hackelia setosa (Piper) I.M. Johnst.', 'Bristly Stickseed');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (77, 47, 28, 'Christiana Forrestor', 1, 3, 0, 2, 1, 4, 0, 'Ipomopsis congesta (Hook.) V.E. Grant ssp. pseudotypica (Constance & Rollins) Day', 'Ballhead Ipomopsis');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (78, 27, 9, 'Gayle Riehm', 4, 2, 0, 3, 0, 4, 0, 'Carex vallicola Dewey var. rusbyi (Mack.) F.J. Herm.', 'Rusby''s Sedge');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (79, 49, 15, 'Adam Newlands', 5, 4, 0, 5, 0, 3, 0, 'Eriastrum pluriflorum (A. Heller) H. Mason ssp. pluriflorum', 'Tehachapi Woollystar');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (80, 14, 12, 'Cammy Terzi', 5, 1, 0, 4, 1, 2, 1, 'Sclerocactus Britton & Rose', 'Fishhook Cactus');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (81, 28, 4, 'Kimberley Wilkenson', 3, 1, 0, 5, 1, 2, 0, 'Cryptantha abata I.M. Johnst.', 'Dentnut Cryptantha');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (82, 29, 23, 'Alexandra Treagust', 1, 3, 0, 2, 1, 5, 0, 'Phyla ×intermedia Moldenke', 'Fogfruit');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (83, 8, 10, 'Jacquelyn Mogg', 1, 2, 0, 3, 1, 2, 0, 'Spiranthes odorata (Nutt.) Lindl.', 'Marsh Lady''s Tresses');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (84, 35, 13, 'Koralle Rouge', 4, 2, 1, 1, 0, 5, 1, 'Rubus particularis L.H. Bailey', 'West Virginia Dewberry');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (85, 38, 12, 'Della McPeck', 3, 5, 1, 4, 0, 4, 0, 'Carex ×kenaica Lepage', 'Sedge');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (86, 20, 12, 'Grantley Gansbuhler', 4, 1, 1, 4, 1, 3, 0, 'Monolepis nuttalliana (Schult.) Greene', 'Nuttall''s Povertyweed');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (87, 47, 16, 'Randy Pfaffe', 2, 1, 0, 3, 0, 1, 1, 'Xyris longisepala Kral', 'Kral''s Yelloweyed Grass');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (88, 48, 11, 'Engracia Oxburgh', 3, 1, 0, 5, 1, 5, 0, 'Celosia L.', 'Cock''s Comb');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (89, 40, 18, 'Rod Booler', 1, 3, 1, 5, 1, 4, 1, 'Mertensia longiflora Greene', 'Small Bluebells');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (90, 23, 4, 'Renaldo Brewins', 2, 3, 1, 2, 0, 2, 0, 'Nerium L.', 'Oleander');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (91, 41, 17, 'Cletis Fleeming', 3, 3, 1, 4, 1, 4, 1, 'Arthonia gyalectoides Müll. Arg.', 'Dot Lichen');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (92, 24, 6, 'Niels Quin', 1, 5, 0, 4, 1, 2, 0, 'Miriquidica deusta (Stenham.) Hertel & Rambold', 'Miriquidica Lichen');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (93, 38, 27, 'Artair Wallice', 4, 5, 0, 5, 0, 3, 1, 'Bothriochloa hybrida (Gould) Gould', 'Hybrid Beardgrass');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (94, 31, 27, 'Noami Hurdwell', 5, 5, 1, 2, 1, 2, 0, 'Rinodina dirinoides Zahlbr.', 'Rinodina Lichen');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (95, 28, 26, 'Lolita Mallen', 1, 5, 1, 5, 1, 4, 0, 'Aphanisma blitoides Nutt. ex Moq.', 'San Diego Coastalcreeper');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (96, 48, 26, 'Adrea Ibbotson', 5, 2, 1, 5, 1, 4, 0, 'Lessingia lemmonii A. Gray var. peirsonii (J.T. Howell) Ferris', 'Peirson''s Lessingia');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (97, 6, 29, 'Ephrem Bilbery', 2, 1, 1, 2, 1, 1, 1, 'Digitaria velutina (Forssk.) P. Beauv.', 'Velvet Crabgrass');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (98, 1, 24, 'Levey Lorimer', 5, 4, 0, 2, 1, 3, 1, 'Cardamine cordifolia A. Gray', 'Heartleaf Bittercress');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (99, 20, 4, 'Twila Bulcroft', 3, 2, 1, 3, 0, 5, 1, 'Sinocalamus McClure', 'Wideleaf Bamboo');
insert into review (id, user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) values (100, 32, 13, 'Fremont Machen', 3, 1, 0, 3, 0, 3, 1, 'Solanum nelsonii Dunal', 'Nelson''s Horsenettle');

-- comment
insert into comment (id, user_id, review_id, comment_text) values (1, 48, 91, 'Taxidea taxus');
insert into comment (id, user_id, review_id, comment_text) values (2, 7, 16, 'Kobus defassa');
insert into comment (id, user_id, review_id, comment_text) values (3, 14, 7, 'Theropithecus gelada');
insert into comment (id, user_id, review_id, comment_text) values (4, 41, 93, 'Milvago chimachima');
insert into comment (id, user_id, review_id, comment_text) values (5, 18, 24, 'Rangifer tarandus');
insert into comment (id, user_id, review_id, comment_text) values (6, 42, 4, 'Tetracerus quadricornis');
insert into comment (id, user_id, review_id, comment_text) values (7, 6, 81, 'Junonia genoveua');
insert into comment (id, user_id, review_id, comment_text) values (8, 26, 22, 'Corvus brachyrhynchos');
insert into comment (id, user_id, review_id, comment_text) values (9, 29, 72, 'Libellula quadrimaculata');
insert into comment (id, user_id, review_id, comment_text) values (10, 9, 2, 'Buteo regalis');
insert into comment (id, user_id, review_id, comment_text) values (11, 4, 30, 'Pelecanus conspicillatus');
insert into comment (id, user_id, review_id, comment_text) values (12, 36, 17, 'Anastomus oscitans');
insert into comment (id, user_id, review_id, comment_text) values (13, 41, 71, 'Ovibos moschatus');
insert into comment (id, user_id, review_id, comment_text) values (14, 11, 97, 'Geochelone radiata');
insert into comment (id, user_id, review_id, comment_text) values (15, 40, 90, 'Spermophilus lateralis');
insert into comment (id, user_id, review_id, comment_text) values (16, 28, 78, 'Dasyurus viverrinus');
insert into comment (id, user_id, review_id, comment_text) values (17, 5, 68, 'Parus atricapillus');
insert into comment (id, user_id, review_id, comment_text) values (18, 48, 26, 'Lutra canadensis');
insert into comment (id, user_id, review_id, comment_text) values (19, 19, 99, 'Streptopelia decipiens');
insert into comment (id, user_id, review_id, comment_text) values (20, 13, 42, 'Cynictis penicillata');
insert into comment (id, user_id, review_id, comment_text) values (21, 13, 3, 'Lorythaixoides concolor');
insert into comment (id, user_id, review_id, comment_text) values (22, 4, 23, 'Zosterops pallidus');
insert into comment (id, user_id, review_id, comment_text) values (23, 47, 55, 'Psophia viridis');
insert into comment (id, user_id, review_id, comment_text) values (24, 36, 14, 'Francolinus swainsonii');
insert into comment (id, user_id, review_id, comment_text) values (25, 36, 66, 'Pan troglodytes');
insert into comment (id, user_id, review_id, comment_text) values (26, 33, 82, 'Uraeginthus angolensis');
insert into comment (id, user_id, review_id, comment_text) values (27, 31, 20, 'Crax sp.');
insert into comment (id, user_id, review_id, comment_text) values (28, 16, 31, 'Macropus parryi');
insert into comment (id, user_id, review_id, comment_text) values (29, 20, 65, 'Zosterops pallidus');
insert into comment (id, user_id, review_id, comment_text) values (30, 42, 50, 'Phoca vitulina');
insert into comment (id, user_id, review_id, comment_text) values (31, 2, 44, 'Libellula quadrimaculata');
insert into comment (id, user_id, review_id, comment_text) values (32, 35, 69, 'Platalea leucordia');
insert into comment (id, user_id, review_id, comment_text) values (33, 49, 26, 'unavailable');
insert into comment (id, user_id, review_id, comment_text) values (34, 7, 29, 'Colobus guerza');
insert into comment (id, user_id, review_id, comment_text) values (35, 11, 87, 'Ceratotherium simum');
insert into comment (id, user_id, review_id, comment_text) values (36, 33, 21, 'Castor fiber');
insert into comment (id, user_id, review_id, comment_text) values (37, 24, 81, 'unavailable');
insert into comment (id, user_id, review_id, comment_text) values (38, 49, 27, 'Stenella coeruleoalba');
insert into comment (id, user_id, review_id, comment_text) values (39, 22, 74, 'Casmerodius albus');
insert into comment (id, user_id, review_id, comment_text) values (40, 17, 38, 'Spizaetus coronatus');
insert into comment (id, user_id, review_id, comment_text) values (41, 12, 81, 'Ceratotherium simum');
insert into comment (id, user_id, review_id, comment_text) values (42, 20, 18, 'Bassariscus astutus');
insert into comment (id, user_id, review_id, comment_text) values (43, 5, 83, 'Macropus parryi');
insert into comment (id, user_id, review_id, comment_text) values (44, 5, 99, 'Odocoileus hemionus');
insert into comment (id, user_id, review_id, comment_text) values (45, 43, 89, 'Aonyx capensis');
insert into comment (id, user_id, review_id, comment_text) values (46, 15, 94, 'Lamprotornis nitens');
insert into comment (id, user_id, review_id, comment_text) values (47, 3, 68, 'Cygnus buccinator');
insert into comment (id, user_id, review_id, comment_text) values (48, 33, 52, 'Hyaena hyaena');
insert into comment (id, user_id, review_id, comment_text) values (49, 10, 48, 'Phoca vitulina');
insert into comment (id, user_id, review_id, comment_text) values (50, 36, 37, 'Laniarius ferrugineus');
insert into comment (id, user_id, review_id, comment_text) values (51, 33, 26, 'Diomedea irrorata');
insert into comment (id, user_id, review_id, comment_text) values (52, 23, 74, 'Caiman crocodilus');
insert into comment (id, user_id, review_id, comment_text) values (53, 41, 82, 'Thamnolaea cinnmomeiventris');
insert into comment (id, user_id, review_id, comment_text) values (54, 32, 13, 'Neophron percnopterus');
insert into comment (id, user_id, review_id, comment_text) values (55, 15, 81, 'Merops bullockoides');
insert into comment (id, user_id, review_id, comment_text) values (56, 24, 12, 'Grus antigone');
insert into comment (id, user_id, review_id, comment_text) values (57, 25, 38, 'Phascogale calura');
insert into comment (id, user_id, review_id, comment_text) values (58, 6, 9, 'Milvago chimachima');
insert into comment (id, user_id, review_id, comment_text) values (59, 37, 28, 'Lycaon pictus');
insert into comment (id, user_id, review_id, comment_text) values (60, 47, 68, 'Cervus elaphus');
insert into comment (id, user_id, review_id, comment_text) values (61, 42, 99, 'Ninox superciliaris');
insert into comment (id, user_id, review_id, comment_text) values (62, 15, 70, 'Ovis ammon');
insert into comment (id, user_id, review_id, comment_text) values (63, 24, 100, 'Cyrtodactylus louisiadensis');
insert into comment (id, user_id, review_id, comment_text) values (64, 31, 9, 'Choloepus hoffmani');
insert into comment (id, user_id, review_id, comment_text) values (65, 14, 33, 'Phalacrocorax brasilianus');
insert into comment (id, user_id, review_id, comment_text) values (66, 1, 92, 'Varanus sp.');
insert into comment (id, user_id, review_id, comment_text) values (67, 21, 1, 'Macaca nemestrina');
insert into comment (id, user_id, review_id, comment_text) values (68, 15, 70, 'Bucorvus leadbeateri');
insert into comment (id, user_id, review_id, comment_text) values (69, 17, 87, 'Macropus robustus');
insert into comment (id, user_id, review_id, comment_text) values (70, 39, 17, 'Ciconia episcopus');
insert into comment (id, user_id, review_id, comment_text) values (71, 39, 62, 'Ramphastos tucanus');
insert into comment (id, user_id, review_id, comment_text) values (72, 50, 24, 'Eudyptula minor');
insert into comment (id, user_id, review_id, comment_text) values (73, 39, 19, 'Manouria emys');
insert into comment (id, user_id, review_id, comment_text) values (74, 20, 79, 'Colobus guerza');
insert into comment (id, user_id, review_id, comment_text) values (75, 28, 29, 'Nyctea scandiaca');
insert into comment (id, user_id, review_id, comment_text) values (76, 27, 17, 'Cracticus nigroagularis');
insert into comment (id, user_id, review_id, comment_text) values (77, 31, 95, 'Cacatua tenuirostris');
insert into comment (id, user_id, review_id, comment_text) values (78, 1, 96, 'Macaca mulatta');
insert into comment (id, user_id, review_id, comment_text) values (79, 27, 19, 'Lophoaetus occipitalis');
insert into comment (id, user_id, review_id, comment_text) values (80, 47, 32, 'Myotis lucifugus');
insert into comment (id, user_id, review_id, comment_text) values (81, 21, 72, 'Motacilla aguimp');
insert into comment (id, user_id, review_id, comment_text) values (82, 17, 29, 'Ardea golieth');
insert into comment (id, user_id, review_id, comment_text) values (83, 22, 22, 'unavailable');
insert into comment (id, user_id, review_id, comment_text) values (84, 41, 65, 'Balearica pavonina');
insert into comment (id, user_id, review_id, comment_text) values (85, 15, 7, 'unavailable');
insert into comment (id, user_id, review_id, comment_text) values (86, 26, 89, 'Marmota caligata');
insert into comment (id, user_id, review_id, comment_text) values (87, 47, 20, 'Acanthaster planci');
insert into comment (id, user_id, review_id, comment_text) values (88, 30, 1, 'Ovis ammon');
insert into comment (id, user_id, review_id, comment_text) values (89, 47, 14, 'Ornithorhynchus anatinus');
insert into comment (id, user_id, review_id, comment_text) values (90, 8, 74, 'Pycnonotus nigricans');
insert into comment (id, user_id, review_id, comment_text) values (91, 40, 80, 'Ara ararauna');
insert into comment (id, user_id, review_id, comment_text) values (92, 12, 50, 'Pycnonotus nigricans');
insert into comment (id, user_id, review_id, comment_text) values (93, 21, 35, 'unavailable');
insert into comment (id, user_id, review_id, comment_text) values (94, 46, 60, 'Tiliqua scincoides');
insert into comment (id, user_id, review_id, comment_text) values (95, 21, 13, 'Coluber constrictor');
insert into comment (id, user_id, review_id, comment_text) values (96, 6, 20, 'Tiliqua scincoides');
insert into comment (id, user_id, review_id, comment_text) values (97, 41, 50, 'Papilio canadensis');
insert into comment (id, user_id, review_id, comment_text) values (98, 13, 90, 'Marmota flaviventris');
insert into comment (id, user_id, review_id, comment_text) values (99, 9, 68, 'Crotalus adamanteus');
insert into comment (id, user_id, review_id, comment_text) values (100, 23, 53, 'Lepilemur rufescens');

-- likeAndDislike
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (1, 30, 86, 90, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (2, 21, 87, 83, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (3, 22, 64, 17, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (4, 34, 59, 40, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (5, 29, 42, 2, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (6, 42, 87, 85, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (7, 3, 40, 2, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (8, 42, 20, 52, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (9, 45, 88, 10, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (10, 4, 92, 53, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (11, 19, 19, 13, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (12, 48, 30, 11, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (13, 7, 60, 87, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (14, 43, 25, 80, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (15, 3, 40, 37, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (16, 10, 27, 88, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (17, 39, 31, 99, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (18, 5, 86, 36, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (19, 11, 62, 64, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (20, 31, 27, 40, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (21, 2, 74, 57, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (22, 18, 97, 56, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (23, 8, 92, 71, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (24, 10, 75, 53, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (25, 7, 72, 54, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (26, 42, 13, 98, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (27, 19, 41, 95, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (28, 16, 81, 89, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (29, 38, 28, 88, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (30, 18, 38, 33, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (31, 48, 16, 32, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (32, 2, 52, 58, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (33, 48, 59, 69, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (34, 21, 91, 100, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (35, 6, 79, 72, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (36, 40, 21, 99, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (37, 33, 82, 58, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (38, 21, 90, 90, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (39, 25, 49, 88, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (40, 13, 39, 27, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (41, 28, 29, 3, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (42, 32, 47, 95, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (43, 8, 1, 27, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (44, 23, 66, 84, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (45, 35, 70, 77, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (46, 5, 12, 54, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (47, 30, 14, 20, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (48, 40, 21, 77, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (49, 12, 47, 44, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (50, 37, 74, 17, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (51, 11, 22, 49, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (52, 23, 22, 72, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (53, 37, 82, 82, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (54, 41, 66, 79, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (55, 49, 63, 72, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (56, 23, 37, 60, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (57, 6, 15, 72, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (58, 6, 96, 91, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (59, 45, 44, 65, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (60, 10, 86, 38, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (61, 47, 66, 98, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (62, 45, 82, 1, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (63, 5, 81, 39, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (64, 15, 54, 77, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (65, 13, 45, 2, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (66, 17, 61, 42, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (67, 39, 62, 56, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (68, 33, 52, 19, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (69, 18, 85, 6, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (70, 26, 3, 80, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (71, 32, 90, 28, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (72, 45, 5, 41, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (73, 29, 6, 48, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (74, 14, 36, 71, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (75, 33, 7, 22, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (76, 36, 77, 39, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (77, 4, 82, 55, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (78, 3, 88, 63, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (79, 7, 53, 73, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (80, 46, 52, 15, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (81, 43, 49, 74, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (82, 14, 92, 94, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (83, 35, 25, 74, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (84, 11, 30, 92, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (85, 10, 64, 37, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (86, 12, 83, 87, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (87, 45, 79, 32, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (88, 29, 62, 24, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (89, 32, 46, 10, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (90, 17, 14, 13, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (91, 16, 39, 33, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (92, 41, 100, 35, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (93, 2, 34, 37, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (94, 16, 15, 84, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (95, 5, 2, 30, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (96, 14, 68, 14, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (97, 24, 39, 22, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (98, 29, 76, 54, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (99, 31, 37, 78, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (100, 50, 34, 84, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (101, 31, 81, 12, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (102, 42, 76, 67, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (103, 32, 67, 29, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (104, 6, 6, 67, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (105, 49, 39, 25, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (106, 34, 34, 34, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (107, 38, 58, 69, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (108, 10, 71, 53, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (109, 21, 23, 21, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (110, 41, 32, 77, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (111, 17, 13, 73, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (112, 15, 48, 86, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (113, 43, 32, 68, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (114, 12, 47, 19, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (115, 19, 16, 5, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (116, 35, 65, 73, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (117, 21, 95, 1, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (118, 27, 71, 64, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (119, 9, 60, 6, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (120, 35, 35, 46, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (121, 42, 84, 55, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (122, 21, 31, 60, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (123, 39, 84, 75, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (124, 43, 74, 7, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (125, 5, 11, 98, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (126, 8, 1, 95, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (127, 6, 31, 99, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (128, 48, 27, 81, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (129, 4, 38, 7, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (130, 17, 58, 14, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (131, 32, 78, 73, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (132, 26, 19, 58, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (133, 6, 33, 12, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (134, 5, 87, 27, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (135, 45, 88, 50, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (136, 37, 78, 17, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (137, 31, 30, 52, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (138, 16, 48, 83, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (139, 27, 52, 40, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (140, 10, 37, 73, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (141, 39, 30, 4, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (142, 22, 6, 57, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (143, 12, 82, 42, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (144, 14, 75, 50, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (145, 32, 48, 4, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (146, 19, 6, 35, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (147, 11, 68, 34, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (148, 30, 35, 24, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (149, 18, 10, 95, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (150, 17, 91, 30, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (151, 20, 95, 97, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (152, 2, 24, 48, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (153, 30, 16, 40, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (154, 28, 68, 100, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (155, 27, 45, 47, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (156, 15, 87, 67, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (157, 7, 29, 45, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (158, 16, 9, 75, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (159, 47, 16, 65, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (160, 45, 53, 22, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (161, 21, 73, 47, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (162, 20, 86, 30, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (163, 46, 90, 74, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (164, 45, 55, 73, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (165, 20, 21, 55, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (166, 2, 56, 8, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (167, 45, 45, 34, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (168, 13, 54, 47, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (169, 37, 30, 15, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (170, 26, 67, 34, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (171, 11, 77, 48, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (172, 4, 9, 4, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (173, 21, 82, 20, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (174, 12, 63, 45, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (175, 38, 40, 81, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (176, 47, 85, 18, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (177, 31, 36, 29, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (178, 19, 40, 86, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (179, 40, 10, 38, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (180, 43, 94, 52, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (181, 29, 24, 70, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (182, 21, 48, 28, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (183, 49, 78, 14, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (184, 13, 6, 33, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (185, 47, 48, 77, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (186, 47, 4, 69, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (187, 17, 100, 42, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (188, 19, 99, 13, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (189, 47, 75, 91, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (190, 24, 26, 12, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (191, 2, 36, 60, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (192, 39, 39, 42, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (193, 11, 4, 70, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (194, 44, 30, 33, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (195, 14, 79, 41, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (196, 33, 1, 47, 'like');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (197, 50, 73, 98, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (198, 14, 41, 47, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (199, 24, 74, 42, 'dislike');
insert into likeAndDislike (id, user_id, review_id, comment_id, like_type) values (200, 18, 73, 49, 'like');