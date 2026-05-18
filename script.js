/* =============================================================
   APLIKASI TABEL PERIODIK INTERAKTIF
   
   File ini berisi seluruh logika JavaScript aplikasi:
   - Database 118 unsur kimia dengan deskripsi lengkap
   - Sistem filter kategori (Logam, Non-logam, Metaloid, dll)
   - Fungsi pencarian real-time
   - Modal/popup untuk detail unsur
   - Toggle tema Dark/Light dengan localStorage
   - Animasi dan interaktivitas kartu
   
   Cara kerja utama:
   1. Data disimpan dalam array `elements`
   2. DOM diisi secara dinamis oleh fungsi renderCards()
   3. Event listeners menangani interaksi user
   4. State disimpan dalam variabel activeFilter dan searchTerm
   ============================================================= */

/* =============================================================
   SECTION: DATABASE UNSUR (ELEMENT DATABASE)
   
   Array `elements` menyimpan data 118 unsur kimia.
   Setiap unsur adalah objek JavaScript dengan properti:
   
   - symbol: Simbol kimia (string, contoh: "H", "He", "Li")
   - name: Nama unsur dalam Bahasa Indonesia (string)
   - desc: Deskripsi singkat/slogan (string)
   - longDesc: Penjelasan lengkap tentang unsur (string)
   - cat: Kategori (string: "logam", "nonlogam", "metaloid", 
          "gas_mulia", "radioaktif")
   
   Urutan array mengikuti nomor atom (indeks 0 = Hidrogen/1,
   indeks 1 = Helium/2, dst).
   ============================================================= */

