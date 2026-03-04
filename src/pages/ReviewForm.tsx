import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Send, Heart } from "lucide-react";

const ReviewForm = () => {
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a star rating!");
    setSubmitted(true);
    setTimeout(() => {
      navigate(-1);
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-8 max-w-2xl text-center py-32">
         <div className="bg-teal-50 p-12 rounded-3xl border border-teal-100 flex flex-col items-center">
            <Heart size={80} className="text-[#007C87] mb-6 fill-[#007C87]" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">You're Amazing!</h1>
            <p className="text-lg text-gray-600 mb-8">
                Your review has been submitted successfully. Other travelers will appreciate your insights.
            </p>
         </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-12 max-w-3xl">
      <button onClick={() => navigate(-1)} className="flex items-center text-[#007C87] font-bold hover:underline mb-8">
        <ChevronLeft size={20} className="mr-1" /> Back to Destination
      </button>

      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Share Your Experience</h1>
        <p className="text-gray-500 mb-12">How was your visit? Your feedback helps the world discover better places.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-4">Rate your visit</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    size={48}
                    className={`${
                      star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-bold text-gray-800">Your Thoughts</label>
            <textarea
              required
              rows={5}
              placeholder="Tell us about the sights, the food, and what made it special..."
              className="w-full p-6 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-[#007C87] transition-all resize-none text-gray-700"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-[#007C87] text-white rounded-3xl font-extrabold text-xl shadow-xl hover:bg-[#00666f] transition-all flex items-center justify-center gap-3"
          >
            <Send size={24} /> Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
