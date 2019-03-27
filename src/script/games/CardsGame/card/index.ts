import {createElement} from "@mixins/index";
interface CardNodeOptions {
  [key: string]: string | number
}
interface CreateCard {
  name: string,
  defaultName?: string,
  tagName?: string,
  options?: CardNodeOptions
}

export default class Card {
  /** Data */
  readonly defaultValue: string
  readonly element: HTMLElement;
  readonly value: string;
  active: boolean;

  /** Constructor */
  constructor(data: CreateCard) {
    this.active = false
    this.value = data.name
    this.defaultValue = data.defaultName || ''

    this.element = this.render(data)
  };

  /** Methods */
  toggle (): void {
    this.element.classList.toggle('card__wrapper--opened')
    this.element.innerText = this.active ? this.defaultValue : this.value
    this.active = !this.active
  };
  render (data: CreateCard): HTMLElement {
    const cardHeight = createElement({
      tag: 'div',
      options: {
        class: 'card__height'
      }
    })

    return createElement({
      tag: data.tagName || 'li',
      options: {
        class: 'card__wrapper',
        ...data.options
      },
      child: [cardHeight, this.defaultValue]
    })
  }
}
