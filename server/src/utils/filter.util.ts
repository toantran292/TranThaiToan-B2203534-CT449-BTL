/**
 * Using to get filter many
 * @param arr
 * @param query
 * @returns an object have key $or
 */
export const getFilterManyField = (arr: string[], query: any) => {
  return arr.reduce<any>(
    (prev, key) => {
      prev["$or"].push({ [key]: { $regex: new RegExp(query.q, "i") } });
      return prev;
    },
    { $or: [] },
  );
};
