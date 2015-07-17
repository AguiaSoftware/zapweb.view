yum.define([
	PI.Url.create('Arquivo', '/preview/preview.html'),
	PI.Url.create('Arquivo', '/preview/preview.css'),
    PI.Url.create('Lib', '/zoom/zoom.js'),
    PI.Url.create('Lib', '/drag/drag.js')
], function(html){
	
	Class('Arquivo.Preview').Extend(Mvc.Component).Body({
	
		instances: function(){
			this.view = new Mvc.View(html);
		},

        viewDidLoad: function () {
        	var self = this;
            var zoom = this.view.containerImage.panzoom();

            this.view.element.animate({bottom: '0px'});

            this.view.element.drag({
            	x: false,
                cursor: 's-resize',
            	move: function(){
            	    self.view.element.css('height', '100%');
            	},
            });

            zoom.parent().on('mousewheel.focal', function (e) {
                e.preventDefault();
                var delta = e.delta || e.originalEvent.wheelDelta;
                var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                zoom.panzoom('zoom', zoomOut, {
                    increment: 0.1,
                    animate: false,
                    focal: e
                });
            });

            this.base.viewDidLoad();
        },

        events: {

            '@closePreview click': function(){
                this.destroy();
            }

        }
	
	});
	
});