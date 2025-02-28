import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';  // Import required functions
import { config } from 'dotenv';  // Import dotenv for environment variables

// Load environment variables
config();  // Loads .env file into process.env

// Define constants and key values
const eGS_SHARE = 70.0;
const SITEG_SHARE = 30.0;
const GOVT_FEE = 7.0;

// Use environment variable for key or fallback to a default key (32 bytes)
const myKey = process.env.MY_KEY || "Dit12#$%87%$3434ZerDit12#$%87%$3434";  // Must be 32 bytes (256 bits)
const mybyte = randomBytes(16);  // Generate a random 16-byte IV (for AES-256-CBC)

// Ensure the key is exactly 32 bytes by padding or truncating
const keyBuffer = Buffer.from(myKey, 'utf8');

// If the key length is less than 32 bytes, pad it with zero bytes
// If it's more than 32 bytes, slice it to 32 bytes
const aesKey = keyBuffer.length === 32 ? keyBuffer : 
    (keyBuffer.length < 32 ? Buffer.concat([keyBuffer, Buffer.alloc(32 - keyBuffer.length)]) : keyBuffer.slice(0, 32));

// Encrypt/Decrypt utility function using AES
export function encryptDecrypt(inputText, sMode) {
  let result = '';
  try {
    // AES-256 requires a 32-byte key and a 16-byte IV
    const iv = mybyte;

    // Initialize the cipher and decipher for AES-256-CBC
    const cipher = createCipheriv('aes-256-cbc', aesKey, iv);
    const decipher = createDecipheriv('aes-256-cbc', aesKey, iv);

    if (sMode === 'E') {
      // Encryption
      let encrypted = cipher.update(inputText, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      result = encrypted;
    } else if (sMode === 'N') {
      // Special case handling for inputText like "key: value"
      try {
        const splitInput = inputText.split(": ");
        result = splitInput[1] ? splitInput[1].split("<br/>")[0] : "";
      } catch (e) {
        result = '';
      }
    } else {
      // Decryption
      let decrypted = decipher.update(inputText, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      result = decrypted;
    }
  } catch (error) {
    console.error("Error during encryption/decryption:", error);
  }
  return result;
}
