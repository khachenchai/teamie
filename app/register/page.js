"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
    const [toggleEye1, setToggleEye1] = useState(false);
    const [toggleEye2, setToggleEye2] = useState(false);
    const [prefix, setPrefix] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [showCheckPassError, setShowCheckPassError] = useState(false);
    const router = useRouter()

    const validation = () => {
        if (email === '' || password === '' || prefix === '' || firstname === '' || lastname === '') {
            setShowError(true)
            return false;
        } else if (email !== '' && password !== '' && prefix !== '' && firstname !== '' && lastname !== '') {
            setShowError(false)
            return true;
        }
    }

    const handleSubmit = async () => {
        validation()
        if (password !== checkPassword) {
            setShowCheckPassError(true)
        } else if (password === checkPassword) {
            setShowCheckPassError(false)
        }
        if (validation() && showCheckPassError === false) {
            // API
            try {
                const response = await axios.post('/api/auth/register', { prefix, firstname, lastname, email, password })

                const data = await response.data;

                console.log(data);

                router.push('/overview')
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    setShowError(true)
                } else {
                    console.log('Error', error.message);
                    setShowError(true)
                }
            }
        } else {
            console.log('No');
        }
    }

    return (
        <main className="flex min-h-screen flex-col justify-center items-center index-bg gap-4">
            <div className={`text-white p-4 bg-red-950 bg-opacity-75 rounded-lg border-2 border-red-600 -mt-2 ${showError ? 'block' : 'hidden'}`}>
                <p>โปรดกรอกข้อมูลให้ครบหรือถูกต้อง</p>
            </div>
            <div className={`text-white p-4 bg-red-950 bg-opacity-75 rounded-lg border-2 border-red-600 -mt-2 ${showCheckPassError ? 'block' : 'hidden'}`}>
                <p>โปรดกรอกยืนยันรหัสผ่านให้ถูกต้อง</p>
            </div>
            <h1 className="text-white text-3xl font-semibold lg:mb-3">ลงทะเบียน</h1>
            <div className="border bg-[#1c1c1c] rounded-lg px-4 py-4 border-[#111] shadow-xl lg:scale-105">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-1 items-center">
                        <div className="flex flex-col gap-1 w-1/6">
                            <label className="text-white mb-1 text-base" htmlFor="prefix">คำนำหน้าชื่อ</label>
                            <select
                                defaultValue={""}
                                onChange={(e) => setPrefix(e.target.value)}
                                className="px-2 py-1.5 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm"
                                name="prefix"
                            >
                                <option value="" disabled hidden>-- คำนำหน้าชื่อ --</option>
                                <option value="ด.ช.">ด.ช.</option>
                                <option value="ด.ญ.">ด.ญ.</option>
                                <option value="นาย">นาย</option>
                                <option value="น.ส.">น.ส.</option>
                                <option value="นาง">นาง</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 w-3/6">
                            <label className="text-white text-base mb-1" htmlFor="fisrtname">ชื่อจริง</label>
                            <input
                                className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="fisrtname" type="text"
                                placeholder="กรอกชื่อจริงของท่าน"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-2/6">
                            <label className="text-white text-base mb-1" htmlFor="lastname">นามสกุล</label>
                            <input
                                className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="lastname" type="text"
                                placeholder="กรอกนามสกุลของท่าน"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-white text-lg" htmlFor="email">อีเมล</label>
                        <input
                            className="px-2 py-2 rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm" name="email" type="text"
                            placeholder="กรอกอีเมลของท่าน"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-white text-lg" htmlFor="password">รหัสผ่าน</label>
                        <div className="relative flex items-center gap-2">
                            <input
                                className="px-2 py-2 w-full rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm"
                                name="password"
                                type={toggleEye1 ? "text" : "password"}
                                placeholder="กรอกรหัสผ่านของท่าน"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="absolute right-4 z-[1] cursor-pointer" onClick={() => setToggleEye1(!toggleEye1)}>
                                <FontAwesomeIcon
                                    icon={toggleEye1 ? faEye : faEyeSlash}
                                    style={{ fontSize: 16 }}
                                    className={toggleEye1 ? 'text-yellow-400' : 'text-sky-100'}
                                />
                            </p>
                        </div>
                        <label className="text-white text-lg mt-2" htmlFor="password">ยืนยันรหัสผ่าน</label>
                        <div className="relative flex items-center gap-2">
                            <input
                                className="px-2 py-2 w-full rounded-md border bg-neutral-800 text-white border-[#111] shadow text-sm"
                                name="password"
                                type={toggleEye2 ? "text" : "password"}
                                placeholder="กรอกรหัสผ่านอีกครั้ง"
                                onChange={(e) => setCheckPassword(e.target.value)}
                            />
                            <p className="absolute right-4 z-[1] cursor-pointer" onClick={() => setToggleEye2(!toggleEye2)}>
                                <FontAwesomeIcon
                                    icon={toggleEye2 ? faEye : faEyeSlash}
                                    style={{ fontSize: 16 }}
                                    className={toggleEye2 ? 'text-yellow-400' : 'text-sky-100'}
                                />
                            </p>
                        </div>
                        <p className="text-white text-sm mt-3 pl-0">มีบัญชีแล้ว? <a href="/login" className="underline">เข้าสู่ระบบ</a></p>
                        <hr className="my-1" />
                        <button onClick={handleSubmit} className="text-white px-4 py-2 bg-[#2f2f2f] rounded-xl border border-[#111] shadow-lg hover:bg-neutral-800 hover:shadow-lg transition">ลงทะเบียน</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
