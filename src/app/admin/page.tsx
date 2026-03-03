import React from 'react';
import { UsersList } from '@/components';

import { getUserDataFromSession } from '@/utils/getUserDataFromSession';
import { auth } from '@/auth';
import * as rolesController from '@/controllers/roles';
import * as usersController from '@/controllers/users';

async function AdminPage() {
  const session = await auth();
  const userData = await getUserDataFromSession(session);
  const [users, roles] = await Promise.all([
    usersController.getUsers(userData),
    rolesController.getRoles(userData),
  ]);

  return (
    <article>
      <h1>Админка</h1>
      <UsersList users={users} roles={roles} />
    </article>
  );
}

export default AdminPage;
