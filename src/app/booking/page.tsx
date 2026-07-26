"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLang } from "@/lib/language-context";

const servicesList = [
  { id: "classic", nameKey: "services.name1" },
  { id: "beard", nameKey: "services.name2" },
  { id: "facial", nameKey: "services.name3" },
  { id: "modern", nameKey: "services.name4" },
  { id: "kids", nameKey: "services.name5" },
  { id: "deepclean", nameKey: "services.name6" },
  { id: "groom", nameKey: "services.name7" },
];

const barberData = [
  { id: "any", nameKey: "booking.barber_any", titleKey: "booking.barber_any_title", descKey: "booking.barber_any_desc" },
  { id: "zeda", nameKey: "team.name1", titleKey: "team.role1", descKey: "team.exp1" },
  { id: "moaz", nameKey: "team.name2", titleKey: "team.role2", descKey: "team.exp2" },
  { id: "mustafa", nameKey: "team.name3", titleKey: "team.role3", descKey: "team.exp3" },
  { id: "mohamed", nameKey: "team.name4", titleKey: "team.role4", descKey: "team.exp4" },
  { id: "abdullah", nameKey: "team.name5", titleKey: "team.role5", descKey: "team.exp5" },
];

const timeSlots = [
  "10:00 AM", "11:15 AM", "12:30 PM", "1:30 PM",
  "3:00 PM", "4:15 PM", "5:30 PM", "7:00 PM", "8:30 PM", "9:45 PM",
];

const monthNamesAr = [
  "يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو",
  "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر",
];

