let positiveSum = (arr) => {
    return arr.reduce((accum, currVal) => (currVal > 0) ? accum + currVal : accum);
}
positiveSum([0, -3, 5, 7, -5, 4, 3, 2, 0, 1]);