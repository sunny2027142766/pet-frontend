import { faker } from "@faker-js/faker";

// ----------------------------------------------------------------------
export const posts = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${(index % 4) + 1}.jpg`,
  title: "帖子标题",
  createdAt: faker.date.past(),
  view: faker.number.int(99999),
  comment: faker.number.int(99999),
  share: faker.number.int(99999),
  favorite: faker.number.int(99999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));
