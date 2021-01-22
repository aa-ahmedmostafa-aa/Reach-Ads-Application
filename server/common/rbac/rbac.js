import RBAC from 'easy-rbac';

import opts from './policy/index.js';

const rbac = RBAC.create(opts);
export default rbac;
