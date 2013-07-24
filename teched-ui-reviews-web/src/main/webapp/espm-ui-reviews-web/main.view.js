sap.ui.jsview("espm-ui-reviews-web.main", {

	getControllerName : function() {
		return "espm-ui-reviews-web.main";
	},

	/**
	 * createContent: instantiate the shell which is the main container embedding all other content
	 * @param oController
	 * @returns {sap.ui.ux3.Shell}
	 */
	createContent : function(oController) {
		sap.app.mainController = oController;

		var oShell = new sap.ui.ux3.Shell({
			id : "main",
			appTitle : "{i18n>SHELL_HEADER_TITLE}",
			showLogoutButton : true,
			showSearchTool : false,
			showInspectorTool : false,
			showFeederTool : false,
			showTools : true,
			showPane : true,
			paneWidth : 500,
			worksetItems : [ new sap.ui.ux3.NavigationItem({
				id : "nav-customer-reviews-id",
				text : "{i18n>SHELL_WORKSET_ITEM_CUSTOMER_REVIEWS}"
			}) ]
		});

		// initial shell content
		oShell.addContent(oController.getCachedView("reviews"));
		
		// create the button instance
		var oButton = new sap.ui.commons.Button("btn");

		// set properties, e.g. the text (there is also a shorter way of setting several properties)
		oButton.setText("trigger");

		// attach an action to the button's "press" event (use jQuery to fade out the button)
		oButton.attachPress(function()
				{
					// test	
					var oEventBus = sap.ui.getCore().getEventBus();
					oEventBus.publish("sap.app", "selectedProductIdChanged", "HT-2001");
				});
		
		oShell.addContent(oButton);
		

		return oShell;

	},
});
