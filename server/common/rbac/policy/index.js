import  roles from '../../enum/roles.js';
import superAdminPolicy from './superAdmin.js';
import advertiserPolicy from './advertiser.js';

const opts = {
  [roles.SUPER_ADMIN]: {
    // list of allowed operations
    can: superAdminPolicy
  },
  [roles.ADVERTISER]: {
    // list of allowed operations
    can: advertiserPolicy
  }
};

export default opts;
