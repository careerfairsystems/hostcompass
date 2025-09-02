import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";

const PERCENTAGE_MULTIPLIER = 100;

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const t = useTranslations();
  const progress = (currentStep / totalSteps) * PERCENTAGE_MULTIPLIER;
  
  return (
    <div className="mx-auto mb-8 w-full max-w-2xl">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium text-muted-foreground text-sm">
          {t("quiz.step", { currentStep, totalSteps })}
        </span>
        <span className="font-medium text-primary text-sm">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 bg-secondary" 
      />
    </div>
  );
};