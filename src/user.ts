// user.ts
import bcrypt from 'bcrypt'

// 定义一个用户接口，包含用户名、密码、头像和权限等属性
interface User {  
  password: string,  
  routes:string[],
  buttons:string[], 
  roles: string[],
  name: string,
  avatar: string 
}

// 定义一个用户数据数组，用于模拟数据库
export const users: User[] = [
  {
    // 使用 bcrypt 加密密码，这里的密码是 'admin'
    // password: '$2b$10$XZyI0t9eLJi3gD7rN8qz6Ox1wEWvG9LZzGwALkZJUVGZTQeLlH4E.',
    password: 'admin',
    routes:['User','Category'],
    buttons:['cuser.detail','cuser.update'],
    roles: ['库存管理员','数据管理员'],
    name: 'admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  },
  {
    name: 'user',
    // 使用 bcrypt 加密密码，这里的密码是 'user'
    password: '$2b$10$Qo1rZfYfz49PqFfRW0alTOcNo2whiB1K5sEhjG8n1nQJ0fDf17FZu',
    avatar: 'https://i.imgur.com/6aJwqF6.png',
    routes:[],
    roles: ['user'],
    buttons:[]
  }
]
