# Report: Adding robots.txt to an Angular SSR Application

## 1. Introduction

A `robots.txt` file is a standard used by websites to communicate with web crawlers and other web robots. It tells these bots which areas of your site should _not_ be processed or scanned. While not a security mechanism, it's crucial for SEO and managing crawl budget, especially for complex applications like those built with Angular SSR.

In an Angular SSR setup, the server renders the application pages, and static assets like `robots.txt` need to be served correctly from the application's root URL (e.g., `https://yourdomain.com/robots.txt`).

## 2. Recommended Method: Using `angular.json` Assets

This is the standard and most reliable method for Angular CLI projects, including those with SSR.

**Steps:**

1.  **Create/Place the `robots.txt` file:**

    - Create a file named `robots.txt`.
    - Place this file typically in the `src/` directory of your Angular project. (Placing it in `src/assets/` is also possible, but `src/` is common for root-level files like `favicon.ico` or `robots.txt`).
    - **Example `robots.txt` content:**

      ```txt
      # Allow all crawlers full access
      User-agent: *
      Allow: /

      # Disallow crawling of specific paths (example)
      # User-agent: *
      # Disallow: /admin/
      # Disallow: /private/

      # Specify sitemap location (optional but recommended)
      Sitemap: https://yourdomain.com/sitemap.xml
      ```

      _Modify the rules according to your site's needs._

2.  **Configure `angular.json`:**

    - Open your `angular.json` file.
    - Locate the build configuration for your application, usually under `projects.<your-project-name>.architect.build.options.assets`.
    - Ensure that your `robots.txt` file is listed in the `assets` array. If you placed it in `src/`, the entry should specify the input and output locations correctly to place it at the root of the build output.
    - **Example `angular.json` snippet:**
      ```json
      {
        // ... other configurations
        "projects": {
          "<your-project-name>": {
            // ... other configurations
            "architect": {
              "build": {
                // ... other configurations
                "options": {
                  "outputPath": "dist/<your-project-name>/browser", // Note the browser output path
                  "index": "src/index.html",
                  "main": "src/main.ts",
                  "polyfills": "zone.js",
                  "tsConfig": "tsconfig.app.json",
                  "assets": [
                    "src/favicon.ico",
                    "src/assets",
                    { // Add this object for robots.txt if it's in src/
                      "glob": "robots.txt",
                      "input": "src/",
                      "output": "/" // Copies to the root of outputPath
                    }
                  ],
                  // ... other options
                },
                // ... configurations for development, production etc.
              },
              "serve": { // ... },
              "extract-i18n": { // ... },
              "test": { // ... },
              "server": { // Configuration for the SSR server build
                "options": {
                  "outputPath": "dist/<your-project-name>/server", // Note the server output path
                  "main": "server.ts",
                  "tsConfig": "tsconfig.server.json"
                  // ... other options
                },
                // ... configurations
              },
              "serve-ssr": { // Configuration for running the SSR server locally
                "options": {
                  "browserTarget": "<your-project-name>:build:production",
                  "serverTarget": "<your-project-name>:server:production"
                },
                // ... configurations
              },
              "prerender": { // ... }
            }
          }
        }
      }
      ```
      _Ensure `<your-project-name>` matches your actual project name._
      _This configuration tells the build process to copy `src/robots.txt` to the root of the `dist/<your-project-name>/browser` directory._

3.  **Configure the SSR Server (`server.ts`):**

    - Your SSR server (commonly an Express server defined in `server.ts`) needs to serve static files from the browser build output directory.
    - Ensure your `server.ts` includes middleware to serve static files from the correct path.
    - **Example `server.ts` snippet (using Express):**

      ```typescript
      import express from "express";
      import { join } from "path";
      // ... other imports

      // The Express app is exported so that it can be used by serverless Functions.
      export function app(): express.Express {
        const server = express();
        // Adjust the distFolder path according to your angular.json outputPath
        const distFolder = join(process.cwd(), "dist/<your-project-name>/browser");
        const indexHtml = join(distFolder, "index.server.html");

        // ... other server configurations (view engine, etc.)

        // Serve static files from /browser
        // IMPORTANT: This line serves files like robots.txt, favicon.ico, assets/*
        server.get(
          "*.*",
          express.static(distFolder, {
            maxAge: "1y",
          })
        );

        // All regular routes use the Angular engine
        server.get("*", (req, res) => {
          res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
        });

        return server;
      }

      // ... function to run the server (run function, main function, etc.)
      ```

      _Make sure the path passed to `express.static` correctly points to your **browser** build output directory._

## 3. Alternative Method: Using a `public` Folder (Less Common for Standard Angular SSR)

Some deployment platforms (like Netlify or Vercel) or server setups might be configured to automatically serve files from a specific directory (often named `public`) at the root.

- **If using Netlify:** Placing `robots.txt` in a `public` directory _might_ work if your `netlify.toml` specifies `publish = "public"`. However, for Angular SSR, the `publish` directory is typically the one containing the server function and the browser assets (`dist/<project-name>`), so relying on the `angular.json` assets method is generally more robust and integrated with the Angular build process.
- **If using a custom server:** You would need to explicitly configure your server (e.g., `server.ts`) to serve static files from this `public` directory _in addition_ to the standard `dist/.../browser` directory if you choose this approach.

This method is generally less recommended for standard Angular SSR setups compared to integrating with the `angular.json` assets pipeline.

## 4. Verification

1.  **Build your application:** Run `npm run build` (or your specific build command that includes SSR).
2.  **Check the build output:** Verify that `robots.txt` exists in the root of your browser output directory (e.g., `dist/<your-project-name>/browser/robots.txt`).
3.  **Run your SSR server:** Start your server locally (e.g., `npm run dev:ssr` or `npm run serve:ssr`).
4.  **Access in browser:** Open your browser and navigate to `http://localhost:4000/robots.txt` (or your application's URL and port). You should see the content of your `robots.txt` file.
5.  **Deploy:** After deploying, check `https://yourdomain.com/robots.txt`.

## 5. Conclusion

The recommended approach for adding `robots.txt` to an Angular SSR application is to place the file in `src/` and configure `angular.json` to copy it to the root of the browser build output directory. Ensure your `server.ts` is correctly configured with `express.static` (or equivalent) to serve files from that directory. This ensures the file is handled consistently by the Angular build process and served correctly by the SSR server.
