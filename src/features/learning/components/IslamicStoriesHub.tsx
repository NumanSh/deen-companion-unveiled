
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Star, Heart, Clock, ArrowLeft } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  category: 'prophets' | 'companions' | 'scholars' | 'moral';
  readTime: number;
  excerpt: string;
  content: string;
  lesson: string;
  tags: string[];
}

const IslamicStoriesHub: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const stories: Story[] = [
    {
      id: '1',
      title: 'Prophet Ibrahim (AS) and the Fire',
      category: 'prophets',
      readTime: 5,
      excerpt: 'The story of Prophet Ibrahim\'s unwavering faith when thrown into the fire by King Nimrod.',
      content: `When Prophet Ibrahim (AS) called his people to worship Allah alone and reject idols, King Nimrod became furious. He ordered Ibrahim to be thrown into a great fire as punishment.

As Ibrahim was being thrown into the flames, the angel Jibril (AS) came to him and asked, "Do you need anything?" Ibrahim replied, "From you, nothing. But from Allah, yes - He knows my condition."

Allah commanded the fire: "O fire! Be cool and safe for Ibrahim!" The fire became cool and caused no harm to Ibrahim. When the people looked, they found Ibrahim sitting peacefully in the fire, completely unharmed.

This miracle amazed everyone and proved Allah's power to protect His faithful servants.`,
      lesson: 'True faith in Allah brings divine protection. When we trust in Allah completely, He will never abandon us in our time of need.',
      tags: ['faith', 'miracle', 'trust', 'protection']
    },
    {
      id: '2',
      title: 'Abu Bakr (RA) - The Truthful Friend',
      category: 'companions',
      readTime: 4,
      excerpt: 'How Abu Bakr\'s immediate belief in the Prophet\'s night journey earned him the title "As-Siddiq" (The Truthful).',
      content: `When the Prophet Muhammad (PBUH) told the people about his night journey (Isra and Mi'raj) from Mecca to Jerusalem and then to the heavens, many people found it hard to believe.

Some came to Abu Bakr (RA) and said mockingly, "Your friend claims he traveled to Jerusalem in one night and came back! Do you believe this?"

Without hesitation, Abu Bakr replied, "If he said it, then I believe it. I believe him in matters of revelation from heaven, so why shouldn't I believe him in this?"

When Abu Bakr met the Prophet, he said, "O Messenger of Allah, did you really travel to Jerusalem last night?" The Prophet confirmed it, and Abu Bakr immediately said, "I believe you."

From that day, the Prophet called him "As-Siddiq" (The Truthful One).`,
      lesson: 'True friendship means having complete trust and faith in those we love, especially when others doubt them.',
      tags: ['friendship', 'belief', 'loyalty', 'trust']
    },
    {
      id: '3',
      title: 'The Woman and the Cat',
      category: 'moral',
      readTime: 3,
      excerpt: 'A powerful lesson about kindness to animals and how our treatment of all creatures matters to Allah.',
      content: `The Prophet Muhammad (PBUH) told his companions about a woman who was known for her prayers and worship. People thought she was very righteous.

However, this woman had a cat that she kept locked up. She neither fed the cat nor allowed it to roam free to find food for itself. The poor cat died of hunger and thirst.

Despite all her prayers and acts of worship, this woman was punished by Allah and entered Hellfire because of her cruelty to the cat.

The Prophet also told them about another person who gave water to a thirsty dog, and because of this single act of kindness, Allah forgave all their sins and granted them Paradise.`,
      lesson: 'Islam teaches us that kindness to all of Allah\'s creatures, even the smallest ones, is highly rewarded, while cruelty is severely punished.',
      tags: ['kindness', 'animals', 'compassion', 'justice']
    },
    {
      id: '4',
      title: 'Imam Ahmed and the Baker',
      category: 'scholars',
      readTime: 6,
      excerpt: 'How Imam Ahmed ibn Hanbal learned about true patience and perseverance from a simple baker.',
      content: `During the trial of Imam Ahmed ibn Hanbal, when he was being persecuted for refusing to accept the Mu'tazila doctrine, he was imprisoned and tortured.

One night, while being taken to prison, he passed by a baker's shop. The baker was being beaten by some officials for not paying bribes, but he remained patient and didn't complain.

Imam Ahmed asked the baker, "How do you bear this suffering so patiently?"

The baker replied, "O Imam, I am just a simple baker being tested for worldly matters. But you are being tested for your faith and the truth of Islam. If a baker can be patient for bread, surely a scholar can be patient for the sake of Allah's religion."

These words gave Imam Ahmed great strength, and he realized that his test was far more noble than any worldly trial.`,
      lesson: 'Sometimes wisdom and strength come from the most unexpected sources. Every test from Allah is an opportunity to prove our faith.',
      tags: ['patience', 'wisdom', 'persecution', 'strength']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Stories', icon: '📚' },
    { id: 'prophets', name: 'Prophets', icon: '⭐' },
    { id: 'companions', name: 'Companions', icon: '🤝' },
    { id: 'scholars', name: 'Scholars', icon: '🎓' },
    { id: 'moral', name: 'Moral Tales', icon: '💡' }
  ];

  const filteredStories = stories.filter(story => 
    selectedCategory === 'all' || story.category === selectedCategory
  );

  if (selectedStory) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedStory(null)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              {selectedStory.title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {categories.find(c => c.id === selectedStory.category)?.icon} {selectedStory.category}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {selectedStory.readTime} min read
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-6 pr-4">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedStory.content}
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Lesson
                </h4>
                <p className="text-amber-700 dark:text-amber-300 italic">
                  {selectedStory.lesson}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedStory.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          Islamic Stories Hub
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Stories List */}
        <ScrollArea className="h-96">
          <div className="space-y-4 pr-4">
            {filteredStories.map(story => (
              <Card
                key={story.id}
                className="cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10"
                onClick={() => setSelectedStory(story)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                        {story.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {categories.find(c => c.id === story.category)?.icon}
                        </Badge>
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {story.readTime}m
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {story.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {story.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {story.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{story.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700">
                        Read Story →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default IslamicStoriesHub;
