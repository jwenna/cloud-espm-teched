sap.ui.controller("espm-ui-reviews-web.settings", {

	oDialog : null,

	openDialog : function() {
		if (!this.oDialog) {
			this.oDialog = new sap.ui.commons.Dialog({
				id : "settings-dialog-id",
				showCloseButton : true,
				resizable : true,
				title : "{i18n>SETTINGS_DIALOG_TITLE}",
				buttons : [ new sap.ui.commons.Button({
					id : "settings-dialog-ok-button-id",
					text : "{i18n>SETTINGS_OK_BUTTON}",
					press : [ function() {
						this.save();
						this.oDialog.close();
						this.reloadPage();
					}, this ]
				}), new sap.ui.commons.Button({
					id : "settings-dialog-cancel-button-id",
					text : "{i18n>SETTINGS_CANCEL_BUTTON}",
					press : [ function() {
						this.oDialog.close();
					}, this ]
				}) ],
				content : [ this.getView() ],
			});
		}
		this.load();
		this.oDialog.open();
	},

	load : function() {
		// backend
		var oCloudRadioButton = sap.ui.getCore().byId("settings-cloud-backend-rb1-id");
		oCloudRadioButton.setSelected(!this.getPreferenceUseAbapBackend());

		var oAbapRadioButton = sap.ui.getCore().byId("settings-abap-backend-rb2-id");
		oAbapRadioButton.setSelected(this.getPreferenceUseAbapBackend());

		// display data source info
		var oDisplayDataSourceInfoChkBox = sap.ui.getCore().byId("cloud-odata-display-data-source-info-chkbox-id");
		oDisplayDataSourceInfoChkBox.setChecked(sap.app.localStorage
				.getPreference(sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO));
	},

	save : function() {
		// backend
		var oCloudRadioButton = sap.ui.getCore().byId("settings-cloud-backend-rb1-id");
		sap.app.localStorage.storePreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND, !oCloudRadioButton
				.getSelected());

		// display data source info
		var oDisplayDataSourceInfoChkBox = sap.ui.getCore().byId("cloud-odata-display-data-source-info-chkbox-id");
		sap.app.localStorage.storePreference(sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO,
				oDisplayDataSourceInfoChkBox.getChecked());
	},

	reloadPage : function() {
		sap.ui.commons.MessageBox.alert(sap.app.i18n.getProperty("SETTINGS_STORED_SUCCESS_MSG"), function() {
			window.location.reload();
		});
	},

	getPreferenceUseAbapBackend : function() {
		return sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND);
	}

});