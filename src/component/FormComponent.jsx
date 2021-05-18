import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Paper,
  withStyles,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";

import { styles } from "./styles";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import FinalStep from "./FinalStep";

import { renderText } from "./DisplayComponent";

class FormComponent extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      email: "",

      highestDegree: "",
      issuedBy: "",
      yearOfPassing: "",
      jobType: "",

      skill: "",
      jobApplyFor: "",
      workExperence: "",
      expectedSalary: "",
    },
    errors: {},
    steps: [
      { label: "Personal Bio" },
      { label: "Educational" },
      { label: "Professional" },
    ],
    stepCount: 0,
  };
  render() {
    const { classes } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("form submitted");
    };

    const handleOnChange = ({ target }) => {
      const { data, errors } = this.state;

      target.value.length <= 3
        ? (errors[target.name] = `${target.name} have at least 3 letter`)
        : (errors[target.name] = "");

      data[target.name] = target.value;
      this.setState({ data, errors });
    };

    const handleNextStep = () => {
      let { stepCount } = this.state;
      console.log("stepCount", stepCount);
      stepCount = stepCount + 1;
      this.setState({ stepCount });
    };
    const handleBackStep = () => {
      let { stepCount } = this.state;
      stepCount = stepCount - 1;
      this.setState({ stepCount });
    };

    const getStepContent = (step) => {
      switch (step) {
        case 0:
          return (
            <Step1
              state={this.state}
              handleChange={handleOnChange}
              handleNext={handleNextStep}
            />
          );
        case 1:
          return (
            <Step2
              state={this.state}
              handleChange={handleOnChange}
              handleNext={handleNextStep}
              handlePrev={handleBackStep}
            />
          );
        case 2:
          return (
            <Step3
              state={this.state}
              handleChange={handleOnChange}
              handleNext={handleNextStep}
              handlePrev={handleBackStep}
              handleSubmit={handleSubmit}
            />
          );
        case 3:
          return <FinalStep data={this.state.data} />;
        default:
          return (
            <Step1
              state={this.state}
              handleChange={handleOnChange}
              handleNext={handleNextStep}
            />
          );
      }
    };

    return (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12} sm={7}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Paper component={Box} mb={1}>
              <Box pt={2}>
                {renderText({
                  type: "h6",
                  color: "primary",
                  label: "MultiStep Signup Form",
                  align: "center",
                })}
              </Box>
              <Stepper activeStep={this.state.stepCount} alternativeLabel>
                {this.state.steps.map((item) => (
                  <Step key={item.label}>
                    <StepLabel>{item.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
            {getStepContent(this.state.stepCount)}
            {/* <Step1
              state={this.state}
              handleChange={handleOnChange}
              handleNext={handleNextStep}
            /> */}
          </form>
        </Grid>
      </Grid>
    );
  }
}

FormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormComponent);
