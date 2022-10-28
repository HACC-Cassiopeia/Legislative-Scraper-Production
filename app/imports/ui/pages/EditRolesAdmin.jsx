import React from 'react';
import { Button, Dropdown, Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { ROLE } from '../../api/role/Role';
import { defineMethod, removeItMethod } from '../../api/base/BaseCollection.methods';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/admin/AdminProfileCollection';
import { AssignerProfiles } from '../../api/user/assigner/AssignerProfileCollection';
import { WriterProfiles } from '../../api/user/writer/WriterProfileCollection';
import { OfficerApvProfiles } from '../../api/user/office_apv/OfficeApvProfileCollection';
import { PIPEApvProfiles } from '../../api/user/pipe_apv/PIPEApvProfileCollection';
import { FinalApvProfiles } from '../../api/user/final_apv/FinalApvProfileCollection';
import { SubmitterProfiles } from '../../api/user/submitter/SubmitterProfileCollection';

const roleOptions = [
  {
    key: 'ADMIN',
    text: 'ADMIN',
    value: ROLE.ADMIN,
  },
  {
    key: 'USER',
    text: 'USER',
    value: ROLE.USER,
  },
  {
    key: 'ASSIGNER',
    text: 'ASSIGNER',
    value: ROLE.ASSIGNER,
  },
  {
    key: 'OFFICE_APV',
    text: 'OFFICE_APV',
    value: ROLE.OFFICE_APV,
  },
  {
    key: 'PIPE_APV',
    text: 'PIPE_APV',
    value: ROLE.PIPE_APV,
  },
  {
    key: 'FINAL_APV',
    text: 'FINAL_APV',
    value: ROLE.FINAL_APV,
  },
  {
    key: 'SUBMITTER',
    text: 'SUBMITTER',
    value: ROLE.SUBMITTER,
  },
];

/** Renders a single row in the List User (Admin) table. See pages/ListUserAdmin.jsx. */
const EditRolesAdmin = ({ user }) => {
  const email = user.email;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const oldCollectionName = UserProfiles.getCollectionNameForProfile(user);
  let collectionName;
  const definitionData = { email, firstName, lastName };
  // On change, remove user from previous role and add to selected role.
  const handleOnChange = (e, data) => {
    removeItMethod.callPromise({ collectionName: oldCollectionName, instance: user._id })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {});
    if (data.value === ROLE.ADMIN) {
      collectionName = AdminProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal({
            title: 'Success',
            text: 'Role Updated',
          });
        });
    } else if (data.value === ROLE.USER) {
      collectionName = UserProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal({
            title: 'Success',
            text: 'Role Updated',
          });
        });
    } else if (data.value === ROLE.ASSIGNER) {
      collectionName = AssignerProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal({
            title: 'Success',
            text: 'Role Updated',
          });
        });
    } else if (data.value === ROLE.WRITER) {
      collectionName = WriterProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal({
            title: 'Success',
            text: 'Role Updated',
          });
        });
    } else if (data.value === ROLE.OFFICE_APV) {
      collectionName = OfficerApvProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal({
            title: 'Success',
            text: 'Role Updated',
          });
        });
    } else if (data.value === ROLE.PIPE_APV) {
      collectionName = PIPEApvProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal({
            title: 'Success',
            text: 'Role Updated',
          });
        });
    } else if (data.value === ROLE.FINAL_APV) {
      collectionName = FinalApvProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal({
            title: 'Success',
            text: 'Role Updated',
          });
        });
    } else if (data.value === ROLE.SUBMITTER) {
      collectionName = SubmitterProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal({
            title: 'Success',
            text: 'Role Updated',
          });
        });
    }
  };

  const handleOnClick = () => {
    collectionName = UserProfiles.getCollectionNameForProfile(user);
    removeItMethod.callPromise({ collectionName: collectionName, instance: user._id })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'User Removed', 'success'));
  };
  return (
    <Table.Row>
      <Table.Cell>{user.firstName}</Table.Cell>
      <Table.Cell>{user.lastName}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>
        <Dropdown
          defaultValue={user.role}
          fluid
          selection
          options={roleOptions}
          onChange={handleOnChange}
        />
      </Table.Cell>
      <Table.Cell>
        <Button color="red" onClick={handleOnClick} icon fluid><Icon name="remove circle" /></Button>
      </Table.Cell>
    </Table.Row>
  );
};

// Require a document to be passed to this component.
EditRolesAdmin.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default withTracker(() => {
  // Get access to the profiles.
  const subsUser = UserProfiles.subscribe();
  const subsAdmin = AdminProfiles.subscribe();
  const subsAssigner = AssignerProfiles.subscribe();
  const subsWriter = WriterProfiles.subscribe();
  const subsOfficerApv = OfficerApvProfiles.subscribe();
  const subsPIPEApv = PIPEApvProfiles.subscribe();
  const subsFinalApv = FinalApvProfiles.subscribe();
  const subsSubmitter = SubmitterProfiles.subscribe();

  // Determine if the subscription is ready
  const ready = subsUser.ready() && subsAdmin.ready() && subsAssigner.ready() && subsWriter.ready() && subsOfficerApv.ready() && subsPIPEApv.ready() && subsFinalApv.ready() && subsSubmitter.ready();
  return {
    ready,
  };
})(EditRolesAdmin);
