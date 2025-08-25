
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Trash2, HardDrive, Wifi, WifiOff } from 'lucide-react';
import { useOfflineQuran } from '@/features/quran';
import { QuranSurah } from '@/features/quran';

interface OfflineQuranManagerProps {
  surahs: QuranSurah[];
}

const OfflineQuranManager: React.FC<OfflineQuranManagerProps> = ({ surahs: allSurahs }) => {
  const {
    surahs: offlineSurahs,
    loading,
    downloadSurah,
    deleteSurah
  } = useOfflineQuran();

  const storagePercentage = Math.min((offlineSurahs.length / 114) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-blue-600" />
          Offline Quran Storage
        </CardTitle>
        <p className="text-sm text-gray-600">
          Download surahs for offline reading when you don't have internet connection
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Storage Stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Storage Usage</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {offlineSurahs.length} surahs downloaded
              </span>
            </div>
          </div>
          <Progress value={storagePercentage} className="h-2" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-blue-600">{offlineSurahs.length}</p>
              <p className="text-xs text-gray-600">Downloaded</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-green-600">
                {114 - offlineSurahs.length}
              </p>
              <p className="text-xs text-gray-600">Available</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-emerald-600">
                114
              </p>
              <p className="text-xs text-gray-600">Total Surahs</p>
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => offlineSurahs.forEach(s => deleteSurah(s.number))}
            disabled={offlineSurahs.length === 0}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        </div>

        {/* Surah List */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Available Surahs</h4>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {allSurahs.slice(0, 20).map((surah) => {
              const isOffline = offlineSurahs.some(s => s.number === surah.number);
              
              return (
                <div
                  key={surah.number}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold">
                      {surah.number}
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">{surah.englishName}</h5>
                      <p className="text-xs text-gray-600">{surah.englishNameTranslation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isOffline ? (
                      <>
                        <WifiOff className="w-4 h-4 text-green-600" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSurah(surah.number)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Wifi className="w-4 h-4 text-gray-400" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadSurah(surah.number)}
                          disabled={loading}
                          className="h-8"
                        >
                          {loading ? (
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {allSurahs.length > 20 && (
            <p className="text-xs text-gray-500 text-center">
              Showing first 20 surahs. Access all surahs from the main Quran tab.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineQuranManager;
