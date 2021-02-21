import Link from 'next/link'

function Menu() {
  return (
    <nav>
      <ul>
        <li><Link href="/"><a>главная</a></Link></li>
        <li><Link href="/diagnostics"><a>диагностика</a></Link></li>
        <li><Link href="/treatment"><a>лечение</a></Link></li>
        <li><Link href="/life-style"><a>образ жизни</a></Link></li>
{/*        <li><Link href="/contacts"><a>люди</a></Link></li>
        <li><Link href="/feedback"><a>обратная связь</a></Link></li>*/}
      </ul>
    </nav>
  )
}

export default Menu
