"use client"

import CreateButton from "@/components/create-button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Capability from "./capability";
import { Combobox } from "@/components/ui/combobox";
import Technology from "./technology";

type Props = {
    id: string;
    name: string;
}

export default function Area({ id, name }: Props) {
    useEffect(() => {
        fetchCapabilities();
        fetchTechnologyMaps();
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

    const [technologies, setTechnologies] = useState([]);
    const [unusedTechnologies, setUnusedTechnologies] = useState([]);
    const [technologyMaps, setTechnologyMaps] = useState([]);

    useEffect(() => {
        //@ts-ignore
        const unused = technologies.filter((technology) => {
            //@ts-ignore
            const existing = technologyMaps.find((technologyMap) => technologyMap.technology_id === technology.id);            
            return existing ? false : true;
        });

        setUnusedTechnologies(unused as any); 
    }, [technologyMaps]);

    async function createTechnology(e: React.FormEvent){
        e.preventDefault();
        const supabase = await createClient();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const { data, error } = await supabase.from('technologies').insert([{ name: name }]).select();
        
        if(error){ console.error(error); }
        else if(data?.length){ 
            await addTechnologyMap(data[0].id as string);
        }
    }

    async function addTechnologyMap(technologyId: string){
        const supabase = await createClient();
        //@ts-ignore
        const existing = technologyMaps.find((technologyMap) => technologyMap.technology_id === technologyId);
        if(existing) return;

        const { data, error } = await supabase.from('technology_maps').insert([{ technology_id: technologyId, area_id: id }]).select();
        fetchTechnologyMaps();
    }

    async function fetchTechnologyMaps() {
        const supabase = await createClient();
        const { data, error } = await supabase.from('technology_maps').select().eq('area_id', id);
        setTechnologyMaps(data as any);
    }

    async function fetchTechnologies() {
        const supabase = await createClient();
        const { data, error } = await supabase.from('technologies').select();
        setTechnologies(data as any);
    }


    
    
    return (
        <div className="w-[400px] bg-[#151B3B] rounded-xl px-3 py-5 mx-1 shrink-0 overflow-y-auto">
            <div className="flex flex-col justify-between">
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
                    <h2 className="mb-4">Technologies</h2>
                    <div className="mb-4">
                        <Combobox placeholder="Choose Technology..."
                                //@ts-ignore
                                items={(unusedTechnologies).map((technology) => ({ label: technology.name, value: technology.id as string }))}
                                handleSelect={addTechnologyMap}
                        />
                        <CreateButton handleSubmit={createTechnology} />
                    </div>

                    {[...technologyMaps].reverse().map((technologyMap) => (
                        //@ts-ignore}
                        <Technology key={technologyMap.id} id={technologyMap.id} name={technologies.find((technology) => technology.id === technologyMap.technology_id)?.name} />
                    ))}
                </div>
            </div>
        </div>
    );
}