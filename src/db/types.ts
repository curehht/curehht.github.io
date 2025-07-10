export enum PermissionAction {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

export enum Resources {
  newsArticle = 'newsArticle',
  page = 'page',
  roles = 'roles',
  users = 'users',
  document = 'document',
}

export interface Permission {
  actions: PermissionAction[]
  resource: Resources
}

export interface Role {
  id: string
  name: string
  permissions: Permission[]
  created_at: Date
  updated_at: Date
  owner_id: string
}

export interface UserData {
  id: string
  name: string
  email: string
  emailVerified: Date | null
  image: string
  role_id: string
  role: Role
  sessionExpires: Date
}

export interface Page {
  id: string
  slug: string
  title: string
  content: string
  description: string
  summary: string
  created_at: Date
  updated_at: Date
}

export interface DocumentInput {
  title: string
  description: string
  is_published: boolean
  blocks: DocumentBlockInput[]
  author_id: string
}

export interface DocumentBlockInput {
  position: number
  type: string
  title: string
  content: string
  url: string
}

export interface DocumentBlock {
  id: string
  document_id: string
  position: number
  type: string
  content: string
  url: string
  title: string
  created_at: Date
  updated_at: Date
}

export interface DocumentWithContent extends Document {
  content: Array<DocumentBlock>
}
