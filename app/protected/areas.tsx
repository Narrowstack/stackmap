"use client"

import { stackmap } from "./stackmap-select";
import { useSignals } from "@preact/signals-react/runtime";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { effect } from "@preact/signals-react";

export default function Areas() {
    useSignals();
    const supabase = createClient();

    const [areas, setAreas] = useState([]);

    async function fetch(){
        const { data, error } = await supabase.from('areas').select().eq('stackmap_id', stackmap.value);
        console.log('fetch', data);
        setAreas(data as any);
    }

    return (
        <div className="flex overflow-x-auto">
            {stackmap.value}
            <div className="w-[400px] bg-[#151B3B] rounded-xl p-5 mx-1 shrink-0">
                <h2>Sales</h2>
            </div>
            <div className="w-[400px] bg-[#2C193A] rounded-xl p-5 mx-1 shrink-0">
                <h2>Marketing</h2>
            </div>
            <div className="w-[400px] bg-[#152C3B] rounded-xl p-5 mx-1 shrink-0">
                <h2>Operations</h2>
            </div>
            <div className="flex justify-center items-center w-[144px] bg-[#1C2337] rounded-xl p-5 mx-1 shrink-0">
                <Button>+</Button>
            </div>
        </div>
    );
}