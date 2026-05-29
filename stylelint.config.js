/** @type {import('stylelint').Config} */
module.exports = {

	plugins: [
		"@double-great/stylelint-a11y",
		"stylelint-order"
	],
	extends: [
		"@double-great/stylelint-a11y/recommended",
		"stylelint-config-standard"
	],
	rules: {

		// Suppress stylelint-config-recommended errors
		"no-duplicate-selectors": null, // Workaround for WET/GCWeb bugs, remove once it's fixed upstream

		// Suppress stylelint-config-standard errors
		"comment-empty-line-before": null, // Overly aggressive, deliberately using adjacent comment blocks for line-like comments and unused selectors
		"media-feature-range-notation": "prefix", // WET's traditional media query notation, "context" preset caused controversy for being too new
		"number-max-precision": null, // Fails on a re-declaration of a Bootstrap grid's properties

		// Additional rule from stylelint-order plugin
		"order/properties-alphabetical-order": true
	}
};
