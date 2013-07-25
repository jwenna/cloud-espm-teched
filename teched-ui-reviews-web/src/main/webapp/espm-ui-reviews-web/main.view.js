sap.ui.jsview("espm-ui-reviews-web.main", {

	getControllerName : function() {
		return "espm-ui-reviews-web.main";
	},

	/**
	 * createContent: instantiate the views 
	 * @param oController
	 * @returns {sap.ui.view} or {sap.ui.ux3.Shell}
	 */
	createContent : function(oController) {
		sap.app.mainController = oController;

		var oView = oController.getCachedView("reviews");
		
		if (sap.app.config.displayShell)
		{
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
			oShell.addContent(oView);

			return oShell;
		}
		else
		{
			// only display view (w/o shell)
			return oView;
		}
	}
});
