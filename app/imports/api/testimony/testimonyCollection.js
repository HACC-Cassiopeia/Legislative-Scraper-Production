import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
// import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const testimonyPublications = {
  testimony: 'Testimony',
  testimonyAdmin: 'TestimonyAdmin',
};

class TestimonyCollection extends BaseCollection {
  constructor() {
    super('Testimonies', new SimpleSchema({
      committeeChair: String,
      committeeName: String,
      billNumber: String,
      draftNumber: String,
      hearingDate: String,
      hearingLocation: String,
      position: String,
      introduction: String,
    }));
  }

  /**
   * Defines a new Testimony item.
   * @param committeeChair the chair.
   * @param committeeName the committee name.
   * @param billNumber the number of the bill.
   * @param draftNumber the number of the draft.
   * @param hearingDate the date of the hearing.
   * @param hearingLocation the location of the hearing.
   * @param position the position.
   * @param introduction the introduction text.
   * @return {String} the docID of the new document.
   */
  define({ committeeChair, committeeName, billNumber, draftNumber, hearingDate, hearingLocation, position, introduction }) {
    const docID = this._collection.insert({
      committeeChair,
      committeeName,
      billNumber,
      draftNumber,
      hearingDate,
      hearingLocation,
      position,
      introduction,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param committeeChair the chair (optional).
   * @param committeeName the committee name (optional).
   * @param billNumber the number of the bill (optional).
   * @param draftNumber the number of the draft (optional).
   * @param hearingDate the date of the hearing (optional).
   * @param hearingLocation the location of the hearing (optional).
   * @param position the position (optional).
   * @param introduction the introduction text (optional).
   */
  update(docID, { committeeChair, committeeName, billNumber, draftNumber, hearingDate, hearingLocation, position, introduction }) {
    const updateData = {};
    if (committeeChair) {
      updateData.committeeChair = committeeChair;
    }

    if (committeeName) {
      updateData.committeeName = committeeName;
    }

    if (billNumber) {
      updateData.billNumber = billNumber;
    }

    if (draftNumber) {
      updateData.draftNumber = draftNumber;
    }

    if (hearingDate) {
      updateData.hearingDate = hearingDate;
    }

    if (hearingLocation) {
      updateData.hearingLocation = hearingLocation;
    }

    if (position) {
      updateData.position = position;
    }

    if (introduction) {
      updateData.introduction = introduction;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the testimonyCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(testimonyPublications.testimony, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(testimonyPublications.testimonyAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for testimony owned by the current user.
   */
  subscribeStuff() {
    if (Meteor.isClient) {
      return Meteor.subscribe(testimonyPublications.testimony);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeTestimonyAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(testimonyPublications.testimonyAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const committeeChair = doc.committeeChair;
    const committeeName = doc.committeeName;
    const billNumber = doc.billNumber;
    const draftNumber = doc.draftNumber;
    const hearingDate = doc.hearingDate;
    const hearingLocation = doc.hearingLocation;
    const position = doc.position;
    const introduction = doc.introduction;
    const owner = doc.owner;
    return { committeeChair, committeeName, billNumber, draftNumber, hearingDate, hearingLocation, position, introduction, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Testimonies = new TestimonyCollection();
