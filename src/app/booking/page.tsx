"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const servicesList = [
  { id: "classic", name: "حلاقة شعر كلاسيكية" },
  { id: "beard", name: "تهذيب وتصفيف اللحية" },
  { id: "facial", name: "عناية كاملة بالوجه" },
  { id: "modern", name: "حلاقة شبابية عصرية" },
  { id: "kids", name: "قص أطفال" },
  { id: "deepclean", name: "تنظيف عميق للبشرة" },
  { id: "groom", name: "بكيدج العريس" },
];

const barbers = [
  { id: "any", name: "أول حلاق متاح", title: "متاح", desc: "اختر أقرب موعد متاح مع أي من حلاقينا" },
  { id: "zeda", name: "زيدا", title: "المؤسس والحلاق الأول", desc: "١٥ سنة خبرة - مؤسس صالون ZEDA" },
  { id: "moaz", name: "معاذ", title: "حلاق محترف", desc: "١٠ سنوات خبرة - خبير تشذيب اللحية" },
  { id: "mustafa", name: "مصطفى", title: "حلاق متخصص", desc: "٨ سنوات خبرة - متخصص قص أطفال" },
  { id: "mohamed", name: "محمد", title: "حلاق أول", desc: "١٢ سنة خبرة - خبير بكيدج العريس" },
  { id: "abdullah", name: "عبدالله", title: "حلاق مبدع", desc: "٦ سنوات خبرة - مبدع قصات شبابية" },
];

const timeSlots = [
  "10:00 AM", "11:15 AM", "12:30 PM", "1:30 PM",
  "3:00 PM", "4:15 PM", "5:30 PM", "7:00 PM", "8:30 PM", "9:45 PM",
];

export default function BookingPage() {
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = [
    "يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو",
    "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر",
  ];

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
      ? `الخدمات: ${selectedServices.map((id) => servicesList.find((s) => s.id === id)?.name).join("، ")}`
      : "",
    selectedBarber ? `الحلاق: ${barbers.find((b) => b.id === selectedBarber)?.name}` : "",
    selectedDate && selectedTime ? `التاريخ: ${selectedDate} الساعة ${selectedTime}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const handleConfirm = () => {
    const message = `حجز موعد في ZEDA BARBER SHOP
------------------------
${bookingSummary}
------------------------
الاسم: ${name}`;
    const url = `https://wa.me/201069389235?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">
        {/* Step indicator */}
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

        {/* Step 1: Services */}
        {step === 1 && (
          <section>
            <h2 className="font-display-lg text-headline-md mb-8 text-center">اختر الخدمات</h2>
            <p className="font-body-md text-on-surface-variant text-center mb-12">اختر الخدمات التي تريدها</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map((service) => (
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
                متابعة
              </button>
            </div>
          </section>
        )}

        {/* Step 2: Barbers */}
        {step === 2 && (
          <section>
            <h2 className="font-display-lg text-headline-md mb-8 text-center">اختر الحلاق</h2>
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
                السابق
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedBarber}
                className="px-10 py-4 bg-primary text-surface font-button text-button uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                متابعة
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <section>
            <h2 className="font-display-lg text-headline-md mb-8 text-center">اختر الموعد</h2>
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
                {["ح", "ن", "ث", "ر", "خ", "ج", "س"].map((d) => (
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
                  <h3 className="font-display-lg text-headline-md mb-6 text-center">المواعيد المتاحة</h3>
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
                السابق
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!selectedDate || !selectedTime}
                className="px-10 py-4 bg-primary text-surface font-button text-button uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                متابعة
              </button>
            </div>
          </section>
        )}

        {/* Step 4: Name + Confirm */}
        {step === 4 && (
          <section>
            <h2 className="font-display-lg text-headline-md mb-8 text-center">تأكيد الحجز</h2>
            <div className="max-w-md mx-auto space-y-8">
              <div>
                <label className="font-label-caps text-label-caps text-primary block mb-2">الاسم كامل</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتب اسمك"
                  className="w-full p-4 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none transition-colors"
                  dir="rtl"
                />
              </div>
              <div className="p-6 rounded-lg bg-surface-container border border-outline-variant/30">
                <h3 className="font-label-caps text-label-caps text-primary mb-4">ملخص الحجز</h3>
                <div className="space-y-2 font-body-md">
                  {selectedServices.map((id) => {
                    const s = servicesList.find((sv) => sv.id === id);
                    return s ? <p key={id} className="text-on-surface">{s.name}</p> : null;
                  })}
                  <p className="text-on-surface-variant">
                    الحلاق: {barbers.find((b) => b.id === selectedBarber)?.name}
                  </p>
                  <p className="text-on-surface-variant">
                    الموعد: {selectedDate} الساعة {selectedTime}
                  </p>
                  {name && <p className="text-primary">الاسم: {name}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={`https://wa.me/201069389235?text=${encodeURIComponent(
                    `حجز موعد في ZEDA BARBER SHOP\n------------------------\n${selectedServices.map((id) => servicesList.find((s) => s.id === id)?.name).join("، ")}\nالحلاق: ${barbers.find((b) => b.id === selectedBarber)?.name}\nالموعد: ${selectedDate} الساعة ${selectedTime}\nالاسم: ${name || "لم يحدد"}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-5 bg-primary text-surface font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-30"
                >
                  تأكيد عبر واتساب
                </a>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-12">
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3 border border-outline-variant text-on-surface-variant font-button text-button uppercase hover:bg-surface-variant transition-all"
              >
                السابق
              </button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
