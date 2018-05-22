import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x586D2a149A6eAa21AE6F780D0791443857c316FF'
);

export default instance;