const elements = [
  // Periode 1
  {
    "symbol": "H",
    "name": "Hidrogen",
    "desc": "Paling ringan",
    "longDesc": "Unsur paling ringan dengan nomor atom 1. Memiliki 1 proton dan 1 elektron. Merupakan unsur paling melimpah di alam semesta (75% massa). Di Bumi, ditemukan dalam air (H₂O) dan senyawa organik. Isotopnya meliputi protium, deuterium, dan tritium.",
    "cat": "nonlogam"
  },
  {
    "symbol": "He",
    "name": "Helium",
    "desc": "Sangat stabil",
    "longDesc": "Gas mulia dengan nomor atom 2. Memiliki konfigurasi elektron 1s² yang sangat stabil. Tidak reaktif karena kulit elektron terluarnya penuh. Digunakan dalam balon, pendingin MRI, dan sebagai atmosfer pelindung dalam pengelasan. Unsur paling ringan yang tidak dapat terbakar.",
    "cat": "gas mulia"
  },

  // Periode 2
  {
    "symbol": "Li",
    "name": "Litium",
    "desc": "Baterai",
    "longDesc": "Logam alkali dengan nomor atom 3. Logam paling ringan (massa jenis 0.534 g/cm³). Sangat reaktif dan mudah teroksidasi di udara. Digunakan dalam baterai lithium-ion, obat bipolar, dan paduan aluminium. Bereaksi keras dengan air menghasilkan gas hidrogen.",
    "cat": "logam"
  },
  {
    "symbol": "Be",
    "name": "Berilium",
    "desc": "Kuat beracun",
    "longDesc": "Logam alkali tanah dengan nomor atom 4. Memiliki kekuatan tinggi namun sangat ringan. Beracun dan dapat menyebabkan penyakit paru-paru (beriliosis). Digunakan dalam aplikasi aerospace, jendela sinar-X, dan sebagai moderator neutron dalam reaktor nuklir.",
    "cat": "logam"
  },
  {
    "symbol": "B",
    "name": "Boron",
    "desc": "Semi-logam",
    "longDesc": "Metaloid dengan nomor atom 5. Memiliki sifat antara logam dan non-logam. Sangat keras (9.3 skala Mohs untuk boron kristalin). Digunakan dalam kaca borosilikat (Pyrex), deterjen, dan sebagai dopan semikonduktor. Senyawa boron digunakan dalam pengobatan kanker.",
    "cat": "metaloid"
  },
  {
    "symbol": "C",
    "name": "Karbon",
    "desc": "Kehidupan",
    "longDesc": "Non-logam dengan nomor atom 6. Dasar semua kehidupan di Bumi karena kemampuan membentuk 4 ikatan kovalen. Memiliki alotrop: grafit (lunak, konduktor), intan (keras, isolator), fullerene, dan graphene. Membentuk lebih banyak senyawa daripada unsur lainnya.",
    "cat": "nonlogam"
  },
  {
    "symbol": "N",
    "name": "Nitrogen",
    "desc": "Udara",
    "longDesc": "Non-logam dengan nomor atom 7. Membentuk 78% atmosfer Bumi sebagai N₂. Memiliki ikatan rangkap tiga yang sangat kuat (941 kJ/mol). Esensial untuk kehidupan sebagai komponen protein dan DNA. Digunakan dalam pupuk, bahan peledak, dan sebagai atmosfer inert.",
    "cat": "nonlogam"
  },
  {
    "symbol": "O",
    "name": "Oksigen",
    "desc": "Napas",
    "longDesc": "Non-logam dengan nomor atom 8. Membentuk 21% atmosfer Bumi. Sangat elektronegatif (3.44 skala Pauling). Esensial untuk respirasi seluler dan pembakaran. Membentuk ozon (O₃) di stratosfer yang melindungi dari UV. Senyawa paling umum di kerak Bumi sebagai silikat dan oksida.",
    "cat": "nonlogam"
  },
  {
    "symbol": "F",
    "name": "Fluorin",
    "desc": "Reaktif",
    "longDesc": "Halogen dengan nomor atom 9. Unsur paling elektronegatif (3.98 skala Pauling) dan paling reaktif. Bereaksi dengan hampir semua unsur termasuk gas mulia. Digunakan dalam pasta gigi (NaF), pendingin (CFC), dan Teflon. Senyawa fluorocarbon sangat stabil.",
    "cat": "nonlogam"
  },
  {
    "symbol": "Ne",
    "name": "Neon",
    "desc": "Lampu",
    "longDesc": "Gas mulia dengan nomor atom 10. Tidak berwarna, tidak berbau, dan sangat tidak reaktif. Memancarkan cahaya oranye-merah khas saat dialiri listrik. Digunakan dalam lampu neon, laser helium-neon, dan sebagai pendingin kriogenik. Langka di Bumi tetapi umum di alam semesta.",
    "cat": "gas mulia"
  },

  // Periode 3
  {
    "symbol": "Na",
    "name": "Natrium",
    "desc": "Reaktif",
    "longDesc": "Logam alkali dengan nomor atom 11. Sangat reaktif, disimpan dalam minyak untuk mencegah oksidasi. Bereaksi keras dengan air menghasilkan NaOH dan H₂. Esensial untuk fungsi saraf dan keseimbangan cairan. Senyawa NaCl (garam dapur) vital untuk kehidupan.",
    "cat": "logam"
  },
  {
    "symbol": "Mg",
    "name": "Magnesium",
    "desc": "Ringan",
    "longDesc": "Logam alkali tanah dengan nomor atom 12. Ringan (1.74 g/cm³) dan kuat. Membakar dengan nyala putih terang. Esensial untuk fotosintesis (klorofil) dan fungsi enzim manusia. Digunakan dalam paduan aerospace, kembang api, dan sebagai anoda korban.",
    "cat": "logam"
  },
  {
    "symbol": "Al",
    "name": "Aluminium",
    "desc": "Anti karat",
    "longDesc": "Logam pasca-transisi dengan nomor atom 13. Logam paling melimpah di kerak Bumi (8.23%). Ringan, kuat, dan tahan korosi karena lapisan oksida pelindung. Digunakan dalam konstruksi, kemasan, transportasi, dan kabel listrik. Dapat didaur ulang tanpa batas.",
    "cat": "logam"
  },
  {
    "symbol": "Si",
    "name": "Silikon",
    "desc": "Chip",
    "longDesc": "Metaloid dengan nomor atom 14. Unsur kedua paling melimpah di kerak Bumi (27.7%). Semikonduktor intrinsik yang menjadi dasar industri elektronik modern. Digunakan dalam chip komputer, panel surya, kaca, dan semen. Silikon dioksida (pasir) adalah bahan utama kaca.",
    "cat": "metaloid"
  },
  {
    "symbol": "P",
    "name": "Fosfor",
    "desc": "Energi",
    "longDesc": "Non-logam dengan nomor atom 15. Esensial untuk kehidupan sebagai komponen ATP (energi sel), DNA, dan tulang. Memiliki beberapa alotrop: putih (beracun, berpendar), merah (aman), dan hitam (semikonduktor). Digunakan dalam pupuk, deterjen, dan korek api.",
    "cat": "nonlogam"
  },
  {
    "symbol": "S",
    "name": "Belerang",
    "desc": "Bau",
    "longDesc": "Non-logam dengan nomor atom 16. Padatan kuning yang rapuh dengan bau khas. Komponen asam amino sistein dan metionin. Digunakan dalam asam sulfat (H₂SO₄) - bahan kimia paling banyak diproduksi. Juga dalam vulkanisasi karet, pupuk, dan obat-obatan.",
    "cat": "nonlogam"
  },
  {
    "symbol": "Cl",
    "name": "Klorin",
    "desc": "Disinfektan",
    "longDesc": "Halogen dengan nomor atom 17. Gas kuning-hijau beracun dengan bau menyengat. Sangat reaktif dan oksidator kuat. Digunakan untuk disinfeksi air, produksi PVC, pelarut, dan pemutih. Ion klorida (Cl⁻) esensial untuk keseimbangan elektrolit tubuh.",
    "cat": "nonlogam"
  },
  {
    "symbol": "Ar",
    "name": "Argon",
    "desc": "Inert",
    "longDesc": "Gas mulia dengan nomor atom 18. Gas paling melimpah ketiga di atmosfer Bumi (0.93%). Sangat tidak reaktif karena konfigurasi elektron penuh. Digunakan sebagai atmosfer inert dalam pengelasan, produksi logam, dan lampu pijar. Juga dalam laser argon untuk operasi mata.",
    "cat": "gas mulia"
  },

  // Periode 4
  {
    "symbol": "K",
    "name": "Kalium",
    "desc": "Saraf",
    "longDesc": "Logam alkali dengan nomor atom 19. Sangat reaktif, bereaksi keras dengan air. Esensial untuk fungsi saraf, kontraksi otot, dan keseimbangan cairan. Ion K⁺ adalah kation utama dalam sel. Digunakan dalam pupuk (KCl) dan sebagai katalis dalam sintesis kimia.",
    "cat": "logam"
  },
  {
    "symbol": "Ca",
    "name": "Kalsium",
    "desc": "Tulang",
    "longDesc": "Logam alkali tanah dengan nomor atom 20. Mineral paling melimpah dalam tubuh manusia (99% dalam tulang dan gigi). Esensial untuk kontraksi otot, pembekuan darah, dan sinyal sel. Senyawa CaCO₃ membentuk batu kapur, marmer, dan cangkang organisme laut.",
    "cat": "logam"
  },
  {
    "symbol": "Sc",
    "name": "Skandium",
    "desc": "Ringan",
    "longDesc": "Logam transisi dengan nomor atom 21. Logam ringan dengan titik leleh tinggi (1541°C). Digunakan dalam paduan aluminium-skandium untuk aerospace dan peralatan olahraga. Skandium iodida digunakan dalam lampu HID untuk produksi cahaya putih terang.",
    "cat": "logam"
  },
  {
    "symbol": "Ti",
    "name": "Titanium",
    "desc": "Kuat",
    "longDesc": "Logam transisi dengan nomor atom 22. Kuat seperti baja namun 45% lebih ringan. Tahan korosi bahkan dalam air laut dan klorin. Digunakan dalam aerospace, implan medis, cat putih (TiO₂), dan peralatan olahraga. Biokompatibel - tidak ditolak tubuh.",
    "cat": "logam"
  },
  {
    "symbol": "V",
    "name": "Vanadium",
    "desc": "Baja",
    "longDesc": "Logam transisi dengan nomor atom 23. Keras, tahan korosi, dan stabil terhadap basa. Digunakan dalam baja kecepatan tinggi dan paduan titanium. Vanadium pentoksida (V₂O₅) adalah katalis penting dalam produksi asam sulfat. Juga dalam baterai aliran redoks.",
    "cat": "logam"
  },
  {
    "symbol": "Cr",
    "name": "Kromium",
    "desc": "Anti karat",
    "longDesc": "Logam transisi dengan nomor atom 24. Keras, mengkilap, dan tahan korosi. Digunakan dalam pelapisan krom (chrome plating) dan baja tahan karat (stainless steel). Senyawa kromium memberikan warna pada ruby (merah) dan zamrud (hijau). Esensial dalam metabolisme glukosa.",
    "cat": "logam"
  },
  {
    "symbol": "Mn",
    "name": "Mangan",
    "desc": "Industri",
    "longDesc": "Logam transisi dengan nomor atom 25. Keras dan rapuh, digunakan terutama dalam paduan baja. Mangan dioksida (MnO₂) digunakan dalam baterai alkaline. Esensial sebagai kofaktor enzim dan dalam fotosintesis (pemisahan air). Senyawa Mn memberikan warna ungu pada kalium permanganat.",
    "cat": "logam"
  },
  {
    "symbol": "Fe",
    "name": "Besi",
    "desc": "Konstruksi",
    "longDesc": "Logam transisi dengan nomor atom 26. Logam paling banyak digunakan di dunia. Komponen utama baja. Esensial untuk kehidupan sebagai komponen hemoglobin (mengangkut O₂) dan mioglobin. Inti Bumi terdiri terutama dari besi. Oksidasi besi menghasilkan karat (Fe₂O₃).",
    "cat": "logam"
  },
  {
    "symbol": "Co",
    "name": "Kobalt",
    "desc": "Magnet",
    "longDesc": "Logam transisi dengan nomor atom 27. Keras, mengkilap, dan feromagnetik. Komponen penting dalam magnet permanen (Alnico, SmCo). Esensial sebagai komponen vitamin B12. Digunakan dalam superalloy untuk turbin jet dan sebagai pigmen biru dalam kaca dan keramik.",
    "cat": "logam"
  },
  {
    "symbol": "Ni",
    "name": "Nikel",
    "desc": "Tahan",
    "longDesc": "Logam transisi dengan nomor atom 28. Tahan korosi dan oksidasi. Komponen utama baja tahan karat dan paduan super. Digunakan dalam baterai NiCd dan NiMH, pelapisan, dan koin. Nikel murni relatif tidak reaktif. Beberapa orang memiliki alergi terhadap nikel.",
    "cat": "logam"
  },
  {
    "symbol": "Cu",
    "name": "Tembaga",
    "desc": "Listrik",
    "longDesc": "Logam transisi dengan nomor atom 29. Konduktor listrik terbaik kedua setelah perak. Digunakan dalam kabel listrik, motor, dan elektronik. Esensial sebagai kofaktor enzim dan dalam pembentukan sel darah merah. Patina hijau (CuCO₃) melindungi dari korosi lebih lanjut.",
    "cat": "logam"
  },
  {
    "symbol": "Zn",
    "name": "Seng",
    "desc": "Pelindung",
    "longDesc": "Logam transisi dengan nomor atom 30. Tahan korosi, digunakan untuk galvanisasi baja. Esensial untuk kehidupan - komponen 300+ enzim. Digunakan dalam baterai, paduan kuningan, dan obat flu (zinc gluconate). Oksida seng (ZnO) digunakan dalam tabir surya dan salep.",
    "cat": "logam"
  },
  {
    "symbol": "Ga",
    "name": "Galium",
    "desc": "Cair",
    "longDesc": "Logam pasca-transisi dengan nomor atom 31. Meleleh pada 29.76°C (dapat meleleh di tangan). Tidak beracun dan tidak reaktif dengan air. Digunakan dalam semikonduktor (GaAs, GaN) untuk LED, laser, dan sel surya. Paduan galium digunakan sebagai pengganti merkuri dalam termometer.",
    "cat": "logam"
  },
  {
    "symbol": "Ge",
    "name": "Germanium",
    "desc": "Semikonduktor",
    "longDesc": "Metaloid with nomor atom 32. Semikonduktor intrinsik yang digunakan dalam transistor pertama. Sekarang digunakan dalam serat optik, sel surya, dan lensa inframerah. Transparan terhadap radiasi inframerah. Germanium murni sangat rapuh dan kristalin.",
    "cat": "metaloid"
  },
  {
    "symbol": "As",
    "name": "Arsenik",
    "desc": "Beracun",
    "longDesc": "Metaloid dengan nomor atom 33. Sangat beracun dalam bentuk anorganik. Digunakan dalam semikonduktor (GaAs), kayu yang diawetkan, dan historically sebagai racun. Dalam dosis kecil, beberapa senyawa arsenik digunakan dalam pengobatan kanker. Air tanah terkontaminasi adalah masalah kesehatan global.",
    "cat": "metaloid"
  },
  {
    "symbol": "Se",
    "name": "Selenium",
    "desc": "Jejak",
    "longDesc": "Non-logam with nomor atom 34. Esensial sebagai nutrisi jejak (antioksidan) namun beracun dalam dosis tinggi. Digunakan dalam fotokopier, sel surya, dan kaca berwarna. Selenida memberikan warna merah pada kaca. Foto konduktif - digunakan dalam light meter kamera.",
    "cat": "nonlogam"
  },
  {
    "symbol": "Br",
    "name": "Bromin",
    "desc": "Cair",
    "longDesc": "Halogen dengan nomor atom 35. Satu-satunya non-logam cair pada suhu ruang. Cairan merah-coklat yang mudah menguap dengan bau menyengat. Sangat reaktif dan korosif. Digunakan dalam flame retardant, fumigan, dan fotografi (AgBr). Senyawa bromin digunakan dalam obat penenang.",
    "cat": "nonlogam"
  },
  {
    "symbol": "Kr",
    "name": "Kripton",
    "desc": "Langka",
    "longDesc": "Gas mulia dengan nomor atom 36. Tidak berwarna, tidak berbau, dan sangat tidak reaktif. Jejak di atmosfer (1 ppm). Digunakan dalam lampu kilat fotografi, laser, dan jendela isolasi termal. Kripton fluorida (KrF₂) adalah salah satu sedikit senyawa gas mulia yang stabil.",
    "cat": "gas mulia"
  },

  // Periode 5
  {
    "symbol": "Rb",
    "name": "Rubidium",
    "desc": "Reaktif",
    "longDesc": "Logam alkali with nomor atom 37. Sangat reaktif - menyala spontan di udara. Bereaksi keras dengan air bahkan pada suhu rendah. Digunakan dalam jam atom (presisi tinggi), sel fotolistrik, dan penelitian kuantum. Ion Rb⁺ meniru K⁺ dalam sistem biologis.",
    "cat": "logam"
  },
  {
    "symbol": "Sr",
    "name": "Stronsium",
    "desc": "Merah",
    "longDesc": "Logam alkali tanah with nomor atom 38. Bereaksi dengan air menghasilkan Sr(OH)₂. Senyawa stronsium memberikan warna merah terang pada kembang api. Stronsium-90 adalah produk fisi nuklir yang berbahaya. Digunakan dalam kaca TV tabung dan magnet ferit.",
    "cat": "logam"
  },
  {
    "symbol": "Y",
    "name": "Itrium",
    "desc": "Teknologi",
    "longDesc": "Logam transisi with nomor atom 39. Digunakan dalam LED putih (YAG phosphor), superkonduktor suhu tinggi (YBCO), dan laser. Yttria (Y₂O₃) menstabilkan zirkonia untuk aplikasi suhu tinggi. Digunakan dalam paduan aluminium-magnesium untuk aerospace.",
    "cat": "logam"
  },
  {
    "symbol": "Zr",
    "name": "Zirkonium",
    "desc": "Tahan panas",
    "longDesc": "Logam transisi with nomor atom 40. Tahan korosi luar biasa, terutama terhadap asam dan basa. Digunakan dalam cladding bahan bakar nuklir, keramik tahan panas, dan implan medis. Zirkonia (ZrO₂) digunakan sebagai berlian imitasi dan dalam gigi palsu.",
    "cat": "logam"
  },
  {
    "symbol": "Nb",
    "name": "Niobium",
    "desc": "Super",
    "longDesc": "Logam transisi with nomor atom 41. Digunakan dalam baja berkekuatan tinggi dan superkonduktor (NbTi, Nb₃Sn). Magnet superkonduktor di MRI dan akselerator partikel menggunakan paduan niobium. Ditambahkan ke baja tahan karat untuk mencegah korosi antar-butir.",
    "cat": "logam"
  },
  {
    "symbol": "Mo",
    "name": "Molibdenum",
    "desc": "Tahan",
    "longDesc": "Logam transisi with nomor atom 42. Titik leleh sangat tinggi (2623°C). Digunakan dalam baja paduan, katalis, dan elektroda. Esensial sebagai kofaktor enzim (nitrogenase, xanthine oxidase). Molibdenum disulfida (MoS₂) adalah pelumas padat yang sangat baik.",
    "cat": "logam"
  },
  {
    "symbol": "Tc",
    "name": "Teknesium",
    "desc": "Radioaktif",
    "longDesc": "Logam transisi with nomor atom 43. Unsur pertama yang disintesis secara buatan. Semua isotop radioaktif - yang paling stabil (Tc-98) memiliki waktu paruh 4.2 juta tahun. Teknesium-99m digunakan secara luas dalam pencitraan medis nuklir (80% prosedur diagnostik).",
    "cat": "radioaktif"
  },
  {
    "symbol": "Ru",
    "name": "Rutenium",
    "desc": "Keras",
    "longDesc": "Logam transisi with nomor atom 44. Logam paling keras dalam golongan platina. Tahan korosi dan oksidasi. Digunakan dalam paduan platina, kontak listrik, dan katalis. Senyawa rutenium diteliti untuk sel surya dye-sensitized dan terapi kanker.",
    "cat": "logam"
  },
  {
    "symbol": "Rh",
    "name": "Rodium",
    "desc": "Reflektif",
    "longDesc": "Logam transisi with nomor atom 45. Salah satu logam paling langka dan berharga. Sangat reflektif, tahan korosi, dan keras. Digunakan dalam konverter katalitik (mengurangi NOx), pelapisan perhiasan, dan cermin optik. Titik leleh tinggi (1964°C).",
    "cat": "logam"
  },
  {
    "symbol": "Pd",
    "name": "Paladium",
    "desc": "Katalis",
    "longDesc": "Logam transisi with nomor atom 46. Dapat menyerap 900 kali volumenya sendiri dalam gas hidrogen. Digunakan dalam konverter katalitik, elektronik, dan kedokteran gigi. Katalis penting dalam reaksi cross-coupling (reaksi Suzuki, Heck). Murni dan hypoallergenic untuk perhiasan.",
    "cat": "logam"
  },
  {
    "symbol": "Ag",
    "name": "Perak",
    "desc": "Konduktor",
    "longDesc": "Logam transisi with nomor atom 47. Konduktor listrik dan termal terbaik dari semua logam. Antibakteri alami - ion Ag⁺ membunuh mikroba. Digunakan dalam perhiasan, koin, fotografi, dan elektronik. Perak halida (AgCl, AgBr) sensitif terhadap cahaya.",
    "cat": "logam"
  },
  {
    "symbol": "Cd",
    "name": "Kadmium",
    "desc": "Beracun",
    "longDesc": "Logam transisi with nomor atom 48. Lunak, putih kebiruan, dan sangat beracun. Digunakan dalam baterai NiCd, pelapisan, dan pigmen. Menyerap neutron dengan baik - digunakan dalam batang kendali reaktor. Akumulasi biologis menyebabkan kerusakan ginjal dan tulang (Itai-itai disease).",
    "cat": "logam"
  },
  {
    "symbol": "In",
    "name": "Indium",
    "desc": "Lunak",
    "longDesc": "Logam pasca-transisi with nomor atom 49. Sangat lunak (dapat dipotong dengan pisau). Indium tin oxide (ITO) transparan dan konduktif - esensial untuk layar sentuh, LCD, dan panel surya. Titik leleh rendah (156.6°C). Digunakan dalam solder dan paduan bearing.",
    "cat": "logam"
  },
  {
    "symbol": "Sn",
    "name": "Timah",
    "desc": "Pelapis",
    "longDesc": "Logam pasca-transisi with nomor atom 50. Tahan korosi, digunakan untuk melapisi baja (tinplate). Memiliki dua alotrop: timah putih (logam) dan timah abu-abu (semikonduktor). Paduan: perunggu (Cu+Sn), solder (Sn+Pb). Senyawa organotin digunakan sebagai biocide.",
    "cat": "logam"
  },
  {
    "symbol": "Sb",
    "name": "Antimon",
    "desc": "Paduan",
    "longDesc": "Metaloid with nomor atom 51. Rapuh, putih keperakan. Digunakan sebagai pengeras dalam paduan timbal (baterai, peluru). Antimon trioksida adalah flame retardant penting. Senyawa antimon digunakan dalam pengobatan leishmaniasis. Semikonduktor dalam bentuk murni.",
    "cat": "metaloid"
  },
  {
    "symbol": "Te",
    "name": "Telurium",
    "desc": "Langka",
    "longDesc": "Metaloid with nomor atom 52. Langka di kerak Bumi. Perak mengkilap dengan bau khas. Digunakan dalam paduan baja, sel surya CdTe, dan karet yang divulkanisasi. Senyawa telurium memberikan warna biru pada kaca. Semikonduktor dengan aplikasi termoelektrik.",
    "cat": "metaloid"
  },
  {
    "symbol": "I",
    "name": "Iodin",
    "desc": "Tiroid",
    "longDesc": "Halogen with nomor atom 53. Padatan ungu-hitam yang menyublim menjadi uap ungu. Esensial untuk hormon tiroid (T3, T4). Defisiensi menyebabkan gondok. Digunakan sebagai antiseptik (tincture of iodine), dalam fotografi, dan sintesis organik. Larutan iodin-amilum berwarna biru tua.",
    "cat": "nonlogam"
  },
  {
    "symbol": "Xe",
    "name": "Xenon",
    "desc": "Lampu",
    "longDesc": "Gas mulia with nomor atom 54. Paling reaktif di antara gas mulia - membentuk senyawa dengan fluorin dan oksigen. Digunakan dalam lampu kilat, lampu arc, dan propulsi ion untuk satelit. Xenon-133 digunakan dalam pencitraan paru-paru. Anestesi umum yang efektif.",
    "cat": "gas mulia"
  },

  // Periode 6
  {
    "symbol": "Cs",
    "name": "Sesium",
    "desc": "Reaktif",
    "longDesc": "Logam alkali with nomor atom 55. Paling reaktif dari semua logam - meledak saat kontak dengan air. Cair pada suhu ruang hangat (mp 28.4°C). Sesium-133 digunakan dalam jam atom yang mendefinisikan detik SI. Digunakan dalam sel fotolistrik dan propulsi ion.",
    "cat": "logam"
  },
  {
    "symbol": "Ba",
    "name": "Barium",
    "desc": "Medis",
    "longDesc": "Logam alkali tanah with nomor atom 56. Sangat reaktif, disimpan dalam minyak. Senyawa BaSO₄ tidak larut dan digunakan dalam radiografi pencernaan (barium meal). Senyawa barium memberikan warna hijau pada kembang api. Beracun dalam bentuk larut.",
    "cat": "logam"
  },
  {
    "symbol": "La",
    "name": "Lantanum",
    "desc": "Tanah jarang",
    "longDesc": "Logam lantanida with nomor atom 57. Pertama dari seri lantanida. Lunak, mudah ditempa, dan sangat reaktif. Digunakan dalam kaca optik khusus, baterai NiMH, dan katalis cracking minyak. Lantanum oksida meningkatkan indeks bias kaca.",
    "cat": "logam"
  },
  {
    "symbol": "Ce",
    "name": "Serium",
    "desc": "Katalis",
    "longDesc": "Logam lantanida with nomor atom 58. Lantanida paling melimpah. Oksidasi mudah (Ce³⁺ ↔ Ce⁴⁺). Digunakan dalam konverter katalitik, polishing kaca, dan kaca berwarna. Serium oksida adalah abrasif penting untuk polishing optik presisi tinggi.",
    "cat": "logam"
  },
  {
    "symbol": "Pr",
    "name": "Praseodimium",
    "desc": "Magnet",
    "longDesc": "Logam lantanida with nomor atom 59. Lunak, perak, dan mudah teroksidasi. Komponen penting dalam magnet neodymium (NdFeB). Senyawa praseodimium memberikan warna kuning-hijau pada kaca dan keramik. Digunakan dalam laser state-doped dan serat optik amplifier.",
    "cat": "logam"
  },
  {
    "symbol": "Nd",
    "name": "Neodimium",
    "desc": "Magnet kuat",
    "longDesc": "Logam lantanida with nomor atom 60. Komponen utama magnet terkuat (Nd₂Fe₁₄B) - digunakan dalam motor EV, turbin angin, dan hard drive. Laser Nd:YAG digunakan dalam operasi dan manufaktur. Senyawa neodimium memberikan warna ungu pada kaca.",
    "cat": "logam"
  },
  {
    "symbol": "Pm",
    "name": "Prometium",
    "desc": "Radioaktif",
    "longDesc": "Logam lantanida with nomor atom 61. Satu-satunya lantanida yang tidak memiliki isotop stabil. Semua isotop radioaktif - yang paling stabil (Pm-145) memiliki waktu paruh 17.7 tahun. Digunakan dalam baterai nuklir dan cat berpendar. Sangat langka di alam.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Sm",
    "name": "Samarium",
    "desc": "Magnet",
    "longDesc": "Logam lantanida with nomor atom 62. Digunakan dalam magnet SmCo₅ yang tahan suhu tinggi. Samarium-149 adalah penyerap neutron yang sangat baik - digunakan dalam batang kendali reaktor. Senyawa samarium digunakan dalam laser dan kapasitor keramik.",
    "cat": "logam"
  },
  {
    "symbol": "Eu",
    "name": "Europium",
    "desc": "Cahaya",
    "longDesc": "Logam lantanida with nomor atom 63. Salah satu lantanida paling reaktif. Europium oksida adalah fosfor merah penting dalam layar CRT, LCD, dan lampu fluorescent. Eu²⁺ dan Eu³⁺ memberikan warna berbeda. Digunakan dalam detektor neutron.",
    "cat": "logam"
  },
  {
    "symbol": "Gd",
    "name": "Gadolinium",
    "desc": "MRI",
    "longDesc": "Logam lantanida with nomor atom 64. Feromagnetik pada suhu rendah. Memiliki penampang tangkap neutron tertinggi - digunakan dalam reaktor nuklir. Kompleks gadolinium digunakan sebagai agen kontras MRI. Juga dalam memori komputer dan aplikasi magnetokalorik.",
    "cat": "logam"
  },
  {
    "symbol": "Tb",
    "name": "Terbium",
    "desc": "Fluoresen",
    "longDesc": "Logam lantanida with nomor atom 65. Lunak, mudah ditempa. Senyawa terbium memberikan warna hijau pada fosfor (lampu fluorescent, layar). Digunakan dalam magnetostriktif Terfenol-D (berubah bentuk dalam medan magnet). Komponen dalam laser state-doped.",
    "cat": "logam"
  },
  {
    "symbol": "Dy",
    "name": "Disprosium",
    "desc": "Magnet",
    "longDesc": "Logam lantanida with nomor atom 66. Memiliki momen magnetik tertinggi dari semua unsur. Ditambahkan ke magnet NdFeB untuk meningkatkan koersivitas pada suhu tinggi (motor EV, turbin angin). Digunakan dalam laser dan aplikasi magnetostriktif.",
    "cat": "logam"
  },
  {
    "symbol": "Ho",
    "name": "Holmium",
    "desc": "Magnet",
    "longDesc": "Logam lantanida with nomor atom 67. Memiliki permeabilitas magnetik tertinggi. Digunakan dalam magnet kuat dan sebagai penyerap neutron dalam reaktor. Laser holmium digunakan dalam operasi medis (pembedahan jaringan lunak). Senyawa holmium memberikan warna kuning pada kaca.",
    "cat": "logam"
  },
  {
    "symbol": "Er",
    "name": "Erbium",
    "desc": "Optik",
    "longDesc": "Logam lantanida with nomor atom 68. Ion Er³⁺ penting dalam amplifier serat optik (EDFA) - memperkuat sinyal dalam jaringan telekomunikasi. Laser erbium digunakan dalam dermatologi. Senyawa erbium memberikan warna merah muda pada kaca dan keramik.",
    "cat": "logam"
  },
  {
    "symbol": "Tm",
    "name": "Tulium",
    "desc": "Langka",
    "longDesc": "Logam lantanida with nomor atom 69. Lantanida paling langka di alam (kecuali Pm). Lunak, mudah ditempa. Laser thulium digunakan dalam operasi dan LIDAR. Tm³⁺ digunakan dalam amplifier serat optik. Sumber radiasi portabel untuk pencitraan medis.",
    "cat": "logam"
  },
  {
    "symbol": "Yb",
    "name": "Iterbium",
    "desc": "Stabil",
    "longDesc": "Logam lantanida with nomor atom 70. Memiliki dua valensi (Yb²⁺ dan Yb³⁺). Digunakan dalam baja tahan karat, laser state-doped, dan jam atom optik. Ytterbium fiber laser digunakan dalam marking dan cutting industri. Agen kontras dalam pencitraan medis.",
    "cat": "logam"
  },
  {
    "symbol": "Lu",
    "name": "Lutesium",
    "desc": "Padat",
    "longDesc": "Logam lantanida with nomor atom 71. Lantanida terakhir, paling keras dan tertinggi titik leburnya. Digunakan dalam detektor PET (LSO:Lu), katalis cracking minyak, dan scintillator. Lutetium-176 digunakan dalam penanggalan geologis. Mahal karena kelangkaan.",
    "cat": "logam"
  },
  {
    "symbol": "Hf",
    "name": "Hafnium",
    "desc": "Tahan panas",
    "longDesc": "Logam transisi with nomor atom 72. Sangat tahan korosi dan memiliki titik leleh tinggi (2233°C). Digunakan dalam batang kendali reaktor nuklir (penyerap neutron baik). Paduan hafnium-karbida memiliki titik leleh tertinggi (3900°C). Digunakan dalam elektroda dan superalloy.",
    "cat": "logam"
  },
  {
    "symbol": "Ta",
    "name": "Tantalum",
    "desc": "Korosi",
    "longDesc": "Logam transisi with nomor atom 73. Sangat tahan korosi (bahkan terhadap aqua regia). Digunakan dalam kapasitor elektronik (serbuk Ta), implan medis, dan peralatan kimia. Tantalum karbida adalah salah satu material terkeras. Biokompatibel sempurna.",
    "cat": "logam"
  },
  {
    "symbol": "W",
    "name": "Tungsten",
    "desc": "Leleh tinggi",
    "longDesc": "Logam transisi with nomor atom 74. Titik leleh tertinggi dari semua logam (3422°C). Sangat keras dan padat (19.25 g/cm³). Digunakan dalam filamen lampu, elektroda, dan paduan baja kecepatan tinggi. Karbida tungsten (WC) digunakan dalam alat potong.",
    "cat": "logam"
  },
  {
    "symbol": "Re",
    "name": "Renium",
    "desc": "Langka",
    "longDesc": "Logam transisi with nomor atom 75. Salah satu logam paling langka di kerak Bumi. Titik leleh sangat tinggi (3186°C). Digunakan dalam superalloy untuk turbin jet dan katalis reforming minyak. Paduan W-Re digunakan dalam termokopel suhu tinggi.",
    "cat": "logam"
  },
  {
    "symbol": "Os",
    "name": "Osmium",
    "desc": "Padat",
    "longDesc": "Logam transisi with nomor atom 76. Unsur paling padat (22.59 g/cm³). Keras, rapuh, dan tahan korosi. Osmium tetroksida (OsO₄) sangat beracun - digunakan dalam mikroskopi elektron dan pewarnaan jaringan. Paduan osmium digunakan dalam instrumen presisi.",
    "cat": "logam"
  },
  {
    "symbol": "Ir",
    "name": "Iridium",
    "desc": "Tahan",
    "longDesc": "Logam transisi with nomor atom 77. Logam paling tahan korosi - tidak diserang oleh asam atau aqua regia. Sangat keras dan rapuh. Digunakan dalam busi, crucible untuk kristal pertumbuhan, dan standar kilogram internasional. Iridium anomaly menandai batas K-T (kepunahan dinosaurus).",
    "cat": "logam"
  },
  {
    "symbol": "Pt",
    "name": "Platina",
    "desc": "Katalis",
    "longDesc": "Logam transisi with nomor atom 78. Mulia, tahan korosi, dan sangat katalitik. Digunakan dalam konverter katalitik, perhiasan, dan elektroda. Cisplatin (Pt(NH₃)₂Cl₂) adalah obat kemoterapi penting. Standar kilogram dan meter dulu didefinisikan dengan paduan Pt-Ir.",
    "cat": "logam"
  },
  {
    "symbol": "Au",
    "name": "Emas",
    "desc": "Mulia",
    "longDesc": "Logam transisi with nomor atom 79. Logam mulia klasik - tidak bereaksi dengan oksigen atau sebagian besar asam. Sangat dapat ditempa (1 gram dapat ditarik menjadi kawat 2 km). Digunakan dalam perhiasan, elektronik, dan sebagai standar moneter. Nanopartikel emas berwarna merah.",
    "cat": "logam"
  },
  {
    "symbol": "Hg",
    "name": "Merkuri",
    "desc": "Cair",
    "longDesc": "Logam transisi with nomor atom 80. Satu-satunya logam cair pada suhu ruang. Sangat beracun (terutama metilmerkuri). Digunakan dalam termometer, lampu fluorescent, dan tambang emas (amalgamasi). Senyawa merkuri digunakan dalam pengawet dan antiseptik.",
    "cat": "logam"
  },
  {
    "symbol": "Tl",
    "name": "Talium",
    "desc": "Beracun",
    "longDesc": "Logam pasca-transisi with nomor atom 81. Sangat beracun - pernah digunakan sebagai racun tikus. Talium sulfat tidak berwarna dan tidak berbau. Digunakan dalam elektronik, kaca optik khusus, dan detektor inframerah. Ion Tl⁺ meniru K⁺ dalam sistem biologis.",
    "cat": "logam"
  },
  {
    "symbol": "Pb",
    "name": "Timbal",
    "desc": "Berat",
    "longDesc": "Logam pasca-transisi with nomor atom 82. Padat, lunak, dan tahan korosi. Digunakan dalam baterai, pelindung radiasi, dan amunisi. Sangat beracun - menyebabkan kerusakan neurologis terutama pada anak. Dulu digunakan dalam bensin (TEL) dan cat.",
    "cat": "logam"
  },
  {
    "symbol": "Bi",
    "name": "Bismut",
    "desc": "Aman",
    "longDesc": "Logam pasca-transisi with nomor atom 83. Paling diamagnetik dari semua logam. Radioaktif sangat lemah (waktu paruh 1.9×10¹⁹ tahun). Digunakan dalam obat maag (bismut subsalisilat), kosmetik, dan paduan low-melting. Pengganti timbal yang tidak beracun.",
    "cat": "logam"
  },
  {
    "symbol": "Po",
    "name": "Polonium",
    "desc": "Radioaktif",
    "longDesc": "Metaloid with nomor atom 84. Sangat radioaktif - Po-210 adalah pemancar alfa kuat. Digunakan dalam penghilang statis dan sumber neutron (dengan berilium). Sangat beracun - digunakan dalam pembunuhan Alexander Litvinenko. Ditemukan oleh Marie Curie dalam bijih uranium.",
    "cat": "radioaktif"
  },
  {
    "symbol": "At",
    "name": "Astatin",
    "desc": "Langka",
    "longDesc": "Halogen with nomor atom 85. Unsur paling langka di kerak Bumi (kurang dari 30 gram total). Semua isotop radioaktif - yang paling stabil (At-210) memiliki waktu paruh 8.1 jam. Diteliti untuk terapi kanker targeted alpha therapy. Sifat kimia mirip iodin.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Rn",
    "name": "Radon",
    "desc": "Gas radioaktif",
    "longDesc": "Gas mulia with nomor atom 86. Gas radioaktif tidak berwarna, tidak berbau. Dihasilkan dari peluruhan radium dalam tanah. Akumulasi dalam bangunan adalah risiko kesehatan (kanker paru-paru). Digunakan dalam terapi radiasi dan penelitian gempa.",
    "cat": "radioaktif"
  },

  // Periode 7
  {
    "symbol": "Fr",
    "name": "Fransium",
    "desc": "Tidak stabil",
    "longDesc": "Logam alkali with nomor atom 87. Paling tidak stabil dari 101 unsur pertama - isotop paling stabil (Fr-223) memiliki waktu paruh hanya 22 menit. Sangat langka - diperkirakan hanya 30 gram di kerak Bumi. Sifat kimia mirip sesium. Diteliti dalam fisika fundamental.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Ra",
    "name": "Radium",
    "desc": "Radioaktif",
    "longDesc": "Logam alkali tanah with nomor atom 88. Sangat radioaktif - berpendar biru dalam gelap. Dulu digunakan dalam cat berpendar untuk jam dan instrumen. Ra-226 (waktu paruh 1600 tahun) digunakan dalam terapi kanker. Ditemukan oleh Marie dan Pierre Curie.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Ac",
    "name": "Aktinium",
    "desc": "Radioaktif",
    "longDesc": "Logam aktinida with nomor atom 89. Pertama dari seri aktinida. Sangat radioaktif - Ac-227 memiliki waktu paruh 21.8 tahun. Berpendar biru dalam gelap karena radiasi. Diteliti untuk terapi kanker targeted alpha therapy. Sangat langka dan mahal.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Th",
    "name": "Torium",
    "desc": "Nuklir",
    "longDesc": "Logam aktinida with nomor atom 90. Lebih melimpah daripada uranium. Th-232 dapat diubah menjadi U-233 dalam reaktor - potensi bahan bakar nuklir. Digunakan dalam mantel lampu gas, elektroda TIG, dan lensa optik. Radioaktif lemah (pemancar alfa).",
    "cat": "radioaktif"
  },
  {
    "symbol": "Pa",
    "name": "Protaktinium",
    "desc": "Langka",
    "longDesc": "Logam aktinida with nomor atom 91. Sangat langka dan radioaktif. Pa-231 memiliki waktu paruh 32,760 tahun. Tidak memiliki aplikasi komersial karena kelangkaan dan radioaktivitas. Penting dalam penanggalan sedimen laut. Sangat beracun dan radioaktif.",
    "cat": "radioaktif"
  },
  {
    "symbol": "U",
    "name": "Uranium",
    "desc": "Energi",
    "longDesc": "Logam aktinida with nomor atom 92. Unsur alami terberat. U-235 (0.7%) dapat mengalami fisi - bahan bakar reaktor nuklir dan senjata. U-238 (99.3%) digunakan dalam penanggalan radiometrik. Padat, sangat berat (19.1 g/cm³). Digunakan dalam peluru penetrator.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Np",
    "name": "Neptunium",
    "desc": "Sintetis",
    "longDesc": "Logam aktinida with nomor atom 93. Unsur transuranium pertama yang disintesis. Np-237 digunakan dalam detektor neutron. Diproduksi dalam reaktor nuklir dari uranium. Radioaktif - isotop paling stabil memiliki waktu paruh 2.14 juta tahun. Perak mengkilap, mudah teroksidasi.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Pu",
    "name": "Plutonium",
    "desc": "Reaktor",
    "longDesc": "Logam aktinida with nomor atom 94. Pu-239 adalah bahan fisi penting - digunakan dalam senjata nuklir dan reaktor. Diproduksi dari U-238 dalam reaktor. Sangat radioaktif dan beracun. Enam alotrop dengan densitas berbeda. Bahan bakar RTG untuk misi luar angkasa.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Am",
    "name": "Amerisium",
    "desc": "Detektor",
    "longDesc": "Logam aktinida with nomor atom 95. Am-241 digunakan dalam detektor asap ionisasi. Memancarkan partikel alfa yang mengionisasi udara. Juga dalam pengukur ketebalan dan radiografi neutron. Diproduksi dalam reaktor nuklir. Radioaktif - waktu paruh 432 tahun.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Cm",
    "name": "Kurium",
    "desc": "Radioaktif",
    "longDesc": "Logam aktinida with nomor atom 96. Radioaktif - Cm-244 digunakan sebagai sumber alpha dalam spektrometer alpha proton X-ray (Mars rovers). Diproduksi dalam reaktor nuklir. Sangat radioaktif dan menghasilkan panas signifikan. Waktu paruh Cm-247 adalah 15.6 juta tahun.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Bk",
    "name": "Berkelium",
    "desc": "Sintetis",
    "longDesc": "Logam aktinida with nomor atom 97. Unsur sintetis - diproduksi dalam reaktor nuklir. Bk-247 adalah isotop paling stabil (waktu paruh 1380 tahun). Tidak memiliki aplikasi komersial. Digunakan sebagai target untuk sintesis unsur yang lebih berat (tennessine). Sangat radioaktif.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Cf",
    "name": "Kalifornium",
    "desc": "Neutron",
    "longDesc": "Logam aktinida with nomor atom 98. Cf-252 adalah sumber neutron intensif - digunakan dalam deteksi logam, well logging, dan terapi neutron. Sangat radioaktif. Diproduksi dalam reaktor fluks tinggi. Satu gram Cf-252 memancarkan 2.3×10¹² neutron/detik.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Es",
    "name": "Einsteinium",
    "desc": "Langka",
    "longDesc": "Logam aktinida with nomor atom 99. Unsur sintetis - pertama kali diidentifikasi dalam debris uji nuklir. Es-252 digunakan dalam detektor neutron. Sangat radioaktif - waktu paruh Es-252 hanya 471.7 hari. Digunakan dalam sintesis mendelevium. Sangat langka.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Fm",
    "name": "Fermium",
    "desc": "Sintetis",
    "longDesc": "Logam aktinida with nomor atom 100. Unsur sintetis - tidak ditemukan di alam. Fm-257 adalah isotop paling stabil (waktu paruh 100.5 hari). Diproduksi dalam reaktor nuklir dengan iradiasi neutron intensif. Tidak memiliki aplikasi praktis karena waktu paruh pendek.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Md",
    "name": "Mendelevium",
    "desc": "Sintetis",
    "longDesc": "Logam aktinida with nomor atom 101. Unsur sintetis - dinamai dari Dmitri Mendeleev. Md-258 adalah isotop paling stabil (waktu paruh 51.5 hari). Diproduksi dengan bombardir einsteinium dengan partikel alpha. Tidak memiliki aplikasi di luar penelitian ilmiah dasar.",
    "cat": "radioaktif"
  },
  {
    "symbol": "No",
    "name": "Nobelium",
    "desc": "Radioaktif",
    "longDesc": "Logam aktinida with nomor atom 102. Unsur sintetis - dinamai dari Alfred Nobel. No-259 adalah isotop paling stabil (waktu paruh 58 menit). Diproduksi dengan bombardir kurium dengan ion karbon. Kimia Nobelium diteliti untuk memahami perilaku aktinida berat.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Lr",
    "name": "Lawrensium",
    "desc": "Akhir",
    "longDesc": "Logam aktinida with nomor atom 103. Aktinida terakhir. Unsur sintetis - dinamai dari Ernest Lawrence. Lr-266 adalah isotop paling stabil (waktu paruh 11 jam). Diproduksi dengan bombardir kalifornium dengan ion boron. Kimia Lawrensium masih diteliti.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Rf",
    "name": "Ruterfordium",
    "desc": "Sintetis",
    "longDesc": "Logam transisi with nomor atom 104. Unsur sintetis - dinamai dari Ernest Rutherford. Rf-267 adalah isotop paling stabil (waktu paruh 1.3 jam). Diproduksi dengan bombardir kalifornium dengan ion karbon. Sifat kimia diperkirakan mirip hafnium.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Db",
    "name": "Dubnium",
    "desc": "Sintetis",
    "longDesc": "Logam transisi with nomor atom 105. Unsur sintetis - dinamai dari Dubna, Rusia. Db-268 adalah isotop paling stabil (waktu paruh 28 jam). Diproduksi dengan bombardir amerisium dengan ion neon. Sifat kimia diperkirakan mirip tantalum.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Sg",
    "name": "Seaborgium",
    "desc": "Sintetis",
    "longDesc": "Logam transisi with nomor atom 106. Unsur sintetis - dinamai dari Glenn Seaborg. Sg-269 adalah isotop paling stabil (waktu paruh 14 menit). Diproduksi dengan bombardir kalifornium dengan ion oksigen. Sifat kimia diperkirakan mirip tungsten.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Bh",
    "name": "Bohrium",
    "desc": "Sintetis",
    "longDesc": "Logam transisi with nomor atom 107. Unsur sintetis - dinamai dari Niels Bohr. Bh-270 adalah isotop paling stabil (waktu paruh 61 detik). Diproduksi dengan bombardir bismut dengan ion kromium. Sifat kimia diperkirakan mirip renium.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Hs",
    "name": "Hasium",
    "desc": "Sintetis",
    "longDesc": "Logam transisi with nomor atom 108. Unsur sintetis - dinamai dari Hesse, Jerman. Hs-269 adalah isotop paling stabil (waktu paruh 9.7 detik). Diproduksi dengan bombardir timbal dengan ion besi. Sifat kimia diperkirakan mirip osmium.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Mt",
    "name": "Meitnerium",
    "desc": "Langka",
    "longDesc": "Logam transisi with nomor atom 109. Unsur sintetis - dinamai dari Lise Meitner. Mt-278 adalah isotop paling stabil (waktu paruh 4.5 detik). Diproduksi dengan bombardir bismut with ion besi. Sifat kimia diperkirakan mirip iridium.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Ds",
    "name": "Darmstadtium",
    "desc": "Sintetis",
    "longDesc": "Logam transisi with nomor atom 110. Unsur sintetis - dinamai dari Darmstadt, Jerman. Ds-281 adalah isotop paling stabil (waktu paruh 9.6 detik). Diproduksi dengan bombardir timbal dengan ion nikel. Sifat kimia diperkirakan mirip platina.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Rg",
    "name": "Roentgenium",
    "desc": "Langka",
    "longDesc": "Logam transisi with nomor atom 111. Unsur sintetis - dinamai dari Wilhelm Röntgen. Rg-282 adalah isotop paling stabil (waktu paruh 2.1 menit). Diproduksi dengan bombardir bismut dengan ion nikel. Sifat kimia diperkirakan mirip emas.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Cn",
    "name": "Kopernisium",
    "desc": "Berat",
    "longDesc": "Logam transisi with nomor atom 112. Unsur sintetis - dinamai dari Nicolaus Copernicus. Cn-285 adalah isotop paling stabil (waktu paruh 28 detik). Diproduksi dengan bombardir timbal dengan ion seng. Diperkirakan sebagai logam volatil, mungkin gas pada suhu ruang.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Nh",
    "name": "Nihonium",
    "desc": "Baru",
    "longDesc": "Logam pasca-transisi with nomor atom 113. Unsur sintetis - dinamai dari Jepang (Nihon). Nh-286 adalah isotop paling stabil (waktu paruh 8 detik). Diproduksi oleh RIKEN, Jepang. Sifat kimia diperkirakan mirip talium. Unsur pertama yang ditemukan di Asia.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Fl",
    "name": "Flerovium",
    "desc": "Tidak stabil",
    "longDesc": "Logam pasca-transisi with nomor atom 114. Unsur sintetis - dinamai dari Georgy Flyorov. Fl-289 adalah isotop paling stabil (waktu paruh 2.6 detik). Diproduksi dengan bombardir plutonium dengan ion kalsium. Diperkirakan memiliki sifat mirip timbal namun lebih volatil.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Mc",
    "name": "Moskovium",
    "desc": "Sintetis",
    "longDesc": "Logam pasca-transisi with nomor atom 115. Unsur sintetis - dinamai dari Moskow. Mc-290 adalah isotop paling stabil (waktu paruh 0.65 detik). Diproduksi dengan bombardir amerisium dengan ion kalsium. Sifat kimia diperkirakan mirip bismut.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Lv",
    "name": "Livermorium",
    "desc": "Radioaktif",
    "longDesc": "Logam pasca-transisi with nomor atom 116. Unsur sintetis - dinamai dari Lawrence Livermore Lab. Lv-293 adalah isotop paling stabil (waktu paruh 60 milidetik). Diproduksi dengan bombardir kurium dengan ion kalsium. Sifat kimia diperkirakan mirip polonium.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Ts",
    "name": "Tenesin",
    "desc": "Langka",
    "longDesc": "Halogen with nomor atom 117. Unsur sintetis - dinamai dari Tennessee. Ts-294 adalah isotop paling stabil (waktu paruh 51 milidetik). Diproduksi dengan bombardir berkelium dengan ion kalsium. Diperkirakan sebagai halogen namun mungkin memiliki sifat metalik.",
    "cat": "radioaktif"
  },
  {
    "symbol": "Og",
    "name": "Oganeson",
    "desc": "Terberat",
    "longDesc": "Gas mulia with nomor atom 118. Unsur terberat yang pernah disintesis - dinamai dari Yuri Oganessian. Og-294 adalah isotop paling stabil (waktu paruh 0.7 milidetik). Diproduksi dengan bombardir kalifornium dengan ion kalsium. Diperkirakan sebagai gas mulia namun mungkin padat pada suhu ruang.",
    "cat": "radioaktif"
  }
];

