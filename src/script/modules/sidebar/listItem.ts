import {createElement} from '@mixins'

interface EventCallbacks {
  [key: string]: (e: any, id: string) => any
}
interface ListItemOpt {
  id: string,
  title: string,
  description: string,
  icon: string,
  on: EventCallbacks
}

export default class ListItem {
  readonly info: ListItemOpt;
  node: HTMLElement;
  onOpen: (info: ListItemOpt) => any;

  constructor (opt: ListItemOpt) {
    this.info = opt
    this.render()
  }

  private render () {
    const image = createElement({
      tag: 'img',
      options: {
        alt: this.info.title,
        src: this.info.icon,
        class: 'navigation__item-image'
      }
    })
    const title = createElement({
      tag: 'span',
      options: {
        class: 'navigation__item-title'
      },
      child: [this.info.title]
    })
    this.node = createElement({
      tag: 'li',
      options: {
        title: this.info.title,
        class: 'navigation__item'
      },
      child: [image, title]
    })
    this.setListeners(this.info.on)
  }

  private setListeners (listeners: EventCallbacks) {
    Object.keys(listeners || {}).forEach( (key: string) => {
      this.node.addEventListener(key, (e: any) => {
        listeners[key](e, this.info.id)
      })
    })
  }

  private checkClick (e: any) {
    if (!this.onOpen) return
    e.preventDefault()
    e.stopPropagation()
    this.onOpen(this.info)
  }

}
