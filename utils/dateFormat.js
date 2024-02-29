function dateFormat(date) {
    // Example formatting: "MM/DD/YYYY"
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  
  module.exports = dateFormat;