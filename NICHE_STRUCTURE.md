# YouTube Shorts Niche Structure

## 1. Entertainment & Comedy
### Primary Niches
- Comedy Sketches
- Pranks & Reactions
- Parodies
- Stand-up Clips
- Funny Animals
- Memes & Viral Content

### Sub-niches
```typescript
interface EntertainmentNiches {
  comedy_sketches: {
    situational_comedy: string[];
    character_comedy: string[];
    physical_comedy: string[];
    improv: string[];
  };
  pranks: {
    public_pranks: string[];
    family_pranks: string[];
    friend_pranks: string[];
    reactions: string[];
  };
  parodies: {
    movie_parodies: string[];
    song_parodies: string[];
    celebrity_impressions: string[];
  };
  memes: {
    trending_memes: string[];
    original_memes: string[];
    remix_memes: string[];
  };
}
```

## 2. Lifestyle & Fashion
### Primary Niches
- Fashion Tips
- Beauty & Makeup
- Outfit Ideas
- Skincare
- Hair Styling
- Personal Care

### Sub-niches
```typescript
interface LifestyleNiches {
  fashion: {
    street_style: string[];
    luxury_fashion: string[];
    budget_fashion: string[];
    seasonal_trends: string[];
  };
  beauty: {
    makeup_tutorials: string[];
    skincare_routines: string[];
    product_reviews: string[];
    beauty_hacks: string[];
  };
  hair: {
    hairstyling: string[];
    hair_care: string[];
    hair_coloring: string[];
    natural_hair: string[];
  };
}
```

## 3. Education & Learning
### Primary Niches
- Quick Tips
- Life Hacks
- Language Learning
- Science Facts
- History Facts
- Math Tricks

### Sub-niches
```typescript
interface EducationNiches {
  academic: {
    math_tricks: string[];
    science_facts: string[];
    history_moments: string[];
    language_tips: string[];
  };
  practical: {
    life_hacks: string[];
    study_tips: string[];
    memory_techniques: string[];
    productivity: string[];
  };
  professional: {
    career_advice: string[];
    skill_development: string[];
    industry_insights: string[];
  };
}
```

## 4. Food & Cooking
### Primary Niches
- Quick Recipes
- Cooking Tips
- Food Reviews
- Kitchen Hacks
- Healthy Eating
- Desserts

### Sub-niches
```typescript
interface FoodNiches {
  cooking: {
    quick_recipes: string[];
    cooking_tips: string[];
    kitchen_hacks: string[];
    meal_prep: string[];
  };
  specific_cuisines: {
    asian: string[];
    european: string[];
    american: string[];
    fusion: string[];
  };
  dietary: {
    vegetarian: string[];
    vegan: string[];
    keto: string[];
    healthy_eating: string[];
  };
}
```

## 5. Sports & Fitness
### Primary Niches
- Workout Tips
- Sports Highlights
- Training Techniques
- Athletic Skills
- Fitness Challenges
- Nutrition Tips

### Sub-niches
```typescript
interface FitnessNiches {
  workouts: {
    quick_exercises: string[];
    home_workouts: string[];
    gym_routines: string[];
    cardio: string[];
  };
  sports: {
    football_skills: string[];
    basketball_tricks: string[];
    soccer_techniques: string[];
    combat_sports: string[];
  };
  wellness: {
    yoga: string[];
    meditation: string[];
    stretching: string[];
    recovery: string[];
  };
}
```

## 6. Technology & Gaming
### Primary Niches
- Tech Tips
- Game Highlights
- Tech Reviews
- Gaming Skills
- App Reviews
- Tech News

### Sub-niches
```typescript
interface TechNiches {
  gaming: {
    game_tips: string[];
    speedruns: string[];
    gaming_moments: string[];
    esports: string[];
  };
  tech_tips: {
    smartphone_tips: string[];
    computer_tricks: string[];
    app_tutorials: string[];
    tech_hacks: string[];
  };
  tech_news: {
    product_launches: string[];
    tech_reviews: string[];
    industry_news: string[];
  };
}
```

## 7. Arts & Creativity
### Primary Niches
- Art Tips
- DIY Crafts
- Drawing
- Painting
- Music
- Dance

### Sub-niches
```typescript
interface CreativeNiches {
  visual_arts: {
    drawing_tips: string[];
    painting_techniques: string[];
    digital_art: string[];
    animation: string[];
  };
  music: {
    singing_tips: string[];
    instrument_tutorials: string[];
    music_production: string[];
    covers: string[];
  };
  dance: {
    dance_tutorials: string[];
    choreography: string[];
    dance_trends: string[];
    street_dance: string[];
  };
}
```

## 8. Business & Finance
### Primary Niches
- Money Tips
- Investment Advice
- Business Ideas
- Entrepreneurship
- Career Tips
- Market Analysis

### Sub-niches
```typescript
interface BusinessNiches {
  finance: {
    personal_finance: string[];
    investing_tips: string[];
    cryptocurrency: string[];
    money_saving: string[];
  };
  business: {
    startup_tips: string[];
    marketing_strategies: string[];
    entrepreneurship: string[];
    business_advice: string[];
  };
  career: {
    job_hunting: string[];
    interview_tips: string[];
    skill_development: string[];
    workplace_advice: string[];
  };
}
```

## Implementation Notes

### Niche Data Structure
```typescript
interface Niche {
  id: string;
  name: string;
  parentId?: string;
  description: string;
  icon: string;
  keywords: string[];
  popularTags: string[];
}

interface NicheHierarchy {
  grandNiche: Niche;
  primaryNiches: Niche[];
  subNiches: Record<string, Niche[]>;
}
```

### Niche Selection Logic
```typescript
interface NicheSelection {
  grandNiche: string;
  primaryNiche: string;
  subNiche?: string;
  customTags?: string[];
}
```

### Cache Strategy
- Cache data separately for each niche level
- Implement different TTL for different niche levels:
  * Grand niches: 24 hours
  * Primary niches: 12 hours
  * Sub-niches: 6 hours 