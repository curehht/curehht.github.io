'use client'

import React from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

import classes from './AuthPanel.module.css'

export const AuthPanel = () => {
  const { data: session, status } = useSession()

  return (
    <div className={classes.component}>
      {status === 'unauthenticated' && (
        <button onClick={() => signIn()}>Войти</button>
      )}
      {status === 'loading' && <div className={classes.loader}></div>}
      {status === 'authenticated' && (
        <>
          <p className={classes.title}>Привет, {session?.user?.name}</p>
          <div className={classes.avatarAndMenu}>
            <Link href="/profile">
              <Image
                className={classes.avatar}
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
                width={50}
                height={50}
                onError={(e) => {
                  // fallback to default avatar if image fails to load
                  const target = e.target as HTMLImageElement
                  if (target.src !== '/logo.png') {
                    target.src = '/logo.png'
                  }
                }}
              />
            </Link>
            <div className={classes.menu}>
              <Link href="/profile" className={classes.linkToProfile}>
                Профиль
              </Link>
              <button
                className={classes.logout}
                onClick={() => {
                  if (confirm('Вы уверены, что хотите выйти?')) signOut()
                }}
              >
                Выйти
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
