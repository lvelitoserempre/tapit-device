# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [v2.0.4] - To be released
### Added
- The user can now add a CTA in drupal that leads the user to a section in the homepage
- Add transaction historic (https://abi-consumerdigitalproducts.atlassian.net/browse/MAL-175)
- Add highlighted items for Maltas and expiration points (https://abi-consumerdigitalproducts.atlassian.net/browse/MAL-36)
- Add screen to update ID and trigger point synchronization processes (https://abi-consumerdigitalproducts.atlassian.net/browse/MAL-174)
- Changed Drupal API endpoint and adapted to new response structure
- Added a static Sitemap to the Home page (https://github.com/ab-inbev-global-martech/TapIt-Web/)
- Logged/not logged version of the page is rendered by SSR
### Changed
- CTA for internal sections won't change URL in order to avoid redirection on user login
- Fixed the description on banner sections that wasn't displaying the copy text
- The header section that displays points is now hidden when homepage is visited in mobile apps
- Upgraded dependencies version
- Handling errors in document validation popup.
## [v2.0.3] - 2021-04-12
### Added
- Added a header to provide a token when consuming the now protected drupal API
- Fixed the missing image on the recovery password section
- Added lazy loading to images
## [v2.0.2]
### Added
- Fixed eye icon to display the password on recovery password section
- Loaded share and referal code by default when visiting user profile
## [v2.0.1]
### Added
- Fixed a misaligned recommended section component in mobile
## [v2.0.0]
### Added
- Recommended Section (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-2471)
- Earn points section (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-2938)
- Integrate age gate in homepage (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-2992)
- Integrate SSO in new home of TapIt (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-2854)
- Age gate appears after the user login on iOS web [safari and chrome] (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3073)
- Hide banner buttons when link and text from CTA are empty (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3077)
- Added Google Tag Manager (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3078)
- Fix: The users can't see their points and the referal code in the profile section. (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3065)
- Fix: The Market button wasn't redirecting to the corresponding market (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3082)
- Fix: Cards wasn't displayed right on mobile web version and also hidding cookie bar in app (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3033)
- Tapit logo redirects to homepage (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3090)
- Added redirect to onelink for using deeplink when navigating to /earnpoints
- Added QA assetlinks file
- Corrected and added deployment scripts to includ QA asset links file and deploy to prod and prod-preview

### Changed
- Changed script for deployment SSR angular new home page (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3071)

### Removed
- React home page, SSO example and market (https://abi-consumerdigitalproducts.atlassian.net/browse/ANH001-3071)

## [1.0.0] - 2021-03-31

## Changed
- Add changes at history component, to display redem mode, in this case "Por medio de promocodigo Aguila", shows icons and labels.

- This branch was created from 'dev' branch.