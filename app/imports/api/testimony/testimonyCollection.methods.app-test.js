import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import { Testimonies } from './testimonyCollection';
import { defineTestUser, withLoggedInUser, withSubscriptions } from '../../test-utilities/test-utilities';
import { defineMethod, updateMethod, removeItMethod } from '../base/BaseCollection.methods';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('TestimonyCollection Meteor Methods', function testSuite() {
    it('Can define, update, and removeIt', async function test1() {
      const { username, password } = await defineTestUser.callPromise();
      await withLoggedInUser({ username, password });
      await withSubscriptions();
      const collectionName = Testimonies.getCollectionName();
      const definitionData = {};
      definitionData.committeeChair = faker.lorem.words();
      definitionData.committeeName = faker.lorem.words();
      definitionData.billNumber = faker.lorem.words();
      definitionData.draftNumber = faker.lorem.words();
      definitionData.hearingDate = faker.lorem.words();
      definitionData.hearingLocation = faker.lorem.words();
      definitionData.position = faker.lorem.words();
      definitionData.introduction = faker.lorem.words();
      definitionData.owner = username;
      // console.log(collectionName, definitionData);
      const docID = await defineMethod.callPromise({ collectionName, definitionData });
      expect(Testimonies.isDefined(docID)).to.be.true;
      let doc = Testimonies.findDoc(docID);
      expect(doc.committeeChair).to.equal(definitionData.committeeChair);
      expect(doc.committeeName).to.equal(definitionData.committeeName);
      expect(doc.billNumber).to.equal(definitionData.billNumber);
      expect(doc.draftNumber).to.equal(definitionData.draftNumber);
      expect(doc.hearingDate).to.equal(definitionData.hearingDate);
      expect(doc.hearingLocation).to.equal(definitionData.hearingLocation);
      expect(doc.position).to.equal(definitionData.position);
      expect(doc.introduction).to.equal(definitionData.introduction);
      const updateData = {};
      updateData.id = docID;
      updateData.committeeChair = faker.lorem.words();
      updateData.committeeName = faker.lorem.words();
      updateData.billNumber = faker.lorem.words();
      updateData.draftNumber = faker.lorem.words();
      updateData.hearingDate = faker.lorem.words();
      updateData.hearingLocation = faker.lorem.words();
      updateData.position = faker.lorem.words();
      updateData.introduction = faker.lorem.words();
      await updateMethod.callPromise({ collectionName, updateData });
      doc = Testimonies.findDoc(docID);
      expect(doc.committeeChair).to.equal(definitionData.committeeChair);
      expect(doc.committeeName).to.equal(definitionData.committeeName);
      expect(doc.billNumber).to.equal(definitionData.billNumber);
      await removeItMethod.callPromise({ collectionName, instance: docID });
      expect(Testimonies.isDefined(docID)).to.be.false;
    });
  });
}
