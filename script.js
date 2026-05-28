const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");
let activeElements = null;
const elementContainer = document.querySelector("#elements-container");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active"),
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedOption = option.querySelector(".option-text").innerText;
    const selectedCategory = getCategoryFromOption(selectedOption);
    const filteredElements =
      selectedCategory === "semua"
        ? elementData
        : elementData.filter(
            (element) => element.category === selectedCategory,
          );

    sBtn_text.innerText = selectedOption;
    renderElements(filteredElements);

    optionMenu.classList.remove("active");
  });
});

function getCategoryFromOption(optionText) {
  const categoryMap = {
    Atom: "semua",
    Aktinida: "aktinida",
    "Gas Mulia": "gas_mulia",
    Lantanida: "lantanida",
    "Logam Alkali": "logam_alkali",
    "Logam Alkali Tanah": "logam_alkali_tanah",
    "Logam Pasca Transisi": "logam_pascatransisi",
    "Logam Transisi": "logam_transisi",
    Metaloid: "metaloid",
    "Non-Logam Reaktif": "nonlogam_reaktif",
    "Sifat Kimia Tidak Diketahui": "sifat_kimia_tidak_diketahui",
  };

  return categoryMap[optionText] || "semua";
}

let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.removeItem("darkmode");
};

if (darkmode === "active") {
  enableDarkmode();
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  const animationClass =
    darkmode !== "active" ? "animate-to-dark" : "animate-to-light";

  themeSwitch.classList.remove("animate-to-dark", "animate-to-light");
  void themeSwitch.offsetWidth;
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
  themeSwitch.classList.add(animationClass);
  renderElements(activeElements || elementData);

  setTimeout(() => {
    themeSwitch.classList.remove(animationClass);
  }, 320);
});

