import { GraphQLError } from 'graphql'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { gql } from 'graphql-tag'
import { NextRequest } from 'next/server'

import { newsArticle, pages, roles, users } from '@/db/schema'
import { Resources, PermissionAction } from '@/db/types'
import { getUserDataFromRequest } from '@/utils/getUserFromRequest'
import { isAuthorized } from '@/utils/isAuthorized'

const typeDefs = gql`
  scalar Date
  scalar JSON

  type NewsArticle {
    id: Int!
    title: String!
    author: String!
    summary: String
    text: JSON
    origin_url: String
    updated_at: Date
    created_at: Date!
    deleted_at: Date
  }

  input NewsArticleInput {
    title: String!
    summary: String
    text: JSON
    origin_url: String
  }

  type Role {
    id: String!
    name: String!
    permissions: [Permission]
  }

  input RoleInput {
    name: String
    permissions: [PermissionInput]
  }

  type Permission {
    actions: [Action]
    resource: ResourceName!
  }

  input PermissionInput {
    actions: [Action]
    resource: ResourceName
  }

  enum Action {
    create
    read
    update
    delete
  }

  enum ResourceName {
    articles
    newsArticle
    roles
    page
  }

  type User {
    id: String!
    name: String
    email: String
    role_id: String
  }

  type Page {
    id: String!
    slug: String!
    slug_name: String!
    title: String!
    author_id: String
    summary: String
    content: String
    created_at: Date
    updated_at: Date
  }

  input PageInput {
    slug: String!
    slug_name: String!
    title: String!
    summary: String
    content: String
  }

  type Query {
    newsArticles: [NewsArticle]
    newsArticle(id: Int!): NewsArticle

    roles: [Role]

    users: [User]

    pages: [Page]
    page(slug: String!): Page
    pageById(id: String!): Page
  }

  type Mutation {
    createNewsArticle(article: NewsArticleInput): NewsArticle
    updateNewsArticle(id: Int!, article: NewsArticleInput): NewsArticle
    deleteNewsArticle(id: Int!): NewsArticle

    createRole(role: RoleInput): Role
    updateRole(id: String!, role: RoleInput): Role
    deleteRole(id: String!): Role

    updateUserRole(userId: String!, roleId: String!): User

    createPage(page: PageInput): Page
    updatePage(id: String!, page: PageInput): Page
    deletePage(id: String!): Page
  }
`

const resolvers = {
  Query: {
    newsArticles: async (_parent: unknown, _args: unknown, { db }) => {
      try {
        const result = await db.select().from(newsArticle)
        return result
      } catch (error) {
        throw new GraphQLError('Failed to fetch news articles', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
    newsArticle: async (_parent: unknown, { id }, { db }) => {
      try {
        const result = await db
          .select()
          .from(newsArticle)
          .where(eq(newsArticle.id, id))
        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to fetch news article', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },

    roles: async (_parent: unknown, _args: unknown, { db, userData }) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.newsArticle,
          action: PermissionAction.read,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }
        const result = await db.select().from(roles)
        return result
      } catch (error) {
        throw new GraphQLError('Failed to fetch roles', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },

    users: async (_parent: unknown, _args: unknown, { db, userData }) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.users,
          action: PermissionAction.read,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }
        const result = await db.select().from(users)
        return result
      } catch (error) {
        throw new GraphQLError('Failed to fetch users', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },

    pages: async (_parent: unknown, _args: unknown, { db }) => {
      try {
        const result = await db.select().from(pages)
        return result
      } catch (error) {
        throw new GraphQLError('Failed to fetch pages', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },

    page: async (_parent: unknown, { slug }, { db }) => {
      try {
        const result = await db.select().from(pages).where(eq(pages.slug, slug))
        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to fetch page', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
    pageById: async (_parent: unknown, { id }, { db }) => {
      try {
        const result = await db.select().from(pages).where(eq(pages.id, id))
        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to fetch page', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
  },
  Mutation: {
    createNewsArticle: async (
      _parent: unknown,
      { article },
      { db, userData }
    ) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.newsArticle,
          action: PermissionAction.create,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .insert(newsArticle)
          .values({ ...article, author: userData.id })
          .returning()
        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to create news article', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
    updateNewsArticle: async (
      _parent: unknown,
      { id, article },
      { db, userData }
    ) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.newsArticle,
          resourceAuthorId: article.author,
          action: PermissionAction.update,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .update(newsArticle)
          .set(article)
          .where(eq(newsArticle.id, id))
          .returning()

        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to update news article', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
    deleteNewsArticle: async (_parent: unknown, { id }, { db, userData }) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.newsArticle,
          resourceAuthorId: id,
          action: PermissionAction.delete,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .delete(newsArticle)
          .where(eq(newsArticle.id, id))
          .returning()

        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to delete news article', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },

    createRole: async (_parent: unknown, { role }, { db, userData }) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.roles,
          action: PermissionAction.create,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .insert(roles)
          .values({ ...role, owner_id: userData.id })
          .returning()
        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to create role', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
    updateRole: async (_parent: unknown, { id, role }, { db, userData }) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.roles,
          action: PermissionAction.update,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .update(roles)
          .set(role)
          .where(eq(roles.id, id))
          .returning()

        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to update role', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },

    updateUserRole: async (
      _parent: unknown,
      { userId, roleId },
      { db, userData }
    ) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.roles,
          action: PermissionAction.update,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .update(users)
          .set({ role_id: roleId })
          .where(eq(users.id, userId))
          .returning()

        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to update user role', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },

    createPage: async (_parent: unknown, { page }, { db, userData }) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.page,
          action: PermissionAction.create,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .insert(pages)
          .values({ ...page, author_id: userData.id })
          .returning()
        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to create page', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
    updatePage: async (_parent: unknown, { id, page }, { db, userData }) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.page,
          action: PermissionAction.update,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .update(pages)
          .set(page)
          .where(eq(pages.id, id))
          .returning()

        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to update page', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
    deletePage: async (_parent: unknown, { id }, { db, userData }) => {
      try {
        const canDo = isAuthorized({
          userData,
          resourceName: Resources.page,
          action: PermissionAction.delete,
        })
        if (!canDo) {
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED', status: 403 },
          })
        }

        const result = await db
          .delete(pages)
          .where(eq(pages.id, id))
          .returning()

        return result[0]
      } catch (error) {
        throw new GraphQLError('Failed to delete page', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500, error },
        })
      }
    },
  },
}

const server = new ApolloServer<object>({
  resolvers,
  typeDefs,
  introspection: true,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const userData = await getUserDataFromRequest(req)
    const db = drizzle()

    return { db, userData }
  },
})

export { handler as GET, handler as POST }
