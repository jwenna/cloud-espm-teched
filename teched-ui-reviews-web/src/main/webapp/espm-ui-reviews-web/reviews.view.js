sap.ui.jsview("espm-ui-reviews-web.reviews", {

	getControllerName : function() {
		return "espm-ui-reviews-web.reviews";
	},

	createContent : function(oController) {

		var oReviewsViewLayout = new sap.ui.commons.layout.MatrixLayout({
			id : "reviews-view-layout-id",
		});

		oReviewsViewLayout.createRow( this.getCustomerReviewsPanel() );

		return oReviewsViewLayout;
	},

	/**
	 * Panel contains the list of available customer reviews of the product
	 * which has been selected in the product selection panel
	 * 
	 * @returns {sap.ui.commons.Panel}
	 */
	getCustomerReviewsPanel: function() {
		var oProductReviewsListLayout = new sap.ui.commons.layout.MatrixLayout({
			width : "100%",
		});

		oProductReviewsListLayout
				.createRow(new sap.ui.commons.layout.MatrixLayoutCell(
						{
							content : [ sap.app.mainController.getCachedView("customer-reviews") ]
						}));

		var oCustomerReviewsPanel = new sap.ui.commons.Panel({
			id : "reviews-view-customer-reviews-panel-id",
			visible : true,
			width : "100%",
			areaDesign : sap.ui.commons.enums.AreaDesign.Plain,
			borderDesign : sap.ui.commons.enums.BorderDesign.None,
			showCollapseIcon : false,
			content : [oProductReviewsListLayout],
			title : new sap.ui.commons.Title({text: "{i18n>REVIEWS_LIST_PANEL_TITLE}"})
		});

		return oCustomerReviewsPanel;
	}
});