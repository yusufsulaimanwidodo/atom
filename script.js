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
      "Hidrogen (\\(H_{2}\\)) adalah unsur kimia teringan dan paling melimpah di alam semesta. Di Bumi, unsur ini banyak terikat dalam senyawa seperti air (\\(H_{2}O\\)). Sebagai gas yang tidak berwarna, tidak berbau, dan tidak beracun, hidrogen kini menjadi pilar utama transisi energi bersih.",
  },
  {
    number: 2,
    category: "gas_mulia",
    symbol: "He",
    name: "Helium",
    description:
      "Helium adalah unsur kimia dengan lambang He dan nomor atom 2. Gas mulia ini tidak berwarna, tidak berbau, dan tidak beracun. Karena lebih ringan dari udara dan tidak mudah terbakar, helium sering digunakan untuk mengisi balon hias dan balon udara.",
  },
  {
    number: 3,
    category: "logam_alkali",
    symbol: "Li",
    name: "Litium",
    description:
      'Litium (simbol: Li) adalah unsur kimia logam alkali yang paling ringan dan sangat reaktif. Dikenal sebagai "emas putih," komoditas ini memiliki harga pasar global yang sangat dinamis dan menjadi fondasi utama dalam teknologi masa kini, khususnya kendaraan listrik (EV).',
  },
  {
    number: 4,
    category: "logam_alkali_tanah",
    symbol: "Be",
    name: "Berilium",
    description:
      "Berilium (simbol: Be, nomor atom: 4) adalah logam alkali tanah berwarna abu-abu yang sangat ringan, keras, dan tahan panas. Unsur ini banyak dimanfaatkan dalam industri dirgantara (aerospace), nuklir, dan elektronik.",
  },
  {
    number: 5,
    category: "metaloid",
    symbol: "B",
    name: "Boron",
    description:
      "Boron (simbol kimia: B, nomor atom 5) adalah unsur metaloid yang sangat penting. Di alam, mineral ini tidak ditemukan dalam bentuk murni, melainkan terikat dengan unsur lain (seperti boraks). Boron memainkan peran krusial bagi kehidupan, mulai dari nutrisi esensial untuk kesuburan tanaman hingga mikronutrien yang dibutuhkan oleh tubuh manusia.",
  },
  {
    number: 6,
    category: "nonlogam_reaktif",
    symbol: "C",
    name: "Karbon",
    description:
      "Karbon (simbol: C, nomor atom: 6) adalah unsur kimia nonlogam yang menjadi tulang punggung seluruh kehidupan di Bumi. Unsur ini unik karena kemampuannya membentuk rantai dengan atom lain, menghasilkan jutaan senyawa organik dan anorganik yang sangat penting.",
  },
  {
    number: 7,
    category: "nonlogam_reaktif",
    symbol: "N",
    name: "Nitrogen",
    description:
      "Nitrogen (simbol \\(N\\), nomor atom \\(7\\)) adalah unsur kimia berupa gas tidak berwarna, tidak berbau, dan tidak berasa yang membentuk sekitar \\(78\\%\\) dari atmosfer bumi. Karena sifatnya yang inert (tidak mudah bereaksi), gas ini sangat serbaguna dan digunakan luas dalam berbagai bidang.",
  },
  {
    number: 8,
    category: "nonlogam_reaktif",
    symbol: "O",
    name: "Oksigen",
    description:
      "Oksigen (\\(O_{2}\\)) adalah unsur kimia dan gas vital yang menyusun sekitar \\(21\\%\\) atmosfer Bumi. Fungsinya sangat penting sebagai bahan bakar utama untuk metabolisme sel tubuh manusia dan digunakan dalam berbagai proses biologis serta sektor industri.",
  },
  {
    number: 9,
    category: "nonlogam_reaktif",
    symbol: "F",
    name: "Fluorin",
    description:
      "Fluorin (lambang F) adalah unsur kimia golongan halogen dengan nomor atom 9. Sebagai unsur paling elektronegatif, ia berupa gas kuning pucat yang sangat reaktif dan beracun. Dalam kehidupan sehari-hari, Anda tidak menggunakan fluorin murni, melainkan fluorida (bentuk ionnya) yang aman dan bermanfaat.",
  },
  {
    number: 10,
    category: "gas_mulia",
    symbol: "Ne",
    name: "Neon",
    description:
      "Neon adalah unsur kimia dengan lambang Ne dan nomor atom 10. Neon termasuk dalam golongan gas mulia. Neon adalah gas monoatomik lengai yang nirwarna dan nirbau pada kondisi standar, dengan massa jenis sekitar dua pertiga udara.",
  },
  {
    number: 11,
    category: "logam_alkali",
    symbol: "Na",
    name: "Natrium",
    description:
      "Natrium (atau sodium) adalah unsur kimia dengan lambang Na dan nomor atom 11. Sebagai mineral dan elektrolit esensial, natrium sangat penting untuk menjaga keseimbangan cairan tubuh, transmisi saraf, dan kontraksi otot.",
  },
  {
    number: 12,
    category: "logam_alkali_tanah",
    symbol: "Mg",
    name: "Magnesium",
    description:
      "Magnesium adalah mineral penting yang mendukung ratusan fungsi tubuh, termasuk fungsi otot, saraf, jantung, dan pembentukan energi. Pria dewasa membutuhkan 400–420 mg per hari, sedangkan wanita dewasa membutuhkan 310–320 mg. Kekurangan mineral ini dapat memicu kram otot, kelelahan, dan gangguan tidur.",
  },
  {
    number: 13,
    category: "logam_pascatransisi",
    symbol: "Al",
    name: "Aluminium",
    description:
      "Aluminium adalah logam putih perak yang ringan dan tahan korosi. Merupakan unsur paling melimpah di kerak bumi, logam ini memiliki nomor atom 13 dengan simbol \\(Al\\). Aluminium sangat penting dalam industri konstruksi, peralatan rumah tangga, dan elektronik karena sifatnya yang kuat, mudah dibentuk, serta merupakan penghantar listrik dan panas yang baik.",
  },
  {
    number: 14,
    category: "metaloid",
    symbol: "Si",
    name: "Silikon",
    description:
      "Silikon, yang juga disebut zat pasir, adalah unsur kimia dengan lambang Si dan nomor atom 14. Senyawa yang dibentuk bersifat paramagnetik. Unsur kimia ini ditemukan oleh Jöns Jakob Berzelius. Silikon merupakan unsur metaloid tetravalen, bersifat lebih tidak reaktif daripada karbon",
  },
  {
    number: 15,
    category: "nonlogam_reaktif",
    symbol: "P",
    name: "Fosforus",
    description:
      "Fosforus (atau fosfor) adalah mineral penting dan unsur kimia dengan simbol P dan nomor atom 15. Zat ini sangat krusial bagi tubuh manusia, di mana sekitar 85% fosfor di dalam tubuh ditemukan pada tulang dan gigi untuk menjaga kekuatan dan kepadatannya.",
  },
  {
    number: 16,
    category: "nonlogam_reaktif",
    symbol: "S",
    name: "Belerang",
    description:
      "Belerang, yang juga disebut sulfur, adalah unsur kimia dengan lambang S dan nomor atom 16. Belerang merupakan unsur nonlogam yang melimpah dan multivalen. Dalam kondisi normal, atom belerang membentuk molekul oktatomik siklik dengan rumus kimia S₈.",
  },
  {
    number: 17,
    category: "nonlogam_reaktif",
    symbol: "Cl",
    name: "Klorin",
    description:
      "Hidrogen (\\(H_{2}\\)) adalah unsur kimia teringan dan paling melimpah di alam semesta. Di Bumi, unsur ini banyak terikat dalam senyawa seperti air (\\(H_{2}O\\)). Sebagai gas yang tidak berwarna, tidak berbau, dan tidak beracun, hidrogen kini menjadi pilar utama transisi energi bersih.",
  },
  {
    number: 18,
    category: "gas_mulia",
    symbol: "Ar",
    name: "Argon",
    description:
      "Argon adalah gas mulia (unsur kimia dengan simbol Ar dan nomor atom 18). Gas ini tidak berwarna, tidak berbau, dan dikenal sangat stabil atau inert (tidak mudah bereaksi dengan unsur lain). Argon adalah gas terbanyak ketiga di atmosfer bumi.",
  },
  {
    number: 19,
    category: "logam_alkali",
    symbol: "K",
    name: "Kalium",
    description:
      "Kalium (potasium) adalah mineral dan elektrolit penting yang berfungsi menjaga keseimbangan cairan, mengatur kontraksi otot, mendukung fungsi saraf, serta mengontrol tekanan darah. Kekurangan mineral ini bisa menyebabkan lemas dan kram otot, sementara sumber alaminya mudah ditemukan dalam makanan sehari-hari.",
  },
  {
    number: 20,
    category: "logam_alkali_tanah",
    symbol: "Ca",
    name: "Kalsium",
    description:
      "Kalsium adalah mineral krusial yang berfungsi utama untuk membentuk dan memelihara kepadatan tulang serta gigi. Karena tubuh tidak memproduksinya secara alami, Anda harus memenuhinya melalui pola makan sehari-hari atau suplemen.",
  },
  {
    number: 21,
    category: "logam_transisi",
    symbol: "Sc",
    name: "Skandium",
    description:
      "Skandium (simbol Sc, nomor atom 21) adalah logam transisi berwarna putih keperakan. Dikenal karena bobotnya yang ringan dan titik lelehnya yang tinggi, skandium sangat strategis sebagai paduan penguat (aloi) aluminium untuk industri kedirgantaraan serta material berteknologi tinggi seperti sel bahan bakar.",
  },
  {
    number: 22,
    category: "logam_transisi",
    symbol: "Ti",
    name: "Titanium",
    description:
      "Titanium adalah unsur kimia logam dengan simbol Ti dan nomor atom 22. Logam ini sangat populer karena karakteristiknya yang ringan, sangat kuat, dan tahan korosi.",
  },
  {
    number: 23,
    category: "logam_transisi",
    symbol: "V",
    name: "Vanadium",
    description:
      "Vanadium adalah unsur kimia logam transisi yang sangat kuat, ringan, dan tahan korosi, dengan lambang V dan nomor atom 23. Kegunaan utamanya adalah sebagai campuran aditif untuk menghasilkan baja berkekuatan tinggi serta bahan utama untuk baterai penyimpanan energi skala besar.",
  },
  {
    number: 24,
    category: "logam_transisi",
    symbol: "Cr",
    name: "Kromium",
    description:
      "Kromium adalah unsur kimia dengan simbol Cr dan nomor atom 24. Di dunia, kromium memiliki dua fungsi utama: sebagai mineral penting untuk mengatur gula darah tubuh manusia dan sebagai logam keras yang digunakan untuk melapisi atau memperkuat logam lain seperti baja tahan karat (stainless steel).",
  },
  {
    number: 25,
    category: "logam_transisi",
    symbol: "Mn",
    name: "Mangan",
    description:
      "Mangan, batu kawi, atau bekawi adalah sebuah unsur kimia dengan lambang Mn dan nomor atom 25. Ia adalah logam yang keras, rapuh, dan berwarna keperakan yang sering ditemukan dalam mineral yang dikombinasikan dengan besi.",
  },
  {
    number: 26,
    category: "logam_transisi",
    symbol: "Fe",
    name: "Besi",
    description:
      "Besi adalah unsur kimia logam dengan simbol \\(Fe\\) (dari bahasa Latin: ferrum) dan nomor atom 26. Sebagai material paling melimpah di Bumi berdasarkan massa, besi merupakan bahan baku utama dalam industri konstruksi dan manufaktur serta zat gizi esensial bagi tubuh manusia.",
  },
  {
    number: 27,
    category: "logam_transisi",
    symbol: "Co",
    name: "Kobalt",
    description:
      "Kobalt adalah unsur kimia logam transisi dengan simbol Co dan nomor atom 27, yang dikenal sebagai bahan baku penting untuk baterai kendaraan listrik (EV), superalloy mesin pesawat, dan pigmen biru. Di Indonesia, kobalt diproduksi sebagai mineral ikutan dari pengolahan bijih nikel laterit.",
  },
  {
    number: 28,
    category: "logam_transisi",
    symbol: "Ni",
    name: "Nikel",
    description:
      "Nikel adalah unsur kimia metalik dalam tabel periodik yang memiliki simbol Ni dan nomor atom 28. Nikel adalah logam berwarna putih keperak–perakan sedikit semburat keemasan. Nikel termasuk logam transisi, dan memiliki sifat keras serta ulet.",
  },
  {
    number: 29,
    category: "logam_transisi",
    symbol: "Cu",
    name: "Tembaga",
    description:
      "Tembaga adalah sebuah unsur kimia dengan lambang Cu dan nomor atom 29. Ia adalah logam yang lunak, mudah ditempa, dan ulet dengan konduktivitas termal dan listrik yang sangat tinggi. Permukaan tembaga murni yang baru diekspos memiliki warna oranye merah muda.",
  },
  {
    number: 30,
    category: "logam_transisi",
    symbol: "Zn",
    name: "Seng",
    description:
      "Seng, adalah sebuah unsur kimia dengan lambang Zn dan nomor atom 30. Seng adalah logam yang sedikit rapuh pada suhu kamar dan memiliki penampilan keabu-abuan keperakan ketika oksidasi dihilangkan. Ia merupakan unsur pertama dalam golongan 12 dari tabel periodik.",
  },
  {
    number: 31,
    category: "logam_pascatransisi",
    symbol: "Ga",
    name: "Galium",
    description:
      "Galium (simbol Ga, nomor atom 31) adalah logam unik berwarna abu-abu kebiruan yang sangat terkenal karena titik lelehnya yang sangat rendah (\\(29,76^\\circ\\text{C}\\)). Unsur kimia ini bisa mencair hanya dengan suhu tubuh saat dipegang di tangan.",
  },
  {
    number: 32,
    category: "metaloid",
    symbol: "Ge",
    name: "Germanium",
    description:
      "Germanium (simbol kimia Ge, nomor atom 32) adalah metaloid (semilogam) berwarna putih keabu-abuan yang sangat rapuh. Unsur ini adalah komponen vital dalam industri modern karena kemampuannya dalam menghantarkan listrik (semikonduktor) dan sifat optiknya yang unik.",
  },
  {
    number: 33,
    category: "metaloid",
    symbol: "As",
    name: "Arsen",
    description:
      "Arsen atau arsenik (simbol As, nomor atom 33) adalah unsur kimia golongan metaloid yang terkenal sangat beracun. Unsur ini sering kali ditemukan secara alami di dalam kerak bumi, tanah, dan air, namun juga dapat mencemari lingkungan melalui aktivitas industri.",
  },
  {
    number: 34,
    category: "nonlogam_reaktif",
    symbol: "Se",
    name: "Selenium",
    description:
      "Selenium merujuk pada dua hal yang sangat populer: mineral nutrisi penting yang dibutuhkan tubuh untuk menjaga sistem kekebalan dan metabolisme, atau perangkat lunak (framework) untuk otomatisasi browser web yang sangat populer di kalangan pengembang.",
  },
  {
    number: 35,
    category: "nonlogam_reaktif",
    symbol: "BR",
    name: "Bromin",
    description:
      "Bromin (Br) adalah unsur kimia golongan halogen dengan nomor atom 35. Bromin adalah satu-satunya unsur nonlogam yang berwujud cair pada suhu ruang, berwarna merah-cokelat, mudah menguap, dan memiliki bau menyengat yang sangat tajam.",
  },
  {
    number: 36,
    category: "gas_mulia",
    symbol: "Kr",
    name: "Kripton",
    description:
      "Kripton (simbol: Kr, nomor atom: 36) adalah unsur gas mulia yang tidak berwarna, tidak berbau, dan sangat stabil (inert). Unsur kimia ini umumnya digunakan dalam industri penerangan, seperti lampu fluoresen dan lampu mercusuar, serta pada teknologi laser dan insulasi kaca jendela.",
  },
  {
    number: 37,
    category: "logam_alkali",
    symbol: "Rb",
    name: "Rubidium",
    description:
      "Rubidium (simbol Rb, nomor atom 37) adalah logam alkali yang sangat lunak dan reaktif. Berwarna putih keperangan, unsur ini sangat mudah meledak jika bersentuhan dengan air. Rubidium sering menjadi elemen utama dalam fisika kuantum, seperti pembuatan jam atom dan kondensat Bose-Einstein.",
  },
  {
    number: 38,
    category: "logam_alkali_tanah",
    symbol: "Sr",
    name: "Stronsium",
    description:
      "Stronsium (simbol: Sr, nomor atom: 38) adalah logam alkali tanah berwarna perak-kekuningan yang sangat reaktif. Di alam, unsur ini paling dikenal melalui senyawa garamnya yang menghasilkan nyala merah cemerlang untuk kembang api dan suar darurat.",
  },
  {
    number: 39,
    category: "logam_transisi",
    symbol: "Y",
    name: "Itrium",
    description:
      "Itrium (atau Yttrium) adalah unsur kimia dengan simbol Y dan nomor atom 39. Logam transisi berwarna keperakan ini diklasifikasikan sebagai unsur tanah jarang. Itrium sangat penting dalam teknologi modern, mulai dari pembuatan laser, superkonduktor, hingga pengobatan kanker.",
  },
  {
    number: 40,
    category: "logam_transisi",
    symbol: "Zr",
    name: "Zirkonium",
    description:
      "Zirkonium adalah unsur kimia logam transisi dengan lambang Zr dan nomor atom 40. Logam putih keperakan ini terkenal karena sangat tahan terhadap korosi dan panas, menjadikannya material vital dalam berbagai sektor industri khusus.",
  },
  {
    number: 41,
    category: "logam_transisi",
    symbol: "Nb",
    name: "Niobium",
    description:
      "Niobium adalah logam transisi dengan lambang Nb dan nomor atom 41. Bersifat mengilap, berwarna abu-abu, lunak, dan mudah dibentuk. Logam ini sangat tahan panas dan korosi, serta memiliki sifat superkonduktor.",
  },
  {
    number: 42,
    category: "logam_transisi",
    symbol: "Mo",
    name: "Molibdenum",
    description:
      "Molibdenum (simbol kimia: Mo, nomor atom: 42) adalah logam transisi berwarna abu-abu keperakan dengan titik leleh sangat tinggi (\\(2.623^{\\circ }\\text{C}\\)). Logam tahan api ini sangat penting dalam industri metalurgi untuk meningkatkan kekuatan baja, dan merupakan mikronutrien esensial bagi metabolisme tubuh manusia serta tanaman.",
  },
  {
    number: 43,
    category: "logam_transisi",
    symbol: "Tc",
    name: "Teknesium",
    description:
      "Teknesium adalah unsur kimia dengan lambang Tc dan nomor atom 43. Logam transisi sintetis berwarna abu-abu keperakan ini sangat terkenal dalam dunia medis, khususnya isotop Teknesium-99m (Tc-99m), yang menjadi radiofarmaka paling umum digunakan untuk prosedur pencitraan diagnostik.",
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
      "Rodium (simbol Rh, nomor atom 45) adalah salah satu logam paling langka dan berharga di dunia, bahkan sering kali melebihi harga emas. Logam transisi berwarna putih keperakan ini sangat tahan karat, reflektif, dan memiliki titik lebur yang sangat tinggi.",
  },
  {
    number: 46,
    category: "logam_transisi",
    symbol: "Pd",
    name: "Paladium",
    description:
      "Paladium (simbol Pd, nomor atom 46) adalah logam transisi langka berwarna putih keperakan yang termasuk dalam kelompok platina. Dikenal karena sifatnya yang tahan korosi dan tidak mudah pudar, paladium banyak digunakan sebagai bahan baku perhiasan (terutama cincin kawin), komponen vital elektronik, dan katalis otomotif.",
  },
  {
    number: 47,
    category: "logam_transisi",
    symbol: "Ag",
    name: "Perak",
    description:
      'Perak adalah unsur logam dengan nomor atom 47. Simbolnya adalah Ag, dari bahasa Latin argentum, dari akar PIE yang direkonstruksi sebagai *h₂erǵ-, "abu-abu" atau "bersinar".',
  },
  {
    number: 48,
    category: "logam_transisi",
    symbol: "Cd",
    name: "Kadmium",
    description:
      "Kadmium (Cd) adalah logam berat beracun yang secara alami ditemukan dalam kerak bumi. Unsur kimia dengan nomor atom 48 ini sering digunakan dalam industri baterai isi ulang, pelapisan logam (anti-korosi), cat, dan plastik. Paparannya sangat berbahaya dan dapat memicu berbagai masalah kesehatan yang serius.",
  },
  {
    number: 49,
    category: "logam_pascatransisi",
    symbol: "In",
    name: "Indium",
    description:
      "Indium adalah logam langka yang sangat lunak dengan simbol In dan nomor atom 49. Logam ini sangat penting dalam teknologi modern karena dapat menghantarkan listrik, menempel kuat pada kaca, dan bersifat transparan.",
  },
  {
    number: 50,
    category: "logam_pascatransisi",
    symbol: "Sn",
    name: "Timah",
    description:
      "Timah adalah sebuah unsur kimia dalam tabel periodik yang memiliki simbol Sn dan nomor atom 50. Timah termasuk logam pasca-transisi di kelompok 14 dalam tabel periodik.",
  },
  {
    number: 51,
    category: "metaloid",
    symbol: "Sb",
    name: "Antimon",
    description:
      "Antimon (simbol kimia: Sb, nomor atom: 51) adalah unsur metaloid berwarna putih keperakan yang bersifat rapuh. Di alam, unsur ini dikenal sejak zaman kuno dengan nama Stibium dan umumnya ditemukan berikatan dengan mineral lain seperti bijih stibnit.",
  },
  {
    number: 52,
    category: "metaloid",
    symbol: "Te",
    name: "Telurium",
    description:
      "Telurium (simbol Te, nomor atom 52) adalah unsur metaloid berwarna putih keperakan yang rapuh dan termasuk dalam golongan kalkogen. Telurium lebih langka di kerak bumi daripada emas dan sering kali diperoleh sebagai produk sampingan dari pemurnian tembaga atau timbal.",
  },
  {
    number: 53,
    category: "nonlogam_reaktif",
    symbol: "I",
    name: "Iodin",
    description:
      "Iodin (atau yodium) adalah unsur kimia dengan lambang I dan nomor atom 53. Mineral esensial ini sangat krusial bagi kelenjar tiroid untuk memproduksi hormon yang mengatur metabolisme, serta sering digunakan sebagai antiseptik untuk mencegah infeksi pada luka.",
  },
  {
    number: 54,
    category: "gas_mulia",
    symbol: "Xe",
    name: "Xenon",
    description:
      "Xenon (simbol kimia: Xe, nomor atom 54) adalah gas mulia yang sangat padat, tidak berwarna, dan tidak berbau. Gas langka ini terdapat di atmosfer Bumi dalam jumlah yang sangat kecil dan diperoleh melalui pemisahan udara cair.",
  },
  {
    number: 55,
    category: "logam_alkali",
    symbol: "Cs",
    name: "Sesium",
    description:
      "Caesium (atau sesium) adalah logam alkali dengan simbol Cs dan nomor atom 55. Dikenal sebagai salah satu logam paling reaktif di dunia, unsur ini meleleh pada suhu nyaris ruang (\\(\\approx 28,4^\\circ\\text{C}\\)). Isotop radioaktifnya, Caesium-137, digunakan dalam kalibrasi medis, namun berbahaya bagi kesehatan.",
  },
  {
    number: 56,
    category: "logam_alkali_tanah",
    symbol: "Ba",
    name: "Barium",
    description:
      "Barium adalah unsur kimia dengan lambang Ba dan nomor atom 56. Logam alkali tanah yang lunak ini sangat reaktif dan tidak ditemukan di alam dalam bentuk unsur murni. Unsur ini paling dikenal luas melalui senyawa seperti barium sulfat yang berfungsi sebagai zat kontras sinar-X medis.",
  },
  {
    number: 57,
    category: "lantanida",
    symbol: "La",
    name: "Lantanum",
    description:
      'Lantanum (simbol kimia: La, nomor atom: 57) adalah logam tanah jarang yang lunak, mudah ditempa, dan berwarna putih keperakan. Unsur ini menjadi pionir dari deret lantanida dalam tabel periodik. Meskipun disebut "tanah jarang", lantanum sebenarnya berlimpah di kerak bumi dan digunakan secara luas dalam teknologi dan medis.',
  },
  {
    number: 58,
    category: "lantanida",
    symbol: "Ce",
    name: "Serium",
    description:
      "Serium (Cerium) adalah logam tanah jarang dengan simbol Ce dan nomor atom 58. Unsur kimia ini sangat reaktif, berwarna abu-abu keperakan, dan banyak digunakan sebagai bahan pemoles kaca, batu korek api (pemantik), dan katalis.",
  },
  {
    number: 59,
    category: "lantanida",
    symbol: "Pr",
    name: "Praseodimium",
    description:
      "Praseodimium (simbol Pr, nomor atom 59) adalah logam tanah jarang dari deret lantanida. Logam berwarna putih keperakan ini lunak dan ulet. Ditemukan pada tahun 1885, unsur ini terkenal karena sifat magnetik, kelistrikan, dan optiknya, serta sangat penting dalam teknologi modern.",
  },
  {
    number: 60,
    category: "lantanida",
    symbol: "Nd",
    name: "Neodimium",
    description:
      "Neodimium adalah sebuah unsur kimia dengan lambang Nd dan nomor atom 60. Ia adalah anggota keempat dari deret lantanida dan dianggap sebagai salah satu logam tanah jarang. Ia adalah logam keperakan yang keras, sedikit dapat ditempa, dan akan cepat ternoda di udara dan kelembapan.",
  },
  {
    number: 61,
    category: "lantanida",
    symbol: "Pm",
    name: "Prometium",
    description:
      "Prometium (simbol Pm, nomor atom 61) adalah unsur kimia langka dalam deret lantanida yang seluruh isotopnya bersifat radioaktif. Karena jumlahnya di kerak bumi sangat sedikit (sekitar 500–600 gram secara total), unsur ini sebagian besar diproduksi secara artifisial.",
  },
  {
    number: 62,
    category: "lantanida",
    symbol: "Sm",
    name: "Samarium",
    description:
      "Samarium (Sm) adalah unsur kimia logam tanah jarang dengan nomor atom 62 dan simbol Sm. Unsur ini banyak digunakan untuk membuat magnet permanen yang sangat kuat dan, dalam bentuk radioaktifnya, sebagai obat paliatif untuk meredakan nyeri akibat kanker yang telah menyebar (metastasis) ke tulang.",
  },
  {
    number: 63,
    category: "lantanida",
    symbol: "Eu",
    name: "Europium",
    description:
      "Europium adalah unsur kimia logam tanah jarang dengan lambang Eu dan nomor atom 63. Dikenal sebagai yang paling reaktif dari kelompok lantanida, unsur ini sangat berharga dalam teknologi modern berkat kemampuan pendarannya (luminesensi) yang menghasilkan cahaya merah terang.",
  },
  {
    number: 64,
    category: "lantanida",
    symbol: "Gd",
    name: "Gadolinium",
    description:
      "Gadolinium adalah unsur kimia logam tanah jarang dengan nomor atom 64 dan simbol Gd. Bahan ini paling dikenal sebagai komponen utama dalam zat kontras MRI (Magnetic Resonance Imaging) yang digunakan untuk mempertajam visualisasi pembuluh darah, organ, dan kelainan seperti tumor.",
  },
  {
    number: 65,
    category: "lantanida",
    symbol: "Tb",
    name: "Terbium",
    description:
      "Terbium (Tb) adalah unsur kimia logam tanah jarang dengan nomor atom 65. Ditemukan pada tahun 1843, unsur berwarna putih keperakan yang lunak ini sangat berharga karena kemampuannya memancarkan cahaya hijau terang serta sifat magnetiknya. Terbium banyak digunakan dalam teknologi penerangan dan perangkat elektronik.",
  },
  {
    number: 66,
    category: "lantanida",
    symbol: "Dy",
    name: "Disprosium",
    description:
      'Disprosium (simbol kimia: Dy, nomor atom: 66) adalah logam tanah jarang berwarna perak yang lunak dan mudah ditempa. Namanya berasal dari bahasa Yunani dysprositos, yang berarti "sulit didapat", karena logam ini sangat menantang untuk diisolasi. Berikut adalah rincian fakta utamanya',
  },
  {
    number: 67,
    category: "lantanida",
    symbol: "Ho",
    name: "Holmium",
    description:
      "Holmium adalah unsur kimia logam tanah jarang dengan simbol Ho dan nomor atom 67. Dikenal karena sifat kemagnetannya yang luar biasa, unsur ini banyak dimanfaatkan dalam teknologi medis modern—terutama untuk operasi batu ginjal dan prostat—serta dalam reaktor nuklir",
  },
  {
    number: 68,
    category: "lantanida",
    symbol: "Er",
    name: "Erbium",
    description:
      "Erbium (simbol Er, nomor atom 68) adalah logam tanah jarang berwarna putih keperakan. Unsur ini sangat penting dalam teknologi telekomunikasi (sebagai penguat sinyal kabel serat optik) dan dunia kecantikan/medis (sebagai teknologi laser ablatif untuk peremajaan kulit).",
  },
  {
    number: 69,
    category: "lantanida",
    symbol: "Tm",
    name: "Tulium",
    description:
      "Tulium adalah sebuah unsur kimia dengan lambang Tm dan nomor atom 69. Ia adalah unsur ketiga belas dan ketiga terakhir dalam deret lantanida. Seperti lantanida lainnya, keadaan oksidasi yang paling umum adalah +3, terlihat pada oksida, halida, dan senyawanya yang lain; tetapi, keadaan oksidasi +2 juga dapat stabil.",
  },
  {
    number: 70,
    category: "lantanida",
    symbol: "Yb",
    name: "Iterbium",
    description:
      "Iterbium adalah sebuah unsur kimia dengan lambang Yb dan nomor atom 70. Iterbium adalah sebuah logam, unsur keempat belas dan kedua dari belakang dalam deret lantanida, yang menjadi dasar kestabilan relatif keadaan oksidasi +2-nya.",
  },
  {
    number: 71,
    category: "lantanida",
    symbol: "Lu",
    name: "Lutesium",
    description:
      "Lutetium adalah unsur kimia logam tanah jarang dengan simbol Lu dan nomor atom 71. Elemen ini sangat langka, keras, dan berwarna putih keperakan. Isotop radioaktifnya, Lutetium-177, sangat krusial dalam dunia medis sebagai terapi bertarget untuk menghancurkan sel kanker.",
  },
  {
    number: 72,
    category: "logam_transisi",
    symbol: "Hf",
    name: "Hafnium",
    description:
      "Hafnium adalah unsur kimia dengan lambang Hf dan nomor atom 72. Logam transisi berwarna abu-keperakan ini sangat tahan korosi dan memiliki sifat penyerapan neutron yang luar biasa, sehingga memegang peranan krusial dalam teknologi reaktor nuklir, industri dirgantara, dan manufaktur mikroelektronika modern.",
  },
  {
    number: 73,
    category: "logam_transisi",
    symbol: "Ta",
    name: "Tantalum",
    description:
      "Tantalum adalah logam transisi dengan simbol kimia Ta dan nomor atom 73. Sangat keras, tahan korosi, dan memiliki titik leleh tertinggi ketiga di Bumi (\\(2.996\\,^{\\circ}\\text{C}\\)). Ini menjadikannya material vital untuk elektronik, dirgantara, dan implan medis.",
  },
  {
    number: 74,
    category: "logam_transisi",
    symbol: "W",
    name: "Wolfram",
    description:
      "Wolfram, dikenal juga sebagai tungsten, adalah suatu unsur kimia dalam tabel periodik yang memiliki lambang W dan nomor atom 74. Istilah tungsten berasal dari bahasa Swedia tung sten, yang berarti batu berat.",
  },
  {
    number: 75,
    category: "logam_transisi",
    symbol: "Re",
    name: "Renium",
    description:
      "Renium adalah unsur kimia langka dengan lambang Re dan nomor atom 75. Logam transisi berat berwarna abu-abu keperakan ini memiliki titik lebur dan didih tertinggi ketiga di antara semua unsur, serta sangat tahan terhadap suhu ekstrem dan korosi.",
  },
  {
    number: 76,
    category: "logam_transisi",
    symbol: "Os",
    name: "Osmium",
    description:
      "Osmium adalah sebuah unsur kimia dengan lambang Os dan nomor atom 76. Ia adalah sebuah logam transisi yang keras, rapuh, berwarna putih kebiruan dalam golongan platina yang ditemukan sebagai unsur jejak dalam paduan, kebanyakan dalam bijih platina. Osmium adalah unsur alami yang paling padat.",
  },
  {
    number: 77,
    category: "logam_transisi",
    symbol: "Ir",
    name: "Iridium",
    description:
      "Iridium adalah unsur kimia logam transisi bernomor atom 77 (simbol \\(Ir\\)) yang sangat langka, keras, dan tahan panas, serta dikenal luas dalam teknologi komunikasi satelit dan industri otomotif.",
  },
  {
    number: 78,
    category: "logam_transisi",
    symbol: "Pt",
    name: "Platina",
    description:
      'Platina, yang juga disebut platinum, adalah unsur kimia dengan lambang Pt dan nomor atom 78. Logam transisi putih abu-abu ini padat, lunak, ulet, sangat tidak reaktif, dan berharga. Namanya berasal dari istilah Spanyol platina, yang jika diterjemahkan secara harfiah berarti "perak kecil".',
  },
  {
    number: 79,
    category: "logam_transisi",
    symbol: "Au",
    name: "Emas",
    description:
      "Emas adalah sebuah unsur kimia dengan lambang Au dan nomor atom 79. Dalam bentuknya yang murni, emas menampilkan warna kuning jingga yang cerah dan memiliki sifat-sifat padat, lembut, lentur, dan ulet.",
  },
  {
    number: 80,
    category: "logam_transisi",
    symbol: "Hg",
    name: "Raksa",
    description:
      'Raksa (sering disebut air raksa atau merkuri) adalah unsur kimia logam golongan transisi dengan simbol Hg dan nomor atom 80. Dikenal sebagai "perak cair", ini adalah satu-satunya logam yang berwujud cair pada suhu kamar dan sangat beracun.',
  },
  {
    number: 81,
    category: "logam_pascatransisi",
    symbol: "Tl",
    name: "Talium",
    description:
      "Talium (simbol: Tl, nomor atom: 81) adalah unsur kimia berupa logam lunak berwarna abu-abu kebiruan yang sangat beracun. Logam ini mirip timbal secara fisik tetapi mirip aluminium secara kimia. Karena sifatnya yang tidak berbau dan tidak berasa, talium pernah banyak disalahgunakan sebagai racun.",
  },
  {
    number: 82,
    category: "logam_pascatransisi",
    symbol: "Pb",
    name: "Timbal",
    description:
      "Timbal (dikenal juga sebagai timah hitam atau plumbum) adalah unsur kimia logam berat dengan lambang Pb dan nomor atom 82. Bersifat lunak, mudah dibentuk, dan tahan karat, logam ini sangat beracun dan berbahaya karena mudah terakumulasi di lingkungan serta dalam tubuh manusia.",
  },
  {
    number: 83,
    category: "logam_pascatransisi",
    symbol: "Bi",
    name: "Bismut",
    description:
      "Bismut (simbol kimia: Bi, nomor atom: 83) adalah logam rapuh berwarna putih keperakan yang tidak beracun, sering digunakan sebagai alternatif pengganti timbal. Logam ini dikenal memiliki sifat diamagnetik yang kuat dan sering diolah menjadi kristal warna-warni karena proses oksidasinya.",
  },
  {
    number: 84,
    category: "logam_pascatransisi",
    symbol: "Po",
    name: "Polonium",
    description:
      "Polonium (simbol Po, nomor atom 84) adalah salah satu unsur paling langka dan sangat radioaktif di dunia. Ditemukan oleh Marie dan Pierre Curie pada tahun 1898, logam metaloid ini memancarkan partikel alfa berenergi tinggi yang, jika terhirup atau tertelan, menjadikannya racun mematikan tingkat ekstrem bagi tubuh manusia.",
  },
  {
    number: 85,
    category: "logam_pascatransisi",
    symbol: "At",
    name: "Astatin",
    description:
      "Astatin adalah sebuah unsur kimia dengan lambang At dan nomor atom 85. Ia adalah unsur alami yang paling langka di kerak Bumi, hanya terjadi sebagai produk peluruhan dari berbagai unsur yang lebih berat. Semua isotop astatin berumur pendek; yang paling stabil adalah astatin-210, dengan waktu paruh 8,1 jam.",
  },
  {
    number: 86,
    category: "gas_mulia",
    symbol: "Rn",
    name: "Radon",
    description:
      "Radon adalah gas radioaktif alami yang tidak berbau, tidak berwarna, dan tidak berasa. Terbentuk dari peluruhan uranium atau torium di dalam tanah, radon dapat merembes ke dalam rumah atau gedung melalui retakan. Paparan jangka panjang merupakan penyebab utama kanker paru-paru pada bukan perokok.",
  },
  {
    number: 87,
    category: "logam_alkali",
    symbol: "Fr",
    name: "Fransium",
    description:
      "Fransium (simbol \\(Fr\\), nomor atom 87) adalah logam alkali radioaktif yang sangat langka dan tidak stabil. Dikenal sebagai salah satu unsur termahal di Bumi (diperkirakan mencapai lebih dari $1 miliar per gramnya), unsur ini sebagian besar dipelajari untuk penelitian struktur atom dan eksperimen spektroskopi.",
  },
  {
    number: 88,
    category: "logam_alkali_tanah",
    symbol: "Ra",
    name: "Radium",
    description:
      "Radium adalah unsur kimia logam radioaktif berwarna putih keperakan (simbol Ra, nomor atom 88). Ditemukan oleh Marie dan Pierre Curie pada tahun 1898, zat ini sangat langka dan sangat reaktif, memancarkan radiasi kuat yang menghasilkan pendaran biru dalam gelap.",
  },
  {
    number: 89,
    category: "aktinida",
    symbol: "Ac",
    name: "Aktinium",
    description:
      "Aktinium (Ac) adalah unsur logam radioaktif berwarna putih keperakan dengan nomor atom 89, yang ditemukan pada 1899 dan menjadi dasar penamaan deret aktinida. Aktinium sangat langka, ditemukan dalam jumlah kecil di bijih uranium, dan lebih sering diproduksi di laboratorium karena sifatnya yang sangat radioaktif (150 kali lebih kuat dari radium).",
  },
  {
    number: 90,
    category: "aktinida",
    symbol: "Th",
    name: "Torium",
    description:
      "Torium adalah suatu unsur kimia dalam tabel periodik yang memiliki lambang Th dan nomor atom 90. Logam torium berwarna keperakan dan bernoda hitam saat terkena udara, membentuk torium dioksida; logam ini cukup keras, mudah dibentuk, dan memiliki titik lebur yang tinggi.",
  },
  {
    number: 91,
    category: "aktinida",
    symbol: "Pa",
    name: "Protaktinium",
    description:
      "Protaktinium (simbol Pa, nomor atom 91) adalah logam radioaktif langka yang termasuk dalam deret aktinida. Karena kelangkaan, radioaktivitas, dan toksisitasnya yang tinggi, unsur ini sangat mahal dan penggunaannya terbatas hanya pada penelitian ilmiah.",
  },
  {
    number: 92,
    category: "aktinida",
    symbol: "U",
    name: "Uranium",
    description:
      "Uranium adalah logam radioaktif alami bernomor atom 92 (simbol U) yang menjadi bahan bakar utama pembangkit listrik tenaga nuklir. Unsur ini sangat efisien; satu kilogram uranium dapat menghasilkan energi setara 3.000 ton batu bara.",
  },
  {
    number: 93,
    category: "aktinida",
    symbol: "Np",
    name: "Neptunium",
    description:
      "Neptunium (simbol: Np, nomor atom: 93) adalah logam aktinida radioaktif dan unsur transuranium pertama. Ditemukan pada tahun 1940 di laboratorium radiasi Berkeley, unsur sintetis ini umumnya dihasilkan sebagai produk sampingan dari reaktor nuklir.",
  },
  {
    number: 94,
    category: "aktinida",
    symbol: "Pu",
    name: "Plutonium",
    description:
      "Plutonium adalah unsur kimia radioaktif golongan aktinida dengan lambang Pu dan nomor atom 94. Logam berwarna keperakan ini sangat padat dan reaktif. Ditemukan pada tahun 1940, unsur ini diproduksi secara artifisial melalui iradiasi neutron pada uranium di reaktor nuklir.",
  },
  {
    number: 95,
    category: "aktinida",
    symbol: "Am",
    name: "Amerisium",
    description:
      "Amerisium (lambang Am, nomor atom 95) adalah unsur kimia sintetis yang sangat radioaktif dan termasuk dalam deret aktinida. Ditemukan pada tahun 1944, unsur ini dinamai sesuai benua Amerika. Isotop yang paling umum digunakan adalah Amerisium-241.",
  },
  {
    number: 96,
    category: "aktinida",
    symbol: "Cm",
    name: "Kurium",
    description:
      "Kurium adalah unsur kimia sintetik dalam sistem periodik unsur yang memiliki lambang Cm dan nomor atom 96. Nama elemen ini diambil dari nama ilmuwan Marie Curie.",
  },
  {
    number: 97,
    category: "aktinida",
    symbol: "Bk",
    name: "Berkelium",
    description:
      "Berkelium adalah unsur kimia sintetis radioaktif dalam tabel periodik dengan lambang Bk dan nomor atom 97. Logam transuranium yang termasuk dalam deret aktinida ini tidak ditemukan di alam, melainkan dibuat melalui proses reaktor nuklir khusus.",
  },
  {
    number: 98,
    category: "aktinida",
    symbol: "Cf",
    name: "Kalifornium",
    description:
      "Kalifornium adalah unsur kimia sintetis yang sangat radioaktif dengan lambang Cf dan nomor atom 98. Logam ini sangat langka dan berharga. Ditemukan pertama kali pada tahun 1950 di Universitas California, Berkeley, unsur ini digunakan secara krusial sebagai sumber neutron portabel.",
  },
  {
    number: 99,
    category: "aktinida",
    symbol: "Es",
    name: "Einsteinium",
    description:
      'Einsteinium (simbol \\(Es\\), nomor atom \\(99\\)) adalah unsur kimia sintetis yang sangat radioaktif dan termasuk dalam deret aktinida. Unsur ini pertama kali ditemukan pada puing-puing ledakan bom hidrogen pertama ("Ivy Mike") pada tahun 1952.',
  },
  {
    number: 100,
    category: "aktinida",
    symbol: "Fm",
    name: "Fermium",
    description:
      "Fermium adalah unsur kimia sintetis (buatan) radioaktif dengan lambang Fm dan nomor atom 100. Sebagai anggota deret aktinida, fermium adalah unsur terberat yang dapat diproduksi melalui pemboman neutron pada unsur yang lebih ringan, dinamai untuk menghormati fisikawan nuklir Enrico Fermi.",
  },
  {
    number: 101,
    category: "aktinida",
    symbol: "Md",
    name: "Mendelevium",
    description:
      "Mendelevium adalah unsur kimia sintetis radioaktif dengan simbol Md dan nomor atom 101. Termasuk dalam deret aktinida, unsur buatan ini ditemukan pada tahun 1955 di Universitas California, Berkeley, dan dinamai untuk menghormati Dmitri Mendeleev, pencipta tabel periodik.",
  },
  {
    number: 102,
    category: "aktinida",
    symbol: "No",
    name: "Nobelium",
    description:
      "Nobelium adalah unsur kimia sintetis dengan simbol No dan nomor atom 102. Logam radioaktif langka ini termasuk dalam deret aktinida dan hanya dapat dibuat di laboratorium dengan membombardir unsur yang lebih ringan menggunakan partikel bermuatan.",
  },
  {
    number: 103,
    category: "aktinida",
    symbol: "Lr",
    name: "Lawrensium",
    description:
      "Lawrencium adalah unsur kimia sintetis radioaktif dengan simbol Lr dan nomor atom 103. Sebagai anggota terakhir dari deret aktinida, unsur ini tidak ditemukan di alam dan hanya dapat diproduksi di laboratorium melalui reaksi partikel nuklir.",
  },
  {
    number: 104,
    category: "logam_transisi",
    symbol: "Rf",
    name: "Ruterfordium",
    description:
      "Rutherfordium adalah unsur kimia sintetis yang sangat radioaktif dengan lambang Rf dan nomor atom 104. Karena tidak terdapat di alam, logam transisi superberat ini dibuat di laboratorium melalui reaksi nuklir. Belum ada kegunaan praktis selain untuk penelitian sains.",
  },
  {
    number: 105,
    category: "logam_transisi",
    symbol: "Db",
    name: "Dubnium",
    description:
      "Dubnium adalah unsur kimia sintetis (buatan) dengan lambang Db dan nomor atom 105. Unsur ini sangat radioaktif dan tidak terjadi secara alami; ia diproduksi di laboratorium melalui reaksi nuklir. Dubnium dinamai untuk menghormati kota Dubna di Rusia, tempat institut penelitian nuklir menemukannya.",
  },
  {
    number: 106,
    category: "logam_transisi",
    symbol: "Sg",
    name: "Seaborgium",
    description:
      "Seaborgium (Sg) adalah unsur kimia sintetis yang sangat radioaktif dengan nomor atom 106. Ditemukan pada tahun 1974, unsur ini termasuk dalam golongan logam transisi dan diberi nama untuk menghormati ilmuwan nuklir Glenn T. Seaborg, menjadikannya salah satu unsur pertama yang dinamai untuk menghormati ilmuwan yang masih hidup.",
  },
  {
    number: 107,
    category: "logam_transisi",
    symbol: "Bh",
    name: "Bohrium",
    description:
      "Bohrium adalah unsur kimia sintetik dalam sistem periodik unsur yang memiliki lambang Bh dan nomor atom 107. Nama elemen ini bertujuan untuk mengenang Niels Bohr, penemu orbit elektron.",
  },
  {
    number: 108,
    category: "logam_transisi",
    symbol: "Hs",
    name: "Hasium",
    description:
      "Hasium adalah unsur kimia sintetik dalam sistem periodik unsur yang memiliki lambang Hs dan nomor atom 108. Dari kelimabelas isotop dari hasium yang diketahui, Hs-276 memiliki waktu-paruh paling lama, yaitu 1.1 jam. Hasium pertamakali terbentuk pada 1984 Gesellschaft für Schwerionenforschung di Darmstadt, Jerman.",
  },
  {
    number: 109,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Mt",
    name: "Meitnerium",
    description:
      "Meitnerium adalah unsur kimia sintetis dengan lambang Mt dan nomor atom 109. Logam transisi yang sangat radioaktif ini tidak terdapat di alam dan hanya dapat dibuat di laboratorium. Karena waktu paruhnya yang sangat singkat (maksimal sekitar 8 detik untuk isotop Mt-278), kegunaannya terbatas pada penelitian ilmiah.",
  },
  {
    number: 110,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Ds",
    name: "Darmstadtium",
    description:
      "Darmstadtium adalah unsur kimia sintetis dengan lambang Ds dan nomor atom 110. Sangat radioaktif dan tidak stabil, unsur logam transisi ini dibuat di laboratorium melalui tumbukan partikel atom berat dan hanya digunakan untuk tujuan penelitian ilmiah.",
  },
  {
    number: 111,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Rg",
    name: "Roentgenium",
    description:
      "Roentgenium (lambang Rg, nomor atom 111) adalah unsur kimia sintetis dan sangat radioaktif yang tidak ditemukan di alam. Logam transisi ini diciptakan di laboratorium melalui reaksi nuklir dan dinamai untuk menghormati fisikawan penemu sinar-X, Wilhelm Conrad Röntgen.",
  },
  {
    number: 112,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Cn",
    name: "Kopernisium",
    description:
      "Kopernisium (Cn) adalah unsur kimia sintetis super berat dengan nomor atom 112 dan lambang Cn, yang secara resmi dinamai berdasarkan astronom Nicolaus Copernicus. Unsur radioaktif ini, yang pertama kali dibuat pada tahun 1996, berada dalam golongan 12 (logam transisi) dan diperkirakan memiliki wujud cair pada suhu ruangan dengan sifat mudah menguap.",
  },
  {
    number: 113,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Nh",
    name: "Nihonium",
    description:
      "Nihonium (simbol kimia Nh, nomor atom 113) adalah unsur logam sintetis yang sangat radioaktif. Ditemukan oleh para ilmuwan di lembaga penelitian RIKEN, Jepang, unsur ini bersejarah karena menjadi elemen pertama yang ditemukan di Asia dan seluruh wilayah di luar Eropa atau Amerika Serikat.",
  },
  {
    number: 114,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Fl",
    name: "Flerovium",
    description:
      "Flerovium adalah unsur kimia sintetis (buatan) yang sangat radioaktif dengan lambang Fl dan nomor atom 114. Unsur superberat ini termasuk dalam golongan logam pasca-transisi pada tabel periodik.",
  },
  {
    number: 115,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Mc",
    name: "Moskovium",
    description:
      "Moskovium adalah unsur kimia sintetis yang sangat radioaktif dengan lambang Mc dan nomor atom 115. Ditemukan pada tahun 2003 melalui kolaborasi ilmuwan Rusia dan Amerika, unsur ini dinamai untuk menghormati wilayah Moskow dan wilayah sekitarnya.",
  },
  {
    number: 116,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Lv",
    name: "Livermorium",
    description:
      "Livermorium (simbol Lv, nomor atom 116) adalah unsur kimia sintetis superberat yang sangat radioaktif. Ditemukan pada tahun 2000 melalui kolaborasi ilmuwan Rusia dan AS, unsur ini tidak terdapat secara alami dan hanya dapat dibuat di laboratorium.",
  },
  {
    number: 117,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Ts",
    name: "Tenesin",
    description:
      "Tenesin (simbol kimia: Ts, nomor atom: 117) adalah unsur kimia buatan super berat yang sangat radioaktif. Ditemukan pada tahun 2010 melalui kolaborasi ilmuwan Rusia dan Amerika, unsur ini dikategorikan dalam kelompok halogen.",
  },
  {
    number: 118,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Og",
    name: "Oganeson",
    description:
      "Oganeson (simbol Og, nomor atom 118) adalah unsur sintetis terberat di tabel periodik yang termasuk dalam golongan gas mulia. Sangat radioaktif dan tidak stabil, unsur ini pertama kali dibuat pada tahun 2002 dan dinamai untuk menghormati fisikawan nuklir Yuri Oganessian.",
  },
  {
    number: 119,
    category: "sifat_kimia_tidak_diketahui",
    symbol: "Uue",
    name: "Ununennium",
    description:
      "Ununennium, juga dikenal sebagai eka-francium atau sederhananya unsur 119, adalah unsur kimia hipotetis dengan simbol Uue dan nomor atom 119. Ununennium dan Uue masing-masing merupakan nama dan simbol sistematis sementara IUPAC, hingga nama permanen ditentukan. Dalam tabel periodik unsur, diperkirakan merupakan unsur blok s, logam alkali, dan unsur pertama pada periode kedelapan.",
  },
];

