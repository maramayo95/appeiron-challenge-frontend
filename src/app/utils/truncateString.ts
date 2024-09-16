export const truncateString = (str:string) => {
    if (str.length > 15) {
      return str.slice(0, 12) + '...';
    }
    return str;
  };