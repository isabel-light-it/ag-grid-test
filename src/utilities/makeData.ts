import { faker } from "@faker-js/faker";
//models
import { Person } from "../models/Person";
import { Pet } from "../models/Pet";

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ max: 100 }),
    isWorking: faker.datatype.boolean(),
    country: faker.address.country(),
    gender: faker.name.sex(),
  };
};
const newPet = (): Pet => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ max: 100 }),
    animal: faker.animal.type(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}

export function makePets(...lens: number[]) {
  const makeDataLevel = (depth = 0): Pet[] => {
    const len = lens[depth]!;
    return range(len).map((d): Pet => {
      return {
        ...newPet(),
      };
    });
  };

  return makeDataLevel();
}
