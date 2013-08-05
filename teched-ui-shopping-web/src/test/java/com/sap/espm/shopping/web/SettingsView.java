package com.sap.espm.shopping.web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class SettingsView {

    @FindBy(id = "settings-dialog-id")
    private WebElement settingdialog;

    @FindBy(id = "settings-cancel-button-id")
    private WebElement settingcancel;

    @FindBy(id = "settings-ok-button-id")
    private WebElement settingok;

    @FindBy(id = "settings-cloud-backend-rb1-id-RB")
    private WebElement hanacloud;

    @FindBy(id = "settings-abap-backend-rb2-id")
    private WebElement abapbackendsystem;

    public SettingsView(WebDriver webDriver) {
        PageFactory.initElements(webDriver, this);
    }

    public boolean isSettingView() {
        return settingdialog.getAttribute("style").contains("visible");
    }

    public void switchToHanaCloud() {
        hanacloud.click();
    }

    public boolean isHanaCloud() {
        return !hanacloud.getAttribute("checked").isEmpty();
    }

    public void switchToAbapBackend() {
        abapbackendsystem.click();
    }

    public boolean isAbapBackend() {
        return !abapbackendsystem.getAttribute("checked").isEmpty();
    }

    public void pressOk() {
        settingok.click();
    }

    public void pressCancel() {
        settingcancel.click();
    }
}
