# FlowiseChatEmbed Customization Guide

## 🎨 Custom Purple/Pink Theme

This guide explains all the design customizations made to your FlowiseChatEmbed fork and how to use and further customize the widget.

---

## 📁 Files Modified

### 1. **Source Code Changes** (Requires rebuild)

These changes are baked into the compiled `dist/web.js` file after running `yarn build`:

#### `/src/assets/index.css`

**CSS design tokens updated:**

- Button color: `#0042da` → `#7C3AED` (purple)
- Bot bubble: `#f7f8ff` → `#F3E8FF` (light purple)
- User bubble: `#3b81f6` → `#EC4899` (pink)
- Font family: Added `'Poppins'` as primary font
- Border radius: `6px` → `12px`
- Header background: `#ffffff` → `#7C3AED` (purple)
- Text colors: `#303235` → `#2d3748` (darker gray)

#### `/src/components/bubbles/BotBubble.tsx`

**Default color constants:**

```typescript
defaultBackgroundColor: '#F3E8FF'; // Light purple
defaultTextColor: '#2d3748'; // Dark gray
defaultFeedbackColor: '#7C3AED'; // Purple
```

#### `/src/components/bubbles/GuestBubble.tsx`

**Default color constants:**

```typescript
defaultBackgroundColor: '#EC4899'; // Pink
```

#### `/src/features/bubble/components/BubbleButton.tsx`

**Default button settings:**

```typescript
defaultButtonColor: '#7C3AED'; // Purple
defaultBottom: 24; // Pixels from bottom
defaultRight: 24; // Pixels from right
```

#### `/tailwind.config.cjs`

**Extended Tailwind theme with custom colors:**

```javascript
colors: {
  brand: {
    primary: '#7C3AED',      // Purple
    secondary: '#EC4899',    // Pink
    accent: '#F59E0B',       // Amber
    light: '#F3E8FF',        // Light purple
    dark: '#2d3748',         // Dark gray
  },
  chatbot: {
    button: '#7C3AED',
    'bot-bubble': '#F3E8FF',
    'user-bubble': '#EC4899',
    text: '#2d3748',
  }
}
```

### 2. **Example HTML File** (No rebuild needed)

#### `/examples/custom-design.html`

Comprehensive example showing:

- How to reference the local build
- Full theme configuration object
- Custom CSS injection
- All available customization options

---

## 🚀 Quick Start - Testing Locally

### Step 1: Update Your Flowise API Endpoint

Open `examples/custom-design.html` and replace `YOUR_FLOWISE_CHATFLOW_URL` with your actual endpoint:

```javascript
// Find this line (around line 230):
const CHATFLOW_URL = 'YOUR_FLOWISE_CHATFLOW_URL';

// Replace with your actual URL:
const CHATFLOW_URL = 'https://your-flowise-instance.com/api/v1/prediction/your-chatflow-id';
```

### Step 2: Open in Browser

```bash
# Open the HTML file directly in your browser:
open examples/custom-design.html

# Or on Linux:
xdg-open examples/custom-design.html

# Or on Windows:
start examples/custom-design.html
```

**That's it!** You should see:

- Purple chat button in the bottom-right corner
- Purple/pink themed chat interface
- Poppins font throughout
- Custom colors for all elements

---

## 🎨 Two Ways to Customize

### Method 1: Configuration-Based (No Rebuild Required) ⚡

**Pros:** Instant changes, no rebuilding needed
**Cons:** Limited to exposed theme options
**Use for:** Quick color/font/layout tweaks

**Edit the theme object in your HTML:**

```javascript
Chatbot.init({
  chatflowid: 'YOUR_URL',
  theme: {
    chatWindow: {
      // Change colors instantly
      backgroundColor: '#ffffff',

      botMessage: {
        backgroundColor: '#E0F2FE', // Change to light blue
        textColor: '#1e293b',
      },

      userMessage: {
        backgroundColor: '#3B82F6', // Change to blue
        textColor: '#ffffff',
      },

      textInput: {
        sendButtonColor: '#3B82F6', // Change button color
      },
    },

    button: {
      backgroundColor: '#3B82F6', // Chat button color
      size: 'large', // 'small' | 'medium' | 'large'
      bottom: 24,
      right: 24,
    },

    // Inject custom CSS for advanced styling
    customCSS: `
      .chatbot-container {
        font-family: 'Inter', sans-serif !important;
      }
    `,
  },
});
```

**Save the HTML file and refresh your browser - changes appear instantly!**

### Method 2: Code-Level (Requires Rebuild) 🔧

**Pros:** Deep customization, permanent defaults
**Cons:** Requires rebuild with `yarn build`
**Use for:** Major redesigns, new default theme

**Workflow:**

1. **Edit source files:**

   ```bash
   # CSS design tokens
   vim src/assets/index.css

   # Component defaults
   vim src/components/bubbles/BotBubble.tsx
   vim src/components/bubbles/GuestBubble.tsx

   # Tailwind theme
   vim tailwind.config.cjs
   ```

