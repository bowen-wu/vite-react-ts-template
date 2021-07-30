interface AttributeInterface {
  [propsName: string]: boolean;
}

const scopedClasses =
  (prefixClassName: string) =>
  (name: AttributeInterface | string = '') => {
    if (name instanceof Object) {
      if (Object.keys(name).some((item) => item === '')) {
        throw new Error(`${prefixClassName} Object key is Truthy`);
      }
      return Object.entries(name)
        .filter((item) => item[1])
        .map((item) => item[0])
        .map((item) => [prefixClassName, item].join('-'))
        .join(' ');
    }
    return [prefixClassName, name].filter(Boolean).join('-');
  };

export default scopedClasses;
