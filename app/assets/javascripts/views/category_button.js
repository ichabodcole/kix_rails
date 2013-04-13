var prekix = prekix || {};
prekix.views = prekix.views || {};

(function($){
  prekix.views.CategoryButton = Backbone.View.extend({
    selected: false,
    initialize: function(options){
      this.category = options.category;
      this.setEventListeners();
      this.addProgressBar();
    },

    setEventListeners: function(){
      _.bindAll(this, 'onCategoryButtonSelect');
      prekix.PubSub.on('category_button_select', this.onCategoryButtonSelect);
      // prekix.PubSub.on('category_button_deselect', this.onCategoryButtonDeselect);
    },

    events: {
      'click': 'onClick'
    },

    addProgressBar: function(){
      var el = this.$el.find('.progress-bar');
      var options = {
        el: el,
        category: this.category
      };
      this.progressBar = new prekix.views.ProgressBarCategory(options);
    },

    onClick: function(e){
      if (this.selected === false){
        this.select();
      }else{
        this.deselect();
      }
      prekix.PubSub.trigger('category_button_click', this.category);
    },

    select: function(){
      this.selected = true;
      this.$el.addClass('select');
      this.$el.children('.progress-bar').children('li').addClass('select');
      prekix.PubSub.trigger('category_button_select', this.category);
    },

    deselect: function(){
      this.selected = false;
      this.$el.removeClass('select');
      this.$el.children('.progress-bar').children('li').removeClass('select');
      prekix.PubSub.trigger('category_button_deselect', this.category);
    },

    // We call this do deselect all category buttons that are not
    // the currently selected category button.
    onCategoryButtonSelect: function(category){
      if(this.category !== category && this.selected === true){
        this.deselect();
      }
    }
  });
})(jQuery);