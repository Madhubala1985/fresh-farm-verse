
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Star, StarHalf } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
}

interface FarmerReviewsProps {
  farmerId: string;
  farmerName: string;
}

const FarmerReviews = ({ farmerId, farmerName }: FarmerReviewsProps) => {
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Mock reviews data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Rajesh Kumar',
      userImage: '/src/components/dp1.jpg',
      rating: 5,
      comment: 'Excellent quality produce! The vegetables I received were fresh and organic as promised. Will definitely buy from this farmer again.',
      date: '2023-10-15T10:30:00Z'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Priya Sharma',
      userImage: '/src/components/dp2.jpg',
      rating: 4,
      comment: 'The rice I purchased was of great quality. Delivery was prompt and the packaging was good. Just a small issue with quantity being slightly less than expected.',
      date: '2023-09-28T14:20:00Z'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Amit Singh',
      userImage: '/src/components/dp3.jpg',
      rating: 4.5,
      comment: 'I\'ve been buying from this farmer for the past 6 months. Their seasonal fruits are always fresh and reasonably priced. Highly recommend their mangoes!',
      date: '2023-08-12T09:15:00Z'
    }
  ]);

  const submitReview = () => {
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: user.id,
      userName: user.username,
      userImage: user.profileImage,
      rating,
      comment: reviewText,
      date: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
    setRating(0);
    toast.success('Review submitted successfully');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4) return 'Very Good';
    if (rating >= 3) return 'Good';
    if (rating >= 2) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="space-y-4">
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{getAverageRating()}</h3>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(getAverageRating())
                        ? 'text-yellow-500 fill-yellow-500'
                        : star <= getAverageRating() + 0.5
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {getRatingText(getAverageRating())}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Based on {reviews.length} reviews
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium">Customer Ratings</p>
              <div className="space-y-1 mt-1">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter(
                    (review) => Math.floor(review.rating) === star
                  ).length;
                  const percentage = (count / reviews.length) * 100 || 0;
                  
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs w-4">{star}</span>
                      <div className="h-2 flex-1 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs w-6 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {user && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Write a Review</CardTitle>
            <CardDescription>
              Share your experience with {farmerName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer transition-all ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mb-2">
                {rating ? getRatingText(rating) : 'Select a rating'}
              </p>
            </div>
            <Textarea
              placeholder="Share your experience with this farmer's products..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[100px] mb-3"
            />
            <Button onClick={submitReview} className="w-full">
              Submit Review
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.userImage} />
                  <AvatarFallback>
                    {review.userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{review.userName}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.floor(review.rating)
                            ? 'text-yellow-500 fill-yellow-500'
                            : star <= review.rating + 0.5
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {getRatingText(review.rating)}
                    </span>
                  </div>
                  
                  <p className="text-sm mt-2">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmerReviews;
