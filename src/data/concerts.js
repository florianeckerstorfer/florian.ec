const concerts = [
  {
    date: '2018-09-29',
    location: 'Waves Festival, WUK, Vienna',
    bands: [
      {
        name: 'Kids N Cats',
        image: '2018-09-29-waves-kids-n-cats',
        layout: 'portrait',
      },
      { name: 'Mascha', image: '2018-09-29-waves-mascha', layout: 'portrait' },
      { name: 'Nabihah Iqbal' },
      {
        name: 'Pom Poko',
        image: '2018-09-29-waves-pom-poko',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2018-09-28',
    location: 'Waves Festival, WUK, Vienna',
    bands: [
      {
        name: 'False Advertising',
        image: '2018-09-28-waves-false-advertising',
        layout: 'portrait',
      },
      {
        name: 'WWWater',
        image: '2018-09-28-waves-wwwater',
        layout: 'portrait',
      },
      { name: 'Kovacs', image: '2018-09-28-waves-kovacs', layout: 'landscape' },
    ],
  },
  {
    date: '2018-09-27',
    location: 'Waves Festival, WUK, Vienna',
    bands: [
      {
        name: 'Pauls Jets',
        image: '2018-09-27-waves-pauls-jets',
        layout: 'landscape',
      },
      {
        name: 'Cléa Vincent',
        image: '2018-09-27-waves-clea-vincent',
        layout: 'landscape',
      },
      {
        name: 'The Blind Suns',
        image: '2018-09-27-waves-the-blind-suns',
        layout: 'portrait',
      },
    ],
  },
  {
    date: '2018-04-27',
    location: 'Fluc, Vienna',
    bands: [
      {
        name: 'Wye Oak',
        image: '2018-04-27-wye-oak',
        layout: 'portrait',
      },
      {
        name: 'Suno Deko',
        image: '2018-04-27-suno-deko',
        layout: 'portrait',
      },
    ],
  },
  {
    date: '2018-04-15',
    location: 'Chelsea, Vienna',
    name: 'Sunflower Bean',
    image: '2018-04-15-sunflower-bean',
    layout: 'portrait',
  },
  {
    date: '2018-04-07',
    name: 'Nada Surf',
    location: 'Wuk, Vienna',
    image: '2018-04-07-nada-surf',
    layout: 'landscape',
  },
  {
    date: '2018-04-03',
    name: 'Braids',
    location: 'B72, Vienna',
    image: '2018-04-03-braids',
    layout: 'portrait',
  },
  {
    date: '2018-03-24',
    name: 'Mynth',
    location: 'Porgy & Bess, Vienna',
    image: '2018-03-24-mynth',
    layout: 'landscape',
  },
  {
    date: '2018-03-03',
    name: 'Alvvays',
    location: 'Flex, Vienna',
    image: '2018-03-03-alvvays',
    layout: 'landscape',
  },
  {
    date: '2018-03-01',
    location: 'Arena, Vienna',
    bands: [
      {
        name: 'Son Lux',
        image: '2018-03-01-son-lux',
        layout: 'landscape',
      },
      {
        name: 'Hanna Benn',
        image: '2018-03-01-hanna-benn',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2018-02-21',
    name: 'Ghostpoet',
    location: 'Flex, Vienna',
    image: '2018-02-21-ghostpoet',
    layout: 'portrait',
  },
  {
    date: '2018-02-19',
    image: '2018-02-19-fever-ray',
    name: 'Fever Ray',
    location: 'Gasometer, Vienna',
    layout: 'landscape',
  },
  {
    date: '2018-02-06',
    image: '2018-02-06-iron-wine',
    name: 'Iron & Wine',
    location: 'Wuk, Vienna',
    layout: 'landscape',
  },
  {
    date: '2018-02-06',
    image: '2018-02-06-half-waif',
    name: 'Half Waif',
    location: 'Wuk, Vienna',
    layout: 'landscape',
  },
  {
    date: '2018-01-26',
    location: 'JaJaJa Festival, Wuk, Vienna',
    bands: [
      {
        image: '2018-01-26-jajaja-velvet-volume',
        name: 'Velvet Volume',
        layout: 'landscape',
      },
      {
        image: '2018-01-26-jajaja-pom-poko',
        name: 'Pom Poko',
        layout: 'landscape',
      },
      {
        image: '2018-01-26-jajaja-goss',
        name: 'Goss',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2018-01-21',
    image: '2018-01-21-liima',
    name: 'Liima',
    location: 'B72, Vienna',
    layout: 'landscape-full',
  },
  {
    date: '2017-12-09',
    image: '2017-12-09-fm-belfast',
    name: 'FM Belfast',
    location: 'Grelle Forelle, Vienna',
    layout: 'landscape',
  },
  {
    location: 'Arena, Vienna',
    date: '2017-11-27',
    bands: [
      {
        image: '2017-11-27-emma-ruth-rundle',
        name: 'Emma Ruth Rundle',
        layout: 'landscape',
      },
      {
        image: '2017-11-27-jaye-jayle',
        name: 'Jaye Jayle',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2017-11-21',
    location: 'Fluc Wanne, Vienna',
    bands: [
      {
        image: '2017-11-21-zola-jesus',
        name: 'Zola Jesus',
        layout: 'landscape-full',
      },
      {
        image: '2017-11-21-devon-welsh',
        name: 'Devon Welsh',
        title: 'Devon Welsh at Fluc Wanne, Vienna on November 21, 2017',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2017-11-01',
    image: '2017-11-01-nick-cave',
    name: 'Nick Cave & The Bad Seeds',
    location: 'Stadthalle, Vienna',
    layout: 'landscape',
  },
  {
    date: '2017-10-12',
    image: '2017-10-12-ema',
    name: 'EMA',
    location: 'Arena, Vienna',
    layout: 'portrait',
  },
  {
    date: '2017-10-06',
    image: '2017-10-06-5k-hd',
    name: '5K HD',
    location: 'Wuk, Vienna',
    layout: 'landscape',
  },
  {
    date: '2017-10-02',
    image: '2017-10-02-diet-cig',
    name: 'Diet Cig',
    location: 'B72, Vienna',
    layout: 'portrait',
  },
  {
    date: '2017-09-30',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        image: '2017-09-30-waves-giungla',
        name: 'Giungla',
        layout: 'portrait',
      },
      {
        image: '2017-09-30-waves-birthhh',
        name: 'Birthhh',
        layout: 'landscape',
      },
      {
        image: '2017-09-30-waves-any-other',
        name: 'Any Other',
        layout: 'landscape',
      },
      {
        image: '2017-09-29-waves-est',
        name: 'E^ST',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2017-09-29',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        image: '2017-09-29-waves-lilly-among-clouds',
        name: 'lilly among clouds',
        layout: 'landscape',
      },
      {
        image: '2017-09-29-waves-gaddafi-gals',
        name: 'Gaddafi Gals',
        layout: 'landscape',
      },
      {
        date: '2017-09-29',
        image: '2017-09-29-waves-nite-jewel',
        name: 'Nite Jewel',
        layout: 'portrait',
      },
    ],
  },
  {
    date: '2017-09-28',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        image: '2017-09-28-waves-be-charlotte',
        name: 'Be Charlotte',
        layout: 'landscape',
      },
      {
        image: '2017-09-28-waves-little-big-sea',
        name: 'Little Big Sea',
        layout: 'landscape',
      },
      {
        image: '2017-09-28-waves-emily-roberts',
        name: 'Emily Roberts',
        layout: 'landscape',
      },
      {
        image: '2017-09-28-waves-tolstoys',
        name: 'Tolstoys',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2017-09-19',
    location: 'Arena, Vienna',
    bands: [
      {
        image: '2017-09-19-chastity-belt',
        name: 'Chastity Belt',
        layout: 'landscape-full',
      },
      {
        date: '2017-09-19',
        image: '2017-09-19-waxahatchee',
        name: 'Waxahatchee',
        layout: 'landscape',
      },
      {
        date: '2017-09-19',
        image: '2017-09-19-magic-potion',
        name: 'Magic Potion',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2017-08-21',
    image: '2017-08-21-perfume-genius',
    name: 'Perfume Genius',
    location: 'Arena, Vienna',
    layout: 'landscape-full',
  },
  {
    date: '2017-07-18',
    image: '2017-07-18-of-montreal',
    name: 'of Montreal',
    location: 'Fluc Wanne, Vienna',
    layout: 'landscape',
  },
  {
    date: '2017-07-11',
    location: 'Ahoi! Festival, Linz',
    bands: [
      {
        image: '2017-07-11-arcade-fire',
        name: 'Arcade Fire',
        layout: 'landscape-full',
      },
      {
        image: '2017-07-11-timber-timbre',
        name: 'Timber Timbre',
        layout: 'landscape',
      },
      {
        image: '2017-07-11-get-well-soon',
        name: 'Get Well Soon',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2017-07-09',
    image: '2017-07-09-cat-power',
    name: 'Cat Power',
    location: 'Rosengarten am Pöstlingberg, Linz',
    layout: 'landscape',
  },
  {
    date: '2017-06-16',
    image: '2017-06-16-radiohead',
    name: 'Radiohead',
    location: 'Monza, Italy',
    layout: 'landscape-full',
  },
  {
    date: '2017-05-30',
    image: '2017-05-30-angel-olsen',
    name: 'Angel Olsen',
    location: 'Wuk, Vienna',
    layout: 'landscape',
  },
  {
    date: '2017-05-24',
    image: '2017-05-24-holly-herndon',
    name: 'Holy Herndon',
    location: 'Hyperreality, Schloss Neugebäude, Vienna',
    layout: 'landscape',
  },
  {
    date: '2017-04-29',
    location: 'Wuk, Vienna',
    bands: [
      {
        image: '2017-04-29-lisa-hannigan',
        name: 'Lisa Hannigan',
        layout: 'landscape',
      },
      {
        image: '2017-04-29-saint-sister',
        name: 'Saint Sister',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2017-03-12',
    location: 'Wuk, Vienna',
    bands: [
      {
        image: '2017-03-12-austra',
        name: 'Austra',
        layout: 'landscape',
      },
      {
        image: '2017-03-12-pixx',
        name: 'Pixx',
        layout: 'landscape-full',
      },
    ],
  },
  {
    date: '2017-02-26',
    location: 'B72, Vienna',
    bands: [
      {
        image: '2017-02-26-mitski',
        name: 'Mitski',
        layout: 'landscape',
      },
      {
        date: '2017-02-26',
        image: '2017-02-26-personal-best',
        name: 'Personal Best',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2017-01-27',
    location: 'JaJaJa Festival, Wuk, Vienna',
    bands: [
      {
        image: '2017-01-27-jajaja-jane-fonda',
        name: 'Have You Ever Seen The Jane Fonda Aerobic VHS?',
        layout: 'landscape',
      },
      {
        date: '2017-01-27',
        image: '2017-01-27-jajaja-chinah',
        name: 'Chinah',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2016-12-15',
    image: '2016-12-15-marissa-nadler',
    name: 'Marissa Nadler',
    location: 'Fluc, Vienna',
    layout: 'landscape',
  },
  {
    date: '2016-11-30',
    name: 'Mono',
    location: 'Szene, Vienna',
  },
  {
    date: '2016-11-14',
    name: 'Wilco',
    location: 'Museumsquartier Halle E, Vienna',
    image: '2016-11-14-wilco',
    layout: 'landscape',
  },
  {
    date: '2016-11-07',
    name: 'Little Big Sea',
    location: 'Rhiz, Vienna',
  },
  {
    date: '2016-10-12',
    location: 'Arena, Vienna',
    bands: [{ name: 'Daughter' }, { name: 'Dan Croll' }],
  },
  {
    date: '2016-10-03',
    name: 'Soap&Skin',
    location: 'Konzerthaus, Vienna',
  },
  {
    date: '2016-10-01',
    name: 'Kafka Tamura',
    location: 'Waves Festival, Vienna',
    image: '2016-10-01-waves-kafka-tamura',
    layout: 'landscape',
  },
  {
    date: '2016-09-30',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        name: 'Gemma Ray',
        image: '2016-09-30-waves-gemma-ray',
        layout: 'lanscape',
      },
      {
        name: 'Hazeevot',
        image: '2016-09-30-waves-hazeevot',
        layout: 'landscape-full',
      },
      {
        name: 'Girl Names',
        title: 'Girl Names at Waves Festival, Vienna on September 30, 2016',
        image: '2016-09-30-waves-girl-images',
        layout: 'landscape',
      },
      { name: 'A Life A Song A Cigarette' },
    ],
  },
  {
    date: '2016-09-29',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        name: 'Pola Rise',
        image: '2016-09-29-waves-pola-rise',
        layout: 'landscape',
      },
      {
        name: 'Eloui',
        image: '2016-09-29-waves-eloui',
        layout: 'landscape',
      },
      {
        name: 'Black Honey',
        image: '2016-09-29-waves-black-honey',
        layout: 'landscape-full',
      },
    ],
  },
  {
    date: '2016-09-28',
    name: 'Fear of Men',
    location: 'Rhiz, Vienna',
    image: '2016-09-28-fear-of-men',
    layout: 'landscape',
  },
  {
    date: '2016-09-08',
    name: 'Wolf Alice',
    location: 'Flex, Vienna',
  },
  {
    date: '2016-07-22',
    location: 'HipHop Open, Wiesen',
    bands: [
      {
        name: 'Beginner',
        image: '2016-07-22-beginner',
        layout: 'landscape',
      },
      {
        name: 'Blumentopf',
        image: '2016-07-22-blumentopf',
        layout: 'landscape',
      },
      { name: 'Fünf Sterne Deluxe' },
    ],
  },
  {
    date: '2016-05-26',
    location: 'Chelsea, Vienna',
    layout: 'landscape-full',
    bands: [
      {
        name: 'Eleanor Friedberger',
        image: '2016-05-26-eleanor-friedberger',
        layout: 'portrait',
      },
      { name: 'Mass Gothic' },
    ],
  },
  {
    date: '2016-04-21',
    name: 'Kate Boy',
    location: 'Chelsea, Vienna',
    image: '2016-04-21-kate-boy',
    layout: 'landscape',
  },
  {
    date: '2016-03-09',
    name: 'Tindersticks',
    location: 'Konzerthaus, Vienna',
  },
  {
    date: '2016-03-06',
    location: 'By:Larm Festival, Oslo',
    bands: [
      {
        name: 'Skinny Girl Diet',
        image: '2016-03-06-bylarm-skinny-girl-diet',
        layout: 'landscape',
      },
      {
        name: 'Palace Winter',
        image: '2016-03-06-bylarm-palace-winter',
        layout: 'landscape',
      },
      {
        name: 'Lafawndah',
        image: '2016-03-06-bylarm-lafawndah.jpg',
        layout: 'landscape',
      },
    ],
  },
  {},
  {
    date: '2016-03-05',
    name: 'The Prettiots',
    location: 'By:Larm Festival, Oslo',
    image: '2016-03-05-bylarm-the-prettiots',
    layout: 'landscape-full',
  },
  {
    date: '2016-03-04',
    location: 'By:Larm Festival, Oslo',
    bands: [
      {
        name: 'Pixx',
        image: '2016-03-04-bylarm-pixx',
        layout: 'landscape',
      },
      {
        name: 'Kwamie Liv',
        image: '2016-03-04-bylarm-kwamie-liv',
        layout: 'landscape',
      },
      {
        name: 'Sea Lion',
        image: '2016-03-04-bylarm-sea-lion',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2016-03-03',
    location: 'By:Larm Festival, Oslo',
    bands: [
      {
        name: 'Dolores Haze',
        image: '2016-03-03-bylarm-dolores-haze',
        layout: 'landscape',
      },
      {
        name: 'Abra',
        image: '2016-03-03-by-larm-abra',
        layout: 'landscape',
      },
      {
        name: 'Ida Stein',
        image: '2016-03-03-bylarm-ida-stein',
        layout: 'landscape',
      },
      {
        name: 'Pale Honey',
        image: '2016-03-03-bylarm-pale-honey',
        layout: 'landscape',
      },
      {
        name: 'Siv Jakobsen',
        image: '2016-03-03-bylarm-siv-jakobsen',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2016-03-02',
    location: 'By:Larm Festival, Oslo',
    bands: [
      {
        name: 'Léonne',
        image: '2016-03-02-bylarm-leonne',
        layout: 'landscape',
      },
      {
        name: 'Whitney',
        image: '2016-03-02-bylarm-whitney',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2016-02-21',
    name: 'Youth Lagoon',
    location: 'Chelsea, Vienna',
    image: '2016-02-21-youth-lagoon',
    layout: 'landscape',
  },
  {
    date: '2016-01-31',
    name: 'Angel Haze',
    location: 'Flex, Vienna',
    image: '2016-01-31-angel-haze',
    layout: 'landscape-full',
  },
  {
    date: '2016-01-25',
    location: 'B72, Vienna',
    name: 'Hinds',
    image: '2016-01-25-hinds',
    layout: 'landscape-full',
  },
  {
    date: '2015-12-09',
    name: 'Rangleklods',
    location: 'B72, Vienna',
    image: '2015-12-09-rangleklods',
    layout: 'landscape-full',
  },
  {
    date: '2015-10-03',
    location: 'Waves Festival, Vienna',
    bands: [
      { name: 'Ebony Bones' },
      { name: 'Clara Blume' },
      { name: 'Young Rebel Set' },
      { name: 'Naked Woods' },
    ],
  },
  {
    date: '2015-10-02',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        name: 'Austra',
        image: '2015-10-02-waves-austra',
        layout: 'landscape',
      },
      {
        name: 'PINS',
        image: '2015-10-02-waves-pins',
        layout: 'landscape',
      },
      { name: 'Emma Longard' },
      {
        name: 'Lylit',
        image: '2015-10-02-waves-lylit',
        layout: 'landscape',
      },
      { name: 'Sizarr' },
    ],
  },
  {
    date: '2015-10-01',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        name: 'Joy Wellboy',
        image: '2015-10-01-waves-joy-wellboy',
        layout: 'landscape',
      },
      {
        name: 'Koala Voice',
        image: '2015-10-01-waves-koala-voice',
        layout: 'landscape',
      },
      {
        name: 'Hey Elbow',
        image: '2015-10-01-hey-elbow',
        layout: 'landscape',
      },
      {
        name: 'LCDMF',
        image: '2015-10-01-waves-lcdmf',
        layout: 'landscape',
      },
      {
        name: 'Alina Orlova',
        image: '2015-10-01-waves-alina-orlova',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2015-07-14',
    name: 'Patti Smith and her Band perform Horses',
    location: 'Arena Open Air, Vienna',
    image: '2015-07-14-patti-smith',
    layout: 'landscape',
  },
  {
    date: '2015-04-25',
    location: 'Paradiso, Amsterdam, Netherlands',
    bands: [
      {
        name: 'Marika Hackman',
        image: '2015-04-25-marika-hackman',
        layout: 'landscape',
      },
      {
        name: 'The Dø',
        image: '2015-08-25-the-do',
        layout: 'landscape',
      },
      {
        name: 'of Montreal',
        image: '2015-04-25-of-montreal',
        layout: 'landscape',
      },
      {
        name: 'Vaults',
        image: '2015-04-25-vaults',
        layout: 'landscape',
      },
    ],
  },
  {
    date: '2015-04-14',
    name: 'Mono',
    location: 'Arena, Vienna',
    image: '2015-04-14-mono',
    layout: 'landscape',
  },
  {
    date: '2015-03-19',
    name: 'Katzenjammer',
    location: 'Arena, Vienna',
    image: '2015-03-19-katzenjammer',
    layout: 'landscape',
  },
  {
    date: '2015-03-17',
    name: 'Zola Jesus',
    location: 'Wuk, Vienna',
    image: '2015-03-17-zola-jesus',
    layout: 'landscape-full',
  },
  {
    date: '2015-03-09',
    location: 'Wuk, Vienna',
    bands: [
      {
        name: 'Two Gallants',
        image: '2015-03-09-two-gallants',
        layout: 'landscape',
      },
      {
        name: 'Theo Verney',
      },
    ],
  },
  {
    date: '2015-01-29',
    name: 'Get Well Soon',
    location: 'Porgy & Bess, Vienna',
    image: '2015-01-29-get-well-soon',
    layout: 'landscape',
  },
  {
    date: '2015-01-28',
    name: 'Orenda Fink',
    location: 'Haus der Musik, Vienna',
    image: '2015-01-28-orenda-fink',
    layout: 'square',
  },
  {
    date: '2014-12-01',
    location: 'Arena, Vienna',
    bands: [
      {
        name: 'Son Lux',
        image: '2014-12-01-son-lux',
        layout: 'landscape',
      },
      {
        name: 'White Hinterland',
      },
    ],
  },
  {
    date: '2014-11-24',
    location: 'Arena, Vienna',
    layout: 'landscape-full',
    bands: [
      {
        name: 'Klaxons',
        image: '2014-11-24-klaxons',
      },
      { name: 'Fenech-Solar' },
    ],
  },
  {
    date: '2014-11-18',
    name: 'St. Vincent',
    location: 'Arena, Vienna',
    image: '2014-11-18-st-vincent',
    layout: 'landscape',
  },
  {
    date: '2014-10-27',
    location: 'Chelsea, Vienna',
    name: 'Sea Wolf',
    image: '2014-10-27-sea-wolf',
    layout: 'square',
  },
  {
    date: '2014-10-16',
    location: 'Flex, Vienna',
    bands: [
      {
        name: 'The Antlers',
        image: '2014-10-16-the-antlers',
        layout: 'square',
      },
      {
        name: 'Marika Hackman',
        image: '2014-10-16-marika-hackman',
        layout: 'square',
      },
    ],
  },
  {
    date: '2014-10-11',
    location: 'Chelsea, Vienna',
    name: 'Hundred Waters',
    image: '2014-10-11-hundred-waters',
    layout: 'square',
  },
  {
    date: '2014-10-04',
    location: 'Waves Festival, Vienna',
    bands: [
      { name: 'Julia Marcell' },
      {
        name: 'First Aid Kit',
        image: '2014-10-04-waves-first-aid-kit',
        layout: 'square-full',
      },
      { name: 'Hunter & The Bear' },
      { name: 'Cheaters' },
    ],
  },
  {
    date: '2014-10-03',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        name: 'Miriel Wagner',
        image: '2014-10-03-waves-miriel-wagner',
        layout: 'square',
      },
      { name: 'The Hidden Cameras' },
      { name: 'Giantree' },
    ],
  },
  {
    date: '2014-10-02',
    location: 'Waves Festival, Vienna',
    bands: [
      {
        name: 'Mo Kenney',
        image: '2014-10-02-waves-mo-kenney',
        layout: 'square',
      },
      {
        name: 'Jennie Abrahamson',
        image: '2014-10-02-waves-jennie-abrahamson',
        layout: 'square',
      },
      { name: 'Schmids Puls' },
    ],
  },
  {
    date: '2014-09-09',
    name: 'Austra',
    location: 'Arena, Vienna',
    image: '2014-09-09-austra',
    layout: 'square',
  },
  {
    date: '2014-09-04',
    location: 'Arena, Vienna',
    layout: 'square',
    bands: [
      {
        name: 'Warpaint',
        image: '2014-09-04-warpaint',
      },
      { name: 'We Walk Walls' },
    ],
  },
  {
    date: '2014-08-14',
    location: 'Arena, Vienna',
    title: 'Conor Oberst at Arena, Vienna on August 14, 2014',
    layout: 'square',
    bands: [
      {
        name: 'Conor Oberst',
        image: '2014-08-14-conor-oberst',
      },
      { name: 'Dawes' },
    ],
  },
  {
    date: '2014-08-12',
    location: 'Arena Open Air, Vienna',
    image: '2014-08-12-the-national',
    layout: 'square',
    bands: [{ name: 'The National' }, { name: 'Sharon Van Etten' }],
  },
  {
    date: '2014-04-14',
    location: 'Arena, Vienna',
    bands: [{ name: 'Mono' }, { name: 'Helen Money' }],
  },
  {
    date: '2013-10-05',
    location: 'Waves Festival, Vienna',
    bands: [
      { name: 'Sin Fang' },
      { name: 'Cold Mailmen' },
      { name: 'Soldout' },
      { name: 'Kate Boy' },
    ],
  },
  {
    date: '2013-10-04',
    location: 'Waves Festival, Vienna',
    bands: [
      { name: 'Nowhere Train' },
      { name: 'YAST' },
      { name: 'Monophona' },
      { name: 'BRNS' },
    ],
  },
  {
    date: '2013-10-03',
    location: 'Waves Festival, Vienna',
    bands: [
      { name: 'CSS' },
      { name: 'Au Revoir Simone' },
      { name: 'Frida Hyvönen' },
    ],
  },
  {
    date: '2013-07-26',
    location: 'Popfest, Karlsplatz, Vienna',
    name: 'Steaming Satellites',
  },
  {
    date: '2013-06-03',
    location: 'Stadtsaal, Vienna',
    name: 'Apparat spielt Krieg und Frieden',
  },
  {
    date: '2013-05-15',
    location: 'Gasometer, Vienna',
    bands: [{ name: 'The xx' }, { name: 'Mount Kimbie' }],
  },
  {
    date: '2013-04-19',
    location: 'Gasometer, Vienna',
    name: 'Lana Del Rey',
  },
  {
    date: '2013-03-16',
    location: 'Arena, Vienna',
    name: 'Monsters of Men',
  },
  {
    date: '2013-02-18',
    location: 'Konzerthaus, Vienna',
    bands: [{ name: 'Glen Hansard' }, { name: 'Lisa Hannigan' }],
  },
  {
    date: '2013-02-15',
    name: 'Apparat',
    location: 'Pratersauna, Vienna',
  },
  {
    date: '2013-02-13',
    name: 'Listen to Leena',
    location: 'Celeste Jazz Keller, Vienna',
  },
  {
    date: '2013-02-01',
    name: 'The Beth Edges',
    location: 'Flex, Vienna',
  },
  {
    date: '2013-01-21',
    location: 'Stadtsaal, Vienna',
    bands: [{ name: 'Conor Oberst' }, { name: 'First Aid Kit' }],
  },
  {
    date: '2012-12-09',
    location: 'Flex, Vienna',
    name: 'Two Gallants',
  },
  {
    date: '2012-12-02',
    location: 'Arena, Vienna',
    name: 'Efterklang',
  },
  {
    date: '2012-11-19',
    location: 'Stadthalle, Vienna',
    bands: [{ name: 'Muse' }, { name: 'Everything Everything' }],
  },
  {
    date: '2012-10-06',
    location: 'Waves Festival',
  },
  {
    date: '2012-10-05',
    location: 'Waves Festival',
  },
  {
    date: '2012-10-04',
    location: 'Waves Festival',
  },
  {
    date: '2012-08-18',
    location: 'Pratersauna, Vienna',
    name: 'Jamie xx',
  },
  {
    date: '2012-08-01',
    location: 'Arena Open Air, Vienna',
    name: 'Bon Iver',
  },
  {
    date: '2012-07-18',
    location: 'Konzerthaus, Vienna',
    name: 'Regina Spektor',
  },
  {
    date: '2012-07-11',
    location: 'Wuk, Vienna',
    name: 'Damien Rice',
  },
  {
    date: '2012-05-18',
    location: 'Pratersauna, Vienna',
    bands: [{ name: 'Dillon' }, { name: 'Sawoff' }],
  },
  {
    date: '2012-05-06',
    location: 'Chaya Fuera, Vienna',
    name: 'Lisa Hannigan',
  },
  {
    date: '2012-03-10',
    location: 'Gasometer, Vienna',
    name: 'Feist',
  },
  {
    date: '2011-12-07',
    location: 'Stadthalle, Vienna',
    bands: [{ name: 'Red Hot Chili Peppers' }, { name: 'Foals' }],
  },
  {
    date: '2011-11-15',
    location: 'Museumsquartier Halle E, Vienna',
    name: 'Fleet Foxes',
  },
  {
    date: '2011-09-28',
    location: 'Stadtsaal, Vienna',
    name: 'Soap&Skin',
  },
  {
    date: '2011-07-05',
    location: 'Arena Open Air, Vienna',
    bands: [{ name: 'Bright Eyes' }, { name: 'Jenny & Johnny' }],
  },
  {
    date: '2011-06-22',
    location: 'Wiesen',
    name: 'Arcade Fire',
  },
  {
    date: '2011-05-12',
    location: 'Arena, Vienna',
    name: 'Angus & Julia Stone',
  },
  {
    date: '2011-03-27',
    location: 'Flex, Vienna',
    name: 'Low Anthem',
  },
  {
    date: '2011-03-25',
    location: 'Haus der Musik, Vienna',
    name: 'Trouble Over Tokyo',
  },
  {
    date: '2011-03-20',
    location: 'Flex, Vienna',
    name: 'Everything Everything',
  },
  {
    date: '2011-03-05',
    location: 'MQ Halle E, Vienna',
    name: 'Ben Folds',
  },
  {
    date: '2011-02-21',
    location: 'Chelsea, Vienna',
    name: 'Azure Ray',
  },
  {
    date: '2011-02-02',
    location: 'Wuk, Vienna',
    name: 'Francis International Airport',
  },
  {
    date: '2011-01-24',
    location: 'Radiokulturhaus, Vienna',
    name: 'Ginga',
  },
  {
    date: '2011-01-12',
    location: 'Chelsea, Vienna',
    name: 'Albatros. It’s fog again',
  },
  {
    date: '2010-12-04',
    location: 'Porgy & Bess, Vienna',
    name: 'Marina & The Diamonds',
  },
  {
    date: '2010-11-23',
    location: 'Arena, Vienna',
    name: 'Get Well Soon',
  },
  {
    date: '2010-11-18',
    location: 'Gasometer, Vienna',
    name: 'Interpol',
  },
  {
    date: '2010-09-23',
    location: 'Gasometer, Vienna',
    name: 'Wilco',
  },
  {
    date: '2010-08-18',
    location: 'Arena Open Air, Vienna',
    name: 'The National',
  },
  {
    date: '2010-08-08',
    location: 'Arena Open Air, Vienna',
    name: 'Kasabian',
  },
  {
    date: '2010-07-07',
    location: 'Rathausplatz, Vienna',
    name: 'Imelda May',
  },
  {
    date: '2010-06-27',
    location: 'Brucknerhaus, Linz',
    name: 'Serj Tankian & Orchestra',
  },
  {
    date: '2009-11-26',
    location: 'Gasometer, Vienna',
    name: 'Editors',
  },
  {
    date: '2009-09-14',
    location: 'Gasometer, Vienna',
    name: 'Dinosaur Jr',
  },
  {
    date: '2009-08-22',
    location: 'FM4 Frequency Festival, St. Pölten',
  },
  {
    date: '2009-08-21',
    location: 'FM4 Frequency Festival, St. Pölten',
  },
  {
    date: '2009-08-21',
    location: 'FM4 Frequency Festival, St. Pölten',
  },
  {
    date: '2008-09-09',
    location: 'Arena, Vienna',
    name: 'Conor Oberst & The Mystic Valley Band',
  },
  {
    date: '2007-06-24',
    location: 'Southside Festival',
  },
  {
    date: '2007-06-23',
    location: 'Southside Festival',
  },
  {
    date: '2007-06-22',
    location: 'Southside Festival',
  },
];

export default concerts;
