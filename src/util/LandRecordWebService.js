import axios from 'axios';
import xml2js from 'xml2js';
import crypto from 'crypto';
import { encryptDecrypt } from './util/Utility.js'; 


// Function to fetch land record details
export async function searchLandRecordDetail(ownerName, fatherName, district, tehsil, village, sessionId, shajraReturn) {
  let responseString = '';
  let outputString = '';
  try {
    const shajraReq = encryptDecrypt('shajraf7194hpedist', 'E');
    const wsURL = 'https://mobileappshp.nic.in/nesd/service.asmx?wsdl';
    const xmlInput = `
      <soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:tem='https://mobileappshp.nic.in/nesd'>
        <soapenv:Header/>
        <soapenv:Body>
          <tem:GetLandOwnerDetails>
            <tem:shajraReq>${shajraReq}</tem:shajraReq>
            <tem:ownerName>${ownerName}</tem:ownerName>
            <tem:fatherName>${fatherName}</tem:fatherName>
            <tem:district>${district}</tem:district>
            <tem:tehsil>${tehsil}</tem:tehsil>
            <tem:village>${village}</tem:village>
            <tem:shajraReturn>${shajraReturn}</tem:shajraReturn>
            <tem:sessionid>${sessionId}</tem:sessionid>
          </tem:GetLandOwnerDetails>
        </soapenv:Body>
      </soapenv:Envelope>`;

    console.log('Land record xmlInput:', xmlInput);
    
    const response = await axios.post(wsURL, xmlInput, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'Content-Length': Buffer.byteLength(xmlInput)
      }
    });

    outputString = response.data;
    console.log('outputString:', outputString);

    return parseResponse(outputString);
  } catch (error) {
    console.error(error);
    return '';
  }
}

// Parse response for the land record detail
//export async function parseResponse(response) {
 async function parseResponse(response) {
  try {
    const parser = new xml2js.Parser();
   // const result = await parser.parseStringPromise(response);
   const result = parser.parseStringPromise(response);
    const landOwnerDetails = result['soapenv:Envelope']['soapenv:Body'][0]['tem:GetLandOwnerDetailsResponse'][0]['tem:GetLandOwnerDetailsResult'][0];

    if (landOwnerDetails) {
      return landOwnerDetails;
    }
    return '';
  } catch (error) {
    console.error('Error parsing response:', error);
    return '';
  }
}

// Function to get land owner list
export async function GetLandOwnerList(ownerName, fatherName, district, tehsil, village, sessionId, shajraReturn) {
  let responseString = '';
  let outputString = '';
  try {
    const shajraReq = encryptDecrypt('shajraf7194hpedist', 'E');
    const wsURL = 'https://mobileappshp.nic.in/nesd/service.asmx?wsdl';
    const xmlInput = `
      <soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:tem='https://mobileappshp.nic.in/nesd'>
        <soapenv:Header/>
        <soapenv:Body>
          <tem:GetLandOwnerList>
            <tem:shajraReq>${shajraReq}</tem:shajraReq>
            <tem:ownerName>${ownerName}</tem:ownerName>
            <tem:position>3</tem:position>
            <tem:district>${district}</tem:district>
            <tem:tehsil>${tehsil}</tem:tehsil>
            <tem:village>${village}</tem:village>
            <tem:shajraReturn>${shajraReturn}</tem:shajraReturn>
            <tem:sessionid>${sessionId}</tem:sessionid>
          </tem:GetLandOwnerList>
        </soapenv:Body>
      </soapenv:Envelope>`;

    console.log('Land record xmlInput:', xmlInput);

    const response = await axios.post(wsURL, xmlInput, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'Content-Length': Buffer.byteLength(xmlInput)
      }
    });

    outputString = response.data;
    console.log('Land Response:', outputString);

    return parseResponseList(outputString);
  } catch (error) {
    console.error(error);
    return '';
  }
}

// Parse response for the list of land owners
//export async function parseResponseList(response) {
function parseResponseList(response) {
  try {
    const parser = new xml2js.Parser();
    //const result = await parser.parseStringPromise(response);
    const result = parser.parseStringPromise(response);
    const landOwnerList = result['soapenv:Envelope']['soapenv:Body'][0]['tem:GetLandOwnerListResponse'][0]['tem:GetLandOwnerListResult'][0];

    if (landOwnerList) {
      return landOwnerList;
    }
    return '';
  } catch (error) {
    console.error('Error parsing list response:', error);
    return '';
  }
}