const elementData = [
  {
    number: 1,
    category: "nonlogam_reaktif",
    symbol: "H",
    name: "Hidrogen",
    description:
      "Kenalkan, ini Hidrogen, si nomor satu di tabel periodik sekaligus unsur paling melimpah di alam semesta yang menjadi anggota kehormatan di golongan non-logam. Meski bertubuh super kecil dan berwujud gas tak terlihat, dia punya keunikan luar biasa karena menjadi bahan bakar utama yang membuat matahari dan bintang-bintang tetap bersinar cerah. Di bumi, ia ramah lingkungan dan sangat setia menemani oksigen untuk membentuk air yang kita minum sehari-hari, bahkan kini mulai dilirik sebagai energi masa depan yang bersih untuk bahan bakar kendaraan zero-emission.",
  },
  {
    number: 2,
    category: "gas_mulia",
    symbol: "He",
    name: "Helium",
    description:
      "Inilah Helium, si gas mulia nomor atom dua yang super santai dan tidak suka mencari keributan dengan unsur lain. Meskipun ia adalah unsur paling melimpah kedua di jagat raya, Helium punya keunikan lucu karena massa jenisnya yang sangat ringan, hingga mampu membuat suaramu jadi melengking jenaka layaknya tokoh kartun saat tak sengaja terhirup. Dalam keseharian, ia bukan sekadar pengisi balon pesta yang terbang tinggi, tapi juga pahlawan di balik mesin MRI rumah sakit untuk mendinginkan magnet super kuat agar bisa memindai tubuh kita dengan akurat.",
  },
  {
    number: 3,
    category: "logam_alkali",
    symbol: "Li",
    name: "Litium",
    description:
      "Ini dia Litium, logam alkali bernomor atom tiga yang sangat ringan sampai-sampai bisa mengapung di atas air meski statusnya adalah logam padat. Si kecil ini sangat reaktif dan energik, sehingga ia tidak pernah ditemukan sendirian di alam tanpa berikatan dengan unsur lain. Kehebatan aslinya ada pada kemampuannya menyimpan tenaga sangat besar, menjadikannya jantung utama bagi baterai ponsel dan kendaraan listrik yang kita pakai setiap hari agar tetap menyala lama. Tanpa kehadirannya, gaya hidup digital kita yang serba praktis saat ini mungkin tak akan pernah terjadi.",
  },
  {
    number: 4,
    category: "logam_alkali_tanah",
    symbol: "Be",
    name: "Berilium",
    description:
      "Ini Berilium, si nomor atom empat yang tangguh dari golongan logam alkali tanah. Meski namanya terdengar asing, ia punya keunikan luar biasa karena bobotnya yang sangat ringan namun kekuatannya jauh melebihi baja, plus ia sama sekali tidak mempan ditarik oleh magnet. Kehebatan ini membuatnya jadi material andalan yang sangat berharga untuk membangun struktur teleskop luar angkasa canggih dan pesawat terbang. Di bumi, Berilium juga setia menemani kehidupan kita sebagai komponen penguat dalam peralatan elektronik seperti ponsel dan laptop agar tidak mudah rusak saat digunakan.",
  },
  {
    number: 5,
    category: "metaloid",
    symbol: "B",
    name: "Boron",
    description:
      "Yuk, kenalan dengan Boron, si nomor atom lima yang jadi anggota paling atas di golongan metaloid atau unsur setengah logam. Unsur satu ini punya keunikan yang tak terduga, karena bisa menghasilkan nyala api berwarna hijau terang yang sangat indah saat dibakar, mirip sihir di film fantasi. Dalam kehidupan sehari-hari, Boron adalah pahlawan tersembunyi yang membuat peralatan masak kaca di dapurmu tahan panas dan tidak retak saat dipanaskan, sekaligus menjadi nutrisi penting bagi tanaman di kebunmu agar bisa tumbuh subur dan berbuah lebat.",
  },
  {
    number: 6,
    category: "nonlogam_reaktif",
    symbol: "C",
    name: "Karbon",
    description:
      "Kenalkan, ini Karbon, si nomor atom enam yang menjadi pemimpin dari golongan non-logam. Unsur satu ini punya keunikan yang luar biasa karena sifatnya yang super fleksibel, ia bisa berwujud sebagai arang hitam yang rapuh, namun bisa juga menjelma menjadi berlian yang berkilau indah dan menjadi material paling keras di bumi. Dalam keseharian kita, Karbon adalah pondasi utama kehidupan yang membentuk tubuh makhluk hidup, sekaligus menjadi bahan dasar pensil yang kamu gunakan untuk menulis serta serat canggih pada raket tenis yang ringan namun kokoh.",
  },
  {
    number: 7,
    category: "nonlogam_reaktif",
    symbol: "N",
    name: "Nitrogen",
    description:
      "Sapa dulu Nitrogen, si nomor atom tujuh dari golongan non-logam yang diam-diam mengelilingi kita setiap detik. Unsur ini punya keunikan yang bikin kaget, karena wujud gasnya mendominasi hampir delapan puluh persen udara di bumi, jauh lebih banyak daripada oksigen yang kita hirup. Dalam keseharian, Nitrogen adalah penyelamat camilanmu karena gas ini diisikan ke dalam bungkus keripik kentang agar tetap renyah dan tidak melempem, serta dalam wujud cairnya yang super dingin sering digunakan untuk membekukan makanan instan hingga membuat es krim instan yang lezat.",
  },
  {
    number: 8,
    category: "nonlogam_reaktif",
    symbol: "O",
    name: "Oksigen",
    description:
      "Ini Oksigen, si nomor atom delapan dari golongan non-logam yang paling setia menemani setiap embusan napasmu. Unsur ini punya keunikan yang sangat kontras, ia ramah dalam wujud gas tak berwarna yang kita hirup, namun bisa berubah wujud menjadi cairan berwarna biru pucat yang sangat dingin jika suhunya diturunkan drastis. Keseharian kita jelas tak bisa lepas darinya karena ia adalah motor utama penghasil energi bagi tubuh makhluk hidup, sekaligus menjadi bahan penting yang membantu nyala api di kompor dapurmu agar bisa memasak makanan lezat setiap hari.",
  },
  {
    number: 9,
    category: "nonlogam_reaktif",
    symbol: "F",
    name: "Fluorin",
    description:
      "Yuk, kenalan dengan Fluorin, si nomor atom sembilan yang jadi anak paling bungsu dan paling lincah di golongan halogen. Unsur berwujud gas kuning pucat ini punya keunikan yang ekstrem, karena sifatnya yang super agresif dan sangat mudah bereaksi dengan apa pun, bahkan bisa membuat air dan kaca terbakar menyala. Tapi jangan takut dulu, karena sifat agresifnya itu justru sangat berguna di dunia nyata, terutama sebagai benteng pertahanan dalam pasta gigimu yang bekerja ekstra keras untuk melawan bakteri berbahaya sekaligus menjaga gigimu tetap kuat dan bebas dari lubang.",
  },
  {
    number: 10,
    category: "gas_mulia",
    symbol: "Ne",
    name: "Neon",
    description:
      "Sapa dulu Neon, si nomor atom sepuluh yang merupakan anggota paling bersinar di golongan gas mulia. Unsur gas yang satu ini punya keunikan yang sangat magis, karena ia sama sekali tidak berwarna dan tidak berbau, namun akan langsung memancarkan cahaya merah oranye yang menyala terang benderang ketika dialiri arus listrik. Di dunia nyata, keindahan cahayanya ini menjadi pahlawan yang menghidupkan suasana malam kota besar sebagai pengisi lampu hias papan reklame pertokoan, lampu indikator elektronik, hingga membantu memandu pendaratan pesawat di landasan pacu bandara.",
  },
  {
    number: 11,
    category: "logam_alkali",
    symbol: "Na",
    name: "Natrium",
    description:
      "Sapa dulu Neon, si nomor atom sepuluh yang merupakan anggota paling bersinar di golongan gas mulia. Unsur gas yang satu ini punya keunikan yang sangat magis, karena ia sama sekali tidak berwarna dan tidak berbau, namun akan langsung memancarkan cahaya merah oranye yang menyala terang benderang ketika dialiri arus listrik. Di dunia nyata, keindahan cahayanya ini menjadi pahlawan yang menghidupkan suasana malam kota besar sebagai pengisi lampu hias papan reklame pertokoan, lampu indikator elektronik, hingga membantu memandu pendaratan pesawat di landasan pacu bandara.",
  },
  {
    number: 12,
    category: "logam_alkali_tanah",
    symbol: "Mg",
    name: "Magnesium",
    description:
      "Kenalkan, ini Natrium, si nomor atom sebelas yang super aktif dari golongan logam alkali. Unsur logam berwarna perak ini punya keunikan yang sangat kontras, wujud murninya begitu lunak hingga bisa kamu potong mudah dengan pisau dapur, namun ia sangat reaktif dan bisa meledak seru jika nekat kamu lemparkan ke dalam air. Meski terdengar galak, saat ia berpasangan dengan klorin, ia bertransformasi menjadi garam dapur yang setia melezatkan setiap masakanmu sekaligus menjadi mineral penting yang menjaga keseimbangan cairan dalam tubuhmu agar tetap bertenaga setiap hari.",
  },
  {
    number: 13,
    category: "logam_pascatransisi",
    symbol: "Al",
    name: "Aluminium",
    description:
      "Yuk, kenalan dengan Aluminium, si nomor atom tiga belas yang ramah dan menjadi bintang utama di golongan logam pasca-transisi. Logam keperakan ini punya keunikan yang luar biasa, karena ia adalah logam paling melimpah di kerak bumi, namun wujud murninya tidak pernah ditemukan sendirian karena selalu asyik berikatan dengan unsur lain. Dalam keseharian, ia adalah pahlawan serbisa yang membungkus makananmu lewat aluminium foil agar tetap hangat, sekaligus menjadi bahan utama pembuat kaleng minuman soda dan bodi pesawat terbang karena sifatnya yang super ringan tapi sangat kuat dan anti karat.",
  },
  {
    number: 14,
    category: "metaloid",
    symbol: "Si",
    name: "Silikon",
    description:
      "Sapa dulu Silikon, si nomor atom empat belas yang menempati posisi penting dalam golongan metaloid atau unsur setengah logam. Unsur abu-abu mengkilap ini punya keunikan luar biasa karena menjadi bahan paling melimpah kedua di kerak bumi setelah oksigen, terutama bersembunyi dalam wujud pasir pantai yang biasa kita injak. Di dunia modern, Silikon adalah pahlawan super digital karena sifatnya yang bisa menghantarkan listrik dengan pas membuatnya jadi bahan utama pembuatan microchip pintar untuk menghidupkan ponsel, komputer, hingga panel surya yang ramah lingkungan.",
  },
  {
    number: 15,
    category: "nonlogam_reaktif",
    symbol: "P",
    name: "Fosforus",
    description:
      "Kenalkan, ini Fosforus, si nomor atom lima belas yang menjadi anggota penting dari golongan non-logam. Unsur satu ini punya keunikan yang sangat misterius karena wujud murninya, si fosfor putih, bisa mengeluarkan pendaran cahaya hijau lembut dalam gelap saat bereaksi dengan udara, mirip seperti hantu yang bercahaya. Dalam kehidupan sehari-hari, Fosforus adalah pahlawan yang sangat dekat dengan kita karena ia menjadi bahan utama pembuat pemantik pada kotak korek api, sekaligus menjadi nutrisi super penting dalam pupuk yang membantu tanaman petani tumbuh subur menghasilkan makanan untuk kita.",
  },
  {
    number: 16,
    category: "nonlogam_reaktif",
    symbol: "S",
    name: "Belerang",
    description:
      "Yuk, kenalan dengan Belerang, si nomor atom enam belas yang ramah dari golongan non-logam. Unsur padat berwarna kuning terang ini punya keunikan yang sangat ikonik, karena saat dibakar ia akan mengeluarkan api biru yang cantik, meski terkenal menghasilkan bau menyengat mirip telur busuk yang khas di kawasan kawah gunung berapi. Dalam kehidupan kita sehari-hari, Belerang adalah pahlawan bagi kesehatan kulit karena sangat ampuh dijadikan bahan sabun dan salep untuk membasmi jerawat, sekaligus menjadi bahan penting dalam pembuatan korek api dan ban kendaraan agar lebih kuat.",
  },
  {
    number: 17,
    category: "nonlogam_reaktif",
    symbol: "Cl",
    name: "Klorin",
    description:
      "Sapa dulu Klorin, si nomor atom tujuh belas yang merupakan salah satu anggota paling galak dari golongan halogen. Unsur berwujud gas kuning kehijauan ini punya keunikan yang sangat kontras, karena dalam wujud murninya ia berbau tajam dan sangat berbahaya, namun ia sangat suka berteman hingga membentuk senyawa ramah seperti garam dapur yang kita makan. Di kehidupan nyata, Klorin adalah pahlawan kebersihan yang luar biasa karena kemampuannya membasmi kuman, makanya ia sering digunakan sebagai antiseptik pembersih air di kolam renang serta bahan utama pemutih pakaian di rumahmu.",
  },
  {
    number: 18,
    category: "gas_mulia",
    symbol: "Ar",
    name: "Argon",
    description:
      "Inilah Argon, si nomor atom delapan belas yang menjadi penghuni setia di golongan gas mulia. Unsur gas ini punya keunikan yang sangat malas, karena ia bersifat super cuek dan sama sekali tidak mau bereaksi atau berteman dengan unsur kimia lainnya, mirip seperti namanya yang diambil dari bahasa Yunani kuno berarti malas. Namun dalam keseharian, sifat cueknya ini justru jadi pahlawan karena sering diisikan ke dalam bola lampu pijar rumahan untuk melindungi kawat filamen panas di dalamnya agar tidak mudah putus atau terbakar oleh oksigen.",
  },
  {
    number: 19,
    category: "logam_alkali",
    symbol: "K",
    name: "Kalium",
    description:
      "Kenalkan, ini Kalium, si nomor atom sembilan belas yang menjadi anggota super aktif dari golongan logam alkali. Unsur logam keperakan ini punya keunikan yang sangat dramatis, wujudnya begitu lunak seperti mentega hingga bisa dipotong dengan pisau, namun ia langsung meledak hebat dan mengeluarkan api ungu cantik jika bersentuhan dengan air. Di dunia nyata, Kalium adalah pahlawan kesehatan yang bersembunyi di dalam buah pisang untuk menjaga detak jantung dan ototmu tetap normal, sekaligus menjadi bahan utama pupuk andalan petani agar tanaman sayur tumbuh subur.",
  },
  {
    number: 20,
    category: "logam_alkali_tanah",
    symbol: "Ca",
    name: "Kalsium",
    description:
      "Sapa dulu Kalsium, si nomor atom dua puluh yang menjadi bintang utama dari golongan logam alkali tanah. Logam keperakan ini punya keunikan yang tak terduga, meski di laboratorium wujud murninya adalah logam yang mengkilap, ia tidak pernah ditemukan sendirian di alam karena sifatnya yang sangat gemar bereaksi dan menyatu dengan unsur lain. Dalam keseharian kita, Kalsium adalah pahlawan yang kokoh karena bersembunyi di dalam segelas susu untuk memperkuat tulang dan gigimu, sekaligus menjadi bahan dasar semen untuk membangun rumah yang kuat dan aman.",
  },
  {
    number: 21,
    category: "logam_transisi",
    symbol: "Sc",
    name: "Skandium",
    description:
      "Yuk, kenalan dengan Skandium, si nomor atom dua puluh satu yang menjadi pembuka barisan di golongan logam transisi. Logam keperakan ini punya keunikan yang sangat langka, karena meskipun jumlahnya di bumi sebenarnya tidak sedikit, ia hidup sangat tersebar sehingga amat sulit ditemukan dalam wujud terkumpul di satu tempat. Di dunia nyata, Skandium adalah pahlawan rahasia yang dicampurkan ke dalam kerangka sepeda balap kelas dunia, tongkat pemukul bisbol, hingga komponen pesawat terbang agar materialnya menjadi super kuat namun tetap terasa sangat ringan saat digunakan.",
  },
  {
    number: 22,
    category: "logam_transisi",
    symbol: "Ti",
    name: "Titanium",
    description:
      "Inilah Titanium, si nomor atom dua puluh dua yang kokoh dari golongan logam transisi. Unsur keperakan ini punya keunikan yang luar biasa layaknya pahlawan super, karena ia sekuat baja tetapi bobotnya hampir setengah lebih ringan, serta punya ketahanan ajaib yang membuatnya sama sekali tidak bisa berkarat oleh air laut bahkan asam yang pekat. Di kehidupan nyata, karena sifatnya yang ramah dan tidak ditolak oleh tubuh manusia, Titanium sering diandalkan sebagai bahan pengganti tulang atau implan gigi, hingga menjadi rangka utama pesawat terbang dan ponsel pintar premium kesayanganmu.",
  },
  {
    number: 23,
    category: "logam_transisi",
    symbol: "V",
    name: "Vanadium",
    description:
      "Sapa dulu Vanadium, si nomor atom dua puluh tiga yang menawan dari golongan logam transisi. Unsur ini punya keunikan yang sangat cantik karena namanya diambil dari nama dewi kecantikan Norse, Vanadis, berkat kemampuannya menghasilkan larutan kimia berwarna-warni indah seperti pelangi. Di dunia nyata, Vanadium adalah pahlawan penguat yang luar biasa karena jika dicampurkan sedikit saja ke dalam baja, ia akan menciptakan logam super tangguh yang digunakan untuk membuat kunci inggris di bengkel, rangka mobil yang aman dari benturan, hingga mesin jet pesawat terbang.",
  },
  {
    number: 24,
    category: "logam_transisi",
    symbol: "Cr",
    name: "Kromium",
    description:
      "Kenalkan Kromium, si nomor atom dua puluh empat yang berkilau menawan dari golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat bunglon karena namanya diambil dari kata Yunani chroma yang berarti warna, berkat kemampuannya membentuk berbagai senyawa dengan warna-warni pelangi yang indah, seperti hijau zamrud dan merah delima. Di dunia nyata, Kromium adalah pahlawan pelindung yang dicampurkan ke dalam besi untuk menciptakan baja tahan karat pada sendok garpumu, sekaligus menjadi lapisan mengkilap yang estetis pada stang motor atau keran air agar anti gores dan bebas karat.",
  },
  {
    number: 25,
    category: "logam_transisi",
    symbol: "Mn",
    name: "Mangan",
    description:
      "Sapa dulu Mangan, si nomor atom dua puluh lima yang tangguh dari golongan logam transisi. Unsur berwarna abu-abu merah muda ini punya keunikan yang sangat mirip bunglon, karena meski wujud aslinya adalah logam rapuh yang mudah pecah, ia bisa berubah menjadi sangat keras layaknya pahlawan super jika digabungkan dengan besi. Di kehidupan nyata, sifat magisnya ini dimanfaatkan untuk membuat baja super kokoh pada rel kereta api dan brankas bank agar tahan hantaman, serta menjadi bahan penting di dalam baterai remote TV rumahmu agar energinya awet tahan lama.",
  },
  {
    number: 26,
    category: "logam_transisi",
    symbol: "Fe",
    name: "Besi",
    description:
      "Yuk, kenalan dengan Besi, si nomor atom dua puluh enam yang menjadi andalan di golongan logam transisi. Unsur keperakan ini punya keunikan yang luar biasa hebat, karena selain melimpah di bumi hingga membentuk inti planet kita, ia juga merupakan alasan mengapa darah kita berwarna merah berkat tugasnya mengikat oksigen. Dalam kehidupan sehari-hari, Besi adalah pahlawan pembangun yang sangat kokoh, karena tanpanya kita tidak akan pernah punya jembatan raksasa, gedung pencakar langit yang menjulang tinggi, wajan untuk memasak, hingga paku-paku kecil yang menyatukan perabotan di rumahmu.",
  },
  {
    number: 27,
    category: "logam_transisi",
    symbol: "Co",
    name: "Kobalt",
    description:
      "Kenalkan Kobalt, si nomor atom dua puluh tujuh yang tangguh dari golongan logam transisi. Unsur keperakan ini punya keunikan sejarah yang menarik, karena namanya berasal dari kata Jerman kobold yang berarti goblin atau roh jahat, berkat para penambang kuno yang kesal karena bijihnya sulit dilelehkan dan mengeluarkan asap beracun. Untungnya, sekarang Kobalt menjadi pahlawan modern karena senyawanya bisa menghasilkan warna biru tua yang sangat indah pada keramik, sekaligus menjadi bahan pembuat magnet super kuat dan komponen utama baterai ponsel pintar yang kamu gunakan setiap hari.",
  },
  {
    number: 28,
    category: "logam_transisi",
    symbol: "Ni",
    name: "Nikel",
    description:
      "Sapa dulu Nikel, si nomor atom dua puluh delapan yang berkilau menawan di golongan logam transisi. Unsur keperakan ini punya keunikan sejarah yang lucu karena namanya berasal dari mitos Jerman, Kupfernickel alias setan tembaga, lantaran penambang zaman dulu mengira logam ini adalah tembaga palsu yang dikutuk. Di kehidupan modern, Nikel adalah pahlawan industri karena jika dicampur besi, ia menciptakan baja tahan karat yang kuat. Kamu bisa dengan mudah menemukannya pada uang koin di dompetmu, sendok garpu di meja makan, hingga komponen utama baterai kendaraan listrik masa depan.",
  },
  {
    number: 29,
    category: "logam_transisi",
    symbol: "Cu",
    name: "Tembaga",
    description:
      "Yuk, kenalan dengan Tembaga, si nomor atom dua puluh sembilan yang ramah dari golongan logam transisi. Unsur ini punya keunikan warna kemerahan yang sangat khas dan langka, karena hampir semua logam lain di dunia berwarna abu-abu atau keperakan, ditambah lagi ia adalah salah satu logam pertama yang berhasil diolah oleh manusia sejak ribuan tahun lalu. Di kehidupan modern, Tembaga adalah pahlawan listrik sejati karena ia sangat jago mengalirkan energi, sehingga hampir semua kabel di rumahmu, komponen komputer, hingga koin kuno menggunakan jasanya agar perangkat elektronik kita menyala dengan lancar.",
  },
  {
    number: 30,
    category: "logam_transisi",
    symbol: "Zn",
    name: "Seng",
    description:
      "Ini dia Seng, si nomor atom tiga puluh yang menjadi penutup manis di barisan pertama golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat hebat karena ia adalah pahlawan anti-karat sejati; jika ia melapisi besi, Seng rela mengorbankan dirinya sendiri untuk berkarat lebih dulu demi melindungi besi di bawahnya tetap utuh. Di kehidupan kita sehari-hari, Seng sangat berjasa sebagai lapisan pelindung pada atap rumah agar tidak mudah bocor, sekaligus menjadi nutrisi super penting di dalam makanan kita untuk menjaga daya tahan tubuh agar tidak gampang jatuh sakit.",
  },
  {
    number: 31,
    category: "logam_pascatransisi",
    symbol: "Ga",
    name: "Galium",
    description:
      "Kenalkan Galium, si nomor atom tiga puluh satu yang unik dari golongan logam miskin. Unsur keperakan ini punya keunikan yang sangat ajaib layaknya sulap, karena ia berwujud padat keras di suhu ruangan, namun bisa langsung meleleh menjadi cairan berkilau hanya karena kehangatan suhu telapak tanganmu. Di dunia modern kita, Galium adalah pahlawan teknologi yang sangat penting karena ia menjadi bahan utama pembuat komponen semikonduktor, yang membantu layar ponsel pintarmu menampilkan gambar berwarna-warni cerah serta membuat lampu hemat energi di rumahmu menyala dengan sangat terang.",
  },
  {
    number: 32,
    category: "metaloid",
    symbol: "Ge",
    name: "Germanium",
    description:
      "Sapa dulu Germanium, si nomor atom tiga puluh dua yang menjadi penghuni istimewa di golongan metaloid atau semi-logam. Unsur abu-abu berkilau ini punya keunikan sejarah yang menarik karena keberadaannya sudah diramalkan secara akurat oleh pencipta tabel periodik jauh sebelum fisiknya benar-benar ditemukan di alam. Dalam kehidupan modern, Germanium adalah pahlawan komunikasi karena sifatnya yang transparan terhadap sinar inframerah membuatnya sangat diandalkan sebagai bahan utama pembuat kabel serat optik yang mengalirkan internet super cepat ke rumahmu, serta menjadi lensa canggih pada kamera pendeteksi panas.",
  },
  {
    number: 33,
    category: "metaloid",
    symbol: "As",
    name: "Arsen",
    description:
      "Yuk, kenalan dengan Arsen, si nomor atom tiga puluh tiga yang legendaris dari golongan metaloid atau semi-logam. Unsur berwarna abu-abu mengkilap ini punya keunikan reputasi yang sangat misterius dan gelap, karena senyawa buatannya terkenal sebagai racun tak berbau dan tak berasa yang sering muncul di cerita detektif fiksi untuk melenyapkan musuh secara diam-diam. Sisi baiknya, di dunia nyata Arsen justru menjadi pahlawan teknologi modern karena jika dicampurkan ke dalam silikon, ia sangat berguna untuk memperkuat sinyal pada komponen cip semikonduktor di dalam ponsel pintar dan komputer yang kita gunakan setiap hari.",
  },
  {
    number: 34,
    category: "nonlogam_reaktif",
    symbol: "Se",
    name: "Selenium",
    description:
      "Ini dia Selenium, si nomor atom tiga puluh empat yang eksotis dari golongan non-logam. Unsur yang namanya diambil dari dewi bulan Yunani, Selene, ini punya keunikan sifat yang sangat peka terhadap cahaya; jika kegelapan menyelimutinya ia lambat menghantarkan listrik, namun saat terkena seberkas cahaya, kemampuannya mengalirkan listrik langsung melonjak drastis. Di kehidupan nyata, keunikan magis ini membuatnya sangat berjasa sebagai sensor otomatis pada mesin fotokopi dan panel surya, serta diam-diam menjadi nutrisi penting di dalam sampo anti-ketombe untuk menjaga kulit kepalamu tetap sehat.",
  },
  {
    number: 35,
    category: "nonlogam_reaktif",
    symbol: "Br",
    name: "Bromin",
    description:
      "Sapa dulu Bromin, si nomor atom tiga puluh lima yang menjadi satu-satunya unsur non-logam berwujud cair di suhu ruangan dalam golongan halogen. Unsur berwarna cokelat kemerahan ini punya keunikan aroma yang sangat menyengat dan menusuk hidung, bahkan namanya sendiri diambil dari bahasa Yunani bromos yang berarti bau busuk. Di balik aromanya yang kurang bersahabat, Bromin adalah pahlawan pelindung di kehidupan nyata karena senyawanya banyak dimanfaatkan sebagai bahan anti-api pada pelapis karpet, plastik elektronik, hingga kasur di rumahmu agar tidak mudah terbakar saat terjadi percikan api.",
  },
  {
    number: 36,
    category: "gas_mulia",
    symbol: "Kr",
    name: "Kripton",
    description:
      "Yuk, kenalan dengan Kripton, si nomor atom tiga puluh enam yang menjadi penghuni tenang di golongan gas mulia. Unsur gas ini punya keunikan yang sangat menarik karena meskipun namanya mirip dengan planet asal pahlawan super Superman, di dunia nyata Kripton justru merupakan gas yang sangat malas bereaksi dan tidak berwarna, namun akan memancarkan cahaya hijau keunguan yang luar biasa indah saat dialiri listrik. Di kehidupan sehari-hari, Kripton menjadi pahlawan penerangan karena sering diandalkan sebagai pengisi lampu landasan pacu bandara yang mampu menembus kabut tebal, serta lampu kilat kamera fotografi profesionalmu.",
  },
  {
    number: 37,
    category: "logam_alkali",
    symbol: "Rb",
    name: "Rubidium",
    description:
      "Ini dia Rubidium, si nomor atom tiga puluh tujuh yang super ramah dari golongan logam alkali. Unsur berwujud keperakan ini punya keunikan yang sangat reaktif, karena ia bisa langsung menyala dan terbakar secara spontan hanya karena bersentuhan dengan udara lembap, serta meleleh di hari yang panas karena titik lelehnya yang sangat rendah. Di kehidupan modern, Rubidium adalah pahlawan ketepatan karena sifat atomnya yang stabil digunakan sebagai komponen utama dalam pembuatan jam atom super akurat, yang mendalangi sistem navigasi GPS di ponsel pintarmu agar kamu tidak tersesat saat bepergian.",
  },
  {
    number: 38,
    category: "logam_alkali_tanah",
    symbol: "Sr",
    name: "Stronsium",
    description:
      "Sapa dulu Stronsium, si nomor atom tiga puluh delapan yang berkilau lembut dari golongan logam alkali tanah. Unsur keperakan ini punya keunikan yang sangat meriah karena ia adalah pesulap warna yang akan memancarkan cahaya merah menyala yang luar biasa terang dan dramatis saat dibakar. Di kehidupan nyata, keunikan inilah yang membuatnya selalu menjadi pahlawan di balik indahnya pertunjukan kembang api malam tahun baru dan suar darurat di laut. Selain itu, jenis stronsium tertentu juga diam-diam berjasa membantu para arkeolog melacak rute perjalanan manusia purba lewat sisa gigi mereka.",
  },
  {
    number: 39,
    category: "logam_transisi",
    symbol: "Y",
    name: "Itrium",
    description:
      "Yuk, kenalan dengan Itrium, si nomor atom tiga puluh sembilan yang keren dari golongan logam transisi. Unsur keperakan ini punya keunikan sejarah yang luar biasa, karena ia adalah unsur pertama yang ditemukan di sebuah tambang kecil di desa Ytterby, Swedia, yang nantinya melahirkan empat unsur baru sekaligus. Di kehidupan sehari-hari, Itrium adalah pahlawan visual karena perannya sangat besar dalam membuat layar televisi zaman dulu bisa menampilkan warna merah yang cerah, serta kini menjadi bahan penting pembuat lensa kamera canggih dan laser super kuat untuk dunia kedokteran.",
  },
  {
    number: 40,
    category: "logam_transisi",
    symbol: "Zr",
    name: "Zirkonium",
    description:
      "Ini dia Zirkonium, si nomor atom empat puluh yang berkilau menawan di golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat luar biasa karena ia adalah kembaran identik dari perhiasan mewah; kristal buatannya bisa dipotong dan dipoles hingga luar biasa mirip dengan berlian asli sampai sulit dibedakan oleh mata awam. Di kehidupan nyata, Zirkonium adalah pahlawan ketahanan yang sangat diandalkan karena sifatnya yang super kuat terhadap panas ekstrem dan karat, membuatnya sangat berguna sebagai bahan pelapis bagian dalam reaktor nuklir hingga menjadi mahkota gigi tiruan yang kokoh di mulut kita.",
  },
  {
    number: 41,
    category: "logam_transisi",
    symbol: "Nb",
    name: "Niobium",
    description:
      "Sapa dulu Niobium, si nomor atom empat puluh satu yang tangguh dari golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat puitis karena namanya diambil dari Niobe, dewi Yunani yang melambangkan kesedihan, gara-gara penemuannya yang penuh drama karena sempat membingungkan para ilmuwan dan tertukar dengan unsur kembarannya. Di dunia nyata, Niobium adalah pahlawan teknologi super karena jika dicampur sedikit saja ke dalam besi, ia bisa menciptakan baja super ringan namun luar biasa kuat yang kini menjadi bahan utama pembuat mesin pesawat terbang, rangka kokoh roket luar angkasa, hingga mesin pemindai rumah sakit.",
  },
  {
    number: 42,
    category: "logam_transisi",
    symbol: "Mo",
    name: "Molibdenum",
    description:
      "Yuk, kenalan dengan Molibdenum, si nomor atom empat puluh dua yang tangguh dari golongan logam transisi. Unsur abu-abu keperakan ini punya keunikan sejarah yang membingungkan karena wujud aslinya sangat mirip dengan timbal dan grafit, sampai-sampai namanya diambil dari bahasa Yunani molybdos yang berarti mirip timbal. Di kehidupan nyata, Molibdenum adalah pahlawan ketahanan karena memiliki titik leleh yang sangat tinggi; ia dicampur ke dalam baja untuk membuat bagian dalam mesin pesawat dan pelindung baja tangki yang tahan panas ekstrem, serta diam-diam menjadi nutrisi penting yang membantu tubuh kita membuang racun.",
  },
  {
    number: 43,
    category: "logam_transisi",
    symbol: "Tc",
    name: "Teknesium",
    description:
      "Ini dia Teknesium, si nomor atom empat puluh tiga yang misterius dari golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat luar biasa karena ia merupakan unsur pertama di tabel periodik yang tidak bisa ditemukan secara alami di bumi, melainkan harus dibuat secara artifisial oleh manusia di dalam laboratorium. Di kehidupan sehari-hari, Teknesium adalah pahlawan medis yang sangat berjasa karena sifat radioaktifnya yang aman dimanfaatkan sebagai cairan pelacak dalam pemindaian rumah sakit, membantu dokter melihat kondisi jantung, otak, hingga tulang pasien dengan sangat jelas tanpa perlu pembedahan.",
  },
  {
    number: 44,
    category: "logam_transisi",
    symbol: "Ru",
    name: "Rutenium",
    description:
      "Rutenium (simbol Ru, nomor atom 44) adalah logam transisi langka dan keras berwarna putih keperakan yang termasuk dalam kelompok platina. Sangat tahan korosi, rutenium banyak digunakan dalam industri elektronik (resistor chip), katalis kimia, dan sebagai paduan untuk mengeraskan platina atau paladium.",
  },
  {
    number: 45,
    category: "logam_transisi",
    symbol: "Rh",
    name: "Rodium",
    description:
      "Yuk, kenalan dengan Rodium, si nomor atom empat puluh lima yang merupakan bangsawan di golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat mencengangkan karena ia dinobatkan sebagai salah satu logam mulia paling langka sekaligus paling mahal di dunia, bahkan harganya bisa berkali-kali lipat melampaui emas murni. Di kehidupan sehari-hari, Rodium adalah pahlawan lingkungan yang tersembunyi di bawah mobil kita, karena ia menjadi bahan utama pembersih asap knalpot agar udara yang kita hirup bebas dari gas beracun, serta menjadi pelapis perhiasan mewah agar selalu berkilau indah tanpa goresan.",
  },
  {
    number: 46,
    category: "logam_transisi",
    symbol: "Pd",
    name: "Paladium",
    description:
      "Ini dia Paladium, si nomor atom empat puluh enam yang berkilau anggun dari golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat ajaib seperti spons, karena ia mampu menyerap gas hidrogen dalam jumlah yang luar biasa banyak hingga sembilan ratus kali lipat dari volume tubuhnya sendiri. Di kehidupan kita sehari-hari, Paladium adalah pahlawan lingkungan yang sangat berjasa karena ia bekerja keras di dalam knalpot mobil untuk menyaring dan mengubah gas beracun menjadi udara yang lebih aman, sekaligus menjadi campuran emas putih yang membuat cincin pernikahan berkilau indah tanpa pudar.",
  },
  {
    number: 47,
    category: "logam_transisi",
    symbol: "Ag",
    name: "Perak",
    description:
      "Sapa dulu Perak, si nomor atom empat puluh tujuh yang berkilau menawan dari golongan logam transisi. Unsur putih keperakan ini punya keunikan yang sangat hebat karena ia dinobatkan sebagai logam paling jagoan dalam menghantarkan listrik dan panas di antara semua unsur di alam semesta, sekaligus memiliki kemampuan alami untuk membasmi bakteri jahat di sekitarnya. Di kehidupan sehari-hari, Perak adalah pahlawan kenyamanan karena selain menjadi perhiasan indah dan sendok mewah, ia diam-diam tertanam di dalam panel surya rumahmu serta menjadi komponen penting pada papan sirkuit elektronik ponsel pintarmu agar bisa bekerja cepat.",
  },
  {
    number: 48,
    category: "logam_transisi",
    symbol: "Cd",
    name: "Kadmium",
    description:
      "Yuk, kenalan dengan Kadmium, si nomor atom empat puluh delapan yang termasuk dalam golongan logam transisi. Unsur berwarna putih keperakan yang sangat lembut ini punya keunikan yang cukup ekstrem karena ia sangat mudah dipotong hanya menggunakan pisau dapur biasa, namun di balik kelembutannya, ia adalah racun kuat yang sangat tidak suka berteman dengan makhluk hidup. Di kehidupan nyata, sifat Kadmium yang tahan karat dan pandai menghantarkan listrik membuatnya sangat berjasa sebagai bahan utama baterai isi ulang model lama, pelapis pelindung baja pesawat terbang, hingga menjadi pigmen warna kuning cerah yang membuat cat lukisan para seniman tahan lama.",
  },
  {
    number: 49,
    category: "logam_pascatransisi",
    symbol: "In",
    name: "Indium",
    description:
      "Ini dia Indium, si nomor atom empat puluh sembilan yang ramah dari golongan logam miskin. Unsur berwarna perak berkilau ini punya keunikan yang sangat menggemaskan; ia begitu lembut sampai-sampai bisa ditekuk dengan tangan kosong, dan uniknya, ia akan mengeluarkan suara pekikan khas mirip tangisan akibat struktur atomnya yang bergeser saat dipatahkan. Di kehidupan modern, Indium adalah pahlawan di balik layar ponsel pintarmu karena senyawanya yang transparan namun jago menghantarkan listrik menjadi lapisan ajaib pada layar sentuh agar bisa merespon ketukan jarimu, sekaligus membuat panel surya bekerja optimal.",
  },
  {
    number: 50,
    category: "logam_pascatransisi",
    symbol: "Sn",
    name: "Timah",
    description:
      "Sapa dulu Timah, si nomor atom lima puluh yang legendaris dari golongan logam miskin. Unsur keperakan yang mengkilap ini punya keunikan sejarah yang luar biasa karena ia telah bersahabat dengan manusia sejak zaman purba, bahkan menjadi kunci lahirnya Zaman Perunggu yang mengubah peradaban kita. Di kehidupan modern saat ini, Timah adalah pahlawan perekat dunia elektronik karena ia meleleh pada suhu rendah; logam ini dicairkan sebagai solder untuk menyambungkan kabel dan komponen di dalam ponsel pintar serta laptopmu, sekaligus menjadi lapisan pelindung anti karat pada kaleng makanan agar tetap higienis.",
  },
  {
    number: 51,
    category: "metaloid",
    symbol: "Sb",
    name: "Antimon",
    description:
      "Yuk, kenalan dengan Antimon, si nomor atom lima puluh satu yang unik dari golongan metaloid, alias si separuh logam separuh bukan. Unsur ini punya keunikan sifat yang sangat ajaib karena ia akan mengembang saat membeku dari wujud cairnya, kebalikan dari sifat air atau logam kebanyakan yang biasanya justru menyusut. Di kehidupan sehari-hari, Antimon adalah pahlawan ketangguhan karena ia dicampur ke dalam timbal untuk memperkuat aki kendaraan bermotor agar tahan lama, serta senyawanya banyak dimanfaatkan sebagai bahan pelapis anti-api pada pakaian petugas pemadam kebakaran demi menjaga keselamatan mereka.",
  },
  {
    number: 52,
    category: "metaloid",
    symbol: "Te",
    name: "Telurium",
    description:
      "Ini dia Telurium, si nomor atom lima puluh dua yang misterius dari golongan metaloid. Unsur berkilau perak ini punya keunikan rasa yang sangat aneh; jika kulitmu menyentuh sedikit saja unsur ini, tubuhmu akan mengeluarkan aroma bawang putih yang sangat menyengat selama berminggu-minggu, bahkan napasmu pun ikut berbau tajam. Di kehidupan modern, Telurium adalah pahlawan teknologi hijau karena ia menjadi bahan super penting pembuat panel surya generasi baru yang sangat efisien dalam mengubah sinar matahari menjadi listrik rumahmu, serta dicampur ke dalam tembaga agar logam tersebut lebih mudah dibentuk.",
  },
  {
    number: 53,
    category: "nonlogam_reaktif",
    symbol: "I",
    name: "Iodin",
    description:
      "Sapa dulu Iodin, si nomor atom lima puluh tiga yang eksotis dari golongan halogen. Unsur padat berwarna hitam keunguan ini punya keunikan sifat yang sangat ajaib, karena ia tidak akan meleleh menjadi cairan saat dipanaskan, melainkan langsung berubah wujud menjadi gas berwarna ungu tua yang sangat cantik. Di kehidupan sehari-hari, Iodin adalah pahlawan kesehatan yang luar biasa; senyawanya selalu siap sedia di kotak obat rumahmu sebagai cairan antiseptik untuk membersihkan dan menyembuhkan luka agar tidak infeksi, sekaligus menjadi nutrisi wajib di dalam garam dapur demi mencegah penyakit gondok.",
  },
  {
    number: 54,
    category: "gas_mulia",
    symbol: "Xe",
    name: "Xenon",
    description:
      "Yuk, kenalan dengan Xenon, si nomor atom lima puluh empat yang menjadi bangsawan misterius di golongan gas mulia. Unsur gas yang tidak berwarna dan tidak berbau ini punya keunikan nama yang diambil dari bahasa Yunani berarti asing, karena keberadaannya di atmosfer bumi kita memang sangat langka dan sulit sekali ditemukan. Di kehidupan modern, Xenon adalah pahlawan kilat karena kemampuannya menghasilkan cahaya putih kebiruan super terang saat dialiri listrik, membuatnya sangat diandalkan sebagai pengisi lampu depan mobil mewah, lampu proyektor bioskop IMAX, hingga menjadi obat bius canggih di dunia kedokteran.",
  },
  {
    number: 55,
    category: "logam_alkali",
    symbol: "Cs",
    name: "Sesium",
    description:
      "Ini dia Sesium, si nomor atom lima puluh lima yang super ekspresif dari golongan logam alkali. Unsur berwarna emas pucat ini punya keunikan yang sangat dramatis; ia adalah logam yang begitu manja karena bisa meleleh dihangatkan suhu telapak tanganmu saja, namun sekaligus sangat galak karena akan langsung meledak hebat jika nekat dicemplungkan ke dalam air. Di kehidupan modern, Sesium adalah pahlawan ketepatan waktu karena atomnya bergetar sangat stabil, menjadikannya bahan utama pembuat jam atom super akurat di dunia yang bertugas mengatur waktu internet dan sinyal GPS di ponsel pintarmu.",
  },
  {
    number: 56,
    category: "logam_alkali_tanah",
    symbol: "Ba",
    name: "Barium",
    description:
      "Sapa dulu Barium, si nomor atom lima puluh enam yang berbobot dari golongan logam alkali tanah. Unsur berwarna perak kekuningan ini punya keunikan nama yang diambil dari bahasa Yunani barys yang berarti berat, karena ia memang membentuk batuan padat yang sangat padat dan berbobot. Di kehidupan sehari-hari, Barium adalah pahlawan pesta sekaligus medis; senyawanya menjadi rahasia di balik indahnya kembang api berwarna hijau terang di langit malam, serta digunakan dalam dunia kedokteran sebagai cairan khusus yang diminum pasien agar kondisi usus dan lambung mereka bisa terlihat jelas saat difoto rontgen.",
  },
  {
    number: 57,
    category: "lantanida",
    symbol: "La",
    name: "Lantanum",
    description:
      "Yuk, kenalan dengan Lantanium, si nomor atom lima puluh tujuh yang menjadi pemimpin terhormat dari golongan lantanida. Unsur logam berwarna perak keputihan ini punya keunikan yang sangat menarik karena ia begitu lunak sampai bisa dipotong halus dengan pisau, namun jika digores sedikit saja, ia akan langsung mengeluarkan percikan api yang terang. Di kehidupan kita sehari-hari, Lantanium adalah pahlawan di balik indahnya dunia visual karena senyawanya menjadi bahan utama pembuat lensa kamera berkualitas tinggi agar jepretan fotomu super jernih, sekaligus bekerja keras di dalam baterai mobil hibrida agar hemat energi.",
  },
  {
    number: 58,
    category: "lantanida",
    symbol: "Ce",
    name: "Serium",
    description:
      "Ini dia Serium, si nomor atom lima puluh delapan yang berkilau abu-abu dari golongan lantanida. Unsur logam yang sekilas tampak biasa ini punya keunikan yang sangat mengejutkan; ia sangat mudah terbakar bahkan hanya dengan goresan ringan atau gesekan jari, menjadikannya logam paling reaktif di golongannya. Di kehidupan nyata, Serium adalah pahlawan kecil yang sering kita bawa ke mana-mana karena ia menjadi bahan utama pembuat batu pemantik pada korek api gas, sekaligus bekerja cerdas sebagai komponen filter knalpot mobil untuk mengurangi polusi udara agar lingkungan kita tetap sehat.",
  },
  {
    number: 59,
    category: "lantanida",
    symbol: "Pr",
    name: "Praseodimium",
    description:
      "Sapa dulu Praseodimium, si nomor atom lima puluh sembilan yang berkilau hijau kekuningan dari golongan lantanida. Unsur logam ini punya keunikan nama yang sangat puitis, berarti kembaran hijau, karena ia memang selalu ditemukan berdampingan dengan unsur kembarannya dan memiliki keajaiban unik berupa garamnya yang berwarna hijau limau alami yang sangat cantik. Di kehidupan sehari-hari, Praseodimium adalah pahlawan pelindung mata karena ia dicampur ke dalam kaca kacamata khusus tukang las untuk menyaring cahaya kuning yang berbahaya, sekaligus menjadi bahan pembuat magnet super kuat pada mesin turbin angin.",
  },
  {
    number: 60,
    category: "lantanida",
    symbol: "Nd",
    name: "Neodimium",
    description:
      "Yuk, kenalan dengan Neodimium, si nomor atom enam puluh yang menjadi bintang paling bersinar di golongan lantanida. Unsur logam berwarna perak cerah ini punya keunikan yang luar biasa magis, karena ketika ia dicampur dengan besi dan boron, mereka akan menjelma menjadi magnet permanen paling kuat di seluruh jagat raya yang sanggup mengangkat beban ribuan kali lipat dari berat dirinya sendiri. Di kehidupan sehari-hari, Neodimium adalah penggerak teknologi modern karena magnet supernya tertanam di dalam generator turbin angin, motor mobil listrik, hingga pelantang suara ponsel pintarmu agar menghasilkan suara yang jernih.",
  },
  {
    number: 61,
    category: "lantanida",
    symbol: "Pm",
    name: "Prometium",
    description:
      "Ini dia Prometium, si nomor atom enam puluh satu yang menjadi sosok paling langka dan misterius di golongan lantanida. Unsur logam ini punya keunikan yang sangat magis karena ia bersifat radioaktif dan bisa memancarkan cahaya biru kehijauan yang berpendar sendiri di dalam kegelapan tanpa perlu bantuan sinar matahari. Di kehidupan sehari-hari, Prometium adalah pahlawan energi tangguh yang dimanfaatkan sebagai bahan bakar baterai nuklir mini seukuran kancing baju untuk menyalakan alat pacu jantung buatan dan memandu instrumen kendali pada pesawat luar angkasa agar dapat menjelajah sangat jauh.",
  },
  {
    number: 62,
    category: "lantanida",
    symbol: "Sm",
    name: "Samarium",
    description:
      "Sapa dulu Samarium, si nomor atom enam puluh dua yang berkilau keperakan dari golongan lantanida. Unsur logam ini punya keunikan yang sangat tangguh karena ia berkolaborasi dengan kobalt untuk menciptakan magnet super kuat yang memiliki kekebalan luar biasa terhadap suhu panas ekstrem, bahkan tetap bekerja normal di atas tujuh ratus derajat Celsius tanpa kehilangan kekuatan magnetnya. Di kehidupan nyata, Samarium adalah pahlawan andalan di dunia medis dan teknologi karena magnet tahan panasnya menjadi komponen vital pada mesin pemindai tubuh atau MRI, alat pacu jantung, serta menjadi pemandu presisi pada sistem radar pesawat.",
  },
  {
    number: 63,
    category: "lantanida",
    symbol: "Eu",
    name: "Europium",
    description:
      "Yuk, kenalan dengan Europium, si nomor atom enam puluh tiga yang menjadi pesulap cahaya di golongan lantanida. Unsur logam keperakan ini punya keunikan yang sangat keren, karena ia adalah unsur paling reaktif di golongannya yang bisa berpendar sendiri dengan warna merah menyala yang sangat indah saat terkena sinar tidak kasat mata. Di kehidupan sehari-hari, Europium adalah pahlawan warna karena dialah yang membuat layar televisi dan monitor komputer kita bisa menampilkan warna merah yang cerah dan hidup, sekaligus menjadi tinta rahasia anti-pemalsuan pada lembaran uang kertas Euro agar aman dari penjahat.",
  },
  {
    number: 64,
    category: "lantanida",
    symbol: "Gd",
    name: "Gadolinium",
    description:
      "Ini dia Gadolinium, si nomor atom enam puluh empat yang berkilau keperakan dari golongan lantanida. Unsur logam ini punya keunikan magnetik yang sangat langka, karena ia sangat sensitif terhadap suhu dan akan berubah menjadi magnet kuat hanya saat berada di lingkungan yang sejuk atau dingin di bawah suhu kamar. Di kehidupan sehari-hari, Gadolinium adalah pahlawan besar di dunia medis; senyawanya disuntikkan ke dalam tubuh pasien sebagai cairan kontras khusus untuk membantu mesin MRI memetakan bagian dalam tubuh kita dengan sangat jelas, sehingga dokter bisa mendeteksi penyakit secara akurat dan menyelamatkan banyak nyawa.",
  },
  {
    number: 65,
    category: "lantanida",
    symbol: "Tb",
    name: "Terbium",
    description:
      "Sapa dulu Terbium, si nomor atom enam puluh lima yang berkilau keperakan dari golongan lantanida. Unsur logam yang sekilas tampak kalem ini punya keunikan sifat yang sangat memukau, karena ia merupakan bunglon cahaya yang akan berpendar memancarkan warna hijau lemon yang sangat terang dan indah saat ditembak dengan sinar tidak kasat mata. Di kehidupan sehari-hari, Terbium adalah pahlawan visual kita karena pendaran hijaunya dimanfaatkan untuk menghidupkan warna pada layar ponsel pintar dan televisi resolusi tinggi, sekaligus menjadi komponen rahasia dalam membuat lampu hemat energi yang nyaman di mata kita.",
  },
  {
    number: 66,
    category: "lantanida",
    symbol: "Dy",
    name: "Disprosium",
    description:
      "Yuk, kenalan dengan Disprosium, si nomor atom enam puluh enam yang tangguh dari golongan lantanida. Unsur logam berwarna perak berkilau ini punya keunikan nama yang sangat dramatis karena berasal dari bahasa Yunani yang berarti sulit didapatkan, sebuah fakta yang terbukti karena para ilmuwan butuh waktu puluhan tahun hanya untuk mengisolasinya secara murni. Di kehidupan modern, Disprosium adalah pahlawan ketahanan energi karena ia dicampur ke dalam magnet neodimium agar magnet tersebut tetap bekerja kuat tanpa melemah sedikit pun di dalam suhu panas ekstrem mesin mobil listrik dan generator turbin angin raksasa.",
  },
  {
    number: 67,
    category: "lantanida",
    symbol: "Ho",
    name: "Holmium",
    description:
      "Ini dia Holmium, si nomor atom enam puluh tujuh yang berkilau keperakan dari golongan lantanida. Unsur logam yang lembut ini punya keunikan magis yang luar biasa, karena ia adalah juara bertahan pemilik kekuatan magnet tertinggi di antara semua unsur di tabel periodik, bahkan sanggup membelokkan arah medan magnet dengan sangat kuat. Di kehidupan sehari-hari, Holmium adalah pahlawan di dunia medis karena kemampuannya memancarkan gelombang laser khusus yang sangat presisi, yang digunakan oleh para dokter bedah untuk menghancurkan batu ginjal dan mengoperasi jaringan kanker tanpa merusak bagian tubuh sehat di sekitarnya.",
  },
  {
    number: 68,
    category: "lantanida",
    symbol: "Er",
    name: "Erbium",
    description:
      "Sapa dulu Erbium, si nomor atom enam puluh delapan yang berkilau keperakan dari golongan lantanida. Unsur logam yang sekilas kalem ini punya keunikan yang sangat cantik, karena jika ia diubah menjadi senyawa oksida, logam ini akan menjelma menjadi bubuk berwarna merah muda pastel alami yang sangat anggun dan memesona. Di kehidupan modern, Erbium adalah pahlawan internet cepat kita; ia disuntikkan ke dalam kabel serat optik bawah laut sebagai penguat sinyal cahaya, sehingga data internet yang melintasi samudra tidak melemah dan kamu bisa menonton video serta berkirim pesan tanpa putus.",
  },
  {
    number: 69,
    category: "lantanida",
    symbol: "Tm",
    name: "Tulium",
    description:
      "Yuk, kenalan dengan Tulium, si nomor atom enam puluh sembilan yang menjadi salah satu sosok paling langka di golongan lantanida. Unsur logam keperakan yang sangat lembut ini punya keunikan yang menakjubkan karena ia sangat sulit ditemukan di bumi, namun jika terkena paparan radiasi di dalam reaktor nuklir, ia bisa berubah menjadi sumber sinar-X portabel yang tidak membutuhkan listrik sama sekali. Di kehidupan nyata, Tulium adalah pahlawan medis yang hebat; ia digunakan sebagai bahan utama laser canggih untuk operasi bedah jaringan yang sangat presisi, sekaligus menjadi komponen pelindung anti-pemalsuan pada uang kertas karena pendaran cahayanya yang khas.",
  },
  {
    number: 70,
    category: "lantanida",
    symbol: "Yb",
    name: "Iterbium",
    description:
      "Ini dia Iterbium, si nomor atom tujuh puluh yang menjadi penutup manis dari deretan golongan lantanida. Unsur logam berwarna perak cerah ini punya keunikan sifat yang sangat tangguh, karena ia bisa meregang dan menjadi sangat elastis seperti karet saat dipanaskan, namun kekuatannya akan berlipat ganda saat menerima tekanan yang luar biasa ekstrem. Di kehidupan sehari-hari, Iterbium adalah pahlawan teknologi masa depan karena ia digunakan sebagai bahan penguat laser serat optik untuk mengukir komponen mikrochip komputer, sekaligus menjadi sensor super sensitif untuk memantau kekuatan gempa bumi di dalam tanah.",
  },
  {
    number: 71,
    category: "lantanida",
    symbol: "Lu",
    name: "Lutesium",
    description:
      "Sapa dulu Lutesium, si nomor atom tujuh puluh satu yang menjadi benteng pertahanan terakhir sekaligus penutup dari golongan lantanida. Unsur logam berwarna perak berkilau ini punya keunikan yang sangat prestisius karena ia dinobatkan sebagai logam lantanida paling padat, paling keras, sekaligus paling mahal di dunia karena proses pemisahannya yang sangat rumit. Di kehidupan nyata, Lutesium adalah pahlawan super di dunia medis karena sifat radioaktif ringannya dimanfaatkan sebagai senjata mutakhir dalam terapi kanker untuk menghancurkan sel tumor, sekaligus menjadi komponen penting dalam mesin pemindai rumah sakit untuk mendeteksi penyakit sejak dini.",
  },
  {
    number: 72,
    category: "logam_transisi",
    symbol: "Hf",
    name: "Hafnium",
    description:
      "Yuk, kenalan dengan Hafnium, si nomor atom tujuh puluh dua yang menjadi andalan tangguh dari golongan logam transisi. Unsur berwarna perak berkilau ini punya keunikan yang luar biasa karena ia adalah zombi pelindung yang sangat tahan terhadap korosi air dan memiliki titik leleh super tinggi, bahkan tetap kokoh berdiri di tengah kobaran suhu di atas dua ribu derajat Celsius. Di kehidupan sehari-hari, Hafnium bekerja sebagai pahlawan tanpa tanda jasa di dalam laptop atau ponsel pintarmu karena ia menjadi komponen mikrochip agar perangkat elektronikmu tidak cepat panas, sekaligus bertugas mengendalikan energi di dalam reaktor nuklir agar tetap aman.",
  },
  {
    number: 73,
    category: "logam_transisi",
    symbol: "Ta",
    name: "Tantalum",
    description:
      "Ini dia Tantalum, si nomor atom tujuh puluh tiga yang menjadi pahlawan tangguh di golongan logam transisi. Unsur berwarna abu-abu gelap ini punya keunikan yang luar biasa karena ia benar-benar kebal terhadap serangan zat asam paling korosif sekalipun dan sama sekali tidak bisa memicu reaksi penolakan dari dalam tubuh manusia. Di kehidupan sehari-hari, Tantalum adalah penyelamat gadget kita karena kemampuannya menampung listrik dalam ukuran mini menjadikannya bahan utama komponen kapasitor di dalam ponsel pintar, sekaligus menjadi bahan andalan dokter untuk membuat implan tulang dan gigi tiruan yang aman.",
  },
  {
    number: 74,
    category: "logam_transisi",
    symbol: "W",
    name: "Wolfram",
    description:
      "Sapa dulu Wolfram, si nomor atom tujuh puluh empat yang tangguh dari golongan logam transisi. Unsur berwajah abu-abu keperakan ini punya keunikan yang sangat legendaris, yaitu memiliki titik leleh paling tinggi di antara semua logam murni di bumi, sehingga ia tetap kokoh berdiri tanpa meleleh sedikit pun meski dibakar hingga suhu di atas tiga ribu derajat Celsius. Di kehidupan nyata, Wolfram adalah pahlawan penerangan dan industri karena ketangguhannya ini sangat diandalkan sebagai kawat pijar di dalam bola lampu klasik, komponen mesin bor pemotong baja, hingga pelindung panas pada badan pesawat luar angkasa.",
  },
  {
    number: 75,
    category: "logam_transisi",
    symbol: "Re",
    name: "Renium",
    description:
      "Yuk, kenalan dengan Renium, si nomor atom tujuh puluh lima yang menjadi salah satu penjelajah tangguh di golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat luar biasa karena ia adalah salah satu unsur paling langka di kerak bumi dan memiliki titik didih paling tinggi di antara semua unsur tabel periodik. Di kehidupan nyata, Renium adalah pahlawan kedirgantaraan karena kekuatannya menahan panas ekstrem menjadikannya bahan campuran vital untuk membuat bilah turbin mesin pesawat jet, sekaligus menjadi pemicu reaksi kimia penting dalam memproduksi bensin bebas timbal yang ramah lingkungan.",
  },
  {
    number: 76,
    category: "logam_transisi",
    symbol: "Os",
    name: "Osmium",
    description:
      "Ini dia Osmium, si nomor atom tujuh puluh enam yang menjadi juara bertahan paling berbobot di golongan logam transisi. Unsur berwarna biru keperakan ini punya keunikan yang sangat luar biasa karena ia dinobatkan sebagai zat alami paling padat di seluruh bumi, sampai-sampai sebongkah Osmium seukuran bola sepak saja beratnya setara dengan seekor sapi dewasa. Di kehidupan nyata, Osmium adalah pahlawan ketahanan karena kekerasan ekstremnya sangat diandalkan untuk membuat ujung pena pulpen yang awet, jarum pemutar piringan hitam, hingga komponen instrumen bedah medis yang butuh ketelitian tinggi.",
  },
  {
    number: 77,
    category: "logam_transisi",
    symbol: "Ir",
    name: "Iridium",
    description:
      "Sapa dulu Iridium, si nomor atom tujuh puluh tujuh yang berkilau keperakan dari golongan logam transisi. Unsur ini punya keunikan yang sangat legendaris, karena ia adalah logam paling tahan korosi di bumi yang jejak kelimpahannya di kerak dunia menjadi bukti kuat runtuhnya era dinosaurus akibat hantaman meteorit raksasa jutaan tahun lalu. Di kehidupan nyata, Iridium adalah pahlawan ketahanan tingkat tinggi karena sifatnya yang super stabil dimanfaatkan sebagai bahan baku busi jet berperforma tinggi, ujung pena mewah yang antipudar, hingga wadah peleburan khusus dalam industri pembuatan kaca berkualitas tinggi.",
  },
  {
    number: 78,
    category: "logam_transisi",
    symbol: "Pt",
    name: "Platina",
    description:
      "Yuk, kenalan dengan Platina, si nomor atom tujuh puluh delapan yang menjadi bangsawan sejati di golongan logam transisi. Unsur berkilau perak keputihan ini punya keunikan yang luar biasa karena ia sangat malas bereaksi dengan zat lain, membuatnya luar biasa murni, antikarat, bahkan tidak akan pudar meski terkubur ribuan tahun di dalam tanah. Di kehidupan sehari-hari, Platina adalah pahlawan lingkungan dan kesehatan karena ia menjadi komponen vital pengubah asap beracun knalpot mobil menjadi udara yang lebih bersih, sekaligus menjadi bahan utama perhiasan mewah kelas dunia dan obat kemoterapi pelawan kanker.",
  },
  {
    number: 79,
    category: "logam_transisi",
    symbol: "Au",
    name: "Emas",
    description:
      "Ini dia Emas, si nomor atom tujuh puluh sembilan yang menjadi primadona berkilau kuning abadi di golongan logam transisi. Unsur legendaris ini punya keunikan yang luar biasa karena ia sangat lembut hingga bisa ditempa menjadi lembaran super tipis, serta menjadi salah satu logam paling stabil di bumi yang tidak akan pernah berkarat atau pudar meski terendam ribuan tahun di dasar lautan. Di kehidupan sehari-hari, Emas bukan cuma jadi rebutan untuk perhiasan mewah dan investasi berharga, tapi juga pahlawan teknologi modern sebagai pelapis konektor mikrochip di dalam ponsel pintarmu agar aliran datanya super cepat dan lancar.",
  },
  {
    number: 80,
    category: "logam_transisi",
    symbol: "Hg",
    name: "Raksa",
    description:
      "Sapa dulu Raksa, si nomor atom delapan puluh yang menjadi sosok paling nyentrik di golongan logam transisi. Unsur keperakan ini punya keunikan yang sangat ajaib karena ia adalah satu-satunya logam di bumi yang berwujud cair dalam suhu ruangan normal, sehingga ia bisa mengalir dan menggelinding lincah seperti air raksa di atas telapak tanganmu. Di kehidupan sehari-hari, Raksa adalah pahlawan pengukur suhu tradisional karena sifat pemuaiannya yang sangat stabil dan cepat bereaksi terhadap perubahan panas membuatnya sangat diandalkan di dalam tabung termometer medis, sakelar listrik otomatis, hingga lampu neon yang menerangi jalanan kota.",
  },
  {
    number: 81,
    category: "logam_pascatransisi",
    symbol: "Tl",
    name: "Talium",
    description:
      "Yuk, kenalan dengan Talium, si nomor atom delapan puluh satu yang berkilau abu-abu keperakan dari golongan logam pasca-transisi. Unsur bertekstur sangat lembut ini punya keunikan yang menyeramkan sekaligus menakjubkan, karena ia merupakan salah satu logam paling beracun di bumi yang saking mematikannya sampai sering dijuluki sebagai racunnya para peracun di kisah misteri klasik. Di kehidupan nyata, Talium adalah pahlawan teknologi canggih karena sifat optiknya yang luar biasa sangat diandalkan sebagai bahan pembuat lensa kamera berkualitas tinggi, sensor inframerah militer, hingga sistem pendeteksi penyakit jantung di rumah sakit.",
  },
  {
    number: 82,
    category: "logam_pascatransisi",
    symbol: "Pb",
    name: "Timbal",
    description:
      "Ini dia Timbal, si nomor atom delapan puluh tiga yang berwajah abu-abu keperakan dari golongan logam pasca-transisi. Unsur berbobot berat ini punya keunikan sejarah yang luar biasa karena ia telah bersahabat dengan manusia sejak zaman kuno, saking lunaknya bahkan bisa kamu gores hanya menggunakan kuku jari tanganmu sendiri. Di kehidupan sehari-hari, Timbal adalah pahlawan pelindung dan energi karena sifat padatnya sangat diandalkan sebagai bahan utama aki kendaraan bermotor, campuran cat pelapis antigores, hingga rompi pelindung khusus di ruang radiologi rumah sakit agar tubuh kita aman dari paparan sinar-X.",
  },
  {
    number: 83,
    category: "logam_pascatransisi",
    symbol: "Bi",
    name: "Bismut",
    description:
      "Sapa dulu Bismut, si nomor atom delapan puluh tiga yang unik dari golongan logam pasca-transisi. Unsur ini punya keunikan visual yang luar biasa magis, karena meski aslinya berwarna putih keperakan, permukaannya bisa mengosidasi dan memunculkan lapisan warna-warni pelangi berbentuk struktur kristal tangga berundak yang sangat artistik. Di kehidupan nyata, Bismut adalah pahlawan pencernaan yang sangat ramah; senyawa dari logam aman berkepala dingin ini menjadi bahan aktif utama obat sakit perut cair warna merah muda yang sering kita minum untuk meredakan mual, diare, dan kembung.",
  },
  {
    number: 84,
    category: "logam_pascatransisi",
    symbol: "Po",
    name: "Polonium",
    description:
      "Yuk, kenalan dengan Polonium, si nomor atom delapan puluh empat yang misterius dari golongan metaloid. Unsur penemuan Marie Curie ini punya keunikan yang sangat mencengangkan karena ia merupakan salah satu unsur paling radioaktif di alam semesta, bahkan sanggup memancarkan pendaran cahaya biru yang indah di dalam kegelapan akibat energinya yang sangat tinggi. Di kehidupan nyata, Polonium adalah pahlawan industri yang bekerja dalam sunyi; radiasinya dimanfaatkan sebagai alat penghilang listrik statis yang sangat ampuh pada mesin pembuat kertas, gulungan tekstil, hingga kuas pembersih lensa kamera mahal kita agar bebas dari debu.",
  },
  {
    number: 85,
    category: "logam_pascatransisi",
    symbol: "At",
    name: "Astatin",
    description:
      "Ini dia Astatin, si nomor atom delapan puluh lima yang menjadi sosok paling misterius di golongan halogen. Unsur ini punya keunikan yang sangat luar biasa karena ia dinobatkan sebagai unsur alami paling langka di kerak bumi, saking tidak stabilnya, seluruh jumlah Astatin di planet kita ini diperkirakan tidak sampai satu sendok teh. Di kehidupan nyata, Astatin adalah senjata rahasia masa depan di dunia medis karena sifat radioaktifnya yang sangat kuat namun berumur pendek sedang dikembangkan para ilmuwan sebagai agen terapi kanker yang ampuh menghancurkan sel tumor tanpa merusak jaringan sehat di sekitarnya.",
  },
  {
    number: 86,
    category: "gas_mulia",
    symbol: "Rn",
    name: "Radon",
    description:
      "Sapa dulu Radon, si nomor atom delapan puluh enam yang menjadi perwakilan paling berat di golongan gas mulia. Unsur berwujud gas ini punya keunikan yang sangat kontradiktif, karena ia tidak berwarna dan tidak berbau sama sekali, namun di balik ketidakhadirannya yang kasat mata, ia justru sangat radioaktif dan bisa memancarkan pendaran warna kuning cerah saat dibekukan. Di kehidupan nyata, Radon adalah pahlawan pelacak alam karena radiasinya dimanfaatkan oleh para ahli geologi sebagai indikator akurat untuk memprediksi gempa bumi, melacak pergerakan air tanah, hingga mendeteksi keberadaan cadangan minyak bumi di kedalaman tanah.",
  },
  {
    number: 87,
    category: "logam_alkali",
    symbol: "Fr",
    name: "Fransium",
    description:
      "Yuk, kenalan dengan Fransium, si nomor atom delapan puluh tujuh yang menduduki takhta paling bawah di golongan logam alkali. Unsur super langka ini punya keunikan yang sangat ekstrem karena ia adalah logam yang luar biasa tidak stabil, saking rapuhnya ia akan langsung sirna dan meluruh hanya dalam waktu dua puluh menit setelah tercipta di alam. Di kehidupan sehari-hari, jangan harap bisa menemuinya di dapur atau pasar, karena Fransium bekerja khusus di laboratorium canggih sebagai alat bantu para ilmuwan untuk memahami struktur rahasia atom dan mendeteksi tanda-tanda penyakit kanker sejak dini.",
  },
  {
    number: 88,
    category: "logam_alkali_tanah",
    symbol: "Ra",
    name: "Radium",
    description:
      "Ini dia Radium, si nomor atom delapan puluh delapan yang menjadi selebritas paling bersinar di golongan logam alkali tanah. Unsur legendaris yang ditemukan oleh Marie Curie ini punya keunikan yang sangat magis, karena ia bisa memancarkan pendaran cahaya biru pucat yang cantik di dalam kegelapan yang pekat berkat sifat radioaktifnya yang super kuat. Di kehidupan sehari-hari, Radium adalah pahlawan medis yang tangguh karena energi radiasi dahsyatnya dimanfaatkan di rumah sakit sebagai senjata andalan untuk menghancurkan sel kanker payudara dan prostat, sekaligus menjadi bahan penting dalam penelitian fisika modern.",
  },
  {
    number: 89,
    category: "aktinida",
    symbol: "Ac",
    name: "Aktinium",
    description:
      "Sapa dulu Aktinium, si nomor atom delapan puluh sembilan yang menjadi ketua pelopor sekaligus pembuka dari golongan aktinida. Unsur logam berwarna perak berkilau ini punya keunikan yang sangat dramatis karena ia luar biasa radioaktif, sampai-sampai energinya yang masif membuat Aktinium bisa bersinar sendiri memancarkan pendaran cahaya biru yang misterius dan cantik di dalam kegelapan. Di kehidupan sehari-hari, Aktinium adalah pahlawan super di dunia kedokteran modern karena radiasi neutronnya yang sangat kuat dimanfaatkan di rumah sakit sebagai peluru kendali dalam terapi alfa molekuler untuk memburu dan menghancurkan sel-sel kanker berbahaya dari dalam tubuh.",
  },
  {
    number: 90,
    category: "aktinida",
    symbol: "Th",
    name: "Torium",
    description:
      "Yuk, kenalan dengan Torium, si nomor atom sembilan puluh yang berwajah keperakan dari golongan aktinida. Unsur perkasa yang namanya diambil dari nama dewa petir Thor ini punya keunikan yang luar biasa karena ia jauh lebih melimpah daripada uranium di alam, serta menyimpan potensi energi yang sangat padat sampai-sampai sebongkah kecil Torium bisa menghasilkan listrik untuk kehidupanmu seumur hidup. Di kehidupan nyata, Torium adalah pahlawan energi masa depan karena sedang dikembangkan sebagai bahan bakar reaktor nuklir baru yang jauh lebih aman, bersih, dan bebas dari risiko ledakan berbahaya.",
  },
  {
    number: 91,
    category: "aktinida",
    symbol: "Pa",
    name: "Protaktinium",
    description:
      "Ini dia Protaktinium, si nomor atom sembilan puluh satu yang langka dan misterius dari golongan aktinida. Unsur logam berwarna perak berkilau ini punya keunikan yang sangat luar biasa karena ia sangat sulit ditemukan di alam, saking langkanya kita harus menyaring berton-ton bijih uranium hanya untuk mendapatkan beberapa gram logam murni ini yang sangat radioaktif. Di kehidupan nyata, Protaktinium adalah instrumen berharga bagi para ilmuwan karena sifat peluruhan radionya yang sangat teratur digunakan sebagai jam geologis alami yang andal untuk menghitung usia sedimen laut purba dan memahami sejarah iklim bumi kita.",
  },
  {
    number: 92,
    category: "aktinida",
    symbol: "U",
    name: "Uranium",
    description:
      "Sapa dulu Uranium, si nomor atom sembilan puluh dua yang menjadi raksasa berbobot berat di golongan aktinida. Unsur logam keperakan ini punya keunikan yang sangat legendaris karena ia adalah unsur alami terberat di bumi yang menyimpan kepadatan energi luar biasa, sampai-sampai sebongkah kecil Uranium bisa menghasilkan energi setara dengan berton-ton batu bara. Di kehidupan sehari-hari, Uranium adalah pahlawan pasokan listrik dunia karena energinya dilepaskan di dalam reaktor nuklir untuk menerangi jutaan rumah, sekaligus menjadi instrumen penting bagi kapal selam penjaga samudra agar bisa berlayar bertahun-tahun tanpa perlu mengisi bahan bakar.",
  },
  {
    number: 93,
    category: "aktinida",
    symbol: "Np",
    name: "Neptunium",
    description:
      "Yuk, kenalan dengan Neptunium, si nomor atom sembilan puluh tiga yang menjadi elemen buatan manusia pertama di golongan aktinida. Unsur logam keperakan yang namanya terinspirasi dari planet Neptunus ini punya keunikan yang sangat menarik, karena ia tidak bisa ditemukan begitu saja di alam melainkan harus dilahirkan melalui proses penembakan atom di dalam reaktor nuklir. Di kehidupan nyata, Neptunium adalah pahlawan teknologi presisi karena sifat radioaktifnya yang sangat peka dimanfaatkan sebagai komponen utama dalam alat deteksi neutron dosis tinggi, sekaligus menjadi bahan baku penting untuk membuat elemen pemanas pada pesawat luar angkasa.",
  },
  {
    number: 94,
    category: "aktinida",
    symbol: "Pu",
    name: "Plutonium",
    description:
      "Ini dia Plutonium, si nomor atom sembilan puluh empat yang menjadi sosok penuh tenaga di golongan aktinida. Unsur logam keperakan yang namanya diambil dari planet kerdil Pluto ini punya keunikan yang sangat mencengangkan karena ia terasa hangat saat disentuh akibat radiasi alaminya yang memancarkan panas secara konstan. Di kehidupan nyata, Plutonium adalah pahlawan penjelajah jagat raya karena energi panasnya yang sangat stabil diubah menjadi listrik berkekuatan tinggi untuk menghidupkan robot penjelajah di Mars dan pesawat luar angkasa Voyager yang terbang menjelajahi ruang antarbintang yang sangat dingin.",
  },
  {
    number: 95,
    category: "aktinida",
    symbol: "Am",
    name: "Amerisium",
    description:
      "Sapa dulu Amerisium, si nomor atom sembilan puluh lima yang tangguh dari golongan aktinida. Unsur buatan manusia yang berwarna perak berkilau ini punya keunikan yang sangat hebat, karena ia bisa memancarkan radiasi partikel alfa secara konstan selama ratusan tahun tanpa melemah secara drastis. Di kehidupan nyata, Amerisium adalah pahlawan sunyi yang menjaga rumah kita setiap hari; secuil kecil unsurnya dipasang di dalam alat detektor asap langit-langit rumah untuk memantau udara, mendeteksi partikel asap kebakaran sekecil apa pun, dan langsung membunyikan alarm demi menyelamatkan nyawa kita dari bahaya api.",
  },
  {
    number: 96,
    category: "aktinida",
    symbol: "Cm",
    name: "Kurium",
    description:
      "Yuk, kenalan dengan Kurium, si nomor atom sembilan puluh enam yang berkilau perak dari golongan aktinida. Unsur buatan yang namanya diambil dari penemu radioaktif Marie dan Pierre Curie ini punya keunikan yang sangat membara, karena ia luar biasa radioaktif hingga sanggup menghasilkan panas yang sangat tinggi dan memancarkan pendaran cahaya ungu yang cantik di dalam kegelapan. Di kehidupan nyata, Kurium adalah pahlawan penjelajah antariksa karena energi panasnya yang dahsyat dimanfaatkan sebagai bahan bakar generator pembangkit listrik untuk menghidupkan instrumen canggih pada robot penjelajah Mars dan misi ruang angkasa jauh.",
  },
  {
    number: 97,
    category: "aktinida",
    symbol: "Bk",
    name: "Berkelium",
    description:
      "Ini dia Berkelium, si nomor atom sembilan puluh tujuh yang menjadi anggota barisan belakang di golongan aktinida. Unsur logam keperakan yang lahir di University of California, Berkeley ini punya keunikan yang sangat langka karena ia tidak ada di alam dan butuh waktu bertahun-tahun bagi para ilmuwan hanya untuk memproduksi beberapa miligram saja melalui reaktor nuklir khusus. Di kehidupan nyata, Berkelium adalah pahlawan penemu dunia baru karena sifat radioaktifnya yang sangat kuat dimanfaatkan sebagai bahan target utama laboratorium untuk menembakkan atom demi menciptakan unsur-unsur super berat baru yang belum pernah ada sebelumnya di alam semesta.",
  },
  {
    number: 98,
    category: "aktinida",
    symbol: "Cf",
    name: "Kalifornium",
    description:
      "Sapa dulu Kalifornium, si nomor atom sembilan puluh delapan yang menjadi salah satu bintang paling mahal di golongan aktinida. Unsur buatan yang sangat langka ini punya keunikan yang luar biasa mencengangkan karena ia merupakan salah satu magnet pemancar neutron terkuat di bumi, di mana setiap satu mikrogram unsurnya sanggup melepaskan jutaan neutron per detik. Di kehidupan sehari-hari, Kalifornium adalah pahlawan penyelamat industri dan medis karena radiasi neutronnya yang sangat kuat dimanfaatkan sebagai pemindai canggih untuk mendeteksi retakan tersembunyi pada badan pesawat terbang, mendeteksi kadar air minyak bumi, hingga menjadi senjata andalan dalam terapi pengobatan kanker rahim.",
  },
  {
    number: 99,
    category: "aktinida",
    symbol: "Es",
    name: "Einsteinium",
    description:
      "Yuk, kenalan dengan Einsteinium, si nomor atom sembilan puluh sembilan yang namanya diambil dari fisikawan genius Albert Einstein di golongan aktinida. Unsur buatan yang legendaris ini punya keunikan sejarah yang luar biasa karena ia pertama kali ditemukan secara tidak sengaja di dalam puing-puing sisa ledakan bom hidrogen pertama di dunia pada tahun 1952. Di kehidupan nyata, jangan harap bisa menemuinya di toko kelontong, karena Einsteinium diproduksi khusus dalam jumlah super sedikit di laboratorium canggih sebagai tracer radioaktif yang sangat andal untuk membantu para ilmuwan meneliti misteri reaksi nuklir dan menciptakan unsur-unsur baru.",
  },
  {
    number: 100,
    category: "aktinida",
    symbol: "Fm",
    name: "Fermium",
    description:
      "Ini dia Fermium, unsur dengan nomor atom seratus pas yang menjadi penutup abad di golongan aktinida. Unsur buatan ini punya keunikan sejarah yang sangat dramatis karena ia pertama kali ditemukan tersembunyi di antara debu radioaktif sisa ledakan bom hidrogen pertama di Samudra Pasifik. Di kehidupan nyata, karena sifatnya yang sangat tidak stabil dan hanya bisa dibuat dalam jumlah yang luar biasa sedikit, Fermium menjadi aset berharga di laboratorium canggih sebagai kunci rahasia bagi para ilmuwan untuk mempelajari perilaku material super berat dan menguak misteri reaksi nuklir tingkat lanjut.",
  },
  {
    number: 101,
    category: "aktinida",
    symbol: "Md",
    name: "Mendelevium",
    description:
      "Sapa dulu Mendelevium, si nomor atom seratus satu yang namanya diambil dari bapak tabel periodik, Dmitri Mendeleev, di golongan aktinida. Unsur buatan ini punya keunikan yang sangat legendaris karena saat pertama kali diciptakan pada tahun 1955, para ilmuwan hanya berhasil membuat tepat satu atom saja dalam sekali percobaan laboratorium yang sangat rumit. Di kehidupan nyata, karena sifatnya yang super langka dan cepat sirna, Mendelevium menjadi instrumen penelitian yang sangat berharga di laboratorium nuklir dunia untuk membantu para ahli kimia memahami karakteristik rahasia dari unsur-unsur super berat di ujung tabel periodik.",
  },
  {
    number: 102,
    category: "aktinida",
    symbol: "No",
    name: "Nobelium",
    description:
      "Yuk, kenalan dengan Nobelium, si nomor atom seratus dua yang namanya diambil dari penemu dinamit, Alfred Nobel, di golongan aktinida. Unsur buatan yang misterius ini punya keunikan yang sangat ekstrem karena ia seperti hantu lab; ia tidak bisa ditemukan di alam dan hanya bisa bertahan hidup selama beberapa menit sebelum akhirnya meluruh dan lenyap tak berbekas. Di kehidupan nyata, karena jumlahnya yang selalu super sedikit, Nobelium menjadi primadona di laboratorium fisika canggih sebagai kunci penting bagi para ilmuwan untuk mempelajari perilaku kimiawi ekstrem dan menyingkap rahasia pembentukan inti atom super berat.",
  },
  {
    number: 103,
    category: "aktinida",
    symbol: "Lr",
    name: "Lawrensium",
    description:
      "Ini dia Lawrensium, si nomor atom seratus tiga yang menjadi anggota penutup yang gagah di golongan aktinida. Unsur buatan yang namanya diambil dari penemu siklotron, Ernest Lawrence, ini punya keunikan yang sangat menakjubkan karena ia merupakan unsur terakhir di golongannya yang berhasil diciptakan manusia, serta memiliki sifat hibrida unik yang perilakunya mirip seperti logam berat transisi. Di kehidupan nyata, karena sifatnya yang super tidak stabil dan cepat meluruh, Lawrensium menjadi aset berharga di laboratorium nuklir dunia sebagai sarana bagi para ilmuwan untuk menguji teori-teori fisika kuantum tingkat lanjut.",
  },
  {
    number: 104,
    category: "logam_transisi",
    symbol: "Rf",
    name: "Ruterfordium",
    description:
      "Sapa dulu Ruterfordium, si nomor atom seratus empat yang menjadi pelopor pembuka di golongan logam transisi super berat. Unsur buatan yang namanya diambil dari bapak fisika nuklir, Ernest Rutherford, ini punya keunikan yang sangat ekstrem karena ia adalah zat yang luar biasa tidak stabil, saking rapuhnya ia akan langsung meluruh dan lenyap hanya dalam hitungan detik setelah diciptakan di laboratorium. Di kehidupan nyata, karena jumlahnya yang selalu super sedikit dan cepat sirna, Ruterfordium menjadi primadona khusus bagi para ilmuwan di laboratorium canggih sebagai kunci penting untuk menguji batas-batas teori kimia modern.",
  },
  {
    number: 105,
    category: "logam_transisi",
    symbol: "Db",
    name: "Dubnium",
    description:
      "Yuk, kenalan dengan Dubnium, si nomor atom seratus lima yang misterius dari golongan logam transisi super berat. Unsur buatan yang namanya diambil dari kota penelitian Dubna di Rusia ini punya keunikan yang bikin geleng-geleng kepala, karena ia adalah elemen singgah yang sangat tidak stabil dan akan langsung hancur meluruh hanya dalam hitungan jam atau bahkan detik setelah dilahirkan. Di kehidupan nyata, karena jumlahnya yang selalu sangat sedikit dan cepat hilang, Dubnium menjadi aset berharga di laboratorium dunia untuk membantu para ilmuwan menguji batas teori fisika kuantum serta memetakan rahasia ujung tabel periodik kita.",
  },
  {
    number: 106,
    category: "logam_transisi",
    symbol: "Sg",
    name: "Seaborgium",
    description:
      "Ini dia Seaborgium, si nomor atom seratus enam yang tangguh dari golongan logam transisi super berat. Unsur buatan yang namanya diambil dari ahli kimia legendaris Glenn Seaborg ini punya keunikan yang sangat luar biasa karena ia adalah unsur pertama yang dinamai dari nama orang yang masih hidup saat itu. Di kehidupan nyata, karena Seaborgium sangat tidak stabil dan meluruh dalam hitungan detik, ia menjadi pahlawan riset di laboratorium canggih untuk membantu para ilmuwan menguji batas-batasan teori kimia modern serta memecahkan misteri bagaimana inti atom raksasa bisa bertahan hidup.",
  },
  {
    number: 107,
    category: "logam_transisi",
    symbol: "Bh",
    name: "Bohrium",
    description:
      "Sapa dulu Bohrium, si nomor atom seratus tujuh yang misterius dari golongan logam transisi super berat. Unsur buatan yang namanya diambil dari fisikawan terkenal Niels Bohr ini punya keunikan yang sangat ekstrem karena ia adalah elemen hantu yang luar biasa tidak stabil, saking rapuhnya ia akan langsung meluruh dan lenyap hanya dalam hitungan detik setelah diciptakan. Di kehidupan nyata, karena jumlahnya yang selalu super sedikit dan cepat sirna, Bohrium menjadi primadona di laboratorium canggih sebagai kunci penting bagi para ilmuwan untuk menguji batas-batas teori kimia serta memahami perilaku atom raksasa.",
  },
  {
    number: 108,
    category: "logam_transisi",
    symbol: "Hs",
    name: "Hasium",
    description:
      "Yuk, kenalan dengan Hasium, si nomor atom seratus delapan yang berada di ujung golongan logam transisi super berat. Unsur buatan yang namanya diambil dari negara bagian Hessen di Jerman ini punya keunikan yang sangat ajaib, karena meskipun ia termasuk elemen raksasa yang sangat tidak stabil, para ilmuwan berhasil membuktikan bahwa sifat kimiawinya tetap bertingkah laku mirip seperti unsur osmium yang jauh lebih ringan. Di kehidupan nyata, karena Hasium akan langsung meluruh dalam hitungan detik, ia menjadi pahlawan riset di laboratorium canggih untuk menguji model inti atom dan memetakan batasan tabel periodik kita.",
  },
  {
    number: 109,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Mt",
    name: "Meitnerium",
    description:
      "Ini dia Meitnerium, si nomor atom seratus sembilan yang menempati barisan logam transisi super berat. Unsur buatan yang sangat spesial ini punya keunikan sejarah yang luar biasa karena ia adalah satu-satunya unsur kimia yang dinamai murni untuk menghormati seorang ilmuwan perempuan, yaitu fisikawan genius Lise Meitner. Di kehidupan nyata, karena Meitnerium adalah elemen yang luar biasa tidak stabil dan akan langsung hancur meluruh dalam hitungan milidetik, ia menjadi pahlawan riset di laboratorium tercanggih dunia untuk membantu para ahli fisika menguji batas-batas teori kuantum dan memecahkan misteri pembentukan inti atom.",
  },
  {
    number: 110,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Ds",
    name: "Darmstadtium",
    description:
      "Sapa dulu Darmstadtium, si nomor atom seratus sepuluh yang misterius dari golongan logam transisi super berat. Unsur buatan yang namanya diambil dari kota Darmstadt di Jerman ini punya keunikan yang sangat ekstrem, karena ia adalah elemen super rapuh yang akan langsung meluruh dan lenyap hanya dalam hitungan sepeser sekian detik setelah berhasil diciptakan. Di kehidupan sehari-hari, jangan harap bisa menemuinya di dapur atau pasar, karena Darmstadtium murni menjadi pahlawan riset di laboratorium tercanggih dunia untuk membantu para ilmuwan menguji batas kekuatan inti atom dan memetakan misteri tabel periodik kita.",
  },
  {
    number: 111,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Rg",
    name: "Roentgenium",
    description:
      "Yuk, kenalan dengan Roentgenium, si nomor atom seratus sebelas yang berada di deretan golongan logam transisi super berat. Unsur buatan yang namanya diambil dari penemu sinar-X, Wilhelm Röntgen, ini punya keunikan yang sangat ajaib karena meskipun ia adalah saudara jauh dari emas dan perak, wujud aslinya justru belum pernah terlihat karena ia akan langsung meluruh hancur dalam hitungan sekilas kedipan mata. Di kehidupan nyata, karena sifatnya yang super tidak stabil dan hanya bisa dibuat beberapa atom saja, Roentgenium murni digunakan sebagai pahlawan riset di laboratorium tercanggih untuk menguak batas rahasia fisika nuklir.",
  },
  {
    number: 112,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Cn",
    name: "Kopernisium",
    description:
      "Ini dia Kopernisium, si nomor atom seratus dua belas yang berada di ujung golongan logam transisi super berat. Unsur buatan yang namanya diambil dari astronom terkenal Nicolaus Copernicus ini punya keunikan yang sangat mencengangkan; meskipun ia merupakan logam berat, para ilmuwan memperkirakan wujud aslinya adalah gas yang sangat mudah menguap pada suhu ruangan biasa. Di kehidupan nyata, karena sifatnya yang luar biasa tidak stabil dan langsung meluruh dalam hitungan detik, Kopernisium menjadi pahlawan riset di laboratorium nuklir tercanggih untuk membantu para ilmuwan menguji batas-batas teori kimia serta memecahkan misteri struktur atom raksasa.",
  },
  {
    number: 113,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Nh",
    name: "Nihonium",
    description:
      "Sapa dulu Nihonium, si nomor atom seratus tiga belas yang menjadi kebanggaan Asia di golongan logam pasca-transisi super berat. Unsur buatan ini punya keunikan sejarah yang sangat luar biasa karena ia adalah unsur kimia pertama dalam sejarah yang ditemukan dan dinamai oleh para ilmuwan dari benua Asia, tepatnya dari negara Jepang. Di kehidupan sehari-hari, karena Nihonium adalah elemen buatan yang sangat tidak stabil dan akan langsung hancur meluruh dalam hitungan sekejap mata, ia murni menjadi pahlawan riset di laboratorium canggih untuk membantu para ilmuwan dunia menguji batas-batas teori fisika nuklir tingkat lanjut.",
  },
  {
    number: 114,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Fl",
    name: "Flerovium",
    description:
      "Yuk, kenalan dengan Flerovium, si nomor atom seratus empat belas yang menempati barisan golongan karbon super berat. Unsur buatan yang lahir di Rusia ini punya keunikan yang sangat kontradiktif; meskipun ia berada di golongan logam seperti timbal, para ilmuwan memperkirakan Flerovium justru bertingkah laku gas mulia yang sangat malas bereaksi dan mudah menguap. Di kehidupan nyata, karena sifatnya yang super tidak stabil dan langsung meluruh dalam hitungan detik, Flerovium murni menjadi pahlawan riset di laboratorium nuklir tercanggih untuk membantu para ilmuwan menguji teori pulau kestabilan dalam dunia fisika atom.",
  },
  {
    number: 115,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Mc",
    name: "Moskovium",
    description:
      "Ini dia Moskovium, si nomor atom seratus lima belas yang menempati barisan golongan pniktogen super berat. Unsur buatan yang namanya diambil dari wilayah Moskow di Rusia ini punya keunikan yang sangat legendaris di dunia fiksi ilmiah, karena sebelum resmi ditemukan, namanya sempat viral diklaim oleh para penggemar konspirasi sebagai bahan bakar rahasia pesawat UFO. Di kehidupan nyata, karena sifatnya yang luar biasa tidak stabil dan meluruh dalam hitungan milidetik, Moskovium menjadi aset berharga di laboratorium tercanggih untuk membantu para ilmuwan memahami rahasia interaksi inti atom raksasa.",
  },
  {
    number: 116,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Lv",
    name: "Livermorium",
    description:
      "Sapa dulu Livermorium, si nomor atom seratus enam belas yang menempati barisan golongan kalkogen super berat di ujung tabel periodik. Unsur buatan hasil kolaborasi ilmuwan Rusia dan Amerika ini punya keunikan yang sangat mencengangkan karena ia merupakan elemen kelas berat yang super rapuh, saking tidak stabilnya ia akan langsung meluruh hancur hanya dalam hitungan milidetik setelah berhasil diciptakan. Di kehidupan nyata, karena jumlahnya yang selalu sangat sedikit dan cepat sirna, Livermorium murni menjadi pahlawan riset di laboratorium nuklir tercanggih sebagai kunci penting bagi para ilmuwan untuk memetakan batasan materi di alam semesta.",
  },
  {
    number: 117,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Ts",
    name: "Tenesin",
    description:
      "Yuk, kenalan dengan Tenesin, si nomor atom seratus tujuh belas yang menempati barisan golongan halogen di ujung tabel periodik. Unsur buatan yang namanya diambil dari negara bagian Tennessee di Amerika ini punya keunikan yang sangat luar biasa karena ia adalah elemen kedua paling berat yang pernah diciptakan manusia, serta menjadi penutup barisan golongannya yang super langka. Di kehidupan nyata, karena Tenesin sangat tidak stabil dan meluruh dalam hitungan milidetik, ia murni menjadi pahlawan riset di laboratorium nuklir tercanggih untuk membantu para ilmuwan menguji batas-batas teori fisika atom modern.",
  },
  {
    number: 118,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Og",
    name: "Oganeson",
    description:
      "Sapa dulu Oganeson, si nomor atom seratus delapan belas yang memegang takhta sebagai unsur paling berat sekaligus penutup barisan golongan gas mulia di tabel periodik. Unsur buatan super raksasa ini punya keunikan yang sangat ekstrem; meskipun bertetangga dengan gas-gas malas seperti helium, para ilmuwan memperkirakan wujud aslinya justru berupa padatan yang sangat mudah menguap pada suhu ruangan. Di kehidupan nyata, karena Oganeson langsung hancur meluruh dalam hitungan milidetik, ia murni menjadi pahlawan riset di laboratorium nuklir tercanggih untuk membantu para ilmuwan menguji batas akhir kemampuan manusia dalam menciptakan materi.",
  },
  {
    number: 119,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Uue",
    name: "Ununennium",
    description:
      "Kenalan yuk sama Ununennium, calon penghuni nomor atom seratus sembilan belas yang bakal jadi pembuka barisan golongan logam alkali di periode ke-delapan. Unsur hipotetis ini punya keunikan yang luar biasa menarik, karena meskipun sampai saat ini wujudnya belum berhasil diciptakan sama sekali oleh manusia di laboratorium, ia diprediksi bakal menjadi salah satu elemen paling reaktif yang pernah ada. Di kehidupan nyata, kegunaan utamanya saat ini murni sebagai piala sakral dalam dunia riset, di mana para ilmuwan dunia terus berlomba-lomba menembakkan atom demi mendobrak batas baru dalam memperluas peta tabel periodik kita.",
  },
];

