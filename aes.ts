const aes256 = require('aes256');
//the secret key used for encrypting and decrypting messages
const secret_key = 'uI2ooxtwHeI6q69PS98fx9SWVGbpQohO';
//returns the encrypted text
export const to_Encrypt = (text: string) => {
  const encrypted = aes256.encrypt(secret_key, text);
  return encrypted;
};
//welcome message is not decrypted
export const to_Decrypt = (cipher: string) => {
  if (cipher.startsWith('Welcome')) {
    return cipher;
  }
  //decryped message is returned
  const decrypted = aes256.decrypt(secret_key, cipher);
  return decrypted;
};
