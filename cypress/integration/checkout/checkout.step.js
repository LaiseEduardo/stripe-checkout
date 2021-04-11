/// <reference types="Cypress" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import cards from "../../fixtures/cards.json";
import paymentDetails from "../../fixtures/paymentDetails.json";

Given("Im on the {string} checkout page", (type) => {
	cy.navigateToCheckout(type);
	cy.getCheckoutDemoBody();
});

When("I update the cart item(s)", () => {
	cy.getCheckoutDemoBody().find(".LineItem-adjustableQty").first().click();
	cy.getCheckoutDemoBody()
		.find(".AdjustQuantityModal-toggleQuantityBtn")
		.last()
		.click();
	cy.getCheckoutDemoBody().find(".AdjustQuantityFooter-btn").click();
});

When("I fill out {string} payment details", (status) => {
	const getCardNumber = () => {
		return cards[status] || cards.valid;
	};

	const getPaymentDetails = () => {
		console.log(status, paymentDetails[status]);
		return paymentDetails[status] || paymentDetails.valid;
	};

	const details = {
		...getPaymentDetails(),
		number: getCardNumber(),
	};

	cy.log(JSON.stringify(details));
	cy.fillOutCreditCardDetails(details);
});

When("I {string} my 3D security details", (authorization) => {
	cy.select3dSecureOption(authorization);
	cy.get("#challengeFrame").should("not.exist");
});

When("I try to complete the purchase", () => {
	cy.getCheckoutDemoBody().find(".SubmitButton").click();
});

Then("I should have completed the purchase with success", () => {
	cy.getCheckoutDemoBody()
		.find(".SubmitButton--processing")
		.should("be.visible");
	cy.getCheckoutDemoBody()
		.find("#cardNumber")
		.should("have.attr", "aria-invalid", "false");
	cy.getCheckoutDemoBody().find(".SubmitButton--complete").should("not.exist");
	cy.getCheckoutDemoBody().find(".ConfirmPayment-Error").should("not.exist");
});

Then("I should not be able to complete the purchase", () => {
	cy.getCheckoutDemoBody()
		.find(".SubmitButton--processing")
		.should("be.visible");
	cy.getCheckoutDemoBody().find(".SubmitButton--complete").should("not.exist");
	cy.getCheckoutDemoBody()
		.find("#cardNumber")
		.should("have.attr", "aria-invalid", "true");
});

Then("I should not see my order being processed", () => {
	cy.getCheckoutDemoBody()
		.find(".SubmitButton--processing")
		.should("not.exist");
});

Then("I should see the wallet payment option", () => {
	cy.getCheckoutDemoBody()
		.find("div.FakeWalletButton.FakeWalletButton--applePay")
		.should("be.visible");
});
