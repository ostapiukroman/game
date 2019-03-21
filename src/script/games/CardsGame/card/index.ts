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
  readonly defaultValue: string
  readonly element: HTMLElement;
  readonly value: string;
  active: boolean;
  constructor(data: CreateCard) {
    this.active = false
    this.value = data.name
    this.defaultValue = data.defaultName || 'chose'

    this.element = createElement({
      tag: data.tagName || 'li',
      options: {
        class: 'card',
        ...data.options
      },
      child: [this.defaultValue]
    })

  };
  toggle (): void {
    this.element.classList.toggle('card--opened')
    this.element.innerText = this.active ? this.defaultValue : this.value
    this.active = !this.active
  };
}
