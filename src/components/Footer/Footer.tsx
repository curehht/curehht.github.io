import React from 'react'

import classes from './Footer.module.css'

function Footer() {
  return (
    <footer className={classes.component}>
      <section>
        <h3>официальные источники</h3>
        <ul>
          <li>
            Сайт <a href="https://curehht.org">curehht.org</a>
          </li>
          <li>
            Ютуб{' '}
            <a href="https://www.youtube.com/user/HHTFoundation">
              HHTFoundation
            </a>
          </li>
          <li>
            Facebook{' '}
            <a href="https://www.facebook.com/hht.org">facebook.com/hht.org</a>
          </li>
        </ul>
      </section>
      <section>
        <h3>дополнительно</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/groups/5484437834/">
              HHT Awareness
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/groups/152612813303/">
              HHT International
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/groups/L.W.H.H.Tphotosvideos/">
              Living with HHT Read our stories & see our Photos & More.
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/groups/1503220203260718/">
              Women with HHT
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/groups/349798917563/">
              HHT or (Osler-Weber-Rendu Syndrome)
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/groups/238198683185208/">
              HHT WARRIORS
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h3>на русском</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/groups/curehhtru/">
              facebook/curehhtru
            </a>
          </li>
          <li>
            <a href="https://vk.com/curehhtru">vk.com/curehhtru</a>
          </li>
        </ul>
        <h3>код</h3>
        <p>
          <a href="https://github.com/curehht/curehht.github.io">
            curehht.github.io
          </a>
        </p>
      </section>
    </footer>
  )
}

export default Footer
