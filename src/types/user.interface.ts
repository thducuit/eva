export type WPUserRole =
  | "subscriber"
  | "contributor"
  | "author"
  | "editor"
  | "administrator"
  | (string & {})

export type WPCapability =
  | "read"
  | "level_0"
  | "subscriber"
  | (string & {})

export interface IUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  display_name: string
  registered: string
  roles: WPUserRole[]
  capabilities: WPCapability[]
  email_verified: boolean
  phone: string
  customer_code: string
}