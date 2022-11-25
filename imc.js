// function calcularImc(peso, altura) {
//   return peso / Math.pow (altura,2);
// }
// function classificacaoImc (imc) {
//   if (imc < 18.5) {
//     return 'abaixo do peso';
//   } else if(imc > 18.5 && imc < 25) {
//     return 'peso normal';
//   } else  if(imc >=25 && imc <30) {
//     return 'acima do peso';
//   } else if (imc >=30 && imc <40) {
//     return 'obeso';
//   } else {
//     return 'obesidade grave';
//   }
// }
// function main () {
// const peso = 80;
// const altura = 1.70;
// const imc = calcularImc (peso, altura);
// console.log(classificacaoImc (imc));
// }
// main ();

const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// documentos selecionados
const imctable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");
const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#back-btn");


// função de criar tabelas 

function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");
    
    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imctable.appendChild(div);
  });
}


// funçao de limpar campos
function clearInputs(){
  heightInput.value = "";
  weightInput.value = "";
;
}

// função de bloquear letras e caracteres especiais (validade digitos)
function validDigits(text) {
  return text.replace (/[^0-9,]/g, "");
}  

// função do imc
function calcImc(height, weight) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
} 

// função de mostrar o resultado
function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
 
}

// eventos

// evento de bloquear letras e caracteres especiais (validade digitos)
[heightInput, weightInput].forEach ((el) => {
  el.addEventListener("input", (e) => {
    const updateValue = validDigits(e.target.value);
    e.target.value = updateValue;
  });
});

// evento de transformar peso e altura para numero com , e .
calcBtn.addEventListener("click", (e) =>{
e.preventDefault();
const weight = +weightInput.value.replace(",", ".");
const height = +heightInput.value.replace("," , ".");

console.log(weight, height);

if (!weight || !height) return;
const imc = calcImc(height, weight);

let info;
data.forEach((item) => { 
  if (imc >= item.min && imc <=item.max) {
    info = item.info;
  }
})
  if(!info) return;
  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

// inicialização
createTable(data);
