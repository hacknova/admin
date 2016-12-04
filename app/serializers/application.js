import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },

  /**
   * Transform Data into root,
   **/
  normalizeSingleResponse: function(store, primaryModelClass, payload, id, requestType) {
      let typeKey = primaryModelClass.modelName;

      payload[typeKey] = payload.data;
      delete payload.data;

      return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, true);
  },

  normalizeArrayResponse: function(store, primaryModelClass, payload, id, requestType) {
      let pluralTypeKey = Ember.Inflector.inflector.pluralize(primaryModelClass.modelName);
      payload[pluralTypeKey] = payload.data;
      delete payload.data;

      return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, false);
  }
});
