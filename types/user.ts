export interface IUser {
  _id?: string;
  name: string;
  email: string;
  profilePic?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
