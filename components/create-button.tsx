import React, { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, Plus } from 'lucide-react';

type Props = {
    handleSubmit: (e: FormEvent<Element>) => Promise<void>
}

export default function CreateButton({ handleSubmit }: Props){

    const [isCreating, setIsCreating] = useState(false);

    return (
        <>
            {isCreating ? (
                <form onSubmit={(e) => {
                    handleSubmit(e);
                    setIsCreating(false);
                }}>
                    <div className="flex shrink-0">
                        <Input type="text" name="name" className='mr-1' />
                        <Button variant="secondary" size="icon" className="w-8 h-8 mr-1 mt-1" onClick={() => setIsCreating(false)}><X className="h-4 w-4" /></Button>
                        <Button variant="secondary" size="icon" className='w-8 h-8 mt-1' asChild><button type="submit"><Check className="h-4 w-4" /></button></Button>
                    </div>
                </form>
            ):(
                <Button variant="secondary" size="icon" className='w-8 h-8' onClick={() => setIsCreating(true)}><Plus className="h-4 w-4" /></Button>
            )}
        </>
    )
}