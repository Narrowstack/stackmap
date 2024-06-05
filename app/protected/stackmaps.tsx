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
import supabase from "@/lib/supabase";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

export const stackmap = signal('');

export function StackmapSelect() {
    useSignals();
    const [isCreating, setIsCreating] = useState(false);
    const [stackmaps, setStackmaps] = useState([]);

    useEffect(() => { fetch(); }, []);

    async function create(e: React.FormEvent){
        e.preventDefault();
        setIsCreating(false);

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const { data, error } = await supabase().from('stackmaps').insert([{ name: name }]).select();
        await fetch();
        stackmap.value = name;
    }
    
    async function fetch(){
        const { data, error } = await supabase().from('stackmaps').select();
        console.log('fetch', data);
        setStackmaps(data as any);
    }
    
    return (
        <Select onValueChange={(value) => { stackmap.value = value; }} value={stackmap.value} defaultValue={stackmap.value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {stackmaps.map((item) => (
                        // @ts-ignore
                        <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
            {isCreating ? (
                <form onSubmit={create}>
                    <Input type="text" name="name" />
                    <Button asChild><button type="submit">Create</button></Button>
                    <Button onClick={() => setIsCreating(false)}>x</Button>
                </form>
            ):(
                <Button onClick={() => setIsCreating(true)}>+</Button>
            )}
            
        </Select>
    );
}