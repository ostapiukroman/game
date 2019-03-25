// load styles
import '@style/styles.scss'
import Sidebar from '@modules/sidebar'
import CardsGame from '@games/CardsGame'
import conf from '@/conf/games'

/**
 * Add or remove load class to/from body
 * @return Boolean - status of current process (for more info see classList.toggle() documentation)
 */
function toggleLoad() {
  return document.body.classList.toggle('load')
}

function renderGame (id) {

}

/** *********** start launch game ***************************/
// toggle load
toggleLoad()

// init page sidebar
const sidebarNode = document.getElementById('sidebar')
new Sidebar({
  el: sidebarNode,
  items: conf.games,
  onOpen (id) {
    console.log('open game with id:', id)
    renderGame(id)
  }
})

// application wrapper
const App = document.getElementById('app')

new CardsGame({
  wrapper: App,
  values: ['one', 'two', 'tree', 'four', 'five'],
  onSuccess () { }
})
// toggle load
toggleLoad()
/** **************finish launch game *************************/