const categoryColors = {
  aktinida: {
    light: "#e57373",
    dark: "#b71c1c",
    gradient: {
      light: ["#ffcdd2", "#ef9a9a", "#e57373", "#ef5350"],
      dark: ["#b71c1c", "#c62828", "#d32f2f", "#e53935"],
    },
    modalBorder: {
      light: "#f44336",
      dark: "#f44336",
    },
  },
  gas_mulia: {
    light: "#f06292",
    dark: "#880e4f",
    gradient: {
      light: ["#f8bbd0", "#f48fb1", "#f06292", "#ec407a"],
      dark: ["#880e4f", "#ad1457", "#c2185b", "#d81b60"],
    },
    modalBorder: {
      light: "#e91e63",
      dark: "#e91e63",
    },
  },
  lantanida: {
    light: "#ba68c8",
    dark: "#4a148c",
    gradient: {
      light: ["#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc"],
      dark: ["#4a148c", "#6a1b9a", "#7b1fa2", "#8e24aa"],
    },
    modalBorder: {
      light: "#9c27b0",
      dark: "#9c27b0",
    },
  },
  logam_alkali: {
    light: "#9575cd",
    dark: "#311b92",
    gradient: {
      light: ["#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2"],
      dark: ["#311b92", "#4527a0", "#512da8", "#5e35b1"],
    },
    modalBorder: {
      light: "#673ab7",
      dark: "#673ab7",
    },
  },
  logam_alkali_tanah: {
    light: "#7986cb",
    dark: "#283593",
    gradient: {
      light: ["#c5cae9", "#9fa8da", "#7986cb", "#5c6bc0"],
      dark: ["#1a237e", "#283593", "#303f9f", "#3949ab"],
    },
    modalBorder: {
      light: "#3f51b5",
      dark: "#3f51b5",
    },
  },
  logam_pascatransisi: {
    light: "#64b5f6",
    dark: "#0d47a1",
    gradient: {
      light: ["#bbdefb", "#90caf9", "#64b5f6", "#42a5f5"],
      dark: ["#0d47a1", "#1565c0", "#1976d2", "#1e88e5"],
    },
    modalBorder: {
      light: "#2196f3",
      dark: "#2196f3",
    },
  },
  logam_transisi: {
    light: "#4dd0e1",
    dark: "#006064",
    gradient: {
      light: ["#b2ebf2", "#80deea", "#4dd0e1", "#26c6da"],
      dark: ["#006064", "#00838f", "#0097a7", "#00acc1"],
    },
    modalBorder: {
      light: "#00bcd4",
      dark: "#00bcd4",
    },
  },
  metaloid: {
    light: "#81c784",
    dark: "#1b5e20",
    gradient: {
      light: ["#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a"],
      dark: ["#1b5e20", "#2e7d32", "#388e3c", "#43a047"],
    },
    modalBorder: {
      light: "#4caf50",
      dark: "#4caf50",
    },
  },
  nonlogam_reaktif: {
    light: "#fff176",
    dark: "#f57f17",
    gradient: {
      light: ["#fff9c4", "#fff59d", "#fff176", "#ffee58"],
      dark: ["#f57f17", "#f9a825", "#fbc02d", "#fdd835"],
    },
    modalBorder: {
      light: "#ffee58",
      dark: "#ffee58",
    },
  },
  sifat_kimia_tidak_diketahui: {
    light: "#ffb74d",
    dark: "#e65100",
    gradient: {
      light: ["#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726"],
      dark: ["#e65100", "#ef6c00", "#f57c00", "#fb8c00"],
    },
    modalBorder: {
      light: "#ff9800",
      dark: "#ff9800",
    },
  },
};

