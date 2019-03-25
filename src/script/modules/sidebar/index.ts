import ListItem from './listItem'
import '@style/sidebar.scss'
import {createElement} from '@mixins'

interface SidebarItem {
  id: string,
  title: string,
  description: string,
  icon: string
}

interface SidebarOpt {
  el: HTMLElement,
  items: SidebarItem[],
  onOpen: (id: string) => any
}

interface SidebarListItem {
  node: HTMLElement
}

export default class Sidebar {
  readonly items: SidebarListItem[];
  readonly wrapper: HTMLElement;
  toggleItem: (id: string) => any;
  open: boolean = false;

  constructor (opt: SidebarOpt) {
    // Init wrapper node
    this.wrapper = opt.el
    this.toggleItem = opt.onOpen
    // Set sidebar items
    this.items = opt.items.map(function (item) {
      return new ListItem(item)
    })

    const itemsWrap = createElement({
      tag: 'ul',
      options: {
        class: 'navigation navigation__wrapper'
      },
      child: this.items.map(item => item.node)
    })
    this.wrapper.addEventListener('click', (e) => this.toggleSidebar(e))
    this.wrapper.append(itemsWrap)
  }

  /**
   * Check sidebar click
   * @param e
   */
  private toggleSidebar (e: any) {
    this.open = !this.open
    this.setClass()
  }

  /**
   * Check open status of current sidebar,
   * toggle active class for wrapper
   */
  private setClass () {
    if (this.open) {
      this.wrapper.classList.add('active')
    } else {
      this.wrapper.classList.remove('active')
    }
  }
}
