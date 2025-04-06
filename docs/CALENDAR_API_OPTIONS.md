# Free Calendar Integration Options

## 1. Google Calendar API

- **Free Tier**:
  - 1,000,000 requests/day (free quota)
  - Requires OAuth 2.0 authentication
  - Event creation/modification allowed

**Implementation**:

```typescript
// Example using Google Calendar API
const { google } = require("googleapis");

const calendar = google.calendar("v3");
const event = {
  summary: "Meeting",
  start: { dateTime: "2025-04-01T09:00:00-07:00" },
  end: { dateTime: "2025-04-01T10:00:00-07:00" },
};

await calendar.events.insert({
  calendarId: "primary",
  resource: event,
  auth: oAuth2Client,
});
```

## 2. Cal.com (Open Source Alternative)

- **Features**:
  - Self-hostable
  - API for event scheduling
  - Google Calendar sync
- **Limits**:
  - Requires own infrastructure
  - Basic features free

## 3. Microsoft Graph Calendar API

- **Free Tier**:
  - 10,000 requests/month
  - Office 365 account required

## 4. Nextcloud Calendar (Self-Hosted)

- **Features**:
  - Full CalDAV support
  - API access
  - Complete control
- **Requirements**:
  - Nextcloud server setup
  - Maintenance overhead

## Recommendation

For direct Google Calendar integration:

- Use Google Calendar API (free tier sufficient for most use cases)
- Implement OAuth flow for user authorization

For self-hosted solution:

- Cal.com provides good balance of features and control
