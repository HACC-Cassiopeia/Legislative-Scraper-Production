import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';

export const ROLE = {
  ASSIGNER: 'ASSIGNER',
  WRITER: 'WRITER',
  OFFICE_APPROVER: 'OFFICE_APPROVER',
  PIPE_APPROVER: 'PIPE_APPROVER',
  FINAL_APPROVER: 'FINAL_APPROVER',
  SUBMITTER: 'SUBMITTER',
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const ROLES = _.values(ROLE);

export const isRole = (role) => (typeof role) === 'string' && (_.values(ROLE)).includes(role);

export const assertRole = (role) => {
  const roleArray = (Array.isArray(role)) ? role : [role];
  roleArray.forEach((theRole) => {
    if (!isRole(theRole)) {
      throw new Meteor.Error(`${role} is not defined, or includes at least one undefined role.`);
    }
  });
};

if (Meteor.isServer) {
  const allDefinedRoles = Roles.getAllRoles().fetch();
  const definedRoleNames = allDefinedRoles.map((role) => role.name);
  _.values(ROLE).forEach((role) => {
    if (!(definedRoleNames.includes(role))) {
      Roles.createRole(role, { unlessExists: true });
    }
  });
}
