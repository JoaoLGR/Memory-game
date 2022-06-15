const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let fistCard, secondCard
let blockBoard = false

function flipCard() {
  if (blockBoard) return
  if (this === fistCard) return

  this.classList.add('flip')
  if (!hasFlippedCard) {
    hasFlippedCard = true
    fistCard = this
    return
  }

  secondCard = this
  hasFlippedCard = false
  checkForMatch()
}

function checkForMatch() {
  if (fistCard.dataset.card === secondCard.dataset.card) {
    disableCards()
    return
  }

  unflipCards()
}

function disableCards() {
  fistCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetBoard()
}

function unflipCards() {
  blockBoard = true

  setTimeout(() => {
    fistCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard()
  }, 1500)
}

function resetBoard() {
  [hasFlippedCard, blockBoard] = [false, false]
  [fistCard, secondCard] = [null, null]
}

(function embaralhar() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() *12);
    card.style.order = randomPosition;
  })
})();

cards.forEach(card => {
  card.addEventListener('click', flipCard)
})
