import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenExpireKey = 'Admin-Token-Expire'

export function getToken() {
  const token = Cookies.get(TokenKey)
  const expireTime = Cookies.get(TokenExpireKey)
  
  // 检查token是否过期
  if (token && expireTime) {
    const now = new Date().getTime()
    if (now > parseInt(expireTime)) {
      // token已过期，自动清除
      removeToken()
      return null
    }
  }
  
  return token
}

export function setToken(token, expireHours = 24) {
  // 设置token过期时间（默认24小时）
  const expireTime = new Date().getTime() + (expireHours * 60 * 60 * 1000)
  
  Cookies.set(TokenKey, token, { expires: expireHours / 24 })
  Cookies.set(TokenExpireKey, expireTime.toString(), { expires: expireHours / 24 })
  
  return token
}

export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(TokenExpireKey)
  // 同时清除localStorage中的相关数据
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
}

// 检查token是否即将过期（提前30分钟提醒）
export function isTokenExpiringSoon() {
  const expireTime = Cookies.get(TokenExpireKey)
  if (expireTime) {
    const now = new Date().getTime()
    const thirtyMinutes = 30 * 60 * 1000
    return (parseInt(expireTime) - now) < thirtyMinutes
  }
  return false
}

// 刷新token过期时间
export function refreshTokenExpire(expireHours = 24) {
  const token = Cookies.get(TokenKey)
  if (token) {
    setToken(token, expireHours)
  }
}