/* =============================================================
   SECTION: CATEGORY COLORS & LABELS
   ============================================================= */

const categoryColors = {
  logam: '#5c8a5c',
  nonlogam: '#4a7fa5',
  metaloid: '#7a5c9e',
  'gas mulia': '#b8860b',
  gas_mulia: '#b8860b',
  radioaktif: '#a04040',
};

const categoryLabels = {
  logam: 'Logam',
  nonlogam: 'Non-Logam',
  metaloid: 'Metaloid',
  'gas mulia': 'Gas Mulia',
  gas_mulia: 'Gas Mulia',
  radioaktif: 'Radioaktif',
};

/* =============================================================
   SECTION: STATE MANAGEMENT
   ============================================================= */

let activeFilter = 'semua';
let searchTerm = '';

/* =============================================================
   SECTION: FILTER SETUP
   ============================================================= */

const filterBar = document.getElementById('filterBar');
const allCategories = [...new Set(elements.map(e => e.cat))].sort();

allCategories.forEach(cat => {
  const btn = document.createElement('button');
  btn.className = 'filter-btn';
  btn.dataset.cat = cat;
  btn.textContent = categoryLabels[cat] || cat;
  filterBar.appendChild(btn);
});

/* =============================================================
   SECTION: EVENT LISTENERS
   ============================================================= */

