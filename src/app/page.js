import Image from "next/image";

export default function Home() {
  return (
    <div className="tweet border border-solid border-[#2f3336] w-[600px] my-6 mx-auto py-0 px-4 mb-1">
       <div className="tweet-author h-12 mt-3 flex items-center text-sm">
            <img className="w-12 h-12 rounded-full mr-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbvj2WcHtog9n1AhULDOAi5qfIzqWlxpliKg&s" alt="" />
            <div className="name text-white font-bold">Emir Arslan</div>
            <div className="username not-first:text-[#6e767d]">@emirarslan</div>
       </div>
       <div className="tweet-content">
        <p>Bu tweet fake tweet generator uygulaması için atılmıştır aldırmayınız :D</p>
       </div>
    </div>
  );
}

