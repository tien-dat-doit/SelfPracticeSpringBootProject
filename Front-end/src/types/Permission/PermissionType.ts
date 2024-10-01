export type PermissionType = {
  name: string
  description: string
  permissions: {
    name: string
    description: string
  } [];
};


export type PermissionResponse = {
  code: number
  result: PermissionType[]
};