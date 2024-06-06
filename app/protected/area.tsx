"use client"

interface Props {
    name: string;
}

export default function Area({ name }: Props) {
    return (
        <div className="w-[400px] bg-[#151B3B] rounded-xl p-5 mx-1 shrink-0">
            <h2>{name}</h2>
        </div>
    );
}