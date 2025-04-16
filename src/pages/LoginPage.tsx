
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const [mrn, setMrn] = useState("");
  const [usePhone, setUsePhone] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mrn.trim()) {
      toast({
        title: "Error",
        description: `Please enter a valid ${usePhone ? "phone number" : "MRN number"}`,
        variant: "destructive",
      });
      return;
    }
    
    login(mrn);
    navigate("/home");
  };

  const toggleInputType = () => {
    setUsePhone(!usePhone);
    setMrn("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-medfeedback-lightblue to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="login-card w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-medfeedback-blue">Med</span>
            <span className="text-gray-800 dark:text-white">Feedback</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {usePhone ? "Enter Phone Number" : "Enter MRN Number"}
            </label>
            <Input
              id="identifier"
              type={usePhone ? "tel" : "text"}
              value={mrn}
              onChange={(e) => setMrn(e.target.value)}
              className="login-input"
              placeholder={usePhone ? "e.g. +1 234 567 8900" : "e.g. MRN12345678"}
            />
            <button 
              type="button" 
              onClick={toggleInputType}
              className="text-xs text-medfeedback-blue hover:underline text-right w-full block mt-1"
            >
              {usePhone ? "Use MRN number instead?" : "Use Phone number instead?"}
            </button>
          </div>

          <Button 
            type="submit" 
            className="login-button group"
          >
            Continue 
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>

      <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400 max-w-md">
        <p className="font-medium">NOTE</p>
        <p>This application does not use any of your credential during the feedback submission</p>
      </div>
    </div>
  );
}
