import * as fs from 'fs-extra';
import path from 'path';

type ReportStep = {
  step: string;
  status: 'PASSED' | 'FAILED';
  message: string;
  timestamp: string;
};

const reportFile = path.join(__dirname, '../artifacts/e2e-report.html');
const steps: ReportStep[] = [];

export function logStep(step: string, status: 'PASSED' | 'FAILED', message: string) {
  steps.push({
    step,
    status,
    message,
    timestamp: new Date().toLocaleString()
  });
}

export function logFailure(step: string, message: string) {
  logStep(step, 'FAILED', message);
}

export function logPass(step: string, message: string) {
  logStep(step, 'PASSED', message);
}

export async function generateReport() {
  await fs.ensureDir(path.dirname(reportFile));

  const html = `
  <html>
    <head>
      <title>E2E Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f9f9f9; color: #333; padding: 20px; }
        h1 { color: #1976d2; }
        .step { padding: 10px; margin: 10px 0; border-left: 4px solid; background: #fff; cursor: pointer; }
        .PASSED { border-color: #388e3c; }
        .FAILED { border-color: #d32f2f; background: #fff3f3; }
        .timestamp { font-size: 0.85em; color: #666; }
        .status { font-weight: bold; }
        .details { display: none; margin-top: 5px; padding: 5px; background: #f1f1f1; font-family: monospace; white-space: pre-wrap; }
      </style>
      <script>
        function toggleDetails(id) {
          const el = document.getElementById(id);
          if(el.style.display === 'none') el.style.display = 'block';
          else el.style.display = 'none';
        }
      </script>
    </head>
    <body>
      <h1>End-to-End Purchase Flow Report</h1>
      ${steps.length === 0 ? '<p>No steps executed.</p>' : ''}
      ${steps.map((s, index) => `
        <div class="step ${s.status}" onclick="toggleDetails('details-${index}')">
          <strong>Step:</strong> ${s.step} &nbsp;|&nbsp;
          <strong>Status:</strong> <span class="status">${s.status}</span> &nbsp;|&nbsp;
          <span class="timestamp">${s.timestamp}</span>
          <div id="details-${index}" class="details">
            <strong>Message:</strong> ${s.message}
          </div>
        </div>
      `).join('')}
    </body>
  </html>
  `;

  await fs.writeFile(reportFile, html);
  console.log(`E2E report generated: ${reportFile}`);
}
