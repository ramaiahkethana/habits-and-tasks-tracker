
String.prototype.capitalize = function () {
  return this.toLowerCase().charAt(0).toUpperCase() + this.toLowerCase().slice(1);
}
export default {
  isBoolean: (value) => {
    return typeof value === 'boolean'
  },
  includes: (source = [], element) => {
    return source.length && element && source.indexOf(element) > -1;
  },
  has: (source = {}, key) => {
    return source.hasOwnProperty(key)
  },
  get: (source, key) => {
    return source[key]
  },
}