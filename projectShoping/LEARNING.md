# Implementing Dark Mode in Tailwind CSS v4

This guide explains how dark mode is set up in this project using React and Tailwind CSS v4.

## 1. Tailwind Configuration (`index.css`)
In Tailwind CSS v4, dark mode relies on a `@custom-variant`. To toggle dark mode based on a `.dark` class, we add this to `src/index.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

This tells Tailwind to activate the `dark:` variant classes whenever an element is inside a container with the `.dark` class.

## 2. Global State Toggle (`Navbar.jsx`)
We use React state to track whether dark mode is active and a `useEffect` to toggle the class on the `<html>` document root:

```jsx
import { useState, useEffect } from "react";

function Navbar() {
    const [isDark, setIsDark] = useState(false);

    // Apply dark mode to the whole page
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    return (
        <button onClick={() => setIsDark(!isDark)}>
            {isDark ? "☀️" : "🌙"}
        </button>
    );
}
```

## 3. Styling Components
Now you can use `dark:` prefixed utility classes anywhere in your components.

### Example: Backgrounds and Text
In `App.jsx`, we set the root background and text color:
```jsx
<div className="dark:bg-slate-900 dark:text-white">
```

In `Home.jsx` and `ProductCard.jsx`, we update borders, backgrounds, and text for a seamless dark theme:
```jsx
<aside className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
    <h2 className="text-gray-800 dark:text-slate-100">Filters</h2>
</aside>
```

By explicitly declaring `dark:bg-*` and `dark:text-*`, you gain full control over the aesthetic of your site in dark mode.
