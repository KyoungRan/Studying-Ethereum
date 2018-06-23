import web3 from './web3';
import Campaign from './build/Campaign.json';

// const instance = new web3.eth.Contract(
//   JSON.parse(Campaign.interface),
//   '0x71CE5296fE5d42276DAf8e31c20231499dA18695'
// );

// export default instance;

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Campaign.interface),
    address
  );
}