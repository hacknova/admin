import DS from 'ember-data';

export default DS.Model.extend({
  email:      DS.attr(),
  first_name: DS.attr(),
  last_name:  DS.attr(),
  full_name:  Ember.computed("first_name", "last_name", function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
