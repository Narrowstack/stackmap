import { Checkbox } from "@/components/ui/checkbox";

type Props = {
    id: string;
    name: string;
}

export default function Activity({ id, name }: Props){
    return (
        <div className="bg-white/10 rounded-sm p-4 mb-2">
            <div className="flex items-center space-x-2">
                <Checkbox id={`activity-${id}`} />
                <label
                    htmlFor={`activity-${id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {name}
                </label>
            </div>
        </div>
    )
}