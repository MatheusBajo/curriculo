import { Document, Page } from 'react-pdf';
import { PAGE_W, PAGE_H } from './utils/pageConstants';

type Props = { file: string; page?: number };

export default function FittedPdf({ file, page = 1 }: Props) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
        >
            <foreignObject x="0" y="0" width={PAGE_W} height={PAGE_H}>
                <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className="w-full h-full flex items-center justify-center"
                >
                    <Document file={file} loading="Carregando…">
                        <Page
                            pageNumber={page}
                            width={PAGE_W}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
            </foreignObject>
        </svg>
    );
}
