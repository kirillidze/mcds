const value = {
  views_count: {
    more: 10,
  },
  users: {
    is: [1],
  },
  q: "asd",
}
const filters = [
  {
    name: "Поиск",
    value: "q",
    type: "text",
  },
  {
    name: "Страна",
    value: "countries",
    type: "relation",
    values: [
      { name: "Беларусь", value: 1 },
      { name: "Россия", value: 2 },
      { name: "Украина", value: 3 },
    ],
  },
  {
    name: "Пользователь",
    value: "users",
    type: "relation",
    values: [],
    ajax: val => {
      return fetch("https://reqres.in/api/users")
        .then(result => {
          return result.json()
        })
        .then(result => {
          return result.data.map(r => ({
            name: r.first_name + " " + r.last_name,
            value: r.id,
          }))
        })
    },
    ajaxShow: val => {
      return fetch("https://reqres.in/api/users/" + val)
        .then(result => {
          return result.json()
        })
        .then(result => {
          const r = result.data
          return {
            name: r.first_name + " " + r.last_name,
            value: r.id,
          }
        })
    },
  },
  {
    name: "Просмотры",
    value: "views_count",
    type: "number",
    min: 0,
    max: 10000,
    step: 10,
  },
  {
    name: "Дата создания",
    value: "created_at",
    type: "date",
  },
  {
    name: "Страна1",
    value: "countries_1",
    type: "relation",
    values: [
      { name: "Беларусь", value: 1 },
      { name: "Россия", value: 2 },
      { name: "Украина", value: 3 },
      { name: "Украина", value: 4 },
      { name: "Украина", value: 5 },
      { name: "Украина", value: 6 },
      { name: "Украина", value: 7 },
      { name: "Украина", value: 8 },
      { name: "Украина", value: 9 },
      { name: "Украина", value: 11 },
      { name: "Украина", value: 12 },
      { name: "Украина", value: 13 },
      { name: "Украина", value: 14 },
      { name: "Украина", value: 15 },
      { name: "Украина", value: 16 },
      { name: "Украина", value: 26 },
      { name: "Украина", value: 36 },
      { name: "Украина", value: 46 },
      { name: "Украина", value: 56 },
      { name: "Украина", value: 66 },
      { name: "Украина", value: 76 },
      { name: "Украина", value: 86 },
      { name: "Украина", value: 96 },
      { name: "Украина", value: 116 },
      { name: "Украина", value: 126 },
      { name: "Украина", value: 136 },
      { name: "Украина", value: 146 },
      { name: "Украина", value: 156 },
      { name: "Украина", value: 166 },
      { name: "Украина", value: 176 },
      { name: "Украина", value: 186 },
      { name: "Украина", value: 196 },
      { name: "Украина", value: 226 },
      { name: "Украина", value: 216 },
      { name: "Украина", value: 236 },
      { name: "Украина", value: 246 },
    ],
  },
  {
    name: "Страна2",
    value: "countries_2",
    type: "relation",
    values: [
      { name: "Беларусь", value: 1 },
      { name: "Россия", value: 2 },
      { name: "Украина", value: 3 },
      { name: "Украина", value: 4 },
      { name: "Украина", value: 5 },
      { name: "Украина", value: 6 },
    ],
  },
  {
    name: "Страна3",
    value: "countries_3",
    type: "relation",
    values: [
      { name: "Беларусь", value: 1 },
      { name: "Россия", value: 2 },
      { name: "Украина", value: 3 },
      { name: "Украина", value: 4 },
      { name: "Украина", value: 5 },
      { name: "Украина", value: 6 },
    ],
  },
  {
    name: "Страна4",
    value: "countries_4",
    type: "relation",
    values: [
      { name: "Беларусь", value: 1 },
      { name: "Россия", value: 2 },
      { name: "Украина", value: 3 },
      { name: "Украина", value: 4 },
      { name: "Украина", value: 5 },
      { name: "Украина", value: 6 },
    ],
  },
  {
    name: "Пол",
    value: "sex",
    type: "selection",
    values: [{ name: "Мужской", value: "male" }, { name: "Женский", value: "female" }],
    min: 0,
    max: 100,
  },
  {
    name: "Возраст",
    value: "age",
    type: "selection",
    values: [
      {
        name: "От 17 до 20",
        value: {
          from: 17,
          to: 20,
        },
      },
      {
        name: "От 25 до 30",
        value: {
          from: 25,
          to: 30,
        },
      },
    ],
    min: 0,
    max: 100,
  },
  {
    name: "Main country split",
    value: "country",
    type: "multiple-range",
    values: [
      { name: "Russia", value: "RU" },
      { name: "Belarus", value: "BLR" },
      { name: "Poland", value: "PL" },
    ],
    min: 0,
    max: 100,
  },
]

const presets = [
  {
    q: "asd",
    views_count: {
      more: 10,
    },
  },
]

const lang = {
  placeholder: "Поиск",
  from: "от",
  to: "до",
  this: "Это",
  is_not: "Это не",
  not_empty: "Не пустое",
  empty: "Пустое",
  more: "Больше",
  less: "Меньше",
  later: "Позже",
  above: "Раньше",
  apply: "Применить",
  save: "Сохранить",
  reset: "Сбросить",
  save_preset: "Сохранить пресет",
  filter: "Фильтр",
  all: "Все",
  presets: "Пресеты",
  search_empty: "No results",
}

export { value, filters, presets, lang }
