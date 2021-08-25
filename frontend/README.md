# Pawscore Frontend

## Before you start

-   (to help with cleaner code)
    -   install Prettier extension on VSC
    -   install Eslint extension on VSC
-   Useful resources
    -   NextJs basic features (<https://nextjs.org/docs/basic-features/pages>)
    -   axios for data fetching (<https://github.com/axios/axios#axios-api>)
    -   styled-components (<https://styled-components.com/docs/basics#getting-started>)

## Quickstart Guide

### Start up server

    npm run dev

The app can be viewed at <http://localhost:3000>

### Templates

A quick template page has been created at `/test`

See how dynamic routing works to get pokemon data at `/test/[id]` where `[id]` is any number

## Conventions

### **Page URLS**

Next js does auto routing with folders in the `pages` folder.

So `frontend/pages/this-page` will link to `baseurl/this-page`.

Nested folders like `frontend/pages/this-page/that-page` will link to `baseurl/this-page/that-page`.

### **Absolute imports**

You can import anything with a direct path from the `frontend` folder.

if you are importing `WithNavBar` (in `frontend/layouts/WithNavBar`) from `test` page (in `frontend/pages/test/index`),

#### Old

    import WithNavBar from '../../layouts/WithNavBar'

#### New

    import WithNavBar from 'layouts/WithNavBar'

### **Page components**

Components or sub-components that pages may require should go in to the `frontend/components` folder. Name them after the page.

### **Layouts**

Layouts are common page layouts. Please put these in the `frontend/layouts` folder.

### **Styling**

Place your stylesheet `module.css` file together with your component file. Name it after the component.

`styled-components` is also installed and should be used for design system components.

Overall styles (like font family and color) should go into `main.css`.
