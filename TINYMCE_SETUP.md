# TinyMCE Setup Guide

## Getting Your API Key

1. **Go to** [https://www.tiny.cloud/auth/signup/](https://www.tiny.cloud/auth/signup/)
2. **Sign up** for a free account
3. **Get your API key** from the dashboard

## Environment Configuration

Create a `.env.local` file in your project root and add:

```bash
NEXT_PUBLIC_TINYMCE_API_KEY=your-actual-api-key-here
```

Replace `your-actual-api-key-here` with the API key you received from TinyMCE.

## Features

- ✅ Rich text editing (bold, italic, headings, lists)
- ✅ Table support
- ✅ Image handling
- ✅ Russian language support (already configured)
- ✅ Professional toolbar
- ✅ Mobile responsive

## Russian Language Support

The editor is already configured with Russian language support. The Russian language file (`public/tinymce/langs/ru.js`) is included in the project and will automatically load when you use the editor.

## Usage

The TinyMCE editor is now integrated into your PageForm component and will automatically use the API key from your environment variables.

## Troubleshooting

If you still see the API key warning:
1. Make sure your `.env.local` file is in the project root
2. Restart your development server after adding the environment variable
3. Verify the API key is correct

If you see language loading errors:
1. Make sure the `public/tinymce/langs/` directory exists
2. Verify the `ru.js` file is present in the directory
3. Check that the file contains valid JavaScript code
