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

export default function Stackmaps() {

    const [isCreating, setIsCreating] = useState(false);
    const [stackmaps, setStackmaps] = useState([]);
    const [stackmap, setStackmap] = useState('');

    useEffect(() => { fetch(); }, []);

    async function create(e: React.FormEvent){
        e.preventDefault();
        setIsCreating(false);

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const { data, error } = await supabase().from('stackmaps').insert([{ name: name }]).select();
        await fetch();
        setStackmap(name);
    }
    
    async function fetch(){
        console.log('fetch');
        const { data, error } = await supabase().from('stackmaps').select();
        setStackmaps(data as any);
    }
    
    return (
        <Select onValueChange={value => setStackmap(value)} value={stackmap} defaultValue={stackmap}>
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {stackmaps.map((stackmap) => (
                        // @ts-ignore
                        <SelectItem key={stackmap.id} value={stackmap.name}>{stackmap.name}</SelectItem>
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