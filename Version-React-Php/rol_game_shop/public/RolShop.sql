-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-03-2023 a las 13:50:25
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `RolShop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Notices`
--

CREATE TABLE `Notices` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `body` text NOT NULL,
  `image` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Notices`
--

INSERT INTO `Notices` (`id`, `title`, `body`, `image`) VALUES
(1, '¡REIMPRESIÓN! Ya puedes volver a jugar con Hombre Lobo: Edición Bolsillo', 'Vuelve la edición más cómoda, económica y ligera para luchar contra el Wyrm. Vuelve Hombre Lobo 20º Aniversario Edición Bolsillo.', 'hombre-lobo.jpg'),
(2, 'La Vida en Elysium', 'Mutant: Elysium es la tercera gran expansión del aclamado juego de rol Mutant: Year Zero, aunque puede usarse de forma independiente. Este juego narra el origen de los humanos de los enclaves, que se consideran a sí mismos los últimos adalides de la civilización humana. Warburg, Fortescue, Morningstar y Kilgore son las cuatro Casas que luchan por la hegemonía en Elysium I, ajenas al poder creciente que amenaza con acabar para siempre con su reinado.', 'mutant.jpg'),
(3, '¡Lanzamiento! Ya puedes jugar con Trampas Traicioneras, para tus juegos de rol con reglas de SRD5', 'Trampas Traicioneras es un recurso increíble para los directores de juego que buscan sacar más provecho al crear sus mazmorras. Contiene más de 250 trampas prefabricadas de diferente nivel y letalidad para que siempre tengas a mano la trampa perfecta para desafiar a tus jugadores.', 'trampas-traicioneras.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `title` varchar(15) NOT NULL,
  `image` varchar(20) NOT NULL,
  `text` text NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Products`
--

INSERT INTO `Products` (`id`, `title`, `image`, `text`, `price`) VALUES
(1, 'D100', 'D100.jpeg', '¿Demasiadas decisiones y muy pocas caras en tus dados? Pues con este dado se acabo ese problema!', 10),
(2, 'D20', 'D20.jpg', 'Magnifico dado D20 para jugar tus partidas de rol con la mejor suerte posible!', 7),
(3, 'D10', 'D10.jpg', 'Para tus partidas más intensas, nunca sabras cuando vas a necesitar un numero aleatorio del 0 al 9', 6),
(4, 'D8', 'D8.jpg', '¿Te gustan los prismas que pueden decidir tu destino? ¡Pues este es tu dado!', 7),
(5, 'D6', 'D6.jpg', 'Clásico donde los haya, con el puedes jugar tanto rol como a la oca', 4),
(6, 'D4', 'D4.jpg', '¡El favorito de los egipcios!', 3),
(7, 'D2', 'D2.jpg', '¿No te gusta usar monedas para decidir? Ahora tienes una mejor opción!', 2),
(8, 'Manual D&D', 'manuald&d.jpg', 'El manual que todo Dungeon Master deberia tener siempre a mano', 33),
(9, 'Set de figuras', 'setfiguras.jpg', 'Figuras perfectas para poder representar a tu clase de rol favorita en en mapa de juego!', 69);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Users`
--

CREATE TABLE `Users` (
  `nick` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(35) NOT NULL,
  `email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Users`
--

INSERT INTO `Users` (`nick`, `pass`, `name`, `surname`, `email`) VALUES
('Anonimo', 'null', 'Anonimo', 'Anon', 'null'),
('pedro', 'admin', 'Pedro José', 'Moldenhauer López', 'pmollop@g.educaand.es'),
('pepe', 'admin', 'pepe', 'lopez', 'pepe@hotmail.com'),
('pepe2', 'admin', 'pepe', 'lopez', 'pepe2@hotmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Notices`
--
ALTER TABLE `Notices`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`nick`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Notices`
--
ALTER TABLE `Notices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
