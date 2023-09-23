const getServerDate = (req, res) => {
    const userId = req.user.id;
    const username = req.user.username;
    
    const currentDate = new Date();
  
    res.json({
      userId,
      username,
      serverDate: currentDate,
    });
  };
  
  module.exports = {
    getServerDate,
  };