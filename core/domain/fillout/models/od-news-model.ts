import { Submission } from "@/app/api/fillout/forms/[formId]/submissions/route";

export const OdNewsQuestionsNames = {
  type: "News Type",
  news: "News Content",
  action: "Request Marketing Assistance",
  marketing: "Marketing Support Details",
  telegram: "Telegram Contact",
} as const;

export type OdNewsParameters =
  | "projectId"
  | "githubUserId"
  | "createdByAvatar"
  | "createdByLogin"
  | "projectLogoUrl"
  | "projectName"
  | "projectSlug";

export interface OdNewsInterface extends Submission {
  paramaters: Record<OdNewsParameters, string | null>;
  response: Record<keyof typeof OdNewsQuestionsNames, string | null>;
  display: {
    color: "1" | "2" | "3";
    icon: "megaphone" | "target" | "calendar";
    title: string;
  };
}

export class OdNewsModel implements OdNewsInterface {
  submissionId!: Submission["submissionId"];
  questions!: Submission["questions"];
  urlParameters!: Submission["urlParameters"];
  lastUpdatedAt!: Submission["lastUpdatedAt"];
  response: OdNewsInterface["response"];
  display: OdNewsInterface["display"];
  paramaters: OdNewsInterface["paramaters"];

  constructor(props: Submission) {
    Object.assign(this, props);

    this.response = OdNewsModel.buildResponseObject(props.questions);

    this.display = OdNewsModel.buildDisplayFromResponse(this.response) as OdNewsInterface["display"];

    this.paramaters = OdNewsModel.buildParametersObject(props.urlParameters);
  }

  static buildDisplayFromResponse(response: OdNewsInterface["response"]) {
    if (response.type === "Roadmap milestone") {
      return {
        color: "1",
        icon: "target",
        title: "Roadmap milestone",
      };
    }
    if (response.type === "Community / Event") {
      return {
        color: "2",
        icon: "calendar",
        title: "Community / Event",
      };
    }

    return {
      color: "3",
      icon: "megaphone",
      title: "Announcement",
    };
  }

  static buildResponseObject(questions: Submission["questions"]) {
    return Object.fromEntries(
      Object.entries(OdNewsQuestionsNames).map(([key, value]) => [
        key,
        OdNewsModel.getResponseByQuestionName(questions, value),
      ])
    ) as Record<keyof typeof OdNewsQuestionsNames, string | null>;
  }

  static buildParametersObject(urlParameters: Submission["urlParameters"]) {
    return Object.fromEntries(urlParameters.map(param => [param.name, param.value])) as Record<
      OdNewsParameters,
      string | null
    >;
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
