import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHostStart } from "../../store/user-slice/user-slice";
import HostPersonInfo from "../../components/host-signup/host-personal-info.component";
import HostProfileInfo from "../../components/host-signup/host-profile-info.component";
import {
  Steps,
  ButtonGroup,
  Button,
  Panel,
  Form,
  ButtonToolbar,
  Message,
} from "rsuite";
import { useNavigate } from "react-router-dom";

const HostSignupContainer = () => {
  const [hostPersonalInfo, setHostPersonalInfo] = useState();
  const [hostProfileInfo, setHostProfileInfo] = useState();
  const [step, setStep] = useState(0);
  const [formError, setFormError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const saveFirstForm = (formValues) => {
    setHostPersonalInfo(formValues);
  };

  const saveSecondForm = (formValues) => {
    setHostProfileInfo(formValues);
  };

  const saveForm = () => {
    // dispatch formValues to store
    dispatch(
      updateHostStart({
        userPersonalInfo: hostPersonalInfo,
        userProfileInfo: hostProfileInfo,
      })
    );
  };

  const onNext = () => {
    if (step === 1) {
      saveForm();
    }
    onChange(step + 1);
  };

  const onPrevious = () => {
    setFormError(false);
    onChange(step - 1);
  };

  const onSubmit = () => {
    if (
      !hostPersonalInfo ||
      !hostPersonalInfo.firstName ||
      !hostPersonalInfo.lastName ||
      !hostPersonalInfo.phoneNumber ||
      !hostPersonalInfo.street ||
      !hostPersonalInfo.city ||
      !hostPersonalInfo.state ||
      !hostPersonalInfo.zipCode ||
      !hostProfileInfo ||
      !hostProfileInfo.languages.length ||
      !hostProfileInfo.foodTypes.length ||
      !hostProfileInfo.textarea
    ) {
      setFormError(true);
      return;
    }
    saveForm();
    navigate("/home");
  };

  return (
    <div className="h-auto w-full p-24 overflow-scroll">
      <div className="w-auto flex flex-col justify-around items-stretch">
        <Steps current={step}>
          <Steps.Item />
          <Steps.Item />
          <Steps.Item />
        </Steps>
        <Panel className="flex flex-col self-center mt-10">
          {step === 0 ? (
            <HostPersonInfo
              saveFirstForm={saveFirstForm}
              formInfo={hostPersonalInfo}
            />
          ) : step === 1 ? (
            <HostProfileInfo
              saveForm={saveSecondForm}
              formInfo={hostProfileInfo}
            />
          ) : step === 2 ? (
            <div>
              <h3>step 3</h3>
            </div>
          ) : null}
        </Panel>
      </div>
      <div className="h-auto w-full flex flex-col justify-center items-center">
        {formError ? (
          <Message type="error">
            <strong>Looks like were missing some information</strong> Please go
            back and check all of your information is filled out.
          </Message>
        ) : null}

        <ButtonGroup
          className="w-full justify-around items-center"
          style={{ display: "flex" }}
        >
          <Button onClick={onPrevious} disabled={step === 0}>
            Previous
          </Button>
          {step === 2 ? (
            <Form.Group>
              <ButtonToolbar>
                <Button appearance="primary" onClick={onSubmit}>
                  Submit
                </Button>
              </ButtonToolbar>
            </Form.Group>
          ) : (
            <Button onClick={onNext} disabled={step === 3}>
              Next
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default HostSignupContainer;
