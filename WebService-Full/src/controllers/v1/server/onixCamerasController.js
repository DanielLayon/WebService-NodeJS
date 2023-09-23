const axios = require('axios');
const fs = require('fs');
const zlib = require('zlib');
const Readable = require('stream').Readable
const convert = require('xml-js');
const path = require('path');
const logDirectory = path.join(__dirname, 'logs/server');

const getOnixCamera = async (req, res) => {

  const body = req.body;

  const login = body.login;
  const senha = body.senha;
  const mID = body.mid;
  const dtHr = body.dthr;
  const irnCliente = body.irnCliente;
  const irnEvento = body.irnEvento;

  const serverUrl = 'https://webservice.newrastreamentoonline.com.br';
  const xmlContent = `
  <RequestVideosMdvr>
      <login>${login}</login>
      <senha>${senha}</senha>
      <mID>${mID}</mID>
      <dtHr>${dtHr}</dtHr>
  </RequestVideosMdvr>
  `;

  const axiosConfig = {
    method: 'post',
    url: serverUrl,
    headers: {
      'Content-Type': 'application/xml',
    },
    data: xmlContent,
    responseType: 'arraybuffer',
  };

  let file;
  let log;
  try {
    const response = await axios(axiosConfig);
    const responseData = response.data;

    const decodedData = zlib.gunzipSync(responseData);
    file = decodedData;
    // fs.writeFileSync('response.xml', decodedData.toString());
    const result = convert.xml2json(decodedData.toString("utf8"), { compact: true, spaces: 4 });
    const objResult = JSON.parse(result);
    log = result;

    if (Object.keys(objResult.ResponseVideosMdvr).length === 0) {
      if (!fs.existsSync(`E:\\Sistema\\Nox\\NOXWeb\\AppHtml\\videos\\ONIX\\${irnCliente}\\${irnEvento}`)) {
        fs.mkdirSync(`E:\\Sistema\\Nox\\NOXWeb\\AppHtml\\videos\\ONIX\\${irnCliente}\\${irnEvento}`, { recursive: true });
      }
      fs.writeFileSync(`E:\\Sistema\\Nox\\NOXWeb\\AppHtml\\videos\\ONIX\\${irnCliente}\\${irnEvento}\\REQUEST.txt`, (xmlContent));
      fs.writeFileSync(`E:\\Sistema\\Nox\\NOXWeb\\AppHtml\\videos\\ONIX\\${irnCliente}\\${irnEvento}\\${irnEvento}.xml`, (file));
      return;
    }

    for (let iX = 0; iX < objResult.ResponseVideosMdvr.Canal.length; iX++) {
      let json = objResult.ResponseVideosMdvr.Canal[iX];
      let iCamera = json.Valor._text;
      let sVideo = json.Video._text;

      let bVideo = Buffer.from(sVideo, 'base64')

      var s = new Readable()

      if (!fs.existsSync(`E:\\Sistema\\Nox\\NOXWeb\\AppHtml\\videos\\ONIX\\${irnCliente}\\${irnEvento}`)) {
        fs.mkdirSync(`E:\\Sistema\\Nox\\NOXWeb\\AppHtml\\videos\\ONIX\\${irnCliente}\\${irnEvento}`, { recursive: true });
      }

      s.push(bVideo)
      s.push(null)
      s.pipe(fs.createWriteStream(`E:\\Sistema\\Nox\\NOXWeb\\AppHtml\\videos\\ONIX\\${irnCliente}\\${irnEvento}\\v${iCamera}.mp4`, { recursive: true }));
    }

    if (objResult.ResponseVideosMdvr.Canal.length = 0) {
      throw "XML VAZIO"
    }

    res.json(
      {
        sucesso:true,
        msg:"Videos gerados com sucesso"
      }
    );
  } catch (e) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    fs.writeFileSync(`${process.cwd()}\\logs\\server\\onixCameras_${day}${month}${year}${hour}${min}${sec}.log`, 
      (`REQUEST: ${JSON.stringify(req.body)}\nERRO: ${JSON.stringify(e.message)}\nXML_ONIX:${log}`)
    );

    res.json(
      {
        sucesso:false,
        msg:e.message
      }
    )
  }


};

module.exports = {
  getOnixCamera,
};