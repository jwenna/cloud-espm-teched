/**
 * app.js
 * 
 * main application script - include required modules - instantiate localization model - init main shell view -
 * instantiate main product model
 */

function adjustUI5ModelToCloudPortal() {
	// OData model adjustments to run inside CP
	sap.ui.model.odata.ODataModel.prototype._createRequest = function (p, u, a, c) {
	    var U = this.sServiceUrl;
	    if (p) {
	        if (!jQuery.sap.startsWith(p, '/')) {
	            U += '/'
	        }
	        U += p
	    }
	    if (!u) {
	        u = []
	    }
	    if (this.sUrlParams) {
	        u.push(this.sUrlParams)
	    }
	    if (u.length > 0) {
	        U += '?' + u.join('&')
	    }
	    if (c === undefined) {
	        c = true
	    }
	    if (c === false) {
	        var t = jQuery.now();
	        var r = U.replace(/([?&])_=[^&]*/, '$1_=' + t);
	        U = r + ((r === U) ? (/\?/.test(U) ? '&' : '?') + '_=' + t : '')
	    }
	    var C = {};
	    jQuery.extend(C, this.mCustomHeaders, this.oHeaders);

	    return {
	    	requestUri:gadgets.io.getProxyUrl("") + encodeURIComponent(U), 
	    	headers:C, 
	    	async:a, 
	    	user:this.sUser, 
	    	password:this.sPassword
	    }
	};
}

function init()
{
	
var baseURL = host + "/teched-ui-reviews-web/";

jQuery.sap.registerModulePath("app", "js");
jQuery.sap.require("app.config");
jQuery.sap.require("app.utility");

// Internationalization: Create global i18n resource bundle for texts in application UI
sap.app.i18n = new sap.ui.model.resource.ResourceModel({
	bundleUrl : gadgets.io.getProxyUrl(baseURL + "i18n/i18n.properties"),
	locale : sap.ui.getCore().getConfiguration().getLanguage()
});
sap.ui.getCore().setModel(sap.app.i18n, "i18n");

// create global i18n resource bundle for country names
sap.app.countryBundle = jQuery.sap.resources({
	url : gadgets.io.getProxyUrl(baseURL + "i18n/countries.properties"),
	locale : sap.ui.getCore().getConfiguration().getLanguage()
});

// instantiate initial view with a shell
jQuery.sap.registerModulePath(sap.app.config.viewNamespace, gadgets.io.getProxyUrl(baseURL + sap.app.config.viewNamespace));
//sap.ui.localResources(sap.app.config.viewNamespace);
var oMainView = sap.ui.view({
	id : "main-shell",
	viewName : "espm-ui-reviews-web.main",
	type : sap.ui.core.mvc.ViewType.JS
});

// get OData Model from server, using JSON format
jQuery.sap.require("sap.ui.model.odata.ODataModel");
adjustUI5ModelToCloudPortal();
sap.app.odatamodel = new sap.ui.model.odata.ODataModel(host + "/teched-ui-reviews-web/proxy/" + sap.app.utility.getBackendDestination(), true);
sap.app.odatamodel.setCountSupported(false);
sap.app.odatamodel.attachRequestCompleted(this, sap.app.readOdata.requestCompleted);

// ensure that CSRF token is not taken from cache
sap.app.odatamodel.refreshSecurityToken();

// set model to core
sap.ui.getCore().setModel(sap.app.odatamodel);

// get categories from OData model and transfer it in readCategoriesSuccess into a json model to add an the additional
// category entry 'All Categories' which is not available in a OData model
sap.app.odatamodel.read("/ProductCategories", null, null, false, sap.app.readOdata.readCategoriesSuccess,
		sap.app.readOdata.readError);

// get extension business data (product reviews related data)
sap.app.extensionodatamodel = new sap.ui.model.odata.ODataModel(gadgets.io.getProxyUrl(host + "/teched-ui-reviews-web/proxy/" + sap.app.utility.getExtensionBackendDestination()));

// set model to core as extensionodatamodel
sap.ui.getCore().setModel(sap.app.extensionodatamodel, "extensionodatamodel");
sap.app.extensionodatamodel.attachRequestCompleted(this, sap.app.readExtensionOData.requestCompleted);

oMainView.placeAt("content");
}

gadgets.util.registerOnLoadHandler(init);