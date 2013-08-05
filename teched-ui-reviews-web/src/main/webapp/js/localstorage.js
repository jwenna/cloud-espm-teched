jQuery.sap.declare("sap.app.localstorage");

/*
 * Use window.localStorage to store user preferences per browser. The user can define preferences (as backend type) in
 * the settings dialog.
 */
sap.app.localStorage = {

	PREF_USE_ABAP_BACKEND : "preferences.useAbapBackend",
	PREF_DISPLAY_DATA_SOURCE_INFO : "preferences.displayDataSourceInfo",

	getDefaultPreference : function(sKey) {
		switch (sKey) {
		case sap.app.localStorage.PREF_USE_ABAP_BACKEND:
			return sap.app.config.useAbapBackend;
		case sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO:
			return sap.app.config.displayDataSourceInfo;
		default:
			throw "Invalid preference key " + sKey;
		}
	},

	storePreference : function(sKey, value) {
		if (window.localStorage) {
			localStorage.setItem(sKey, value);
			return value;
		} else {
			return null;
		}
	},
	/*
	 * Returns window.localStorage value for item sKey. If window.localStorage does not exists or no value for sKey is
	 * stored then default preference value is returned.
	 */
	getPreference : function(sKey) {
		if (window.localStorage) {
			var storedValue = localStorage.getItem(sKey);
			if (storedValue) {
				if (sKey == sap.app.localStorage.PREF_USE_ABAP_BACKEND) {
					return (storedValue === 'true');
				} else if (sKey == sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO) {
					return (storedValue === 'true');
				} else {
					return (storedValue);
				}
			}
		}
		return (sap.app.localStorage.getDefaultPreference(sKey));
	},

	removeStoredPreference : function(sKey) {
		if (window.localStorage) {
			localStorage.removeItem(sKey);
		}
	},

};
