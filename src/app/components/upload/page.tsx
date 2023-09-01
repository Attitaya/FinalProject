"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import SearchBar from "./search";
import { CgCheck, CgClose, CgChevronDoubleLeft, CgChevronDoubleRight, CgChevronRight, CgChevronLeft } from "react-icons/cg";
import Calendar from "react-calendar";
import "./upload.css";
import { MdPlayCircleFilled, MdPauseCircleFilled, MdDone, MdDelete } from "react-icons/md";
import Link from 'next/link';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);
    const [comment, setComment] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioInstance, setAudioInstance] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [audioInstancePlaying, setAudioInstancePlaying] = useState(null);
    const [audioPlayingIndex, setAudioPlayingIndex] = useState(null);
    const [audioInstances, setAudioInstances] = useState([]);
    const [page, setPage] = useState(1);
    const filesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(uploadedFiles.length / filesPerPage);
    const reversedUploadedFiles = uploadedFiles.slice().reverse(); // Reverse the uploaded files array

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const allowedExtensions = [".mp3", ".wav", ".mp4", ".aac", ".m4a"];
        const fileExtension = file.name
            .slice(file.name.lastIndexOf("."))
            .toLowerCase();

        if (allowedExtensions.includes(fileExtension)) {
            setSelectedFile(file);
            setUploadError(null);
            if (audioInstancePlaying) {
            audioInstancePlaying.pause(); // หยุดการเล่นเสียงของไฟล์เก่า
            }
            setSelectedFile(file);
            setUploadError(null);
            if (audioInstance) {
            audioInstance.pause(); // หยุดการเล่นเสียงปัจจุบัน
            setIsPlaying(false);
            setAudioPlayingIndex(null);
            }

        } else {
            setUploadError("Invalid file format. Please select a valid audio file.");
        }
        }
    };

    const resetForm = () => {
        setIsOpen(false);
        setSelectedFile(null);
        setUploadError(null);
        setSelectedDate(new Date());
        setComment("");
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const existingFile = uploadedFiles.find(
                file => file.file.name === selectedFile.name && file.date.toDateString() === selectedDate.toDateString()
            );

            if (existingFile) {
                setUploadError("File with the same name already exists on the selected date.");
                return;
            }

                // Check if the comment is empty
            if (comment.trim() === "") {
                setUploadError("Please provide a comment for the file.");
                return;
            }
            
            // Set uploading status
            setUploading(true);
    
            // Perform file upload logic here
            try {
                console.log("Uploading file:", selectedFile);
                console.log("Selected date:", selectedDate);
                console.log("Comment:", comment);
    
                // Simulate an async upload process
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating 2 seconds delay
    
                // Create a new uploaded file object
                const newUploadedFile = {
                    file: selectedFile,
                    date: selectedDate,
                    comment: comment,
                };
    
                // Update the uploadedFiles state with the new uploaded file
                const newUploadedFiles = [...uploadedFiles, newUploadedFile];
                setUploadedFiles(newUploadedFiles);
    
                // Calculate the new page number based on the total number of uploaded files
                const newPage = Math.ceil(newUploadedFiles.length / filesPerPage);
                setPage(newPage);
    
                // Add the new Audio instance to the audioInstances state
                const newAudioInstance = new Audio(URL.createObjectURL(selectedFile));
                setAudioInstances([...audioInstances, newAudioInstance]);
    
                // ตรวจสอบเมื่อเสียงเล่นเสร็จสิ้นและหยุดเล่นอัตโนมัติ
                newAudioInstance.addEventListener('ended', () => {
                    setIsPlaying(false);
                    setAudioPlayingIndex(null);
                });
    
                // Reset the form and close the dialog
                resetForm();
    
                // Set success message
                setSuccessMessage("File uploaded successfully.");
                
                // Set page to 1 to stay on the first page after upload
                setPage(1);
            } catch (error) {
                // Set error message
                setErrorMessage("An error occurred during upload.");
            } finally {
                // Reset uploading status
                setUploading(false);
            }
        } else {
            setUploadError("Please select a file to upload.");
        }
    };

    const handleSearch = (query) => {
    // Implement your search logic here using the query
        console.log("Searching for:", query);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setHoveredDate(null);
    };

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };


    const handleDelete = (index) => {
        const fileToDelete = uploadedFiles[index];
    
        // Stop playing the audio if it's the one being deleted
        if (audioPlayingIndex === index) {
            if (audioInstancePlaying) {
                audioInstancePlaying.pause();
            }
            setIsPlaying(false);
            setAudioPlayingIndex(null);
        }
    
        // Remove the file from uploadedFiles state
        const newUploadedFiles = [...uploadedFiles];
        newUploadedFiles.splice(index, 1);
        setUploadedFiles(newUploadedFiles);
    
        // Remove the corresponding audio instance from audioInstances state
        const newAudioInstances = [...audioInstances];
        newAudioInstances.splice(index, 1);
        setAudioInstances(newAudioInstances);
    };

    return (
        <div className="flex flex-col pl-2 pr-2 pt-3 md:pl-8 md:pr-8"> 
            <div className="flex flex-row justify-between">
                <button
                onClick={() => setIsOpen(true)}
                className="font-bold bg-red text-black px-9 rounded-md"
                >
                Upload
                </button>
                <SearchBar onSearch={handleSearch} />
            </div>
                {reversedUploadedFiles.sort((a, b) => b.date - a.date).slice((currentPage - 1) * filesPerPage, currentPage * filesPerPage).map((file, index) => {
                    const reversedIndex = reversedUploadedFiles.length - 1 - index;
                    return (
                        <div key={reversedIndex} className="mt-4 bg-light-blue rounded-md p-2 font-bold flex flex-col md:flex-row"> {/* เพิ่ม md:flex-row เพื่อให้บรรจุเนื้อหาในแนวนอนในจอใหญ่ */}
                            <div className="flex flex-col justify-start md:w-1/2">
                                <p className="mb-1">File : {file.file.name}</p>
                                <p className="mb-1">Date : {file.date.toLocaleDateString()}</p>
                                <p className="mb-1">Comment : <span className="break-word">{file.comment}</span></p>
                            </div>
                            <div className="md:flex justify-center items-center md:w-1/2">
                                <audio controls src={URL.createObjectURL(file.file)} />
                                <div className="md:ml-5 md:mt-0 mt-4"> {/* เพิ่มระยะห่างและความชิดซ้ายเมื่อในจอใหญ่ */}
                                    <Link href="/summary" passHref={true} legacyBehavior>
                                        <a className="bg-blue text-white px-3 py-1 rounded">Summarize</a>
                                    </Link>
                                    <button
                                        className="bg-red text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(index)} // Call the delete function on click
                                    >
                                        Delete <MdDelete className="inline-block ml-1" />
                                    </button>
                                </div>
                                {/* {processing && (
                                    <div className="text-green-500">
                                        <i className="fas fa-check-circle mr-1"></i>
                                        Processing completed
                                    </div>
                                )} */}
                            </div>
                        </div>
                    );
                })}
                <Dialog
                    open={isOpen}
                    onClose={() => {
                        if (audioInstancePlaying) {
                            audioInstancePlaying.pause();
                        }
                        setIsPlaying(false);
                        setIsOpen(false);
                    }}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md"
                    style={{ zIndex: 1000 }} // Set a higher z-index value
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md">
                        <Dialog.Title className="text-lg font-bold mb-2">
                            Select file to upload
                        </Dialog.Title>
                        <input type="file" onChange={handleFileChange} accept="audio/*" />
                        {uploadError && <p className="text-red">{uploadError}</p>}
                        <div className="flex flex-row justify-between">
                            <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            tileClassName={({ date, view }) =>
                                view === 'month' &&
                                `react-calendar__tile--hover ${
                                date.getDate() === selectedDate.getDate() &&
                                date.getMonth() === selectedDate.getMonth() &&
                                date.getYear() === selectedDate.getYear()
                                    ? 'react-calendar__tile--active'
                                    : ''
                                }`
                            }
                            className="justify-start p-2 custom-calendar"
                            />
                            <textarea
                                placeholder="comment"
                                className="m-1 resize-none border-dashed border-2 rounded-md p-2"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} // Update the comment state
                            ></textarea>
                        </div>
                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={handleUpload}
                            className={`${
                                uploading ? "bg-gray-300" : "bg-green"
                            } text-black px-3 py-1 rounded mr-2`}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Submit"}{" "}
                            {uploading ? (
                                <MdPauseCircleFilled className="inline-block ml-1" />
                            ) : (
                                <CgCheck className="inline-block ml-1" />
                            )}
                        </button>
                        <button
                            onClick={resetForm}
                            className="bg-red text-black px-3 py-1 rounded"
                        >
                            Cancel <CgClose className="inline-block ml-1" />
                        </button>
                    </div>

                    {/* Success and error messages */}
                    {successMessage && <p className="text-green">{successMessage}</p>}
                    {errorMessage && <p className="text-red">{errorMessage}</p>}
                    </div>
                </Dialog>
                {totalPages > 1 && (
                    <div className="flex flex-row md:flex-row justify-center mt-4">
                        {/* First page */}
                        <button
                            onClick={() => goToPage(1)}
                            disabled={currentPage === 1}
                            className="text-black px-3 py-1 rounded mx-1"
                        >
                            <CgChevronDoubleLeft />
                        </button>

                        {/* Previous page */}
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="text-black px-3 py-1 rounded mx-1"
                        >
                            <CgChevronLeft />
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
                            if (totalPages <= 3) {
                                // Display all pages if there are 3 or fewer pages
                                return (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`${
                                            page === currentPage ? "border text-black" : "text-black"
                                        } px-3 py-1 rounded mx-1`}
                                    >
                                        {page}
                                    </button>
                                );
                            } else {
                                // Display only the first page, last page, and ellipsis for intermediate pages
                                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`${
                                                page === currentPage ? "border text-black" : "text-black"
                                            } px-3 py-1 rounded mx-1`}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (
                                    (page === currentPage - 2 && currentPage > 3) ||
                                    (page === currentPage + 2 && currentPage < totalPages - 2)
                                ) {
                                    return (
                                        <span key={page} className="px-3 py-1 mx-1">
                                            ...
                                        </span>
                                    );
                                }
                            }
                        })}

                        {/* Next page */}
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="text-black px-3 py-1 rounded mx-1"
                        >
                            <CgChevronRight />
                        </button>

                        {/* Last page */}
                        <button
                            onClick={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="text-black px-3 py-1 rounded mx-1"
                        >
                            <CgChevronDoubleRight />
                        </button>
                    </div>
                )}
        </div>
    );
}

export default Upload;