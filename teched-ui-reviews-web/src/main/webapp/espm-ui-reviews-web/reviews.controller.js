sap.ui.controller("espm-ui-reviews-web.reviews", {

	onInit : function() {
	},

	showProductSelectionPanel : function() {
		sap.app.uivisibility.setUiControlIsVisible("reviews-view-product-selection-panel-id", sap.app.config.displayProductSelectionPanel);
	},

	showFilledCustomerReviewsPanel: function() {
		this.showProductSelectionPanel();
		sap.app.uivisibility.showRowRepeaterHeaderLayout();
		sap.app.uivisibility.showRowRepeater();
		sap.app.uivisibility.hideRowRepeaterFooterLayout();
	},

	showEmptyCustomerReviewsPanel: function() {
		this.showProductSelectionPanel();
		sap.app.uivisibility.hideRowRepeaterHeaderLayout();
		sap.app.uivisibility.hideRowRepeater();
		sap.app.uivisibility.showRowRepeaterFooterLayout();
	},

	showLoadingCustomerReviewsPanel: function() {
		sap.ui.getCore().byId("reviews-view-customer-reviews-panel-id").setVisible(true);
		sap.app.uivisibility.hideRowRepeaterHeaderLayout();
		sap.app.uivisibility.hideRowRepeater();
		sap.app.uivisibility.hideRowRepeaterFooterLayout();
	},
	
	openCustomerReviewCreationDialog: function() {
		var oCustomerReviewCreationView = sap.app.mainController.getCachedView("customer-review-creation");
		var oCustomerReviewCreationDialog = sap.ui.getCore().byId("customer-review-creation-dialog-id");

		if( oCustomerReviewCreationDialog==null){
			oCustomerReviewCreationDialog = new sap.ui.commons.Dialog({
				id : "customer-review-creation-dialog-id",
				showCloseButton : true,
				resizable : true,
				title : "{i18n>CREATE_REVIEW_DIALOG_TITLE}",
				buttons : [ new sap.ui.commons.Button({
						id : "customer-review-creation-submit-button-id",
						text : "{i18n>SUBMIT_BUTTON}",
						enabled: false,
						press : function(){oCustomerReviewCreationView.getController().publishReview(
								sap.ui.getCore().byId(
										"product-selection-dropdown-box-id")
										.getSelectedKey());}
								}) ],
				content : [oCustomerReviewCreationView],
			});
			oCustomerReviewCreationDialog.addButton();
		}
		oCustomerReviewCreationView.getController().resetReviewCreationForm();
		oCustomerReviewCreationDialog.open();
	}


});