2. **Rebuild:**

   ```bash
   yarn build
   ```

3. **Test:**

   ```bash
   open examples/custom-design.html
   ```

4. **Commit changes:**
   ```bash
   git add .
   git commit -m "feat: update chatbot design with new brand colors"
   ```

---

## 🎯 Common Customization Scenarios

### Change to Blue Theme

**Quick (Configuration-based):**

```javascript
theme: {
  chatWindow: {
    titleBackgroundColor: '#2563EB',  // Blue
    botMessage: { backgroundColor: '#DBEAFE', textColor: '#1e293b' },
    userMessage: { backgroundColor: '#3B82F6', textColor: '#ffffff' },
    textInput: { sendButtonColor: '#2563EB' },
  },
  button: { backgroundColor: '#2563EB' }
}
```

**Permanent (Code-level):**

Edit `src/assets/index.css`:

```css
--chatbot-button-bg-color: #2563eb;
--chatbot-host-bubble-bg-color: #dbeafe;
--chatbot-guest-bubble-bg-color: #3b82f6;
--chatbot-header-bg-color: #2563eb;
```

Then: `yarn build`

### Change Font to Inter

**Quick (Configuration-based):**

1. Add font to HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

2. Use custom CSS:

```javascript
theme: {
  customCSS: `
    .chatbot-container {
      font-family: 'Inter', sans-serif !important;
    }
  `;
}
```

**Permanent (Code-level):**

Edit `src/assets/index.css`:

```css
--chatbot-container-font-family: 'Inter', 'Open Sans';
```

Edit `tailwind.config.cjs`:

```javascript
fontFamily: {
  chatbot: ['Inter', 'Open Sans', ...defaultTheme.fontFamily.sans],
}
```

Then: `yarn build`

### Larger Border Radius (More Rounded)

**Quick (Configuration-based):**

```javascript
theme: {
  chatWindow: {
    borderRadius: 20,  // Pixels
  }
}
```

**Permanent (Code-level):**

Edit `src/assets/index.css`:

```css
--chatbot-border-radius: 20px;
```

Edit `tailwind.config.cjs`:

```javascript
borderRadius: {
  'chatbot': '20px',
}
```

Then: `yarn build`

### Auto-Open Chat on Page Load

**Configuration-based:**

```javascript
theme: {
  button: {
    autoWindowOpen: {
      autoOpen: true,
      openDelay: 2,  // Seconds
      autoOpenOnMobile: false,
    }
  }
}
```

---

## 📤 Deployment Options

### Option 1: GitHub Pages (Recommended for CDN)

1. **Push your changes to GitHub:**

   ```bash
   git add .
   git commit -m "feat: custom purple/pink theme"
   git push origin main
   ```

2. **Enable GitHub Pages:**

   - Go to your repo: https://github.com/bencium/FlowiseChatEmbed
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` → `/` (root)
   - Save

3. **Use in your website:**

   ```html
   <script type="module">
     import Chatbot from 'https://bencium.github.io/FlowiseChatEmbed/dist/web.js';

     Chatbot.init({
       chatflowid: 'YOUR_FLOWISE_URL',
       theme: {
         /* your theme */
       },
     });
   </script>
   ```

**URL will be:** `https://bencium.github.io/FlowiseChatEmbed/dist/web.js`

### Option 2: Self-Hosted Server

1. **Upload `dist/` folder to your server:**

   ```bash
   scp -r dist/ user@yourserver.com:/var/www/chatbot/
   ```

2. **Use in your website:**

   ```html
   <script type="module">
     import Chatbot from 'https://yourserver.com/chatbot/dist/web.js';

     Chatbot.init({
       /* ... */
     });
   </script>
   ```

### Option 3: NPM Package (Private or Public)

1. **Update `package.json`:**

   ```json
   {
     "name": "@bencium/flowise-chat-embed",
     "version": "1.0.0",
     "main": "dist/web.js"
   }
   ```

2. **Publish:**

   ```bash
   npm publish
   ```

3. **Use in projects:**

   ```bash
   npm install @bencium/flowise-chat-embed
   ```

   ```javascript
   import Chatbot from '@bencium/flowise-chat-embed';
   ```

---

## 🔧 Development Workflow

### Making Changes

```bash
# 1. Make changes to source files
vim src/assets/index.css

# 2. Build
yarn build

# 3. Test locally
open examples/custom-design.html

# 4. Commit
git add .
git commit -m "feat: update button color"

# 5. Push (if using GitHub Pages)
git push origin main
```

### Watch Mode (Auto-rebuild on changes)

```bash
# Terminal 1: Watch and rebuild
yarn dev

# Terminal 2: Serve HTML
npx serve .

# Open: http://localhost:3000/examples/custom-design.html
```

---

## 📊 Available Theme Options Reference

### Complete Theme Configuration Interface

