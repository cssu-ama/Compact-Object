# 🧹 Compact Object — JavaScript Utility

A **Compact Object** function removes all keys with **falsy values** from an object or array — including nested objects/arrays. This document explains the logic, approach, and usage so you can include it in your GitHub repository.

---

## 📘 Overview

A **falsy value** is any value where `Boolean(value)` returns `false`, such as:

* `false`
* `0`
* `""` (empty string)
* `null`
* `undefined` (not seen in JSON)
* `NaN`

Given an object or array (from valid JSON), the goal is to return a **cleaned version** of that structure where:

* Keys with falsy values are removed.
* Nesting is handled recursively.
* Arrays are treated like objects (their indices are considered keys).
* Empty objects/arrays remain because they are considered **truthy** in JavaScript.

---

## 🛠️ Implementation

```js
const compactObject = function(obj) {
    // Arrays
    if (Array.isArray(obj)) {
        const out = [];
        for (const item of obj) {
            if ((item !== null && typeof item === 'object') || Array.isArray(item)) out.push(compactObject(item));
            else
                if (Boolean(item)) out.push(item);
        }
        return out;
    }

    // Plain object
    const outObj = {};
    for (const [key, val] of Object.entries(obj)) {
        if ((val !== null && typeof val === 'object') || Array.isArray(val)) outObj[key] = compactObject(val);
        else
            if (Boolean(val)) outObj[key] = val;
    }

  return outObj;
}

```

---

## 🔍 How It Works (Step by Step)

This function uses **recursion** to explore and clean every part of the input.

### 1️⃣ Base Case: Primitives

If the value is not an object (`number`, `string`, `boolean`, or `null`):

* Return the value if truthy.
* Return `undefined` if falsy.

### 2️⃣ Arrays

* Loop through array items.
* For each element:

  * If it's an object/array → recursively compact it.
  * If it's a primitive → keep it only if truthy.
* Return a new array.

### 3️⃣ Objects

* Loop through every key/value pair.
* Recursively compact nested objects/arrays.
* Keep only entries with **truthy** values.

---

## 📦 Example

### Input

```js
{
  a: 0,
  b: "hello",
  c: "",
  d: { x: null, y: 2, z: { p: false, q: 3 } },
  e: [0, 1, "", { m: 0, n: "ok" }, [], {}],
  f: false
}
```

### Output

```js
{
  b: "hello",
  d: { y: 2, z: { q: 3 } },
  e: [1, { n: "ok" }, [], {}]
}
```

---

## 🧪 Optional Test (Jest)

```js
test('compact removes falsy values deeply', () => {
  const input = { a: 0, b: 1, c: [0, 2, "", null], d: { x: false, y: 3 } };
  const expected = { b: 1, c: [2], d: { y: 3 } };
  expect(compact(input)).toEqual(expected);
});
```

---

## 📌 Notes

* This function **does not mutate** the original input.
* Empty arrays/objects remain since they are truthy (`Boolean([]) === true`).
* Input is assumed to be valid JSON (no functions, undefined, symbols, etc.).
