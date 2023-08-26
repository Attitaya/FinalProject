"use client"
import React, {useState} from "react";
import Image from "next/image";

function Navbar() {

    return(
            <nav className="bg-blue">
                <div className = "hidden lg:block">
                    <div className="flex flex-row justify-center py-2 px-2">
                        <div className="container">
                            <div className="flex justify-start">
                                <Image
                                src="/betimes.svg"
                                width={250}
                                height={250}
                                alt="logo"
                                ></Image>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="block lg:hidden">
                <div className="flex flex-row justify-center py-6 px-6">
                        <div className="container">
                            <div className="flex justify-start">
                            <Image
                                src="/betimes.svg"
                                width={250}
                                height={100}
                                alt="logo"
                                ></Image>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}
export default Navbar;