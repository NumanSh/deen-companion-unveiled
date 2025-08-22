import { describe, it, expect } from 'vitest'
import { 
  validateSearchQuery, 
  validateVerseNumber, 
  validateSurahNumber, 
  sanitizeHtml,
  validateDuaText 
} from '@/utils/inputValidation'

describe('validateSearchQuery', () => {
  it('returns valid for empty string', () => {
    const result = validateSearchQuery('')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Search query cannot be empty')
  })

  it('returns valid for normal Arabic text', () => {
    const result = validateSearchQuery('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')
    expect(result.isValid).toBe(true)
    expect(result.sanitized).toBe('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')
  })

  it('returns valid for English text', () => {
    const result = validateSearchQuery('In the name of Allah')
    expect(result.isValid).toBe(true)
    expect(result.sanitized).toBe('In the name of Allah')
  })

  it('returns valid for mixed content', () => {
    const result = validateSearchQuery('بِسْمِ اللَّهِ - In the name of Allah')
    expect(result.isValid).toBe(true)
  })

  it('rejects overly long queries', () => {
    const longQuery = 'a'.repeat(501)
    const result = validateSearchQuery(longQuery)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Search query is too long (max 500 characters)')
  })

  it('sanitizes potentially harmful characters', () => {
    const result = validateSearchQuery('<script>alert("xss")</script>')
    expect(result.isValid).toBe(true)
    expect(result.sanitized).toBe('scriptalert(xss)/script')
  })

  it('validates Arabic-only content when specified', () => {
    const result = validateSearchQuery('English text', 'arabic')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Please enter valid Arabic text')
  })

  it('validates English-only content when specified', () => {
    const result = validateSearchQuery('بِسْمِ اللَّهِ', 'english')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Please enter valid English text')
  })
})

describe('validateVerseNumber', () => {
  it('validates correct verse numbers', () => {
    const result = validateVerseNumber(5, 10)
    expect(result.isValid).toBe(true)
    expect(result.sanitized).toBe('5')
  })

  it('rejects verse numbers below 1', () => {
    const result = validateVerseNumber(0, 10)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Verse number must be between 1 and 10')
  })

  it('rejects verse numbers above maximum', () => {
    const result = validateVerseNumber(15, 10)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Verse number must be between 1 and 10')
  })

  it('handles string inputs', () => {
    const result = validateVerseNumber('5', 10)
    expect(result.isValid).toBe(true)
    expect(result.sanitized).toBe('5')
  })

  it('rejects invalid string inputs', () => {
    const result = validateVerseNumber('abc', 10)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Please enter a valid verse number')
  })
})

describe('validateSurahNumber', () => {
  it('validates correct surah numbers', () => {
    const result = validateSurahNumber(1)
    expect(result.isValid).toBe(true)
    expect(result.sanitized).toBe('1')
  })

  it('rejects surah numbers below 1', () => {
    const result = validateSurahNumber(0)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Surah number must be between 1 and 114')
  })

  it('rejects surah numbers above 114', () => {
    const result = validateSurahNumber(115)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Surah number must be between 1 and 114')
  })

  it('handles string inputs', () => {
    const result = validateSurahNumber('1')
    expect(result.isValid).toBe(true)
    expect(result.sanitized).toBe('1')
  })
})

describe('sanitizeHtml', () => {
  it('escapes HTML special characters', () => {
    const input = '<script>alert("xss")</script>'
    const result = sanitizeHtml(input)
    expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;')
  })

  it('handles ampersands', () => {
    const result = sanitizeHtml('A & B')
    expect(result).toBe('A &amp; B')
  })

  it('handles quotes', () => {
    const result = sanitizeHtml('"quoted" and \'single\'')
    expect(result).toBe('&quot;quoted&quot; and &#x27;single&#x27;')
  })

  it('handles forward slashes', () => {
    const result = sanitizeHtml('path/to/file')
    expect(result).toBe('path&#x2F;to&#x2F;file')
  })
})

describe('validateDuaText', () => {
  it('validates normal dua text', () => {
    const result = validateDuaText('اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ')
    expect(result.isValid).toBe(true)
  })

  it('rejects empty dua text', () => {
    const result = validateDuaText('')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Dua text cannot be empty')
  })

  it('rejects overly long dua text', () => {
    const longDua = 'a'.repeat(2001)
    const result = validateDuaText(longDua)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Dua text is too long (max 2000 characters)')
  })

  it('rejects harmful content', () => {
    const harmfulDua = '<script>alert("xss")</script> اللَّهُمَّ'
    const result = validateDuaText(harmfulDua)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Invalid content detected')
  })

  it('rejects JavaScript protocol', () => {
    const harmfulDua = 'javascript:alert("xss") اللَّهُمَّ'
    const result = validateDuaText(harmfulDua)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Invalid content detected')
  })

  it('rejects event handlers', () => {
    const harmfulDua = 'onclick="alert(\'xss\')" اللَّهُمَّ'
    const result = validateDuaText(harmfulDua)
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Invalid content detected')
  })

  it('sanitizes valid dua text', () => {
    const dua = 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ & <test>'
    const result = validateDuaText(dua)
    expect(result.isValid).toBe(true)
    expect(result.sanitized).toContain('&amp;')
    expect(result.sanitized).toContain('&lt;test&gt;')
  })
})
