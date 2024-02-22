"use client"
import Image from "next/image";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Overview() {
    const router = useRouter();
    const [toggleForm, setToggleForm] = useState(false);
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamDesc, setTeamDesc] = useState('');
    const [teamPass, setTeamPass] = useState('');
    const [teams, setTeams] = useState([])

    const toggleTheForm = () => {
        setToggleForm(!toggleForm);
    }

    const addTeam = async () => {
        try {
            const response = await axios.post('/api/team/add', { name: teamName, description: teamDesc, password: teamPass })

            const data = await response.data;

            console.log(data);
            setTeamName('')
            setTeamDesc('')
            setTeamPass('')
            setToggleForm(false)

            return router.refresh()
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log('Error', error.message);
            }
        }
    }


    // Fetch Here
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

    const onFetchTeams = async () => {
        try {
            const res = await axios.get('/api/team/get');
            const teamsData = res.data.data;

            // console.log(teamsData);

            setTeams(teamsData);
            // localStorage.setItem('teamsData', JSON.stringify(teamsData));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // const storedTeamsData = localStorage.getItem('teamsData');
        onFetchUser()
        // if (storedTeamsData) {
        //     setTeams(JSON.parse(storedTeamsData));
        // } else {
        //     onFetchTeams();
        // }
        onFetchTeams();
    }, [teams])
    return (
        <main className="max-h-screen overflow-y-hidden items-center bg-neutral-800">
            <Navbar name={username} />
            <div className="flex h-[90vh]">
                <Sidebar />
                <div className="w-4/5 p-8 text-white relative">
                    <h1 className="text-3xl">ทีมของคุณ</h1>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="px-4 py-2 bg-neutral-900 border-2 border-white border-dashed rounded-md">
                            <p className="text-xl">ทีม A</p>
                            <hr className="mb-1" />
                            <p className="text-base">สมาชิก 4 คน</p>
                            <div className="ml-4">
                                <ul className="list-decimal">
                                    <li>asasd</li>
                                </ul>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-[#450000] border-2 border-white border-dashed rounded-md">
                            <div className="flex justify-between items-baseline">
                                <p className="text-xl">ทีม A</p>
                                <a className="text-base">แก้ไขข้อมูล</a>
                            </div>
                            <hr className="mb-1" />
                            <p className="text-base">สมาชิก 4 คน</p>
                            <div className="ml-4">
                                <ul className="list-decimal">
                                    <li>asasd</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <h1 className="text-3xl">ทีมอื่น ๆ</h1>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {teams.map((team, i) => (
                            !team.members.includes(user._id) && (
                                <Link href={'/overview/team?team_id=' + team._id}>
                                    <div key={i} className="px-4 py-2 hover:-translate-y-2 transition bg-neutral-900 border-2 border-white border-dashed rounded-md">
                                        <p className="text-xl">ทีม {team.name}</p>
                                        <hr className="mb-1" />
                                        <p className="text-base">สมาชิก {team.members.length} คน</p>
                                        <div className="ml-4">
                                            <ul className="list-decimal">
                                                {team.members.map((member, i) => (
                                                    <li key={i}>{member.name.prefix}{member.name.firstname} {member.name.lastname}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Link>
                            )
                        ))}
                    </div>
                    <hr className="mt-4" />
                    <div className={"w-1/3 absolute bottom-24 right-4 " + (toggleForm ? "block" : "hidden")}>
                        <div className="border bg-[#1c1c1c] rounded-lg px-4 py-4 border-[#111] shadow-xl relative">
                            <div onClick={() => setToggleForm(false)} className="rounded-full flex justify-center items-center w-8 h-8 bg-red-950 border-2 border-red-800 hover:bg-red-700 hover:cursor-pointer transition absolute -top-4 -right-2">
                                <FontAwesomeIcon icon={faXmark} className="" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-white text-lg" htmlFor="name">ชื่อทีม</label>
                                    <input onChange={(e) => setTeamName(e.target.value)}
                                        className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="name" type="text"
                                        placeholder="กรอกชื่อทีม"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-white text-lg" htmlFor="description">รายละเอียด</label>
                                    <textarea onChange={(e) => setTeamDesc(e.target.value)}
                                        className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="description" type="text"
                                        placeholder="รายละเอียด"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-white text-lg" htmlFor="name">รหัสผ่านของทีม</label>
                                    <input onChange={(e) => setTeamPass(e.target.value)}
                                        className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="name" type="text"
                                        placeholder="กรอกรหัสผ่านของทีม 4 ตัว" maxLength={4}
                                    />
                                </div>
                                <hr className="my-1" />
                                <button onClick={addTeam} className="text-white px-4 py-2 bg-[#2f2f2f] rounded-xl border border-[#111] shadow-lg hover:bg-neutral-800 hover:shadow-lg transition">เพิ่มทีม</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={toggleTheForm} className="rounded-full hover:cursor-pointer hover:scale-110 hover:-translate-y-2 flex justify-center items-center w-12 h-12 bg-neutral-900 border-2 border-neutral-950 hover:bg-neutral-700 transition absolute bottom-8 right-8 shadow-lg">
                        <FontAwesomeIcon icon={faAdd} className="text-white" />
                    </div>
                </div>
            </div>
        </main>
    );
}
