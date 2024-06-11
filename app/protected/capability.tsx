"use client"

import CreateButton from "@/components/create-button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Activity from "./activity";

type Props = {
    id: string;
    name: string;
}

export default function Capability({ id, name }: Props) {
    useEffect(() => {
        fetchActivities();
    }, []);
    
    const [activities, setActivities] = useState([]);

    async function createActivity(e: React.FormEvent){
        e.preventDefault();
        const supabase = await createClient();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const { data, error } = await supabase.from('activities').insert([{ name: name, capability_id: id }]).select();
        fetchActivities();
    }

    async function fetchActivities() {
        const supabase = await createClient();
        const { data, error } = await supabase.from('activities').select().eq('capability_id', id);
        setActivities(data as any); 
    }
    
    return (
        <div className="bg-black/25 rounded-xl p-3 mb-2">
            <h3 className="mb-6">{name}</h3>
            
            {activities?.map((activity) => (
                //@ts-ignore
                <Activity key={activity.id} id={activity.id} name={activity.name} />
            ))}

            <CreateButton handleSubmit={createActivity} />
        </div>
    );
}