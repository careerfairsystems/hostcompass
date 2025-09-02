import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface QuizResultsProps {
  answers: number[];
  onRestart: () => void;
}
export const QuizResults = ({
  answers,
  onRestart
}: QuizResultsProps) => {
  // Calculate personality type based on answers
  const calculatePersonalityType = (answers: number[]) => {
    const average = answers.reduce((sum, answer) => sum + answer, 0) / answers.length;
    if (average <= 2) {
      return {
        type: "Introspektiv Tänkare",
        description: "Du föredrar att arbeta i mindre grupper och tar dig tid att reflektera över beslut. Du värdesätter djupa samtal och meningsfulla relationer.",
        traits: ["Reflektion", "Djupa relationer", "Kvalitet över kvantitet", "Självständighet"],
        color: "bg-blue-500",
        recommendations: [
          {
            title: "Sök mentorskap",
            description: "Hitta en mentor inom ditt område som kan ge djupgående vägledning och stöd i din karriärutveckling."
          },
          {
            title: "Delta i mindre nätverksgrupper",
            description: "Fokusera på kvalitativa kontakter genom mindre, branschspecifika evenemang där du kan ha meningsfulla samtal."
          },
          {
            title: "Utveckla expertis",
            description: "Fördjupa dig inom ett specifikt område för att bli den person andra vänder sig till för råd och kunskap."
          }
        ]
      };
    } else if (average <= 3.5) {
      return {
        type: "Balanserad Samarbetare",
        description: "Du är flexibel och kan anpassa dig till olika arbetssätt beroende på situation. Du trivs både i mindre och större grupper.",
        traits: ["Flexibilitet", "Anpassningsförmåga", "Diplomatisk", "Balanserad"],
        color: "bg-green-500",
        recommendations: [
          {
            title: "Utforska olika roller",
            description: "Testa olika typer av projekt och roller för att hitta vad som passar dig bäst inom ARKAD."
          },
          {
            title: "Bygg broar mellan grupper",
            description: "Använd din diplomatiska förmåga för att koppla samman olika team och avdelningar."
          },
          {
            title: "Utveckla ledarskap",
            description: "Din balanserade approach gör dig till en naturlig ledare som kan hantera olika situationer."
          }
        ]
      };
    } else {
      return {
        type: "Energisk Nätverkare",
        description: "Du blomstrar i stora grupper och älskar att samarbeta med många människor. Du får energi av social interaktion och teamwork.",
        traits: ["Energisk", "Social", "Teamspelare", "Inspirerande"],
        color: "bg-purple-500",
        recommendations: [
          {
            title: "Engagera dig i stora event",
            description: "Ta en aktiv roll i ARKADs stora evenemang och mässor där du kan träffa många nya människor."
          },
          {
            title: "Starta nätverksinitiativ",
            description: "Skapa nya former för networking och social interaktion inom organisationen."
          },
          {
            title: "Bli teamleder",
            description: "Din energi och sociala förmåga gör dig perfekt för att leda och inspirera större team."
          }
        ]
      };
    }
  };
  const personalityType = calculatePersonalityType(answers);
  return <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <Card className="shadow-arkad border-0 bg-card">
        <CardHeader className="text-center pb-4">
          <div className="mb-4">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${personalityType.color} text-white text-2xl font-bold mb-4`}>
              ✨
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-arkad-gradient bg-clip-text text-transparent font-arkad">
            {personalityType.type}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            {personalityType.description}
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Dina egenskaper:</h3>
            <div className="flex flex-wrap gap-2">
              {personalityType.traits.map((trait, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Top 3 rekommendationer för dig:</h3>
            <div className="grid gap-4">
              {personalityType.recommendations.map((recommendation, index) => (
                <Card key={index} className="bg-card/50 border-border">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      {index + 1}. {recommendation.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {recommendation.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Dina svar:</h3>
            <div className="grid grid-cols-5 gap-2">
              {answers.map((answer, index) => <div key={index} className="flex flex-col items-center p-3 bg-card rounded-lg border">
                  <span className="text-xs text-muted-foreground mb-1">Fråga {index + 1}</span>
                  <span className="text-lg font-semibold text-primary">{answer}</span>
                </div>)}
            </div>
          </div>
          
          <div className="flex justify-center pt-6">
            <Button onClick={onRestart} className="px-8 py-2 bg-arkad-gradient text-primary-foreground font-semibold rounded-lg hover:shadow-arkad-glow transition-all duration-300 font-arkad">
              Gör testet igen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};