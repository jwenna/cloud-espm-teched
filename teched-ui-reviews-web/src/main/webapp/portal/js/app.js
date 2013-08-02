/**
 * app.js
 * 
 * main application script - include required modules - instantiate localization model - init main shell view -
 * instantiate main product model
 */

function adjustUI5ModelToCloudPortal() 
{
	jQuery.sap.require("app.config");
	
	// OData model adjustments to run inside CP
	sap.ui.model.odata.ODataModel.prototype._createRequest = function (p, u, a, c) 
	{
	    var U = this.sServiceUrl;
	    
	    if (p) 
	    {
	        if (!jQuery.sap.startsWith(p, '/')) 
	        {
	            U += '/'
	        }
	        U += p
	    }
	    
	    if (!u) 
	    {
	        u = []
	    }
	    
	    if (this.sUrlParams) 
	    {
	        u.push(this.sUrlParams)
	    }
	    
	    if (u.length > 0) 
	    {
	        U += '?' + u.join('&')
	    }
	    
	    if (c === undefined) 
	    {
	        c = true
	    }
	    
	    if (c === false) 
	    {
	        var t = jQuery.now();
	        var r = U.replace(/([?&])_=[^&]*/, '$1_=' + t);
	        U = r + ((r === U) ? (/\?/.test(U) ? '&' : '?') + '_=' + t : '')
	    }
	    
	    var C = {};
	    jQuery.extend(C, this.mCustomHeaders, this.oHeaders);

	    return {
	    	requestUri: sap.app.config.getHostURL("") + encodeURIComponent(U), 
	    	headers:C, 
	    	async:a, 
	    	user:this.sUser, 
	    	password:this.sPassword
	    }
	};
}

function init()
{
	jQuery.sap.require("app.config");
	jQuery.sap.require("app.utility");
	
	// Internationalization: Create global i18n resource bundle for texts in application UI
	sap.app.i18n = new sap.ui.model.resource.ResourceModel({
		bundleUrl : getUrl("i18n/i18n.properties"),
		locale : sap.ui.getCore().getConfiguration().getLanguage()
	});
	sap.ui.getCore().setModel(sap.app.i18n, "i18n");
	
	// instantiate initial view with a shell
	//sap.ui.localResources(sap.app.config.viewNamespace);
	var oMainView = sap.ui.view({
		id : "main-shell",
		viewName : "espm-ui-reviews-web.main",
		type : sap.ui.core.mvc.ViewType.JS
	});
	
	// get OData Model from server, using JSON format
	sap.app.odatamodel = new sap.ui.model.odata.ODataModel(host + "/teched-ui-reviews-web/" + "proxy/" + sap.app.utility.getBackendDestination(), true);
	sap.app.odatamodel.setCountSupported(false);
	sap.app.odatamodel.attachRequestCompleted(this, sap.app.readOdata.requestCompleted);
	
	// ensure that CSRF token is not taken from cache
	sap.app.odatamodel.refreshSecurityToken();
	
	// set model to core
	sap.ui.getCore().setModel(sap.app.odatamodel);
	
	// get categories from OData model and transfer it in readCategoriesSuccess into a json model to add an the additional
	// category entry 'All Categories' which is not available in a OData model
	sap.app.odatamodel.read("/ProductCategories", null, null, false, sap.app.readOdata.readCategoriesSuccess, sap.app.readOdata.readError);
	
	// get extension business data (product reviews related data)
	sap.app.extensionodatamodel = new sap.ui.model.odata.ODataModel(host + "/teched-ui-reviews-web/" + "proxy/" + sap.app.utility.getExtensionBackendDestination());
	
	// set model to core as extensionodatamodel
	sap.ui.getCore().setModel(sap.app.extensionodatamodel, "extensionodatamodel");
	sap.app.extensionodatamodel.attachRequestCompleted(this, sap.app.readExtensionOData.requestCompleted);
	
	oMainView.placeAt("content");
}

gadgets.util.registerOnLoadHandler(init);