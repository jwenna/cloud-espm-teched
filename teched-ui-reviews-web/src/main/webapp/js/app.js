/**
 * app.js
 * 
 * main application script - include required modules - instantiate localization model - init main shell view -
 * instantiate main product model
 */

jQuery.sap.registerModulePath("app", "js");
jQuery.sap.require("app.config");
jQuery.sap.require("app.utility");

// Internationalization: Create global i18n resource bundle for texts in application UI
sap.app.i18n = new sap.ui.model.resource.ResourceModel({
	bundleUrl : "i18n/i18n.properties",
	locale : sap.ui.getCore().getConfiguration().getLanguage()
});
sap.ui.getCore().setModel(sap.app.i18n, "i18n");

// instantiate initial view with a shell
sap.ui.localResources(sap.app.config.viewNamespace);

var oMainView = sap.ui.view({
	id : "main-shell",
	viewName : "espm-ui-reviews-web.main",
	type : sap.ui.core.mvc.ViewType.JS
});

// get extension business data (product reviews related data)
sap.app.extensionodatamodel = new sap.ui.model.odata.ODataModel("proxy/" + sap.app.utility.getExtensionBackendDestination());

// set model to core as extensionodatamodel
sap.ui.getCore().setModel(sap.app.extensionodatamodel, "extensionodatamodel");
sap.app.extensionodatamodel.attachRequestCompleted(this, sap.app.readExtensionOData.requestCompleted);

oMainView.placeAt("content");