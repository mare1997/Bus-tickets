const sum = (input) => {
  if (!input || input.length === 0) {
    return 0
  }
  let total =  0;
  for(const el of input) {                  
    if (isNaN(el)) {
      continue
    }
    total += Number(el);
  }
  return total
}
export { sum }