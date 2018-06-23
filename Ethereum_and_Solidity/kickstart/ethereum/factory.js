import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x78E9f87F0ab6267c3e189E7b4bdBb0E846A4139f'
);

export default instance;