export const query = key => {
        return JSON.parse(localStorage.getItem(key))
}
export const add = (setData, key) => {
    return localStorage.setItem(setData, JSON.stringify(key))
}
export const remove = key => {
    return localStorage.removeItem(key)
}