const monthNamesEn = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const dayHeadersAr = ["ح", "ن", "ث", "ر", "خ", "ج", "س"];
const dayHeadersEn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const { t, lang } = useLang();
  const searchParams = useSearchParams();
  const styleImage = searchParams.get("style") || "";
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const barbers = barberData.map((b) => ({
    ...b,
    name: t(b.nameKey),
    title: t(b.titleKey),
    desc: t(b.descKey),
  }));

  const services = servicesList.map((s) => ({
    ...s,
    name: t(s.nameKey),
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = lang === "ar" ? monthNamesAr : monthNamesEn;
  const dayHeaders = lang === "ar" ? dayHeadersAr : dayHeadersEn;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const isDateAvailable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date >= today;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate("");
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate("");
  };

  const bookingSummary = [
    selectedServices.length > 0
      ? `${t("booking.summary_services")}: ${selectedServices.map((id) => services.find((s) => s.id === id)?.name).join("، ")}`
      : "",
    selectedBarber ? `${t("booking.summary_barber")}: ${barbers.find((b) => b.id === selectedBarber)?.name}` : "",
    selectedDate && selectedTime ? `${t("booking.summary_date")}: ${selectedDate} ${t("booking.summary_at")} ${selectedTime}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-16 justify-center">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-button text-button ${
                  step >= s ? "bg-primary text-surface" : "bg-surface-variant text-on-surface-variant"
                }`}
              >
                {s}
              </div>
              {s < 4 && <div className={`w-16 h-px ${step > s ? "bg-primary" : "bg-outline-variant"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <section>
            <h2 className="font-display-lg text-headline-md mb-8 text-center">{t("booking.step1")}</h2>
            <p className="font-body-md text-on-surface-variant text-center mb-12">{t("booking.step1_desc")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-6 rounded-lg border text-right transition-all duration-300 ${
                    selectedServices.includes(service.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-outline-variant/30 bg-surface-container hover:border-primary/50"
                  }`}
                >
                  <span className="font-display-lg text-headline-md">{service.name}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setStep(2)}
                disabled={selectedServices.length === 0}
                className="px-10 py-4 bg-primary text-surface font-button text-button uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {t("booking.next")}
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="font-display-lg text-headline-md mb-8 text-center">{t("booking.step2")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {barbers.map((barber) => (
                <button
                  key={barber.id}
                  onClick={() => setSelectedBarber(barber.id)}
                  className={`p-6 rounded-lg border text-right transition-all duration-300 ${
                    selectedBarber === barber.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-outline-variant/30 bg-surface-container hover:border-primary/50"
                  }`}
                >
                  <span className="font-label-caps text-label-caps text-primary mb-1 block">{barber.title}</span>
                  <h3 className="font-display-lg text-headline-md uppercase mb-2">{barber.name}</h3>
                  <p className="font-body-md text-sm text-on-surface-variant">{barber.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-12">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-3 border border-outline-variant text-on-surface-variant font-button text-button uppercase hover:bg-surface-variant transition-all"
              >
                {t("booking.prev")}
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedBarber}
                className="px-10 py-4 bg-primary text-surface font-button text-button uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {t("booking.next")}
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="font-display-lg text-headline-md mb-8 text-center">{t("booking.step3")}</h2>
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-8">
                <button onClick={prevMonth} className="text-primary p-2">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
                <h3 className="font-display-lg text-headline-md">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button onClick={nextMonth} className="text-primary p-2">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {dayHeaders.map((d) => (
                  <div key={d} className="text-center font-label-caps text-label-caps text-on-surface-variant py-2">
                    {d}
                  </div>
                ))}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${day}/${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`;
                  const available = isDateAvailable(day);
                  return (
                    <button
                      key={day}
                      disabled={!available}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedDate === dateStr
                          ? "bg-primary text-surface"
                          : available
                          ? "hover:bg-surface-variant text-on-surface"
                          : "text-outline-variant/30 cursor-not-allowed"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              {selectedDate && (
                <>
                  <h3 className="font-display-lg text-headline-md mb-6 text-center">{t("booking.available_times")}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          selectedTime === time
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-outline-variant/30 hover:border-primary/50 text-on-surface"
                        }`}
                      >
                        <span className="font-body-md text-sm">{time}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center gap-6 mt-12">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 border border-outline-variant text-on-surface-variant font-button text-button uppercase hover:bg-surface-variant transition-all"
              >
                {t("booking.prev")}
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!selectedDate || !selectedTime}
                className="px-10 py-4 bg-primary text-surface font-button text-button uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {t("booking.next")}
              </button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="font-display-lg text-headline-md mb-8 text-center">{t("booking.step4")}</h2>
            <div className="max-w-md mx-auto space-y-8">
              <div>
                <label className="font-label-caps text-label-caps text-primary block mb-2">{t("booking.name_label")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("booking.name_placeholder")}
                  className="w-full p-4 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none transition-colors"
                  dir="rtl"
                />
              </div>
              <div className="p-6 rounded-lg bg-surface-container border border-outline-variant/30">
                <h3 className="font-label-caps text-label-caps text-primary mb-4">{t("booking.summary")}</h3>
                <div className="space-y-2 font-body-md">
                  {styleImage && (
                    <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/30">
                      <img src={styleImage} alt="" className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="text-on-surface text-sm font-bold">الاستايل المختار</p>
                        <p className="text-on-surface-variant text-xs">تم اختيار الصورة من المعرض</p>
                      </div>
                    </div>
                  )}
                  {selectedServices.map((id) => {
                    const s = services.find((sv) => sv.id === id);
                    return s ? <p key={id} className="text-on-surface">{s.name}</p> : null;
                  })}
                  <p className="text-on-surface-variant">
                    {t("booking.summary_barber")}: {barbers.find((b) => b.id === selectedBarber)?.name}
                  </p>
                  <p className="text-on-surface-variant">
                    {t("booking.summary_date")}: {selectedDate} {t("booking.summary_at")} {selectedTime}
                  </p>
                  {name && <p className="text-primary">{t("booking.name_label")}: {name}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={`https://wa.me/201069389235?text=${encodeURIComponent(
                    `حجز موعد في ZEDA BARBER SHOP\n------------------------\n${styleImage ? "الاستايل: " + styleImage + "\n" : ""}${selectedServices.map((id) => services.find((s) => s.id === id)?.name).join("، ")}\nالحلاق: ${barbers.find((b) => b.id === selectedBarber)?.name}\nالموعد: ${selectedDate} الساعة ${selectedTime}\nالاسم: ${name || "لم يحدد"}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-5 bg-primary text-surface font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  {t("booking.confirm")}
                </a>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-12">
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3 border border-outline-variant text-on-surface-variant font-button text-button uppercase hover:bg-surface-variant transition-all"
              >
                {t("booking.prev")}
              </button>
            </div>
          </section>
        )}
      </main>
      <div className="h-32 bg-gradient-to-b from-surface to-black"></div>
      <Footer />
    </>
  );
}
