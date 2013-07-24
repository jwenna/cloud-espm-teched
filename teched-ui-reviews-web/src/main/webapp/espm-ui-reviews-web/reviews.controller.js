sap.ui.controller("espm-ui-reviews-web.reviews", {

	onInit : function() {
	},

	showFilledCustomerReviewsPanel: function() {
		sap.app.uivisibility.showRowRepeaterHeaderLayout();
		sap.app.uivisibility.showRowRepeater();
		sap.app.uivisibility.hideRowRepeaterFooterLayout();
	},

	showEmptyCustomerReviewsPanel: function() {
		sap.app.uivisibility.hideRowRepeaterHeaderLayout();
		sap.app.uivisibility.hideRowRepeater();
		sap.app.uivisibility.showRowRepeaterFooterLayout();
	},

	showLoadingCustomerReviewsPanel: function() {
		sap.app.uivisibility.hideRowRepeaterHeaderLayout();
		sap.app.uivisibility.hideRowRepeater();
		sap.app.uivisibility.hideRowRepeaterFooterLayout();
	},

});
