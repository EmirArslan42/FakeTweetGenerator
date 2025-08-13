"use client";
import Image from "next/image";
import {
  ReplyIcon,
  RetweetICon,
  LikeICon,
  ShareICon,
  VerifiedICon,
} from "@/icons";
import { useEffect, useRef, useState } from "react";
import { AvatarLoader } from "@/Loader";
import html2canvas from "html2canvas";
import { language } from "@/./Language";

export default function Home() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState(null);
  const [retweets, setRetweets] = useState(1478);
  const [quoteTweets, setQuoteTweets] = useState("");
  const [likes, setLikes] = useState("");
  const [lang, setLang] = useState("tr");
  const [langText, setLangText] = useState();

  const tweetRef = useRef(null);
  const downloadRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setLangText(language[lang]);
    console.log(lang);
    
  }, [lang]);

  const fetchTwitterInfo = async () => {
    // const dt = await fetch(
    //   `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${username}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const twitter = data[0];
    //     console.log(twitter);
    //     setName(twitter.name);
    //     setUsername(twitter.screen_name);
    //     setAvatar(twitter.profile_image_url_https);
    //     setTweet(twitter.status.text);
    //     setRetweets(twitter.status.retweet_count);
    //     setLikes(twitter.status.favorite_count);
    //   });
    alert("Twitter apisi devre dışına alındığından dolayı bu özellik şu anda desteklenmiyor.Fake Tweetler oluşturmaya devam edebilirsiniz..");
  };

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);

  const getScreenshot = async () => {
    if (!tweetRef.current) return;
    const canvas = await html2canvas(tweetRef.current);
    const dataUrl = canvas.toDataURL("image/png");
    setImage(dataUrl);
  };

  const tweetFormat = (tweet) => {
    tweet = tweet
      .replace(/#([\wşçöğüıİ]+)/gi, `<b class="text-[#1da1f2]">#$1</b>`)
      .replace(/@([\w]+)/g, `<b class="text-[#1da1f2]">@$1</b>`)
      .replace(
        /(https?:\/\/[^\s]+)/g,
        `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#1da1f2] cursor-pointer">$1</a>`
      );
    return tweet;
  };

  const formatNumber = (number) => {
    if (number < 1000) {
      return number;
    }
    number /= 1000;
    number = String(number).split(".");
    return (
      number[0] + (number[1] >= 100 ? "," + number[1].slice(0, 1) + " B" : " B")
    );
  };

  //img yükleme fonksiyonu
  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center h-full">
      <div className="tweet-settings flex flex-col  w-1/4 border-r border-solid border-[#2f3336] p-6 h-full overflow-y-auto scrollbar-hidden">
        <h3 className="text-2xl font-normal border-b border-solid border-[#2f3336] pb-5 mb-5">
          {langText?.settings}
        </h3>
        <ul className="ul-list">
          <li>
            <label className="text-[15px] mb-1.5 text-[#6e767e]">
              {langText?.name}
            </label>
            <input
              className="input focus:outline-0 w-full bg-transparent border-b border-solid border-[#2f3336] text-white py-2.5"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label className="text-[15px] mb-1.5 text-[#6e767e]">
              {langText?.username}
            </label>
            <input
              className="input focus:outline-0 w-full bg-transparent border-b border-solid border-[#2f3336] text-white py-2.5"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <label className="text-[15px] mb-1.5 text-[#6e767e]">Tweet</label>
            <textarea
              className="textarea focus:outline-0 w-full bg-transparent border-b border-solid border-[#2f3336] text-white py-2.5 leading-normal resize-none"
              name=""
              id=""
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              maxLength={290}
            ></textarea>
          </li>
          <li>
            <label className="text-[15px] mb-1.5 text-[#6e767e]">Avatar</label>
            <input
              className="input focus:outline-0 w-full bg-transparent border-b border-solid border-[#2f3336] text-white py-2.5"
              type="file"
              onChange={avatarHandle}
            />
          </li>
          <li>
            <label className="text-[15px] mb-1.5 text-[#6e767e]">Retweet</label>
            <input
              className="input focus:outline-0 w-full bg-transparent border-b border-solid border-[#2f3336] text-white py-2.5"
              type="number"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label className="text-[15px] mb-1.5 text-[#6e767e]">
              Alıntı Tweetler
            </label>
            <input
              className="input focus:outline-0 w-full bg-transparent border-b border-solid border-[#2f3336] text-white py-2.5"
              type="number"
              value={quoteTweets}
              onChange={(e) => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label className="text-[15px] mb-1.5 text-[#6e767e]">Beğeni</label>
            <input
              className="input focus:outline-0 w-full bg-transparent border-b border-solid border-[#2f3336] text-white py-2.5"
              type="number"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <li>
            <label className="text-[15px] mb-1.5 text-[#6e767e] flex flex-1">
              Doğrulanmış Hesap
            </label>

            <select
              className="input focus:outline-0 w-full bg-transparent border-b border-solid border-[#2f3336] text-white py-2.5"
              onChange={(e) => setIsVerified(e.target.value)}
              defaultValue={isVerified}
              name=""
              id=""
            >
              <option className="text-black" value="1">
                Evet
              </option>
              <option className="text-black" value="0">
                Hayır
              </option>
            </select>
          </li>
          <button
            onClick={getScreenshot}
            className="w-full h-10 bg-[#1da1f2] text-white text-lg rounded-sm cursor-pointer"
          >
            Oluştur
          </button>

          {image && (
            <a
              ref={downloadRef}
              hidden
              href={image}
              download={`download-screenshot-${Math.floor(
                Math.random() * 999
              )}`}
            >
              Resimi İndir
            </a>
          )}
        </ul>
      </div>
      <div className="tweet-container px-13 relative h-full flex items-center flex-col justify-center w-3/4">
        <div className="app-language mb-4 text-[#6f757e] text-[14px] flex justify-center items-center absolute top-0  w-full p-4">
          <span
            onClick={() => setLang("tr")}
            className={`cursor-pointer mx-4 ${
              lang === "tr" ? "text-white" : ""
            }`}
          >
            Türkçe
          </span>
          <span
            onClick={() => setLang("en")}
            className={`cursor-pointer ${lang === "en" ? "text-white" : ""}`}
          >
            İngilizce
          </span>
        </div>
        <div className="flex fetch-info mb-6 w-[612px]">
          <input
            placeholder="Twitter kullanıcı adını yazın"
            className="flex flex-1 bg-[#2f3336] h-10 rounded-tl-sm rounded-bl-sm leading-10 px-4 text-white focus:outline-0"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={fetchTwitterInfo}
            className="h-10 text-white bg-[#1da1f2] text-[15px] px-5 cursor-pointer rounded-tr-sm rounded-br-sm"
          >
            Bilgileri Çek
          </button>
        </div>
        <div
          ref={tweetRef}
          className="bg-[#000] tweet border border-solid border-[#2f3336] w-[600px] my-6 mx-auto py-0 px-4 mb-1"
        >
          <div className="tweet-author h-12 mt-3 flex items-center text-sm">
            {avatar ? (
              <img
                className="w-12 h-12 rounded-full mr-3"
                src={avatar}
                alt=""
              />
            ) : (
              <AvatarLoader />
            )}
            <div className="flex flex-col">
              <div className="name text-white font-bold flex items-center">
                {name || "Ad-Soyad"}
                <div className="ml-1">
                  {isVerified == 1 && <VerifiedICon width={19} height={19} />}
                </div>
              </div>
              <div className="username not-first:text-[#6e767d]">
                @{username || "kullaniciadi"}
              </div>
            </div>
          </div>
          <div className="tweet-content py-3 w-[572px]">
            <p
              className="text-6 text-white leading-7 w-full break-words"
              dangerouslySetInnerHTML={{
                __html:
                  (tweet && tweetFormat(tweet)) ||
                  "Bu alana örnek tweet gelecek",
              }}
            ></p>
          </div>
          <div className="tweet-stats h-13 flex text-[#6e767d] items-center text-4 border-t border-solid border-[#2f3336]">
            <span className="mr-5">
              <b className="text-white">
                {retweets ? formatNumber(retweets) : 0}
              </b>{" "}
              Retweet
            </span>
            <span className="mr-5">
              <b className="text-white">
                {quoteTweets ? formatNumber(quoteTweets) : 0}
              </b>{" "}
              Alıntı Tweetler
            </span>
            <span className="">
              <b className="text-white">{likes ? formatNumber(likes) : 0}</b>{" "}
              Beğeni
            </span>
          </div>
          <div className="tweet-actions h-12 flex border-t border-solid border-[#2f3336] items-center text-white justify-around">
            <span>
              <ReplyIcon />
            </span>
            <span>
              <RetweetICon />
            </span>
            <span>
              <LikeICon />
            </span>
            <span>
              <ShareICon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
