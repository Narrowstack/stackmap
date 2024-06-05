import { Columns4, LayoutDashboard } from "lucide-react";
import NarrowstackLogo from "@/components/narrowstack-logo";
import AuthButton from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import { StackmapSelect } from "./stackmap-select";

export default function Navigation(){

    return (
        <div className="w-[232px] bg-[#111727] rounded-xl p-5 mx-1 shrink-0 flex flex-col justify-between">
            <div>
                <NarrowstackLogo />
                <StackmapSelect />
                
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