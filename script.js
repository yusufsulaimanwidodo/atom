/*
ANALOGI JAVASCRIPT: File JS ini ibarat 'sistem kelistrikan dan otomasi' dari rumah (HTML) kita.
Di sini kita merangkai 'kabel' ke saklar agar rumah tahu kapan harus ganti warna (Tema Gelap/Terang),
serta mengatur sensor agar 'pintu ruang rahasia' (Modal) bisa terbuka dan tertutup saat disentuh.
*/

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. SISTEM SAKLAR TEMA (Dark / Light Mode)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Fungsi untuk mengubah ikon berdasarkan tema aktif
    const updateThemeIcon = (theme) => {
        if (theme === 'light') {
            themeIcon.src = 'images/dark_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
        } else {
            themeIcon.src = 'images/light_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
        }
    };

    // Cek apakah tamu kita sebelumnya sudah punya preferensi tema (Ingatan Browser / LocalStorage)
    let currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // ANALOGI: Menugaskan satpam (Event Listener) untuk terus memantau tombol.
    // Jika tombol diklik, langsung perintahkan rumah ganti tema!
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme); // Catat di buku tamu (LocalStorage)
        updateThemeIcon(currentTheme);
    });


    // ==========================================
    // 2. SISTEM PINTU RAHASIA (Modal Interaktif Dinamis)
    // ==========================================

    // ANALOGI: Daripada membangun ruang rahasia secara permanen sejak awal (di HTML),
    // kita menggunakan "sihir" JavaScript untuk merakit ruang rahasia tersebut
    // hanya pada saat dibutuhkan (saat kartu diklik). Ini membuat rumah lebih rapi!

    // Data elemen yang akan ditampilkan (Nanti bisa diisi dengan elemen dari database/API)
