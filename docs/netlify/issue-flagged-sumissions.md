Below is an investigation into why your submission may be landing in Spam, an explanation of what `enctype="multipart/form-data"` does, and three alternative anti‑spam strategies you can adopt—each with its own trade‑offs.

---

## 1. Why Akismet May Be Flagging Your Submission

### A. Content‑Quality Signals  
Netlify uses Akismet under the hood to score every submission for “spamminess.” Akismet looks at things like:  
- **Message length and content**: Very short or nonsensical messages (e.g. `"TEST4"`) often score as spam citeturn0search1turn0search2.  
- **Generic email addresses**: Free domains (like Gmail) combined with short content can trigger false positives citeturn0search2.  
- **Rate of submissions**: Rapid-fire tests from the same IP can look bot‑driven.

### B. Build‑Time Form Detection  
Netlify’s form processor must “see” your `<form data-netlify>` markup at **build time**. In an SPA (Angular) that renders forms entirely in the client, Netlify may not register the form schema, so submissions end up unrecognized or auto‑rejected. Make sure:  
1. **Form Detection is Enabled** in your site settings.  
2. Your `<form>` (with `data-netlify="true"`) appears in the **static** HTML of your deployed build (or use a `<noscript>` fallback) citeturn0search2.

---

## 2. The Role of `enctype="multipart/form-data"`

When you submit a form **natively** (i.e. not via `fetch`), the browser encodes the request body according to the form’s `enctype`:

| `enctype` Value                       | Use Case                                | Content‑Type Header                      |
|---------------------------------------|-----------------------------------------|------------------------------------------|
| **`application/x-www-form-urlencoded`** (default) | Text‑only fields                       | `application/x-www-form-urlencoded`      |
| **`multipart/form-data`**             | File uploads (binary data + text)       | `multipart/form-data; boundary=…`        |
| **`text/plain`**                      | Rarely used (plain text)                | `text/plain`                             |

- **Why add `multipart/form-data` now?** Even if you’re only sending text today, declaring `enctype="multipart/form-data"` on your `<form>` ensures that when you add `<input type="file">` later, the browser will package files correctly without further template changes.

> **Note:** When you use `fetch(..., { body: formData })`, the browser automatically sets the proper `multipart/form-data` header (including the boundary). The form’s `enctype` attribute only affects **native** submissions (i.e. when you rely on the browser’s default POST behavior).

---

## 3. Three Alternative Anti‑Spam Solutions

Below are three distinct approaches—ranging from zero‑friction to maximum control. Choose one (or combine them) based on your UX and maintenance priorities.

| Strategy                              | Pros                                                      | Cons                                                       |
|---------------------------------------|-----------------------------------------------------------|------------------------------------------------------------|
| **1. Add reCAPTCHA v2**               | • Very effective against bots<br>• Supported by Netlify out of the box citeturn2search0 | • Adds user friction (“I’m not a robot”)<br>• Requires site & secret keys |
| **2. Time‑based Honeypot**            | • Invisible to users<br>• No external dependencies        | • Requires custom server‑side logic (e.g. Netlify Function)<br>• Bots may adapt |
| **3. Serverless Proxy + Custom Spam** | • Full control over spam rules<br>• Can integrate any API (e.g. OOPSpam, Akismet directly) | • More development & maintenance overhead<br>• Bypasses Netlify Forms UI |

---

### 3.1. reCAPTCHA v2 via Netlify

```html
<form name="contact" method="POST" data-netlify="true" data-netlify-recaptcha="true">
  <!-- your fields… -->
  <div data-netlify-recaptcha="true"></div>
  <button type="submit">Send</button>
</form>
```

- **Setup:**  
  1. Add `<div data-netlify-recaptcha="true"></div>` inside your form.  
  2. Set `SITE_RECAPTCHA_KEY` and `SITE_RECAPTCHA_SECRET` in your Netlify site’s Environment Variables citeturn2search0.  
- **When to use:** High‑value forms where you can accept the extra click to “prove you’re human.”

---

### 3.2. Time‑based Honeypot

1. **Add a hidden timestamp** when the form is rendered:
   ```html
   <input type="hidden" name="start-time" id="start-time" value="{{ now }}" />
   ```
2. **On submit**, read that timestamp in your `onSubmit()`, compare to `Date.now()`, and if the form was filled in under, say, 3 seconds, treat it as spam:
   ```typescript
   const start = Number((document.getElementById('start-time') as HTMLInputElement).value);
   if (Date.now() - start < 3000) {
     // drop silently or notify user
     return;
   }
   ```
- **Pros:** No visible challenges, good UX.  
- **Cons:** Requires client‑ and server‑side logic; determined bots may wait.

---

### 3.3. Serverless Proxy with Custom Spam Logic

Instead of posting directly to Netlify Forms:

1. **Create a Netlify Function** (`/functions/contact.js`) that:
   - Receives your form payload.
   - Runs it through your choice of spam checks (Akismet API, OOPSpam, custom heuristics).
   - **Then** forwards valid submissions to Netlify’s Form API or your own email/webhook.

2. **Submit via AJAX** to `/.netlify/functions/contact` instead of `/`.

- **Pros:**  
  - Complete control over spam rules and notifications.  
  - You can ensure **all** submissions (even flagged ones) trigger follow‑up logic.  
- **Cons:**  
  - More code to maintain.  
  - You lose Netlify’s built‑in Form UI for verified submissions (though you can call the API yourself).

---

## Next Steps

1. **Review your test data**: try a longer, more realistic message (full sentences) and a real‑looking email address.  
2. **Enable reCAPTCHA or implement one of the above alternatives** to reduce reliance on Akismet alone.  
3. **Redeploy** and monitor both your Verified and Spam lists in the Netlify Dashboard.  

By understanding how Akismet scores content, what `enctype` does, and which anti‑spam tools best match your UX goals, you can dramatically reduce false positives and keep genuine leads flowing through.