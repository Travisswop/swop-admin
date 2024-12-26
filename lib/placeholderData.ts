import Chance from "chance";

// function createData(
//     id: number,
//     date: string,
//     name: string,
//     email: string,
//     payStatus: boolean,
//     referrals: string,
//     earned: number,
//     reference: string,
//     phone: string,
//     bookingTime: string,
//     address: string,
//     profession: string,
//     swopId: string
//   ) {
//     return {
//       id,
//       date,
//       name,
//       reference,
//       email,
//       payStatus,
//       referrals,
//       earned,
//       phone,
//       bookingTime,
//       address,
//       profession,
//       swopId,
//     };
//   }
  type Row = {
    id: number;
    date: string;
    name: string;
    image: string;
    email: string;
    payStatus: boolean;
    referrals: string;
    earned: number;
    reference: string;
    userReferralState : boolean;
    phone: string;
    bookingTime: string;
    address: string;
    profession: string;
    swopId: string;
  };
  
  // const data = [] as Array<Row>;
  
  // for (let i = 0; i < 20; i++) {
  //   data.push(
  //     createData(
  //       i,
  //       "2016-05-24",
  //       "Frozen yoghurt",
  //       "ref@gmail",
  //       true,
  //       "referrals",
  //       4.0,
  //       "ref",
  //       "1234567890",
  //       "10:00",
  //       "775 Rolling Green Rd.",
  //       "Software Engineer",
  //       "Alex.Swop.Id"
  //     )
  //   );
  // }


  const chance = new Chance(200);



function createData(id: number): Row {
  return {
    id,
    date: chance.date({string: true, american: false}).toString(),
    name: chance.name(),
    email: chance.email(),
    image: `https://picsum.photos/id/${chance.integer({ min: 1, max: 200 })}/200`,
    payStatus: chance.bool(),
    referrals: chance.string({ length: 20 }),
    userReferralState: chance.bool({ likelihood: 20 }),
    earned: chance.integer({ min: 0, max: 100000 }),
    reference: chance.string({ length: 20 }),
    phone: chance.phone(),
    bookingTime: chance.date({string: true, american: false}).toString(),
    address: chance.address(),
    profession: chance.profession(),
    swopId: chance.name().split(" ")[0]+".Swop.Id",
  };
}
const data: Row[] = Array.from({ length: 30 }, (_, index) => createData(index));

  export default data