import { Submission } from "@/app/api/fillout/forms/[formId]/submissions/route";

export const OdNewsQuestionsNames = {
  type: "Choose your news type",
  news: "Your news",
  action: "do you need an action ?",
  marketing: "How our marketing service can help you?",
  telegram: "Your telegram",
} as const;

export interface OdNewsInterface extends Submission {
  response: Record<keyof typeof OdNewsQuestionsNames, string | null>;
  display: {
    color: "orange" | "purple" | "blue";
    icon: "megaphone" | "target" | "calendar";
    title: string;
  };
}

export class OdNewsModel implements OdNewsInterface {
  submissionId!: Submission["submissionId"];
  questions!: Submission["questions"];
  urlParameters!: Submission["urlParameters"];
  response: OdNewsInterface["response"];
  display: OdNewsInterface["display"];

  constructor(props: Submission) {
    Object.assign(this, props);

    this.response = Object.fromEntries(
      Object.entries(OdNewsQuestionsNames).map(([key, value]) => [
        key,
        OdNewsModel.getResponseByQuestionName(props.questions, value),
      ])
    ) as Record<keyof typeof OdNewsQuestionsNames, string | null>;

    if (this.response.type === "Roadmap milestone") {
      this.display = {
        color: "purple",
        icon: "target",
        title: "Roadmap milestone",
      };
    } else if (this.response.type === "Community / Event") {
      this.display = {
        color: "blue",
        icon: "calendar",
        title: "Community / Event",
      };
    } else {
      this.display = {
        color: "orange",
        icon: "megaphone",
        title: "Announcement",
      };
    }
  }

  static getResponseByQuestionType(
    questions: Submission["questions"],
    questionName: keyof typeof OdNewsQuestionsNames
  ) {
    return questions.find(question => question.name === questionName)?.value ?? null;
  }

  static getResponseByQuestionName(questions: Submission["questions"], questionName: string) {
    return questions.find(question => question.name === questionName)?.value ?? null;
  }
}
