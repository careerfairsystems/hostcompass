import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  question: string;
  leftStatement: string;
  rightStatement: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  onNext: () => void;
  canProceed: boolean;
}

export const QuizCard = ({
  question,
  leftStatement,
  rightStatement,
  selectedValue,
  onSelect,
  onNext,
  canProceed
}: QuizCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-arkad border-0 bg-card animate-fade-in">
      <CardContent className="p-8">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-center text-foreground font-arkad">
            {question}
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground flex-1 text-left">
                {leftStatement}
              </span>
              <span className="text-sm font-medium text-muted-foreground flex-1 text-right">
                {rightStatement}
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => onSelect(value)}
                  className={cn(
                    "w-12 h-12 rounded-full border-2 font-medium transition-all duration-200",
                    "hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    selectedValue === value
                      ? "bg-primary text-primary-foreground border-primary shadow-arkad-glow"
                      : "bg-secondary text-foreground border-border hover:border-primary"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              onClick={onNext}
              disabled={!canProceed}
              className={cn(
                "px-8 py-2 bg-arkad-gradient text-primary-foreground font-semibold rounded-lg font-arkad",
                "hover:shadow-arkad-glow transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              )}
            >
              Nästa
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};