# Shop HTML

## CSS Architecture

### Colors & Fonts

- Primary: CTA, Links, Button
- Body: text

```js
  theme: {
    extend: {
      colors: {
        primary: "#31c290",
      },
      fontFamily: {
        body: ["arial"],
        heading: ["'Merriweather', serif"],
      },
      textColor: {
        primary: "#31c290",
      },
      backgroundColor: {
        primary: "#31c290",
      },
    },
  },
```

## Architecture

```code
src
  index.html
  *.html
  partials
    header.html
    footer.html
    *.html
  styles
    main.scss
    *.scss
  js
    main.js
    *.js
  assets
    fonts
    images
docs
  assets
    images
    fonts
  main.js
  *.js

  main.css
  *.css
  blog.css
  index.html
  *.html
```

## Configuration steps

```bash
yarn install
```

```html
<%= require('html-loader!./partials/header.html').default %>
```

## Google Fonts

```css
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap");
```

## Google Material Icons

- https://developers.google.com/fonts/docs/material_icons

```css
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
```

```html
<span class="material-icons">face</span>
```

- [Playground](https://mui.com/components/material-icons/)

## References

- [Materialize](https://materializecss.com/color.html)
- [Assets Management](https://webpack.js.org/guides/asset-management/#loading-fonts)
