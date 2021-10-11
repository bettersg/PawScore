# Pawscore Frontend

## Before you start

-   (to help with cleaner code)
    -   install Prettier extension on VSC
        -   choose Prettier as your default formatter
        -   enable format on save
    -   install Eslint extension on VSC
-   Useful resources
    -   NextJs basic features (<https://nextjs.org/docs/basic-features/pages>)
    -   axios for data fetching (<https://github.com/axios/axios#axios-api>)
    -   styled-components (<https://styled-components.com/docs/basics#getting-started>)

## Quickstart Guide

### Start up server

    npm run dev

The app can be viewed at <http://localhost:3000>

## Conventions

### **Build and Deployment**

The intention is to build and export the frontend application using [static HTML export](https://nextjs.org/docs/advanced-features/static-html-export).

Make sure that the following commands run without errors.

```
npx next build
npx next export
```

**Note**: Please do not use `next/image` as the [server side automatic image optimisation](https://nextjs.org/docs/basic-features/image-optimization) will prevent the ability for a static HTML export. Use `<img>` instead.

### **Page URLS**

Next js does auto routing with folders in the `pages` folder.

So `frontend/pages/this-page` will link to `baseurl/this-page`.

Nested folders like `frontend/pages/this-page/that-page` will link to `baseurl/this-page/that-page`.

**Implemented Pages**

-   /shelter/home
-   /shelter/login

### **Absolute imports**

You can import anything with a direct path from the `frontend` folder.

if you are importing `WithNavBar` (in `frontend/layouts/WithNavBar`) from `test` page (in `frontend/pages/test/index`),

#### Old

    import WithNavBar from '../../layouts/WithNavBar'

#### New

    import WithNavBar from 'layouts/WithNavBar'

### **Page components**

Components or sub-components that pages may require should go in to the `frontend/components` folder. Name them after the page.

ie: `frontend/components/this-page`

### **Common components**

Common components like buttons or pills should go in to the `frontend/components/common`.

ie: `frontend/components/common/Button`

### **Layouts**

Layouts are common page layouts. Please put these in the `frontend/layouts` folder.

### **Styling**

Place your stylesheet `module.css` file together with your component file. Name it after the component.

`styled-components` is also installed and should be used for design system components.

Overall styles (like font family and color) should go into `main.css`.
