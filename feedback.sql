-- phpMyAdmin SQL Dump
-- version 3.4.4
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Мар 06 2014 г., 15:26
-- Версия сервера: 5.1.53
-- Версия PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `hm_test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `feedback`
--

CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `feedback_name` varchar(1000) NOT NULL,
  `feedback_email` varchar(1000) NOT NULL,
  `feedback_message` varchar(5000) NOT NULL,
  `feedback_ip` varchar(100) NOT NULL,
  `feedback_browser` varchar(300) CHARACTER SET ucs2 NOT NULL,
  `feedback_date` varchar(150) NOT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `feedback_name`, `feedback_email`, `feedback_message`, `feedback_ip`, `feedback_browser`, `feedback_date`) VALUES
(1, 'fsdfds', '', 'fdsfdsf', '127.0.0.1', '', '1393934200'),
(2, 'dsfdsf', '', 'dsfdsfds', '127.0.0.1', '', '1393934347'),
(3, 'gfdgfdgfdgdf', '', 'gfdgfdgfdgdf', '127.0.0.1', '', '1393934493'),
(4, 'fdsfdsf', 'dfdsfds', 'fdsfds', '127.0.0.1', '', '1393934530'),
(5, 'Гурген', 'выфвыфв', 'выфвыфв \nвыфвыф\nвыфвыфвыфв', '127.0.0.1', '', '1393934619'),
(6, 'ffdfdsfdsfdsfdsf', 'dfdsfdsfds', 'dsfdsfdsfds', '127.0.0.1', '', '1393935935'),
(7, '', '', '', '127.0.0.1', '', '1394081502'),
(8, '', '', '', '127.0.0.1', '', '1394082278'),
(9, 'fdsfdsf', '', '', '127.0.0.1', '', '1394082434'),
(10, '', '', '', '127.0.0.1', '', '1394082541'),
(11, '', '', '', '', '', ''),
(12, '', '', '', '', '', ''),
(13, '', '', '', '127.0.0.1', '', '1394085086'),
(14, 'fdsfds', 'fds', 'fdsds', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17', '1394085246'),
(15, 'fdsf''dsad""/''''das''''das''d''"/"''''/''''"dsadsa', '"/''''''//dasdas"//"''d''""''d', 'sdsadsad"//"''''''*dsadsa d''D/;;::dll""''''''//''/''''', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17', '1394085359');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
