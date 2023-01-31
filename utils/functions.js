export const addComma = (arg) => {
  if (typeof(arg) !== "number") {
    return;
  }
  return arg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const printNums = () => {
  let numArray = []

  for (let x = 1; x <= 100; x++) {
    numArray.push(x)
  }
  return numArray;
};