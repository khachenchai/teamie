"use client"
import Image from "next/image";
import Navbar from "../components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Plan() {
    const [toggleForm, setToggleForm] = useState(false);

    const toggleTheForm = () => {
        setToggleForm(!toggleForm);
    }
    return (
        <main className="max-h-screen overflow-y-hidden items-center bg-neutral-800">
            <Navbar name={"นายคเชนทร์ชัย ใจกล้า"} />
            <div className="flex h-[90vh]">
                <Sidebar />
                <div className="w-4/5 px-8 pt-8 h-full border text-white relative">
                    <h1 className="text-3xl">ทีม A</h1>
                    <p className="text-lg mt-4">รายละเอียด</p>
                    <hr className="my-4" />
                    <h1 className="text-3xl">To do tasks</h1>
                    <hr className="mt-4 mb-4" />
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="px-4 py-2 bg-neutral-900 border-2 border-white border-dashed rounded-md relative">
                            <div className="flex justify-between items-baseline">
                                <p className="text-2xl">เก็บข้อมูล</p>
                                <p className="text-sm text-gray-300">โพสต์เมื่อ 14/2/66</p>
                            </div>
                            <hr className="mb-1" />
                            <p className="text-sm text-gray-200 ml-1">โพสต์โดย คเชนทร์ชัย</p>
                            <p className="text-sm text-gray-200 ml-1 underline">รายละเอียด</p>
                            <div className="rounded-full flex justify-center items-center w-8 h-8 bg-emerald-950 border-2 border-emerald-800 hover:bg-emerald-700 transition absolute -top-4 -right-4">
                                <FontAwesomeIcon icon={faCheck} className="" />
                            </div>
                            <div className="rounded-full flex justify-center items-center w-8 h-8 bg-yellow-500 border-2 border-black text-2xl font-bold text-black absolute -top-4 -left-4">
                                -
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4 mb-4" />
                    <h1 className="text-3xl mt-4">Cleared tasks</h1>
                    <hr className="mt-4 mb-4" />
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="px-4 py-2 bg-[#003b01] border-2 border-white border-dashed rounded-md relative">
                            <div className="flex justify-between items-baseline">
                                <p className="text-2xl">เริ่มวางแผน</p>
                                <p className="text-sm text-gray-300">โพสต์เมื่อ 14/2/66</p>
                            </div>
                            <hr className="mb-1" />
                            <p className="text-sm text-gray-200 ml-1">โพสต์โดย คเชนทร์ชัย</p>
                            <p className="text-sm text-gray-200 ml-1">รายละเอียด</p>
                        </div>
                    </div>
                    <div className={"w-1/3 absolute bottom-24 right-4 " + (toggleForm ? "block" : "hidden")}>
                        <form className="border bg-[#1c1c1c] rounded-lg px-4 py-4 border-[#111] shadow-xl relative">
                            <div onClick={() => setToggleForm(false)} className="rounded-full flex justify-center items-center w-8 h-8 bg-red-950 border-2 border-red-800 hover:bg-red-700 hover:cursor-pointer transition absolute -top-4 -right-2">
                                <FontAwesomeIcon icon={faXmark} className="" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-white text-lg" htmlFor="title">การดำเนินงาน</label>
                                    <input
                                        className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="title" type="text"
                                        placeholder="กรอกการดำเนินงาน"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-white text-lg" htmlFor="title">รายละเอียด</label>
                                    <textarea
                                        className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="description" type="text"
                                        placeholder="รายละเอียด"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-white text-lg" htmlFor="title">ควรเสร็จภายในวันที่</label>
                                    <input
                                        className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="finished_date" type="date"
                                    />
                                </div>
                                
                                <hr className="my-1" />
                                <button className="text-white px-4 py-2 bg-[#2f2f2f] rounded-xl border border-[#111] shadow-lg hover:bg-neutral-800 hover:shadow-lg transition">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div onClick={toggleTheForm} className="rounded-full hover:cursor-pointer hover:scale-110 hover:-translate-y-2 flex justify-center items-center w-12 h-12 bg-neutral-900 border-2 border-neutral-950 hover:bg-neutral-700 transition absolute bottom-8 right-8 shadow-lg">
                    <FontAwesomeIcon icon={faAdd} className="text-white" />
                </div>
            </div>
        </main>
    );
}
