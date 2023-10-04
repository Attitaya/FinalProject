"use client"
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaCaretDown, FaCaretUp } from "react-icons/fa";

function Summary() {
    const [data, setData] = useState({ timestamp: "", text: "" });
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isTimestampOpen, setIsTimestampOpen] = useState(false);

    const handleBackClick = () => {
    window.history.back();
    };

    useEffect(() => {
        // สร้างฟังก์ชันเพื่อดึงข้อมูล timestamp และ text จาก API
        const fetchData = async () => {
                try {
                    const response = await fetch("URL_ของ_API");
                        if (response.ok) {
                            const dataFromApi = await response.json();
                                setData({ timestamp: dataFromApi.timestamp, text: dataFromApi.text });
                        } else {
                            console.error("ไม่สามารถดึงข้อมูลจาก API ได้");
                        }
                    } catch (error) {
                        console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
                }
        };

        // เรียก fetchData เมื่อคอมโพเนนต์ถูกโหลดครั้งแรก
        fetchData();

        // ตั้งค่าให้ fetchData เรียกทุก 30 วินาที
        const intervalId = setInterval(fetchData, 30000);

        // เมื่อคอมโพเนนต์ถูก unmount ให้ยกเลิกการเรียก fetchData ทุก 30 วินาที
        return () => clearInterval(intervalId);
    }, []);

    const toggleTopic = () => {
        setIsTopicOpen(!isTopicOpen);
    };

    const toggleTimestamp = () => {
        setIsTimestampOpen(!isTimestampOpen);
    };

    return (
        <div className="flex flex-col pl-2 pr-2 pt-3 md:pl-8 md:pr-8">
            <div className="flex flex-row">
                <button onClick={handleBackClick}>
                    <FaAngleLeft className="inline-block ml-1" /> Back
                </button>
            </div>

            <div className="my-2">
                <div
                className="flex flex-row justify-around items-center border border-1 rounded-md p-2"
                onClick={toggleTopic}
                style={{ cursor: "pointer" }}
                >
                    <p className="flex items-center">Topic {isTopicOpen ? <FaCaretDown /> : <FaCaretUp />}</p>
                    <p>Summarize</p>
                </div>
                {isTopicOpen && (
                    <div className="flex flex-row justify-around border border-1 rounded-md p-2">
                        {/* เนื้อหาของ Topic */}
                    </div>
                )}
            </div>

            <div className="my-2">
                <div
                className="flex flex-row justify-around items-center border border-1 rounded-md p-2"
                onClick={toggleTimestamp}
                style={{ cursor: "pointer" }}
                >
                    <p className="flex items-center">Timestamp {isTimestampOpen ? <FaCaretDown /> : <FaCaretUp />}</p>
                    <p>Text</p>
                </div>
                {isTimestampOpen && (
                    <div className="flex flex-row justify-around border border-1 rounded-md p-2">
                        {/* เนื้อหาของ Timestamp */}
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default Summary;