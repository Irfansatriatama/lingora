/**
 * Lingora — Data Dialog Bahasa Mandarin
 * Format: situasi, percakapan A/B, pinyin, terjemahan, kosakata kunci
 * Fase 17
 */
const ZH_DIALOGS = [
  {
    id: 'restaurant',
    situasi: 'Di Restoran',
    icon: '🍜',
    level: 'HSK1',
    deskripsi: 'Percakapan saat memesan makanan di restoran Tiongkok.',
    lines: [
      {
        speaker: 'A',
        zh: '你好，我想点菜。',
        pinyin: 'Nǐ hǎo, wǒ xiǎng diǎn cài.',
        id: 'Halo, saya ingin memesan makanan.'
      },
      {
        speaker: 'B',
        zh: '好的，请问您要什么？',
        pinyin: 'Hǎo de, qǐngwèn nín yào shénme?',
        id: 'Baik, boleh tanya Anda mau apa?'
      },
      {
        speaker: 'A',
        zh: '我要一碗牛肉面和一杯茶。',
        pinyin: 'Wǒ yào yī wǎn niúròu miàn hé yī bēi chá.',
        id: 'Saya mau semangkuk mie daging sapi dan setangkup teh.'
      },
      {
        speaker: 'B',
        zh: '要辣的吗？',
        pinyin: 'Yào là de ma?',
        id: 'Mau yang pedas?'
      },
      {
        speaker: 'A',
        zh: '不要太辣，谢谢。',
        pinyin: 'Bù yào tài là, xièxie.',
        id: 'Tidak perlu terlalu pedas, terima kasih.'
      },
      {
        speaker: 'B',
        zh: '好，请稍等。',
        pinyin: 'Hǎo, qǐng shāo děng.',
        id: 'Baik, tolong tunggu sebentar.'
      },
      {
        speaker: 'A',
        zh: '服务员，买单！',
        pinyin: 'Fúwùyuán, mǎidān!',
        id: 'Pelayan, minta tagihannya!'
      },
      {
        speaker: 'B',
        zh: '一共八十块。',
        pinyin: 'Yīgòng bāshí kuài.',
        id: 'Totalnya 80 yuan.'
      }
    ],
    vocab: [
      { zh: '点菜', pinyin: 'diǎn cài', id: 'memesan makanan' },
      { zh: '一碗', pinyin: 'yī wǎn', id: 'semangkuk' },
      { zh: '辣', pinyin: 'là', id: 'pedas' },
      { zh: '稍等', pinyin: 'shāo děng', id: 'tunggu sebentar' },
      { zh: '服务员', pinyin: 'fúwùyuán', id: 'pelayan' },
      { zh: '买单', pinyin: 'mǎidān', id: 'minta tagihan' },
      { zh: '一共', pinyin: 'yīgòng', id: 'total / semuanya' }
    ]
  },
  {
    id: 'selfintro',
    situasi: 'Berkenalan',
    icon: '🤝',
    level: 'HSK1',
    deskripsi: 'Cara memperkenalkan diri dalam bahasa Mandarin.',
    lines: [
      {
        speaker: 'A',
        zh: '你好！我叫安迪，很高兴认识你。',
        pinyin: 'Nǐ hǎo! Wǒ jiào Āndì, hěn gāoxìng rènshi nǐ.',
        id: 'Halo! Nama saya Andi, senang berkenalan dengan kamu.'
      },
      {
        speaker: 'B',
        zh: '你好！我叫李明。你是哪国人？',
        pinyin: 'Nǐ hǎo! Wǒ jiào Lǐ Míng. Nǐ shì nǎ guó rén?',
        id: 'Halo! Nama saya Li Ming. Kamu orang mana?'
      },
      {
        speaker: 'A',
        zh: '我是印度尼西亚人。你呢？',
        pinyin: 'Wǒ shì Yìndùníxīyà rén. Nǐ ne?',
        id: 'Saya orang Indonesia. Kalau kamu?'
      },
      {
        speaker: 'B',
        zh: '我是中国人，来自上海。你会说中文吗？',
        pinyin: 'Wǒ shì Zhōngguó rén, láizì Shànghǎi. Nǐ huì shuō Zhōngwén ma?',
        id: 'Saya orang China, dari Shanghai. Kamu bisa berbahasa Mandarin?'
      },
      {
        speaker: 'A',
        zh: '我在学中文，还不太好。',
        pinyin: 'Wǒ zài xué Zhōngwén, hái bú tài hǎo.',
        id: 'Saya sedang belajar Mandarin, masih belum begitu bagus.'
      },
      {
        speaker: 'B',
        zh: '说得很好！加油！',
        pinyin: 'Shuō de hěn hǎo! Jiāyóu!',
        id: 'Sudah bagus sekali! Semangat!'
      },
      {
        speaker: 'A',
        zh: '谢谢你！我们交换一下微信吧。',
        pinyin: 'Xièxie nǐ! Wǒmen jiāohuàn yīxià Wēixìn ba.',
        id: 'Terima kasih! Kita tukar WeChat ya.'
      },
      {
        speaker: 'B',
        zh: '好啊！',
        pinyin: 'Hǎo a!',
        id: 'Oke!'
      }
    ],
    vocab: [
      { zh: '很高兴认识你', pinyin: 'hěn gāoxìng rènshi nǐ', id: 'senang berkenalan' },
      { zh: '哪国人', pinyin: 'nǎ guó rén', id: 'orang negara mana' },
      { zh: '来自', pinyin: 'láizì', id: 'berasal dari' },
      { zh: '在学', pinyin: 'zài xué', id: 'sedang belajar' },
      { zh: '加油', pinyin: 'jiāyóu', id: 'semangat' },
      { zh: '交换', pinyin: 'jiāohuàn', id: 'bertukar' }
    ]
  },
  {
    id: 'shopping',
    situasi: 'Berbelanja',
    icon: '🛍️',
    level: 'HSK2',
    deskripsi: 'Percakapan saat berbelanja dan menawar harga.',
    lines: [
      {
        speaker: 'A',
        zh: '这件衣服多少钱？',
        pinyin: 'Zhè jiàn yīfu duōshǎo qián?',
        id: 'Baju ini berapa harganya?'
      },
      {
        speaker: 'B',
        zh: '三百块。',
        pinyin: 'Sānbǎi kuài.',
        id: '300 yuan.'
      },
      {
        speaker: 'A',
        zh: '太贵了！能便宜一点吗？',
        pinyin: 'Tài guì le! Néng piányí yīdiǎn ma?',
        id: 'Terlalu mahal! Bisa lebih murah sedikit?'
      },
      {
        speaker: 'B',
        zh: '最低两百五。',
        pinyin: 'Zuìdī liǎngbǎi wǔ.',
        id: 'Minimal 250 yuan.'
      },
      {
        speaker: 'A',
        zh: '两百块吧，我买两件。',
        pinyin: 'Liǎngbǎi kuài ba, wǒ mǎi liǎng jiàn.',
        id: '200 yuan ya, saya beli dua.'
      },
      {
        speaker: 'B',
        zh: '好吧，成交！',
        pinyin: 'Hǎo ba, chéngjião!',
        id: 'Baiklah, deal!'
      },
      {
        speaker: 'A',
        zh: '可以用支付宝付款吗？',
        pinyin: 'Kěyǐ yòng Zhīfùbǎo fùkuǎn ma?',
        id: 'Bisa bayar pakai Alipay?'
      },
      {
        speaker: 'B',
        zh: '可以，扫这个二维码。',
        pinyin: 'Kěyǐ, sǎo zhège èrwéimǎ.',
        id: 'Bisa, scan QR code ini.'
      }
    ],
    vocab: [
      { zh: '多少钱', pinyin: 'duōshǎo qián', id: 'berapa harganya' },
      { zh: '太贵了', pinyin: 'tài guì le', id: 'terlalu mahal' },
      { zh: '便宜', pinyin: 'piányí', id: 'murah' },
      { zh: '最低', pinyin: 'zuìdī', id: 'harga terendah / minimal' },
      { zh: '成交', pinyin: 'chéngjião', id: 'deal / setuju' },
      { zh: '付款', pinyin: 'fùkuǎn', id: 'membayar' },
      { zh: '二维码', pinyin: 'èrwéimǎ', id: 'QR code' }
    ]
  },
  {
    id: 'directions',
    situasi: 'Menanyakan Arah',
    icon: '🗺️',
    level: 'HSK2',
    deskripsi: 'Cara bertanya dan memahami petunjuk arah dalam bahasa Mandarin.',
    lines: [
      {
        speaker: 'A',
        zh: '请问，地铁站怎么走？',
        pinyin: 'Qǐngwèn, dìtiě zhàn zěnme zǒu?',
        id: 'Permisi, bagaimana cara ke stasiun metro?'
      },
      {
        speaker: 'B',
        zh: '一直走，然后在路口左转。',
        pinyin: 'Yīzhí zǒu, ránhòu zài lùkǒu zuǒ zhuǎn.',
        id: 'Jalan lurus, lalu belok kiri di persimpangan.'
      },
      {
        speaker: 'A',
        zh: '走路要多长时间？',
        pinyin: 'Zǒulù yào duō cháng shíjiān?',
        id: 'Butuh berapa lama berjalan kaki?'
      },
      {
        speaker: 'B',
        zh: '大概十分钟。过了那个红绿灯就到了。',
        pinyin: 'Dàgài shí fēnzhōng. Guòle nàge hónglǜdēng jiù dào le.',
        id: 'Sekitar 10 menit. Setelah melewati lampu merah itu sudah sampai.'
      },
      {
        speaker: 'A',
        zh: '好的，非常感谢！',
        pinyin: 'Hǎo de, fēicháng gǎnxiè!',
        id: 'Baik, terima kasih banyak!'
      },
      {
        speaker: 'B',
        zh: '不客气，慢走！',
        pinyin: 'Bù kèqi, màn zǒu!',
        id: 'Sama-sama, hati-hati!'
      }
    ],
    vocab: [
      { zh: '怎么走', pinyin: 'zěnme zǒu', id: 'bagaimana caranya pergi' },
      { zh: '一直走', pinyin: 'yīzhí zǒu', id: 'jalan lurus terus' },
      { zh: '路口', pinyin: 'lùkǒu', id: 'persimpangan' },
      { zh: '左/右转', pinyin: 'zuǒ/yòu zhuǎn', id: 'belok kiri/kanan' },
      { zh: '红绿灯', pinyin: 'hónglǜdēng', id: 'lampu lalu lintas' },
      { zh: '大概', pinyin: 'dàgài', id: 'kira-kira / sekitar' },
      { zh: '不客气', pinyin: 'bù kèqi', id: 'sama-sama' }
    ]
  },
  {
    id: 'hospital',
    situasi: 'Di Dokter',
    icon: '🏥',
    level: 'HSK2',
    deskripsi: 'Berkomunikasi dengan dokter saat sakit.',
    lines: [
      {
        speaker: 'A',
        zh: '医生，我肚子很痛。',
        pinyin: 'Yīshēng, wǒ dùzi hěn tòng.',
        id: 'Dokter, perut saya sangat sakit.'
      },
      {
        speaker: 'B',
        zh: '从什么时候开始痛的？',
        pinyin: 'Cóng shénme shíhòu kāishǐ tòng de?',
        id: 'Sejak kapan mulai sakit?'
      },
      {
        speaker: 'A',
        zh: '昨天晚上开始的。还有点发烧。',
        pinyin: 'Zuótiān wǎnshàng kāishǐ de. Hái yǒudiǎn fāshāo.',
        id: 'Mulai dari tadi malam. Juga sedikit demam.'
      },
      {
        speaker: 'B',
        zh: '最近吃了什么特别的东西吗？',
        pinyin: 'Zuìjìn chīle shénme tèbié de dōngxi ma?',
        id: 'Baru-baru ini apakah makan sesuatu yang aneh?'
      },
      {
        speaker: 'A',
        zh: '昨天在外面吃了海鲜。',
        pinyin: 'Zuótiān zài wàimiàn chīle hǎixiān.',
        id: 'Kemarin makan makanan laut di luar.'
      },
      {
        speaker: 'B',
        zh: '可能是食物中毒。我给你开点药，好好休息。',
        pinyin: 'Kěnéng shì shíwù zhòngdú. Wǒ gěi nǐ kāi diǎn yào, hǎohǎo xiūxi.',
        id: 'Kemungkinan keracunan makanan. Saya resepkan obat, istirahat yang cukup.'
      },
      {
        speaker: 'A',
        zh: '谢谢医生。需要住院吗？',
        pinyin: 'Xièxie yīshēng. Xūyào zhùyuàn ma?',
        id: 'Terima kasih, Dokter. Perlu rawat inap?'
      },
      {
        speaker: 'B',
        zh: '不需要，回去多喝水，三天后复查。',
        pinyin: 'Bù xūyào, huíqù duō hē shuǐ, sān tiān hòu fùchá.',
        id: 'Tidak perlu, pulang banyak minum air, kontrol lagi tiga hari lagi.'
      }
    ],
    vocab: [
      { zh: '肚子痛', pinyin: 'dùzi tòng', id: 'sakit perut' },
      { zh: '发烧', pinyin: 'fāshāo', id: 'demam' },
      { zh: '海鲜', pinyin: 'hǎixiān', id: 'makanan laut' },
      { zh: '食物中毒', pinyin: 'shíwù zhòngdú', id: 'keracunan makanan' },
      { zh: '开药', pinyin: 'kāi yào', id: 'meresepkan obat' },
      { zh: '住院', pinyin: 'zhùyuàn', id: 'rawat inap' },
      { zh: '复查', pinyin: 'fùchá', id: 'kontrol ulang' }
    ]
  },
  {
    id: 'workplace',
    situasi: 'Di Tempat Kerja',
    icon: '💼',
    level: 'HSK3',
    deskripsi: 'Percakapan profesional di lingkungan kerja.',
    lines: [
      {
        speaker: 'A',
        zh: '王经理，这是我准备的报告，请您看一下。',
        pinyin: 'Wáng jīnglǐ, zhè shì wǒ zhǔnbèi de bàogào, qǐng nín kàn yīxià.',
        id: 'Manajer Wang, ini laporan yang saya siapkan, mohon dilihat.'
      },
      {
        speaker: 'B',
        zh: '好的，你什么时候需要回复？',
        pinyin: 'Hǎo de, nǐ shénme shíhòu xūyào huífù?',
        id: 'Baik, kapan kamu butuh balasannya?'
      },
      {
        speaker: 'A',
        zh: '下午三点前可以吗？有个会议需要用到。',
        pinyin: 'Xiàwǔ sān diǎn qián kěyǐ ma? Yǒu gè huìyì xūyào yòng dào.',
        id: 'Bisakah sebelum jam 3 sore? Ada rapat yang membutuhkannya.'
      },
      {
        speaker: 'B',
        zh: '没问题，我两点之前看完。这个项目进展怎么样？',
        pinyin: 'Méi wèntí, wǒ liǎng diǎn zhīqián kàn wán. Zhège xiàngmù jìnzhǎn zěnmeyàng?',
        id: 'Tidak masalah, saya akan selesai sebelum jam 2. Bagaimana perkembangan proyek ini?'
      },
      {
        speaker: 'A',
        zh: '进展顺利，预计下周可以完成。',
        pinyin: 'Jìnzhǎn shùnlì, yùjì xià zhōu kěyǐ wánchéng.',
        id: 'Perkembangannya lancar, diperkirakan bisa selesai minggu depan.'
      },
      {
        speaker: 'B',
        zh: '很好，有什么困难记得告诉我。',
        pinyin: 'Hěn hǎo, yǒu shénme kùnnán jìde gàosu wǒ.',
        id: 'Bagus, kalau ada kesulitan ingat untuk beritahu saya.'
      }
    ],
    vocab: [
      { zh: '经理', pinyin: 'jīnglǐ', id: 'manajer' },
      { zh: '报告', pinyin: 'bàogào', id: 'laporan' },
      { zh: '回复', pinyin: 'huífù', id: 'membalas / merespons' },
      { zh: '项目', pinyin: 'xiàngmù', id: 'proyek' },
      { zh: '进展', pinyin: 'jìnzhǎn', id: 'perkembangan' },
      { zh: '顺利', pinyin: 'shùnlì', id: 'lancar' },
      { zh: '预计', pinyin: 'yùjì', id: 'diperkirakan' }
    ]
  },
  {
    id: 'phone',
    situasi: 'Percakapan Telepon',
    icon: '📞',
    level: 'HSK3',
    deskripsi: 'Berkomunikasi melalui telepon secara formal dalam bahasa Mandarin.',
    lines: [
      {
        speaker: 'B',
        zh: '喂，您好，这里是明星公司。',
        pinyin: 'Wèi, nín hǎo, zhèlǐ shì Míngxīng Gōngsī.',
        id: 'Halo, selamat datang di Perusahaan Mingxing.'
      },
      {
        speaker: 'A',
        zh: '您好，我是安迪，请问李总在吗？',
        pinyin: 'Nín hǎo, wǒ shì Āndì, qǐngwèn Lǐ zǒng zài ma?',
        id: 'Halo, saya Andi, boleh tanya apakah Direktur Li ada?'
      },
      {
        speaker: 'B',
        zh: '他现在正在开会，方便留言吗？',
        pinyin: 'Tā xiànzài zhèngzài kāihuì, fāngbiàn liúyán ma?',
        id: 'Beliau sedang rapat sekarang, bisa tinggalkan pesan?'
      },
      {
        speaker: 'A',
        zh: '好的，请转告他，关于明天的合同签署，我们可以确认了。',
        pinyin: 'Hǎo de, qǐng zhuǎngào tā, guānyú míngtiān de hétong qiānshǔ, wǒmen kěyǐ quèrèn le.',
        id: 'Baik, tolong sampaikan, mengenai penandatanganan kontrak besok, kami sudah bisa konfirmasi.'
      },
      {
        speaker: 'B',
        zh: '好的，我一定转达。请留下您的联系方式。',
        pinyin: 'Hǎo de, wǒ yīdìng zhuǎndá. Qǐng liú xià nín de liánxì fāngshì.',
        id: 'Baik, pasti saya sampaikan. Tolong tinggalkan informasi kontak Anda.'
      },
      {
        speaker: 'A',
        zh: '我的手机号是一三八，零零一二，三四五六。',
        pinyin: 'Wǒ de shǒujī hào shì yāo sān bā, líng líng yāo èr, sān sì wǔ liù.',
        id: 'Nomor HP saya 138-0012-3456.'
      },
      {
        speaker: 'B',
        zh: '收到，我马上转告他。再见！',
        pinyin: 'Shōudào, wǒ mǎshàng zhuǎngào tā. Zàijiàn!',
        id: 'Diterima, saya segera sampaikan. Selamat tinggal!'
      }
    ],
    vocab: [
      { zh: '喂', pinyin: 'wèi', id: 'halo (di telepon)' },
      { zh: '正在开会', pinyin: 'zhèngzài kāihuì', id: 'sedang rapat' },
      { zh: '留言', pinyin: 'liúyán', id: 'meninggalkan pesan' },
      { zh: '转告', pinyin: 'zhuǎngào', id: 'menyampaikan pesan' },
      { zh: '合同', pinyin: 'hétong', id: 'kontrak' },
      { zh: '签署', pinyin: 'qiānshǔ', id: 'menandatangani' },
      { zh: '联系方式', pinyin: 'liánxì fāngshì', id: 'informasi kontak' }
    ]
  }
];

if (typeof module !== 'undefined') module.exports = ZH_DIALOGS;
