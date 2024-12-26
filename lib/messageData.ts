import Chance from "chance";
const chance = new Chance(200);

type Message = {
  id: number;
  message: string;
  date: string;
  time: string;
  name: string;
  image: string;
  messageLeft: string;
  messageRight: string;
};

function message(id: number): Message {
  return {
    id,
    message: chance.paragraph({ sentence: 1 }),
    date: chance.date({ string: true, american: false }).toString(),
    time: chance.hour() + ":" + chance.minute(),
    name: chance.name(),
    image: `https://picsum.photos/id/${chance.integer({
      min: 1,
      max: 200,
    })}/200`,
    messageLeft: chance.paragraph({ sentence: 1 }).slice(0, Math.random() * 200),
    messageRight: chance.paragraph({ sentence: 1 }).slice(0, Math.random() * 150),
  };
}

const messageData: Message[] = Array.from({ length: 30 }, (_, index) =>
  message(index)
);

export default messageData;
