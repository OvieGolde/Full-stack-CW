export const getCachedCart = () => localStorage.getItem("cachedCart");
export const updateCachedCart = (cart) => localStorage.setItem("cachedCart", JSON.stringify(cart));

export const parseProxyData = (data) => {
  return JSON.parse(JSON.stringify(data))
}
