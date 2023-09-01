"use client"
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom"; // สำหรับการใช้งานประวัติการเรียก

function Summary(){
    
    const history = useHistory();

    const handleBackClick = () => {
        history.goBack(); // ใช้ประวัติการเรียกเพื่อย้อนกลับไปหน้าก่อนหน้า
    };

    return(
        <div className="flex flex-colpl-2 pr-2 pt-3 md:pl-8 md:pr-8">
            <div className="flex flex-row">
                <button onClick={handleBackClick}>
                    <FaAngleLeft className="inline-block ml-1"/>Back
                </button>
            </div>
            <div className="">
            </div>
        </div>
    );
}

export default Summary;