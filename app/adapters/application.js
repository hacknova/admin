import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://127.0.0.1:8081',
  namespace: 'v1',
  pathForType: type => {
    if(type === 'student' || 'attendees') return 'attending';
  }
});
