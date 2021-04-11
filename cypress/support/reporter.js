const reporter = require("multiple-cucumber-html-reporter");

const today = new Date();
const date =
	today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
const time =
	today.getHours() + "h" + today.getMinutes() + "m" + today.getSeconds() + "s";
const dateTime = date + "_" + time;

const options = {
	jsonDir: "cypress/cucumber-json/",
	reportPath: "cypress/reports/stripe-checkout-dev_" + dateTime + ".html",
};

reporter.generate(options);
