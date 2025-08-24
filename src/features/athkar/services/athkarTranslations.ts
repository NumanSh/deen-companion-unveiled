
// Basic translation mapping for common Arabic athkar phrases
export const ATHKAR_TRANSLATIONS: Record<string, string> = {
  "سُبْحَانَ اللَّهِ": "Glory be to Allah",
  "الْحَمْدُ لِلَّهِ": "Praise be to Allah", 
  "اللَّهُ أَكْبَرُ": "Allah is the Greatest",
  "لَا إلَه إلّا اللهُ": "There is no god but Allah",
  "أسْتَغْفِرُ اللهَ": "I seek forgiveness from Allah",
  "بِسْمِ اللهِ": "In the name of Allah",
  "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ": "Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire",
  "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ": "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers"
};

export const translateAthkarText = (arabicText: string): string => {
  // Check for exact matches first
  if (ATHKAR_TRANSLATIONS[arabicText]) {
    return ATHKAR_TRANSLATIONS[arabicText];
  }
  
  // Check for partial matches with common phrases
  for (const [arabic, english] of Object.entries(ATHKAR_TRANSLATIONS)) {
    if (arabicText.includes(arabic)) {
      return english + " (and more)";
    }
  }
  
  // Provide generic translations based on content
  if (arabicText.includes("اللّهُـمَّ")) {
    return "O Allah... (Prayer/Supplication)";
  }
  if (arabicText.includes("أَصْـبَحْنا")) {
    return "We have entered the morning... (Morning remembrance)";
  }
  if (arabicText.includes("أَمْسَيْـنا")) {
    return "We have entered the evening... (Evening remembrance)";
  }
  if (arabicText.includes("رَبِّ")) {
    return "My Lord... (Supplication)";
  }
  
  return "Islamic remembrance/supplication";
};
