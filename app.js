var app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    list: `Сок, Санки, Гайка, Перчатки, Гвоздь, Кастрюля, Ветка, Парус, Горшок, Каска, Кувшин, Тесто, Орех, 
Капля, Шарф, Шапка, Краска, Весло, Муха, Винт, Серьга, Линза, Мука, Лыжи, Певец, 
Нос, Луг, Ключ, Кора, Дождь, Нота, Обои, Метла, Комар, Глаз, Пчела, Клей, Вода, Повар, Песня, 
Лист, Ягода, Кисть, Корзина, Стена, Грабли, Ухо, Наст, Поле, Гриб, Береза, Лёд, Тетрадь, Снег, Дворник, 
Творец, Отец, Истина, Слово, Свиток, Молитва, Речь, Письмо, Почта, Гонец, Нож, Яхта, Меч, Блины, Рыбак, 
Лейка, Стрела, Диван, Фикус, Бельчонок, Фотограф, Ребенок, Пленка, Очки, Вилка, Бинокль, Паук, Вилы, Кактус, 
Игла, Ведро, Слоненок, Лодка, Лапша, Кресло, Стекло, Сковорода, Глина, Пальто, Слово, Шуба, Небо, Осколок, Варенье, 
Лошадь, Ручка, Свобода, Старость, Лупа, Слепота, Голод, Гонка, Бег, Буря, Волна, Потоп, Веревка, Слежка, Оратор, 
Наводнение, Пень, Крючок, Носок, Дырка, Совок, Ящик, Чеснок, Газета, Вспышка, Волнение, Лук, Стопка, Пар, Куст, Боровик, 
Груздь, Воротник, Забор, Колобок`,
    gameList: [],
    words: [],
  },
  created() {
    let app = this
    
    app.list = this.list.split(', ')
    //console.log(app.list.length)
    let words = this.createGame() 

    app.shuffle(words)

    for (let index = 0; index < 36; index++) {
      
        let color = null
        if (index < 14) {
          color = "green"
        } else if (index < 28) {
          color = "blue"
        } else if (index < 36) {
          color = "blue-grey darken-4"
        } 
        app.words.push({
          text: words[index],
          color: color,
          showOld: true,
          showNew: false,
        }) 
          
    }
    app.shuffle(app.words)
  },
  computed: {
    primaryCount() {
      let count = 0
      this.words.forEach(element => {
        if ((element.showNew == true) && (element.color == "green"))  {
          count++
        }
      })
      return count
    },
    successCount() {
      let count = 0
      this.words.forEach(element => {
        if ((element.showNew == true) && (element.color == "blue"))  {
          count++
        }
      })
      return count
    }
  },
  methods: {
    showCard(key) {      
      let app = this
      app.words[key].showOld = false 
      setTimeout(function() { 
        app.words[key].showNew = true 
      }, 800)
    },
    showGame() {
      let app = this
      if (app.words[0].showOld == true) {
        app.words.forEach(element => {
          element.showOld = false 
          setTimeout(function() { 
            element.showNew = true 
          }, 800)
        });
      } else {
        app.words.forEach(element => {
          element.showNew = false 
          setTimeout(function() { 
            element.showOld = true 
          }, 800)
        });
      }      
    },
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;    
      while (0 !== currentIndex) {    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;    
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }    
      return array;
    },
    getRandomWord() {     
      return this.list[Math.floor(Math.random() * Math.floor(this.list.length))]
    },
    createGame() {
      let app = this
      let words = []
      function pow(words) {
        let word = app.getRandomWord()
        if (words.includes(word)) {
          return pow(words);
        } else {
          if (words.length < 36) {
            words.push(word)
            return pow(words);
          }
          return words
        }
      }      
      return pow(words)
    }   
  }
})
