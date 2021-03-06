var prekix = prekix || {};
prekix.views = prekix.views || {};

(function($){
  prekix.views.TaskTextarea = Backbone.View.extend({
    initialize:function(options){
      this.model    = options.model;
      this.category = options.category;
      this.task     = options.task;
      //
      this.inputTimer = null;
      this.waitTime = 1556;
    },

    events: {
      'keyup': 'onKeyUp'
    },

    onKeyUp: function(e){
      var _self = this;
      if(this.inputTimer){
        clearTimeout(this.inputTimer);
      }
      this.inputTimer = setTimeout(function(){
        _self.updateModel();
      }, this.waitTime);
    },

    updateModel: function(){
      var textVal = this.$el.val();
      this.model.save('text', textVal);
    }
  });
})(jQuery);