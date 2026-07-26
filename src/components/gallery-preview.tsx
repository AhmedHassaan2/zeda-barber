"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLang } from "@/lib/language-context";

const allImages = [
  "/images/gallery/468327681_18072331459624568_4549114272353535235_n.jpg",
  "/images/gallery/491957006_1197250025744875_8121157652049572953_n.jpg",
  "/images/gallery/492121218_1196050999198111_2191836169187809032_n.jpg",
  "/images/gallery/492301544_1198853925584485_7383226821735499964_n.jpg",
  "/images/gallery/492308762_1196051075864770_2871749411909240801_n.jpg",
  "/images/gallery/492529379_1197942759008935_7471260529715659363_n.jpg",
  "/images/gallery/492743544_1202793691857175_2808102277908242464_n.jpg",
  "/images/gallery/492766221_1198648338938377_6383516745779606074_n.jpg",
  "/images/gallery/493033862_1198641558939055_6311818912982030960_n.jpg",
  "/images/gallery/493667387_1200075862128958_2858750981845021822_n.jpg",
  "/images/gallery/493730180_1198705338932677_1436580683828809032_n.jpg",
  "/images/gallery/493828058_1198128032323741_6278242133261294787_n.jpg",
  "/images/gallery/494010486_1202267578576453_4870738728325903165_n.jpg",
  "/images/gallery/494026215_1198853875584490_2288433565451375989_n.jpg",
  "/images/gallery/494378682_1203575645112313_8006465965552002519_n.jpg",
  "/images/gallery/494742248_1201977461938798_2468711308119584394_n.jpg",
  "/images/gallery/494993567_1205660781570466_3290335393388690146_n.jpg",
  "/images/gallery/495471261_1212114640925080_2153294095519081563_n.jpg",
  "/images/gallery/495929226_9776652112422869_6985393802488355846_n.jpg",
  "/images/gallery/496004938_9779103165511097_2020062971222317752_n.jpg",
  "/images/gallery/496160865_9776651779089569_4818768242624294456_n.jpg",
  "/images/gallery/496189881_9776652035756210_7898871074003444506_n.jpg",
  "/images/gallery/496297974_9776652065756207_8725450829849729746_n.jpg",
  "/images/gallery/496297974_9776652069089540_2353689074147662881_n.jpg",
  "/images/gallery/496302753_9776652085756205_1408865448536890140_n.jpg",
  "/images/gallery/496303476_9776652219089525_4681203186480503916_n.jpg",
  "/images/gallery/496455839_9779103102177770_6007640834323105945_n.jpg",
  "/images/gallery/496768707_9776651782422902_9217364276416300847_n.jpg",
  "/images/gallery/496903703_9776652135756200_6202027649011256111_n.jpg",
  "/images/gallery/497446437_1216173363852541_8550062761273120053_n.jpg",
  "/images/gallery/497461265_1212195970916947_2548490701373600284_n.jpg",
  "/images/gallery/497569961_1215958917207319_6699174034186521493_n.jpg",
  "/images/gallery/498289337_1217485193721358_8628195168247963069_n.jpg",
  "/images/gallery/499245028_1247174380752439_8043086984835155399_n.jpg",
  "/images/gallery/500447579_1227866986016512_3051013367265973821_n.jpg",
  "/images/gallery/508031367_1243787651091112_3037355493271715130_n.jpg",
  "/images/gallery/508754082_1245545057582038_159145249846184801_n.jpg",
  "/images/gallery/511272398_1251312570338620_6485911036767598591_n.jpg",
  "/images/gallery/514170513_23913059208355589_5840392452239395954_n.jpg",
  "/images/gallery/514254455_23913059398355570_2120820697401871400_n.jpg",
  "/images/gallery/514281759_23913059385022238_358470523215619406_n.jpg",
  "/images/gallery/514286924_23913059181688925_887411857509650826_n.jpg",
  "/images/gallery/514338173_23913059481688895_2318960558159045172_n.jpg",
  "/images/gallery/514370354_23913059455022231_4203694121292258962_n.jpg",
  "/images/gallery/516496150_18093045592624568_3349725882606123794_n.jpg",
  "/images/gallery/545023205_1318217283648148_3213918343848301411_n.jpg",
  "/images/gallery/577003479_25035577582770407_2321162728448511764_n.jpg",
  "/images/gallery/588674762_25167792149548949_6357843857433924650_n.jpg",
  "/images/gallery/592377028_25222636797397817_2394038763618014531_n.jpg",
  "/images/gallery/593423974_25268481672813329_2011784545966449498_n.jpg",
  "/images/gallery/596712368_25285504694444360_5993616670848800234_n.jpg",
  "/images/gallery/602015427_25376438408684321_266308324224746662_n.jpg",
  "/images/gallery/603049282_25413855261609302_1323564393402858574_n.jpg",
  "/images/gallery/672677224_1510194437783764_8581392400928436132_n.jpg",
  "/images/gallery/672686000_1510194414450433_3968190338706727211_n.jpg",
  "/images/gallery/673056367_1510194334450441_8426752878568343485_n.jpg",
  "/images/gallery/678348692_1514312810705260_6233799363045166842_n.jpg",
  "/images/gallery/678550128_1513426827460525_1856549936068259826_n.jpg",
  "/images/gallery/678958095_1514312154038659_96953182783763923_n.jpg",
  "/images/gallery/679563647_1515353360601205_1672773510048348727_n.jpg",
  "/images/gallery/702326887_1536828065120401_1939800862517844572_n.jpg",
];

const VISIBLE_COUNT = 12;

export default function GalleryPreview() {
  const { t } = useLang();
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visibleImages = allImages.slice(startIndex, startIndex + VISIBLE_COUNT);

  const advance = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % allImages.length);
  }, []);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(advance, 8000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, advance]);

  return (
    <section className="relative py-16 md:py-24">
      <div className="section-divider w-full mb-16 md:mb-24"></div>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
          <div>
            <span className="font-label-caps text-label-caps text-primary block mb-4">{t("gallery.subtitle")}</span>
            <h2 className="font-display-lg text-headline-lg">{t("gallery.title")}</h2>
          </div>
          <Link
            href="/gallery"
            className="font-button text-button uppercase text-primary hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            {t("gallery.all")}
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
        <div
          className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {visibleImages.map((src, i) => (
            <div
              key={`${startIndex}-${i}`}
              className="overflow-hidden group relative cursor-pointer rounded-sm animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={src}
                alt={`Gallery ${((startIndex + i) % allImages.length) + 1}`}
                className="w-full h-full object-cover aspect-[4/5] img-grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-label-caps text-primary uppercase tracking-wider">ZEDA</span>
              </div>
            </div>
          ))}
        </div>
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.min(6, Math.ceil(allImages.length / VISIBLE_COUNT)) }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                Math.floor(startIndex / VISIBLE_COUNT) % Math.ceil(allImages.length / VISIBLE_COUNT) === i
                  ? "bg-primary w-6"
                  : "bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
