/**
 * Create element function
 * @param data - information about element that need create
 *       Include:
 *        tag - element tag
 *        options - element options
 *        child - children elements
 * @return DOM - created element
 */
interface elementOptions {
  [key: string]: string
}
interface createElement {
  tag: string,
  options?: elementOptions,
  child?: Array<HTMLElement | string>
}
export function createElement(data: createElement): HTMLElement {
  const element = document.createElement(data.tag)

  // set attributes
  Object.keys(data.options || {}).forEach(key => element.setAttribute(key, data.options[key]))

  data.child.forEach(el => {
    if (typeof el === "string") {
      element.innerText = el
    } else {
      element.appendChild(el)
    }
  })

  return element
}

export function findIndex(arr: any[], callback: (el: any, index: number, array: any[]) => boolean): any {
  let k: number = 0
  while (k < arr.length) {
    if (callback.call(this, arr[k], k, arr)) {
      return k
    }
    k++
  }
  return -1
}

export function shuffle(array: any[]): any[] {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
