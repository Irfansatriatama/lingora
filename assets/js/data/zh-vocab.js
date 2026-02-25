/**
 * Lingora - Mandarin Vocabulary Data
 * Kosakata per tema (15 tema)
 * Format: { word, pinyin, tone, meaning, theme, example:{ sentence, pinyin, meaning } }
 */
const ZhVocabData = (() => {

  const themes = [
    { id:'greetings',    label:'Salam & Sapaan',   icon:'👋' },
    { id:'family',       label:'Keluarga',          icon:'👨‍👩‍👧‍👦' },
    { id:'food',         label:'Makanan & Minuman', icon:'🍜' },
    { id:'time',         label:'Waktu & Tanggal',   icon:'🕐' },
    { id:'places',       label:'Tempat & Lokasi',   icon:'📍' },
    { id:'transport',    label:'Transportasi',      icon:'🚌' },
    { id:'shopping',     label:'Belanja',           icon:'🛍️' },
    { id:'weather',      label:'Cuaca',             icon:'⛅' },
    { id:'body',         label:'Tubuh & Kesehatan', icon:'🏥' },
    { id:'school',       label:'Sekolah & Belajar', icon:'📚' },
    { id:'work',         label:'Pekerjaan',         icon:'💼' },
    { id:'hobby',        label:'Hobi & Hiburan',    icon:'🎨' },
    { id:'feelings',     label:'Perasaan & Emosi',  icon:'😊' },
    { id:'colors',       label:'Warna & Bentuk',    icon:'🎨' },
    { id:'numbers',      label:'Angka & Ukuran',    icon:'🔢' },
  ];

  const vocab = [
    // ── Greetings ──
    { word:'你好',     pinyin:'nǐ hǎo',    meaning:'halo',                  theme:'greetings', example:{ sentence:'你好！很高兴认识你！', pinyin:'Nǐ hǎo! Hěn gāoxìng rènshi nǐ!', meaning:'Halo! Senang bertemu kamu!' } },
    { word:'你好吗',   pinyin:'nǐ hǎo ma', meaning:'apa kabar',             theme:'greetings', example:{ sentence:'你好吗？我很好，谢谢！', pinyin:'Nǐ hǎo ma? Wǒ hěn hǎo, xièxie!', meaning:'Apa kabar? Saya baik, terima kasih!' } },
    { word:'谢谢',     pinyin:'xièxie',    meaning:'terima kasih',          theme:'greetings', example:{ sentence:'谢谢你的帮助！', pinyin:'Xièxie nǐ de bāngzhù!', meaning:'Terima kasih atas bantuanmu!' } },
    { word:'不客气',   pinyin:'bù kèqi',   meaning:'sama-sama',             theme:'greetings', example:{ sentence:'A: 谢谢！B: 不客气！', pinyin:'A: Xièxie! B: Bù kèqi!', meaning:'A: Terima kasih! B: Sama-sama!' } },
    { word:'对不起',   pinyin:'duìbuqǐ',   meaning:'maaf',                  theme:'greetings', example:{ sentence:'对不起，我迟到了。', pinyin:'Duìbuqǐ, wǒ chídào le.', meaning:'Maaf, saya terlambat.' } },
    { word:'没关系',   pinyin:'méiguānxi', meaning:'tidak apa-apa',         theme:'greetings', example:{ sentence:'没关系，没事的！', pinyin:'Méiguānxi, méi shì de!', meaning:'Tidak apa-apa, tidak masalah!' } },
    { word:'再见',     pinyin:'zàijiàn',   meaning:'sampai jumpa',          theme:'greetings', example:{ sentence:'明天再见！', pinyin:'Míngtiān zàijiàn!', meaning:'Sampai jumpa besok!' } },
    { word:'早上好',   pinyin:'zǎoshang hǎo', meaning:'selamat pagi',     theme:'greetings', example:{ sentence:'早上好！今天天气很好。', pinyin:'Zǎoshang hǎo! Jīntiān tiānqì hěn hǎo.', meaning:'Selamat pagi! Cuaca hari ini bagus.' } },
    { word:'晚上好',   pinyin:'wǎnshang hǎo', meaning:'selamat malam',   theme:'greetings', example:{ sentence:'晚上好，你吃饭了吗？', pinyin:'Wǎnshang hǎo, nǐ chī fàn le ma?', meaning:'Selamat malam, sudah makan?' } },
    { word:'请问',     pinyin:'qǐng wèn',  meaning:'permisi/boleh tanya',   theme:'greetings', example:{ sentence:'请问，厕所在哪里？', pinyin:'Qǐng wèn, cèsuǒ zài nǎli?', meaning:'Permisi, di mana toiletnya?' } },
    // ── Family ──
    { word:'爷爷', pinyin:'yéye',   meaning:'kakek (dari ayah)',  theme:'family', example:{ sentence:'我爷爷很健康。', pinyin:'Wǒ yéye hěn jiànkāng.', meaning:'Kakekku sangat sehat.' } },
    { word:'奶奶', pinyin:'nǎinai', meaning:'nenek (dari ayah)',  theme:'family', example:{ sentence:'奶奶做饭很好吃。', pinyin:'Nǎinai zuò fàn hěn hǎochī.', meaning:'Masakan nenek sangat enak.' } },
    { word:'外公', pinyin:'wàigōng', meaning:'kakek (dari ibu)',  theme:'family', example:{ sentence:'我去看外公。', pinyin:'Wǒ qù kàn wàigōng.', meaning:'Saya pergi mengunjungi kakek.' } },
    { word:'外婆', pinyin:'wàipó',  meaning:'nenek (dari ibu)',   theme:'family', example:{ sentence:'外婆爱我们。', pinyin:'Wàipó ài wǒmen.', meaning:'Nenek menyayangi kami.' } },
    { word:'叔叔', pinyin:'shūshu', meaning:'paman (adik ayah)',  theme:'family', example:{ sentence:'叔叔来了。', pinyin:'Shūshu lái le.', meaning:'Paman sudah datang.' } },
    { word:'阿姨', pinyin:'āyí',    meaning:'tante (kakak/adik ibu)', theme:'family', example:{ sentence:'阿姨很漂亮。', pinyin:'Āyí hěn piàoliang.', meaning:'Tantenya sangat cantik.' } },
    { word:'表哥', pinyin:'biǎogē', meaning:'sepupu laki-laki (lebih tua)', theme:'family', example:{ sentence:'我表哥在北京。', pinyin:'Wǒ biǎogē zài Běijīng.', meaning:'Sepupu laki-lakiku ada di Beijing.' } },
    { word:'结婚', pinyin:'jiéhūn', meaning:'menikah',            theme:'family', example:{ sentence:'他们结婚了。', pinyin:'Tāmen jiéhūn le.', meaning:'Mereka sudah menikah.' } },
    // ── Food ──
    { word:'早饭', pinyin:'zǎofàn',   meaning:'sarapan',          theme:'food', example:{ sentence:'吃早饭了吗？', pinyin:'Chī zǎofàn le ma?', meaning:'Sudah sarapan?' } },
    { word:'午饭', pinyin:'wǔfàn',    meaning:'makan siang',      theme:'food', example:{ sentence:'中午吃午饭。', pinyin:'Zhōngwǔ chī wǔfàn.', meaning:'Makan siang di tengah hari.' } },
    { word:'晚饭', pinyin:'wǎnfàn',   meaning:'makan malam',      theme:'food', example:{ sentence:'我们一起吃晚饭。', pinyin:'Wǒmen yīqǐ chī wǎnfàn.', meaning:'Kita makan malam bersama.' } },
    { word:'米饭', pinyin:'mǐfàn',    meaning:'nasi putih',        theme:'food', example:{ sentence:'一碗米饭。', pinyin:'Yī wǎn mǐfàn.', meaning:'Sesangkir nasi.' } },
    { word:'面包', pinyin:'miànbāo',  meaning:'roti',              theme:'food', example:{ sentence:'吃面包。', pinyin:'Chī miànbāo.', meaning:'Makan roti.' } },
    { word:'牛奶', pinyin:'niúnǎi',   meaning:'susu sapi',         theme:'food', example:{ sentence:'喝牛奶。', pinyin:'Hē niúnǎi.', meaning:'Minum susu.' } },
    { word:'咖啡', pinyin:'kāfēi',    meaning:'kopi',              theme:'food', example:{ sentence:'一杯咖啡。', pinyin:'Yī bēi kāfēi.', meaning:'Segelas kopi.' } },
    { word:'啤酒', pinyin:'píjiǔ',    meaning:'bir',               theme:'food', example:{ sentence:'喝啤酒。', pinyin:'Hē píjiǔ.', meaning:'Minum bir.' } },
    { word:'饺子', pinyin:'jiǎozi',   meaning:'pangsit/dimsum',    theme:'food', example:{ sentence:'吃饺子。', pinyin:'Chī jiǎozi.', meaning:'Makan pangsit.' } },
    { word:'汤',   pinyin:'tāng',     meaning:'sup/kuah',          theme:'food', example:{ sentence:'喝汤。', pinyin:'Hē tāng.', meaning:'Minum sup.' } },
    { word:'好吃', pinyin:'hǎochī',   meaning:'enak (makanan)',    theme:'food', example:{ sentence:'这个很好吃！', pinyin:'Zhège hěn hǎochī!', meaning:'Ini sangat enak!' } },
    { word:'难吃', pinyin:'nánchī',   meaning:'tidak enak',        theme:'food', example:{ sentence:'这个有点难吃。', pinyin:'Zhège yǒudiǎn nánchī.', meaning:'Ini agak tidak enak.' } },
    // ── Time ──
    { word:'星期一',  pinyin:'xīngqīyī',   meaning:'Senin',        theme:'time', example:{ sentence:'星期一上班。', pinyin:'Xīngqīyī shàngbān.', meaning:'Senin masuk kerja.' } },
    { word:'星期二',  pinyin:'xīngqīèr',   meaning:'Selasa',       theme:'time', example:{ sentence:'星期二开会。', pinyin:'Xīngqīèr kāihuì.', meaning:'Selasa ada rapat.' } },
    { word:'星期三',  pinyin:'xīngqīsān',  meaning:'Rabu',         theme:'time', example:{ sentence:'星期三休息。', pinyin:'Xīngqīsān xiūxi.', meaning:'Rabu libur.' } },
    { word:'星期四',  pinyin:'xīngqīsì',   meaning:'Kamis',        theme:'time', example:{ sentence:'星期四学习。', pinyin:'Xīngqīsì xuéxí.', meaning:'Kamis belajar.' } },
    { word:'星期五',  pinyin:'xīngqīwǔ',   meaning:'Jumat',        theme:'time', example:{ sentence:'星期五放假。', pinyin:'Xīngqīwǔ fàngjià.', meaning:'Jumat hari libur.' } },
    { word:'星期六',  pinyin:'xīngqīliù',  meaning:'Sabtu',        theme:'time', example:{ sentence:'星期六出去玩。', pinyin:'Xīngqīliù chūqu wán.', meaning:'Sabtu jalan-jalan.' } },
    { word:'星期天',  pinyin:'xīngqītiān', meaning:'Minggu',       theme:'time', example:{ sentence:'星期天在家。', pinyin:'Xīngqītiān zài jiā.', meaning:'Minggu di rumah.' } },
    { word:'春天', pinyin:'chūntiān', meaning:'musim semi', theme:'time', example:{ sentence:'春天很美。', pinyin:'Chūntiān hěn měi.', meaning:'Musim semi sangat indah.' } },
    { word:'夏天', pinyin:'xiàtiān',  meaning:'musim panas',theme:'time', example:{ sentence:'夏天很热。', pinyin:'Xiàtiān hěn rè.', meaning:'Musim panas sangat panas.' } },
    { word:'秋天', pinyin:'qiūtiān',  meaning:'musim gugur',theme:'time', example:{ sentence:'秋天的叶子很好看。', pinyin:'Qiūtiān de yèzi hěn hǎokàn.', meaning:'Daun musim gugur sangat indah.' } },
    { word:'冬天', pinyin:'dōngtiān', meaning:'musim dingin',theme:'time', example:{ sentence:'冬天很冷。', pinyin:'Dōngtiān hěn lěng.', meaning:'Musim dingin sangat dingin.' } },
    // ── Places ──
    { word:'图书馆', pinyin:'túshūguǎn', meaning:'perpustakaan', theme:'places', example:{ sentence:'去图书馆学习。', pinyin:'Qù túshūguǎn xuéxí.', meaning:'Pergi belajar di perpustakaan.' } },
    { word:'餐厅',   pinyin:'cāntīng',   meaning:'restoran',      theme:'places', example:{ sentence:'在餐厅吃饭。', pinyin:'Zài cāntīng chī fàn.', meaning:'Makan di restoran.' } },
    { word:'银行',   pinyin:'yínháng',   meaning:'bank',          theme:'places', example:{ sentence:'去银行取钱。', pinyin:'Qù yínháng qǔ qián.', meaning:'Pergi ke bank mengambil uang.' } },
    { word:'邮局',   pinyin:'yóujú',     meaning:'kantor pos',    theme:'places', example:{ sentence:'去邮局寄信。', pinyin:'Qù yóujú jì xìn.', meaning:'Pergi ke kantor pos kirim surat.' } },
    { word:'电影院', pinyin:'diànyǐngyuàn', meaning:'bioskop',    theme:'places', example:{ sentence:'去电影院看电影。', pinyin:'Qù diànyǐngyuàn kàn diànyǐng.', meaning:'Pergi ke bioskop nonton film.' } },
    { word:'酒店',   pinyin:'jiǔdiàn',   meaning:'hotel',         theme:'places', example:{ sentence:'住在酒店。', pinyin:'Zhù zài jiǔdiàn.', meaning:'Menginap di hotel.' } },
    { word:'火车站', pinyin:'huǒchēzhàn', meaning:'stasiun kereta', theme:'places', example:{ sentence:'在火车站等你。', pinyin:'Zài huǒchēzhàn děng nǐ.', meaning:'Menunggu kamu di stasiun.' } },
    // ── Transport ──
    { word:'公共汽车',pinyin:'gōnggòng qìchē', meaning:'bus umum', theme:'transport', example:{ sentence:'坐公共汽车去。', pinyin:'Zuò gōnggòng qìchē qù.', meaning:'Naik bus umum pergi ke sana.' } },
    { word:'出租车', pinyin:'chūzūchē',   meaning:'taksi',         theme:'transport', example:{ sentence:'打出租车。', pinyin:'Dǎ chūzūchē.', meaning:'Naik taksi.' } },
    { word:'自行车', pinyin:'zìxíngchē',  meaning:'sepeda',        theme:'transport', example:{ sentence:'骑自行车去。', pinyin:'Qí zìxíngchē qù.', meaning:'Pergi naik sepeda.' } },
    { word:'摩托车', pinyin:'mótuōchē',   meaning:'sepeda motor',  theme:'transport', example:{ sentence:'骑摩托车。', pinyin:'Qí mótuōchē.', meaning:'Naik motor.' } },
    { word:'火车',   pinyin:'huǒchē',     meaning:'kereta api',    theme:'transport', example:{ sentence:'坐火车去北京。', pinyin:'Zuò huǒchē qù Běijīng.', meaning:'Naik kereta ke Beijing.' } },
    { word:'船',     pinyin:'chuán',      meaning:'kapal/perahu',  theme:'transport', example:{ sentence:'坐船过去。', pinyin:'Zuò chuán guòqù.', meaning:'Pergi dengan naik kapal.' } },
    // ── Shopping ──
    { word:'多少钱', pinyin:'duōshao qián', meaning:'berapa harganya', theme:'shopping', example:{ sentence:'这个多少钱？', pinyin:'Zhège duōshao qián?', meaning:'Ini berapa harganya?' } },
    { word:'打折',   pinyin:'dǎzhé',  meaning:'diskon',           theme:'shopping', example:{ sentence:'现在打折。', pinyin:'Xiànzài dǎzhé.', meaning:'Sekarang ada diskon.' } },
    { word:'收据',   pinyin:'shōujù', meaning:'kwitansi/struk',   theme:'shopping', example:{ sentence:'要收据吗？', pinyin:'Yào shōujù ma?', meaning:'Mau kwitansi?' } },
    { word:'衣服',   pinyin:'yīfu',   meaning:'pakaian/baju',     theme:'shopping', example:{ sentence:'买新衣服。', pinyin:'Mǎi xīn yīfu.', meaning:'Membeli baju baru.' } },
    { word:'鞋子',   pinyin:'xiézi',  meaning:'sepatu',           theme:'shopping', example:{ sentence:'这双鞋子。', pinyin:'Zhè shuāng xiézi.', meaning:'Sepatu ini (sepasang).' } },
    { word:'包',     pinyin:'bāo',    meaning:'tas',              theme:'shopping', example:{ sentence:'这个包很好看。', pinyin:'Zhège bāo hěn hǎokàn.', meaning:'Tas ini sangat bagus.' } },
    // ── Weather ──
    { word:'晴天', pinyin:'qíngtiān', meaning:'hari cerah',       theme:'weather', example:{ sentence:'今天是晴天。', pinyin:'Jīntiān shì qíngtiān.', meaning:'Hari ini hari cerah.' } },
    { word:'阴天', pinyin:'yīntiān',  meaning:'hari mendung',     theme:'weather', example:{ sentence:'阴天出门要带伞。', pinyin:'Yīntiān chūmén yào dài sǎn.', meaning:'Hari mendung keluar harus bawa payung.' } },
    { word:'雷',   pinyin:'léi',      meaning:'petir/guntur',     theme:'weather', example:{ sentence:'打雷了！', pinyin:'Dǎ léi le!', meaning:'Ada petir!' } },
    { word:'雪',   pinyin:'xuě',      meaning:'salju',            theme:'weather', example:{ sentence:'下雪了！', pinyin:'Xià xuě le!', meaning:'Turun salju!' } },
    { word:'温度', pinyin:'wēndù',    meaning:'suhu/temperatur',  theme:'weather', example:{ sentence:'今天温度是多少？', pinyin:'Jīntiān wēndù shì duōshao?', meaning:'Suhu hari ini berapa?' } },
    { word:'凉快', pinyin:'liángkuai', meaning:'sejuk/segar',     theme:'weather', example:{ sentence:'秋天很凉快。', pinyin:'Qiūtiān hěn liángkuai.', meaning:'Musim gugur sangat sejuk.' } },
    // ── Body & Health ──
    { word:'医生', pinyin:'yīshēng',  meaning:'dokter',           theme:'body', example:{ sentence:'看医生。', pinyin:'Kàn yīshēng.', meaning:'Pergi ke dokter.' } },
    { word:'护士', pinyin:'hùshi',    meaning:'perawat',          theme:'body', example:{ sentence:'护士很忙。', pinyin:'Hùshi hěn máng.', meaning:'Perawatnya sangat sibuk.' } },
    { word:'头疼', pinyin:'tóuténg',  meaning:'sakit kepala',     theme:'body', example:{ sentence:'我头疼。', pinyin:'Wǒ tóuténg.', meaning:'Kepala saya sakit.' } },
    { word:'发烧', pinyin:'fāshāo',   meaning:'demam',            theme:'body', example:{ sentence:'我发烧了。', pinyin:'Wǒ fāshāo le.', meaning:'Saya demam.' } },
    { word:'咳嗽', pinyin:'késou',    meaning:'batuk',            theme:'body', example:{ sentence:'我咳嗽了。', pinyin:'Wǒ késou le.', meaning:'Saya batuk.' } },
    { word:'药',   pinyin:'yào',      meaning:'obat',             theme:'body', example:{ sentence:'吃药。', pinyin:'Chī yào.', meaning:'Minum obat.' } },
    { word:'健康', pinyin:'jiànkāng', meaning:'sehat/kesehatan',  theme:'body', example:{ sentence:'身体健康。', pinyin:'Shēntǐ jiànkāng.', meaning:'Tubuh sehat.' } },
    // ── School ──
    { word:'作业',   pinyin:'zuòyè',    meaning:'PR/pekerjaan rumah', theme:'school', example:{ sentence:'做作业。', pinyin:'Zuò zuòyè.', meaning:'Mengerjakan PR.' } },
    { word:'考试',   pinyin:'kǎoshì',   meaning:'ujian/tes',         theme:'school', example:{ sentence:'明天考试。', pinyin:'Míngtiān kǎoshì.', meaning:'Besok ada ujian.' } },
    { word:'成绩',   pinyin:'chéngjì',  meaning:'nilai/prestasi',    theme:'school', example:{ sentence:'成绩很好。', pinyin:'Chéngjì hěn hǎo.', meaning:'Nilainya sangat bagus.' } },
    { word:'教室',   pinyin:'jiàoshì',  meaning:'ruang kelas',       theme:'school', example:{ sentence:'在教室上课。', pinyin:'Zài jiàoshì shàngkè.', meaning:'Belajar di ruang kelas.' } },
    { word:'黑板',   pinyin:'hēibǎn',   meaning:'papan tulis',       theme:'school', example:{ sentence:'看黑板。', pinyin:'Kàn hēibǎn.', meaning:'Lihat papan tulis.' } },
    { word:'字典',   pinyin:'zìdiǎn',   meaning:'kamus',             theme:'school', example:{ sentence:'查字典。', pinyin:'Chá zìdiǎn.', meaning:'Mencari di kamus.' } },
    { word:'汉语',   pinyin:'Hànyǔ',    meaning:'Bahasa Mandarin (Tionghoa)', theme:'school', example:{ sentence:'学习汉语。', pinyin:'Xuéxí Hànyǔ.', meaning:'Belajar Bahasa Mandarin.' } },
    // ── Work ──
    { word:'公司',   pinyin:'gōngsī',   meaning:'perusahaan/kantor', theme:'work', example:{ sentence:'在公司上班。', pinyin:'Zài gōngsī shàngbān.', meaning:'Bekerja di perusahaan.' } },
    { word:'老板',   pinyin:'lǎobǎn',   meaning:'bos/atasan',        theme:'work', example:{ sentence:'老板很好。', pinyin:'Lǎobǎn hěn hǎo.', meaning:'Bosnya baik.' } },
    { word:'同事',   pinyin:'tóngshì',  meaning:'rekan kerja',       theme:'work', example:{ sentence:'我的同事。', pinyin:'Wǒ de tóngshì.', meaning:'Rekan kerja saya.' } },
    { word:'会议',   pinyin:'huìyì',    meaning:'rapat/pertemuan',   theme:'work', example:{ sentence:'开会议。', pinyin:'Kāi huìyì.', meaning:'Mengadakan rapat.' } },
    { word:'工资',   pinyin:'gōngzī',   meaning:'gaji/upah',         theme:'work', example:{ sentence:'发工资了！', pinyin:'Fā gōngzī le!', meaning:'Sudah gajian!' } },
    { word:'上班',   pinyin:'shàngbān', meaning:'masuk kerja',       theme:'work', example:{ sentence:'几点上班？', pinyin:'Jǐ diǎn shàngbān?', meaning:'Jam berapa masuk kerja?' } },
    { word:'下班',   pinyin:'xiàbān',   meaning:'pulang kerja',      theme:'work', example:{ sentence:'下班了！', pinyin:'Xiàbān le!', meaning:'Pulang kerja!' } },
    // ── Hobby ──
    { word:'电影',   pinyin:'diànyǐng', meaning:'film/bioskop',     theme:'hobby', example:{ sentence:'看电影。', pinyin:'Kàn diànyǐng.', meaning:'Nonton film.' } },
    { word:'音乐',   pinyin:'yīnyuè',   meaning:'musik',             theme:'hobby', example:{ sentence:'听音乐。', pinyin:'Tīng yīnyuè.', meaning:'Mendengarkan musik.' } },
    { word:'游戏',   pinyin:'yóuxì',    meaning:'permainan/game',    theme:'hobby', example:{ sentence:'玩游戏。', pinyin:'Wán yóuxì.', meaning:'Main game.' } },
    { word:'旅游',   pinyin:'lǚyóu',    meaning:'wisata/traveling',  theme:'hobby', example:{ sentence:'喜欢旅游。', pinyin:'Xǐhuan lǚyóu.', meaning:'Suka traveling.' } },
    { word:'运动',   pinyin:'yùndòng',  meaning:'olahraga',          theme:'hobby', example:{ sentence:'做运动。', pinyin:'Zuò yùndòng.', meaning:'Berolahraga.' } },
    { word:'摄影',   pinyin:'shèyǐng',  meaning:'fotografi',         theme:'hobby', example:{ sentence:'喜欢摄影。', pinyin:'Xǐhuan shèyǐng.', meaning:'Suka fotografi.' } },
    // ── Feelings ──
    { word:'高兴',   pinyin:'gāoxìng',  meaning:'senang/gembira',   theme:'feelings', example:{ sentence:'我很高兴！', pinyin:'Wǒ hěn gāoxìng!', meaning:'Saya sangat senang!' } },
    { word:'难过',   pinyin:'nánguò',   meaning:'sedih',             theme:'feelings', example:{ sentence:'我很难过。', pinyin:'Wǒ hěn nánguò.', meaning:'Saya sangat sedih.' } },
    { word:'生气',   pinyin:'shēngqì',  meaning:'marah',             theme:'feelings', example:{ sentence:'我很生气！', pinyin:'Wǒ hěn shēngqì!', meaning:'Saya sangat marah!' } },
    { word:'害怕',   pinyin:'hàipà',    meaning:'takut',             theme:'feelings', example:{ sentence:'我有点害怕。', pinyin:'Wǒ yǒudiǎn hàipà.', meaning:'Saya agak takut.' } },
    { word:'惊喜',   pinyin:'jīngxǐ',   meaning:'terkejut senang/kejutan', theme:'feelings', example:{ sentence:'给你一个惊喜！', pinyin:'Gěi nǐ yī gè jīngxǐ!', meaning:'Memberimu sebuah kejutan!' } },
    { word:'满意',   pinyin:'mǎnyì',    meaning:'puas/memuaskan',    theme:'feelings', example:{ sentence:'我很满意。', pinyin:'Wǒ hěn mǎnyì.', meaning:'Saya sangat puas.' } },
    { word:'担心',   pinyin:'dānxīn',   meaning:'khawatir',          theme:'feelings', example:{ sentence:'不要担心！', pinyin:'Bù yào dānxīn!', meaning:'Jangan khawatir!' } },
    // ── Colors ──
    { word:'红色', pinyin:'hóngsè',  meaning:'merah',    theme:'colors', example:{ sentence:'红色的衣服。', pinyin:'Hóngsè de yīfu.', meaning:'Baju berwarna merah.' } },
    { word:'蓝色', pinyin:'lánsè',   meaning:'biru',     theme:'colors', example:{ sentence:'蓝色的天空。', pinyin:'Lánsè de tiānkōng.', meaning:'Langit berwarna biru.' } },
    { word:'绿色', pinyin:'lǜsè',    meaning:'hijau',    theme:'colors', example:{ sentence:'绿色的草。', pinyin:'Lǜsè de cǎo.', meaning:'Rumput berwarna hijau.' } },
    { word:'黄色', pinyin:'huángsè', meaning:'kuning',   theme:'colors', example:{ sentence:'黄色的太阳。', pinyin:'Huángsè de tàiyáng.', meaning:'Matahari berwarna kuning.' } },
    { word:'白色', pinyin:'báisè',   meaning:'putih',    theme:'colors', example:{ sentence:'白色的雪。', pinyin:'Báisè de xuě.', meaning:'Salju berwarna putih.' } },
    { word:'黑色', pinyin:'hēisè',   meaning:'hitam',    theme:'colors', example:{ sentence:'黑色的夜晚。', pinyin:'Hēisè de yèwǎn.', meaning:'Malam berwarna hitam.' } },
    { word:'粉色', pinyin:'fěnsè',   meaning:'merah muda/pink', theme:'colors', example:{ sentence:'粉色的花。', pinyin:'Fěnsè de huā.', meaning:'Bunga berwarna pink.' } },
    // ── Numbers ──
    { word:'零',   pinyin:'líng',    meaning:'nol',           theme:'numbers', example:{ sentence:'零度。', pinyin:'Líng dù.', meaning:'Nol derajat.' } },
    { word:'万',   pinyin:'wàn',     meaning:'sepuluh ribu',  theme:'numbers', example:{ sentence:'一万块。', pinyin:'Yī wàn kuài.', meaning:'Sepuluh ribu yuan.' } },
    { word:'亿',   pinyin:'yì',      meaning:'seratus juta',  theme:'numbers', example:{ sentence:'十亿人口。', pinyin:'Shí yì rénkǒu.', meaning:'Satu miliar penduduk.' } },
    { word:'半',   pinyin:'bàn',     meaning:'setengah',      theme:'numbers', example:{ sentence:'三点半。', pinyin:'Sān diǎn bàn.', meaning:'Pukul setengah empat.' } },
    { word:'第一', pinyin:'dì yī',   meaning:'pertama',       theme:'numbers', example:{ sentence:'我是第一。', pinyin:'Wǒ shì dì yī.', meaning:'Saya yang pertama.' } },
    { word:'一些', pinyin:'yīxiē',   meaning:'beberapa',      theme:'numbers', example:{ sentence:'一些人。', pinyin:'Yīxiē rén.', meaning:'Beberapa orang.' } },
    { word:'很多', pinyin:'hěn duō', meaning:'banyak sekali', theme:'numbers', example:{ sentence:'很多人来了。', pinyin:'Hěn duō rén lái le.', meaning:'Banyak sekali orang datang.' } },
  ];

  function getByTheme(themeId) {
    return vocab.filter(v => v.theme === themeId);
  }

  function getTheme(themeId) {
    return themes.find(t => t.id === themeId) || null;
  }

  function search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return vocab.filter(v =>
      v.word.includes(q) ||
      v.pinyin.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q)
    );
  }

  return { themes, vocab, getByTheme, getTheme, search };
})();

window.ZhVocabData = ZhVocabData;
