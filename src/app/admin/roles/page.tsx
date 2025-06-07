import React from 'react'
import { RoleForm, RolesList } from '@/components'

const AdminRolePage: React.FC = async () => {
  return (
    <>
      <section>
        <h3>Добавить роль</h3>
        <RoleForm />
      </section>
      <section>
        <h3>Редактировать роли</h3>
        <RolesList />
      </section>
    </>
  )
}

export default AdminRolePage
