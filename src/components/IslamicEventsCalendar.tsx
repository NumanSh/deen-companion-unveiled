
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IslamicEvent {
  id: string;
  name: string;
  arabicName: string;
  date: string;
  hijriDate: string;
  type: 'religious' | 'historical' | 'seasonal';
  significance: string;
  description: string;
  practices: string[];
  isToday?: boolean;
  daysUntil?: number;
}

const IslamicEventsCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<IslamicEvent | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<IslamicEvent[]>([]);
  const { toast } = useToast();

  const islamicEvents: IslamicEvent[] = [
    {
      id: 'event-1',
      name: 'Ashura',
      arabicName: 'يوم عاشوراء',
      date: '2024-07-17',
      hijriDate: '10 Muharram 1446',
      type: 'religious',
      significance: 'Day of fasting and remembrance',
      description: 'The 10th day of Muharram, observed by fasting and reflection. It commemorates various historical events including the day Moses and the Israelites were saved from Pharaoh.',
      practices: ['Fasting', 'Extra prayers', 'Charity', 'Reading Quran', 'Reflection and remembrance']
    },
    {
      id: 'event-2',
      name: 'Mawlid al-Nabi',
      arabicName: 'المولد النبوي',
      date: '2024-09-15',
      hijriDate: '12 Rabi al-Awwal 1446',
      type: 'religious',
      significance: 'Birth of Prophet Muhammad (PBUH)',
      description: 'Celebration of the birth of Prophet Muhammad (peace be upon him). A time for learning about his life, character, and teachings.',
      practices: ['Reciting Quran', 'Learning about Prophet\'s life', 'Acts of charity', 'Community gatherings', 'Sending blessings upon the Prophet']
    },
    {
      id: 'event-3',
      name: 'Isra and Mi\'raj',
      arabicName: 'الإسراء والمعراج',
      date: '2024-01-28',
      hijriDate: '17 Rajab 1445',
      type: 'religious',
      significance: 'Night Journey and Ascension',
      description: 'Commemorates the Prophet\'s miraculous night journey from Mecca to Jerusalem and his ascension to heaven, where he received the command for five daily prayers.',
      practices: ['Night prayers', 'Reciting Quran', 'Reflection on the journey', 'Learning about the event', 'Spiritual contemplation']
    },
    {
      id: 'event-4',
      name: 'Laylat al-Qadr',
      arabicName: 'ليلة القدر',
      date: '2024-04-05',
      hijriDate: '27 Ramadan 1445',
      type: 'religious',
      significance: 'Night of Power',
      description: 'The night when the first verses of the Quran were revealed to Prophet Muhammad. It is better than a thousand months and falls during the last ten nights of Ramadan.',
      practices: ['Intensive prayer', 'Quran recitation', 'Seeking forgiveness', 'Supplication', 'Spiritual reflection']
    },
    {
      id: 'event-5',
      name: 'Day of Arafah',
      arabicName: 'يوم عرفة',
      date: '2024-06-15',
      hijriDate: '9 Dhul Hijjah 1445',
      type: 'religious',
      significance: 'Holiest day for pilgrims',
      description: 'The second day of Hajj pilgrimage, when pilgrims gather at Mount Arafat. For non-pilgrims, it\'s a recommended day of fasting.',
      practices: ['Fasting (for non-pilgrims)', 'Increased dhikr', 'Duaa', 'Seeking forgiveness', 'Charity']
    },
    {
      id: 'event-6',
      name: 'Eid al-Fitr',
      arabicName: 'عيد الفطر',
      date: '2024-04-10',
      hijriDate: '1 Shawwal 1445',
      type: 'religious',
      significance: 'Festival of Breaking the Fast',
      description: 'Celebration marking the end of Ramadan, the Islamic holy month of fasting.',
      practices: ['Eid prayer', 'Zakat al-Fitr', 'Family gatherings', 'Gift giving', 'Feasting', 'Charity']
    }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    calculateUpcomingEvents();
  }, []);

  const calculateUpcomingEvents = () => {
    const today = new Date();
    const events = islamicEvents.map(event => {
      const eventDate = new Date(event.date);
      const diffTime = eventDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return {
        ...event,
        daysUntil: diffDays,
        isToday: diffDays === 0
      };
    }).filter(event => event.daysUntil! >= 0).sort((a, b) => a.daysUntil! - b.daysUntil!);

    setUpcomingEvents(events.slice(0, 3));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'religious': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
      case 'historical': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
      case 'seasonal': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Upcoming Events */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600" />
            Upcoming Islamic Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  event.isToday 
                    ? 'bg-yellow-100 dark:bg-yellow-800/30 border-2 border-yellow-400' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {event.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400" dir="rtl">
                      {event.arabicName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {event.hijriDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <p className="text-sm font-medium mt-1 text-purple-600 dark:text-purple-400">
                      {event.isToday ? 'Today!' : `${event.daysUntil} days`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Islamic Events Calendar
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[200px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {islamicEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {event.name}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1" dir="rtl">
                  {event.arabicName}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <Clock className="w-3 h-3" />
                  {event.hijriDate}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {event.significance}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Card className="border-2 border-purple-200 dark:border-purple-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400" dir="rtl">
                  {selectedEvent.arabicName}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedEvent(null)}
                className="text-gray-500"
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{selectedEvent.hijriDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(selectedEvent.type)}`}>
                  {selectedEvent.type}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Significance:</h4>
              <p className="text-gray-700 dark:text-gray-300">{selectedEvent.significance}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description:</h4>
              <p className="text-gray-700 dark:text-gray-300">{selectedEvent.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommended Practices:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedEvent.practices.map((practice, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                    {practice}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IslamicEventsCalendar;
