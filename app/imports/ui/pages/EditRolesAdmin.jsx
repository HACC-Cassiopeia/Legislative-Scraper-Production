import React from 'react';
import { Container, Table, Header, Loader, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/admin/AdminProfileCollection';
import { AssignerProfiles } from '../../api/user/assigner/AssignerProfileCollection';
import { WriterProfiles } from '../../api/user/writer/WriterProfileCollection';
import { OfficerApvProfiles } from '../../api/user/office_apv/OfficeApvProfileCollection';
import { SubmitterProfiles } from '../../api/user/submitter/SubmitterProfileCollection';
import RoleAdmin from '../components/RoleAdmin';

/** Renders a table containing all of the profiles. Use <UserItemAdmin> to render each row. */
const EditRoleAdmin = ({ admins, users, assigners, writers, offices, submitters, ready }) => ((ready) ? (
  <Container className="listUserAdmin">
    <Table inverted style={{ backgroundColor: '#b86d4e' }}>
      <Table.Header>
        <Table.Cell>
          <Table.Row>
            <Header as="h3" textAlign="center">Manage Accounts</Header>
          </Table.Row>
        </Table.Cell>
        <Table.Row>
          <Table.HeaderCell>First Name</Table.HeaderCell>
          <Table.HeaderCell width={3}>Last Name</Table.HeaderCell>
          <Table.HeaderCell><Icon name="mail outline" /> Email</Table.HeaderCell>
          <Table.HeaderCell><Icon name="key" /> Role</Table.HeaderCell>
          <Table.HeaderCell><Icon name="trash alternate" /> Remove Account</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {admins.map((user) => <RoleAdmin key={user._id} user={user} />)}
        {users.map((user) => <RoleAdmin key={user._id} user={user} />)}
        {assigners.map((user) => <RoleAdmin key={user._id} user={user} />)}
        {writers.map((user) => <RoleAdmin key={user._id} user={user} />)}
        {offices.map((user) => <RoleAdmin key={user._id} user={user} />)}
        {submitters.map((user) => <RoleAdmin key={user._id} user={user} />)}
      </Table.Body>
      <Table.Row>
        <Table.Cell width={5}>
          <Header as="h5"><em>The ADMIN role allows users to manage accounts.</em></Header>
        </Table.Cell>
      </Table.Row>
    </Table>
  </Container>
) : <Loader active>Getting data</Loader>);

// Require an array of User Admin profiles in the props.
EditRoleAdmin.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  admins: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  assigners: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  writers: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  offices: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  submitters: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to profiles.
  console.log(AssignerProfiles.subscribeAssignerProfile());
  const subsUser = UserProfiles.subscribe();
  const subsAdmin = AdminProfiles.subscribe();
  const subsAssigner = AssignerProfiles.subscribe();
  const subsWriter = WriterProfiles.subscribe();
  const subsOffice = OfficerApvProfiles.subscribe();
  const subsSubmitter = SubmitterProfiles.subscribe();

  // Determine if the subscription is ready
  const ready = subsUser.ready() && subsAdmin.ready() && subsAssigner.ready() && subsWriter.ready() && subsOffice.ready() && subsSubmitter.ready();
  // Get the profiles and sort by owner then name

  console.log(AssignerProfiles.find({}, { sort: { name: 1 } }).fetch());
  const assigners = AssignerProfiles.find({}, { sort: { name: 1 } }).fetch();
  const writers = WriterProfiles.find({}, { sort: { name: 1 } }).fetch();
  const offices = OfficerApvProfiles.find({}, { sort: { name: 1 } }).fetch();
  const submitters = SubmitterProfiles.find({}, { sort: { name: 1 } }).fetch();
  const admins = AdminProfiles.find({}, { sort: { owner: 1, name: 1 } }).fetch();
  const users = UserProfiles.find({}, { sort: { owner: 1, name: 1 } }).fetch();
  return {
    admins,
    users,
    assigners,
    writers,
    offices,
    submitters,
    ready,
  };
})(EditRoleAdmin);
