import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Columns4, LayoutDashboard } from "lucide-react";
  import NarrowstackLogo from "@/components/NarrowstackLogo";
  import AuthButton from "@/components/AuthButton";
  import { Button } from "@/components/ui/button";


export default function Navigation(){

    return (
        <div className="w-[232px] bg-[#111727] rounded-xl p-5 mx-1 shrink-0 flex flex-col justify-between">
            <div>
                <NarrowstackLogo />
                <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
                <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard size={24} className="mr-2 h-4 w-4" /> Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                <Columns4 size={24} className="mr-2 h-4 w-4" /> Stackmap
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard size={24} className="mr-2 h-4 w-4" /> Capabilities
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                <Columns4 size={24} className="mr-2 h-4 w-4" /> Technologies
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard size={24} className="mr-2 h-4 w-4" /> Roadmap
                </Button>
            </div>

            <div>
                <AuthButton />
            </div>
        </div>
    );
}