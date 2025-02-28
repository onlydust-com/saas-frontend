import { Submission } from "@/app/api/fillout/forms/[formId]/submissions/route";

export const OdNewsQuestionsNames = {
  type: "Choose your news type",
  news: "Your news",
  action: "do you need an action ?",
  marketing: "How our marketing service can help you?",
  telegram: "Your telegram",
} as const;

// 0
// :
// {id: 'projectId', name: 'projectId', value: 'e00ea16f-8a65-4790-8c3a-faed6abf8e8f'}
// 1
// :
// {id: 'githubUserId', name: 'githubUserId', value: '17259618'}
// 2
// :
// {id: 'createdByAvatar', name: 'createdByAvatar', value: null}
// 3
// :
// {id: 'createdByLogin', name: 'createdByLogin', value: null}
// 4
// :
// {id: 'projectLogoUrl', name: 'projectLogoUrl', value: null}
// 5
// :
// {id: 'projectName', name: 'projectName', value: null}
// // 6
// // :
// // {id: 'projectSlug', name: 'projectSlug', value: null}

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
    color: "orange" | "purple" | "blue";
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
        color: "purple",
        icon: "target",
        title: "Roadmap milestone",
      };
    }
    if (response.type === "Community / Event") {
      return {
        color: "blue",
        icon: "calendar",
        title: "Community / Event",
      };
    }

    return {
      color: "orange",
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
