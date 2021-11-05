CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL, 
	username VARCHAR(200) NOT NULL,
	email VARCHAR (200) NOT NULL,
	password VARCHAR(200)NOT NULL,
	role VARCHAR (200) NOT NULL,
	unique(username, email));

CREATE TABLE lugar (
	idLugar BIGSERIAL PRIMARY KEY NOT NULL, 
	nombreLugar VARCHAR(200) NOT NULL,
	tipoLugar VARCHAR (200) NOT NULL,
	descripcionLugar VARCHAR(200)NOT NULL,
	localizacionLugar FLOAT8  NOT NULL,
	imagenLugar BYTEA NOT NULL,
	unique(nombreLugar));

CREATE TABLE publications (
    id_pub BIGSERIAL PRIMARY KEY NOT NULL,
    nivel_mes int4 NOT NULL, 
	titulo VARCHAR(255) NOT NULL,
	tipo_fuente VARCHAR (200) NOT NULL,
	fuente VARCHAR(200)NOT NULL,
	indexado VARCHAR(200)NOT NULL,
	areaidLugar integer NOT NULL REFERENCES lugar ON DELETE RESTRICT,
	url VARCHAR (200) NOT NULL
	);

CREATE TABLE events (
    id_ev BIGSERIAL PRIMARY KEY NOT NULL,
	titulo VARCHAR(255) NOT NULL,
	fecha_inicio DATE NOT NULL,
	fecha_fin DATE NOT NULL,
	idLugar integer NOT NULL REFERENCES lugar ON DELETE RESTRICT,
	url VARCHAR (200) NOT NULL
	);

CREATE TABLE profesors (
    id_prof BIGSERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	unique(name));
-- many to many
CREATE TABLE Publication_Profesor (
    pub_id integer REFERENCES publications,
    prof_id integer REFERENCES profesors,
    PRIMARY KEY (pub_id, prof_id)
);
CREATE TABLE Event_Profesor (
    event_id integer REFERENCES events,
    prof_id integer REFERENCES profesors,
    PRIMARY KEY (event_id, prof_id)
);