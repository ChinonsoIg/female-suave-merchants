export const addComma = (arg) => {
  if (typeof(arg) !== "number") {
    return;
  }
  return arg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const printNums = (max) => {
  let numArray = []

  for (let x = 1; x <= 100; x++) {
    if(x <= max) {
      numArray.push(x)
    }
  }
  return numArray;
};

// export const nairaSymbol = "&#8358;"
export const NairaSymbol = () => {
  return <span>&#8358;</span>;
}

export const createSlug = (param) => {
  param = param.replace(/[^a-zA-Z0-9]/g, ' ');
  param = param.replace(/  +/g, ' ');
  param = param.replace(/\s/g, '-').toLowerCase();
  return param;

}