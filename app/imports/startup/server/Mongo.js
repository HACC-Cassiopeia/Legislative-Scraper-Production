import { Meteor } from 'meteor/meteor';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import { Testimonies } from '../../api/testimony/testimonyCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addMeasures(measures) {
  console.log(`  Adding: ${measures.code} (${measures.measureTitle})`);
  SavedMeasures.define(measures);
}

// Initialize the SavedMeasures if empty.
if (SavedMeasures.count() === 0) {
  if (Meteor.settings.defaultSavedMeasures) {
    console.log('Creating default measures.');
    Meteor.settings.defaultSavedMeasures.map(data => addMeasures(data));
  }
}

// Initialize the database with a default data document.
function addTestimonies(testimonies) {
  console.log(`  Adding: Testimony for Bill ${testimonies.billTitle}`);
  Testimonies.define(testimonies);
}

// Initialize the Testimony if empty.
if (Testimonies.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default testimony.');
    Meteor.settings.defaultSavedTestimonies.map(data => addTestimonies(data));
  }
}