const getThemeMode = () => {
  return document.body.classList.contains("darkmode") ? "dark" : "light";
};

const getCategoryColor = (category) => {
  const color = categoryColors[category];
  const mode = getThemeMode();

  return color ? color[mode] : "var(--base-color)";
};

const getCategoryBackground = (category) => {
  const color = categoryColors[category];
  const mode = getThemeMode();
  const gradientColors = color?.gradient?.[mode] || [];
  const hasFourColors = gradientColors.every((color) => color.trim() !== "");

  if (!hasFourColors) return getCategoryColor(category);

  return `linear-gradient(135deg, ${gradientColors.join(", ")})`;
};

const getModalBorderColor = (category) => {
  const mode = getThemeMode();

  return (
    categoryColors[category]?.modalBorder?.[mode] || getCategoryColor(category)
  );
};

const openModal = (data) => {
  if (document.getElementById("dynamic-modal")) return;

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.id = "dynamic-modal";

  modalOverlay.innerHTML = `
  <div class="modal-card" data-category="${data.category}">
  <button class="close-btn" id="close-modal" aria-label="Tutup Modal">
  <img src="images/close.svg" alt="Tutup Modal" />
  </button>
  <span class="atomic-number">#${data.number}</span>
  <h2 class="symbol">${data.symbol}</h2>
  <h3 class="name">${data.name}</h3>
  <p class="description">${data.description}</p>
  </div>
  `;

  document.body.appendChild(modalOverlay);
  const modalCard = modalOverlay.querySelector(".modal-card");
  modalCard.style.background = getCategoryBackground(data.category);
  modalCard.style.borderColor = getModalBorderColor(data.category);
  modalCard.style.color = "var(--text-color)";

  void modalOverlay.offsetWidth;

  modalOverlay.classList.add("active");
  document.body.classList.add("modal-open");

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
      modalOverlay.remove();
    }, 300);
  };

  document.getElementById("close-modal").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  const escHandler = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", escHandler);
    }
  };

  document.addEventListener("keydown", escHandler);
};

