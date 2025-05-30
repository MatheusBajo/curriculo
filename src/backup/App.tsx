import { useRef } from "react";
import Aside from "./pages/Aside";
import Main from "./pages/Main";
import { PAGE_W, PAGE_H } from "./utils/pageConstants";

export default function App() {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
                preserveAspectRatio="xMidYMid meet"
                className="shadow-lg bg-red-600"
            >
                <foreignObject x="0" y="0" width={PAGE_W} height={PAGE_H}>
                    <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        className="page flex bg-white"
                    >
                        <Aside />
                        <Main />
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
}
