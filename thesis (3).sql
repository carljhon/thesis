-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2023 at 11:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thesis`
--

-- --------------------------------------------------------

--
-- Table structure for table `1a`
--

CREATE TABLE `1a` (
  `id` int(10) NOT NULL,
  `child_fname` varchar(50) NOT NULL,
  `child_mname` varchar(50) NOT NULL,
  `child_lname` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `place_of_birth` varchar(500) NOT NULL,
  `birthday` varchar(50) NOT NULL,
  `date_of_registration` varchar(50) NOT NULL,
  `m_fname` varchar(50) NOT NULL,
  `m_mname` varchar(10) NOT NULL,
  `m_lname` varchar(50) NOT NULL,
  `m_nationality` varchar(20) NOT NULL,
  `f_fname` varchar(50) NOT NULL,
  `f_mname` varchar(10) NOT NULL,
  `f_lname` varchar(50) NOT NULL,
  `f_nationality` varchar(20) NOT NULL,
  `date_of_merriage` varchar(50) NOT NULL,
  `place_of_merriage` varchar(500) NOT NULL,
  `issuedto` varchar(50) NOT NULL,
  `issuedToID` varchar(20) NOT NULL,
  `schedule` varchar(50) NOT NULL,
  `proced` varchar(10) NOT NULL,
  `done` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `2a`
--

CREATE TABLE `2a` (
  `id` int(10) NOT NULL,
  `d_fname` varchar(50) NOT NULL,
  `d_mname` varchar(50) NOT NULL,
  `d_lname` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `place_of_death` varchar(50) NOT NULL,
  `date_of_death` varchar(50) NOT NULL,
  `m_fname` varchar(50) NOT NULL,
  `m_mname` varchar(50) NOT NULL,
  `m_lname` varchar(50) NOT NULL,
  `m_nationality` varchar(50) NOT NULL,
  `f_fname` varchar(50) NOT NULL,
  `f_mname` varchar(50) NOT NULL,
  `f_lname` varchar(50) NOT NULL,
  `f_nationality` varchar(50) NOT NULL,
  `issuedto` varchar(50) NOT NULL,
  `issuedToId` varchar(50) NOT NULL,
  `schedule` varchar(50) NOT NULL,
  `proced` varchar(50) NOT NULL,
  `done` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `3a`
--

CREATE TABLE `3a` (
  `id` int(10) NOT NULL,
  `h_fname` varchar(50) NOT NULL,
  `h_mname` varchar(50) NOT NULL,
  `h_lname` varchar(50) NOT NULL,
  `h_age` varchar(10) NOT NULL,
  `h_nationality` varchar(50) NOT NULL,
  `h_civil_status` varchar(50) NOT NULL,
  `h_f_fname` varchar(50) NOT NULL,
  `h_f_mname` varchar(50) NOT NULL,
  `h_f_lname` varchar(50) NOT NULL,
  `h_m_fname` varchar(50) NOT NULL,
  `h_m_mname` varchar(50) NOT NULL,
  `h_m_lname` varchar(50) NOT NULL,
  `w_fname` varchar(50) NOT NULL,
  `w_mname` varchar(50) NOT NULL,
  `w_lname` varchar(50) NOT NULL,
  `w_age` varchar(10) NOT NULL,
  `w_nationality` varchar(50) NOT NULL,
  `w_civil_status` varchar(50) NOT NULL,
  `w_f_fname` varchar(50) NOT NULL,
  `w_f_mname` varchar(50) NOT NULL,
  `w_f_lname` varchar(50) NOT NULL,
  `w_m_fname` varchar(50) NOT NULL,
  `w_m_mname` varchar(50) NOT NULL,
  `w_m_lname` varchar(50) NOT NULL,
  `date_of_registration` varchar(50) NOT NULL,
  `date_of_marriage` varchar(50) NOT NULL,
  `place_of_marriage` varchar(100) NOT NULL,
  `issued_to` varchar(50) NOT NULL,
  `issued_to_id` varchar(20) NOT NULL,
  `schedule` varchar(50) NOT NULL,
  `proced` varchar(50) NOT NULL,
  `done` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(10) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `mname` varchar(50) NOT NULL,
  `bday` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `pass` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `lname`, `fname`, `mname`, `bday`, `gender`, `address`, `email`, `username`, `pass`, `phone`, `status`) VALUES
(21, 'amasan', 'carl jhon', 'manguilimutan', '2023-05-04', 'female', 'masagana, pandi, bulacan', 'carljhonamasan01@gmail.com', 'carljhon_01', '$2b$10$JU2OIOkoYDDPqDgJdOEIseKEmLe.NNsZJU5qp78c4pAKuQNX0vyYu', '0908785391', ''),
(25, 'Shien', 'Aaron', 'A.', '2002-01-22', 'male', 'masagana, pandi, bulacan', 'siaaaron9@gmail.com', 'aaron222', '$2b$10$8t5mCHoqxZ2wIEZM0MDcf.yoTg8NWGKmdsR0lTClrwfr.PAZvE1Dy', '0908785391', '');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1236540987, 'Ace555', 'Ace1233215');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(50) NOT NULL,
  `sender_id` varchar(15) NOT NULL,
  `message` text NOT NULL,
  `message_date` varchar(100) NOT NULL,
  `receiver_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_list`
--

CREATE TABLE `chat_list` (
  `id` int(11) NOT NULL,
  `sender_id` varchar(10) NOT NULL,
  `message` text NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(20) NOT NULL,
  `question` varchar(1000) NOT NULL,
  `answer` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`) VALUES
