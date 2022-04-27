class Character {
  id;
  name;
  selectScreenPosition;

  constructor(id, name, selectScreenPosition) {
    this.id = id;
    this.name = name;
    this.selectScreenPosition = selectScreenPosition;
  }
}

const BanjoAndKazooie = new Character(0, 'Banjo & Kazooie', 740)
const Bayonetta = new Character(1, 'Bayonetta', 630)
const Bowser = new Character(2, 'Bowser', 150)
const BowserJr = new Character(3, 'Bowser Jr.', 570)
const Byleth = new Character(4, 'Byleth', 760)
const CaptainFalcon = new Character(5, 'Captain Falcon', 110)
const Chrom = new Character(6, 'Chrom', 280)
const Cloud = new Character(7, 'Cloud', 610)
const Corrin = new Character(8, 'Corrin', 620)
const Daisy = new Character(9, 'Daisy', 140)
const DarkPit = new Character(10, 'Dark Pit', 320)
const DarkSamus = new Character(11, 'Dark Samus', 40)
const DiddyKong = new Character(12, 'Diddy Kong', 380)
const DonkeyKong = new Character(13, 'Donkey Kong', 10 )
const DrMario = new Character(14, 'Dr. Mario', 190)
const DuckHunt = new Character(15, 'Duck Hunt', 580)
const Falco = new Character(16, 'Falco', 210)
const Fox = new Character(17, 'Fox', 70)
const Ganondorf = new Character(18, 'Ganondorf', 250)
const Greninja = new Character(19, 'Greninja', 520)
const Hero = new Character(20, 'Hero', 730)
const IceClimbers = new Character(21, 'Ice Climbers', 160)
const Ike = new Character(22, 'Ike', 360)
const Incineroar = new Character(23, 'Incineroar', 700)
const Inkling = new Character(24, 'Inkling', 640)
const Isabelle = new Character(25, 'Isabelle', 690)
const Joker = new Character(26, 'Joker', 720)
const Jigglypuff = new Character(27, 'Jigglypuff', 120)
const Kazuya = new Character(28, 'Kazuya', 810)
const Ken = new Character(29, 'Ken', 600)
const KingDedede = new Character(30, 'King Dedede', 410)
const KingKRool = new Character(31, 'King K. Rool', 680)
const Kirby = new Character(32, 'Kirby', 60)
const Link = new Character(33, 'Link', 20)
const LittleMac = new Character(34, 'Little Mac', 510)
const Lucario = new Character(35, 'Lucario', 430)
const Lucas = new Character(36, 'Lucas', 390)
const Lucina = new Character(37, 'Lucina', 230)
const Luigi = new Character(38, 'Luigi', 90)
const Mario = new Character(39, 'Mario', 0)
const Marth = new Character(40, 'Marth', 220)
const MegaMan = new Character(41, 'Mega Man', 480)
const MetaKnight = new Character(42, 'Meta Knight', 300)
const Mewtwo = new Character(43, 'Mewtwo', 260)
const MiiBrawler = new Character(44, 'Mii Brawler', 830)
const MiiGunner = new Character(45, 'Mii Gunner', 850)
const MiiSwordfighter = new Character(46, 'Mii Swordfighter', 840)
const MinMin = new Character(47, 'Min Min', 770)
const MrGameAndWatch = new Character(48, 'Mr. Game & Watch', 290)
const Ness = new Character(49, 'Ness', 100)
const PacMan = new Character(50, 'Pac-Man', 540)
const Palutena = new Character(51, 'Palutena', 530)
const Peach = new Character(52, 'Peach', 130)
const Pichu = new Character(53, 'Pichu', 200)
const Pikachu = new Character(54, 'Pikachu', 80)
const Olimar = new Character(55, 'Olimar', 420)
const PirahnaPlant = new Character(56, 'Pirahna Plant', 710)
const Pit = new Character(57, 'Pit', 310)
const PokemonTrainer = new Character(58, 'Pokemon Trainer', 370)
const Squirtle = new Character(59, 'Squirtle', 371)
const Ivysaur = new Character(60, 'Ivysaur', 372)
const Charizard = new Character(61, 'Charizard', 373)
const PyraMythra = new Character(62, 'Pyra/Mythra', 800)
const Pyra = new Character(63, 'Pyra', 801)
const Mythra = new Character(64, 'Mythra', 802)
const Richter = new Character(65, 'Richter', 670)
const Simon = new Character(66, 'Simon', 660)
const Ridley = new Character(67, 'Ridley', 650)
const ROB = new Character(68, 'R.O.B.', 440)
const Robin = new Character(69, 'Robin', 550)
const RosalinaAndLuma = new Character(70, 'Rosalina & Luma', 500)
const Roy = new Character(71, 'Roy', 270)
const Ryu = new Character(72, 'Ryu', 590)
const Samus = new Character(73, 'Samus', 30)
const Sephiroth = new Character(74, 'Sephiroth', 790)
const Sheik = new Character(75, 'Sheik', 170)
const Shulk = new Character(76, 'Shulk', 560)
const Snake = new Character(77, 'Snake', 350)
const Sonic = new Character(78, 'Sonic', 400)
const Sora = new Character(79, 'Sora', 820)
const Steve = new Character(80, 'Steve', 780)
const Terry = new Character(81, 'Terry', 750)
const ToonLink  = new Character(82, 'Toon Link', 450)
const Villager = new Character(83, 'Villager', 470)
const Wario = new Character(84, 'Wario', 340)
const WiiFitTrainer = new Character(85, 'Wii Fit Trainer', 490)
const Wolf = new Character(86, 'Wolf', 460)
const Yoshi = new Character(87, 'Yoshi', 50)
const YoungLink = new Character(88, 'Young Link', 240)
const Zelda = new Character(89, 'Zelda', 180)
const ZeroSuitSamus = new Character(90, 'Zero Suit Samus', 330)

