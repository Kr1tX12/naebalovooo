const cowsay = require("cowsay");
const chalk = require("chalk");

const phrases = [
  `Йоу, твой стартап на ${Math.floor(Math.random() * 100)}% говно!`,
  `Ща проект запуститься. ${Math.random() > 0.5 ? "хз" : "Или говно"}`,
  `Я только что съел ${Math.floor(Math.random() * 10)}GB RAM, йопта`,
  `Я предустановил тебе ${Math.floor(Math.random() * 400)} ненужных либ, йопта`,
  `Запускаем Next.yopta с ${Math.floor(Math.random() * 1488)}-ю ошибками в коде. Поехали!`,
  `Предупреждение: Этот код ${Math.random() > 0.5 ? "не прошёл code review" : "говно"}`,
  `Ошибка 418: Я - чайник, но проект запустился`
];

const bgColors = [
  '#FF0000', 
  '#00FF00',
  '#0000FF', 
  '#FFFF00', 
  '#FF00FF',
  '#00FFFF', 
  '#FFA500', 
  '#800080', 
  '#097412',
  '#FF1493' 
];

const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

console.log(
  chalk.bgHex(randomBgColor).red(
    cowsay.say({
      text: phrases[Math.floor(Math.random() * phrases.length)],
      e: Math.random() > 0.5 ? "oO" : "^^",
      T: Math.random() > 0.5 ? "U " : "🐮",
    })
  )
);

console.log('\n');