(1, ' Ano ang Pandi Online Local Civil Registry?', 'Ang Pandi Online Local Civil Registry ay tumutukoy sa isang digital na platform o sistema na ipinatupad ng isang lokal na pamahalaan o tanggapan ng civil registry upang magbigay ng mga serbisyong online na nauugnay sa mahahalagang rekord, tulad ng mga sertipiko ng kapanganakan, mga sertipiko ng kasal, at mga sertipiko ng kamatayan. Pinapayagan nito ang mga indibidwal na ma-access at humiling ng mga dokumentong ito nang maginhawa sa pamamagitan ng internet.'),
(2, 'Paano ko maa-access ang Pandi Online Local Civil Registry?', 'Upang ma-access ang online local civil registry, kailangan mong bisitahin ang opisyal na website ng lokal na pamahalaan ng Pandi, Bulacan. Maaari kang gumawa ng account at mag-log in bago mo ma-access ang mga serbisyo nito katulad na lamang ng birth certificates, marriage certificates and death certificates.'),
(3, ' Ano ang mga serbisyong karaniwang inaalok nito?\n', 'Ang mga serbisyong inaalok sa pamamagitan ng isang online na lokal na pagpapatala ng sibil sa Pandi ay maaaring kabilang ang:\n(1) Requesting birth certificates, marriage certificates, death certificates, and other vital records.\n(2) Applying for marriage licenses.\n(3) Updating personal information in civil registry records.\n(4) Requesting correction of errors in vital records.\n(5) Requesting certified copies of documents.\n(6) Tracking the status of requests and applications.'),
(4, 'Mayroon bang bayad para sa paggamit ng mga serbisyo nito?', 'Maaaring libre ang ilang serbisyong ibinigay ng Pandi Online Local Civil Registry, habang ang iba ay maaaring mangailangan ng bayad. Maaaring mag-iba ang mga bayarin depende sa uri ng serbisyo na iyong hinihiling. Halimbawa, ang pagkuha ng isang sertipikadong kopya ng isang sertipiko ng kapanganakan ay maaaring may ibang bayad kaysa sa paghiling ng pagwawasto sa isang sertipiko ng kasal. Ang mga partikular na bayarin ay makikita pagkatapos makompleto ang mga hinihinging impormasyon ng pagproseso ng kanilang aplikasyon o sertipikong kailangan.'),
(5, 'Ano ang mga benepisyo ng paggamit nito?', 'Ang paggamit ng Pandi Online Local Civil Registry ay nag-aalok ng ilang mga benepisyo, kabilang ang:\n(1) Kaginhawaan: Maaari mong i-access ang mga serbisyo mula sa kahit saan na may koneksyon sa internet, na nakakatipid sa iyo ng oras at pagsisikap kumpara sa pagbisita nang personal sa tanggapan ng Pandi civil registry.\n(2) Time-saving: Ang mga online na serbisyo ay kadalasang may mas mabilis na oras ng pagpoproseso, na binabawasan ang panahon ng paghihintay para sa pagkuha ng mahahalagang talaan o pagproseso ng mga aplikasyon.\n(3) 24/7 availability: Maaari kang magsumite ng mga kahilingan o aplikasyon anumang oras, kahit sa labas ng regular na oras ng opisina.'),
(6, 'Mayroon bang anumang mga limitasyon o kinakailangan para sa paggamit nito?', 'Ang mga limitasyon at kinakailangan ay maaaring mag-iba depende sa partikular na sistemang ipinatupad ng lokal na tanggapan ng pagpapatala ng sibil ng Pandi. Maaaring kabilang sa ilang karaniwang mga kinakailangan ang:(1) Internet access and a compatible device (computer, smartphone, etc.).(2) Pagpaparehistro o paglikha ng account sa website.(3) Mga wastong dokumento ng pagkakakilanlan o patunay ng kaugnayan para sa ilang partikular na serbisyo.(4) Pagsunod sa anumang partikular na mga tuntunin o pamamaraan na binalangkas ng lokal na tanggapan ng pagpapatala ng sibil ng Pandi.(5) Mahalagang suriin ang mga patnubay o tagubiling ibinigay sa website upang matiyak na natutugunan mo ang mga requirements para sa paggamit ng mga online na serbisyo.');

