# Happy 23rd Birthday Manya! 🎉

A beautiful, personalized birthday website created with love.

## Features ✨

- **Personalized for Manya**: Custom message with her name and age (23)
- **Photo Gallery**: Add your favorite photos together
- **Video Section**: Share beautiful video memories
- **Music Player**: Background music toggle (add your song!)
- **Interactive Animations**: Confetti, floating hearts, and twinkling stars
- **Memory Cards**: Detailed personal memories and moments
- **Countdown Timer**: Shows time until next birthday
- **Smooth Transitions**: Beautiful scrolling animations
- **Fully Responsive**: Looks perfect on all devices

## How to Add Your Content 📸

It's okay if you don't have the files right now! The website will still work without them. When you're ready, here is the list of files the website looks for.

### 1. Photos (`images/` folder)

Place your photos in the `images/` folder. The website uses them in two places:

**For the Surprise Boxes & Memory Flashcards:**
*   `our-first-date.jpg`
*   `adventure-together.jpg`
*   `laughing-together.jpg`
*   `special-moments.jpg`

**For the Photo Collage:**
*   `collage-1.jpeg`
*   `collage-2.jpeg`
*   `collage-3.jpeg`
*   `collage-4.jpeg`
*   `collage-5.jpeg`
*   `collage-6.jpeg`
*   `collage-7.jpeg`
*   `collage-8.jpeg`
*   `collage-9.jpeg`
*   `collage-10.jpeg`

### 2. Videos (`videos/` folder)

Place your video files in the `videos/` folder and name them sequentially. The slideshow will play them in this order:
*   `1.mp4`
*   `2.mp4`
*   `3.mp4`

### 3. Music (`music/` folder)

The website looks for two songs in the `music/` folder:
*   `our-song.mp3` (for the main background music)
*   `photograph.mp3` (for the final message section)

## File Structure

```
birthday-website/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── images/             # Add your photos here
│   ├── our-first-date.jpg
│   └── collage-1.jpeg
├── videos/             # Add your videos here
│   └── 1.mp4
└── music/              # Add your music here
    ├── our-song.mp3
    └── photograph.mp3
```

## Running the Website 🚀

Simply **double-click** `index.html` to open it in your browser!

## How to Test Your Website Locally (The Right Way)

Double-clicking `index.html` can sometimes cause issues with loading media files due to browser security. To test your website exactly how it will appear online, you should run a local web server.

**Here's the easiest way using Python (which is often pre-installed on computers):**

1.  **Open a Terminal or Command Prompt.**
    *   On Windows, search for `cmd` or `PowerShell`.
    *   On Mac, search for `Terminal`.

2.  **Navigate to your project folder.** Use the `cd` (change directory) command.

    ```bash
    # Example path, change it to where your folder is located
    cd c:\Users\Pranzan\Downloads\birthday-website\birthday-website
    ```

3.  **Start the local server.** Run the following command:

    ```bash
    python -m http.server
    ```

4.  **View your website.** Open your web browser and go to this address: **`http://localhost:8000`**.

Your website will now be running on your computer just like it would on Vercel or GitHub Pages! This is the most reliable way to check if everything is working correctly before you deploy.

## How to Deploy Your Website Online 🌐

This guide will walk you through hosting your website for free using GitHub and Vercel. This is the best way to share it with Manya and others!

### Part 1: Upload Your Project to GitHub

First, you'll store your website's code on GitHub. You can choose to make the repository **Public** (anyone can see the code) or **Private** (only you can see the code). For this project, **Private** is recommended.

1.  **Create a GitHub Account & Repository**: Go to [github.com](https://github.com), create an account, and then create a **New repository**. Name it whatever you like (e.g., `birthday-for-manya`) and select **Private**.
2.  **Upload Your Files**: Follow the step-by-step guide to upload your project folder from your computer to your new private GitHub repository.

### Deploying with Vercel (Recommended)

Vercel is a great platform for deploying static websites.

**Step 1: Make Sure All Files Are in Your Git Repository**

Vercel deploys from a Git repository (like GitHub). Your `images`, `videos`, and `music` folders **must** be in the repository.

1.  **Check for a `.gitignore` file**: If you have a `.gitignore` file, make sure it does **not** list your media folders or file types (like `*.mp4` or `*.jpg`).
2.  **Add and Commit Your Files**: Open a terminal in your project folder and run these commands to upload everything to GitHub:
    *(See the detailed step-by-step guide below for more help)*
    ```bash
    # Add all new and changed files
    git add .
    
    # Commit the changes with a message
    git commit -m "Add all media files for deployment"
    
    # Push the files to your GitHub repository
    git push origin main
    ```

**Step 2: Check for Case-Sensitivity**

Vercel's servers are case-sensitive, but your computer might not be. Double-check that your file names in the code are an **exact match** to your actual file names.

*   If the code says `our-first-date.jpg`, the file cannot be named `Our-First-Date.jpg`.

**Step 3: Deploy on Vercel**
### Part 2: Deploy Your Private Site with Vercel
1.  Sign up for a free account at vercel.com using your GitHub account.
2.  Click **"Add New... > Project"**.
3.  Import your **private** GitHub repository (Vercel will ask for permission to see it).
4.  Vercel will automatically detect the correct settings. You don't need to change anything.
5.  Click **"Deploy"**.

Your website will be live in a few moments! If you make changes later, just push them to GitHub, and Vercel will automatically redeploy the new version.

## Customization Instructions 🎨

### Change the Message
1. Open `index.html`
2. Find the "message-section" (around line 73)
3. Edit the text to personalize it further

### Update Surprise Box & Flashcard Memories
1. Open `script.js`
2. Find the `surpriseBoxData` object (around line 1200).
3. Update the `text` and `flashcards` content for each memory.

### Change Birthday Date
1. Open `script.js`
2. Find the `updateCountdown()` function
3. Update the date to Manya's actual birthday date

### Adjust Colors
1. Open `styles.css`
2. Modify the CSS variables in `:root` section
3. Change gradients to your preferred colors

## Tips 💡

- **Website Not Updating?** After deploying, you may need to do a "hard refresh" in your browser to see the changes. Press **Ctrl+Shift+R** (on Windows/Linux) or **Cmd+Shift+R** (on Mac).
- Use JPG or PNG for photos
- Use MP4 for videos (H.264 encoding is best for browsers)
- Use MP3 for audio files
- Keep file sizes reasonable for faster loading
- The website works without photos/videos (they just won't show)

## Browser Support 🌐

Works perfectly on:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Special Features

- **Click "Celebrate!"** button for confetti explosion
- **Scroll down** to see all sections with beautiful transitions
- **Music toggle** in top-right corner
- **Hover effects** on all interactive elements
- **Smooth animations** throughout the page

---

Made with ❤️ for Manya's 23rd Birthday!
