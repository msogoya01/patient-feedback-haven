
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export function FeedbackForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<string>("");
  const [visitDate, setVisitDate] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType || !visitDate || !gender) {
      toast({
        variant: "destructive",
        title: "Please fill in all fields",
        description: "All fields are required to proceed."
      });
      return;
    }

    // Route to different pages based on user type
    if (userType === 'visitor') {
      navigate('/visitor-feedback');
    } else {
      // Patient goes to department selection
      navigate('/departments');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl space-y-6 p-4 sm:p-6 bg-white rounded-2xl shadow-md transition-all duration-300 ease-in-out"
    >
      <div className="space-y-6">
        {/* User Type */}
        <div className="space-y-2">
          <Label>Do you fill this form as</Label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full sm:w-[250px] border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select type</option>
            <option value="patient">PATIENT</option>
            <option value="visitor">VISITOR</option>
          </select>
        </div>

        {/* Visit Date */}
        <div className="space-y-2">
          <Label>Date you attended at the Hospital</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[250px] justify-start text-left font-normal",
                  !visitDate && "text-muted-foreground"
                )}
              >
                {visitDate ? format(visitDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={visitDate}
                onSelect={setVisitDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* Gender */}
        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup
            value={gender}
            onValueChange={setGender}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 ease-in-out"
        >
          NEXT
        </Button>
      </div>
    </form>
  );
}
