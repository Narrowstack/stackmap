type Props = {
    id: string;
    name: string;
}

export default function Technology({ id, name }: Props){
    return (
        <div className="bg-white/10 rounded-sm p-4 mb-2">
            <h1>{name}</h1>
        </div>
    )
}