# SEO Fix Checklist from Lighthouse Report

This document summarizes the SEO issues found in the Lighthouse audit and provides actionable steps to fix them one by one.

---

## 1. Fix Uncrawlable Links

- **Problem:** Navigation links like "services", "about", "contact" lack valid `href` attributes, making them uncrawlable.
- **Solution:**  
  Update all important `<a>` tags to have valid URLs.

**Example:**

```html
<!-- Before -->
<a class="nav-link">Services</a>

<!-- After -->
<a href="/services" class="nav-link">Services</a>
```

---

## 2. Correct Heading Hierarchy

- **Problem:** Headings skip levels (e.g., `<h1>` to `<h3>`) which confuses search engines.
- **Solution:**  
  Use a logical nested heading structure.

**Example:**

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

---

## 3. Add `<main>` Landmark Element

- **Problem:** The page lacks a `<main>` element, making it harder for search engines and assistive tech to identify primary content.
- **Solution:**  
  Wrap your main content inside a `<main>` tag.

**Example:**

```html
<main>
  <!-- Your main content here -->
</main>
```

---

## 4. Label the Language `<select>` Element

- **Problem:** The language switcher `<select>` lacks an accessible label.
- **Solution:**  
  Add a `<label>` or `aria-label` for accessibility.

**Option A: Using `<label>`**

```html
<label for="locale">Language</label>
<select id="locale" name="locale">
  <!-- options -->
</select>
```

**Option B: Using `aria-label`**

```html
<select id="locale" name="locale" aria-label="Language">
  <!-- options -->
</select>
```

---

## 5. Improve Color Contrast

- **Problem:** The "contact" button text contrast ratio is too low (3.33), below the recommended 4.5:1.
- **Solution:**  
  Adjust foreground and background colors to increase contrast.

**Example:**

- Change button background or text color to meet contrast guidelines.
- Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify.

---

## How to Use This Checklist

- Work through each item one by one.
- After each fix, re-run Lighthouse to verify improvements.
- Commit changes incrementally with clear commit messages.

---

_Last updated: 2025-04-06_
