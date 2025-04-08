# Netlify Forms Implementation Guide

review https://docs.netlify.com/api/get-started/#forms
https://answers.netlify.com/t/support-guide-form-problems-form-debugging-404-when-submitting/92
https://docs.netlify.com/forms/setup/#forms-for-next-js-or-ssr-frameworks

## Configuration

1. **Form Attributes**:
```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
  <!-- form fields -->
</form>
```

2. **Required Settings**:
- `name`: Unique form identifier
- `method="POST"`: Submission method
- `data-netlify="true"`: Enables processing
- `netlify-honeypot`: Spam prevention

## Implementation Details

### Here’s an AJAX form submission code sample
const handleSubmit = event => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
    .then(() => navigate("/thank-you/"))
    .catch(error => alert(error));
};



### Angular Component
```typescript
onSubmit() {
  if (this.contactForm.valid) {
    const formData = new FormData();
    Object.keys(this.contactForm.value).forEach(key => {
      formData.append(key, this.contactForm.value[key]);
    });
    formData.append('form-name', 'contact');
    
    fetch('/', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(() => {
      // Success handling
      this.contactForm.reset();
    })
    .catch(error => {
      // Error handling
    });
  }
}
```

## Testing Procedures

### 1. Local Testing with Netlify Dev
```bash
netlify dev
```
- Submit test forms at http://localhost:8888
- Check terminal for submission logs
- Verify form data appears in Netlify Functions logs

### 2. Production Testing
1. Deploy to Netlify:
```bash
netlify deploy --prod
```
2. Submit test forms on live site
3. Verify submissions in Netlify admin panel:
   - Forms → Submissions
   - Check for successful submissions
   - Verify spam filtering

### 3. Automated Testing (Cypress)
Add to cypress/e2e/forms.cy.js:
```javascript
describe('Contact Form', () => {
  it('Submits successfully', () => {
    cy.intercept('POST', '/', { statusCode: 200 })
    cy.get('form').submit()
    cy.contains('Thank you').should('be.visible')
  })
})
```

### 4. Manual Verification Checklist
- [ ] Form has `data-netlify="true"`
- [ ] Hidden `form-name` field matches form name
- [ ] Honeypot field exists and is hidden
- [ ] Form method is POST
- [ ] All required fields have validation
- [ ] Success/error messages display properly

## Troubleshooting

- Ensure `form-name` matches in form attributes and hidden field
- Check Netlify build logs for form detection
- Verify CORS headers if submission fails

## Testing recommendations:

- Submit test form
- Verify thank-you page styling
- Check translations in both languages
- Test mobile responsiveness

Form-triggered functions
You can integrate your forms with Netlify Functions by triggering a serverless function when a form submission is verified. Find out more in the Functions docs. https://docs.netlify.com/functions/trigger-on-events/