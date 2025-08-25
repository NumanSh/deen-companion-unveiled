import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Book, Search, Star, Download, Eye } from 'lucide-react';

interface IslamicBook {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  rating: number;
  pages: number;
  language: string;
  available: boolean;
}

const IslamicBookLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const books: IslamicBook[] = [
    {
      id: '1',
      title: 'Sahih Al-Bukhari',
      author: 'Imam Al-Bukhari',
      category: 'Hadith',
      description: 'The most authentic collection of hadith after the Quran',
      rating: 5,
      pages: 2000,
      language: 'Arabic/English',
      available: true
    },
    {
      id: '2',
      title: 'Tafsir Ibn Kathir',
      author: 'Ibn Kathir',
      category: 'Tafsir',
      description: 'Comprehensive commentary on the Quran',
      rating: 5,
      pages: 3000,
      language: 'Arabic/English',
      available: true
    },
    {
      id: '3',
      title: 'The Sealed Nectar',
      author: 'Safiur Rahman al-Mubarakpuri',
      category: 'Seerah',
      description: 'Biography of Prophet Muhammad (PBUH)',
      rating: 4.8,
      pages: 600,
      language: 'English',
      available: true
    }
  ];

  const categories = ['all', 'Hadith', 'Tafsir', 'Seerah', 'Fiqh', 'Aqeedah'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-600" />
            Islamic Book Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search books, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Books Grid */}
            <div className="grid gap-4">
              {filteredBooks.map(book => (
                <Card key={book.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                        <p className="text-gray-600 mb-2">by {book.author}</p>
                        <p className="text-sm text-gray-500 mb-3">{book.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span>{book.pages} pages</span>
                          <span>{book.language}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {book.rating}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{book.category}</Badge>
                          {book.available && (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Available
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          Read Online
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Book className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No books found matching your criteria</p>
                <p className="text-sm">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IslamicBookLibrary;