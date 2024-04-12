export enum PRIVACY_TYPE {
    PUBLIC = "public",
    PRIVATE = "private",
    GROUP = "group",
  }
  
  export interface Club  {
    id: string;
    name:string;
    owner: string;
    verified: boolean;
    contract: string;
    blockchain_address?: string;
    files?: File[];
    created_at: Date;
    image: string;
    updated_at?: Date;
    isUserMember?: boolean;
    userRole?: string;
  }