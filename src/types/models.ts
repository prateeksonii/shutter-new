export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  Name: string;
  Username: string;
  Password: string;
  Contacts?: any[];
  SentInvites?: any[];
  ReceivedInvites?: any[];
}
