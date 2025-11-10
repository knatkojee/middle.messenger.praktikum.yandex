// TODO выпилить файл перед ревью

type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isObject(object)) {
    console.log(object);
    return object;
  }

  const rhs = objectFromString(path, value);
  merge(object, rhs);

  console.log(object);
  return object;
}

// set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
// set(3, 'foo.bar', 'baz'); // 3

export function objectFromString(str: string, value: unknown) {
  console.log(str);
  console.log(value);

  if (!str.includes('.')) return { [str]: value };

  const obj: Indexed = {};

  obj[str.split('.')[0]] = objectFromString(str.slice(str.indexOf('.') + 1, str.length), value);

  return obj;
}

export function isObject(value: unknown): value is Indexed {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp)
  );
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const key in rhs) {
    if (!rhs.hasOwnProperty(key)) {
      continue;
    }

    try {
      if (isObject(lhs[key]) && isObject(rhs[key])) {
        lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        lhs[key] = rhs[key];
      }
    } catch (e) {
      console.log(e);

      lhs[key] = rhs[key];
    }
  }

  return lhs;
}

export function cloneDeep<T extends Indexed>(obj: T) {
  return (function _cloneDeep(
    item: T
  ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== 'object') {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date((item as Date).valueOf());
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      let copy: ReturnType<typeof _cloneDeep>[] = [];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      let copy = new Set();

      item.forEach(v => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      let copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      let copy: Indexed = {};

      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach(
        s => (copy[s.toString()] = _cloneDeep(item[s.toString()]))
      );

      // Handle:
      // * Object.name (other)
      Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}

function isPlainObject(value: unknown): value is Indexed {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: Indexed | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

export function queryString(data: Indexed) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data)
    .map(arr => arr.join('='))
    .join('&');
}
