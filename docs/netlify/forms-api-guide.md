# Netlify Forms API Guide

https://docs.netlify.com/api/get-started/#forms


## Core Concepts
```mermaid
sequenceDiagram
    participant C as Client
    participant N as Netlify
    participant F as Form
    C->>N: Submit Form (POST)
    N->>F: Process submission
    F->>N: Store data
    N->>C: Success response
```

## API Access Methods

1. **Native Integration** (Automatic):
   - Forms with `data-netlify="true"` attribute
   - Requires no additional configuration
   - Submissions stored in Netlify admin

2. **JavaScript Fetch API**:
```javascript
fetch('/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(formData)
})
```

3. **Direct REST API**:
```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.netlify.com/api/v1/sites/{site_id}/forms/{form_id}/submissions"
```

## Key API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/forms` | GET | List all forms |
| `/api/v1/forms/{form_id}` | GET | Get form details |
| `/api/v1/forms/{form_id}/submissions` | GET | List submissions |
| `/api/v1/forms/{form_id}/submissions` | POST | Create submission |

## Submission Data Structure

```javascript
{
  "id": "123",
  "form_id": "contact",
  "site_url": "https://yoursite.netlify.app",
  "created_at": "2025-04-07T16:00:00Z",
  "fields": [
    { "name": "email", "value": "user@example.com" },
    { "name": "message", "value": "Hello!" }
  ]
}
```

## Authentication
1. **Personal Access Token**:
   - Create in Netlify user settings
   - Required for API access
   - Permissions: `forms:read`, `forms:write`

2. **OAuth**:
   - For third-party integrations
   - Uses standard OAuth2 flow

## Rate Limits
- 120 requests/minute
- 5000 submissions/day (free tier)
- Batch submissions recommended for >100 items

## Webhooks
Configure in `netlify.toml`:
```toml
[[webhooks]]
  for = "submission-created"
  url = "https://your-endpoint.com/hooks"
```

## Common Patterns

1. **Submission Processing**:
```typescript
// netlify/functions/process-form.ts
export const handler = async (event) => {
  const formData = parse(event.body);
  await validateHuman(formData); // Honeypot/Captcha
  
  const response = await fetchNetlifyAPI(`forms/${formData.name}/submissions`, {
    method: 'POST',
    body: JSON.stringify({
      fields: Object.entries(formData).map(([name, value]) => 
        ({ name, value }))
    })
  });

  return { statusCode: response.ok ? 200 : 500 };
};
```

## Troubleshooting

Verify submissions via:
```bash
# CLI
netlify forms:list
netlify forms:show --name=contact

# API
curl -H "Authorization: Bearer $TOKEN" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/submissions"

  nfp_xByayTVGx9wqJeUW4o2FVDVrbFdwFTwR93f6


  nfp_xByayTVGx0wqJeUW4o2FVDVrbFdwFTwR93f5

  curl -X GET   -H "Authorization: Bearer nfp_xByayTVGx9wqJeUW4o2FVDVrbFdwFTwR93f6"   -H "Accept: application/json"   "https://api.netlify.com/api/v1/sites/b103db3a-b672-4475-9710-9a81e982c79d/forms" 
  | jq '.'