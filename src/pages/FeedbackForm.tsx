
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Star, Rocket } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import StarField from '@/components/StarField';
import BackgroundPlanets from '@/components/BackgroundPlanets';
import Header from '@/components/Header';
import StarRating from '@/components/StarRating';
import AnimatedButton from '@/components/AnimatedButton';
import { useFeedbackStore } from '@/lib/feedbackStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const addFeedback = useFeedbackStore((state) => state.addFeedback);
  const [formVisible, setFormVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    brand: '',
    productType: '',
    model: '',
    priceRating: 0,
    designRating: 0,
    qualityRating: 0,
    overallRating: 0,
    comments: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    setFormVisible(true);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleRatingChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when rating is changed
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand name is required';
    }
    
    if (!formData.productType.trim()) {
      newErrors.productType = 'Product type is required';
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'Model name is required';
    }
    
    if (formData.priceRating === 0) {
      newErrors.priceRating = 'Please rate the price';
    }
    
    if (formData.designRating === 0) {
      newErrors.designRating = 'Please rate the design';
    }
    
    if (formData.qualityRating === 0) {
      newErrors.qualityRating = 'Please rate the quality';
    }
    
    if (formData.overallRating === 0) {
      newErrors.overallRating = 'Please provide an overall rating';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add feedback to store
      addFeedback(formData);
      
      // Show success toast
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable insights.",
        variant: "default",
      });
      
      // Navigate to insights page
      navigate('/insights');
    } else {
      // Show error toast
      toast({
        title: "Form Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      <BackgroundPlanets />
      <Header />
      
      <main className="pt-24 px-4 container mx-auto pb-20">
        <div 
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nebula-900/50 mb-4 animate-pulse-glow">
              <Rocket className="w-8 h-8 text-nebula-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Launch Your Feedback</h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Share your insights about products you've used. Your feedback helps brands evolve and improve their offerings.
            </p>
          </div>
          
          <div className="card-cosmic p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand Name</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`input-cosmic ${errors.brand ? 'border-red-500' : ''}`}
                    placeholder="e.g., Samsung, Apple, Sony"
                  />
                  {errors.brand && (
                    <p className="text-sm text-red-500">{errors.brand}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Input
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className={`input-cosmic ${errors.productType ? 'border-red-500' : ''}`}
                    placeholder="e.g., TV, Phone, Headphones"
                  />
                  {errors.productType && (
                    <p className="text-sm text-red-500">{errors.productType}</p>
                  )}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="model">Model Name/Number</Label>
                  <Input
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className={`input-cosmic ${errors.model ? 'border-red-500' : ''}`}
                    placeholder="e.g., iPhone 14 Pro, Galaxy S22"
                  />
                  {errors.model && (
                    <p className="text-sm text-red-500">{errors.model}</p>
                  )}
                </div>
              </div>
              
              <div className="border-t border-cosmic-800 my-6 pt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Rate Your Experience
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="priceRating">Price</Label>
                    <div className="mt-2">
                      <StarRating
                        rating={formData.priceRating}
                        setRating={(rating) => handleRatingChange('priceRating', rating)}
                      />
                    </div>
                    {errors.priceRating && (
                      <p className="text-sm text-red-500">{errors.priceRating}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="designRating">Design</Label>
                    <div className="mt-2">
                      <StarRating
                        rating={formData.designRating}
                        setRating={(rating) => handleRatingChange('designRating', rating)}
                      />
                    </div>
                    {errors.designRating && (
                      <p className="text-sm text-red-500">{errors.designRating}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="qualityRating">Quality</Label>
                    <div className="mt-2">
                      <StarRating
                        rating={formData.qualityRating}
                        setRating={(rating) => handleRatingChange('qualityRating', rating)}
                      />
                    </div>
                    {errors.qualityRating && (
                      <p className="text-sm text-red-500">{errors.qualityRating}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="overallRating">Overall Experience</Label>
                    <div className="mt-2">
                      <StarRating
                        rating={formData.overallRating}
                        setRating={(rating) => handleRatingChange('overallRating', rating)}
                      />
                    </div>
                    {errors.overallRating && (
                      <p className="text-sm text-red-500">{errors.overallRating}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="input-cosmic min-h-[120px]"
                  placeholder="Share your detailed experience with this product..."
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <AnimatedButton
                  type="submit"
                  variant="cosmic"
                  size="lg"
                  icon={<Send className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Submit Feedback
                </AnimatedButton>
                
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto bg-cosmic-900/50 border-cosmic-700/50 hover:bg-cosmic-800/50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackForm;
