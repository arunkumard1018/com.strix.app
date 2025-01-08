"use client"
import React from "react";
import Lottie from "lottie-react";
// import Lottie, { LottieProps } from "lottie-react";
import loading from "./animation-data/loading.json";
import Image from "next/image";

const LoadingAnimation: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Lottie
                animationData={loading}
                loop={true}
                style={{ width: 300, height: 300 }}
            />
        </div>
    );
};

const LoadingGif = () => {
    return (
        <div>
            <Image src="/img/loading.gif" alt="Loading..." width={100} height={100} priority unoptimized />
        </div>
    )
}
const ServerErrorWebM = () => {
    return (
        <div>
            <Image src={"/gif/server-error.gif"} alt="server-error" width={100} height={100} unoptimized></Image>
        </div>
    );
};


export { LoadingAnimation, LoadingGif, ServerErrorWebM };
