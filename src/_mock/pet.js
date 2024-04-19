import { sample } from "lodash";
import { faker } from "@faker-js/faker";

const PET_NAME = [
  "毛毛",
  "小黑",
  "小白",
  "小黄",
  "小灰",
  "小蓝",
  "小绿",
  "小紫",
  "小橙",
];
const PET_TYPES = ["狗", "猫", "鸟", "兔"];
const PET_BREEDS = {
  狗: ["拉布拉多寻回犬", "金毛寻回犬", "德国牧羊犬"],
  猫: ["美国短毛猫", "暹罗猫", "波斯猫"],
  鸟: ["鹦鹉", "金丝雀"],
  兔: ["荷兰矮耳兔", "安哥拉兔"],
};

export const pets = [...Array(12)].map((_, index) => {
  const type = faker.helpers.arrayElement(PET_TYPES);
  const breed = faker.helpers.arrayElement(PET_BREEDS[type]);

  return {
    id: faker.string.uuid(),
    photo: `/assets/images/pets/pet_${index + 1}.png`,
    name: PET_NAME[index],
    type,
    breed,
    age: faker.number.int({ min: 1, max: 15 }), // 假设年龄范围是1-15岁
    weight: faker.number.float({ min: 1.0, max: 60.0 }).toFixed(2), // 体重以千克计
    health: faker.helpers.arrayElement(["健康", "有慢性病", "偶尔小病"]),
    is3D: sample(["2D", "3D", ""]),
  };
});
