import { gql } from '@apollo/client'

export const CREATE_ROLE = gql`
  mutation CreateRole($role: RoleInput) {
    createRole(role: $role) {
      id
      name
      permissions {
        resource
        actions
      }
    }
  }
`
export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
      permissions {
        resource
        actions
      }
    }
  }
`
export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: String!, $role: RoleInput) {
    updateRole(id: $id, role: $role) {
      id
      name
      permissions {
        resource
        actions
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role_id
    }
  }
`

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: String!, $roleId: String!) {
    updateUserRole(userId: $userId, roleId: $roleId) {
      id
      name
      email
      role_id
    }
  }
`

export const CREATE_NEWS_ARTICLE = gql`
  mutation CreateNewsArticle($article: NewsArticleInput) {
    createNewsArticle(article: $article) {
      id
      title
      author
      text
      origin_url
      created_at
      updated_at
    }
  }
`
export const GET_NEWS_ARTICLES = gql`
  query GetNewsArticles {
    newsArticles {
      id
      title
      author
      text
      origin_url
      created_at
      updated_at
    }
  }
`
export const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($id: Int!) {
    newsArticle(id: $id) {
      id
      title
      author
      text
      summary
      origin_url
      created_at
      updated_at
    }
  }
`
export const UPDATE_NEWS_ARTICLE = gql`
  mutation UpdateNewsArticle($id: Int!, $article: NewsArticleInput) {
    updateNewsArticle(id: $id, article: $article) {
      id
      title
      author
      summary
      text
      origin_url
      created_at
      updated_at
    }
  }
`

export const GET_PAGES_SLUG = gql`
  query GetPagesSlug {
    pages {
      slug
      slug_name
    }
  }
`

export const GET_PAGE = gql`
  query GetPage($slug: String!) {
    page(slug: $slug) {
      id
      slug
      title
      summary
      content
      created_at
      updated_at
    }
  }
`
export const GET_PAGES = gql`
  query GetPages {
    pages {
      id
      slug
      title
      summary
      content
      created_at
      updated_at
    }
  }
`
export const CREATE_PAGE = gql`
  mutation CreatePage($page: PageInput!) {
    createPage(page: $page) {
      id
    }
  }
`
export const GET_PAGE_BY_ID = gql`
  query GetPageById($id: String!) {
    pageById(id: $id) {
      id
      slug
      slug_name
      title
      summary
      content
    }
  }
`
export const UPDATE_PAGE_BY_ID = gql`
  mutation UpdatePageById($id: String!, $page: PageInput!) {
    updatePage(id: $id, page: $page) {
      id
      slug
      slug_name
      title
      summary
      content
      updated_at
    }
  }
`
export const DELETE_PAGE_BY_ID = gql`
  mutation DeletePageById($id: String!) {
    deletePage(id: $id) {
      id
    }
  }
`

export const DELETE_DOCUMENT_BY_ID = gql`
  mutation DeleteDocumentById($id: String!) {
    deleteDocument(id: $id) {
      id
    }
  }
`
