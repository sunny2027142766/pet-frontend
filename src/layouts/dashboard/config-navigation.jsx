import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: '控制台',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: '用户管理',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: '产品管理',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: '社区管理',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: '登录界面',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: '注册界面',
    path: '/register',
    icon: icon('ic_lock'),
  },
  {
    title: '错误界面',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
