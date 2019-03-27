import {createElement} from '@mixins/index.ts';
interface CardValue {
  value: string,
  suit: string
}

export default class Card {
  /** Data */
  readonly openClass: string = 'card--opened'
  element: HTMLElement;

  /** Constructor */
  constructor(
    public data: CardValue,
    public active: boolean = false,
    public defaultValue: string = ''
  ) {
    this.element = this.renderWrapper()
    this.render()
  };

  /** Getters */
  get CardTemplate (): HTMLElement {
    const icon = createElement({
      tag: 'span',
      options: {
        class: `card__suit-icon card__suit-icon--${this.data.suit}`
      }
    })
    return createElement({
      tag: 'span',
      options: {
        class: `card__suit`
      },
      child: [this.data.value, icon]
    })
  }

  /** Methods */
  toggle (): void {
    this.active = !this.active
    this.element.classList.toggle(this.openClass)
    this.clear()
    this.render()
  };
  clear () {
    this.element.removeChild(this.element.lastChild)
  };
  renderWrapper (): HTMLElement {
    const cardHeight = createElement({
      tag: 'div',
      options: {
        class: 'card__height'
      }
    })
    return createElement({
      tag: 'li',
      options: {
        class: `card ${this.active ? this.openClass : ''}`
      },
      child: [cardHeight]
    })
  };
  render (): void {
    const contentWrapper = createElement({
      tag: 'div',
      options: {
        class: 'card__wrapper'
      },
      child: this.active ? [this.CardTemplate, this.CardTemplate] : [this.defaultValue]
    })
    this.element.appendChild(contentWrapper)
  }
}
