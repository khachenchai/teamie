import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center index-bg">
      <div className="min-h-screen flex flex-col items-center pt-24 w-full">
        <div>
          <h1 className="text-white text-[100px] font-medium">Teamie</h1>
        </div>
        <p className="text-white text-3xl font-light underline underline-offset-4">อนาคตของการวางแผนการทำงานภายในกลุ่ม</p>
        <p className="text-white text-lg mt-8 font-light text-center">ตั้งทีมกับเพื่อนของคุณ แล้วตั้งกระบวนการทำงานให้เป็นขั้นเป็นตอนให้ชัดเจน ง่ายต่อการวางแผน แบ่งเวลาทำงาน เช็คลิสต์งาน<br />ทั้งหมดนี้สามารถจัดการได้ด้วย UI ที่เข้าใจง่ายด้วย Teamie เลย !</p>
        <a href="/login" className="px-4 py-2 text-white bg-zinc-900 mt-8 rounded-lg text-lg hover:shadow-lg border border-neutral-900 hover:scale-105 transition duration-75 hover:font-semibold">เริ่มกันเลย</a>
        <div className="h-72 bg-[#181414] w-full bg-opacity-[0.51] mt-20 py-4 px-8">
          <p className="text-white text-xl font-medium mt-4">ทำไมต้อง Teamie?</p>
          <div className="grid grid-cols-3">

          </div>
        </div>
      </div>

    </main>
  );
}
