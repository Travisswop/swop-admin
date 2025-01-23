import Chance from "chance";

export type Row = {
  id: number;
  date: string;
  name: string;
  image: string;
  email: string;
  payStatus: boolean;
  referrals: string;
  earned: number;
  reference: string;
  userReferralState: boolean;
  phone: string;
  bookingTime: string;
  address: string;
  profession: string;
  swopId: string;
  dateOfBirth: string;
  site: Site[];
};

export type Site = {
  id: string;
  smartSite: string;
  swopId: string;
  solana: string;
  signUpDate: string;
  nfc: number;
  balance: number;
  smartSiteId: string;
  premiumMembership: boolean;
  referrals: string;
  email: string;
  phone: string;
  order: Order[];
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type Order = {
  id: string;
  image: string;
  name: string;
  date: string;
  quantity: number;
};

const chance = new Chance(200);

function createData(id: number): Row {
  return {
    id,
    date: chance.date({ string: true, american: false }).toString(),
    name: chance.name(),
    email: chance.email(),
    image: `https://picsum.photos/id/${chance.integer({ min: 1, max: 200 })}/200`,
    payStatus: chance.bool(),
    referrals: chance.string({ length: 20 }),
    userReferralState: chance.bool({ likelihood: 20 }),
    earned: chance.integer({ min: 0, max: 100000 }),
    reference: chance.string({ length: 20 }),
    phone: chance.phone(),
    bookingTime: chance.date({ string: true, american: false }).toString(),
    address: chance.address(),
    profession: chance.profession(),
    swopId: chance.name().split(" ")[0] + ".Swop.Id",
    site: Array.from({ length: 10 }, () => createData2()),
    dateOfBirth: chance.date({ string: true, american: false }).toString(),
  };
}

function createData2(): Site {
  return {
    id: chance.string({ length: 20 }),
    smartSite: chance.word(),

    solana: chance.string({ length: 32 }).toLowerCase(),
    signUpDate: chance.date({ string: true, american: false }).toString(),
    nfc: chance.integer({ min: 100000000000, max: 999999999999 }),
    balance: chance.integer({ min: 0, max: 100000 }),
    smartSiteId: chance.word() + ".Swop.Id",
    premiumMembership: chance.bool(),
    referrals: chance.string({ length: 10 }).toUpperCase(),
    email: chance.email(),
    phone: chance.phone(),
    swopId: chance.name().split(" ")[0] + ".Swop.Id",
    order: Array.from({ length: chance.integer({ min: 1, max: 10 }) }, () =>
      createData3(),
    ),
    address1: chance.address(),
    address2: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip().toString(),
    country: chance.country(),
  };
}
function createData3(): Order {
  return {
    id: chance.string({ length: 20 }),
    image: `/images/product${chance.integer({ min: 1, max: 2 })}.png`,
    name: chance.word(),
    date: chance.date({ string: true, american: false }).toString(),
    quantity: chance.integer({ min: 1, max: 20 }),
  };
}

const data: Row[] = Array.from({ length: 30 }, (_, index) => createData(index));

//console.log(data[0].site);

export default data;

