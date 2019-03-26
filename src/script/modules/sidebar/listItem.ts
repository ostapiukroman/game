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
    this.node = createElement({
      tag: 'li',
      options: {
        title: this.info.description,
        class: 'navigation__item'
      },
      child: [this.info.title]
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
