const getInfo = (req, res) => {
    const serviceInfo = {
      name: 'WebService Express',
      version: '1.0.0',
      description: 'Serviço express com métodos completos.',
    };
  
    res.json(serviceInfo);
  };
  
  module.exports = {
    getInfo,
  };