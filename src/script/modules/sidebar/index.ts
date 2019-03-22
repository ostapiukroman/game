import {createElement} from '@mixins'
import '@style/sidebar.scss'
interface SidebarItem {
  id: string,
  title: string,
  description: string,
  icon: string
}

interface SidebarOpt {
  el: HTMLElement,
  items: SidebarItem[]
}

export default class Sidebar {
  readonly items: HTMLElement[];
  readonly wrapper: HTMLElement;
  open: boolean = false;
  constructor (opt: SidebarOpt) {
    // Init wrapper node
    this.wrapper = opt.el
    // Set sidebar items
    this.items = opt.items.map(function (item) {
      return createElement({
        tag: 'li',
        options: {
          title: item.description,
          class: 'navigation__item'
        },
        child: [item.title]
      })
    })
    const itemsWrap = createElement({
      tag: 'ul',
      options: {
        class: 'navigation navigation__wrapper'
      },
      child: this.items
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
