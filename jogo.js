const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons') //git status On branch main / git add . / git push

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Você é uma aluna do ensino médio, tem uma amiga chamada Juliette Cuzcuz que frequenta a mesma escola. Um dia percebe que Juliette Cuzcuz não apareceu nas aulas e fica preocupada',
    options: [
      {
        text: 'Vai até a casa de Juliette para saber oque aconteceu',
        setState: { goToHouse: true },
        nextText: 2
      },
      {
        text: 'Volta pra casa e liga pra sua amiga, ela não atende',
        setState: { goToHouse: true },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Você está decidida em saber o que aconteceu com Juliette',
    options: [
      {
        text: 'Você chega na casa dela e a vê enforcada, pendurada na janela do quarto.',
        requiredState: (currentState) => currentState.goToHouse,
        setState: { goToHouse: false, dontGo: true },
        nextText: 3
      },
      {
        text: 'Você vai encontrar uma amiga no parque, para conversar sobre',
        requiredState: (currentState) => currentState.goToHouse,
        setState: { goToHouse: false, dontGo: true },
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: '...',
    options: [
      {
        text: 'Você corre assustada tentando voltar para casa, derrepente você vê apenas a cabeça de Juliette flutuando, com seu corpo enforcado pendurado',
        nextText: 4
      },
      {
        text: 'Algo estranho, como um balão se aproxima em sua direção, ao chegar perto você percebe que é a cabeça de Juliette se aproximando, com seu corpo enforcado pendurado',
        nextText: 4
      },
      
    ]
  },
  {
    id: 4,
     text: 'Derrepente sua cabeça em forma de balão aparece e começa a te perseguir.',
    options: [
      {
        text: 'Sua cebeça tem um sorriso macabro e hipnotizador que te atrai para a morte, e você se torna mais uma vítima',
        nextText: -1
      },
      {
        text: 'Você tenta pedir ajuda, mas ninguém abre a porta, você é inforcada e se torna mais uma vítima',
        nextText: -1
      },
      
    ]
  }
]  
  
startGame()