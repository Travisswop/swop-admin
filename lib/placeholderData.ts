function createData(
    id: number,
    date: string,
    name: string,
    email: string,
    payStatus: boolean,
    referrals: string,
    earned: number,
    reference: string,
    phone: string,
    bookingTime: string,
    address: string,
    profession: string,
    swopId: string
  ) {
    return {
      id,
      date,
      name,
      reference,
      email,
      payStatus,
      referrals,
      earned,
      phone,
      bookingTime,
      address,
      profession,
      swopId,
    };
  }
  type Row = {
    id: number;
    date: string;
    name: string;
    email: string;
    payStatus: boolean;
    referrals: string;
    earned: number;
    reference: string;
    phone: string;
    bookingTime: string;
    address: string;
    profession: string;
    swopId: string;
  };
  
  const data = [] as Array<Row>;
  
  for (let i = 0; i < 20; i++) {
    data.push(
      createData(
        i,
        "2016-05-24",
        "Frozen yoghurt",
        "ref@gmail",
        true,
        "referrals",
        4.0,
        "ref",
        "1234567890",
        "10:00",
        "775 Rolling Green Rd.",
        "Software Engineer",
        "Alex.Swop.Id"
      )
    );
  }


  export default data