```typescript
{
  chatWindow: {
    // Title Bar
    title?: string
    titleAvatarSrc?: string
    showTitle?: boolean
    titleTextColor?: string
    titleBackgroundColor?: string

    // Welcome & Prompts
    welcomeMessage?: string
    starterPrompts?: string[]
    starterPromptFontSize?: number

    // Bot Messages
    botMessage?: {
      backgroundColor?: string
      textColor?: string
      showAvatar?: boolean
      avatarSrc?: string
    }

    // User Messages
    userMessage?: {
      backgroundColor?: string
      textColor?: string
      showAvatar?: boolean
      avatarSrc?: string
    }

    // Text Input
    textInput?: {
      backgroundColor?: string
      textColor?: string
      placeholder?: string
      sendButtonColor?: string
      fontSize?: number
    }

    // Overall Window
    backgroundColor?: string
    backgroundImage?: string
    fontSize?: number
    height?: number
    width?: number
    borderRadius?: number

    // Feedback
    feedback?: {
      color?: string
    }

    // Footer
    footer?: {
      showFooter?: boolean
      textColor?: string
      text?: string
      company?: string
      companyLink?: string
    }

    // Date/Time
    dateTimeToggle?: {
      date?: boolean
      time?: boolean
    }
  }

  button: {
    backgroundColor?: string
    iconColor?: string
    customIconSrc?: string
    size?: 'small' | 'medium' | 'large' | number
    bottom?: number
    right?: number
    dragAndDrop?: boolean

    autoWindowOpen?: {
      autoOpen?: boolean
      openDelay?: number
      autoOpenOnMobile?: boolean
    }
  }

  tooltip: {
    showTooltip?: boolean
    tooltipMessage?: string
    tooltipBackgroundColor?: string
    tooltipTextColor?: string
    tooltipFontSize?: number
  }

  customCSS?: string
}
```

---

## 🎨 Current Theme Colors

### Purple/Pink Theme (Default in this fork)

| Element                | Color        | Hex Code  |
| ---------------------- | ------------ | --------- |
| Primary Button         | Purple       | `#7C3AED` |
| Secondary Accent       | Pink         | `#EC4899` |
| Bot Bubble Background  | Light Purple | `#F3E8FF` |
| User Bubble Background | Pink         | `#EC4899` |
| Text (Dark)            | Dark Gray    | `#2d3748` |
| Text (Light)           | White        | `#ffffff` |
| Header Background      | Purple       | `#7C3AED` |
| Border Radius          | 12px         | -         |

### Color Palette

```css
/* Brand Colors */
--purple-600: #7c3aed --pink-500: #ec4899 --purple-50: #f3e8ff --gray-800: #2d3748 --gray-400: #9ca3af --white: #ffffff /* Gradient Examples */
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
```

---

## 🐛 Troubleshooting

### Chat button not appearing

1. Check browser console for errors
2. Verify `dist/web.js` path is correct
3. Ensure Flowise URL is valid
4. Check for CORS issues (API must allow your domain)

### Colors not updating

**Configuration method:**

- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check for typos in color hex codes
- Ensure `theme` object is properly formatted

**Code-level method:**

- Run `yarn build` after changes
- Check that build completed without errors
- Clear browser cache
- Verify you're opening the correct HTML file

### Font not loading

1. Verify Google Fonts URL in `<head>`
2. Check network tab for font loading errors
3. Try using `customCSS` with `!important`:
   ```javascript
   customCSS: `
     .chatbot-container * {
       font-family: 'YourFont', sans-serif !important;
     }
   `;
   ```

### Build errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules yarn.lock
yarn install

# Try build again
yarn build
```

---

## 📚 Additional Resources

### Official Flowise Docs

- [FlowiseChatEmbed GitHub](https://github.com/FlowiseAI/FlowiseChatEmbed)
- [Flowise Documentation](https://docs.flowiseai.com/)

### Design Resources

- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [Google Fonts](https://fonts.google.com/)
- [Color Palette Generator](https://coolors.co/)

### TypeScript Types

- Full type definitions: `src/features/bubble/types.ts`
- Component props: Check individual component files in `src/components/`

---

## 📝 Summary

You now have a fully customized FlowiseChatEmbed with:

✅ **Purple/pink brand colors** throughout
✅ **Poppins font** as default
✅ **Larger border radius (12px)** for modern look
✅ **Custom Tailwind theme** with brand colors
✅ **Example HTML file** ready to test
✅ **Two customization methods** (quick config vs. deep code-level)

**Next steps:**

1. Replace `YOUR_FLOWISE_CHATFLOW_URL` in `examples/custom-design.html`
2. Open the file in your browser
3. Test the chat functionality
4. Further customize using the configuration object
5. Deploy to GitHub Pages or your server

**Questions?** Check the [Flowise community](https://github.com/FlowiseAI/Flowise/discussions) or open an issue in your fork.

---

**Made with ❤️ for FlowiseChatEmbed**
