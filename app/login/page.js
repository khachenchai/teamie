"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"

export default function Login() {
    const router = useRouter();
    const [toggleEye, setToggleEye] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const toggleRedEye = () => {
        setToggleEye(!toggleEye);
    }

    const validation = () => {
        if (email === '' || password === '') {
            setShowError(true)
            return false;
        } else if (email !== '' && password !== '') {
            setShowError(false)
            return true;
        }
    }

    const handleSubmit = async () => {
        validation()
        if (validation()) {
            // API
            try {
                const response = await axios.post('/api/auth/login', { email, password })

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
            <h1 className="text-white text-3xl font-semibold lg:mb-3">เข้าสู่ระบบ</h1>
            <div className="border bg-[#1c1c1c] rounded-lg px-4 py-4 md:w-96 lg:scale-110 border-[#111] shadow-xl">
                <div className="flex flex-col gap-3">
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
                                type={toggleEye ? "text" : "password"}
                                placeholder="กรอกรหัสผ่านของท่าน"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="absolute right-4 z-[1] cursor-pointer" onClick={toggleRedEye}>
                                <FontAwesomeIcon
                                    icon={toggleEye ? faEye : faEyeSlash}
                                    style={{ fontSize: 16 }}
                                    className={toggleEye ? 'text-yellow-400' : 'text-sky-100'}
                                />
                            </p>
                        </div>
                        <p className="text-white text-sm mt-3 pl-0">ยังไม่มีบัญชี? <a href="/register" className="underline">ลงทะเบียนเลย</a></p>
                        <hr className="my-1" />
                        <button onClick={handleSubmit} className="text-white px-4 py-2 bg-[#2f2f2f] rounded-xl border border-[#111] shadow-lg hover:bg-neutral-800 hover:shadow-lg transition">เข้าสู่ระบบ</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
