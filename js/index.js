const fruitsList = document.querySelector('.fruits__list');
const shuffleButton = document.querySelector('.shuffle__btn');
const filterButton = document.querySelector('.filter__btn');
const sortKindLabel = document.querySelector('.sort__kind');
const sortTimeLabel = document.querySelector('.sort__time');
const sortChangeButton = document.querySelector('.sort__change__btn');
const sortActionButton = document.querySelector('.sort__action__btn');
const kindInput = document.querySelector('.kind__input');
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input');
const addActionButton = document.querySelector('.add__action__btn');
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');
const warningWrapper = document.querySelector('.warning');

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);

const warning = (text) =>{
  warningWrapper.innerText = text;
  warningWrapper.classList.add('warning__active');
  setTimeout(() => {
    warningWrapper.classList.remove('warning__active');
  }, 1500);
}

function colorToClass(color) {
  switch (color) {
    case 'фиолетовый': return 'fruit_violet';
    case 'зеленый': return 'fruit_green';
    case 'розово-красный': return 'fruit_carmazin';
    case 'желтый': return 'fruit_yellow';
    case 'светло-коричневый': return 'fruit_lightbrown'
  }
}

const display = () => {
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
     
    const colorClass = colorToClass(fruits[i].color)
    let newLi = document.createElement('li');
    newLi.className = `fruit__item ${colorClass}`;

    newLi.innerHTML = `<div class="fruit__info">
                        <div>index: ${i}</div>
                        <div>kind: ${fruits[i].kind}</div>
                        <div>color: ${fruits[i].color}</div>
                        <div>weight (кг): ${fruits[i].weight}</div>
                      </div>`

    fruitsList.append(newLi);

  }
};

display();

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleFruits = () => {
  let result = [];

  while (fruits.length > 0) {
 
    const i = getRandomInt(0, fruits.length - 1)
    result.push(fruits[i]);
    fruits.splice(i, 1);
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

const filterFruits = () => {
    fruits = fruits.filter((item) => { 
      return (item.weight >= minWeight.value) && (item.weight <= maxWeight.value)
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

let sortKind = 'bubbleSort';
let sortTime = '-';

const comparationColor = (a, b) => {
  const stringToCode = (str) => {
    let code = "";
    [...str].forEach(char => {             
      code += char.charCodeAt(0);  
    });
    return parseInt(code);
  };

  const codeA = stringToCode(a);
  const codeB = stringToCode(b);

  if (codeB < codeA) return true;

};

const sortAPI = {
  bubbleSort(arr, comparation) {
     const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        const a = arr[j].color;
        const b = arr[j + 1].color;

        if (comparation(a, b)) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  
  },

  
  quickSort(arr) {
    
    const n = arr.length;

    if (n < 2) {
      return arr;
    }

    const pivot = arr[Math.floor(n / 2)].color;

    let left = [], center = [], right = [];

    arr.forEach(el => {
      if (el.color == pivot) { center.push(el) }
      else if ((el.color != pivot) && (el.color.length >= pivot.length)) { right.push(el) }
      else if ((el.color != pivot) && (el.color.length < pivot.length)) { left.push(el) }
    });

    return fruits = [...sortAPI.quickSort(left), ...center, ...sortAPI.quickSort(right)]
   
  },

 
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};


sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
   
  if (sortKind == 'bubbleSort') {
    sortKindLabel.innerText = 'quickSort';
    sortKind = 'quickSort';
  }
  else {
    sortKindLabel.innerText = 'bubbleSort';
    sortKind = 'bubbleSort';
  }
});

sortActionButton.addEventListener('click', () => {

  sortTimeLabel.innerText = 'Sorting...';
  setTimeout(() =>{

    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruits, comparationColor);
    display();
  

 
  sortTimeLabel.innerText = sortTime;
  }, 50);
  
});

const addCard = (kind, color, weight) => {
  let fruit = { 
    kind: kind,
    color: color,
    weight: weight
  }
  fruits.push(fruit);
}

addActionButton.addEventListener('click', () => {
 
  if ((kindInput.value == "") || (weightInput.value == "")){
    warning('Заполните пожалуйста поля Наименование фрукта, вес и выбирете цвет');
    return false;
  }

  addCard(kindInput.value, colorInput.value, weightInput.value);

  display();
});
