export const getPagesCount = (totalCountPages: number, limit: number) => {
  return Math.ceil(totalCountPages / limit);
};
