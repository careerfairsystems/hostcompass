import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { routing } from "@/i18n/routing";
import * as Sentry from "@sentry/nextjs";

type SupportedLocales = (typeof routing.locales)[number];
type QuizResultsProps = {
  answers: number[];
  onRestart: () => void;
};

type Role = {
  name: {
    en: string;
    sv: string;
  };
  recommendations: Array<{
    title: string;
    description: string;
  }>;
};

export const QuizResults = ({ answers, onRestart }: QuizResultsProps) => {
  const t = useTranslations();
  const currentLocale = useLocale() as SupportedLocales;
  const goToApplyForm = (): void => {
    // Mapping between quiz role names and ARKAD form option values
    const roleMapping: Record<string, string> = {
      "Event host": "Event",
      Eventvärd: "Event",
      "Banquet host": "Banquet",
      "Bankett värd": "Banquet",
      "Company host": "Company",
      "Decoration Host": "Decoration",
      "Info Desk Host": "Info desk",
      "Logistics host": "Logistics",
      Logistikvärd: "Logistics",
      "Lounge host": "Lounge",
      Loungevärd: "Lounge",
      "Lunch host": "Lunch",
      Lunchvärd: "Lunch",
      "Photo & Film host": "Photo & Film",
      "Photo & Filmvärd": "Photo & Film",
      "Power Supply & Network Host": "Power Supply & Network",
      "Wardrobe host": "Wardrobe",
      Garderobsvärd: "Wardrobe",
      "Internal Event": "Internal Event",
      "Intressegrupp Intern Event": "Internal Event",
      "Student Sessions Host": "Student Sessions",
    };

    // Get the top 3 role recommendations
    const top3Roles = personalityType.recommendations.slice(0, 3);

    // Map role titles to form values
    const mappedRoles = top3Roles
      .map((role) => roleMapping[role.title])
      .filter(Boolean); // Remove any undefined values

    // Build the URL with query parameters
    const baseUrl = "https://www.arkadtlth.se/apply#form";
    const params = new URLSearchParams();

    if (mappedRoles[0]) {
      params.set("first-host", mappedRoles[0]);
    }
    if (mappedRoles[1]) {
      params.set("second-host", mappedRoles[1]);
    }
    if (mappedRoles[2]) {
      params.set("third-host", mappedRoles[2]);
    }

    const finalUrl = `${baseUrl}?${params.toString()}`;

    // Track apply button click in Sentry
    const applyData = {
      recommendedRoles: top3Roles.map((role) => role.title),
      mappedFormRoles: mappedRoles,
      finalUrl,
      locale: currentLocale,
      timestamp: new Date().toISOString()
    };
    
    Sentry.addBreadcrumb({
      category: 'quiz',
      message: 'Apply button clicked',
      level: 'info',
      data: applyData
    });
    
    Sentry.captureMessage('Quiz apply button clicked', {
      level: 'info',
      tags: {
        event_type: 'quiz_apply',
        locale: currentLocale
      },
      extra: applyData
    });

    // Redirect to the ARKAD application form
    window.open(finalUrl, "_blank");
  };
  // Calculate personality type based on answers
  const calculateRole = (userAnswers: number[]): Role => {
    // CSV data with role answers for 4 questions: Grupper, Företagskontakt, Servicemindset, Struktur
    const roleData = [
      {
        name: { sv: "Eventvärd", en: "Event host" },
        answers: [2, 4, 4, 2],
        description: {
          sv: "Som Event Host hjälper du till att arrangera och genomföra företagseventen runt ARKAD.",
          en: "As an Event Host, you help organize and deliver company events during ARKAD.",
        },
      },
      {
        name: { sv: "Photo & Filmvärd", en: "Photo & Film host" },
        answers: [1, 4, 1, 4],
        description: {
          sv: "Som Photo & Film Host fångar du ARKADs stämning och höjdpunkter genom foto och film.",
          en: "As a Photo & Film Host, you capture ARKAD's atmosphere and highlights through photography and film.",
        },
      },
      {
        name: { sv: "Decoration Värd", en: "Decoration Host" },
        answers: [3, 1, 1, 3],
        description: {
          sv: "Som Decoration Host ansvarar du för att skapa en välkomnande och inspirerande miljö runt mässan.",
          en: "As a Decoration Host, you help create a welcoming and inspiring environment for the fair.",
        },
      },
      {
        name: { sv: "Logistikvärd", en: "Logistics host" },
        answers: [3, 3, 5, 3],
        description: {
          sv: "Som Logistics Host hjälper du till med transport, samordning och logistik för företagens material.",
          en: "As a Logistics Host, you assist with transport, coordination, and logistics for the companies' materials.",
        },
      },
      {
        name: { sv: "Garderobsvärd", en: "Wardrobe host" },
        answers: [1, 4, 5, 2],
        description: {
          sv: "Som Wardrobe Host välkomnar du företag och hanterar garderoben under mässan.",
          en: "As a Wardrobe Host, you welcome companies and manage the wardrobe during the fair.",
        },
      },
      {
        name: { sv: "Info Desk Värd", en: "Info Desk Host" },
        answers: [2, 3, 5, 3],
        description: {
          sv: "Som Info Desk Host bemannar du infodisken och hjälper studenter och företag med deras frågor.",
          en: "As an Info Desk Host, you staff the information desk and assist students and companies with their questions.",
        },
      },
      {
        name: { sv: "Bankett värd", en: "Banquet host" },
        answers: [5, 1, 2, 1],
        description: {
          sv: "Som Banquet Host hjälper du till att planera, förbereda och genomföra ARKADs stora bankett.",
          en: "As a Banquet Host, you help plan, prepare, and execute ARKAD's grand banquet.",
        },
      },
      {
        name: { sv: "Lunchvärd", en: "Lunch host" },
        answers: [5, 3, 5, 2],
        description: {
          sv: "Som Lunch Host tar du hand om lunchområdet och ser till att gästerna får en trevlig upplevelse.",
          en: "As a Lunch Host, you take care of the lunch area and make sure guests have a pleasant experience.",
        },
      },
      {
        name: { sv: "Loungevärd", en: "Lounge host" },
        answers: [4, 4, 5, 3],
        description: {
          sv: "Som Lounge Host ser du till att loungerna hålls trevliga och välfyllda under mässan.",
          en: "As a Lounge Host, you ensure the lounges stay welcoming and stocked during the fair.",
        },
      },
      {
        name: { sv: "Company host", en: "Company host" },
        answers: [1, 5, 5, 3],
        description: {
          sv: "Som Company Host är du företagens kontaktperson och ser till att deras upplevelse av ARKAD blir så bra som möjligt.",
          en: "As a Company Host, you act as the companies' main contact and ensure they have the best possible experience at ARKAD.",
        },
      },
      {
        name: {
          sv: "Power Supply & Network Värd",
          en: "Power Supply & Network Host",
        },
        answers: [3, 1, 2, 4],
        description: {
          sv: "Som Power Supply & Network Host ansvarar du för el och nätverk före, under och efter mässan.",
          en: "As a Power Supply & Network Host, you help set up, manage, and restore electricity and networks for the fair.",
        },
      },
      {
        name: {
          sv: "Intressegrupp Intern Event",
          en: "Internal Event",
        },
        answers: [5, 1, 4, 3],
        description: {
          sv: "Som Internal Event Host arrangerar du tackevent för alla som arbetar med ARKAD.",
          en: "As an Internal Event Host, you organize thank-you events for everyone working with ARKAD.",
        },
      },
      {
        name: { sv: "Student Sessions Host", en: "Student Sessions Host" },
        answers: [3, 4, 5, 3],
        description: {
          sv: "Som Student Sessions Host förbereder du rum och stöttar både studenter och företag under kontaktsamtalen.",
          en: "As a Student Sessions Host, you prepare the rooms and support both students and companies during the sessions.",
        },
      },
    ];

    // Calculate Euclidean distance between user answers and each role
    const calculateDistance = (
      currentAnswers: number[],
      roleAnswers: number[]
    ): number => {
      return Math.sqrt(
        currentAnswers.reduce((sum, answer, index) => {
          return sum + (answer - roleAnswers[index]) ** 2;
        }, 0)
      );
    };

    // Find the 3 closest matching roles
    const rolesWithDistances = roleData.map((role) => ({
      ...role,
      distance: calculateDistance(userAnswers, role.answers),
    }));

    const sortedRoles = rolesWithDistances.sort(
      (a, b) => a.distance - b.distance
    );
    const top3Roles = sortedRoles.slice(0, 3);

    return {
      name: { sv: "Dina Bästa Matchningar", en: "Your Best Matches" },
      recommendations: top3Roles.map((role, _index) => ({
        title: role.name[currentLocale],
        description: role.description[currentLocale],
      })),
    };
  };
  const personalityType = calculateRole(answers);
  
  // Track quiz completion in Sentry
  useEffect(() => {
    const quizData = {
      answers,
      locale: currentLocale,
      topRecommendations: personalityType.recommendations.slice(0, 3).map(rec => rec.title),
      timestamp: new Date().toISOString()
    };
    
    Sentry.addBreadcrumb({
      category: 'quiz',
      message: 'Quiz completed',
      level: 'info',
      data: quizData
    });
    
    Sentry.captureMessage('Quiz completed', {
      level: 'info',
      tags: {
        event_type: 'quiz_completion',
        locale: currentLocale
      },
      extra: quizData
    });
  }, [answers, currentLocale, personalityType.recommendations]);
  
  return (
    <div className="mx-auto w-full max-w-2xl animate-fade-in">
      <Card className="border-0 bg-card shadow-arkad">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="bg-arkad-gradient bg-clip-text font-arkad font-bold text-3xl text-transparent">
            {t("quiz.topRecommendations")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="space-y-4">
            <div className="grid gap-4">
              {personalityType.recommendations.map((recommendation, index) => (
                <Card
                  className="border-border bg-card/50"
                  key={recommendation.title}
                >
                  <CardContent className="p-4">
                    <h4 className="mb-2 font-semibold text-foreground">
                      {index + 1}. {recommendation.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {recommendation.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* <div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">
							Dina svar:
						</h3>
						<div className="grid grid-cols-5 gap-2">
							{answers.map((answer, index) => (
								<div
									key={index}
									className="flex flex-col items-center p-3 bg-card rounded-lg border"
								>
									<span className="text-xs text-muted-foreground mb-1">
										Fråga {index + 1}
									</span>
									<span className="text-lg font-semibold text-primary">
										{answer}
									</span>
								</div>
							))}
						</div>
					</div> */}

          <div className="flex justify-center pt-6">
            <Link className="mr-4" href="/">
              <Button variant="outline">{t("quiz.backToHome")}</Button>
            </Link>
            <Button
              className="rounded-lg bg-arkad-gradient px-8 py-2 font-arkad font-semibold text-primary-foreground transition-all duration-300 hover:shadow-arkad-glow"
              onClick={goToApplyForm}
            >
              {t("quiz.apply")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
