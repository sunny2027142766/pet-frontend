import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['正常', '禁用']),
  role: sample([
    '管理员',
    '普通用户',
    '高级用户',
    '超级用户',
    '测试用户',
    '开发用户',
    '运营用户',
    '产品用户',
    '设计用户',
    '市场用户',
    '客服用户',
  ]),
}));

