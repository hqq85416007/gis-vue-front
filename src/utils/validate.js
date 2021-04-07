//是否是外部链接
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}