
import { create } from 'zustand';

export interface FeedbackItem {
  id: string;
  brand: string;
  productType: string;
  model: string;
  priceRating: number;
  designRating: number;
  qualityRating: number;
  overallRating: number;
  comments: string;
  date: Date;
}

interface FeedbackStore {
  feedbackItems: FeedbackItem[];
  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'date'>) => void;
  getFeedbackByBrand: (brand: string) => FeedbackItem[];
  getAllFeedback: () => FeedbackItem[];
}

// Sample data
const initialFeedback: FeedbackItem[] = [
  {
    id: '1',
    brand: 'Samsung',
    productType: 'TV',
    model: 'Samsung QLED 65"',
    priceRating: 4,
    designRating: 5,
    qualityRating: 4,
    overallRating: 4.5,
    comments: 'Great display but slightly overpriced.',
    date: new Date('2023-10-15')
  },
  {
    id: '2',
    brand: 'Apple',
    productType: 'Phone',
    model: 'iPhone 14 Pro',
    priceRating: 3,
    designRating: 5,
    qualityRating: 5,
    overallRating: 4.5,
    comments: 'Amazing quality and design, but very expensive.',
    date: new Date('2023-11-02')
  },
  {
    id: '3',
    brand: 'Sony',
    productType: 'Headphones',
    model: 'WH-1000XM4',
    priceRating: 4,
    designRating: 4,
    qualityRating: 5,
    overallRating: 4.5,
    comments: 'Best noise cancellation I\'ve experienced. Great battery life too.',
    date: new Date('2023-09-28')
  }
];

export const useFeedbackStore = create<FeedbackStore>((set, get) => ({
  feedbackItems: initialFeedback,
  
  addFeedback: (feedback) => {
    const newFeedback: FeedbackItem = {
      ...feedback,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date()
    };
    
    set((state) => ({
      feedbackItems: [...state.feedbackItems, newFeedback]
    }));
    
    return newFeedback;
  },
  
  getFeedbackByBrand: (brand) => {
    return get().feedbackItems.filter(
      (item) => item.brand.toLowerCase() === brand.toLowerCase()
    );
  },
  
  getAllFeedback: () => {
    return get().feedbackItems;
  }
}));