const categoryColors = {
  aktinida: {
    light: "#e57373",
    dark: "#b71c1c",
  },
  gas_mulia: {
    light: "#f06292",
    dark: "#880e4f",
  },
  lantanida: {
    light: "#ba68c8",
    dark: "#4a148c",
  },
  logam_alkali: {
    light: "#9575cd",
    dark: "#311b92",
  },
  logam_alkali_tanah: {
    light: "#7986cb",
    dark: "#283593",
  },
  logam_pascatransisi: {
    light: "#64b5f6",
    dark: "#0d47a1",
  },
  logam_transisi: {
    light: "#4dd0e1",
    dark: "#006064",
  },
  metaloid: {
    light: "#81c784",
    dark: "#1b5e20",
  },
  nonlogam_reaktif: {
    light: "#fff176",
    dark: "#f57f17",
  },
  sifat_kimia_tidak_diketahui: {
    light: "#ffb74d",
    dark: "#e65100",
  },
};

const getCategoryColor = (category) => {
  const color = categoryColors[category];
  const isDark = document.body.classList.contains("darkmode");

  return color ? color[isDark ? "dark" : "light"] : "var(--base-color)";
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
  modalCard.style.background = getCategoryColor(data.category);
  modalCard.style.borderColor = getCategoryColor(data.category);
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
    card.style.background = getCategoryColor(element.category);
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
