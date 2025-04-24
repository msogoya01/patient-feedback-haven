
import { FeedbackForm } from "../components/FeedbackForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="text-primary dark:text-primary font-bold text-xl">  
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-primary dark:text-primary font-bold text-xl">
              Welcome to our feedback portal!
            </h2>
            <p className="text-gray-600 mb-8">
              Your opinion matters and helps us serve you better.
              This will only take a few minutes.
            </p>
            <FeedbackForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
