package com.sap.espm.shopping.web;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CheckoutAddressView {

	private WebDriver driver;

	@FindBy(id = "address-email")
	private WebElement emailInputField;

	@FindBy(id = "rbg_customer-0")
	private WebElement existingCustomerRadioButton;

	@FindBy(id = "rbg_customer-1")
	private WebElement newCustomerRadioButton;

	@FindBy(id = "countries-ddlb-input")
	private WebElement countries;

	public CheckoutAddressView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
		driver = webDriver;
	}

	public void enterEmail(String text) {
		// enter the mail id
		emailInputField.clear();
		emailInputField.sendKeys(text);
		emailInputField.sendKeys(Keys.RETURN);
	}

	public void switchToNewCustomer() {
		// choose new customer
		newCustomerRadioButton.click();
	}

	public void switchToExistingCustomer() {
		// choose existing customer
		existingCustomerRadioButton.click();
	}

	public boolean isAddressFormAvailable() {
		// verify that the address field is available
		if (driver.findElement(By.id("address-fields")) != null) {
			return true;
		} else {
			return false;
		}
	}

	public boolean isCountryAvailable() {
		// verify that the address field is available and dropdown listbox not empty
		if (countries!=null && !countries.getAttribute("value").isEmpty()){
			return true;
		} else {
			return false;
		}
	}
	
}
