const dayjs = require("dayjs");
const faker = require("faker");

Cypress.Commands.add("getCheckoutDemoBody", () => {
	cy.log("getCheckoutDemoBody");

	return cy
		.get("#checkout-demo")
		.its("0.contentDocument.body")
		.should("not.be.empty")
		.then((body) => cy.wrap(body));
});

Cypress.Commands.add("get3dIframeBody", () => {
	return cy
		.getCheckoutDemoBody()
		.find("iframe")
		.first()
		.its("0.contentDocument.body")
		.should("not.be.empty")
		.then(($body) => {
			cy.wrap($body)
				.find("#challengeFrame")
				.its("0.contentDocument.body")
				.should("not.be.empty")
				.then(($challengeFrameBody) => {
					cy.wrap($challengeFrameBody)
						.find("iframe")
						.its("0.contentDocument.body")
						.should("not.be.empty")
						.then(($fullScreenFrameBody) => {
							cy.wrap($fullScreenFrameBody);
						});
				});
		});
});

Cypress.Commands.add("fillOutCreditCardDetails", (details) => {
	cy.getCheckoutDemoBody()
		.find("#email")
		.type(details.email || faker.internet.email());
	cy.getCheckoutDemoBody().find("#cardNumber").type(details.number);

	cy.getCheckoutDemoBody()
		.find("#cardExpiry")
		.type(details.expiration || dayjs().add(5, "years").format("MM/YY"));
	cy.getCheckoutDemoBody().find("#cardCvc").type(details.code);
	cy.getCheckoutDemoBody()
		.find("#billingName")
		.type(
			details.billingName ||
				`${faker.name.firstName()} ${faker.name.lastName()}`
		);
	cy.getCheckoutDemoBody()
		.find("#billingPostalCode")
		.type(details.zipCode || faker.address.zipCode());
});

Cypress.Commands.add("select3dSecureOption", (authorization) => {
	cy.wait(5000);
	cy.get3dIframeBody().get("iframe").its("length").should("be.gte", 0);

	if (authorization === "complete") {
		cy.get3dIframeBody().find("#test-source-authorize-3ds").click();
	} else {
		cy.get3dIframeBody().find("#test-source-fail-3ds").click();
		cy.getCheckoutDemoBody().find(".ConfirmPayment-Error").should("be.visible");
	}
});

Cypress.Commands.add("navigateToCheckout", (type) => {
	cy.visit("");
	if (type === "one-time") {
		cy.get(".NextStep").click();
	} else if (type === "recurring") {
		cy.get(".Navbar-StepOne > :nth-child(2)").click();
		cy.get(".NextStep").click();
	}
	cy.url().should("include", "/configure");
	cy.get(".NextStep").click();
});
