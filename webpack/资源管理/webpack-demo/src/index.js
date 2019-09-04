import _ from 'lodash'
function component () {
  let el = document.createElement('div')

  el.innerHTML = _.join(['Hello', 'webpack'], ' ')
  return el
}
document.body.appendChild(component())