export const characters = {
  BanjoAndKazooie,
  Bayonetta,
  Bowser,
  BowserJr,
  Byleth,
  CaptainFalcon,
  Chrom,
  Cloud,
  Corrin,
  Daisy,
  DarkPit,
  DarkSamus,
  DiddyKong,
  DonkeyKong,
  DrMario,
  DuckHunt,
  Falco,
  Fox,
  Ganondorf,
  Greninja,
  Hero,
  IceClimbers,
  Ike,
  Incineroar,
  Inkling,
  Isabelle,
  Joker,
  Jigglypuff,
  Kazuya,
  Ken,
  KingDedede,
  KingKRool,
  Kirby,
  Link,
  LittleMac,
  Lucario,
  Lucas,
  Lucina,
  Luigi,
  Mario,
  Marth,
  MegaMan,
  MetaKnight,
  Mewtwo,
  MiiBrawler,
  MiiGunner,
  MiiSwordfighter,
  MinMin,
  MrGameAndWatch,
  Ness,
  PacMan,
  Palutena,
  Peach,
  Pichu,
  Pikachu,
  Olimar,
  PirahnaPlant,
  Pit,
  PokemonTrainer,
  Squirtle,
  Ivysaur,
  Charizard,
  PyraMythra,
  Pyra,
  Mythra,
  Richter,
  Simon,
  Ridley,
  ROB,
  Robin,
  RosalinaAndLuma,
  Roy,
  Ryu,
  Samus,
  Sephiroth,
  Sheik,
  Shulk,
  Snake,
  Sonic,
  Sora,
  Steve,
  Terry,
  ToonLink,
  Villager,
  Wario,
  WiiFitTrainer,
  Wolf,
  Yoshi,
  YoungLink,
  Zelda,
  ZeroSuitSamus,
}

export const findCharacterById = id => {
  for (const character in characters) {
    if (characters[characters].id === id)
      return characters[character]
  }
  throw new Error(`Error!: character with id ${id} not found!`)
}

const arr = []
for (const character in characters) {
  arr.push(characters[character])
}
export const characterList = arr