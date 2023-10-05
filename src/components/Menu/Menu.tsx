import Link from 'next/link'

function Menu() {
  return (
    <nav>
      <ul>
        <li><Link href="/">главная</Link></li>
        <li><Link href="/diagnostics">диагностика</Link></li>
        <li><Link href="/treatment">лечение</Link></li>
        <li><Link href="/life-style">образ жизни</Link></li>
{/*        <li><Link href="/contacts">люди</Link></li>
        <li><Link href="/feedback">обратная связь</Link></li>*/}
      </ul>
    </nav>
  )
}

export default Menu
