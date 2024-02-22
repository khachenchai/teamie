"use client"
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";


export default function Team() {
    const searchParams = useSearchParams()
    const [team, setTeam] = useState({})
    const [teamLen, setTeamLen] = useState(0)
    const [username, setUsername] = useState('');
    const [toggleForm, setToggleForm] = useState(false);

    const team_id = searchParams.get('team_id')

    const onFetchUser = async () => {
        try {
            const res = await axios.get('/api/user/profile');

            const userData = await res.data.userData;
            const nameData = await res.data.name;
            // console.log(userData);

            setUser(userData)
            setUsername(nameData)
            // console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    const onFetchTeam = async () => {
        try {
            const res = await axios.get('/api/team/get?team_id=' + team_id);
            const teamData = res.data.data;
            setTeamLen(teamData.members)

            // console.log(teamData);

            setTeam(teamData);
            // localStorage.setItem('teamsData', JSON.stringify(teamsData));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        onFetchUser()
        onFetchTeam();
    }, [])
    return (
        <main className="max-h-screen overflow-y-hidden items-center bg-neutral-800">
            <Navbar name={username} />
            <div className="flex h-[90vh]">
                <Sidebar />
                <div className="w-4/5 p-8 text-white">
                    <h1 className="text-3xl">ทีม {team.name}</h1>
                    <p className="text-lg mt-8">สมาชิก {teamLen.length} คน</p>
                    <div className="ml-4">
                        <ul className="list-decimal">
                            <li>นายทดสอบ รอบที่ล้าน</li>
                            {/* {team.members.map((member, i) => (
                                <li key={i}>{member.name.prefix}{member.name.firstname} {member.name.lastname}</li>
                            ))} */}
                        </ul>
                    </div>
                    <p className="text-base">มีงานทั้งหมด 1 งาน</p>
                    <hr className="my-4" />
                    <h1 className="text-3xl">งานในทีม</h1>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="px-4 py-2 bg-neutral-900 border-2 border-white border-dashed rounded-md">
                            <p className="text-xl">งานกลุ่ม Test</p>
                            <hr className="mb-3" />
                            <div className="flex justify-end items-center gap-1">
                                <a className="px-2 py-1 bg-green-800 rounded-md hover:bg-green-700 transition">จัดการ</a>
                                <a className="px-2 py-1 bg-red-800 rounded-md hover:bg-red-700 transition">ลบงาน</a>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className={"w-1/3 absolute bottom-24 right-4 " + (toggleForm ? "block" : "hidden")}>
                        <div className="border bg-[#1c1c1c] rounded-lg px-4 py-4 border-[#111] shadow-xl relative">
                            <div onClick={() => setToggleForm(false)} className="rounded-full flex justify-center items-center w-8 h-8 bg-red-950 border-2 border-red-800 hover:bg-red-700 hover:cursor-pointer transition absolute -top-4 -right-2">
                                <FontAwesomeIcon icon={faXmark} className="" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-white text-lg" htmlFor="name">ชื่องาน</label>
                                    <input onChange={(e) => setTeamName(e.target.value)}
                                        className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="name" type="text"
                                        placeholder="กรอกชื่องาน"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-white text-lg" htmlFor="description">รายละเอียด</label>
                                    <textarea onChange={(e) => setTeamDesc(e.target.value)}
                                        className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="description" type="text"
                                        placeholder="รายละเอียด"
                                    />
                                </div>
                                <hr className="my-1" />
                                <button className="text-white px-4 py-2 bg-[#2f2f2f] rounded-xl border border-[#111] shadow-lg hover:bg-neutral-800 hover:shadow-lg transition">เพิ่มงาน</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setToggleForm(!toggleForm)} className="rounded-full hover:cursor-pointer hover:scale-110 hover:-translate-y-2 flex justify-center items-center w-12 h-12 bg-neutral-900 border-2 border-neutral-950 hover:bg-neutral-700 transition absolute bottom-8 right-8 shadow-lg">
                        <FontAwesomeIcon icon={faAdd} className="text-white" />
                    </div>
                </div>
            </div>
        </main>
    );
}
