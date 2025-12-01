CREATE TABLE usuarios (
	id serial primary key,
    	nome varchar(50) not null,
    	email varchar(50) not null,
	senha varchar(100)not null
);

CREATE TABLE contatos (
	id serial primary key,
    	usuarioId integer references usuarios (id),
    	nome varchar(50) not null,
	celularpessoal varchar(15),
	celulartrabalho varchar(15),
	emailpessoal varchar(50),
	emailtrabalho varchar(50),
	linkedin varchar(100),
	facebook varchar(100),
	telegram varchar(100)
);