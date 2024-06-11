type Props = {
    id: string;
    name: string;
}

export default function Technology({ name }: Props){
    return (
        <div className="bg-black/25 rounded-sm p-2">
            <h1>{name}</h1>
        </div>
    )
}