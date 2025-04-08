import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import * as http from 'node:http'; //review

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  server.use(express.json());

  server.post('/hooks/demo-submit-form', async (req, res) => {
    const formData = req.body;
    console.log('Demo form submission received:', formData);
    // In a real application, you would process the form data here.
    // For this demo, we'll just send a success response.
    res.status(200).send({ message: 'Form submission received successfully.' });
  });

  server.post('/hooks/n8n-lead', async (req, res) => {
    const N8N_TEST_WEBHOOK_URL =
      'http://localhost:5678/webhook-test/5188a0e5-dbc5-4abb-9c8e-5893b7ad8c68';
    const N8N_PRODUCTION_WEBHOOK_URL = 
      ' http://localhost:5678/webhook/5188a0e5-dbc5-4abb-9c8e-5893b7ad8c68';
    try {
      const formData = req.body;
      console.log('Received form data:', formData);

      const webhookResponse = await fetch(N8N_TEST_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (webhookResponse.ok) {
        console.log('Webhook called successfully');
        res.status(200).send('OK');
      } else {
        console.error(
          'Webhook call failed:',
          webhookResponse.status,
          webhookResponse.statusText
        );
        res.status(500).send('Webhook call failed');
      }
    } catch (error) {
      console.error('Error processing form submission:', error);
      res.status(500).send('Error processing form submission');
    }
  });

  server.get('/sitemap.xml', (req, res) => {
    res.sendFile(join(browserDistFolder, 'assets', 'sitemap.xml'));
  });

  server.get('/robots.txt', (req, res) => {
    res.sendFile(join(browserDistFolder, 'assets', 'robots.txt'));
  });

  // Serve static files from /browser (excluding files handled above)
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
