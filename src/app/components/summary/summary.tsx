"use client"
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

function Summary(){
    
    return(
        <div className="flex flex-colpl-2 pr-2 pt-3 md:pl-8 md:pr-8">
            <div className="flex flex-row">
                <button>
                    <FaAngleLeft className="inline-block ml-1"/>Back
                </button>
            </div>
            <div className="">
                
            </div>
        </div>
    )
}

export default Summary;