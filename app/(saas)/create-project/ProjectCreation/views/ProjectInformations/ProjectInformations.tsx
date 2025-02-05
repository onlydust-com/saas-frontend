import { useContext } from "react";

import { Button } from "@/shared/ui/button";
import { MultiStepsForm } from "../../components/MultiStepsForm";
import { CreateProjectContext } from "../../ProjectCreation.context";

export const ProjectInformationsPage = () => {
  const {
    form,
    isSubmitting,
    helpers: { prev },
  } = useContext(CreateProjectContext);

  return (
    <MultiStepsForm
      title="Project information"
      step={3}
      stepCount={3}
      submitButton={
        <Button
          disabled={!form.formState?.isValid || isSubmitting}
          className="w-full md:w-auto"
        >
          Publish
        </Button>
      }
      prev={prev}
    >
      <div />
    </MultiStepsForm>
  );
};

export default ProjectInformationsPage;
