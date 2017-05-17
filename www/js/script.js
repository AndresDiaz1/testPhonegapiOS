// Code goes here
			var app = {
			  initialize: function() {
					this.loader = new LoaderJS('0.0.1');
					this.loader.require({jquery:'https://code.jquery.com/jquery-1.12.0.min.js'},this.onReady);
			  },
			  onReady: function() {
			    var out = "";
			    for(var i=0; i<5;i++) {
			        out += '<a href="#">Menú No -> {0}</a>'.format(i+1);
			    }
					$('#myApp').html(out);
					app.bindEvents();
			  },
			  bindEvents: function() {
					$('a').click(app.clickHandler);
			  },
			  clickHandler: function(el) {
					var toLoad = {};
					toLoad["s{0}".format(($(this).index() + 1))] = "s{0}.js".format(($(this).index() + 1));
					app.loader.require(toLoad, app.callRender);
			  },
			  callRender: function(modulos) {
			    console.log(modulos,'loaded');
				for(var fn in modulos) modulos[fn].render();
			  }
			};
app.initialize();