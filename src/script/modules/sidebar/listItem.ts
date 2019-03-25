import {createElement} from '@mixins'
interface ListItemOpt {
  id: string,
  title: string,
  description: string,
  icon: string
}

export default class ListItem {
  readonly info: ListItemOpt;
  node: HTMLElement;
  onOpen: (info: ListItemOpt) => any;

  constructor (opt: ListItemOpt) {
    this.info = opt
    this.render()
  }

  public render () {
    this.node = createElement({
      tag: 'li',
      options: {
        title: this.info.description,
        class: 'navigation__item'
      },
      on: {
        click: (e: any) => this.checkClick(e)
      },
      child: [this.info.title]
    })
  }

  private checkClick (e: any) {
    if (!this.onOpen) return
    e.preventDefault()
    e.stopPropagation()
    this.onOpen(this.info)
  }

}
