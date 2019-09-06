import _ from 'lodash'
import './style.css'
import Img from './test.jpeg'
import Data from './data.xml';
function component () {
  let el = document.createElement('div')

  el.innerHTML = _.join(['Hello', 'webpack'], ' ');
  el.classList.add('hello');
  // 添加图片到div
  var img = new Image();
  img.src = Img;
  el.append(img);
  console.log(Data);
  return el
}
document.body.appendChild(component())