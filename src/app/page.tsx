import FlipCoin from "@/components/FlipCoin";
import React from "react";

export default function Home() {

    return (
        <main>
            <div className="mt-10 flex min-h-screen flex-col items-center justify-between md:p-12">
                <FlipCoin/>
            </div>
        </main>
    )
}
