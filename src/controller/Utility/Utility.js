export default class Utility {
  static createPropertyGroups(propObj, array, property) {
    for (let p in propObj) {
      for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let value = element[property];
        if (value === p) {
          propObj[p].push(element);
        }
      }
    }
    return propObj;
  }
}
