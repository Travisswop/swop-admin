export type Connection = {
  _id: string;
  childId: { profilePic: string; name: string; bio: string };
  date: string;
  lat: number;
  lng: number;
  address: string;
  connectionType: string[];
  rank: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
