import Card from './card/index'
import {createElement, findIndex, shuffle} from "@mixins/index";
interface CardsGameInterface {
  wrapper: HTMLElement,
  values: string[],
  onSuccess: () => any
}

export default class CardsGame {
  readonly element: HTMLElement;
  readonly cards: any;
  readonly onSuccess: () => any;
  openedCards: number[];
  openedCard: number;
  constructor (options: CardsGameInterface) {
    this.onSuccess = options.onSuccess
    /** init cards */
    this.openedCards = []
    this.cards = shuffle([].concat(options.values, options.values)).map(function (value) {
      return new Card({name: value})
    })

    /** render wrapper with cards */
    this.element = createElement({
      tag: 'ul',
      options: {
        class: 'card__wrapper'
      },
      child: this.cards.map((card: any) => card.element)
    })

    /** add click listener */
    this.element.addEventListener('click', (e) => this.checkClickCard(e))

    /** render app */
    options.wrapper.appendChild(this.element)
  };
  private checkClickCard (e: any) {
    // get clicked card index
    const cardIndex = findIndex(this.cards, function (item) {
      return item.element === e.target
    })
    if (cardIndex < 0 || this.openedCards.indexOf(cardIndex) >= 0) return
    // check opened card exist
    if (this.openedCard >= 0) {

      if (this.openedCard === cardIndex) {
        // click on the same card
        this.openedCard = undefined
        this.toggleCard([cardIndex])
      } else {
        // open second card
        this.toggleCard([cardIndex])
        this.checkSameCards([cardIndex, this.openedCard])
        this.openedCard = undefined
      }

    } else {
      this.toggleCard([cardIndex])
      this.openedCard = cardIndex
    }
  };
  private checkSameCards (cards: number[]) {
    if (this.cards[cards[0]].value !== this.cards[cards[1]].value) {
      setTimeout(() => {
        this.toggleCard(cards)
      }, 1000)
    } else {
      this.openedCards = this.openedCards.concat(cards)
      this.checkGameComplete()
    }
  };
  private toggleCard (cards: number[]) {
    cards.forEach(id => {
      if (id >= 0) {
        this.cards[id].toggle()
      }
    })
  };
  private checkGameComplete () {
    if (this.cards.length === this.openedCards.length) {
      this.onSuccess()
    }
  }
}
