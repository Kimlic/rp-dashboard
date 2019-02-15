export function hasAnyRole(userRoles = [], allowedRoles = []) {
  if (!userRoles) return false
  
  for (let i in allowedRoles) {
    if (userRoles.indexOf(allowedRoles[i]) > -1) return true
  }
  
  return false
}
