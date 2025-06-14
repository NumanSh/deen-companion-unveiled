
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sunrise, Sunset, Heart, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Dhikr = {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
  repetitions?: string;
};

const morningAdhkar: Dhikr[] = [
  {
    id: "morning-1",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal-mulku lillahi, walhamdu lillahi, la ilaha illa Allahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer",
    translation: "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
    reference: "Abu Dawud",
    repetitions: "Once"
  },
  {
    id: "morning-2",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namootu, wa ilaykan-nushoor",
    translation: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.",
    reference: "Tirmidhi",
    repetitions: "Once"
  },
  {
    id: "morning-3",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
    transliteration: "Allahumma anta rabbee la ilaha illa ant, khalaqtanee wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mas-tata't",
    translation: "O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am Your servant and I abide to Your covenant and promise as best I can.",
    reference: "Bukhari",
    repetitions: "Once"
  },
  {
    id: "morning-4",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ رَسُولًا",
    transliteration: "Radeetu billahi rabban, wa bil-Islami deenan, wa bi Muhammadin rasoolan",
    translation: "I am pleased with Allah as a Lord, and Islam as a religion and Muhammad as a Messenger.",
    reference: "Abu Dawud",
    repetitions: "3 times"
  }
];

const eveningAdhkar: Dhikr[] = [
  {
    id: "evening-1",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Amsayna wa amsal-mulku lillahi, walhamdu lillahi, la ilaha illa Allahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer",
    translation: "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.",
    reference: "Abu Dawud",
    repetitions: "Once"
  },
  {
    id: "evening-2",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namootu, wa ilaykal-maseer",
    translation: "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and die and unto You is our return.",
    reference: "Tirmidhi",
    repetitions: "Once"
  },
  {
    id: "evening-3",
    arabic: "اللَّهُمَّ أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ",
    transliteration: "Allahumma a'oodhu bika min sharri ma khalaqt",
    translation: "O Allah, I take refuge in You from the evil of what You have created.",
    reference: "Muslim",
    repetitions: "3 times"
  },
  {
    id: "evening-4",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhee la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa huwas-samee'ul-'aleem",
    translation: "In the name of Allah with whose name nothing is harmed on earth nor in the heavens and He is The All-Hearing, The All-Knowing.",
    reference: "Abu Dawud, Tirmidhi",
    repetitions: "3 times"
  }
];

const MorningEveningAdhkar: React.FC = () => {
  const [activeTime, setActiveTime] = useState<'morning' | 'evening'>('morning');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedDhikr, setExpandedDhikr] = useState<string | null>(null);

  const toggleFavorite = (dhikrId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dhikrId)) {
      newFavorites.delete(dhikrId);
    } else {
      newFavorites.add(dhikrId);
    }
    setFavorites(newFavorites);
  };

  const currentAdhkar = activeTime === 'morning' ? morningAdhkar : eveningAdhkar;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <BookOpen className="w-5 h-5 text-teal-600" />
          اذكار الصباح والمساء
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          Morning and Evening Remembrance of Allah
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Time Selection */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Button
            variant={activeTime === 'morning' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTime('morning')}
            className={cn(
              "flex-1 flex items-center gap-2",
              activeTime === 'morning' 
                ? "bg-orange-500 hover:bg-orange-600 text-white" 
                : "hover:bg-orange-100 dark:hover:bg-orange-900/20"
            )}
          >
            <Sunrise className="w-4 h-4" />
            اذكار الصباح
          </Button>
          <Button
            variant={activeTime === 'evening' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTime('evening')}
            className={cn(
              "flex-1 flex items-center gap-2",
              activeTime === 'evening' 
                ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
                : "hover:bg-indigo-100 dark:hover:bg-indigo-900/20"
            )}
          >
            <Sunset className="w-4 h-4" />
            اذكار المساء
          </Button>
        </div>

        {/* Time Info */}
        <div className={cn(
          "p-3 rounded-lg text-center text-sm",
          activeTime === 'morning' 
            ? "bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200"
            : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200"
        )}>
          {activeTime === 'morning' 
            ? "Recite these adhkar from Fajr until sunrise (approximately 15 minutes after sunrise)"
            : "Recite these adhkar from Maghrib until Isha prayer time"
          }
        </div>

        {/* Adhkar List */}
        <div className="space-y-4">
          {currentAdhkar.map((dhikr, index) => (
            <div
              key={dhikr.id}
              className="border rounded-lg p-4 space-y-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white",
                    activeTime === 'morning' ? "bg-orange-500" : "bg-indigo-500"
                  )}>
                    {index + 1}
                  </div>
                  {dhikr.repetitions && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {dhikr.repetitions}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(dhikr.id)}
                  className="h-8 w-8"
                >
                  <Heart
                    className={cn(
                      "w-4 h-4",
                      favorites.has(dhikr.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    )}
                  />
                </Button>
              </div>

              {/* Arabic Text */}
              <div className="text-right">
                <p className="text-xl leading-loose font-arabic" dir="rtl">
                  {dhikr.arabic}
                </p>
              </div>

              {/* Transliteration */}
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Transliteration:</p>
                <p className="text-sm italic text-gray-700 dark:text-gray-300">
                  {dhikr.transliteration}
                </p>
              </div>

              {/* Translation and Reference */}
              {(expandedDhikr === dhikr.id) && (
                <div className="space-y-3 border-t pt-3">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">Translation:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {dhikr.translation}
                    </p>
                  </div>
                  
                  {dhikr.reference && (
                    <div>
                      <p className="text-sm font-medium text-purple-600 mb-1">Reference:</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {dhikr.reference}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedDhikr(expandedDhikr === dhikr.id ? null : dhikr.id)}
                className="text-xs"
              >
                {expandedDhikr === dhikr.id ? "Show less" : "Show translation"}
              </Button>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <p>May Allah accept your dhikr and grant you His protection and blessings.</p>
          <p className="mt-1 font-arabic text-sm">بارك الله فيكم</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MorningEveningAdhkar;
