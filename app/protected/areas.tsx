"use client"

import { stackmap } from "./stackmaps";
import { useSignals } from "@preact/signals-react/runtime";

export default function Areas() {
    useSignals();

    return (
        <div>
            <h1>Areas</h1>
            <p>Selected Stackmap: {stackmap.value}</p>
        </div>
    );
}