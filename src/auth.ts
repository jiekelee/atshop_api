// auth.ts
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { users } from './user'
import { log } from 'console'

// 定义一个密钥，用于生成和验证 token
const secret = 'mysecret'

// 定义一个登录函数，接收用户名和密码，返回一个 token 或一个错误信息
export function loginAuth(username: string, password: string) {
  try {
    // 在用户数据中查找匹配的用户名
    const user = users.find((user) => user.name === username)
    // 如果没有找到，返回一个错误信息
    if (!user) {
      // return { error: 'User not found' }
      // return { code: 201, data: { message: '账号不正确' } }
      return { code: 201, message:'登录失败',data:'账号不正确',ok:false}
    }
    // 如果找到了，比较密码是否正确
    // const match = await bcrypt.compare(password, user.password)
    const match = (password == user.password)
    // 如果不正确，返回一个错误信息
    if (!match) {
      // return { code: 201, data: { message: '密码不正确' } }
      return { code: 201, message:'登录失败',data:'密码不正确',ok:false}
    }
    // 如果正确，生成一个 token，有效期为一小时
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' })
    // 用户名，密码都正确，返回 code\token
    // return { code: 200, data: token }
    return { code: 200, message:'登录成功',data:token,ok:true}
  } catch (error) {
    // 如果发生异常，返回一个错误信息
    return { error: error.message }
    // return { code: 201, data: { message: '账号或者密码不正确' } }
  }
}

// 定义一个验证 token 函数，接收一个 token，返回一个用户信息或一个错误信息
export async function verifyToken(token: string) {
  try {
    // 如果没有传入 token，返回一个错误信息
    if (!token) {
      return { error: 'No token provided' }
    }
    // 验证 token 是否有效，如果无效，抛出异常
    const decoded = jwt.verify(token, secret) as { username: string }
    // 在用户数据中查找匹配的用户名
    const user = users.find((user) => user.name === decoded.username)
    // 如果没有找到，返回一个错误信息
    if (!user) {
      return { error: 'User not found' }
    }
    // 如果找到了，返回用户信息，不包括密码
    const { password, ...userInfo } = user
    // 返回用户信息
    return {code: 200,message:'获取用户信息成功', data: userInfo,ok:true }
  } catch (error) {
    // 如果发生异常，返回一个错误信息
    return { error: error.message }
  }
}
