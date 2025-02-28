
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, TooltipProps } from 'recharts';
import { Star, Filter, ArrowUpDown, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import StarField from '@/components/StarField';
import BackgroundPlanets from '@/components/BackgroundPlanets';
import Header from '@/components/Header';
import StarRating from '@/components/StarRating';
import { useFeedbackStore, FeedbackItem } from '@/lib/feedbackStore';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Insights = () => {
  const feedbackItems = useFeedbackStore((state) => state.feedbackItems);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'cards' | 'charts'>('cards');
  const [filteredItems, setFilteredItems] = useState<FeedbackItem[]>(feedbackItems);
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterProductType, setFilterProductType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Extract unique brands and product types
  const brands = ['all', ...Array.from(new Set(feedbackItems.map(item => item.brand)))];
  const productTypes = ['all', ...Array.from(new Set(feedbackItems.map(item => item.productType)))];
  
  useEffect(() => {
    setVisible(true);
  }, []);
  
  useEffect(() => {
    let items = [...feedbackItems];
    
    // Apply filters
    if (filterBrand !== 'all') {
      items = items.filter(item => item.brand === filterBrand);
    }
    
    if (filterProductType !== 'all') {
      items = items.filter(item => item.productType === filterProductType);
    }
    
    // Apply sorting
    items.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'brand':
          comparison = a.brand.localeCompare(b.brand);
          break;
        case 'productType':
          comparison = a.productType.localeCompare(b.productType);
          break;
        case 'overallRating':
          comparison = a.overallRating - b.overallRating;
          break;
        case 'date':
        default:
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredItems(items);
  }, [feedbackItems, filterBrand, filterProductType, sortBy, sortOrder]);
  
  // Prepare data for charts
  const ratingsByBrand = brands
    .filter(brand => brand !== 'all')
    .map(brand => {
      const brandItems = feedbackItems.filter(item => item.brand === brand);
      const avgRating = brandItems.reduce((acc, item) => acc + item.overallRating, 0) / brandItems.length;
      
      return {
        name: brand,
        rating: parseFloat(avgRating.toFixed(1))
      };
    });
  
  const ratingCategories = [
    { name: 'Price', value: filteredItems.reduce((acc, item) => acc + item.priceRating, 0) / filteredItems.length },
    { name: 'Design', value: filteredItems.reduce((acc, item) => acc + item.designRating, 0) / filteredItems.length },
    { name: 'Quality', value: filteredItems.reduce((acc, item) => acc + item.qualityRating, 0) / filteredItems.length },
    { name: 'Overall', value: filteredItems.reduce((acc, item) => acc + item.overallRating, 0) / filteredItems.length }
  ];
  
  const productTypeDistribution = productTypes
    .filter(type => type !== 'all')
    .map(type => {
      const count = feedbackItems.filter(item => item.productType === type).length;
      return { name: type, value: count };
    });
  
  const COLORS = ['#805AD5', '#4FD1C5', '#F6AD55', '#68D391', '#FC8181', '#B794F4'];
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      <BackgroundPlanets />
      <Header />
      
      <main className="pt-24 px-4 container mx-auto pb-20">
        <div 
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Cosmic Insights Dashboard</h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Explore the universe of customer feedback with our interactive dashboard.
            </p>
          </div>
          
          <div className="card-cosmic p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-auto">
                  <Select value={filterBrand} onValueChange={setFilterBrand}>
                    <SelectTrigger className="input-cosmic w-[180px]">
                      <SelectValue placeholder="Filter by Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand === 'all' ? 'All Brands' : brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <Select value={filterProductType} onValueChange={setFilterProductType}>
                    <SelectTrigger className="input-cosmic w-[180px]">
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === 'all' ? 'All Types' : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="input-cosmic w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="brand">Brand</SelectItem>
                      <SelectItem value="productType">Product Type</SelectItem>
                      <SelectItem value="overallRating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="bg-cosmic-900/50 border-cosmic-700/50 hover:bg-cosmic-800/50"
                >
                  <ArrowUpDown className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 mb-6 border-b border-cosmic-800 pb-4 overflow-x-auto">
              <Button
                variant={activeTab === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('cards')}
                className={`${activeTab === 'cards' ? 'bg-nebula-600' : 'bg-cosmic-900/50 border-cosmic-700/50 hover:bg-cosmic-800/50'}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Feedback Cards
              </Button>
              <Button
                variant={activeTab === 'charts' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('charts')}
                className={`${activeTab === 'charts' ? 'bg-nebula-600' : 'bg-cosmic-900/50 border-cosmic-700/50 hover:bg-cosmic-800/50'}`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
            
            {activeTab === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <Card key={item.id} className="card-cosmic overflow-hidden">
                      <CardHeader className="bg-nebula-900/30 pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{item.brand}</CardTitle>
                            <CardDescription>{item.model}</CardDescription>
                          </div>
                          <div className="flex items-center bg-nebula-600/20 px-2 py-1 rounded-md">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-semibold">{item.overallRating.toFixed(1)}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="mb-3">
                          <div className="text-xs text-gray-400 mb-1">Product Type</div>
                          <div className="text-sm font-medium">{item.productType}</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Price</div>
                            <StarRating rating={item.priceRating} setRating={() => {}} size={12} editable={false} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Design</div>
                            <StarRating rating={item.designRating} setRating={() => {}} size={12} editable={false} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Quality</div>
                            <StarRating rating={item.qualityRating} setRating={() => {}} size={12} editable={false} />
                          </div>
                        </div>
                        
                        {item.comments && (
                          <div className="mb-3">
                            <div className="text-xs text-gray-400 mb-1">Comments</div>
                            <div className="text-sm">{item.comments}</div>
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-400 mt-4">
                          {formatDate(item.date)}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-400">No feedback matches your current filters.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <Card className="card-cosmic overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-nebula-400" />
                        Average Ratings by Brand
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ratingsByBrand} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 5]} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1a1f2c', border: '1px solid #2d3748', borderRadius: '0.5rem' }}
                            formatter={(value) => [`${value} / 5`, 'Rating']}
                          />
                          <Bar dataKey="rating" fill="#805AD5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="card-cosmic overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <Star className="w-5 h-5 mr-2 text-yellow-400" />
                          Rating Categories
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={ratingCategories} 
                            layout="vertical" 
                            margin={{ top: 20, right: 30, left: 60, bottom: 30 }}
                          >
                            <XAxis type="number" domain={[0, 5]} />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1a1f2c', border: '1px solid #2d3748', borderRadius: '0.5rem' }}
                              formatter={(value: number | string) => {
                                const numValue = typeof value === 'number' ? value : parseFloat(value);
                                return [`${numValue.toFixed(1)} / 5`, 'Rating'];
                              }}
                            />
                            <Bar dataKey="value" fill="#4FD1C5" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="card-cosmic overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <PieChartIcon className="w-5 h-5 mr-2 text-nebula-400" />
                          Product Type Distribution
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={productTypeDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {productTypeDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1a1f2c', border: '1px solid #2d3748', borderRadius: '0.5rem' }}
                              formatter={(value) => [value, 'Count']}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insights;
