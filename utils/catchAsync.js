// Export a function that takes another function 'fn' as an argument
module.exports = fn => {
  // Return a middleware function that takes 'req', 'res', and 'next' as arguments
  return (req, res, next) => {
    // Execute the provided function 'fn' with 'req', 'res', and 'next', and catch any errors
    fn(req, res, next).catch(next);
  };
};