filterBar.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  activeFilter = btn.dataset.cat;

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  renderCards();
});

document.getElementById('searchInput').addEventListener('input', e => {
  searchTerm = e.target.value.toLowerCase().trim();
  renderCards();
});

/* =============================================================
   SECTION: RENDER FUNCTIONS
   ============================================================= */

/**
 * Render element cards based on filters and search
 */
function renderCards() {
  const grid = document.getElementById('cardGrid');

  const filtered = elements.filter(e => {
    const matchCategory = activeFilter === 'semua' || e.cat === activeFilter;
    const matchSearch = searchTerm === '' ||
      e.name.toLowerCase().includes(searchTerm) ||
      e.symbol.toLowerCase().includes(searchTerm);

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="kosong">
        <div class="kosong-ikon">?</div>
        <p>Tidak ada unsur yang ditemukan.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((e, idx) => {
    const atomicNumber = elements.indexOf(e) + 1;

    return `
      <div class="kartu ${e.cat}" data-index="${elements.indexOf(e)}" style="animation-delay: ${idx * 0.03}s">
        <div class="kartu-atas">
          <span class="kartu-nomor">${atomicNumber}</span>
          <span class="kartu-simbol">${e.symbol}</span>
        </div>
        <div class="kartu-garis"></div>
        <div class="kartu-bawah">
          <div class="kartu-nama">${e.name}</div>
          <div class="kartu-desc">${e.desc}</div>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.kartu').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index);
      openModal(idx);
    });
  });
}

/**
 * Open modal with element details
 */
function openModal(index) {
  const e = elements[index];
  const atomicNumber = index + 1;
  const modal = document.getElementById('modalTiket');

  modal.className = `modal-ticket ${e.cat}`;

  document.getElementById('modalNomorAtom').textContent = atomicNumber;
  document.getElementById('modalSimbolBesar').textContent = e.symbol;
  document.getElementById('modalNamaBesar').textContent = e.name;
  document.getElementById('modalDescText').textContent = e.longDesc || e.desc;

  const badge = document.getElementById('modalKategoriBadge');
  badge.textContent = categoryLabels[e.cat] || e.cat;
  badge.style.background = categoryColors[e.cat];

  document.getElementById('modalOverlay').classList.add('show');
  lockScroll();
}

/**
 * Close modal
 */
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
  unlockScroll();
}

/* =============================================================
   SECTION: MODAL EVENT LISTENERS
   ============================================================= */

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* =============================================================
   SECTION: SCROLL LOCK
   ============================================================= */

let _savedScrollY = 0;

function lockScroll() {
  _savedScrollY = window.scrollY;

  document.body.style.top = `-${_savedScrollY}px`;
  document.body.classList.add('scroll-locked');
}

function unlockScroll() {
  document.body.classList.remove('scroll-locked');
  document.body.style.top = '';
  // Force instant restore even if CSS has scroll-behavior: smooth
  const html = document.documentElement;
  const prevScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo({ top: _savedScrollY, left: 0, behavior: 'auto' });
  // restore on next frame so user scroll remains normal afterwards
  requestAnimationFrame(() => {
    html.style.scrollBehavior = prevScrollBehavior;
  });
}

/* =============================================================
   SECTION: FLOATING / COMPACT HEADER
   ============================================================= */

function initFloatingHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const set = () => {
    header.classList.toggle('is-floating', window.scrollY > 8);
  };

  window.addEventListener('scroll', set, { passive: true });
  set();
}

/* =============================================================
   SECTION: THEME
   ============================================================= */

function initTheme() {
  const saved = localStorage.getItem('atom-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved ?? (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function toggleTheme() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('atom-theme', theme);
  const label = document.getElementById('toggleLabel');
  /* Label menunjukkan mode yang sedang AKTIF (current state) */
  if (label) label.textContent = theme === 'dark' ? 'Mode Gelap' : 'Mode Terang';
}

/* Event listener untuk tombol toggle tema */
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

/* =============================================================
   SECTION: INITIALIZE
   ============================================================= */

initTheme();
renderCards();
initFloatingHeader();