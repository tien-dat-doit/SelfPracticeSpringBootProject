export type UserType = {
    id: string,
    name: string,
    phone: string,
    avatar: string,
    createdDate: string,
    status: string
}

export type SingleUserResponse = {    
        id: string
        username: string
        firstName: string
        lastName: string
        dob: string
        roles:{
          name: string
          description: string
          permissions:{
            name: string
            description: string
          }[];
        }[];
};

export type ListUserResponse = {    
   code: number,
   result: SingleUserResponse[]
};