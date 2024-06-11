"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { signal } from "@preact/signals-react";
import { useSignalEffect, useSignals } from "@preact/signals-react/runtime";
import { createClient } from "@/utils/supabase/client";
import { Check, Plus, X } from "lucide-react";
import CreateButton from "@/components/create-button";

export const stackmapId = signal('');

export function StackmapSelect() {
    useSignals();
    const supabase = createClient();

    const [isCreating, setIsCreating] = useState(false);
    const [stackmaps, setStackmaps] = useState([]);

    useEffect(() => {
        (async () => {
            await fetchStackmaps();
            const localStackmapId = localStorage.getItem('stackmapId') as string;
            if(localStackmapId) stackmapId.value = localStackmapId;
        })();
    }, []);

    useSignalEffect(() => { 
        if(stackmapId.value !== '') localStorage.setItem('stackmapId', stackmapId.value as string); 
    });

    async function createStackmap(e: React.FormEvent){
        e.preventDefault();
        setIsCreating(false);
        const { data: { user } } = await supabase.auth.getUser();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const { data, error } = await supabase.from('stackmaps').insert([{ name: name, user: user?.id }]).select();
        await fetchStackmaps();
        //@ts-ignore
        stackmapId.value = data[0].id;
    }
    
    async function fetchStackmaps() {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase.from('stackmaps').select().eq('user', user?.id);
        setStackmaps(data as any);
    }
    
    return (
        <div className="text-left">
            <Select onValueChange={(value) => stackmapId.value = value} defaultValue={stackmapId.value}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {stackmaps.map((item) => (
                            // @ts-ignore
                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <CreateButton handleSubmit={createStackmap} />
        </div>
    );
}