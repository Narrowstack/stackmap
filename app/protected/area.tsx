"use client"

import CreateButton from "@/components/create-button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Capability from "./capability";

type Props = {
    id: string;
    name: string;
}

export default function Area({ id, name }: Props) {
    useEffect(() => {
        fetchCapabilities();
    }, []);
    
    const [capabilities, setCapabilities] = useState([]);

    async function createCapability(e: React.FormEvent){
        e.preventDefault();
        const supabase = await createClient();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const { data, error } = await supabase.from('capabilities').insert([{ name: name, area_id: id }]).select();
        fetchCapabilities();
    }

    async function fetchCapabilities() {
        const supabase = await createClient();
        const { data, error } = await supabase.from('capabilities').select().eq('area_id', id);
        setCapabilities(data as any); 
    }
    
    return (
        <div className="w-[400px] bg-[#151B3B] rounded-xl px-3 py-5 mx-1 shrink-0">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="flex flex-row justify-between mb-4">
                        <h2 className="font-bold text-lg">{name}</h2>
                        <CreateButton handleSubmit={createCapability} />
                    </div>
                    <div>
                        {capabilities?.map((capability) => (
                            //@ts-ignore
                            <Capability key={capability.id} id={capability.id} name={capability.name} />
                        ))}
                    </div>
                </div>
                <div className="bg-black/25 rounded-sm p-2">
                    <h2>Technologies</h2>
                    
                </div>
            </div>
        </div>
    );
}