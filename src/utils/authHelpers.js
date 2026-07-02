export function getHomePathForRole(role) {
  if (role === "admin") return "/admin";
  if (role === "owner") return "/owner";
  return "/customer";
}
