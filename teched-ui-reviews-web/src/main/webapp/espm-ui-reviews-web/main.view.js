sap.ui.jsview("espm-ui-reviews-web.main", {

	getControllerName : function() {
		return "espm-ui-reviews-web.main";
	},

	/**
	 * createContent: instantiate the views 
	 * @param oController
	 * @returns {sap.ui.view}
	 */
	createContent : function(oController) {
		sap.app.mainController = oController;

		var oView = oController.getCachedView("reviews");
		return oView;

	}
});
