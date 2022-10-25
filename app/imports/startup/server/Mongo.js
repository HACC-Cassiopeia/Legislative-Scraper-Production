import { Meteor } from 'meteor/meteor';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addMeasures(measures) {
  console.log(`  Adding: ${measures.code} (${measures.measureTitle})`);
  SavedMeasures.define(measures);
}

// Initialize the StuffsCollection if empty.
if (SavedMeasures.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default measures.');
    Meteor.settings.defaultSavedMeasures.map(data => addMeasures(data));
  }
}