const observerOptions = {
  root: null,
  rootMargin: "50px 0px -50px 0px",
  threshold: 0.1,
};

let delaycounter = 0;
let delaytimer = null;

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("in-view");
      }, delaycounter * 60);

      delaycounter++;

      clearTimeout(delaytimer);
      delaytimer = setTimeout(() => {
        delaycounter = 0;
      }, 150);

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const categoryLabels = {
  semua: "Semua",
  aktinida: "Aktinida",
  gas_mulia: "Gas Mulia",
  lantanida: "Lantanida",
  logam_alkali: "Logam Alkali",
  logam_alkali_tanah: "Logam Alkali Tanah",
  logam_pascatransisi: "Logam Pascatransisi",
  logam_transisi: "Logam Transisi",
  metaloid: "Metaloid",
  nonlogam_reaktif: "Non-logam Reaktif",
  sifat_kimia_tidak_diketahui: "Sifat Kimia Tidak Diketahui",
};

const renderElements = (elements = elementData) => {
  activeElements = elements;
  elementContainer.innerHTML = "";

  elements.forEach((element) => {
    const card = document.createElement("article");
    card.className = "element-card";
    card.dataset.category = element.category;
    card.tabIndex = 0;
    card.style.background = getCategoryBackground(element.category);
    card.style.borderColor = getCategoryColor(element.category);
    card.style.color = "var(--text-color)";
    card.innerHTML = `
      <span class="atomic-number">#${element.number}</span>
      <h2 class="symbol">${element.symbol}</h2>
      <h3 class="name">${element.name}</h3>
      <p class="category">${categoryLabels[element.category] || element.category}</p>
    `;

    card.addEventListener("click", () => openModal(element));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(element);
      }
    });

    elementContainer.appendChild(card);
    observer.observe(card);
  });
};

renderElements();
