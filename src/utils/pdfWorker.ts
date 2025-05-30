// src/utils/pdfWorker.ts
import { pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'; // existe na 4.8.69

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
