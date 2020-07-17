(function () {

  /* Starfield background - No canvas - 
  created in 2004 by Kurt Grigg.
  To show good faith I have updated it (to my current level)
  to new js rules and applies some changes for my game.
  orr. code src = https://stackoverflow.com/questions/31680639/non-canvas-javascript-starfield-animation-in-latest-explorer-not-smooth
  */

  let v = 1.0 // Star speed
  const m = 10 // Max speed 
  const n = 200 // Star No
  const r = 5 // 1 in 'r' stars to inner field 

  //End config.

  let con, dir, star, trns
  const d = document
  const cols = ['#ffffff']
  const depth = 2000
  const deg = 180 / Math.PI
  const cony = 0
  const conx = 0
  const mls = 1000 / 60
  let ini = performance.now()
  const strs = [],
    starCoords = []
  const xyo = -(50 / 7)

  con = d.createElement('div')
  con.setAttribute('style', 'display:block;'
    + 'position:absolute;'
    + 'top:0px;left:0px;'
    + 'height:100%;width:100%;'
    + 'margin:0px;padding:0px;'
    + 'overflow:hidden;'
    + 'visibility:hidden;')
  d.body.appendChild(con)

  for (let i = 0; i < n; i++) {
    const col = cols[Math.random() * cols.length | 0]
    strs[i] = d.createElement('div')
    strs[i].setAttribute('style', 'display:block;'
      + 'position:absolute;'
      + 'height:200px;'
      + 'width:200px;'
      + 'margin-top:-100px;'
      + 'margin-left:-100px;'
      + 'background-color:' + col + ';'
      + 'border-radius: 50%;'
      + 'visibility:visible;')
    con.appendChild(strs[i])
  }

  dir = d.createElement('div')
  dir.setAttribute('style', 'display:block;'
    + 'position:absolute;'
    + 'bottom:0;right:0;'
    + 'margin:3px;'
    + 'height:auto;width:auto;'
    + 'padding:5px;letter-spacing:1px;'
    + 'font:11px Verdana,Courier new;'
    + 'text-align:center;color:#fff;'
    + 'cursor:n-resize;opacity:0.2;'
    + 'visibility:visible;')
  con.appendChild(dir)


  function scrl(a) {
    let y, x
    y = window.pageYOffset
    x = window.pageXOffset
    return (a === 0) ? y : x
  }

  function iniscrl() {
    con.style.top = cony + scrl(0) + 'px'
    con.style.left = conx + scrl(1) + 'px'
  }

  function Trnsfrm(e) {
    const t = 'Transform'
    let v
    const vo = [t, 'Webkit' + t, 'ms' + t, 'Moz' + t, 'O' + t]
    while (v = vo.shift()) {
      if (typeof e.style[v] !== 'undefined') {
        return v
      }
    }
    return false
  }
  trns = Trnsfrm(d.body)

  function initCoords() {
    for (let i = 0; i < n; i++) {
      star = {
        x: coords(1),
        y: coords(2),
        z: coords(),
        o: 0
      }
      starCoords.push(star)
      star.o = 1 - (0.8 * star.z / depth)
    }
  }

  function coords(a) {
    const rnd = Math.floor(Math.random() * r)
    const sel = (rnd === 0) ? 2.5 : 1.4
    let xyz
    if (a === 1) {
      xyz = 50 + Math.random() * 50 / sel *
        Math.sin(Math.random() * deg)
    } else if (a === 2) {
      xyz = 50 + Math.random() * 50 / sel *
        Math.cos(Math.random() * deg)
    } else {
      xyz = Math.random() * depth
    }
    return xyz
  }

  function animateCoords() {
    for (let i = 0; i < n; i++) {
      star = starCoords[i]
      star.z -= v
      if (v >= 0) {
        if (star.z < 0) {
          star.z = depth
          star.x = coords(1)
          star.y = coords(2)
          star.o = 0
        }
        if (star.o < 1) {
          star.o += (v / 1000)
        }
      } else if (v < 0) {
        if (star.z > depth) {
          star.z = -1
          star.x = coords(1)
          star.y = coords(2)
          star.o = 1.0
        }
        if (star.z > 1000) {
          star.o += (v / 1100)
        }
      }
    }
  }

  function assignCoords() {
    let xpos, ypos, dims, theStars
    for (let i = 0; i < n; i++) {
      star = starCoords[i]
      theStars = strs[i]
      xpos = xyo + (star.x - 50) * (depth / star.z) + deg
      ypos = xyo + (star.y - 50) * (depth / star.z) + deg
      dims = (1 * (depth / star.z)) / 130
      theStars.style[trns] = 'translate3d(' + (xpos) +
        'vw, ' + (ypos) + 'vh, 0) scale3d(' + dims + ', ' +
        dims + ', 1)'
      theStars.style.opacity = star.o
      theStars.style.zIndex = Math.round(-star.z)
    }
  }

  function mouseCon(e) {
    const tmp = (e.detail) ? -e.detail / 3 : e.wheelDelta / 120
    const inc = (tmp >= 0) ? 0.5 : -0.5
    v += inc
    if (v < -m) {
      v += 0.5
    }
    if (v > m) {
      v -= 0.5
    }
    e.preventDefault()
  }

  function draw() {
    const now = performance.now()
    if ((now - ini) > (mls)) {
      animateCoords()
      assignCoords()
      ini = performance.now()
    }
    window.requestAnimationFrame(draw)
  }

  function init() {
    initCoords()
    assignCoords()
    draw()
  }

  dir.onmouseout = function () {
    dir.style.opacity = 0.2
  }
  dir.onmouseover = function () {
    dir.style.opacity = 1
  }

  dir.addEventListener('mousewheel', mouseCon, false)
  dir.addEventListener('DOMMouseScroll', mouseCon, false)
  window.addEventListener('scroll', iniscrl, false)
  window.addEventListener('load', init, false)

})()