// load styles
import '@style/styles.scss'
import Sidebar from '@modules/sidebar'
import conf from '@/conf/games'

/**
 * Add or remove load class to/from body
 * @return Boolean - status of current process (for more info see classList.toggle() documentation)
 */
function toggleLoad() {
  return document.body.classList.toggle('load')
}

async function renderGame (id) {
  // application wrapper
  const App = document.getElementById('play-ground')
  const gameInfo = conf.games.find(item => item.id === id)
  const game = await import('@games/' + gameInfo.path + '/index.ts')
  new game.default({
    wrapper: App,
    values: ['one', 'two', 'tree', 'four', 'five', 'six'],
    onSuccess () { }
  })
}

/** *********** start launch game ***************************/
// toggle load
toggleLoad()

// init page sidebar
const sidebarNode = document.getElementById('sidebar')
new Sidebar({
  el: sidebarNode,
  items: conf.games,
  on: {
    click (e, id) {
      e.preventDefault()
      e.stopPropagation()
      renderGame(id)
    }
  }
})

// toggle load
toggleLoad()
/** **************finish launch game *************************/
