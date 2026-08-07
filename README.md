# GW Moving and Storage LLC — GitHub Pages Website

This package contains a static website prepared for **GitHub Pages** and customized for:

- **Company name:** GW Moving and Storage LLC
- **Domain:** gwmovingandstorage.com
- **Email:** info@gwmovingandstorage.com
- **Phone:** (980) 393-7794
- **Business address:** Available upon request

## Included pages

- `index.html` — homepage
- `services.html` — service overview
- `quote.html` — quote request form
- `contact.html` — contact page
- `404.html` — not found page
- `CNAME` — custom domain file for GitHub Pages

## Included assets

- Your uploaded logo files
- Realistic branded moving and storage images
- Dedicated piano service image
- Responsive CSS and navigation JS

## Forms

The forms are configured to open the user's email app using `mailto:` so the site remains fully compatible with GitHub Pages (which is static hosting).

If you want direct form submission later, you can connect the forms to a service such as:

- Formspree
- Basin
- Netlify Forms (if hosting on Netlify)
- Your own serverless/backend endpoint

## Publish to GitHub Pages

1. Create a new GitHub repository.
2. Upload every file from this folder into the repository root.
3. Open the repository **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select your main branch and `/ (root)`.
7. Save.
8. Wait for GitHub Pages to publish the site.

## Custom domain

A `CNAME` file is already included with:

`gwmovingandstorage.com`

In your DNS provider, point the domain to GitHub Pages using GitHub's current recommended DNS records.

## File structure

```
index.html
services.html
quote.html
contact.html
404.html
CNAME
.nojekyll
assets/
  css/styles.css
  js/main.js
  images/
```

## tawk.to live chat

The HTML pages contain a marker near the closing `</body>` tag where the tawk.to widget code can be pasted.

In tawk.to, open the correct property, then go to **Administration → Chat Widget**, copy the Widget Code, and paste the complete script at that marker on each HTML page.

Because this is a static GitHub Pages site, the tawk.to JavaScript widget can run normally in the browser.

## Live chat

The Tawk.to widget has been embedded across all site pages using your provided widget code.
You can continue customizing the widget appearance and messages from your Tawk.to dashboard without changing the website files.


## Recommended tawk.to greeting copy

The website's custom **Chat With Us** buttons call `Tawk_API.maximize()` and open the embedded tawk.to widget directly.

Recommended widget content in your tawk.to dashboard:

### Online heading
`Planning a move? We’re here to help.`

### Online greeting
`Welcome to GW Moving and Storage LLC. Tell us what you’re moving and where it needs to go. Our team can help with residential moves, storage, piano moving, piano relocation, and piano storage. Start a chat and we’ll help you determine the next step.`

### Short proactive greeting
`Hi! 👋 Need a moving quote or have a question about storage or piano service? Chat with our team and we’ll be happy to help.`

### Away heading
`Our team is currently assisting other customers.`

### Away message
`Please leave your name, email or phone number, and a brief description of your move. A member of the GW Moving and Storage team will follow up as soon as possible.`

### Offline heading
`Request help with your move.`

### Offline message
`Thanks for contacting GW Moving and Storage LLC. Leave your contact information, pickup and destination city or ZIP code, preferred moving date, and the service you need. We’ll get back to you as soon as possible.`

### Suggested pre-chat fields
- Name — required
- Email — required
- Phone — optional
- Service — optional dropdown: Residential Moving, Long-Distance Moving, Storage, Piano Moving, Piano Relocation, Piano Storage, Request a Quote, Other

Avoid asking for a full street address in the pre-chat form. City/state or ZIP code is enough for the first conversation.


## Tracking page

A new `track.html` page is included. It supports public tracking numbers and move-history timelines.

Tracking records are currently stored in:

`assets/js/tracking-data.js`

Sample records:

- `GW-240781` — In Transit
- `GW-104392` — Completed piano relocation
- `GW-550812` — Scheduled move + storage

Because GitHub Pages is static hosting, do not store customer names, full street addresses, payment information, phone numbers, or other private information in this JavaScript file. For live/private tracking, connect the front end to a secure backend/API.

### Tracking + tawk.to

The tracking page includes a **Chat About This Move** button. When clicked, it:

- opens the tawk.to widget,
- adds the `tracking-help` tag when the API is available, and
- records a `tracking-help-requested` event with the entered tracking number when available.

To expose tracking directly inside the tawk.to widget, edit the widget in your tawk.to dashboard and add a Text Area card containing a link to:

`https://gwmovingandstorage.com/track.html`

Suggested widget copy:

**Need to check an existing move?**  
Track your move online or start a chat and our team will help with the latest status.

Suggested linked text: **Track Your Move**