const elementData = [
        { number: 1, category: 'nonlogam', symbol: 'H', name: 'Hidrogen', description: 'Hidrogen adalah suatu unsur kimia dengan lambang kimia H dan nomor atom 1. Dengan berat atom 1,00794 u, hidrogen merupakan unsur paling ringan dalam tabel periodik. Bentuk monatomiknya (H) adalah zat kimia paling melimpah di Alam Semesta, yang mencakup sekitar 75% dari seluruh massa barionik.' },
        { number: 2, category: 'gas_mulia', symbol: 'He', name: 'Helium', description: 'Helium adalah unsur kimia dengan simbol He dan nomor atom 2. Helium adalah gas monoatomik yang tidak berwarna, tidak berbau, tidak berasa, tidak beracun, inert, dan mengepalai kelompok gas mulia dalam tabel periodik. Titik didih dan titik lelehnya paling rendah diantara semua unsur.' },
        { number: 3, category: 'logam', symbol: 'Li', name: 'Litium', description: 'Litium (dari bahasa Yunani:λίθος lithos, "batu") adalah suatu unsur kimia dengan lambang Li dan nomor atom 3. Merupakan logam lunak berwarna putih keperakan yang termasuk dalam kelompok unsur kimia logam alkali. Dalam kondisi standar, ini adalah logam paling ringan dan unsur padat paling padat.' },
        { number: 4, category: 'logam', symbol: 'Be', name: 'Berilium', description: 'Berilium adalah unsur kimia dengan simbol Be dan nomor atom 4. Berilium tercipta melalui nukleosintesis bintang dan merupakan unsur yang relatif langka di alam semesta. Ini adalah unsur divalen yang terjadi secara alami hanya dalam kombinasi dengan unsur lain dalam mineral.' },
        { number: 5, category: 'metaloid', symbol: 'B', name: 'Boron', description: 'Boron adalah unsur kimia metaloid dengan simbol B dan nomor atom 5. Diproduksi seluruhnya oleh spalasi sinar kosmik dan supernova dan bukan oleh nukleosintesis bintang, boron merupakan unsur dengan kelimpahan rendah di Tata Surya dan Bumi\'s crust. Boron is concentrated on Earth by the water-solubility of its more common naturally occurring compounds, the borate minerals.' },
        { number: 6, category: 'nonlogam', symbol: 'C', name: 'Karbon', description: 'Karbon (dari bahasa Latin:carbo "batubara") adalah suatu unsur kimia dengan lambang C dan nomor atom 6. Pada tabel periodik, karbon merupakan unsur pertama (baris 2) dari enam unsur dalam kolom (golongan) 14, yang memiliki komposisi kulit elektron terluar yang sama. Ini bukan logam dan tetravalen — membuat empat elektron tersedia untuk membentuk ikatan kimia kovalen.' },
        { number: 7, category: 'nonlogam', symbol: 'N', name: 'Nitrogen', description: 'Nitrogen adalah unsur kimia dengan simbol N dan nomor atom 7. Nitrogen adalah pniktogen paling ringan dan pada suhu kamar, merupakan gas diatomik transparan dan tidak berbau. Nitrogen adalah unsur umum di alam semesta, diperkirakan berada pada urutan ketujuh dalam kelimpahan total di Bima Sakti dan Tata Surya.' },
        { number: 8, category: 'nonlogam', symbol: 'O', name: 'Oksigen', description: 'Oksigen adalah unsur kimia dengan simbol O dan nomor atom 8. Ia adalah anggota kelompok kalkogen pada tabel periodik dan merupakan zat bukan logam dan pengoksidasi yang sangat reaktif yang mudah membentuk senyawa (terutama oksida) dengan sebagian besar unsur. Berdasarkan massanya, oksigen adalah unsur ketiga terbanyak di alam semesta, setelah hidrogen dan helium.' },
        { number: 9, category: 'nonlogam', symbol: 'F', name: 'Fluorin', description: 'Fluor adalah unsur kimia dengan simbol F dan nomor atom 9. Ini adalah halogen paling ringan dan terdapat sebagai gas diatomik kuning pucat yang sangat beracun pada kondisi standar. Sebagai unsur yang paling elektronegatif, ia sangat reaktif: hampir semua unsur lainnya, termasuk beberapa gas mulia, membentuk senyawa dengan fluor.' },
        { number: 10, category: 'gas_mulia', symbol: 'Ne', name: 'Neon', description: 'Neon adalah suatu unsur kimia dengan simbol Ne dan nomor atom 10. Ia termasuk dalam golongan 18 (gas mulia) pada tabel periodik. Neon adalah gas monatomik inert yang tidak berwarna, tidak berbau, dalam kondisi standar, dengan kepadatan sekitar dua pertiga udara.' },
        { number: 11, category: 'logam', symbol: 'Na', name: 'Natrium', description: 'Natrium /ˈsoʊdiəm/ adalah suatu unsur kimia dengan simbol Na (dari bahasa Yunani Kuno Νάτριο) dan nomor atom 11. Merupakan logam lunak, berwarna putih keperakan, dan sangat reaktif. Dalam tabel periodik unsur ini berada di kolom 1 (logam alkali), dan sama dengan enam unsur lain dalam kolom tersebut bahwa ia mempunyai satu elektron pada kulit terluarnya, yang siap didonasikannya, sehingga menghasilkan atom bermuatan positif - kation.' },
        { number: 12, category: 'logam', symbol: 'Mg', name: 'Magnesium', description: 'Magnesium adalah suatu unsur kimia dengan simbol Mg dan nomor atom 12. Magnesium merupakan padatan berwarna abu-abu mengkilat yang memiliki kemiripan fisik dengan lima unsur lainnya pada kolom kedua (golongan 2, atau logam alkali tanah) pada tabel periodik: masing-masing unsur tersebut mempunyai konfigurasi elektron yang sama pada kulit elektron terluarnya yang menghasilkan struktur kristal serupa. Magnesium adalah unsur paling melimpah kesembilan di alam semesta.' },
        { number: 13, category: 'logam', symbol: 'Al', name: 'Aluminium', description: 'Aluminium (atau aluminium; lihat akhiran yang berbeda) adalah suatu unsur kimia dalam golongan boron dengan simbol Al dan nomor atom 13. Aluminium adalah logam berwarna putih keperakan, lunak, nonmagnetik, dan ulet. Aluminium adalah unsur ketiga yang paling melimpah (setelah oksigen dan silikon), dan logam paling melimpah di bumi\'s crust.' },
        { number: 14, category: 'metaloid', symbol: 'Si', name: 'Silikon', description: 'Silikon adalah unsur kimia dengan simbol Si dan nomor atom 14. Ini adalah metaloid tetravalen, lebih reaktif daripada germanium, metaloid tepat di bawahnya dalam tabel. Kontroversi tentang silikon\'s character dates to its discovery.' },
        { number: 15, category: 'nonlogam', symbol: 'P', name: 'Fosfor', description: 'Fosfor adalah unsur kimia dengan simbol P dan nomor atom 15. Sebagai suatu unsur, fosfor terdapat dalam dua bentuk utama—fosfor putih dan fosfor merah—tetapi karena reaktivitasnya yang tinggi, fosfor tidak pernah ditemukan sebagai unsur bebas di Bumi. Sebaliknya mineral yang mengandung fosfor hampir selalu ada dalam keadaan teroksidasi maksimal, seperti batuan fosfat anorganik.' },
        { number: 16, category: 'nonlogam', symbol: 'S', name: 'Belerang', description: 'Belerang atau belerang (lihat perbedaan ejaan) adalah unsur kimia dengan simbol S dan nomor atom 16. Ia merupakan unsur non-logam multivalen yang melimpah. Dalam kondisi normal, atom belerang membentuk molekul oktatom siklik dengan rumus kimia S8.' },
        { number: 17, category: 'nonlogam', symbol: 'Cl', name: 'Klorin', description: 'Klorin adalah unsur kimia dengan lambang Cl dan nomor atom 17. Ia juga memiliki massa atom relatif 35,5. Klorin berada dalam kelompok halogen (17) dan merupakan halogen paling ringan kedua setelah fluor.' },
        { number: 18, category: 'gas_mulia', symbol: 'Ar', name: 'Argon', description: 'Argon adalah suatu unsur kimia dengan lambang Ar dan nomor atom 18. Argon berada pada golongan 18 tabel periodik dan merupakan gas mulia. Argon adalah gas ketiga yang paling melimpah di bumi\'s atmosphere, at 0.934% (9,340 ppmv), making it over twice as abundant as the next most common atmospheric gas, water vapor (which averages about 4000 ppmv, but varies greatly), and 23 times as abundant as the next most common non-condensing atmospheric gas, carbon dioxide (400 ppmv), and more than 500 times as abundant as the next most common noble gas, neon (18 ppmv).' },
        { number: 19, category: 'logam', symbol: 'K', name: 'Kalium', description: 'Kalium adalah unsur kimia dengan simbol K (berasal dari Neo-Latin, kalium) dan nomor atom 19. Kalium pertama kali diisolasi dari kalium, abu tanaman, yang menjadi asal mula namanya. Dalam tabel periodik, kalium adalah salah satu dari tujuh unsur dalam kolom (golongan) 1 (logam alkali): semuanya mempunyai satu elektron valensi di kulit elektron terluarnya, yang siap dilepaskan untuk membentuk atom bermuatan positif - kation, dan bergabung dengan anion membentuk garam.' },
        { number: 20, category: 'logam', symbol: 'Ca', name: 'Kalsium', description: 'Kalsium adalah unsur kimia dengan simbol Ca dan nomor atom 20. Kalsium adalah logam alkali tanah berwarna abu-abu lembut, unsur kelima yang paling melimpah berdasarkan massa di bumi\'s crust. The ion Ca2+ is also the fifth-most-abundant dissolved ion in seawater by both molarity and mass, after sodium, chloride, magnesium, and sulfate.' },
        { number: 21, category: 'logam', symbol: 'Sc', name: 'Skandium', description: 'Skandium adalah suatu unsur kimia dengan simbol Sc dan nomor atom 21. Merupakan unsur blok d metalik berwarna putih keperakan, secara historis kadang-kadang diklasifikasikan sebagai unsur tanah jarang, bersama dengan yttrium dan lantanoid. Ditemukan pada tahun 1879 melalui analisis spektral mineral euxenite dan gadolinite dari Skandinavia.' },
        { number: 22, category: 'logam', symbol: 'Ti', name: 'Titanium', description: 'Titanium adalah unsur kimia dengan simbol Ti dan nomor atom 22. Merupakan logam transisi berkilau dengan warna perak, kepadatan rendah dan kekuatan tinggi. Sangat tahan terhadap korosi pada air laut, aqua regia dan klorin.' },
        { number: 23, category: 'logam', symbol: 'V', name: 'Vanadium', description: 'Vanadium adalah unsur kimia dengan simbol V dan nomor atom 23. Merupakan logam transisi yang keras, berwarna abu-abu keperakan, ulet, dan mudah dibentuk. Unsur ini hanya ditemukan dalam bentuk gabungan kimia di alam, tetapi setelah diisolasi secara artifisial, pembentukan lapisan oksida akan menstabilkan logam bebas terhadap oksidasi lebih lanjut.' },
        { number: 24, category: 'logam', symbol: 'Cr', name: 'Kromium', description: 'Kromium adalah suatu unsur kimia dengan simbol Cr dan nomor atom 24. Kromium adalah unsur pertama dalam Golongan 6. Kromium merupakan logam berwarna abu-abu baja, berkilau, keras dan rapuh, mudah dipoles, tahan noda, dan memiliki titik leleh tinggi.' },
        { number: 25, category: 'logam', symbol: 'Mn', name: 'Mangan', description: 'Mangan adalah suatu unsur kimia dengan simbol Mn dan nomor atom 25. Ia tidak ditemukan sebagai unsur bebas di alam; sering ditemukan dalam kombinasi dengan zat besi, dan banyak mineral. Mangan adalah logam dengan kegunaan paduan logam industri yang penting, khususnya pada baja tahan karat.' },
        { number: 26, category: 'logam', symbol: 'Fe', name: 'Besi', description: 'Besi adalah suatu unsur kimia dengan lambang Fe (dari bahasa Latin:ferrum) dan nomor atom 26. Merupakan logam pada deret transisi pertama. Berdasarkan massanya, unsur ini merupakan unsur paling umum di Bumi dan membentuk sebagian besar Bumi\'s outer and inner core.' },
        { number: 27, category: 'logam', symbol: 'Co', name: 'Kobal', description: 'Cobalt adalah unsur kimia dengan simbol Co dan nomor atom 27. Seperti nikel, kobalt di Bumi\'s crust is found only in chemically combined form, save for small deposits found in alloys of natural meteoric iron. The free element, produced by reductive smelting, is a hard, lustrous, silver-gray metal.' },
        { number: 28, category: 'logam', symbol: 'Ni', name: 'Nikel', description: 'Nikel adalah unsur kimia dengan simbol Ni dan nomor atom 28. Nikel merupakan logam berkilau berwarna putih keperakan dengan sedikit semburat emas. Nikel termasuk dalam logam transisi dan bersifat keras serta ulet.' },
        { number: 29, category: 'logam', symbol: 'Cu', name: 'Tembaga', description: 'Tembaga adalah unsur kimia dengan simbol Cu (dari bahasa Latin: tembaga) dan nomor atom 29. Tembaga merupakan logam lunak, mudah dibentuk, dan ulet dengan konduktivitas termal dan listrik yang sangat tinggi. Permukaan tembaga murni yang baru terpapar memiliki warna oranye kemerahan.' },
        { number: 30, category: 'logam', symbol: 'Zn', name: 'Seng', description: 'Seng, dalam perdagangan juga spelter, adalah suatu unsur kimia dengan simbol Zn dan nomor atom 30. Seng adalah unsur pertama golongan 12 pada tabel periodik. Dalam beberapa hal seng secara kimiawi mirip dengan magnesium: ionnya berukuran sama dan satu-satunya bilangan oksidasi yang umum adalah +2.' },
        { number: 31, category: 'logam', symbol: 'Ga', name: 'Galium', description: 'Gallium adalah unsur kimia dengan simbol Ga dan nomor atom 31. Unsur galium tidak terdapat dalam bentuk bebas di alam, tetapi sebagai senyawa galium(III) yang terdapat dalam jumlah kecil pada bijih seng dan bauksit. Gallium adalah logam lunak berwarna keperakan, dan unsur galium adalah padatan rapuh pada suhu rendah, dan meleleh pada suhu 29,76 °C (85,57 °F) (sedikit di atas suhu kamar).' },
        { number: 32, category: 'metaloid', symbol: 'Ge', name: 'Germanium', description: 'Germanium adalah unsur kimia dengan simbol Ge dan nomor atom 32. Merupakan metaloid putih keabu-abuan yang berkilau, keras, dalam gugus karbon, secara kimia mirip dengan tetangganya, timah dan silikon. Germanium yang dimurnikan adalah semikonduktor, dengan penampilan paling mirip dengan unsur silikon.' },
        { number: 33, category: 'metaloid', symbol: 'As', name: 'Arsen', description: 'Arsenik adalah unsur kimia dengan simbol As dan nomor atom 33. Arsenik terdapat di banyak mineral, biasanya bersama dengan belerang dan logam, dan juga sebagai kristal unsur murni. Arsenik adalah metaloid.' },
        { number: 34, category: 'nonlogam', symbol: 'Se', name: 'Selenium', description: 'Selenium adalah suatu unsur kimia dengan simbol Se dan nomor atom 34. Selenium merupakan unsur bukan logam yang sifat-sifatnya berada di antara sifat-sifat unsur kalkogen yang bersebelahan dengan kolom tabel periodik, belerang dan telurium. Jarang terjadi dalam bentuk unsur di alam, atau sebagai senyawa bijih murni.' },
        { number: 35, category: 'nonlogam', symbol: 'Br', name: 'Bromin', description: 'Brom (dari bahasa Yunani Kuno:βρῶμος, brómos, yang berarti "bau busuk") adalah suatu unsur kimia dengan simbol Br, dan nomor atom 35. Merupakan unsur halogen. Unsur ini diisolasi secara independen oleh dua ahli kimia, Carl Jacob Löwig dan Antoine Jerome Balard, pada tahun 1825–1826.' },
        { number: 36, category: 'gas_mulia', symbol: 'Kr', name: 'Kripton', description: 'Kripton (dari bahasa Yunani:κρυπτός kryptos "yang tersembunyi") adalah suatu unsur kimia dengan simbol Kr dan nomor atom 36. Ia adalah anggota unsur golongan 18 (gas mulia). Sebuah gas mulia yang tidak berwarna, tidak berbau, dan tidak berasa, kripton terdapat dalam jumlah kecil di atmosfer, diisolasi dengan penyulingan fraksional udara cair, dan sering digunakan dengan gas langka lainnya dalam lampu neon.' },
        { number: 37, category: 'logam', symbol: 'Rb', name: 'Rubidium', description: 'Rubidium adalah suatu unsur kimia dengan lambang Rb dan nomor atom 37. Rubidium adalah unsur logam lunak berwarna putih keperakan dari golongan logam alkali, dengan massa atom 85,4678. Unsur rubidium sangat reaktif, dengan sifat yang mirip dengan logam alkali lainnya, seperti oksidasi yang sangat cepat di udara.' },
        { number: 38, category: 'logam', symbol: 'Sr', name: 'Stronsium', description: 'Strontium adalah suatu unsur kimia dengan lambang Sr dan nomor atom 38. Merupakan logam alkali tanah, strontium adalah unsur logam lunak berwarna putih keperakan atau kekuningan yang sangat reaktif secara kimia. Logam menjadi kuning ketika terkena udara.' },
        { number: 39, category: 'logam', symbol: 'Y', name: 'Itrium', description: 'Yttrium adalah unsur kimia dengan simbol Y dan nomor atom 39. Ini adalah logam transisi keperakan-logam yang secara kimia mirip dengan lantanida dan sering diklasifikasikan sebagai "unsur tanah jarang". Yttrium hampir selalu ditemukan dikombinasikan dengan lantanida dalam mineral tanah jarang dan tidak pernah ditemukan di alam sebagai unsur bebas.' },
        { number: 40, category: 'logam', symbol: 'Zr', name: 'Zirkonium', description: 'Zirkonium adalah suatu unsur kimia dengan lambang Zr dan nomor atom 40. Nama zirkonium diambil dari nama mineral zirkon, sumber zirkonium terpenting. Kata zirkon berasal dari kata Persia zargun زرگون, yang berarti "berwarna emas".' },
        { number: 41, category: 'logam', symbol: 'Nb', name: 'Niobium', description: 'Niobium, sebelumnya columbium, adalah suatu unsur kimia dengan simbol Nb (sebelumnya Cb) dan nomor atom 41. Merupakan logam transisi lunak, abu-abu, dan ulet, yang sering ditemukan dalam mineral piroklor, sumber komersial utama niobium, dan kolumbita. Nama tersebut berasal dari mitologi Yunani: Niobe, putri Tantalus karena sangat mirip dengan tantalum.' },
        { number: 42, category: 'logam', symbol: 'Mo', name: 'Molibdenum', description: 'Molibdenum adalah suatu unsur kimia dengan simbol Mo dan nomor atom 42. Namanya berasal dari Neo-Latin molybdaenum, dari bahasa Yunani Kuno Μόλυβδος molybdos, yang berarti timbal, karena bijihnya disalahartikan sebagai bijih timah. Mineral molibdenum telah dikenal sepanjang sejarah, namun unsur tersebut ditemukan (dalam arti membedakannya sebagai entitas baru dari garam mineral logam lain) pada tahun 1778 oleh Carl Wilhelm Scheele.' },
        { number: 43, category: 'radioaktif', symbol: 'Tc', name: 'Teknesium', description: 'Technetium (/tɛkˈniːʃiəm/) adalah suatu unsur kimia dengan simbol Tc dan nomor atom 43. Ini adalah unsur dengan nomor atom terendah dalam tabel periodik yang tidak memiliki isotop stabil: setiap bentuknya bersifat radioaktif. Hampir semua teknesium diproduksi secara sintetis, dan hanya dalam jumlah kecil yang ditemukan di alam.' },
        { number: 44, category: 'logam', symbol: 'Ru', name: 'Rutenium', description: 'Rutenium adalah unsur kimia dengan simbol Ru dan nomor atom 44. Ini adalah logam transisi langka yang termasuk dalam kelompok platina pada tabel periodik. Seperti logam lain dari kelompok platina, rutenium bersifat inert terhadap sebagian besar bahan kimia lainnya.' },
        { number: 45, category: 'logam', symbol: 'Rh', name: 'Rodium', description: 'Rhodium adalah unsur kimia dengan simbol Rh dan nomor atom 45. Merupakan logam transisi langka, berwarna putih keperakan, keras, dan inert secara kimia. Ini adalah anggota grup platinum.' },
        { number: 46, category: 'logam', symbol: 'Pd', name: 'Paladium', description: 'Paladium adalah unsur kimia dengan simbol Pd dan nomor atom 46. Merupakan logam putih keperakan langka dan berkilau yang ditemukan pada tahun 1803 oleh William Hyde Wollaston. Dia menamainya setelah asteroid Pallas, yang diambil dari julukan dewi Yunani Athena, yang diperolehnya saat dia membunuh Pallas.' },
        { number: 47, category: 'logam', symbol: 'Ag', name: 'Perak', description: 'Perak adalah suatu unsur kimia dengan simbol Ag (Yunani:άργυρος árguros, Latin:argentum, berasal dari akar bahasa Indo-Eropa *h₂erǵ- untuk "abu-abu" atau "bersinar") dan nomor atom 47. Merupakan logam transisi lunak, putih, berkilau, ia memiliki konduktivitas listrik, konduktivitas termal, dan reflektifitas tertinggi dibandingkan logam mana pun. Logam ini terdapat secara alami dalam bentuknya yang murni dan bebas (perak asli), sebagai paduan dengan emas dan logam lainnya, dan dalam mineral seperti argentit dan klorargyrit.' },
        { number: 48, category: 'logam', symbol: 'Cd', name: 'Kadmium', description: 'Kadmium adalah suatu unsur kimia dengan lambang Cd dan nomor atom 48. Logam lunak berwarna putih kebiruan ini secara kimiawi mirip dengan dua logam stabil lainnya pada golongan 12, seng dan merkuri. Seperti seng, ia lebih menyukai bilangan oksidasi +2 di sebagian besar senyawanya dan seperti merkuri, ia menunjukkan titik leleh yang rendah dibandingkan dengan logam transisi.' },
        { number: 49, category: 'logam', symbol: 'In', name: 'Indium', description: 'Indium adalah suatu unsur kimia dengan lambang In dan nomor atom 49. Merupakan unsur logam pasca transisi yang langka di Bumi\'s crust. The metal is very soft, malleable and easily fusible, with a melting point higher than sodium, but lower than lithium or tin.' },
        { number: 50, category: 'logam', symbol: 'Sn', name: 'Timah', description: 'Timah adalah suatu unsur kimia dengan lambang Sn (bahasa Latin:stannum) dan nomor atom 50. Timah merupakan logam golongan utama pada golongan 14 tabel periodik. Timah menunjukkan kemiripan kimia dengan unsur tetangganya golongan-14, germanium dan timbal, dan memiliki dua kemungkinan bilangan oksidasi, +2 dan +4 yang sedikit lebih stabil.' },
        { number: 51, category: 'metaloid', symbol: 'Sb', name: 'Antimon', description: 'Antimon adalah unsur kimia dengan simbol Sb (dari bahasa Latin:stibium) dan nomor atom 51. Merupakan metaloid abu-abu berkilau, ditemukan di alam terutama sebagai mineral sulfida stibnite (Sb2S3). Senyawa antimon telah dikenal sejak zaman dahulu dan digunakan untuk kosmetik; antimon logam juga diketahui, namun secara keliru diidentifikasi sebagai timbal pada penemuannya.' },
        { number: 52, category: 'metaloid', symbol: 'Te', name: 'Telurium', description: 'Telurium adalah unsur kimia dengan simbol Te dan nomor atom 52. Merupakan metaloid putih keperakan yang rapuh, agak beracun, langka. Telurium secara kimia berhubungan dengan selenium dan belerang.' },
        { number: 53, category: 'nonlogam', symbol: 'I', name: 'Yodium', description: 'Yodium adalah suatu unsur kimia dengan lambang I dan nomor atom 53. Namanya berasal dari bahasa Yunani ἰοειδής ioeidēs, artinya ungu atau ungu, karena warna uap yodium. Yodium dan senyawanya terutama digunakan dalam nutrisi, dan industri dalam produksi asam asetat dan polimer tertentu.' },
        { number: 54, category: 'gas_mulia', symbol: 'Xe', name: 'Xenon', description: 'Xenon adalah unsur kimia dengan simbol Xe dan nomor atom 54. Xenon adalah gas mulia yang tidak berwarna, padat, dan tidak berbau, yang terdapat di Bumi\'s atmosphere in trace amounts. Although generally unreactive, xenon can undergo a few chemical reactions such as the formation of xenon hexafluoroplatinate, the first noble gas compound to be synthesized.' },
        { number: 55, category: 'logam', symbol: 'Cs', name: 'Sesium', description: 'Cesium atau cesium adalah unsur kimia dengan simbol Cs dan nomor atom 55. Ini adalah logam alkali lunak berwarna emas keperakan dengan titik leleh 28 °C (82 °F), yang menjadikannya salah satu dari hanya lima unsur logam yang berbentuk cair pada atau mendekati suhu kamar. Cesium merupakan logam alkali dan memiliki sifat fisik dan kimia yang mirip dengan rubidium dan kalium.' },
        { number: 56, category: 'logam', symbol: 'Ba', name: 'Barium', description: 'Barium adalah unsur kimia dengan simbol Ba dan nomor atom 56. Ini adalah unsur kelima dalam Golongan 2, logam alkali tanah lunak berwarna keperakan. Karena reaktivitas kimianya yang tinggi, barium tidak pernah ditemukan di alam sebagai unsur bebas.' },
        { number: 57, category: 'logam', symbol: 'La', name: 'Lantanum', description: 'Lantanum adalah unsur kimia metalik berwarna putih keperakan yang lembut, ulet, dengan simbol La dan nomor atom 57. Lantanum cepat memudar jika terkena udara dan cukup lunak untuk dipotong dengan pisau. Ia memberi namanya pada deret lantanida, sekelompok 15 unsur serupa antara lantanum dan lutetium dalam tabel periodik: ia juga kadang-kadang dianggap sebagai unsur pertama dari logam transisi periode ke-6.' },
        { number: 58, category: 'logam', symbol: 'Ce', name: 'Serium', description: 'Cerium adalah suatu unsur kimia dengan lambang Ce dan nomor atom 58. Cerium merupakan logam lunak, berwarna keperakan, ulet yang mudah teroksidasi di udara. Nama Cerium diambil dari nama planet kerdil Ceres (namanya diambil dari nama dewi pertanian Romawi).' },
        { number: 59, category: 'logam', symbol: 'Pr', name: 'Praseodimium', description: 'Praseodymium adalah suatu unsur kimia dengan lambang Pr dan nomor atom 59. Praseodymium adalah logam lunak, berwarna keperakan, mudah dibentuk, dan ulet dalam golongan lantanida. Ia dihargai karena sifat magnetik, listrik, kimia, dan optiknya.' },
        { number: 60, category: 'logam', symbol: 'Nd', name: 'Neodimium', description: 'Neodymium adalah unsur kimia dengan simbol Nd dan nomor atom 60. Merupakan logam lunak berwarna keperakan yang mudah ternoda di udara. Neodymium ditemukan pada tahun 1885 oleh ahli kimia Austria Carl Auer von Welsbach.' },
        { number: 61, category: 'radioaktif', symbol: 'Pm', name: 'Prometium', description: 'Promethium, aslinya prometheum, adalah suatu unsur kimia dengan simbol Pm dan nomor atom 61. Semua isotopnya bersifat radioaktif; ia adalah salah satu dari hanya dua unsur yang dalam tabel periodik diikuti oleh unsur-unsur dengan bentuk stabil, perbedaan yang sama dengan teknesium. Secara kimia, prometium adalah lantanida, yang membentuk garam jika digabungkan dengan unsur lain.' },
        { number: 62, category: 'logam', symbol: 'Sm', name: 'Samarium', description: 'Samarium adalah suatu unsur kimia dengan simbol Sm dan nomor atom 62. Merupakan logam keperakan agak keras yang mudah teroksidasi di udara. Menjadi anggota khas deret lantanida, samarium biasanya mengasumsikan bilangan oksidasi +3.' },
        { number: 63, category: 'logam', symbol: 'Eu', name: 'Europium', description: 'Europium adalah suatu unsur kimia dengan simbol Eu dan nomor atom 63. Ia diisolasi pada tahun 1901 dan dinamai menurut benua Eropa. Ini adalah logam keperakan yang cukup keras dan mudah teroksidasi di udara dan air.' },
        { number: 64, category: 'logam', symbol: 'Gd', name: 'Gadolinium', description: 'Gadolinium adalah unsur kimia dengan simbol Gd dan nomor atom 64. Merupakan logam tanah jarang berwarna putih keperakan, mudah dibentuk, dan ulet. Itu ditemukan di alam hanya dalam bentuk gabungan (garam).' },
        { number: 65, category: 'logam', symbol: 'Tb', name: 'Terbium', description: 'Terbium adalah suatu unsur kimia dengan lambang Tb dan nomor atom 65. Merupakan logam tanah jarang berwarna putih keperakan yang mudah dibentuk, ulet, dan cukup lunak untuk dipotong dengan pisau. Terbium tidak pernah ditemukan di alam sebagai unsur bebas, namun terkandung dalam banyak mineral, termasuk cerite, gadolinit, monasit, xenotime, dan euxenite.' },
        { number: 66, category: 'logam', symbol: 'Dy', name: 'Disprosium', description: 'Disprosium adalah suatu unsur kimia dengan lambang Dy dan nomor atom 66. Merupakan unsur tanah jarang dengan kilau perak metalik. Disprosium tidak pernah ditemukan di alam sebagai unsur bebas, meskipun ditemukan dalam berbagai mineral, seperti xenotime.' },
        { number: 67, category: 'logam', symbol: 'Ho', name: 'Holmium', description: 'Holmium adalah suatu unsur kimia dengan lambang Ho dan nomor atom 67. Bagian dari deret lantanida, holmium merupakan unsur tanah jarang. Holmium ditemukan oleh ahli kimia Swedia Per Theodor Cleve.' },
        { number: 68, category: 'logam', symbol: 'Er', name: 'Erbium', description: 'Erbium adalah unsur kimia dalam deret lantanida, dengan lambang Er dan nomor atom 68. Merupakan logam padat berwarna putih keperakan jika diisolasi secara buatan, erbium alami selalu ditemukan dalam kombinasi kimia dengan unsur lain di Bumi. Dengan demikian, ini adalah unsur tanah jarang yang berasosiasi dengan beberapa unsur langka lainnya dalam mineral gadolinit dari Ytterby di Swedia, tempat ditemukannya yttrium, ytterbium, dan terbium.' },
        { number: 69, category: 'logam', symbol: 'Tm', name: 'Tulium', description: 'Thulium adalah unsur kimia dengan simbol Tm dan nomor atom 69. Merupakan unsur ketiga belas dan antepenultimate (ketiga terakhir) dalam deret lantanida. Seperti lantanida lainnya, bilangan oksidasi yang paling umum adalah +3, terlihat pada oksida, halida, dan senyawa lainnya.' },
        { number: 70, category: 'logam', symbol: 'Yb', name: 'Iterbium', description: 'Ytterbium adalah unsur kimia dengan simbol Yb dan nomor atom 70. Ini adalah unsur keempat belas dan kedua dari belakang dalam deret lantanida, yang merupakan dasar dari stabilitas relatif bilangan oksidasi +2. Namun, seperti lantanida lainnya, bilangan oksidasi yang paling umum adalah +3, terlihat pada oksida, halida, dan senyawa lainnya.' },
        { number: 71, category: 'logam', symbol: 'Lu', name: 'Lutetium', description: 'Lutetium adalah unsur kimia dengan simbol Lu dan nomor atom 71. Merupakan logam berwarna putih keperakan, tahan korosi di udara kering, tetapi tidak di udara lembab. Ia dianggap sebagai unsur pertama dari logam transisi periode ke-6 dan unsur terakhir dalam deret lantanida, dan secara tradisional termasuk di antara tanah jarang.' },
        { number: 72, category: 'logam', symbol: 'Hf', name: 'Hafnium', description: 'Hafnium adalah unsur kimia dengan simbol Hf dan nomor atom 72. Merupakan logam transisi tetravalen berwarna abu-abu keperakan, hafnium secara kimia menyerupai zirkonium dan ditemukan dalam mineral zirkonium. Keberadaannya telah diprediksi oleh Dmitri Mendeleev pada tahun 1869, meskipun ia baru teridentifikasi pada tahun 1923, menjadikannya unsur stabil kedua dari belakang yang ditemukan (renium diidentifikasi dua tahun kemudian).' },
        { number: 73, category: 'logam', symbol: 'Ta', name: 'Tantalum', description: 'Tantalum adalah suatu unsur kimia dengan lambang Ta dan nomor atom 73. Sebelumnya dikenal dengan nama tantalium, namanya berasal dari Tantalus, seorang antihero dari mitologi Yunani. Tantalum adalah logam transisi langka, keras, biru keabu-abuan, berkilau dan sangat tahan korosi.' },
        { number: 74, category: 'logam', symbol: 'W', name: 'Tungsten', description: 'Tungsten, juga dikenal sebagai wolfram, adalah suatu unsur kimia dengan simbol W dan nomor atom 74. Kata tungsten berasal dari bahasa Swedia tung sten, yang artinya batu berat. Namanya dalam bahasa Swedia adalah volfram, namun untuk membedakannya dari scheelite, yang dalam bahasa Swedia disebut tungsten.' },
        { number: 75, category: 'logam', symbol: 'Re', name: 'Renium', description: 'Renium adalah unsur kimia dengan simbol Re dan nomor atom 75. Merupakan logam transisi baris ketiga berwarna putih keperakan, berat, dalam golongan 7 tabel periodik. Dengan perkiraan konsentrasi rata-rata 1 bagian per miliar (ppb), renium adalah salah satu unsur paling langka di bumi\'s crust.' },
        { number: 76, category: 'logam', symbol: 'Os', name: 'Osmium', description: 'Osmium (dari bahasa Yunani osme (ὀσμή) yang berarti "bau") adalah suatu unsur kimia dengan simbol Os dan nomor atom 76. Ini adalah logam transisi yang keras, rapuh, berwarna putih kebiruan dalam golongan platina yang ditemukan sebagai unsur jejak dalam paduan, sebagian besar dalam bijih platina. Osmium adalah unsur alami terpadat, dengan massa jenis 22,59 g/cm3.' },
        { number: 77, category: 'logam', symbol: 'Ir', name: 'Iridium', description: 'Iridium adalah suatu unsur kimia dengan simbol Ir dan nomor atom 77. Merupakan logam transisi yang sangat keras, rapuh, berwarna putih keperakan dari golongan platina, iridium umumnya dianggap sebagai unsur terpadat kedua (setelah osmium) berdasarkan massa jenis yang diukur, meskipun perhitungan yang melibatkan kisi ruang unsur-unsur tersebut menunjukkan bahwa iridium lebih padat. Ini juga merupakan logam yang paling tahan korosi, bahkan pada suhu setinggi 2000 °C. Meskipun hanya garam cair dan halogen tertentu yang bersifat korosif terhadap iridium padat, debu iridium yang terbagi halus jauh lebih reaktif dan mudah terbakar.' },
        { number: 78, category: 'logam', symbol: 'Pt', name: 'Platina', description: 'Platinum adalah unsur kimia dengan simbol Pt dan nomor atom 78. Platinum merupakan logam transisi padat, mudah dibentuk, ulet, sangat tidak reaktif, berharga, berwarna putih abu-abu. Namanya berasal dari istilah Spanyol platina, yang secara harfiah diterjemahkan menjadi "perak kecil".' },
        { number: 79, category: 'logam', symbol: 'Au', name: 'Emas', description: 'Emas adalah suatu unsur kimia dengan simbol Au (dari bahasa Latin:aurum) dan nomor atom 79. Dalam bentuknya yang paling murni, emas adalah logam berwarna kuning cerah, agak kemerahan, padat, lunak, mudah dibentuk, dan ulet. Secara kimia, emas merupakan logam transisi dan unsur golongan 11.' },
        { number: 80, category: 'logam', symbol: 'Hg', name: 'Raksa', description: 'Merkuri adalah suatu unsur kimia dengan lambang Hg dan nomor atom 80. Umumnya dikenal dengan nama air raksa dan sebelumnya bernama hydrargyrum (/haɪˈdrɑːrdʒərəm/). Sebagai unsur blok d yang berat dan berwarna keperakan, merkuri adalah satu-satunya unsur logam yang berbentuk cair pada kondisi suhu dan tekanan standar; satu-satunya unsur lain yang berbentuk cair pada kondisi ini adalah brom, meskipun logam seperti sesium, galium, dan rubidium meleleh tepat di atas suhu kamar.' },
        { number: 81, category: 'logam', symbol: 'Tl', name: 'Talium', description: 'Talium adalah unsur kimia dengan simbol Tl dan nomor atom 81. Logam pasca transisi berwarna abu-abu lembut ini tidak ditemukan bebas di alam. Jika diisolasi, bentuknya menyerupai timah, namun berubah warna jika terkena udara.' },
        { number: 82, category: 'logam', symbol: 'Pb', name: 'Timbal', description: 'Timbal (/lɛd/) adalah suatu unsur kimia dalam golongan karbon dengan lambang Pb (dari bahasa Latin:plumbum) dan nomor atom 82. Timbal merupakan logam pasca transisi yang lunak, mudah dibentuk, dan berat. Timbal metalik memiliki warna putih kebiruan setelah baru dipotong, namun segera memudar menjadi warna keabu-abuan kusam jika terkena udara.' },
        { number: 83, category: 'logam', symbol: 'Bi', name: 'Bismut', description: 'Bismut adalah suatu unsur kimia dengan lambang Bi dan nomor atom 83. Bismut, suatu logam pasca transisi pentavalen, secara kimia menyerupai arsenik dan antimon. Unsur bismut dapat terbentuk secara alami, meskipun sulfida dan oksidanya membentuk bijih komersial yang penting.' },
        { number: 84, category: 'radioaktif', symbol: 'Po', name: 'Polonium', description: 'Polonium adalah unsur kimia dengan simbol Po dan nomor atom 84, ditemukan pada tahun 1898 oleh Marie Curie dan Pierre Curie. Unsur langka dan sangat radioaktif tanpa isotop stabil, polonium secara kimia mirip dengan bismut dan telurium, dan terdapat pada bijih uranium. Penerapan polonium sedikit.' },
        { number: 85, category: 'radioaktif', symbol: 'At', name: 'Astatin', description: 'Astatin adalah unsur kimia radioaktif yang sangat langka dengan simbol kimia At dan nomor atom 85. Astatin terdapat di Bumi sebagai produk peluruhan berbagai unsur yang lebih berat. Semua isotopnya berumur pendek; yang paling stabil adalah astatin-210, dengan waktu paruh 8,1 jam.' },
        { number: 86, category: 'radioaktif', symbol: 'Rn', name: 'Radon', description: 'Radon adalah unsur kimia dengan simbol Rn dan nomor atom 86. Radon adalah gas mulia radioaktif, tidak berwarna, tidak berbau, tidak berasa, terjadi secara alami sebagai produk peluruhan radium. Isotopnya yang paling stabil, 222Rn, mempunyai waktu paruh 3,8 hari.' },
        { number: 87, category: 'radioaktif', symbol: 'Fr', name: 'Fransium', description: 'Fransium adalah unsur kimia dengan simbol Fr dan nomor atom 87. Dulunya dikenal sebagai eka-cesium dan aktinium K. Ini adalah unsur elektronegatif terkecil kedua, setelah sesium. Fransium adalah logam sangat radioaktif yang terurai menjadi astatin, radium, dan radon.' },
        { number: 88, category: 'radioaktif', symbol: 'Ra', name: 'Radium', description: 'Radium adalah suatu unsur kimia dengan lambang Ra dan nomor atom 88. Merupakan unsur keenam dalam golongan 2 tabel periodik, juga dikenal sebagai logam alkali tanah. Radium murni hampir tidak berwarna, namun mudah bergabung dengan nitrogen (bukan oksigen) jika terkena udara, membentuk lapisan permukaan hitam radium nitrida (Ra3N2).' },
        { number: 89, category: 'radioaktif', symbol: 'Ac', name: 'Aktinium', description: 'Aktinium adalah unsur kimia radioaktif dengan simbol Ac (jangan bingung dengan singkatan gugus asetil) dan nomor atom 89, yang ditemukan pada tahun 1899. Ini adalah unsur radioaktif non-primordial pertama yang diisolasi. Polonium, radium dan radon diamati sebelum aktinium, tetapi mereka tidak diisolasi sampai tahun 1902.' },
        { number: 90, category: 'radioaktif', symbol: 'Th', name: 'Torium', description: 'Torium adalah suatu unsur kimia dengan simbol Th dan nomor atom 90. Merupakan logam aktinida radioaktif, torium adalah salah satu dari hanya dua unsur radioaktif signifikan yang masih terdapat secara alami dalam jumlah besar sebagai unsur primordial (yang lainnya adalah uranium). Ditemukan pada tahun 1828 oleh Pendeta Norwegia dan ahli mineralogi amatir Morten Thrane Esmark dan diidentifikasi oleh ahli kimia Swedia Jöns Jakob Berzelius, yang menamainya dengan nama Thor, dewa guntur Norse.' },
        { number: 91, category: 'radioaktif', symbol: 'Pa', name: 'Protaktinium', description: 'Protaktinium adalah unsur kimia dengan simbol Pa dan nomor atom 91. Merupakan logam padat berwarna abu-abu keperakan yang mudah bereaksi dengan oksigen, uap air, dan asam anorganik. Ia membentuk berbagai senyawa kimia di mana protaktinium biasanya terdapat dalam bilangan oksidasi +5, tetapi juga dapat mengambil bilangan +4 dan bahkan +2 atau +3.' },
        { number: 92, category: 'radioaktif', symbol: 'U', name: 'Uranium', description: 'Uranium adalah suatu unsur kimia dengan simbol U dan nomor atom 92. Merupakan logam berwarna putih keperakan dalam deret aktinida pada tabel periodik. Sebuah atom uranium memiliki 92 proton dan 92 elektron, 6 di antaranya adalah elektron valensi.' },
        { number: 93, category: 'radioaktif', symbol: 'Np', name: 'Neptunium', description: 'Neptunium adalah suatu unsur kimia dengan simbol Np dan nomor atom 93. Merupakan logam aktinida radioaktif, neptunium adalah unsur transuranik pertama. Posisinya dalam tabel periodik tepat setelah uranium, dinamai menurut nama planet Uranus, menyebabkan ia dinamai menurut Neptunus, planet berikutnya setelah Uranus.' },
        { number: 94, category: 'radioaktif', symbol: 'Pu', name: 'Plutonium', description: 'Plutonium adalah unsur kimia radioaktif transuranik dengan lambang Pu dan nomor atom 94. Merupakan logam aktinida berwarna abu-abu keperakan yang memudar bila terkena udara, dan membentuk lapisan kusam bila teroksidasi. Unsur ini biasanya menunjukkan enam alotrop dan empat bilangan oksidasi.' },
        { number: 95, category: 'radioaktif', symbol: 'Am', name: 'Amerisium', description: 'Amerisium adalah unsur kimia transuranik radioaktif dengan simbol Am dan nomor atom 95. Anggota deret aktinida ini terletak dalam tabel periodik di bawah unsur lantanida europium, dan dengan analogi dinamai menurut nama Amerika. Americium pertama kali diproduksi pada tahun 1944 oleh kelompok Glenn T.Seaborg dari Berkeley, California, di laboratorium metalurgi Universitas Chicago.' },
        { number: 96, category: 'radioaktif', symbol: 'Cm', name: 'Kurium', description: 'Curium adalah unsur kimia radioaktif transuranik dengan simbol Cm dan nomor atom 96. Unsur seri aktinida ini dinamai Marie dan Pierre Curie – keduanya dikenal karena penelitian mereka tentang radioaktivitas. Curium pertama kali sengaja diproduksi dan diidentifikasi pada bulan Juli 1944 oleh kelompok Glenn T. Seaborg di Universitas California, Berkeley.' },
        { number: 97, category: 'radioaktif', symbol: 'Bk', name: 'Berkelium', description: 'Berkelium adalah unsur kimia radioaktif transuranik dengan lambang Bk dan nomor atom 97. Ia merupakan anggota rangkaian unsur aktinida dan transuranium. Namanya diambil dari kota Berkeley, California, lokasi Laboratorium Radiasi Universitas California di mana ia ditemukan pada bulan Desember 1949.' },
        { number: 98, category: 'radioaktif', symbol: 'Cf', name: 'Kalifornium', description: 'Kalifornium adalah unsur kimia logam radioaktif dengan lambang Cf dan nomor atom 98. Unsur ini pertama kali dibuat pada tahun 1950 di Laboratorium Radiasi Universitas California di Berkeley, dengan membombardir curium dengan partikel alfa (ion helium-4). Ini adalah unsur aktinida, unsur transuranium keenam yang disintesis, dan memiliki massa atom tertinggi kedua dari semua unsur yang telah diproduksi dalam jumlah yang cukup besar untuk dilihat dengan mata telanjang (setelah einsteinium).' },
        { number: 99, category: 'radioaktif', symbol: 'Es', name: 'Einsteinium', description: 'Einsteinium adalah unsur sintetik dengan simbol Es dan nomor atom 99. Ia adalah unsur transuranium ketujuh, dan merupakan aktinida. Einsteinium ditemukan sebagai komponen puing-puing ledakan bom hidrogen pertama pada tahun 1952, dan dinamai menurut nama Albert Einstein.' },
        { number: 100, category: 'radioaktif', symbol: 'Fm', name: 'Fermium', description: 'Fermium adalah unsur sintetik dengan simbol Fm dan nomor atom 100. Fermium merupakan anggota deret aktinida. Ini adalah unsur terberat yang dapat dibentuk melalui bombardir neutron terhadap unsur yang lebih ringan, dan karenanya merupakan unsur terakhir yang dapat dibuat dalam jumlah makroskopis, meskipun logam fermium murni belum dapat dibuat.' },
        { number: 101, category: 'radioaktif', symbol: 'Md', name: 'Mendelevium', description: 'Mendelevium adalah unsur sintetik dengan simbol kimia Md (sebelumnya Mv) dan nomor atom 101. Unsur transuranik radioaktif logam dalam deret aktinida, merupakan unsur pertama yang saat ini tidak dapat diproduksi dalam jumlah makroskopis melalui pemboman neutron terhadap unsur yang lebih ringan. Ini adalah aktinida antepenultimate dan elemen transuranik kesembilan.' },
        { number: 102, category: 'radioaktif', symbol: 'No', name: 'Nobelium', description: 'Nobelium adalah unsur kimia sintetik dengan simbol No dan nomor atom 102. Nama ini diambil untuk menghormati Alfred Nobel, penemu dinamit dan dermawan ilmu pengetahuan. Merupakan logam radioaktif, merupakan unsur transuranik kesepuluh dan merupakan anggota kedua dari belakang deret aktinida.' },
        { number: 103, category: 'radioaktif', symbol: 'Lr', name: 'Lawrensium', description: 'Lawrencium adalah unsur kimia sintetis dengan simbol kimia Lr (sebelumnya Lw) dan nomor atom 103. Nama ini diambil untuk menghormati Ernest Lawrence, penemu siklotron, perangkat yang digunakan untuk menemukan banyak unsur radioaktif buatan. Sebuah logam radioaktif, lawrencium adalah unsur transuranik kesebelas dan juga merupakan anggota terakhir dari deret aktinida.' },
        { number: 104, category: 'radioaktif', symbol: 'Rf', name: 'Rutherfordium', description: 'Rutherfordium adalah unsur kimia dengan simbol Rf dan nomor atom 104, dinamai untuk menghormati fisikawan Ernest Rutherford. Merupakan unsur sintetik (unsur yang dapat dibuat di laboratorium tetapi tidak ditemukan di alam) dan radioaktif; isotop paling stabil yang diketahui, 267Rf, memiliki waktu paruh sekitar 1,3 jam. Dalam tabel periodik unsur, unsur ini merupakan unsur blok d dan unsur transisi baris kedua dari baris keempat.' },
        { number: 105, category: 'radioaktif', symbol: 'Db', name: 'Dubnium', description: 'Dubnium adalah suatu unsur kimia dengan simbol Db dan nomor atom 105. Namanya diambil dari nama kota Dubna di Rusia (utara Moskow), tempat ia pertama kali diproduksi. Merupakan unsur sintetik (unsur yang dapat dibuat di laboratorium tetapi tidak ditemukan di alam) dan radioaktif; isotop paling stabil yang diketahui, dubnium-268, memiliki waktu paruh sekitar 28 jam.' },
        { number: 106, category: 'radioaktif', symbol: 'Sg', name: 'Seaborgium', description: 'Seaborgium adalah unsur sintetik dengan simbol Sg dan nomor atom 106. Isotop paling stabilnya, 271Sg, memiliki waktu paruh 1,9 menit. Isotop 269Sg yang baru ditemukan berpotensi memiliki waktu paruh yang sedikit lebih lama (ca.' },
        { number: 107, category: 'radioaktif', symbol: 'Bh', name: 'Bohrium', description: 'Bohrium adalah suatu unsur kimia dengan simbol Bh dan nomor atom 107. Namanya diambil dari nama fisikawan Denmark Niels Bohr. Merupakan unsur sintetik (unsur yang dapat dibuat di laboratorium tetapi tidak ditemukan di alam) dan radioaktif; isotop paling stabil yang diketahui, 270Bh, memiliki waktu paruh sekitar 61 detik.' },
        { number: 108, category: 'radioaktif', symbol: 'Hs', name: 'Hassium', description: 'Hassium adalah unsur kimia dengan simbol Hs dan nomor atom 108, dinamai berdasarkan nama negara bagian Hesse di Jerman. Merupakan unsur sintetik (unsur yang dapat dibuat di laboratorium tetapi tidak ditemukan di alam) dan radioaktif; isotop paling stabil yang diketahui, 269Hs, memiliki waktu paruh sekitar 9,7 detik, meskipun keadaan metastabil yang belum dikonfirmasi, 277mHs, mungkin memiliki waktu paruh lebih lama sekitar 130 detik. Lebih dari 100 atom hassium telah disintesis hingga saat ini.' },
        { number: 109, category: 'radioaktif', symbol: 'Mt', name: 'Meitnerium', description: 'Meitnerium adalah unsur kimia dengan simbol Mt dan nomor atom 109. Meitnerium adalah unsur sintetik yang sangat radioaktif (unsur yang tidak ditemukan di alam dan dapat dibuat di laboratorium). Isotop paling stabil yang diketahui, meitnerium-278, memiliki waktu paruh 7,6 detik.' },
        { number: 110, category: 'radioaktif', symbol: 'Ds', name: 'Darmstadtium', description: 'Darmstadtium adalah suatu unsur kimia dengan simbol Ds dan nomor atom 110. Merupakan unsur sintetik yang sangat radioaktif. Isotop paling stabil yang diketahui, darmstadtium-281, memiliki waktu paruh sekitar 10 detik.' },
        { number: 111, category: 'radioaktif', symbol: 'Rg', name: 'Roentgenium', description: 'Roentgenium adalah unsur kimia dengan simbol Rg dan nomor atom 111. Merupakan unsur sintetik yang sangat radioaktif (unsur yang dapat dibuat di laboratorium tetapi tidak ditemukan di alam); isotop paling stabil yang diketahui, roentgenium-282, memiliki waktu paruh 2,1 menit. Roentgenium pertama kali dibuat pada tahun 1994 oleh Pusat Penelitian Ion Berat GSI Helmholtz dekat Darmstadt, Jerman.' },
        { number: 112, category: 'radioaktif', symbol: 'Cn', name: 'Kopernisium', description: 'Copernicium adalah unsur kimia dengan simbol Cn dan nomor atom 112. Merupakan unsur sintetik yang sangat radioaktif yang hanya dapat dibuat di laboratorium. Isotop paling stabil yang diketahui, copernicium-285, memiliki waktu paruh sekitar 29 detik, namun ada kemungkinan bahwa isotop copernicium ini memiliki isomer nuklir dengan waktu paruh lebih lama, 8,9 menit.' },
        { number: 113, category: 'radioaktif', symbol: 'Nh', name: 'Nihonium', description: 'Nihonium adalah unsur kimia dengan nomor atom 113. Ia memiliki simbol Nh. Ini adalah unsur sintetis (unsur yang dapat dibuat di laboratorium tetapi tidak ditemukan di alam) dan sangat radioaktif; isotop paling stabil yang diketahui, nihonium-286, memiliki waktu paruh 20 detik.' },
        { number: 114, category: 'radioaktif', symbol: 'Fl', name: 'Flerovium', description: 'Flerovium adalah unsur kimia buatan superberat dengan simbol Fl dan nomor atom 114. Ini adalah unsur sintetis yang sangat radioaktif. Nama unsur ini diambil dari Laboratorium Reaksi Nuklir Flerov dari Institut Gabungan untuk Penelitian Nuklir di Dubna, Rusia, tempat unsur tersebut ditemukan pada tahun 1998.' },
        { number: 115, category: 'radioaktif', symbol: 'Mc', name: 'Moskovium', description: 'Moscovium adalah nama suatu unsur superberat sintetik dalam tabel periodik yang memiliki simbol Mc dan memiliki nomor atom 115. Merupakan unsur yang sangat radioaktif; isotop paling stabil yang diketahui, moscovium-289, memiliki waktu paruh hanya 220 milidetik. Ia juga dikenal sebagai eka-bismut atau hanya unsur 115.' },
        { number: 116, category: 'radioaktif', symbol: 'Lv', name: 'Livermorium', description: 'Livermorium adalah unsur superberat sintetik dengan simbol Lv dan nomor atom 116. Ini adalah unsur yang sangat radioaktif yang hanya dibuat di laboratorium dan belum pernah diamati di alam. Nama unsur ini diambil dari nama Laboratorium Nasional Lawrence Livermore di Amerika Serikat, yang bekerja sama dengan Institut Gabungan untuk Penelitian Nuklir di Dubna, Rusia untuk menemukan livermorium pada tahun 2000.' },
        { number: 117, category: 'radioaktif', symbol: 'Ts', name: 'Tenesin', description: 'Tennessine adalah unsur kimia buatan superberat dengan nomor atom 117 dan simbol Ts. Juga dikenal sebagai eka-astatin atau unsur 117, unsur ini merupakan unsur terberat kedua dan unsur kedua dari belakang pada periode ke-7 tabel periodik. Pada tahun 2016, lima belas atom tennessine telah diamati: enam saat pertama kali disintesis pada tahun 2010, tujuh pada tahun 2012, dan dua pada tahun 2014.' },
        { number: 118, category: 'radioaktif', symbol: 'Og', name: 'Oganesson', description: 'Oganesson adalah IUPAC\'s name for the transactinide element with the atomic number 118 and element symbol Og. It is also known as eka-radon or element 118, and on the periodic table of the elements it is a p-block element and the last one of the 7th period. Oganesson is currently the only synthetic member of group 18.' },
        { number: 119, category: 'radioaktif', symbol: 'Uue', name: 'Ununennium', description: 'Ununennium, juga dikenal sebagai eka-francium atau sederhananya unsur 119, adalah unsur kimia hipotetis dengan simbol Uue dan nomor atom 119. Ununennium dan Uue masing-masing merupakan nama dan simbol sistematis sementara IUPAC, hingga nama permanen ditentukan. Dalam tabel periodik unsur, diperkirakan merupakan unsur blok s, logam alkali, dan unsur pertama pada periode kedelapan.' },
    ];

    // Fungsi untuk merakit dan membuka pintu
    const openModal = (data) => {
        // Cek apakah modal sudah ada agar tidak tumpang tindih
        if (document.getElementById('dynamic-modal')) return;

        // 1. Membuat fondasi ruang rahasia (elemen div baru)
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.id = 'dynamic-modal';

        // 2. Mengisi perabotan di dalam ruang rahasia (HTML dalam backtick/String Literal)
        modalOverlay.innerHTML = `
            <div class="modal-card">
                <!-- Tombol silang untuk membongkar ruang rahasia -->
                <button class="close-btn" id="close-modal" aria-label="Tutup Modal">
                    <img src="images/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="Tutup">
                </button>
                <div class="modal-top">
                    <span class="atomic-number">${data.number}</span>
                    <h2 class="symbol">${data.symbol}</h2>
                </div>
                <div class="modal-bottom">
                    <h3 class="name">${data.name}</h3>
                    <p class="description">${data.description}</p>
                </div>
            </div>
        `;

        // 3. Menempelkan ruang rahasia ke bangunan utama (body)
        document.body.appendChild(modalOverlay);

        // Trik khusus: memaksa browser "melihat" elemen baru sebelum animasi jalan (Reflow).
        // Ibarat memastikan cat kering sebelum membuka tirai penutup.
        void modalOverlay.offsetWidth; 

        // 4. Memicu animasi CSS untuk muncul
        modalOverlay.classList.add('active'); 
        document.body.classList.add('modal-open'); // Mengunci lantai rumah (Body Lock)

        // Fungsi khusus untuk membongkar (menutup) ruang rahasia
        const closeModal = () => {
            modalOverlay.classList.remove('active'); // Memicu animasi CSS hilang
            document.body.classList.remove('modal-open'); // Melepas kunci lantai
            
            // Menunggu tamu benar-benar keluar (animasi 300ms selesai) sebelum menghapus ruangannya
            setTimeout(() => {
                modalOverlay.remove();
            }, 300);
        };

        // Menugaskan satpam (event listener) pada tombol 'X'
        document.getElementById('close-modal').addEventListener('click', closeModal);

        // Satpam di area gelap sekitar modal
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // Menutup modal dengan tombol 'Escape' di Keyboard
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                // Membebaskan satpam tombol escape karena ruangan sudah dibongkar
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    };

    // Men-generate semua kartu elemen dari elementData ke dalam HTML
    const elementsContainer = document.querySelector('.main-content');
    
    // Menambahkan tombol filter kategori ke dalam footer
    const categoryLabels = {
        semua: 'Semua',
        logam: 'Logam',
        nonlogam: 'Non-Logam',
        metaloid: 'Metaloid',
        gas_mulia: 'Gas Mulia',
        radioaktif: 'Radioaktif',
    };
    
    const footer = document.getElementById('main-footer');
    if (footer) {
        for (const [key, label] of Object.entries(categoryLabels)) {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            const iconSrc = key === 'semua' ? 'images/explosion_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg' : 'images/matter_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
            btn.innerHTML = `<img src="${iconSrc}" alt="${label}">`;
            btn.dataset.category = key;
            btn.dataset.tooltip = label;
            
            // Jadikan tombol "Semua" aktif secara default
            if (key === 'semua') {
                btn.classList.add('active');
            }
            
            // Logika filter: Saat tombol diklik, sembunyikan elemen yang tidak sesuai
            btn.addEventListener('click', () => {
                // Hapus efek aktif dari semua tombol
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                
                // Aktifkan tombol yang diklik (tidak bisa dinonaktifkan dengan klik kedua kali)
                btn.classList.add('active');
                const selectedCategory = key;
                
                // Tampilkan/sembunyikan kartu sesuai kategori
                document.querySelectorAll('.element-card').forEach(card => {
                    if (selectedCategory === 'semua' || card.dataset.category === selectedCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
            
            footer.appendChild(btn);
        }
    }
    
    // ANALOGI: Seperti mempekerjakan tukang bangunan untuk membangun 118+ ruangan
    // secara otomatis, daripada kita yang membangunnya satu per satu dengan tangan.
    elementData.forEach((data) => {
        // Membuat elemen kartu
        const card = document.createElement('div');
        card.className = 'element-card';
        card.tabIndex = 0; // Agar bisa diakses dengan keyboard
        
        // Simpan data kategori di dalam HTML atribut agar mudah diakses filter
        card.dataset.category = data.category;
        
        card.innerHTML = `
            <div class="card-top">
                <span class="atomic-number">${data.number}</span>
                <h2 class="symbol">${data.symbol}</h2>
            </div>
            <div class="card-bottom">
                <h3 class="name">${data.name}</h3>
            </div>
        `;

        // Menugaskan satpam di tiap kartu yang baru dibangun
        card.addEventListener('click', () => openModal(data));
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') openModal(data);
        });

        // Memasukkan kartu ke dalam wadah utama di pameran
        elementsContainer.appendChild(card);
    });
});
