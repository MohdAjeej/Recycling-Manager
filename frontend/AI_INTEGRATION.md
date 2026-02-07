# AI Integration Guide

## Setup Instructions

### 1. Create Environment File

Create a `.env` file in the `frontend` directory with your Gemini API key:

```env
# Google Gemini API Key
# Get your key from: https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Get Gemini API Key

**Google Gemini:**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste into `.env` file as `VITE_GEMINI_API_KEY`

**Important:** Make sure the Generative Language API is enabled in your Google Cloud Console project.

### 3. Restart Dev Server

After adding your API key, restart your development server:

```bash
npm run dev
```

## Usage

### Automatic Provider Selection

The system automatically selects the provider:
1. If Gemini key is present → Uses Google Gemini
2. If no key → Uses mock evaluations (for testing)

### Manual Provider Selection

You can manually select a provider in the AI Evaluation Panel:
- **Auto**: Automatically uses Gemini if API key is available
- **Gemini**: Force use Google Gemini
- **Mock**: Use mock evaluations (for testing)

## Features

- ✅ Supports Google Gemini API
- ✅ Automatic fallback to mock if API fails
- ✅ Batch evaluation of multiple candidates
- ✅ Progress tracking
- ✅ Error handling
- ✅ Rate limiting protection
- ✅ Multiple model fallback (tries gemini-1.5-flash, gemini-1.5-pro, gemini-pro)

## Cost Considerations

- **Google Gemini**: ~$0.001 per candidate evaluation (very affordable!)
- **Mock**: Free (no API calls)

For 40 candidates:
- Gemini: ~$0.04 (excellent value!)

## Troubleshooting

### API Key Not Working
- Verify key is correct in `.env` file
- Check for extra spaces or quotes
- Restart dev server after changes
- Ensure Generative Language API is enabled in Google Cloud Console
- Verify your API key has proper permissions

### 404 Errors
- Check that your API key is valid
- Ensure the Generative Language API is enabled in Google Cloud Console
- Verify your API key has access to Gemini models
- The system will automatically try different model versions if one fails

### Rate Limiting
- The service includes automatic delays between requests
- If you hit rate limits, wait a few minutes and try again
- Check your Google Cloud Console for quota limits

### CORS Errors
- Make sure you're running from `localhost` or a proper domain
- API keys should be kept secure and not exposed in client-side code

## API Endpoint Information

The Gemini API endpoint (`https://generativelanguage.googleapis.com/v1beta/...`) is an API endpoint, not a webpage. It's used for programmatic requests only.

**Authentication:** Uses `x-goog-api-key` header (recommended by Google)

**API Documentation:** https://ai.google.dev/gemini-api/docs
