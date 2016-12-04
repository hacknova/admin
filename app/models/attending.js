import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  email:     DS.attr('string'),
  firstName: DS.attr('string'),
  lastName:  DS.attr('string'),
  fullName:  Ember.computed("first_name", "last_name", function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
