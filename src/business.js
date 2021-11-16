
function checkZip(zip) {
  if (isNaN(zip) || zip < 0) {
    return new Error("Not a valid zip code!");
  } else {
    return true;
  }
}

