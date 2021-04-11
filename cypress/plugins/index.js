/// <reference types="cypress" />
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on, config) => {
	on("file:preprocessor", cucumber());

	on("before:browser:launch", (browser = {}, launchOptions) => {
		if (browser.family === "chromium" && browser.name !== "electron") {
			launchOptions.args.push("--disable-dev-shm-usage");
			launchOptions.args.push("--disable-site-isolation-trials");
		}
		return launchOptions;
	});
};
