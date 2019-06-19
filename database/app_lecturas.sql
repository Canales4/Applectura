-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2019 a las 14:07:45
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_lecturas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `codAutor` int(11) NOT NULL,
  `nomAutor` varchar(60) NOT NULL,
  `apellidosAutor` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `autor`
--

INSERT INTO `autor` (`codAutor`, `nomAutor`, `apellidosAutor`) VALUES
(7, 'Rick Riordan', NULL),
(22, 'J. R. R. Tolkien', NULL),
(23, 'J.K. Rowling', NULL),
(24, 'Luke Bell', NULL),
(28, 'J. K. Rowling', NULL),
(29, 'Carl Potts, Mike Baron', NULL),
(30, 'Jeff Limke', NULL),
(31, 'Shannon Eric Denton', NULL),
(32, 'Sin autor', NULL),
(33, 'María Dueñas', NULL),
(35, 'autor no disponible', NULL),
(36, 'Gerard Way', NULL),
(37, 'Graham Percy', NULL),
(38, 'Walt Disney Company', NULL),
(39, 'Antoine de Saint-Exupéry', NULL),
(40, 'Christy Webster', NULL),
(41, 'Various', NULL),
(42, 'Kristen L. Depken', NULL),
(43, 'José Porfirio Miranda', NULL),
(44, 'Alejandro Tortolero', NULL),
(45, 'Nick Snels', NULL),
(46, 'Marvel Comics', NULL),
(47, 'Jonathan Maberry', NULL),
(48, 'DC Comics, Inc.', NULL),
(49, 'Stefan Petrucha', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `club`
--

CREATE TABLE `club` (
  `codClub` int(11) NOT NULL,
  `nomClub` varchar(200) NOT NULL,
  `presidente` int(11) DEFAULT NULL,
  `desClub` varchar(200) DEFAULT NULL,
  `privaClub` enum('privado','público') NOT NULL,
  `FecCreClub` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `generoClub` enum('Infantiles','Juveniles','Adulto','Acción y Aventuras','Fantasía','Ciencia Ficción','Cómics','Manga y Novela Gráfica','Histórica','Bibliografías y Memorias','Poesía','Teatro','Romántica','Erótica','Cómica','Dramática','Terror','Otros','Variado') DEFAULT 'Variado',
  `icono` varchar(200) NOT NULL DEFAULT 'assets/fogg-welcome-3.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `club`
--

INSERT INTO `club` (`codClub`, `nomClub`, `presidente`, `desClub`, `privaClub`, `FecCreClub`, `generoClub`, `icono`) VALUES
(21, 'Los comiqueros', 9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis dolor lacus. Duis imperdiet imperdiet libero ac sollicitudin. Mauris ut augue augue. Curabitur gravida convallis mi.', 'público', '2019-05-23 13:09:39', 'Adulto', 'http://images.fandango.com/MDCsite/images/featured/201401/dc%20universe.jpg'),
(30, 'Hogwarts', 10, 'Nos encanta Harry Potter.', 'público', '2019-05-27 11:54:40', 'Acción y Aventuras', 'assets/fogg-welcome-3.png'),
(31, 'Los Rohirrim', 9, 'Nos encanta el Señor de los anillos y el Hobbit.', 'público', '2019-05-27 12:11:08', 'Acción y Aventuras', 'https://vignette.wikia.nocookie.net/eldragonverde/images/0/07/Image-1437321986.jpg/revision/latest?cb=20150719160626&path-prefix=es');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criticas`
--

CREATE TABLE `criticas` (
  `codCritica` int(11) NOT NULL,
  `critica` varchar(500) NOT NULL,
  `puntos` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `codLectura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `criticas`
--

INSERT INTO `criticas` (`codCritica`, `critica`, `puntos`, `codLectura`) VALUES
(1, 'Me encanta el libro', 4, 23);

--
-- Disparadores `criticas`
--
DELIMITER $$
CREATE TRIGGER `puntuaciones` AFTER INSERT ON `criticas` FOR EACH ROW begin
 update libros
 set 
    numVotos = numVotos + 1,
    totalPuntos= totalPuntos + new.puntos,
    puntuacion = totalPuntos / numVotos 
    WHERE codLibro = 
	(SELECT Le.codLibro
FROM lecturas Le JOIN criticas C ON (Le.codLectura = C.codLectura)
WHERE C.codCritica = new.codCritica);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `quitaPuntos` BEFORE DELETE ON `criticas` FOR EACH ROW begin
 update libros set 
    numVotos = numVotos - 1,
    totalPuntos= totalPuntos - old.puntos,
    puntuacion = totalPuntos / numVotos 
	WHERE codLibro = 
    (SELECT Le.codLibro
FROM lecturas Le JOIN criticas C ON (Le.codLectura = C.codLectura)
WHERE C.codCritica = old.codCritica);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `codFavoritos` int(11) NOT NULL,
  `codLibro` int(11) NOT NULL,
  `codUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`codFavoritos`, `codLibro`, `codUsuario`) VALUES
(11, 3, 10),
(14, 1, 12),
(15, 1, 12),
(16, 1, 9),
(20, 23, 12),
(21, 24, 9),
(22, 23, 8),
(24, 30, 16),
(25, 31, 16),
(26, 32, 16),
(27, 23, 17),
(28, 33, 17),
(29, 34, 17),
(30, 35, 17),
(31, 23, 11),
(32, 1, 20),
(33, 1, 21),
(34, 41, 9),
(36, 1, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lecturas`
--

CREATE TABLE `lecturas` (
  `codLectura` int(11) NOT NULL,
  `codUsuario` int(11) NOT NULL,
  `codLibro` int(11) DEFAULT NULL,
  `estado` enum('Leido','Próxima lectura','Leyendo') NOT NULL DEFAULT 'Leido',
  `pagLec` int(20) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `lecturas`
--

INSERT INTO `lecturas` (`codLectura`, `codUsuario`, `codLibro`, `estado`, `pagLec`) VALUES
(1, 8, 1, 'Leido', 0),
(2, 8, 2, 'Leido', 0),
(3, 8, 3, 'Leido', 0),
(4, 8, 4, 'Leido', 0),
(5, 9, 5, 'Leido', 0),
(6, 9, 6, 'Leido', 0),
(7, 8, 7, 'Leido', 0),
(8, 8, NULL, 'Leido', 0),
(10, 9, 10, 'Leido', 0),
(11, 9, 11, 'Leido', 0),
(20, 10, 20, 'Leido', 0),
(21, 13, 21, 'Leido', 0),
(22, 13, 22, 'Leido', 0),
(23, 13, 23, 'Leido', 0),
(25, 12, 22, 'Leido', 0),
(26, 9, 24, 'Leyendo', 348),
(30, 12, 28, 'Leido', 0),
(31, 12, 29, 'Leido', 0),
(32, 16, 30, 'Leido', 0),
(33, 16, 31, 'Leido', 0),
(34, 16, 32, 'Leido', 0),
(35, 17, 33, 'Leido', 0),
(36, 17, 34, 'Leido', 0),
(37, 17, 35, 'Leido', 0),
(38, 10, 36, 'Leido', 0),
(39, 10, 37, 'Leido', 0),
(40, 10, 38, 'Leido', 0),
(41, 9, 39, 'Leido', 0),
(42, 9, 40, 'Leido', 0),
(43, 9, 41, 'Leido', 0),
(44, 9, 42, 'Leido', 0),
(45, 9, 43, 'Leido', 0),
(46, 10, 2, 'Leido', 0),
(47, 10, 3, 'Leido', 0),
(48, 10, 44, 'Leido', 0),
(49, 10, 45, 'Leido', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libromes`
--

CREATE TABLE `libromes` (
  `codLibroMes` int(11) NOT NULL,
  `mes` varchar(80) NOT NULL,
  `puntuacion` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `codLibro` int(11) DEFAULT NULL,
  `codClub` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `libromes`
--

INSERT INTO `libromes` (`codLibroMes`, `mes`, `puntuacion`, `codLibro`, `codClub`) VALUES
(6, 'mayo-2019', 0, 23, 21),
(8, 'abril-2019', 0, 20, 21),
(9, 'marzo-2019', 0, 22, 21),
(10, 'febrero-2019', 0, 37, 21),
(11, 'enero-2019', 0, 39, 21),
(16, 'mayo-2019', 0, 44, 30),
(17, 'abril-2019', 0, 45, 30),
(18, 'marzo-2019', 0, 1, 30),
(19, 'febrero-2019', 0, 7, 30),
(20, 'enero-2019', 0, 4, 30),
(21, 'mayo-2019', 0, 41, 31),
(22, 'abril-2019', 0, 10, 31),
(23, 'marzo-2019', 0, 6, 31),
(24, 'febrero-2019', 0, 5, 31),
(25, 'enero-2019', 0, 40, 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `codLibro` int(11) NOT NULL,
  `codAutor` int(11) DEFAULT NULL,
  `codTitulo` int(11) NOT NULL,
  `numVotos` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `totalPuntos` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `puntuacion` decimal(8,0) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`codLibro`, `codAutor`, `codTitulo`, `numVotos`, `totalPuntos`, `puntuacion`) VALUES
(1, 23, 1, 1, 3, '3'),
(2, 23, 2, 1, 3, '3'),
(3, 23, 3, 1, 3, '3'),
(4, 23, 4, 1, 3, '3'),
(5, 22, 5, 1, 3, '3'),
(6, 22, 6, 1, 3, '3'),
(7, 23, 7, 1, 3, '3'),
(10, 22, 10, 1, 3, '3'),
(11, 22, 11, 1, 3, '3'),
(20, 29, 20, 1, 3, '3'),
(21, 30, 21, 1, 3, '3'),
(22, 31, 22, 1, 3, '3'),
(23, 32, 23, 2, 7, '4'),
(24, 33, 24, 0, 0, '0'),
(28, 38, 29, 0, 0, '0'),
(29, 39, 30, 0, 0, '0'),
(30, 40, 31, 0, 0, '0'),
(31, 41, 32, 0, 0, '0'),
(32, 42, 33, 0, 0, '0'),
(33, 43, 34, 0, 0, '0'),
(34, 44, 35, 0, 0, '0'),
(35, 45, 36, 0, 0, '0'),
(36, 46, 37, 0, 0, '0'),
(37, 35, 38, 0, 0, '0'),
(38, 47, 39, 0, 0, '0'),
(39, 48, 40, 0, 0, '0'),
(40, 22, 41, 0, 0, '0'),
(41, 22, 42, 0, 0, '0'),
(42, 22, 43, 0, 0, '0'),
(43, 49, 44, 0, 0, '0'),
(44, 23, 45, 0, 0, '0'),
(45, 23, 46, 0, 0, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuacionlibmes`
--

CREATE TABLE `puntuacionlibmes` (
  `codPunLibMes` int(11) NOT NULL,
  `votoLibMes` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `totalVotos` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `totalPuntuacion` decimal(10,0) NOT NULL DEFAULT '0',
  `codSocio` int(11) NOT NULL,
  `codLibroMes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `codSocio` int(11) NOT NULL,
  `codUsuario` int(11) NOT NULL,
  `codClub` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `socios`
--

INSERT INTO `socios` (`codSocio`, `codUsuario`, `codClub`) VALUES
(43, 9, 21),
(44, 8, 21),
(46, 16, 21),
(49, 12, 21),
(50, 10, 21),
(51, 10, 30),
(53, 16, 30),
(54, 13, 30),
(55, 8, 30),
(56, 9, 31),
(57, 11, 31),
(58, 13, 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulo`
--

CREATE TABLE `titulo` (
  `codTitulo` int(11) NOT NULL,
  `ISBN` varchar(13) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `genero` enum('Acción y Aventuras','Fantasía','Ciencia Ficción','Comics, Manga y Novela Gráfica','Histórica','Bibliografías y Memorias','Poesía','Teatro','Romántica','Erótica','Cómica','Dramática','Terror','Otros') NOT NULL,
  `anoPublicacion` year(4) DEFAULT NULL,
  `portada` varchar(200) DEFAULT NULL,
  `paginas` int(200) DEFAULT NULL,
  `descripcion` varchar(2000) NOT NULL DEFAULT 'Sin descripción',
  `editorial` varchar(200) DEFAULT 'Sin Editorial',
  `idioma` varchar(80) NOT NULL DEFAULT 'ES'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `titulo`
--

INSERT INTO `titulo` (`codTitulo`, `ISBN`, `titulo`, `genero`, `anoPublicacion`, `portada`, `paginas`, `descripcion`, `editorial`, `idioma`) VALUES
(1, '9781781101353', 'Harry Potter y la Orden del Fénix', 'Fantasía', 2015, 'http://books.google.com/books/content?id=uUOBPgXQtvUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 928, 'Las vacaciones de verano aún no han acabado y Harry se encuentra más inquieto que nunca. Apenas ha tenido noticias de Ron y Hermione, y presiente que algo extraño está sucediendo en Hogwarts. No bien empieza el nuevo curso, sus temores se vuelven realidad: el Ministerio de Magia ha iniciado una campaña de desprestigio contra él y Dumbledore, para lo cual ha asignado a la horrible profesora Dolores Umbridge la tarea de vigilar sus movimientos. Y por si fuera poco, Harry sospecha que Voldemort es capaz de adivinar sus pensamientos con el fin de apoderarse de un objeto secreto que le permitiría recuperar su poder destructivo.', 'Pottermore Publishing', 'es'),
(2, '9781781101315', 'Harry Potter y la piedra filosofal', 'Fantasía', 2015, 'http://books.google.com/books/content?id=2zgRDXFWkm8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 264, 'Harry vive con sus horribles tíos y el insoportable primo Dudley, hasta que su ingreso en el Colegio Hogwarts de Magia y Hechicería cambia su vida para siempre. Allí aprenderá trucos y encantamientos fabulosos, y hará un puñado de buenos amigos... aunque también algunos temibles enemigos. Y, sobre todo, conocerá los secretos que lo ayudarán a cumplir con su destino.', 'Pottermore Publishing', 'es'),
(3, '9781781101322', 'Harry Potter y la cámara secreta', 'Fantasía', 2015, 'http://books.google.com/books/content?id=zl13g5uRM4EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 296, 'Mientras Harry espera impaciente en casa de sus insoportables tíos el inicio del segundo curso del Colegio Hogwarts de Magia y Hechicería, un elfo aparece en su habitación y le advierte de que una amenaza mortal se cierne sobre la escuela. Harry no se lo piensa dos veces y, acompañado de Ron, se dirige a Hogwarts en un coche volador. Allí, Harry oye extraños susurros en los pasillos desiertos y, de pronto... los ataques comienzan. La siniestra predicción del elfo parece hacerse realidad.', 'Pottermore Publishing', 'es'),
(4, '9781781101339', 'Harry Potter y el prisionero de Azkaban', 'Fantasía', 2015, 'http://books.google.com/books/content?id=2EaOj7-ozKgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 360, 'De la prisión de Azkaban se ha escapado un terrible villano, Sirius Black, un asesino en serie que fue cómplice de lord Voldemort y que, dicen los rumores, quiere vengarse de Harry por haber destruido a su maestro. Por si esto fuera poco, entran en acción los dementores, unos seres abominables capaces de robarles la felicidad a los magos y de eliminar todo recuerdo hermoso de aquellos que se atreven a acercárseles. El desafío es enorme, pero Harry, Ron y Hermione son capaces de enfrentarse a todo esto y mucho más.', 'Pottermore Publishing', 'es'),
(5, '9788445077917', 'El Señor de los Anillos, I. La Comunidad del Anillo', 'Fantasía', 2010, 'http://books.google.com/books/content?id=DYmUGGwZ8_oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', NULL, 'En la adormecida e idílica Comarca, un joven hobbit recibe un encargo: custodiar el Anillo Único y emprender el viaje para su destrucción en las Grietas del Destino. Consciente de la importancia de su misión, Frodo abandona la Comarca e inicia el camino hacia Mordor con la compañía de inesperada de Sam, Pippin y Merry. Pero sólo con la ayuda de Aragorn conseguirán vencer a los Jinetes Negros y alcanzar el refugio de la Casa de Elrond en Rivendel.', 'Grupo Planeta Spain', 'es'),
(6, '9788445077924', 'El Señor de los Anillos, II. Las Dos Torres', 'Fantasía', 2010, 'http://books.google.com/books/content?id=Yzaq2MRpjZkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', NULL, 'La Compañía se ha disuelto y sus integrantes emprenden caminos separados. Frodo y Sam continúan solos su viaje a lo largo del río Anduin, perseguidos por la sombra misteriosa de un ser extraño que también ambiciona la posesión del Anillo. Mientras, hombres, elfos y enanos se preparan para la batalla final contra las fuerzas del Señor del Mal.', 'Grupo Planeta Spain', 'es'),
(7, '9781781101346', 'Harry Potter y el cáliz de fuego', 'Fantasía', 2015, 'http://books.google.com/books/content?id=R2daemCCiF8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 672, 'Otro deplorable verano con los Dursley llega a su fin y Harry está impaciente por regresar a Hogwarts. A sus catorce años, sólo desea ser un joven mago como los demás y dedicarse a aprender nuevos sortilegios y asistir a los Mundiales de quidditch. Sin embargo, en Hogwarts le espera un desafío de grandes proporciones, por lo que tendrá que demostrar que ya no es un niño y que está preparado para vivir las nuevas y emocionantes experiencias que el futuro le depara.', 'Pottermore Publishing', 'es'),
(10, '9788445077931', 'El Señor de los Anillos, III. El Retorno del Rey', 'Fantasía', 2010, 'http://books.google.com/books/content?id=LvsQ34A1fOMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', NULL, 'Los ejércitos del Señor Oscuro van extendiendo cada vez más su maléfica sombra por la Tierra Media. Hombres, elfos y enanos unen sus fuerzas para presentar batalla a Sauron y sus huestes. Ajenos a estos preparativos, Frodo y Sam siguen adentrándose en el país de Mordor en su heroico viaje para destruir el Anillo de Poder en las Grietas del Destino.', 'Grupo Planeta Spain', 'es'),
(11, '9788445001288', 'Trilogía El Señor de los Anillos', 'Fantasía', 2012, 'http://books.google.com/books/content?id=q_P7oMO3lC4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', NULL, 'Concebida en un primer momento como una continuación de El Hobbit, acabó por convertirse en una historia independiente por derecho propio de mucho más alcance y extensión. En 1999 la trilogía de El Señor de los Anillos fue elegida como «Libro del Milenio» por los participantes de una encuesta de Amazon.com. En la adormecida e idílica Comarca, un joven hobbit recibe un encargo: custodiar el Anillo Único y emprender el viaje para su destrucción en las Grietas del Destino. Consciente de la importancia de su misión, Frodo abandona la Comarca e inicia el camino hacia Mordor con la compañía inesperada de Sam, Pippin y Merry. Pero sólo con la ayuda de Aragorn conseguirán vencer a los Jinetes Negros y alcanzar el refugio de la Casa de Elrond en Rivendel.', 'Grupo Planeta Spain', 'es'),
(19, '8478889957', 'Harry Potter y el misterio del príncipe', 'Fantasía', 2006, 'http://books.google.com/books/content?id=FsWwPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 602, '', 'Sin editorial', 'es'),
(20, '9781302505080', 'Punisher', 'Fantasía', 2018, 'http://books.google.com/books/content?id=E65bDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 392, 'Collects Shadowmasters #1-4, Punisher War Journal (1988) #1-3 and #8-9 and Punisher (1987) #24-25. In his relentless war on crime, the Punisher doesnt have many allies. But those he can rely on include the Shadowmasters! Theyre the latest in a long line of ninjas who have served as the protectors of Japans Iga Province for centuries. In the wake of World War II, U.S. Army Captain James Richards and Shadowmaster Shigeru Ezaki forge a friendship in battle. Years later, Ezaki has trained the two mens children  Philip, Sojin and Yuriko  in the ways of the ninja. Together, they must face the reborn menace of the Sunrise Society  which brings them into the murky world of the Punisher! Along with the Black Widow, can they fend off armored Sunrise assassins? Or will the eternal evil plague Frank Castle and the Shadowmasters once again?', 'Marvel Entertainment', 'en'),
(21, '9781580136549', 'Thor y Loki (Thor & Loki)', 'Fantasía', 2007, 'http://books.google.com/books/content?id=UUHFy43tEagC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 48, 'A retelling, in graphic novel form, of the myth of Thor and his brother Loki, who visit a land of giants in order to resolve their argument about brains vs. brawn.', 'ediciones Lerner', 'en'),
(22, '1602705690', 'Thor', 'Fantasía', 2010, 'http://books.google.com/books/content?id=Rs1QlPhopiYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 32, 'Tells the legendary story of Thor, the Norse god of thunder, and his adventures with his brothers Hoor and Baldur, his role in the great battle Ragnarok, and his powerful hammer that had the power to create lightning.', 'ABDO', 'en'),
(23, '1302913611', 'Thor: Heroes Return Omnibus', 'Fantasía', 2018, 'http://books.google.com/books/content?id=VnQktQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 1304, 'When Odin falls, Thor rises! But as the Thunder God takes the Throne of Asgard and faces Desak, Destroyer of Pantheons, Earth is left in the hands of the untested Tarene! Now possessed of the Odinforce, Thor is more powerful than ever, but his new crown weighs heavily - as does his feeling of responsibility to Midgard. An extreme solution brings Asgard to Earth and inadvertently ignites a new religion...but when Iron Man and Captain America try to intervene, will Thor turn his back on the Avengers for good? And how far will Thor go to save mankind? The answer lies in the future...and the ascent of Thor, Lord of Earth! But as Ragnarok approaches in the present, Asgard may well burn! COLLECTING: THOR (1998) 36-85, ANNUAL 2001; IRON MAN (1998) 64; AVENGERS (1998) 63; MATERIAL FROM MARVEL DOUBLE-SHOT 1', 'Marvel', 'en'),
(24, '9788499981970', 'Misión Olvido', 'Fantasía', 2012, 'http://books.google.com/books/content?id=Ocw4hiMq1YYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 511, 'Incapaz de recomponer sus propios pedazos y con el fin de despegarse de su ayer, la profesora Blanca Perea acepta a la desesperada lo que anticipa como un tedioso proyecto académico en una insignificante universidad californiana. El campus que la acoge resulta, sin embargo, mucho más seductor de lo previsto. La catalogación del legado de su viejo compatriota Andrés Fontana dista enormemente de ser tan insustancial como prometía. Y cuando el carismático Daniel Carter entra en su vida, todo adquiere una nueva dimensión. Amores cruzados, certezas a medias e intereses silenciados que acabarán por salir a la luz. Desde los viejos franciscanos que fundaron las míticas misiones californianas a los hispanistas y escritores exiliados que a pesar de la nostalgia nunca lograron regresar. Con todos ellos entreverados en la propia historia de Blanca, Misión Olvido compone una narración intrigante, emotiva e intensamente humana.', 'Grupo Planeta Spain', 'es'),
(29, '8444160644', 'El Rey León', 'Fantasía', 2008, 'http://books.google.com/books/content?id=DCJ1QwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 32, 'Mi Mundo Disney es una colección de historias basadas en películas y personajes Disney adaptadas para lectores a partir de los 3 años. Contadas con textos breves y muy sencillos e impresas en letra manuscrita, son ideales para facilitar la lectura de quienes empiezan a leer.', 'Sin editorial', 'es'),
(30, '9788862777568', 'El Principito', 'Fantasía', 2015, 'http://books.google.com/books/content?id=N0P6CAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 97, 'Han pasado numerosas decenas de años desde su publicación pero el principito sigue encantando. Como en esta espléndida versión Ebook enriquecida por numerosas ilustraciones a color. Representando los personajes inolvidables de esta estupenda fábula y emocionante, dedicada a los niños de todas las edades, creada desde el talento y la fantasía de Antonie de Saint Exupéry. Traducción por Sheila Gutiérrez Toranzo', 'GOODmood', 'es'),
(31, '0375971343', 'Surprise for Pocoyo (Pocoyo)', 'Fantasía', 2012, 'http://books.google.com/books/content?id=LtkynwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 32, 'Pocoyo\'s friends prepare a surprise party for him.', 'Random House Books for Young Readers', 'en'),
(32, '8408135961', 'Pocoyo Emociones/ Pocoyo Feelings', 'Fantasía', 2015, 'http://books.google.com/books/content?id=oxtWrgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 12, 'Pocoyo explains different emotions in a way young children will understand.', 'Planeta-Espana', 'en'),
(33, '9780307981486', 'Pocoyo Dance (Pocoyo)', 'Fantasía', 2012, 'http://books.google.com/books/content?id=Uqc6RjPM_LcC&printsec=frontcover&img=1&zoom=1&source=gbs_api', 24, 'Pocoyo and his friends show off their dance moves in this full-color storybook based on an episode of the popular Pocoyo TV series. Perfect for boys and girls ages 2-5!', 'Random House Books for Young Readers', 'en'),
(34, '9682314860', 'Comunismo en la Biblia', 'Fantasía', 1988, 'http://books.google.com/books/content?id=HMScIyWkD30C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 86, 'La investigación bíblica precisa tiene la ventaja de ir a la raíz del cristianismo para rebatir desde allí las interpretaciones oficiales que, defendiendo el establishment, ocultan íla exigencia divina de justiciaî como elemento constante de la Biblia.', 'Siglo XXI', 'es'),
(35, '9786073000413', 'Notarios y agricultores', 'Fantasía', 2008, 'http://books.google.com/books/content?id=MOLRq22CUdYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 328, '', 'Siglo XXI', 'es'),
(36, '9781532750007', 'Tractores libro para colorear 1', 'Fantasía', 2016, 'http://books.google.com/books/content?id=PcH7CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 104, 'Una colección de 50 tipos diferentes de tractores. Antiguos, nuevos, con todo tipo de equipamiento. Jóvenes y mayores disfrutarán de este libro para colorear de tractores. El arte es como un arco iris, infinito y de colores brillantes. ¡Alimenta la mente creativa de tu hijo y diviértete! Cada imagen se imprime en su propia página de 8,5 x 11 pulgadas, así que no hay que preocuparse por las manchas.', 'ColoringArtist.com', 'es'),
(37, '9781302494964', 'Punisher War Journal Classic Vol. 1', 'Fantasía', 2016, 'http://books.google.com/books/content?id=xzsoDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', NULL, 'Collects Punisher War Journal (1988) #1-8. Angry and dangerous loners are famed for keeping journals, and Frank Castle is no exception! The Punisher confronts deadly enemies from both war and peacetime, but a vacation in Africa introduces him to a far different legacy of the past: dinosaurs! But the wild man waiting to throw down on him is no throwback. It\'s Wolverine! Guns vs. claws for the historic first time! Guest-starring Daredevil!', 'Marvel Entertainment', 'en'),
(38, '0785124659', 'Punisher Presents', 'Fantasía', 2007, 'http://books.google.com/books/content?id=xYSEtQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 120, 'What? You didn\'t actually think that a load of buckshot to the chest in shark-infested waters was gonna put him down for good, did you? The Punisher\'s wildest foe is back...give or take a few boy parts - this time he\'s embarking on a solo mission: playing bodyguard to the son of a dangerous mob boss. Should be a breeze for a guy who went toe-to-toe with Frank Castle and lived to tell about it, right? Guess again. Junior is a hemophiliac - and every crime syndicate in the country can\'t wait to take a shot at him as payback to his dad. To survive, Barracuda will have to navigate hitmen, corrupt cops, black ops, a Central American strongman and rescue a damsel in distress. No kidding. Collects Punisher Presents: Barracuda MAX #1-5.', 'Marvel', 'en'),
(39, '9780785179009', 'Marvel Universe Vs. The Punisher', 'Fantasía', 2011, 'http://books.google.com/books/content?id=FpDh-n1qLQQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 112, 'Collects Marvel Universe vs Punisher #1-4. A terrible plague has swept the Earth, turning everyone into sadistic cannibal predators, including heroes like Spider-Man and the Hulk. Now, five years later, one man stands against the hordes of monsters who hunt the night. He is the Punisher, the Last Gun on Earth. And he has an endless supply of ammunition.', 'Marvel Entertainment', 'en'),
(40, '1401267297', 'Wonder Woman', 'Fantasía', 2016, 'http://books.google.com/books/content?id=gQKpAQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 96, 'Now you can color DC Comics and all of its most popular characters your way with COLORING DC: WONDER WOMAN! DC Comics presents this iconic hero in a whole new way: in black and white, on heavy stock suitable for coloring! DC\'s Amazon Warrior stars in a new coloring book focusing on her greatest covers, splash pages and more by some of comics\' top artists! This graphic novel features classic illustrations from some of the most well known Wonder Woman artists of all time, including George Pérez, Jim Lee, Brian Bolland, Amanda Conner, Ross Andru, H.G. Peter, Cliff Chiang, Phil Jimenez and more!', 'COLOURING BOOKS', 'en'),
(41, '6070724143', 'El Hobbit (Mti)', 'Fantasía', 2017, 'http://books.google.com/books/content?id=1BiAAQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 288, 'Smaug parec�a profundamente dormido cuando Bilbo espi� una vez m�s desde la entrada. Pero fing�a. Estaba vigilando la entrada del t�nel... Sacado de su c�modo agujero-hobbit por Gandalf y una banda de enanos, Bilbo se encuentra de pronto en medio de una conspiraci�n que pretende apoderarse del tesoro de Smaug el Magn�fico, un enorme y muy peligroso drag�n...', 'Planeta Publishing', 'es'),
(42, '9788445005187', 'Beren y Lúthien', 'Fantasía', 2018, 'http://books.google.com/books/content?id=9EJMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', NULL, 'El relato de Beren y Lúthien era, o se convirtió, en un elemento esencial en la evolución de El Silmarillion, los mitos y leyendas de la Primera Edad del Mundo concebidos por J. R. R. Tolkien. El autor escribió el relato durante el año siguiente a su regreso de Francia y de la batalla del Somme a finales de 1916. Esencial para la historia y sin haber sido nunca alterado, el elemento central del relato es el destino que ensombrece el amor de Beren y Lúthien, dado que Beren era un hombre mortal y Lúthien una Elfa inmortal, cuyo padre, un gran señor Elfo, en clara oposición a Beren, impuso a éste una tarea imposible que debía llevar a cabo si quería desposar a Lúthien. Éste es el núcleo de la leyenda, que acaba conduciendo al absolutamente heroico intento de Beren y Lúthien de robarle un Silmaril al más malvado de todos los seres: Melkor, también llamado Morgoth, el Enemigo Oscuro. En este libro Christopher Tolkien ha intentado extraer la historia de Beren y Lúthien de la extensa obra en la cual estaba entretejida. Para ilustrar una parte del proceso a través del cual este «Gran Relato» de la Tierra Media evolucionó a través de los años, Christopher ha narrado la historia en palabras de su padre ofreciendo, en primer lugar, su forma original, y a continuación pasajes en prosa y verso de textos posteriores que ilustran cómo ha cambiado la narrativa.', 'Minotauro', 'es'),
(43, '9788499324456', 'El Silmaríl·lion', 'Fantasía', 2011, 'http://books.google.com/books/content?id=qeGoD20qHGIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 464, 'El Silmaríl·lion, publicat quatre anys després de la mort de Tolkien, recull els relats dels Dies de l\'Antigor o Primera Edat del Món. El cor d\'aquesta història és la creació dels tres Silmarils per En Fèanor i la pèrdua d\'aquests en mans de Mórgoht; al voltant d\'aquest fet tenen lloc altres esdeveniments, com l\'arribada d\'Elfs i Homes a la Terra. Hi coneixem també personatges com Mélkor, els Nóldor i Na Lúthien, entre d\'altres.El Silmaríl·lion ofereix al lector la possibilitat de completar l\'univers imaginari d\'El Hòbbit i d\'El Senyor dels Anells amb un relat escrit en el més pur estil Tolkien.', 'Grupo Planeta Spain', 'ca'),
(44, '9781785659874', 'Spider-Man', 'Fantasía', 2018, 'http://books.google.com/books/content?id=f950DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 368, 'Sixth title in Titan Books’ Marvel fiction reissue program, featuring the Spider-Man story, Forever Young. Take a swing through Spider-Man’s past! Hoping to snag some rent-paying photos of his arachnid-like alter ego in action, Peter Parker goes looking for trouble—and finds it in the form of a mysterious, mythical stone tablet coveted by both the Kingpin and the Maggia. Caught in the crosshairs of New York’s most nefarious villains, Peter also runs afoul of his friends—and the police! His girlfriend, Gwen Stacy, isn’t too happy with him, either. And the past comes back to haunt him years later when the Maggia’s assumed-dead leader resurfaces, still in pursuit of the troublesome tablet. Plus: With Aunt May at death’s door, has the ol’ Parker luck disappeared for good? A novel based on the classic “Stone Tablet Saga,” adapted and expanded for the present day.', 'Titan Books', 'en'),
(45, '9781781102701', 'Harry Potter y Las Reliquias de la Muerte', 'Fantasía', 2015, 'http://books.google.com/books/content?id=Pd4Hy4Y-d9MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 704, 'La fecha crucial se acerca. Cuando cumpla los diecisiete, Harry perderá el encantamiento protector que lo mantiene a salvo. El anunciado combate a muerte con Voldemort es inminente, y la casi imposible misión de encontrar y destruir los Horrocruxes restantes es más urgente que nunca. Ha llegado el momento de tomar las decisiones más difíciles. Harry debe abandonar la calidez y seguridad de La Madriguera para emprender sin miedo ni vacilaciones el inexorable sendero trazado para él. Consciente de lo mucho que está en juego, sólo dentro de sí mismo encontrará la fuerza que lo impulsará en la vertiginosa carrera hacia un destino desconocido.', 'Pottermore Publishing', 'es'),
(46, '9781781101360', 'Harry Potter y el misterio del príncipe', 'Fantasía', 2015, 'http://books.google.com/books/content?id=uZDYlfDVYmEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 576, 'En medio de graves acontecimientos que asolan el país, Harry inicia su sexto curso en Hogwarts. El equipo de quidditch, los exámenes y las chicas lo mantienen ocupado, pero la tranquilidad dura poco. A pesar de los férreos controles de seguridad, dos alumnos son brutalmente atacados. Dumbledore sabe que, tal como se anunciaba en la Profecía, Harry y Voldemort han de enfrentarse a muerte. Así pues, para intentar debilitar al enemigo, el anciano director y el joven mago emprenderán juntos un peligroso viaje con la ayuda de un viejo libro de pociones perteneciente a un misterioso personaje, alguien que se hace llamar Príncipe Mestizo.', 'Pottermore Publishing', 'es');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `codUsuario` int(11) NOT NULL,
  `nomUsuario` varchar(50) NOT NULL,
  `apellido1` varchar(60) NOT NULL,
  `apellido2` varchar(60) DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `contrasena` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `icono` varchar(255) DEFAULT 'assets/fogg-coffee-break.png',
  `visibilidad` enum('Público','Privado','Solo Club') NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bio` varchar(255) DEFAULT NULL,
  `sexo` enum('Mujer','Hombre','Otro') NOT NULL,
  `alias` varchar(25) DEFAULT NULL,
  `fechaNac` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`codUsuario`, `nomUsuario`, `apellido1`, `apellido2`, `email`, `contrasena`, `icono`, `visibilidad`, `fechaRegistro`, `bio`, `sexo`, `alias`, `fechaNac`) VALUES
(8, 'Manuel', 'Jamón', 'Ensalada', 'manuel@gmail.com', '1234', 'https://i.blogs.es/fde934/harry-potter/450_1000.jpg', 'Público', '2019-05-07 10:22:10', 'Hola', 'Hombre', 'Manolito', ''),
(9, 'Eva', 'Pérez', 'Domínguez', 'eva@gmail.com', '1234', 'https://i1.wp.com/yeswepet.com/wp-content/uploads/2017/01/sin-perfil.png?ssl=1', 'Público', '2019-05-07 11:06:11', 'Me gusta mucho Harry Potter', 'Mujer', 'Eva_PD', '1967-7-13'),
(10, 'Merche', '', '', 'm@gmail.com', '1234', '', 'Público', '2019-05-09 06:53:27', '', 'Mujer', '', ''),
(11, 'Laura', 'del Pino', 'Heredia', 'laura@gmail.com', 'laura', 'https://avatars1.githubusercontent.com/u/35364391?s=460&v=4', 'Público', '2019-05-09 06:54:32', 'Me gustan las aventuras', 'Mujer', 'laurita', '2000-4-27'),
(12, 'rosa', '', '', 'rosa@gmail.com', '123456', 'http://www.modaguapa.com/wp-content/uploads/2014/01/ScreenHunter_01-Jan.-14-13.41.jpg', 'Público', '2019-05-09 06:55:55', '', '', '', ''),
(13, 'Paula', '', '', 'paula@gmail.com', '1234', '', 'Público', '2019-05-09 07:13:11', '', '', '', ''),
(14, 'romeo', '', '', 'romeo@gmail.com', '1234', '', 'Público', '2019-05-21 09:56:43', '', '', '', ''),
(15, 'Prueba1', '', '', 'Prueba1@gmail.com', '1234', '', 'Público', '2019-05-22 07:13:15', '', '', '', ''),
(16, 'Jose Antonio', 'Amarillo', 'Rojo', 'JO@gmail.com', '1234', 'https://www.pocoyo.com/_site_v6/assets/images/html/series/cover-temporada1.png', 'Público', '2019-05-23 11:13:28', 'Soy un gran fan de Pocoyo', 'Hombre', 'Jepeto', ''),
(17, 'Iván', 'Pérez', 'Molina', 'ivan.2000@gmail.com', '1234', 'https://avatars0.githubusercontent.com/u/43571201?s=460&v=4', 'Público', '2019-05-23 11:45:52', 'Soy un gran aficionado a la lectura, me encanta la política y soy de Rute', 'Hombre', 'Hiroshi_8', ''),
(18, 'almansor', '', '', 'a@gmail.com', '1234', '', 'Público', '2019-05-27 10:42:24', '', '', '', ''),
(19, 'federiko perez', '', '', 'f@gmail.com', '1234', '', 'Público', '2019-05-27 10:44:37', '', '', '', ''),
(20, 'malito', '', '', 'malito@gmail.com', '1234', '', 'Público', '2019-05-27 10:50:55', '', '', '', ''),
(21, 'federiko perez', '', '', 'gfh@gmail.com', '1234', '', 'Público', '2019-05-27 11:32:29', '', '', '', ''),
(22, 'hsduiohsdi', '', '', 'juicio@gmail.com', '1234', '', 'Público', '2019-05-27 12:03:40', '', '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`codAutor`);

--
-- Indices de la tabla `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`codClub`),
  ADD KEY `fk_Presidente1` (`presidente`);

--
-- Indices de la tabla `criticas`
--
ALTER TABLE `criticas`
  ADD PRIMARY KEY (`codCritica`),
  ADD KEY `fk_Criticas1` (`codLectura`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`codFavoritos`),
  ADD KEY `fk_Favoritos_Libros1` (`codLibro`),
  ADD KEY `fk_Favoritos_Usuario1` (`codUsuario`);

--
-- Indices de la tabla `lecturas`
--
ALTER TABLE `lecturas`
  ADD PRIMARY KEY (`codLectura`),
  ADD KEY `fk_Lectura_Usuario1` (`codUsuario`),
  ADD KEY `fk_Lectura_Libros1` (`codLibro`);

--
-- Indices de la tabla `libromes`
--
ALTER TABLE `libromes`
  ADD PRIMARY KEY (`codLibroMes`),
  ADD KEY `fk_LibroMes_Libros1` (`codLibro`),
  ADD KEY `fk_LibroMes_Club1` (`codClub`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`codLibro`),
  ADD KEY `fk_Libros_Autor` (`codAutor`),
  ADD KEY `fk_Libros_Titulo1` (`codTitulo`);

--
-- Indices de la tabla `puntuacionlibmes`
--
ALTER TABLE `puntuacionlibmes`
  ADD PRIMARY KEY (`codPunLibMes`),
  ADD KEY `fk_PuntuacionLibMes_Socios1` (`codSocio`),
  ADD KEY `fk_PuntuacionLibMes_LibroMes1` (`codLibroMes`);

--
-- Indices de la tabla `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`codSocio`),
  ADD KEY `fk_Socios_Usuario1` (`codUsuario`),
  ADD KEY `fk_Socios_Club1` (`codClub`);

--
-- Indices de la tabla `titulo`
--
ALTER TABLE `titulo`
  ADD PRIMARY KEY (`codTitulo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codUsuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `codAutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `club`
--
ALTER TABLE `club`
  MODIFY `codClub` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `criticas`
--
ALTER TABLE `criticas`
  MODIFY `codCritica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `codFavoritos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `lecturas`
--
ALTER TABLE `lecturas`
  MODIFY `codLectura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `libromes`
--
ALTER TABLE `libromes`
  MODIFY `codLibroMes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `codLibro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `puntuacionlibmes`
--
ALTER TABLE `puntuacionlibmes`
  MODIFY `codPunLibMes` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `socios`
--
ALTER TABLE `socios`
  MODIFY `codSocio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `titulo`
--
ALTER TABLE `titulo`
  MODIFY `codTitulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `codUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `club`
--
ALTER TABLE `club`
  ADD CONSTRAINT `fk_Presidente1` FOREIGN KEY (`presidente`) REFERENCES `usuario` (`codUsuario`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `criticas`
--
ALTER TABLE `criticas`
  ADD CONSTRAINT `fk_Criticas1` FOREIGN KEY (`codLectura`) REFERENCES `lecturas` (`codLectura`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `fk_Favoritos_Libros1` FOREIGN KEY (`codLibro`) REFERENCES `libros` (`codLibro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Favoritos_Usuario1` FOREIGN KEY (`codUsuario`) REFERENCES `usuario` (`codUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lecturas`
--
ALTER TABLE `lecturas`
  ADD CONSTRAINT `fk_Lectura_Libros1` FOREIGN KEY (`codLibro`) REFERENCES `libros` (`codLibro`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_Lectura_Usuario1` FOREIGN KEY (`codUsuario`) REFERENCES `usuario` (`codUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `libromes`
--
ALTER TABLE `libromes`
  ADD CONSTRAINT `fk_LibroMes_Club1` FOREIGN KEY (`codClub`) REFERENCES `club` (`codClub`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_LibroMes_Libros1` FOREIGN KEY (`codLibro`) REFERENCES `libros` (`codLibro`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `fk_Libros_Autor` FOREIGN KEY (`codAutor`) REFERENCES `autor` (`codAutor`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_Libros_Titulo1` FOREIGN KEY (`codTitulo`) REFERENCES `titulo` (`codTitulo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `puntuacionlibmes`
--
ALTER TABLE `puntuacionlibmes`
  ADD CONSTRAINT `fk_PuntuacionLibMes_LibroMes1` FOREIGN KEY (`codLibroMes`) REFERENCES `libromes` (`codLibroMes`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_PuntuacionLibMes_Socios1` FOREIGN KEY (`codSocio`) REFERENCES `socios` (`codSocio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `socios`
--
ALTER TABLE `socios`
  ADD CONSTRAINT `fk_Socios_Club1` FOREIGN KEY (`codClub`) REFERENCES `club` (`codClub`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Socios_Usuario1` FOREIGN KEY (`codUsuario`) REFERENCES `usuario` (`codUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