-- --------------------------------------------------------

--
-- Table structure for table `supporting_dox_1a`
--

CREATE TABLE `supporting_dox_1a` (
  `id` varchar(50) NOT NULL,
  `issued_to_id` varchar(50) NOT NULL,
  `live_birth_certificate` text NOT NULL,
  `valid_id` text NOT NULL,
  `valid_id_back` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supporting_dox_2a`
--

CREATE TABLE `supporting_dox_2a` (
  `id` varchar(50) NOT NULL,
  `issued_to_id` varchar(50) NOT NULL,
  `hospital_certificate` text NOT NULL,
  `barangay_certificate` text NOT NULL,
  `police_clearance` text NOT NULL,
  `valid_id` text NOT NULL,
  `valid_id_back` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supporting_dox_3a`
--

CREATE TABLE `supporting_dox_3a` (
  `id` varchar(50) NOT NULL,
  `issued_to_id` varchar(50) NOT NULL,
  `h_birth_certificate` text NOT NULL,
  `h_cenomar` text NOT NULL,
  `h_cedula` text NOT NULL,
  `h_barangay_certificate` text NOT NULL,
  `h_valid_id` text NOT NULL,
  `h_valid_id_back` text NOT NULL,
  `w_birth_certificate` text NOT NULL,
  `w_cenomar` text NOT NULL,
  `w_cedula` text NOT NULL,
  `w_barangay_certificate` text NOT NULL,
  `w_valid_id` text NOT NULL,
  `w_valid_id_back` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `1a`
--
ALTER TABLE `1a`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `2a`
--
ALTER TABLE `2a`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `3a`
--
ALTER TABLE `3a`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_list`
--
ALTER TABLE `chat_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sender_id` (`sender_id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supporting_dox_1a`
--
ALTER TABLE `supporting_dox_1a`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `supporting_dox_2a`
--
ALTER TABLE `supporting_dox_2a`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `supporting_dox_3a`
--
ALTER TABLE `supporting_dox_3a`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `1a`
--
ALTER TABLE `1a`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `2a`
--
ALTER TABLE `2a`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `3a`
--
ALTER TABLE `3a`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `chat_list`
--
ALTER TABLE `chat_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
