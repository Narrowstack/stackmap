"use client"

import { createContext, useContext, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const AuthContext = createContext({} as any);

export async function AuthWrapper({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}